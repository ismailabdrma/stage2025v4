package com.example.stage2025.controller;

import com.example.stage2025.dto.OrderDto;
import com.example.stage2025.dto.PaymentIntentRequest;
import com.example.stage2025.dto.PaymentIntentResponse;
import com.example.stage2025.enums.DeliveryStatus;
import com.example.stage2025.enums.OrderStatus;
import com.example.stage2025.entity.Order;
import com.example.stage2025.service.OrderService;
import com.example.stage2025.service.PaymentService;
import com.example.stage2025.service.impl.SmartPaymentRoutingService;
import com.example.stage2025.service.impl.SoapPaymentService;
import com.example.stage2025.dto.PaymentDto;
import com.example.stage2025.repository.OrderRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.stage2025.dto.AddressDto;
import com.example.stage2025.service.AddressService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Slf4j
public class OrderController {

    private final OrderService orderService;
    private final PaymentService paymentService;
    private final SmartPaymentRoutingService smartPaymentRoutingService;
    private final SoapPaymentService soapPaymentService;
    private final OrderRepository orderRepository;
    private final AddressService addressService;

    // Helper to get client ID from authentication
    private Long resolveClientId(Authentication auth, Long userIdAttr) {
        if (userIdAttr != null) return userIdAttr;
        try {
            return Long.valueOf(auth.getName());
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid authenticated user id");
        }
    }

    /** 1. Create an order from cart (client only) */
    @PostMapping("/create")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<OrderDto> createOrder(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @RequestParam Long addressId, @RequestParam double shippingFee) {
        Long clientId = resolveClientId(auth, userIdAttr);
        OrderDto dto = orderService.createOrderFromCart(clientId, addressId, shippingFee);
        return ResponseEntity.ok(dto);
    }

    /** 2. List all orders for current client */
    @GetMapping
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<OrderDto>> getClientOrders(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr) {
        Long clientId = resolveClientId(auth, userIdAttr);
        List<OrderDto> orders = orderService.getOrdersByClient(clientId);
        return ResponseEntity.ok(orders);
    }

    /** 3. Get order by ID (client can only access their own orders, admin can access any) */
    @GetMapping("/{orderId}")
    @PreAuthorize("hasAnyRole('CLIENT','ADMIN')")
    public ResponseEntity<OrderDto> getOrder(@PathVariable Long orderId, Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @RequestHeader(value = "X-Admin-Override", required = false) String adminOverride) {
        OrderDto order = orderService.getOrderById(orderId);
        // Restrict clients to their own orders unless admin
        boolean isAdmin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (!isAdmin) {
            try {
                Long currentUserId = userIdAttr != null ? userIdAttr : Long.valueOf(auth.getName());
                if (!order.getClientId().equals(currentUserId)) {
                    return ResponseEntity.status(403).build();
                }
            } catch (Exception e) {
                return ResponseEntity.status(403).build();
            }
        }
        return ResponseEntity.ok(order);
    }

    /** 4. Update order status (admin only) */
    @PatchMapping("/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestParam OrderStatus status) {
        orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok("Order status updated");
    }

    /** 4b. Update order status via PUT with JSON body (compatibility for frontend) */
    @PutMapping("/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> putOrderStatus(@PathVariable Long orderId, @RequestBody Map<String, String> body) {
        String statusStr = body.get("status");
        if (statusStr == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing 'status' field"));
        }
        OrderStatus status = OrderStatus.valueOf(statusStr.toUpperCase());
        orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok("Order status updated");
    }

    /** Admin: list all orders */
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<OrderDto>> getAllOrdersForAdmin() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    /** Admin: list orders by status */
    @GetMapping("/admin/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<OrderDto>> getOrdersByStatusForAdmin(@PathVariable OrderStatus status) {
        return ResponseEntity.ok(orderService.getOrdersByStatus(status));
    }

    /** 5. Update shipping status (admin only) */
    @PatchMapping("/{orderId}/shipping-status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateShippingStatus(@PathVariable Long orderId, @RequestParam DeliveryStatus shippingStatus) {
        orderService.updateShippingStatus(orderId, shippingStatus);
        return ResponseEntity.ok("Shipping status updated");
    }

    /**
     * NEW: Create order and determine payment method with smart routing
     */
    @PostMapping("/create-with-payment")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Map<String, Object>> createOrderWithPayment(
            Authentication auth,
            @RequestAttribute(name = "userId", required = false) Long userIdAttr,
            @RequestBody Map<String, Object> request) {
        try {
            log.info("Received createOrderWithPayment request: {}", request);
            
            Long clientId = resolveClientId(auth, userIdAttr);
            log.info("Resolved client ID: {}", clientId);
            
            // Check if this is a new address or existing address scenario
            Boolean useNewAddress = (Boolean) request.get("useNewAddress");
            if (useNewAddress == null) {
                log.warn("Missing useNewAddress flag in request: {}", request);
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "useNewAddress flag is required"
                ));
            }
            
            Long addressId = null;
            Map<String, Object> newAddress = null;
            Double shippingFee;
            
            if (useNewAddress) {
                log.info("Processing new address creation for client: {}", clientId);
                // Handle new address scenario
                newAddress = (Map<String, Object>) request.get("newAddress");
                if (newAddress == null) {
                    log.warn("Missing newAddress in request when useNewAddress=true: {}", request);
                    return ResponseEntity.badRequest().body(Map.of(
                            "success", false,
                            "message", "newAddress is required when useNewAddress=true"
                    ));
                }
                
                // Validate new address fields
                String firstName = (String) newAddress.get("fullName");
                if (firstName == null || firstName.trim().isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of(
                            "success", false,
                            "message", "fullName is required for new address"
                    ));
                }
                
                String street = (String) newAddress.get("address");
                if (street == null || street.trim().isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of(
                            "success", false,
                            "message", "address is required for new address"
                    ));
                }
                
                String city = (String) newAddress.get("city");
                if (city == null || city.trim().isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of(
                            "success", false,
                            "message", "city is required for new address"
                    ));
                }
                
                String postalCode = (String) newAddress.get("postalCode");
                if (postalCode == null || postalCode.trim().isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of(
                            "success", false,
                            "message", "postalCode is required for new address"
                    ));
                }
                
                String country = (String) newAddress.get("country");
                if (country == null || country.trim().isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of(
                            "success", false,
                            "message", "country is required for new address"
                    ));
                }
                
                String phone = (String) newAddress.get("phone");
                if (phone == null || phone.trim().isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of(
                            "success", false,
                            "message", "phone is required for new address"
                    ));
                }
                
                log.info("New address validated for: {} {}, {}, {}, {}", firstName, street, city, postalCode, country);
                
            } else {
                log.info("Processing existing address for client: {}", clientId);
                // Handle existing address scenario
                if (!request.containsKey("addressId")) {
                    log.error("Missing addressId in request: {}", request);
                    return ResponseEntity.badRequest().body(Map.of(
                            "success", false,
                            "message", "addressId is required when useNewAddress=false"
                    ));
                }
                
                try {
                    Object addressIdObj = request.get("addressId");
                    if (addressIdObj == null) {
                        throw new IllegalArgumentException("addressId cannot be null");
                    }
                    addressId = Long.valueOf(addressIdObj.toString());
                    log.info("Parsed addressId: {}", addressId);
                } catch (NumberFormatException e) {
                    log.error("Failed to parse addressId: {}", e.getMessage());
                    return ResponseEntity.badRequest().body(Map.of(
                            "success", false,
                            "message", "Invalid addressId format: " + e.getMessage()
                    ));
                }
            }
            
            // Validate shipping fee
            if (!request.containsKey("shippingFee")) {
                log.error("Missing shippingFee in request: {}", request);
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "shippingFee is required"
                ));
            }
            
            try {
                Object shippingFeeObj = request.get("shippingFee");
                if (shippingFeeObj == null) {
                    throw new IllegalArgumentException("shippingFee cannot be null");
                }
                shippingFee = Double.valueOf(shippingFeeObj.toString());
                log.info("Parsed shippingFee: {}", shippingFee);
            } catch (NumberFormatException e) {
                log.error("Failed to parse shippingFee: {}", e.getMessage());
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Invalid shippingFee format: " + e.getMessage()
                ));
            }

            log.info("Creating order with payment for client: {}, useNewAddress: {}, addressId: {}, shippingFee: {}",
                    clientId, useNewAddress, addressId, shippingFee);

            // Step 1: Create the order
            OrderDto orderDto;
            if (useNewAddress) {
                // Create order with new address
                orderDto = orderService.createOrderFromJson(clientId, newAddress, shippingFee);
            } else {
                // Create order with existing address
                orderDto = orderService.createOrderFromCart(clientId, addressId, shippingFee);
            }

            if (orderDto == null) {
                log.error("OrderService returned null for client: {}", clientId);
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Failed to create order"
                ));
            }

            log.info("Order created successfully with ID: {}", orderDto.getId());

            // Step 2: Check payment routing
            SmartPaymentRoutingService.PaymentRoutingResult routing =
                    smartPaymentRoutingService.determinePaymentFlow(orderDto.getId());

            log.info("Payment routing determined: {}", routing.getPaymentFlow());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("orderId", orderDto.getId());
            response.put("paymentFlow", routing.getPaymentFlow().name());
            response.put("message", routing.getMessage());

            if (routing.getPaymentFlow() == SmartPaymentRoutingService.PaymentFlow.PLATFORM_PAYMENT) {
                // For platform payments, create Stripe payment intent
                try {
                    PaymentIntentRequest paymentRequest = PaymentIntentRequest.builder()
                            .orderId(orderDto.getId())
                            .amount((long) (routing.getTotalAmount() * 100)) // Convert to cents
                            .currency("eur")
                            .build();

                    // IMPORTANT: Use the existing routing result instead of calling determinePaymentFlow again
                    PaymentIntentResponse paymentIntent = smartPaymentRoutingService.createPaymentIntentWithRouting(paymentRequest, routing);
                    response.put("clientSecret", paymentIntent.getClientSecret());
                    response.put("paymentIntentId", paymentIntent.getId());
                } catch (Exception e) {
                    log.error("Error creating payment intent for order {}: {}", orderDto.getId(), e.getMessage());
                    response.put("clientSecret", null);
                    response.put("error", "Failed to create payment intent: " + e.getMessage());
                }
            } else {
                // For direct supplier payments, ALWAYS create Stripe payment intent
                // This provides a fallback payment method for suppliers without payment systems
                try {
                    PaymentIntentRequest paymentRequest = PaymentIntentRequest.builder()
                            .orderId(orderDto.getId())
                            .amount((long) (routing.getTotalAmount() * 100)) // Convert to cents
                            .currency("eur")
                            .build();

                    // IMPORTANT: Use the existing routing result instead of calling determinePaymentFlow again
                    PaymentIntentResponse paymentIntent = smartPaymentRoutingService.createPaymentIntentWithRouting(paymentRequest, routing);
                    response.put("paymentIntentId", paymentIntent.getId());
                    
                    // Check if supplier has payment system
                    if (routing.getPrimarySupplier() != null && routing.getPrimarySupplier().isHasOwnPaymentSystem()) {
                        // Supplier has payment system, include payment URL
                    response.put("paymentUrl", paymentIntent.getPaymentUrl());
                    response.put("supplierName", routing.getPrimarySupplier().getName());
                    response.put("supplierId", routing.getPrimarySupplier().getId());
                        response.put("hasPaymentSystem", true);
                    
                    log.info("Direct supplier payment intent created for order {}: paymentUrl={}, supplier={}", 
                            orderDto.getId(), paymentIntent.getPaymentUrl(), routing.getPrimarySupplier().getName());
                    } else {
                        // Supplier has no payment system, use Stripe as fallback
                        response.put("paymentUrl", null);
                        response.put("supplierName", routing.getPrimarySupplier() != null ? routing.getPrimarySupplier().getName() : "Unknown");
                        response.put("supplierId", routing.getPrimarySupplier() != null ? routing.getPrimarySupplier().getId() : null);
                        response.put("hasPaymentSystem", false);
                        response.put("stripeFallback", true);
                        
                        log.info("Supplier has no payment system, using Stripe fallback for order {}: supplier={}", 
                                orderDto.getId(), routing.getPrimarySupplier() != null ? routing.getPrimarySupplier().getName() : "Unknown");
                    }
                } catch (Exception e) {
                    log.error("Error creating direct supplier payment intent for order {}: {}", orderDto.getId(), e.getMessage());
                    response.put("error", "Failed to create supplier payment intent: " + e.getMessage());
                }
            }

            log.info("Order created successfully: {}", response);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error creating order with payment: {}", e.getMessage(), e);
            log.error("Stack trace: ", e);
            log.error("Request data: {}", request);
            return ResponseEntity.internalServerError().body(Map.of(
                    "success", false,
                    "message", "Internal server error: " + e.getMessage(),
                    "errorType", e.getClass().getSimpleName()
            ));
        }
    }

    /** 6. Create order with JSON body (for buy now and cart checkout) - LEGACY SUPPORT */
    @PostMapping
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Map<String, Object>> createOrderFromJson(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @RequestBody Map<String, Object> orderRequest) {
        Long clientId = resolveClientId(auth, userIdAttr);
        log.info("Creating order from JSON for client: {} with request: {}", clientId, orderRequest);
        
        // Check if this is a new address or existing address scenario
        Boolean useNewAddress = (Boolean) orderRequest.get("useNewAddress");
        if (useNewAddress == null) {
            log.warn("Missing useNewAddress flag in request: {}", orderRequest);
            return ResponseEntity.badRequest().body(Map.of("error", "useNewAddress flag is required"));
        }
        
        Long addressId = null;
        Map<String, Object> newAddress = null;
        
        if (useNewAddress) {
            log.info("Processing new address creation for client: {}", clientId);
            // Handle new address scenario
            newAddress = (Map<String, Object>) orderRequest.get("newAddress");
            if (newAddress == null) {
                log.warn("Missing newAddress in request when useNewAddress=true: {}", orderRequest);
                return ResponseEntity.badRequest().body(Map.of("error", "newAddress is required when useNewAddress=true"));
            }
            
            // Validate new address fields
            if (newAddress.get("fullName") == null || newAddress.get("address") == null || 
                newAddress.get("city") == null || newAddress.get("postalCode") == null || 
                newAddress.get("country") == null || newAddress.get("phone") == null) {
                log.warn("Missing required address fields in newAddress: {}", newAddress);
                return ResponseEntity.badRequest().body(Map.of("error", "All address fields are required for new address"));
            }
            
            // Create the new address first
            try {
                // Parse fullName into firstName and lastName
                String fullName = (String) newAddress.get("fullName");
                String[] nameParts = fullName.split(" ", 2);
                String firstName = nameParts[0];
                String lastName = nameParts.length > 1 ? nameParts[1] : "";
                
                AddressDto addressDto = AddressDto.builder()
                    .firstName(firstName)
                    .lastName(lastName)
                    .street((String) newAddress.get("address"))
                    .city((String) newAddress.get("city"))
                    .state((String) newAddress.get("state"))  // Added state field
                    .zipCode((String) newAddress.get("postalCode"))
                    .country((String) newAddress.get("country"))
                    .phone((String) newAddress.get("phone"))
                    .build();
                
                log.info("Creating address DTO: {}", addressDto);
                AddressDto createdAddress = addressService.createAddress(clientId, addressDto);
                addressId = createdAddress.getId();
                log.info("Created new address with ID: {} for client: {}", addressId, clientId);
            } catch (Exception e) {
                log.error("Failed to create new address: {}", e.getMessage(), e);
                return ResponseEntity.badRequest().body(Map.of("error", "Failed to create new address: " + e.getMessage()));
            }
        } else {
            log.info("Processing existing address for client: {}", clientId);
            // Handle existing address scenario
            Object addressIdObj = orderRequest.get("addressId");
            if (addressIdObj == null) {
                log.warn("Missing addressId in request when useNewAddress=false: {}", orderRequest);
                return ResponseEntity.badRequest().body(Map.of("error", "addressId is required when useNewAddress=false"));
            }
            addressId = ((Number) addressIdObj).longValue();
            log.info("Using existing address ID: {} for client: {}", addressId, clientId);
        }
        
        // Get shipping fee
        Object shippingFeeObj = orderRequest.get("shippingFee");
        double shippingFee = 0.0; // Default value
        if (shippingFeeObj != null) {
            shippingFee = ((Number) shippingFeeObj).doubleValue();
        }
        log.info("Processing order with addressId: {} and shippingFee: {} for client: {}", addressId, shippingFee, clientId);

        // Create order from cart
        OrderDto order = orderService.createOrderFromCart(clientId, addressId, shippingFee);
        log.info("Order created successfully with ID: {} for client: {}", order.getId(), clientId);

        // Create a real Stripe PaymentIntent and return clientSecret
        try {
            long amountInCents = Math.round(order.getTotal() * 100);
            log.info("Creating Stripe payment intent for order: {} with amount: {} cents", order.getId(), amountInCents);
            
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amountInCents)
                    .setCurrency("EUR")
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
                    )
                    .putMetadata("orderId", String.valueOf(order.getId()))
                    .build();
            PaymentIntent intent = PaymentIntent.create(params);
            log.info("Stripe payment intent created successfully: {} for order: {}", intent.getId(), order.getId());

            // Persist a Payment record linked to the order using Stripe intent id as transactionRef
            try {
                PaymentDto paymentDto = PaymentDto.builder()
                        .orderId(order.getId())
                        .transactionRef(intent.getId())
                        .paymentMethod("STRIPE")
                        .amount(intent.getAmount() != null ? intent.getAmount() / 100.0 : order.getTotal())
                        .build();
                paymentService.createPayment(paymentDto);
                log.info("Payment record persisted successfully for order: {}", order.getId());
            } catch (Exception persistEx) {
                // Non-blocking: log and continue
                log.warn("Failed to persist payment record: {}", persistEx.getMessage());
            }

            Map<String, Object> response = Map.of(
                    "orderId", order.getId(),
                    "total", order.getTotal(),
                    "currency", "EUR",
                    "clientSecret", intent.getClientSecret(),
                    "paymentProvider", "stripe"
            );
            log.info("Order creation completed successfully for client: {} with order ID: {}", clientId, order.getId());
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            log.error("Stripe payment intent creation failed: {}", e.getMessage(), e);
            return ResponseEntity.ok(Map.of(
                    "orderId", order.getId(),
                    "total", order.getTotal(),
                    "currency", "EUR",
                    "error", "Failed to create payment intent: " + e.getMessage()
            ));
        }
    }

    /** 7. Create order from specific items (for buy now) */
    @PostMapping("/buy-now")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Map<String, Object>> createBuyNowOrder(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @RequestBody Map<String, Object> buyNowRequest) {
        Long clientId = resolveClientId(auth, userIdAttr);
        log.info("Creating buy-now order for client: {} with request: {}", clientId, buyNowRequest);
        
        // Check if this is a new address or existing address scenario
        Boolean useNewAddress = (Boolean) buyNowRequest.get("useNewAddress");
        if (useNewAddress == null) {
            log.warn("Missing useNewAddress flag in buy-now request: {}", buyNowRequest);
            return ResponseEntity.badRequest().body(Map.of("error", "useNewAddress flag is required"));
        }
        
        Long addressId = null;
        Map<String, Object> newAddress = null;
        
        if (useNewAddress) {
            log.info("Processing new address creation for buy-now order, client: {}", clientId);
            // Handle new address scenario
            newAddress = (Map<String, Object>) buyNowRequest.get("newAddress");
            if (newAddress == null) {
                log.warn("Missing newAddress in buy-now request when useNewAddress=true: {}", buyNowRequest);
                return ResponseEntity.badRequest().body(Map.of("error", "newAddress is required when useNewAddress=true"));
            }
            
            // Validate new address fields
            if (newAddress.get("fullName") == null || newAddress.get("address") == null || 
                newAddress.get("city") == null || newAddress.get("postalCode") == null || 
                newAddress.get("country") == null || newAddress.get("phone") == null) {
                log.warn("Missing required address fields in buy-now newAddress: {}", newAddress);
                return ResponseEntity.badRequest().body(Map.of("error", "All address fields are required for new address"));
            }
            
            // Create the new address first
            try {
                // Parse fullName into firstName and lastName
                String fullName = (String) newAddress.get("fullName");
                String[] nameParts = fullName.split(" ", 2);
                String firstName = nameParts[0];
                String lastName = nameParts.length > 1 ? nameParts[1] : "";
                
                AddressDto addressDto = AddressDto.builder()
                    .firstName(firstName)
                    .lastName(lastName)
                    .street((String) newAddress.get("address"))
                    .city((String) newAddress.get("city"))
                    .state((String) newAddress.get("state"))  // Added state field
                    .zipCode((String) newAddress.get("postalCode"))
                    .country((String) newAddress.get("country"))
                    .phone((String) newAddress.get("phone"))
                    .build();
                
                log.info("Creating address DTO for buy-now: {}", addressDto);
                AddressDto createdAddress = addressService.createAddress(clientId, addressDto);
                addressId = createdAddress.getId();
                log.info("Created new address with ID: {} for client: {} (buy-now)", addressId, clientId);
            } catch (Exception e) {
                log.error("Failed to create new address for buy-now: {}", e.getMessage(), e);
                return ResponseEntity.badRequest().body(Map.of("error", "Failed to create new address: " + e.getMessage()));
            }
        } else {
            log.info("Processing existing address for buy-now order, client: {}", clientId);
            // Handle existing address scenario
            Object addressIdObj = buyNowRequest.get("addressId");
            if (addressIdObj == null) {
                log.warn("Missing addressId in buy-now request when useNewAddress=false: {}", buyNowRequest);
                return ResponseEntity.badRequest().body(Map.of("error", "addressId is required when useNewAddress=false"));
            }
            addressId = ((Number) addressIdObj).longValue();
            log.info("Using existing address ID: {} for buy-now order, client: {}", addressId, clientId);
        }
        
        // Get shipping fee
        Object shippingFeeObj = buyNowRequest.get("shippingFee");
        double shippingFee = 0.0; // Default value
        if (shippingFeeObj != null) {
            shippingFee = ((Number) shippingFeeObj).doubleValue();
        }
        log.info("Processing buy-now order with addressId: {} and shippingFee: {} for client: {}", addressId, shippingFee, clientId);

        if (buyNowRequest.containsKey("variantId") && buyNowRequest.get("variantId") != null) {
            // Handle variant if needed
            log.info("Variant ID found in buy-now request: {}", buyNowRequest.get("variantId"));
        }

        // For now, create a regular order and a PaymentIntent
        OrderDto order = orderService.createOrderFromCart(clientId, addressId, shippingFee);
        log.info("Buy-now order created successfully with ID: {} for client: {}", order.getId(), clientId);

        try {
            long amountInCents = Math.round(order.getTotal() * 100);
            log.info("Creating Stripe payment intent for buy-now order: {} with amount: {} cents", order.getId(), amountInCents);
            
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amountInCents)
                    .setCurrency("EUR")
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
                    )
                    .putMetadata("orderId", String.valueOf(order.getId()))
                    .build();
            PaymentIntent intent = PaymentIntent.create(params);
            log.info("Stripe payment intent created successfully for buy-now: {} for order: {}", intent.getId(), order.getId());

            // Persist a Payment record linked to the order using Stripe intent id as transactionRef
            try {
                PaymentDto paymentDto = PaymentDto.builder()
                        .orderId(order.getId())
                        .transactionRef(intent.getId())
                        .paymentMethod("STRIPE")
                        .amount(intent.getAmount() != null ? intent.getAmount() / 100.0 : order.getTotal())
                        .build();
                paymentService.createPayment(paymentDto);
                log.info("Payment record persisted successfully for buy-now order: {}", order.getId());
            } catch (Exception persistEx) {
                // Non-blocking: log and continue
                log.warn("Failed to persist payment record for buy-now: {}", persistEx.getMessage());
            }

            Map<String, Object> response = Map.of(
                    "orderId", order.getId(),
                    "total", order.getTotal(),
                    "currency", "EUR",
                    "clientSecret", intent.getClientSecret(),
                    "paymentProvider", "stripe"
            );
            log.info("Buy-now order creation completed successfully for client: {} with order ID: {}", clientId, order.getId());
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            log.error("Stripe payment intent creation failed for buy-now: {}", e.getMessage(), e);
            return ResponseEntity.ok(Map.of(
                    "orderId", order.getId(),
                    "total", order.getTotal(),
                    "currency", "EUR",
                    "error", "Failed to create payment intent: " + e.getMessage()
            ));
        }
    }

    /** 8. Confirm payment for order */
    @PostMapping("/{orderId}/confirm-payment")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Map<String, Object>> confirmPayment(@PathVariable Long orderId, @RequestBody Map<String, Object> paymentData) {
        try {
            log.info("Confirming payment for order: {} with data: {}", orderId, paymentData);
            
            // Get the order entity
            Order order = orderRepository.findById(orderId).orElse(null);
            if (order == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Order not found"
                ));
            }
            
            // Determine payment flow and process payment
            SmartPaymentRoutingService.PaymentRoutingResult routing = 
                smartPaymentRoutingService.determinePaymentFlow(orderId);
            
            log.info("Payment routing determined for order {}: {}", orderId, routing.getPaymentFlow());
            
            if (routing.getPaymentFlow() == SmartPaymentRoutingService.PaymentFlow.DIRECT_TO_SUPPLIER) {
                // Process SOAP payment through supplier
                try {
                    var supplier = routing.getPrimarySupplier();
                    log.info("Processing SOAP payment for order {} through supplier: {}", orderId, supplier.getName());
                    
                    // Call SOAP payment service
                    var soapResult = soapPaymentService.processSoapPaymentWithResponse(supplier.getId(), order);
                    
                    if ((Boolean) soapResult.get("success")) {
                        log.info("SOAP payment successful for order {}: {}", orderId, soapResult);
                        
                        // Update order status
                        orderService.updateOrderStatus(orderId, OrderStatus.PAID);
                        
                        return ResponseEntity.ok(Map.of(
                            "success", true,
                            "status", "confirmed",
                            "message", "Payment confirmed successfully",
                            "paymentFlow", "SOAP_SUPPLIER",
                            "supplierName", supplier.getName(),
                            "paymentDetails", soapResult
                        ));
                    } else {
                        log.error("SOAP payment failed for order {}: {}", orderId, soapResult);
                        return ResponseEntity.badRequest().body(Map.of(
                            "success", false,
                            "status", "failed",
                            "message", "Payment failed: " + soapResult.get("error"),
                            "paymentFlow", "SOAP_SUPPLIER"
                        ));
                    }
                } catch (Exception e) {
                    log.error("Error processing SOAP payment for order {}: {}", orderId, e.getMessage(), e);
                    return ResponseEntity.internalServerError().body(Map.of(
                        "success", false,
                        "status", "error",
                        "message", "Payment processing error: " + e.getMessage(),
                        "paymentFlow", "SOAP_SUPPLIER"
                    ));
                }
            } else {
                // Platform payment - just confirm the order
                log.info("Platform payment confirmed for order {}: {}", orderId, routing.getPaymentFlow());
                orderService.updateOrderStatus(orderId, OrderStatus.PAID);
                
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "status", "confirmed",
                    "message", "Payment confirmed successfully",
                    "paymentFlow", "PLATFORM"
                ));
            }
            
        } catch (Exception e) {
            log.error("Error confirming payment for order {}: {}", orderId, e.getMessage(), e);
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "status", "error",
                "message", "Internal server error: " + e.getMessage()
            ));
        }
    }

    /** 9. Cancel order (if not shipped) */
    @PostMapping("/{orderId}/cancel")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Map<String, String>> cancelOrder(@PathVariable Long orderId, Authentication auth) {
        // TODO: Add validation that user owns this order
        orderService.updateOrderStatus(orderId, OrderStatus.CANCELLED);

        return ResponseEntity.ok(Map.of(
                "status", "cancelled",
                "message", "Order cancelled successfully"
        ));
    }

    /** 10. Get order timeline/tracking */
    @GetMapping("/{orderId}/timeline")
    @PreAuthorize("hasAnyRole('CLIENT','ADMIN')")
    public ResponseEntity<List<Map<String, Object>>> getOrderTimeline(@PathVariable Long orderId) {
        // TODO: Implement order timeline
        List<Map<String, Object>> timeline = List.of(
                Map.of(
                        "status", "CREATED",
                        "timestamp", "2024-01-15T10:00:00Z",
                        "description", "Commande créée",
                        "icon", "shopping_cart"
                ),
                Map.of(
                        "status", "PAID",
                        "timestamp", "2024-01-15T10:05:00Z",
                        "description", "Paiement confirmé",
                        "icon", "payment"
                ),
                Map.of(
                        "status", "PROCESSING",
                        "timestamp", "2024-01-15T14:00:00Z",
                        "description", "Commande en préparation",
                        "icon", "package"
                )
        );

        return ResponseEntity.ok(timeline);
    }

    // Test endpoint to verify backend is working
    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> testEndpoint() {
        log.info("Test endpoint called successfully");
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Backend is working correctly",
                "timestamp", System.currentTimeMillis()
        ));
    }
}