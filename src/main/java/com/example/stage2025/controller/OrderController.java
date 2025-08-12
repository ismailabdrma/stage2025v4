// src/main/java/com/example/stage2025/controller/OrderController.java
package com.example.stage2025.controller;

import com.example.stage2025.dto.OrderDto;
import com.example.stage2025.enums.DeliveryStatus;
import com.example.stage2025.enums.OrderStatus;
import com.example.stage2025.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // Helper to get client ID from authentication
    private Long getClientId(Authentication auth) {
        // Change this logic to extract client ID correctly
        return Long.valueOf(auth.getName());
    }

    /** 1. Create an order from cart (client only) */
    @PostMapping("/create")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<OrderDto> createOrder(Authentication auth, @RequestParam Long addressId, @RequestParam double shippingFee) {
        Long clientId = getClientId(auth);
        OrderDto dto = orderService.createOrderFromCart(clientId, addressId, shippingFee);
        return ResponseEntity.ok(dto);
    }

    /** 2. List all orders for current client */
    @GetMapping
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<OrderDto>> getClientOrders(Authentication auth) {
        Long clientId = getClientId(auth);
        List<OrderDto> orders = orderService.getOrdersByClient(clientId);
        return ResponseEntity.ok(orders);
    }

    /** 3. Get order by ID (client can only access their own orders, admin can access any) */
    @GetMapping("/{orderId}")
    @PreAuthorize("hasAnyRole('CLIENT','ADMIN')")
    public ResponseEntity<OrderDto> getOrder(@PathVariable Long orderId) {
        // Add logic if you want to restrict access based on the user
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    /** 4. Update order status (admin only) */
    @PatchMapping("/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestParam OrderStatus status) {
        orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok("Order status updated");
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
    public ResponseEntity<Map<String, Object>> createOrderFromJson(Authentication auth, @RequestBody Map<String, Object> orderRequest) {
        Long clientId = getClientId(auth);
        Long addressId = ((Number) orderRequest.get("addressId")).longValue();
        double shippingFee = ((Number) orderRequest.get("shippingFee")).doubleValue();
        
        // Handle coupon if provided
        String couponCode = (String) orderRequest.get("couponCode");
        
        // Create order from cart
        OrderDto order = orderService.createOrderFromCart(clientId, addressId, shippingFee);
        
                        // Return order with payment intent information
                Map<String, Object> response = Map.of(
                    "orderId", order.getId(),
                    "total", order.getTotal(),
                    "currency", "EUR",
                    "clientSecret", "pi_test_" + System.currentTimeMillis(), // Mock payment intent
                    "paymentProvider", "stripe"
                );
        
        return ResponseEntity.ok(response);
    }

    /** 7. Create order from specific items (for buy now) */
    @PostMapping("/buy-now")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Map<String, Object>> createBuyNowOrder(Authentication auth, @RequestBody Map<String, Object> buyNowRequest) {
        Long clientId = getClientId(auth);
        Long productId = ((Number) buyNowRequest.get("productId")).longValue();
        int quantity = ((Number) buyNowRequest.get("quantity")).intValue();
        Long addressId = ((Number) buyNowRequest.get("addressId")).longValue();
        double shippingFee = ((Number) buyNowRequest.get("shippingFee")).doubleValue();
        
        Long variantId = null;
        if (buyNowRequest.containsKey("variantId") && buyNowRequest.get("variantId") != null) {
            variantId = ((Number) buyNowRequest.get("variantId")).longValue();
        }
        
        // TODO: Implement buy now order creation
        // For now, create a regular order
        OrderDto order = orderService.createOrderFromCart(clientId, addressId, shippingFee);
        
                        Map<String, Object> response = Map.of(
                    "orderId", order.getId(),
                    "total", order.getTotal(),
                    "currency", "EUR",
                    "clientSecret", "pi_test_" + System.currentTimeMillis(),
                    "paymentProvider", "stripe"
                );
        
        return ResponseEntity.ok(response);
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
}
