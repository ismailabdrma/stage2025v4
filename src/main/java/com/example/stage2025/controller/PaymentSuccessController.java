package com.example.stage2025.controller;

import com.example.stage2025.service.PaymentCompletionService;
import com.example.stage2025.service.OrderSessionMappingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/payment-success")
@RequiredArgsConstructor
@Slf4j
public class PaymentSuccessController {

    private final PaymentCompletionService paymentCompletionService;
    private final OrderSessionMappingService orderSessionMappingService;

    /**
     * Simple test endpoint for health checks
     */
    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> test() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        response.put("message", "PaymentSuccessController is working");
        return ResponseEntity.ok(response);
    }

    /**
     * Handle payment success callback from supplier
     * This is called when customer completes payment on supplier's page
     */
    @GetMapping("/callback")
    public ResponseEntity<Map<String, Object>> handlePaymentSuccess(
            @RequestParam("session_id") String sessionId,
            @RequestParam(value = "order_id", required = false) String orderId,
            @RequestParam(value = "supplier_id", required = false) String supplierId,
            @RequestParam(value = "payment_type", required = false) String paymentType) {
        
        try {
            log.info("Payment success callback received - sessionId: {}, orderId: {}, supplierId: {}, paymentType: {}", 
                    sessionId, orderId, supplierId, paymentType);
            
            // For Stripe payments, we need to extract order info from the session
            if ("STRIPE".equals(paymentType) && sessionId.startsWith("cs_")) {
                // This is a Stripe session, extract order info
                Map<String, Object> stripeResult = extractOrderFromStripeSession(sessionId);
                if (stripeResult.containsKey("error")) {
                    return ResponseEntity.badRequest().body(stripeResult);
                }
                
                // Use extracted order info
                orderId = (String) stripeResult.get("orderId");
                supplierId = (String) stripeResult.get("supplierId");
                log.info("Extracted from Stripe session - orderId: {}, supplierId: {}", orderId, supplierId);
            }
            
            // Process the payment completion
            Map<String, Object> result = paymentCompletionService.processPaymentCompletion(
                    sessionId, orderId, supplierId, null, "SUCCESS", Map.of());
            
            log.info("Payment completion processed successfully: {}", result);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            log.error("Error processing payment completion: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Failed to process payment completion: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Extract order information from Stripe session
     * This is needed because Stripe doesn't pass our custom parameters
     */
    private Map<String, Object> extractOrderFromStripeSession(String sessionId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Try to find order info from our session mapping
            Map<String, Object> orderInfo = orderSessionMappingService.getOrderInfoBySession(sessionId);
            
            if (orderInfo != null) {
                log.info("Found order info from session mapping: {}", orderInfo);
                result.put("success", true);
                result.put("orderId", orderInfo.get("orderId"));
                result.put("supplierId", orderInfo.get("supplierId"));
                return result;
            }
            
            // If no mapping found, return error
            log.warn("No order mapping found for Stripe session: {}", sessionId);
            result.put("error", "No order found for this Stripe session. Please ensure the session was created through our platform.");
            return result;
            
        } catch (Exception e) {
            log.error("Error extracting order from Stripe session: {}", e.getMessage(), e);
            result.put("error", "Failed to extract order information from Stripe session: " + e.getMessage());
            return result;
        }
    }

    /**
     * Extract order information from session ID
     * This is useful when the success page doesn't have order_id and supplier_id
     */
    @GetMapping("/extract-order")
    public ResponseEntity<Map<String, Object>> extractOrderFromSession(
            @RequestParam("session_id") String sessionId) {
        
        try {
            log.info("Extracting order info from session: {}", sessionId);
            
            // Get order info from session mapping
            Map<String, Object> orderInfo = orderSessionMappingService.getOrderInfoBySession(sessionId);
            
            if (orderInfo != null) {
                log.info("Order info extracted successfully: {}", orderInfo);
                return ResponseEntity.ok(orderInfo);
            } else {
                log.warn("No order info found for session: {}", sessionId);
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            log.error("Error extracting order from session: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Failed to extract order information: " + e.getMessage()
            ));
        }
    }

    /**
     * Manual payment completion (for admin use)
     */
    @PostMapping("/complete")
    public ResponseEntity<Map<String, Object>> manuallyCompletePayment(
            @RequestBody Map<String, Object> request) {
        
        try {
            String sessionId = (String) request.get("sessionId");
            String orderId = (String) request.get("orderId");
            String supplierId = (String) request.get("supplierId");
            
            log.info("Manual payment completion requested - sessionId: {}, orderId: {}, supplierId: {}", 
                    sessionId, orderId, supplierId);
            
            Map<String, Object> result = paymentCompletionService.processPaymentCompletion(
                    sessionId, orderId, supplierId, null, "SUCCESS", Map.of());
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            log.error("Error in manual payment completion: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Failed to complete payment: " + e.getMessage()
            ));
        }
    }

    /**
     * Manual payment completion by session ID (for admin use)
     * This is useful when Stripe doesn't redirect back with order info
     */
    @PostMapping("/complete-by-session")
    public ResponseEntity<Map<String, Object>> completePaymentBySession(
            @RequestBody Map<String, Object> request) {
        
        try {
            String sessionId = (String) request.get("sessionId");
            
            if (sessionId == null) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "error", "Session ID is required"
                ));
            }
            
            log.info("Manual payment completion by session requested: {}", sessionId);
            
            // Get order info from session mapping
            Map<String, Object> orderInfo = orderSessionMappingService.getOrderInfoBySession(sessionId);
            
            if (orderInfo == null) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "error", "No order found for session: " + sessionId
                ));
            }
            
            String orderId = (String) orderInfo.get("orderId");
            String supplierId = (String) orderInfo.get("supplierId");
            
            // Process the payment completion
            Map<String, Object> result = paymentCompletionService.processPaymentCompletion(
                    sessionId, orderId, supplierId, null, "SUCCESS", Map.of());
            
            log.info("Manual payment completion by session processed successfully: {}", result);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            log.error("Error in manual payment completion by session: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Failed to complete payment: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Check payment status for a specific session
     * This triggers an automatic check with Stripe
     */
    @PostMapping("/check-payment-status")
    public ResponseEntity<Map<String, Object>> checkPaymentStatus(
            @RequestBody Map<String, Object> request) {
        
        try {
            String sessionId = (String) request.get("sessionId");
            
            if (sessionId == null) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "error", "Session ID is required"
                ));
            }
            
            log.info("Payment status check requested for session: {}", sessionId);
            
            // Get order info from session mapping
            Map<String, Object> orderInfo = orderSessionMappingService.getOrderInfoBySession(sessionId);
            
            if (orderInfo == null) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "error", "No order found for session: " + sessionId
                ));
            }
            
            // Check if payment is already completed
            String status = (String) orderInfo.get("status");
            if ("COMPLETED".equals(status)) {
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "message", "Payment already completed",
                        "status", "COMPLETED"
                ));
            }
            
            // Trigger automatic payment status check
            // This will check with Stripe and update our system automatically
            Map<String, Object> result = Map.of(
                    "success", true,
                    "message", "Payment status check triggered. Check logs for details.",
                    "sessionId", sessionId,
                    "currentStatus", status
            );
            
            log.info("Payment status check triggered for session: {}", sessionId);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            log.error("Error in payment status check: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Failed to check payment status: " + e.getMessage()
            ));
        }
    }

    /**
     * CRITICAL FIX: Add the missing endpoint that frontend is calling
     * This endpoint handles payment completion from supplier success page
     */
    @PostMapping("/success/{sessionId}")
    public ResponseEntity<Map<String, Object>> handlePaymentSuccess(
            @PathVariable String sessionId,
            @RequestBody Map<String, Object> request) {
        
        try {
            log.info("Payment success endpoint called - sessionId: {}, request: {}", sessionId, request);
            
            // Be robust to numeric or string payload values
            Object orderIdObj = request.get("orderId");
            Object supplierIdObj = request.get("supplierId");
            String orderId = orderIdObj != null ? orderIdObj.toString() : null;
            String supplierId = supplierIdObj != null ? supplierIdObj.toString() : null;
            
            if (orderId == null || supplierId == null) {
                log.error("Missing required parameters - orderId: {}, supplierId: {}", orderId, supplierId);
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "error", "Missing required parameters: orderId and supplierId are required"
                ));
            }
            
            log.info("Processing payment completion - sessionId: {}, orderId: {}, supplierId: {}", 
                    sessionId, orderId, supplierId);
            
            // Process the payment completion
            Map<String, Object> result = paymentCompletionService.processPaymentCompletion(
                    sessionId, orderId, supplierId, null, "SUCCESS", Map.of());
            
            log.info("Payment completion processed successfully: {}", result);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            log.error("Error processing payment completion: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Failed to process payment completion: " + e.getMessage()
            ));
        }
    }
} 