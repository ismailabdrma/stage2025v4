package com.example.stage2025.controller;

import com.example.stage2025.service.OrderSessionMappingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/order-session-mapping")
@RequiredArgsConstructor
@Slf4j
public class OrderSessionMappingController {

    private final OrderSessionMappingService orderSessionMappingService;

    /**
     * Get session mapping by session ID
     * This endpoint is used by the frontend to retrieve order information
     * when the supplier redirects with wrong parameters
     */
    @GetMapping("/session/{sessionId}")
    public ResponseEntity<Map<String, Object>> getSessionMapping(@PathVariable String sessionId) {
        try {
            log.info("Getting session mapping for session ID: {}", sessionId);
            
            var sessionMapping = orderSessionMappingService.getSessionMapping(sessionId);
            if (sessionMapping == null) {
                log.warn("Session mapping not found for session ID: {}", sessionId);
                return ResponseEntity.notFound().build();
            }

            Map<String, Object> response = Map.of(
                "sessionId", sessionId,
                "orderId", sessionMapping.getOrderId(),
                "supplierId", sessionMapping.getSupplierId(),
                "paymentType", sessionMapping.getPaymentType(),
                "status", sessionMapping.getStatus(),
                "stripeSessionId", sessionMapping.getStripeSessionId()
            );

            log.info("Session mapping found: {}", response);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error getting session mapping for session ID: {}", sessionId, e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to retrieve session mapping: " + e.getMessage()));
        }
    }

    /**
     * Get order information by session ID
     * This endpoint provides order details for a given session
     */
    @GetMapping("/order-info/{sessionId}")
    public ResponseEntity<Map<String, Object>> getOrderInfoBySession(@PathVariable String sessionId) {
        try {
            log.info("Getting order info for session ID: {}", sessionId);
            
            var orderInfo = orderSessionMappingService.getOrderInfoBySession(sessionId);
            if (orderInfo == null) {
                log.warn("Order info not found for session ID: {}", sessionId);
                return ResponseEntity.notFound().build();
            }

            log.info("Order info found: {}", orderInfo);
            return ResponseEntity.ok(orderInfo);

        } catch (Exception e) {
            log.error("Error getting order info for session ID: {}", sessionId, e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to retrieve order info: " + e.getMessage()));
        }
    }

    /**
     * Get session mapping by Stripe session ID
     * This endpoint is used when the supplier redirects with Stripe session ID as order_id
     */
    @GetMapping("/stripe/{stripeSessionId}")
    public ResponseEntity<Map<String, Object>> getSessionMappingByStripeSession(@PathVariable String stripeSessionId) {
        try {
            log.info("Getting session mapping by Stripe session ID: {}", stripeSessionId);
            
            // Try to find session mapping by Stripe session ID
            var sessionMappings = orderSessionMappingService.getAllActiveSessions();
            var matchingMapping = sessionMappings.stream()
                .filter(mapping -> stripeSessionId.equals(mapping.getStripeSessionId()))
                .findFirst();
            
            if (matchingMapping.isEmpty()) {
                log.warn("No session mapping found for Stripe session ID: {}", stripeSessionId);
                return ResponseEntity.notFound().build();
            }

            var mapping = matchingMapping.get();
            Map<String, Object> response = Map.of(
                "sessionId", mapping.getSessionId(),
                "orderId", mapping.getOrderId(),
                "supplierId", mapping.getSupplierId(),
                "paymentType", mapping.getPaymentType(),
                "status", mapping.getStatus(),
                "stripeSessionId", mapping.getStripeSessionId()
            );

            log.info("Session mapping found by Stripe session ID: {}", response);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error getting session mapping by Stripe session ID: {}", stripeSessionId, e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to retrieve session mapping: " + e.getMessage()));
        }
    }

    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "healthy",
            "service", "order_session_mapping",
            "timestamp", System.currentTimeMillis()
        ));
    }
}
