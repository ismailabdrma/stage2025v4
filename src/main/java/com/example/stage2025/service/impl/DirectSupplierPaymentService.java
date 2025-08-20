package com.example.stage2025.service.impl;

import com.example.stage2025.dto.OrderDto;
import com.example.stage2025.dto.PaymentIntentRequest;
import com.example.stage2025.dto.PaymentIntentResponse;
import com.example.stage2025.entity.Order;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.entity.SoapSupplier;
import com.example.stage2025.enums.OrderStatus;
import com.example.stage2025.service.OrderService;
import com.example.stage2025.repository.OrderRepository;
import com.example.stage2025.repository.ProductRepository;
import com.example.stage2025.service.EmailService;
import com.example.stage2025.service.impl.SoapPaymentService;
import com.example.stage2025.service.PaymentCompletionService;
import com.example.stage2025.service.OrderSessionMappingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import com.example.stage2025.entity.OrderItem;
import com.example.stage2025.service.OrderItemService;
import com.example.stage2025.entity.ApiSupplier;
import com.example.stage2025.repository.SupplierRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class DirectSupplierPaymentService {
    private void validateOrderItems(com.example.stage2025.entity.Order order) {
        if (order.getItems() != null) {
            for (com.example.stage2025.entity.OrderItem item : order.getItems()) {
                if (item.getProduct() == null) {
                    throw new IllegalStateException(
                        "Product is null for item: " + item.getProductName()
                    );
                }
                
                // Check if product has either supplierRef or externalProductId (fallback logic like SoapPaymentService)
                String supplierRef = item.getProduct().getSupplierRef();
                String externalProductId = item.getProduct().getExternalProductId();
                
                if ((supplierRef == null || supplierRef.isEmpty()) && 
                    (externalProductId == null || externalProductId.isEmpty())) {
                    throw new IllegalStateException(
                        "Product missing supplier reference (both supplierRef and externalProductId are null/empty) for item: " + item.getProductName()
                    );
                }
            }
        }
    }

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderItemService orderItemService;
    private final SupplierRepository supplierRepository;

    private final RestTemplate restTemplate;
    private final SoapPaymentService soapPaymentService;
    private final OrderService orderService;
    private final EmailService emailService;
    private final PaymentCompletionService paymentCompletionService;
    private final OrderSessionMappingService orderSessionMappingService;

    /**
     * Creates payment intent directly with supplier's payment system
     * Customer pays supplier directly (full display price €130)
     * Supplier receives €130, then owes platform €30 commission
     */
    @Transactional
    public PaymentIntentResponse createSupplierPaymentIntent(PaymentIntentRequest request, Supplier supplier) {
        try {
            log.info("Creating direct payment intent with supplier: {} for order: {}",
                    supplier.getName(), request.getOrderId());

            // Always load the order and its items/products from the DB
            var orderOpt = orderRepository.findWithItemsAndProductSupplierById(request.getOrderId());
            if (orderOpt.isEmpty()) {
                throw new RuntimeException("Order not found: " + request.getOrderId());
            }
            var order = orderOpt.get();

            // IMPORTANT: Customer pays supplier directly (full display price €130)
            // Supplier receives €130, then owes platform €30 commission
            // This ensures platform gets commission while keeping supplier payment system
            
            log.info("Customer will pay supplier directly: €{} (full display price)", request.getAmount() / 100.0);
            log.info("Supplier will receive €{} and owe platform €{} commission", 
                    request.getAmount() / 100.0, calculatePlatformCommission(order) / 100.0);

            // Route to appropriate supplier payment system based on supplier type
            if (supplier.isHasOwnPaymentSystem()) {
                // Check supplier type by discriminator value instead of instanceof
                if ("SOAP".equals(supplier.getSupplierType()) || supplier instanceof SoapSupplier) {
                    log.info("Routing to SOAP payment for supplier: {}", supplier.getName());
                    
                    // If supplier is not a SoapSupplier instance, reload it from the repository
                    if (!(supplier instanceof SoapSupplier)) {
                        log.info("Reloading supplier {} as SoapSupplier for proper SOAP operations", supplier.getName());
                        var reloadedSupplier = supplierRepository.findById(supplier.getId());
                        if (reloadedSupplier.isPresent() && reloadedSupplier.get() instanceof SoapSupplier) {
                            supplier = reloadedSupplier.get();
                            log.info("Successfully reloaded supplier {} as SoapSupplier", supplier.getName());
                        } else {
                            throw new RuntimeException("Failed to reload supplier " + supplier.getName() + " as SoapSupplier");
                        }
                    }
                    
                    return createSoapPaymentIntentFromOrder(request, supplier, order);
                } else {
                    log.info("Routing to REST API payment for supplier: {}", supplier.getName());
                    return createRestApiPaymentIntentFromOrder(request, supplier, order);
                }
            } else {
                throw new RuntimeException("Supplier does not have own payment system configured");
            }

        } catch (Exception e) {
            log.error("Error creating supplier payment intent: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to create supplier payment intent: " + e.getMessage());
        }
    }

    /**
     * Calculate platform commission (display price minus supplier price)
     */
    private long calculatePlatformCommission(Order order) {
        // Calculate commission (display price - supplier price)
        Double orderTotal = order.getTotal();
        if (orderTotal == null) {
            log.warn("Order total is null for order: {}", order.getId());
            return 0;
        }
        
        double totalDisplayPrice = orderTotal;
        double totalSupplierPrice = order.getItems().stream()
                .mapToDouble(item -> {
                    if (item.getProduct() != null && item.getProduct().getSupplierPrice() != null) {
                        return item.getProduct().getSupplierPrice() * item.getQuantity();
                    }
                    // Fallback to unit price if supplier price not available
                    Double unitPrice = item.getUnitPrice();
                    return (unitPrice != null ? unitPrice : 0.0) * item.getQuantity();
                })
                .sum();
        
        double commission = totalDisplayPrice - totalSupplierPrice;
        return Math.round(commission * 100); // Convert to cents
    }

    private PaymentIntentResponse createRestApiPaymentIntent(PaymentIntentRequest request,
                                                             Supplier supplier,
                                                             OrderDto orderDto) {
        try {
            log.info("Creating REST API payment intent with supplier: {}", supplier.getName());

            // Prepare request for supplier's API
            Map<String, Object> supplierRequest = new HashMap<>();
            supplierRequest.put("orderId", request.getOrderId());
            supplierRequest.put("amount", request.getAmount());
            supplierRequest.put("currency", request.getCurrency());
            supplierRequest.put("clientEmail", orderDto.getClientEmail());
            supplierRequest.put("description", "Order #" + request.getOrderId());
            supplierRequest.put("returnUrl", getReturnUrl(request.getOrderId()));
            supplierRequest.put("cancelUrl", getCancelUrl(request.getOrderId()));

            // Add order items details
            supplierRequest.put("items", orderDto.getItems());

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // TODO: Add authentication when API key/secret fields are added to Supplier entity
            // if (supplier.getApiKey() != null && !supplier.getApiKey().isEmpty()) {
            //     headers.set("Authorization", "Bearer " + supplier.getApiKey());
            // }
            // if (supplier.getApiSecret() != null && !supplier.getApiSecret().isEmpty()) {
            //     headers.set("X-API-Secret", supplier.getApiSecret());
            // }

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(supplierRequest, headers);

            // Call supplier's payment API
            String paymentEndpoint = supplier.getPaymentApiEndpoint() + "/create-payment-intent";
            ResponseEntity<Map> response = restTemplate.exchange(
                    paymentEndpoint,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> responseBody = response.getBody();

                return PaymentIntentResponse.builder()
                        .id((String) responseBody.get("id"))
                        .amount(((Number) responseBody.get("amount")).longValue())
                        .currency((String) responseBody.get("currency"))
                        .status((String) responseBody.get("status"))
                        .clientSecret((String) responseBody.get("clientSecret"))
                        .paymentUrl((String) responseBody.get("paymentUrl")) // Direct payment URL
                        .paymentFlow("DIRECT_TO_SUPPLIER")
                        .supplierName(supplier.getName())
                        .supplierId(supplier.getId())
                        .build();
            } else {
                throw new RuntimeException("Invalid response from supplier payment API");
            }

        } catch (Exception e) {
            log.error("Error creating REST API payment intent with supplier {}: {}",
                    supplier.getName(), e.getMessage(), e);
            throw new RuntimeException("Failed to create payment intent with supplier: " + e.getMessage());
        }
    }

    // Always use Order entity from DB for SOAP payment
    private PaymentIntentResponse createSoapPaymentIntentFromOrder(PaymentIntentRequest request,
                                                                  Supplier supplier,
                                                                  Order order) {
        try {
            log.info("Creating SOAP payment intent with supplier: {} (DB order)", supplier.getName());

            // Validate all order items before payment
            validateOrderItems(order);

            // Call SOAP service to create payment session
            try {
                List<OrderItem> orderItems = order.getItems();
                
                // Fix: Cast Supplier to SoapSupplier for SOAP operations
                if (!(supplier instanceof SoapSupplier)) {
                    throw new RuntimeException("Supplier " + supplier.getName() + " is not a SOAP supplier");
                }
                SoapSupplier soapSupplier = (SoapSupplier) supplier;
                
                Map<String, Object> soapResult = createSoapPaymentSession(soapSupplier, order, orderItems);
                if (soapResult.get("success").equals(true)) {
                    String paymentUrl = (String) soapResult.get("paymentUrl");
                    log.info("SOAP payment session created successfully. PaymentURL: {}", paymentUrl);
                    return PaymentIntentResponse.builder()
                            .id((String) soapResult.get("sessionId"))
                            .amount(request.getAmount())
                            .currency(request.getCurrency())
                            .status("requires_payment_method")
                            .paymentUrl(paymentUrl)
                            .paymentFlow("DIRECT_TO_SUPPLIER")
                            .supplierName(supplier.getName())
                            .supplierId(supplier.getId())
                            .build();
                } else {
                    throw new RuntimeException("SOAP payment session creation failed");
                }
            } catch (RuntimeException e) {
                log.error("SOAP payment failed for supplier {}: {}", supplier.getName(), e.getMessage());
                throw new RuntimeException("Supplier payment failed: " + e.getMessage());
            }

        } catch (Exception e) {
            log.error("Error creating SOAP payment intent with supplier {}: {}",
                    supplier.getName(), e.getMessage(), e);
            throw new RuntimeException("Failed to create SOAP payment intent: " + e.getMessage());
        }
    }

    // Always use Order entity from DB for REST API payment (stub)
    private PaymentIntentResponse createRestApiPaymentIntentFromOrder(PaymentIntentRequest request,
                                                                     Supplier supplier,
                                                                     Order order) {
        try {
            log.info("Creating REST API payment intent for supplier: {} with order: {}", supplier.getName(), order.getId());
            
            // Get order items for this supplier
            List<OrderItem> orderItems = orderItemService.findByOrderIdAndSupplierId(order.getId(), supplier.getId());
            
            if (orderItems.isEmpty()) {
                throw new RuntimeException("No order items found for supplier: " + supplier.getName());
            }
            
            // Calculate supplier total
            Double supplierTotal = orderItems.stream()
                    .map(OrderItem::getSubtotal)
                    .filter(subtotal -> subtotal != null)
                    .reduce(0.0, Double::sum);
            
            log.info("Supplier {} will receive £{} (full display price)", supplier.getName(), supplierTotal);
            
            // Calculate commission (platform fee)
            Double commission = 0.0; // For direct supplier payment, no commission
            log.info("Supplier will receive £{} and owe platform £{} commission", supplierTotal, commission);
            
            // Create payment session for REST API supplier
            Map<String, Object> paymentSession = createRestApiPaymentSession(supplier, order, orderItems);
            
            if ((Boolean) paymentSession.get("success")) {
                // Create payment intent response
                PaymentIntentResponse response = new PaymentIntentResponse();
                response.setId("REST_" + supplier.getId() + "_" + order.getId() + "_" + System.currentTimeMillis());
                response.setAmount(Math.round(supplierTotal * 100)); // Convert to cents
                response.setCurrency(order.getCurrency());
                response.setStatus("requires_payment_method");
                response.setClientSecret("rest_" + supplier.getId() + "_" + order.getId());
                
                // Add supplier-specific payment details to response
                // Note: PaymentIntentResponse doesn't have setPaymentMethodTypes or setMetadata methods
                // We'll store the payment URL in the client secret for now
                String paymentUrl = (String) paymentSession.get("paymentUrl");
                String sessionId = (String) paymentSession.get("sessionId");
                
                log.info("REST API payment intent created successfully for supplier: {}", supplier.getName());
                log.info("Payment URL: {}", paymentUrl);
                log.info("Session ID: {}", sessionId);
                
                return response;
                
            } else {
                String errorMessage = (String) paymentSession.get("error");
                throw new RuntimeException("Failed to create REST API payment session: " + errorMessage);
            }
            
        } catch (Exception e) {
            log.error("Error creating REST API payment intent: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to create REST API payment intent: " + e.getMessage());
        }
    }

    /**
     * Create SOAP payment session with supplier
     * This ensures the customer is redirected back to our platform
     */
    private Map<String, Object> createSoapPaymentSession(SoapSupplier supplier, Order order, List<OrderItem> orderItems) {
        try {
            log.info("Creating SOAP payment session with supplier: {}", supplier.getName());
            
            // Call the SOAP service to process the payment
            Map<String, Object> soapResponse = soapPaymentService.processSoapPaymentWithResponse(supplier.getId(), order);
            
            log.info("SOAP Response received: {}", soapResponse);
            
            if ((Boolean) soapResponse.get("success")) {
                // SOAP payment was successful - create a session ID for tracking
                String sessionId = "SOAP_" + supplier.getId() + "_" + order.getId() + "_" + System.currentTimeMillis();
                
                // Use the actual payment URL from the SOAP response instead of generating a WSDL URL
                String paymentUrl = (String) soapResponse.get("url");
                
                if (paymentUrl == null || paymentUrl.isEmpty()) {
                    log.warn("No payment URL received from SOAP response, falling back to WSDL URL");
                    // Fallback to WSDL URL if no payment URL in response
                    paymentUrl = supplier.getEffectivePaymentWsdlUrl() + "?orderId=" + order.getId() + 
                                   "&amount=" + order.getTotal() + 
                                   "&currency=" + order.getCurrency() + 
                                   "&sessionId=" + sessionId;
                }
                
                log.info("Created supplier payment URL: {}", paymentUrl);
                
                // Store session mapping for payment completion with Stripe session ID
                String stripeSessionId = (String) soapResponse.get("stripeSessionId");
                orderSessionMappingService.storeSessionMapping(sessionId, order.getId(), supplier.getId(), "SOAP", stripeSessionId);
                log.info("Stored session mapping for session: {} -> order: {}, supplier: {} with Stripe ID: {}", sessionId, order.getId(), supplier.getId(), stripeSessionId);
                
                // Return the payment URL for the customer to be redirected
                Map<String, Object> result = new HashMap<>();
                result.put("success", true);
                result.put("sessionId", sessionId);
                result.put("paymentUrl", paymentUrl);
                result.put("message", "Payment session created. Redirecting to supplier payment system.");
                
                log.info("SOAP payment session created successfully. Customer redirected to: {}", paymentUrl);
                return result;
                
            } else {
                String errorMessage = (String) soapResponse.get("error");
                log.error("SOAP payment failed: {}", errorMessage);
                return Map.of("success", false, "error", "SOAP payment failed: " + errorMessage);
            }
            
        } catch (Exception e) {
            log.error("Error creating SOAP payment session: {}", e.getMessage(), e);
            return Map.of("success", false, "error", "Failed to create SOAP payment session: " + e.getMessage());
        }
    }

    /**
     * Create REST API payment session with supplier
     * This ensures the customer is redirected back to our platform
     */
    private Map<String, Object> createRestApiPaymentSession(Supplier supplier, Order order, List<OrderItem> orderItems) {
        try {
            log.info("Creating REST API payment session with supplier: {}", supplier.getName());
            
            // Generate session ID for tracking
            String sessionId = "REST_" + supplier.getId() + "_" + order.getId() + "_" + System.currentTimeMillis();
            
            // For REST API suppliers with their own payment system, we need to redirect to their payment page
            // Since they handle payment directly, we'll create a payment URL that goes to their system
            String supplierPaymentUrl = supplier.getPaymentApiEndpoint();
            
            if (supplierPaymentUrl == null || supplierPaymentUrl.isEmpty()) {
                // Fallback to API URL if payment endpoint not specified
                if (supplier instanceof ApiSupplier) {
                    supplierPaymentUrl = ((ApiSupplier) supplier).getApiUrl();
                }
            }
            
            if (supplierPaymentUrl == null || supplierPaymentUrl.isEmpty()) {
                throw new RuntimeException("Supplier does not have payment endpoint configured");
            }
            
            // Create a payment URL that includes our order information
            // This will be a POST request to the supplier's payment system
            String paymentUrl = supplierPaymentUrl + "?orderId=" + order.getId() + 
                               "&amount=" + order.getTotal() + 
                               "&currency=" + order.getCurrency() + 
                               "&sessionId=" + sessionId;
            
            log.info("Created supplier payment URL: {}", paymentUrl);
            
            // Store session mapping for payment completion (REST API suppliers may not have Stripe session ID)
            orderSessionMappingService.storeSessionMapping(sessionId, order.getId(), supplier.getId(), "REST", null);
            log.info("Stored session mapping for session: {} -> order: {}, supplier: {}", sessionId, order.getId(), supplier.getId());
            
            // Return the payment URL for the customer to be redirected
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("sessionId", sessionId);
            result.put("paymentUrl", paymentUrl);
            result.put("message", "Payment session created. Redirecting to supplier payment system.");
            
            log.info("REST API payment session created successfully. Customer redirected to: {}", paymentUrl);
            return result;
            
        } catch (Exception e) {
            log.error("Error creating REST API payment session: {}", e.getMessage(), e);
            return Map.of("success", false, "error", "Failed to create REST API payment session: " + e.getMessage());
        }
    }

    /**
     * Handles webhook/callback from supplier after direct payment
     */
    public void handleSupplierPaymentCallback(String supplierId, Map<String, Object> callbackData) {
        try {
            log.info("Received payment callback from supplier: {}", supplierId);

            String orderId = (String) callbackData.get("orderId");
            String status = (String) callbackData.get("status");
            String transactionRef = (String) callbackData.get("transactionRef");

            if ("success".equalsIgnoreCase(status) || "completed".equalsIgnoreCase(status)) {
                // Mark order as paid
                orderService.updateOrderStatus(Long.parseLong(orderId), OrderStatus.PAID);

                // Send confirmation emails
                sendDirectPaymentConfirmation(Long.parseLong(orderId), supplierId, transactionRef);

                log.info("Direct supplier payment confirmed for order: {}", orderId);
            } else {
                log.warn("Direct supplier payment failed for order: {} with status: {}", orderId, status);
                // Handle failed payment
                orderService.updateOrderStatus(Long.parseLong(orderId), OrderStatus.PAYMENT_FAILED);
            }

        } catch (Exception e) {
            log.error("Error handling supplier payment callback: {}", e.getMessage(), e);
        }
    }

    private void sendDirectPaymentConfirmation(Long orderId, String supplierId, String transactionRef) {
        try {
            var orderDto = orderService.getOrderById(orderId);
            if (orderDto != null) {
                // TODO: Send confirmation email to customer
                // emailService.sendDirectPaymentConfirmation(orderDto.getClientEmail(), orderDto, supplierId);

                // TODO: Send notification to admin
                // emailService.sendAdminDirectPaymentNotification(orderDto, supplierId, transactionRef);
                log.info("Direct payment confirmation emails not implemented yet for order {}", orderId);
            }
        } catch (Exception e) {
            log.error("Error sending direct payment confirmation: {}", e.getMessage());
        }
    }

    private String getReturnUrl(Long orderId) {
        return "https://yourplatform.com/payment/success?orderId=" + orderId;
    }

    private String getCancelUrl(Long orderId) {
        return "https://yourplatform.com/payment/cancel?orderId=" + orderId;
    }
}