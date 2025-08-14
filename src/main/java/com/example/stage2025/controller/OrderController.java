// src/main/java/com/example/stage2025/controller/OrderController.java
package com.example.stage2025.controller;

import com.example.stage2025.dto.OrderDto;
import com.example.stage2025.enums.DeliveryStatus;
import com.example.stage2025.enums.OrderStatus;
import com.example.stage2025.service.OrderService;
import com.example.stage2025.service.PaymentService;
import com.example.stage2025.dto.PaymentDto;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final PaymentService paymentService;

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

    /** 6. Create order with JSON body (for buy now and cart checkout) */
    @PostMapping
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Map<String, Object>> createOrderFromJson(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @RequestBody Map<String, Object> orderRequest) {
        Long clientId = resolveClientId(auth, userIdAttr);
        Long addressId = ((Number) orderRequest.get("addressId")).longValue();
        double shippingFee = ((Number) orderRequest.get("shippingFee")).doubleValue();
        
        // Handle coupon if provided
        // String couponCode = (String) orderRequest.get("couponCode"); // reserved for future use
        
        // Create order from cart
        OrderDto order = orderService.createOrderFromCart(clientId, addressId, shippingFee);

        // Create a real Stripe PaymentIntent and return clientSecret
        try {
            long amountInCents = Math.round(order.getTotal() * 100);
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amountInCents)
                    .setCurrency("EUR")
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
                    )
                    .putMetadata("orderId", String.valueOf(order.getId()))
                    .build();
            PaymentIntent intent = PaymentIntent.create(params);

            // Persist a Payment record linked to the order using Stripe intent id as transactionRef
            try {
                PaymentDto paymentDto = PaymentDto.builder()
                        .orderId(order.getId())
                        .transactionRef(intent.getId())
                        .paymentMethod("STRIPE")
                        .amount(intent.getAmount() != null ? intent.getAmount() / 100.0 : order.getTotal())
                        .build();
                paymentService.createPayment(paymentDto);
            } catch (Exception persistEx) {
                // Non-blocking: log and continue
            }

            Map<String, Object> response = Map.of(
                    "orderId", order.getId(),
                    "total", order.getTotal(),
                    "currency", "EUR",
                    "clientSecret", intent.getClientSecret(),
                    "paymentProvider", "stripe"
            );
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.ok(Map.of(
                    "orderId", order.getId(),
                    "total", order.getTotal(),
                    "currency", "EUR",
                    "error", "Failed to create payment intent"
            ));
        }
    }

    /** 7. Create order from specific items (for buy now) */
    @PostMapping("/buy-now")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Map<String, Object>> createBuyNowOrder(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @RequestBody Map<String, Object> buyNowRequest) {
        Long clientId = resolveClientId(auth, userIdAttr);
        // Long productId = ((Number) buyNowRequest.get("productId")).longValue();
        // int quantity = ((Number) buyNowRequest.get("quantity")).intValue();
        Long addressId = ((Number) buyNowRequest.get("addressId")).longValue();
        double shippingFee = ((Number) buyNowRequest.get("shippingFee")).doubleValue();
        
        // Long variantId = null;
        if (buyNowRequest.containsKey("variantId") && buyNowRequest.get("variantId") != null) {
            // variantId = ((Number) buyNowRequest.get("variantId")).longValue();
        }
        
        // For now, create a regular order and a PaymentIntent
        OrderDto order = orderService.createOrderFromCart(clientId, addressId, shippingFee);

        try {
            long amountInCents = Math.round(order.getTotal() * 100);
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amountInCents)
                    .setCurrency("EUR")
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
                    )
                    .putMetadata("orderId", String.valueOf(order.getId()))
                    .build();
            PaymentIntent intent = PaymentIntent.create(params);

            // Persist a Payment record linked to the order using Stripe intent id as transactionRef
            try {
                PaymentDto paymentDto = PaymentDto.builder()
                        .orderId(order.getId())
                        .transactionRef(intent.getId())
                        .paymentMethod("STRIPE")
                        .amount(intent.getAmount() != null ? intent.getAmount() / 100.0 : order.getTotal())
                        .build();
                paymentService.createPayment(paymentDto);
            } catch (Exception persistEx) {
                // Non-blocking
            }

            Map<String, Object> response = Map.of(
                    "orderId", order.getId(),
                    "total", order.getTotal(),
                    "currency", "EUR",
                    "clientSecret", intent.getClientSecret(),
                    "paymentProvider", "stripe"
            );
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.ok(Map.of(
                    "orderId", order.getId(),
                    "total", order.getTotal(),
                    "currency", "EUR",
                    "error", "Failed to create payment intent"
            ));
        }
    }

    /** 8. Confirm payment for order */
    @PostMapping("/{orderId}/confirm-payment")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Map<String, String>> confirmPayment(@PathVariable Long orderId, @RequestBody Map<String, Object> paymentData) {
        // TODO: Implement payment confirmation logic
        // For now, just update order status
        orderService.updateOrderStatus(orderId, OrderStatus.PAID);
        
        return ResponseEntity.ok(Map.of(
            "status", "confirmed",
            "message", "Payment confirmed successfully"
        ));
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
                "description", "Commande cr\u00E9\u00E9e",
                "icon", "shopping_cart"
            ),
            Map.of(
                "status", "PAID",
                "timestamp", "2024-01-15T10:05:00Z",
                "description", "Paiement confirm\u00E9",
                "icon", "payment"
            ),
            Map.of(
                "status", "PROCESSING",
                "timestamp", "2024-01-15T14:00:00Z",
                "description", "Commande en pr\u00E9paration",
                "icon", "package"
            )
        );
        
        return ResponseEntity.ok(timeline);
    }
}