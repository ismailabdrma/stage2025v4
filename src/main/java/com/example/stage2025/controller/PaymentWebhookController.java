package com.example.stage2025.controller;

import com.example.stage2025.service.PaymentCompletionService;
import com.example.stage2025.service.OrderSessionMappingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/webhooks/payment")
@CrossOrigin(origins = "*")
public class PaymentWebhookController {

    private static final Logger log = LoggerFactory.getLogger(PaymentWebhookController.class);

    @Autowired
    private PaymentCompletionService paymentCompletionService;

    @Autowired
    private OrderSessionMappingService orderSessionMappingService;

    /**
     * Webhook endpoint for suppliers to notify payment completion
     * This allows suppliers to notify our system when payment is completed
     */
    @PostMapping("/completion")
    public ResponseEntity<Map<String, Object>> handlePaymentCompletion(
            @RequestBody Map<String, Object> webhookData,
            @RequestParam(required = false) String sessionId,
            @RequestParam(required = false) String orderId,
            @RequestParam(required = false) String supplierId,
            @RequestParam(required = false) String paymentId,
            @RequestParam(required = false) String status
    ) {
        try {
            log.info("Received payment completion webhook: sessionId={}, orderId={}, supplierId={}, paymentId={}, status={}", 
                    sessionId, orderId, supplierId, paymentId, status);
            log.info("Webhook body: {}", webhookData);

            // Extract data from webhook body if not in query params
            String actualSessionId = sessionId != null ? sessionId : (String) webhookData.get("sessionId");
            String actualOrderId = orderId != null ? orderId : (String) webhookData.get("orderId");
            String actualSupplierId = supplierId != null ? supplierId : (String) webhookData.get("supplierId");
            String actualPaymentId = paymentId != null ? paymentId : (String) webhookData.get("paymentId");
            String actualStatus = status != null ? status : (String) webhookData.get("status");

            if (actualSessionId == null && actualOrderId == null) {
                log.error("Missing required parameters: sessionId or orderId");
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Missing required parameters: sessionId or orderId"
                ));
            }

            // Process payment completion
            Map<String, Object> result = paymentCompletionService.processPaymentCompletion(
                actualSessionId, actualOrderId, actualSupplierId, actualPaymentId, actualStatus, webhookData
            );

            log.info("Payment completion processed successfully: {}", result);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            log.error("Error processing payment completion webhook", e);
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", "Internal server error: " + e.getMessage()
            ));
        }
    }

    /**
     * GET endpoint for suppliers to redirect customers after payment
     * This allows suppliers to redirect customers to our success page
     */
    @GetMapping("/redirect")
    public ResponseEntity<Map<String, Object>> handlePaymentRedirect(
            @RequestParam String sessionId,
            @RequestParam(required = false) String orderId,
            @RequestParam(required = false) String supplierId,
            @RequestParam(required = false) String paymentId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String stripeSessionId
    ) {
        try {
            log.info("Received payment redirect request: sessionId={}, orderId={}, supplierId={}, paymentId={}, status={}, stripeSessionId={}", 
                    sessionId, orderId, supplierId, paymentId, status, stripeSessionId);

            // Store Stripe session ID in session mapping if provided
            if (stripeSessionId != null && !stripeSessionId.isEmpty()) {
                orderSessionMappingService.updateStripeSessionId(sessionId, stripeSessionId);
                log.info("Updated session {} with Stripe session ID: {}", sessionId, stripeSessionId);
            }

            // Process payment completion first
            Map<String, Object> result = paymentCompletionService.processPaymentCompletion(
                sessionId, orderId, supplierId, paymentId, status, Map.of()
            );

            if ((Boolean) result.get("success")) {
                // Return redirect information
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "redirectUrl", "/payment-success.html?sessionId=" + sessionId + "&orderId=" + result.get("orderId"),
                    "message", "Payment completed successfully. Redirecting to success page."
                ));
            } else {
                return ResponseEntity.ok(Map.of(
                    "success", false,
                    "error", result.get("error"),
                    "redirectUrl", "/payment-error.html?sessionId=" + sessionId + "&error=" + result.get("error")
                ));
            }

        } catch (Exception e) {
            log.error("Error processing payment redirect", e);
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", "Internal server error: " + e.getMessage(),
                "redirectUrl", "/payment/error?error=Internal server error"
            ));
        }
    }

    /**
     * Health check endpoint for webhook testing
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "healthy",
            "service", "Payment Webhook Controller",
            "timestamp", System.currentTimeMillis()
        ));
    }

    /**
     * Get payment status for a session or order
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getPaymentStatus(
            @RequestParam(required = false) String sessionId,
            @RequestParam(required = false) String orderId
    ) {
        try {
            if (sessionId == null && orderId == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Missing required parameters: sessionId or orderId"
                ));
            }

            Map<String, Object> result = paymentCompletionService.getPaymentStatus(sessionId, orderId);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            log.error("Error getting payment status", e);
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", "Internal server error: " + e.getMessage()
            ));
        }
    }

    /**
     * Lookup endpoint to find our internal session mapping using Stripe session ID
     * This helps bridge the gap between Stripe's session ID and our internal session ID
     */
    @GetMapping("/lookup")
    public ResponseEntity<Map<String, Object>> lookupSessionMapping(
            @RequestParam String stripeSessionId
    ) {
        try {
            log.info("Looking up session mapping for Stripe session ID: {}", stripeSessionId);

            // Try to find our session mapping by searching through all active sessions
            var sessionMappings = orderSessionMappingService.getAllActiveSessions();
            
            for (var mapping : sessionMappings) {
                // Check if this session has the Stripe session ID stored
                if (stripeSessionId.equals(mapping.getStripeSessionId())) {
                    log.info("Found session mapping with matching Stripe session ID: sessionId={}, orderId={}, supplierId={}", 
                            mapping.getSessionId(), mapping.getOrderId(), mapping.getSupplierId());
                    
                    return ResponseEntity.ok(Map.of(
                        "success", true,
                        "sessionId", mapping.getSessionId(),
                        "orderId", mapping.getOrderId().toString(),
                        "supplierId", mapping.getSupplierId().toString(),
                        "paymentType", mapping.getPaymentType(),
                        "message", "Session mapping found using Stripe session ID"
                    ));
                }
            }

            log.warn("No session mapping found for Stripe session ID: {}", stripeSessionId);
            return ResponseEntity.ok(Map.of(
                "success", false,
                "error", "No session mapping found",
                "message", "No active session found for this Stripe session ID"
            ));

        } catch (Exception e) {
            log.error("Error looking up session mapping", e);
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", "Internal server error: " + e.getMessage()
            ));
        }
    }
} 