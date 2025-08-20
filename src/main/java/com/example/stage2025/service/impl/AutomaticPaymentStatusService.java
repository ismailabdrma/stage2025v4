package com.example.stage2025.service.impl;

import com.example.stage2025.service.PaymentCompletionService;
import com.example.stage2025.service.OrderSessionMappingService;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionRetrieveParams;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class AutomaticPaymentStatusService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    private final PaymentCompletionService paymentCompletionService;
    private final OrderSessionMappingService orderSessionMappingService;

    public AutomaticPaymentStatusService(
            PaymentCompletionService paymentCompletionService,
            OrderSessionMappingService orderSessionMappingService) {
        this.paymentCompletionService = paymentCompletionService;
        this.orderSessionMappingService = orderSessionMappingService;
    }

    /**
     * Automatically check payment status every 5 minutes
     * This eliminates the need for manual payment completion
     */
    @Scheduled(fixedRate = 300000) // 5 minutes = 300,000 ms
    public void checkPendingPayments() {
        try {
            log.info("Starting automatic payment status check...");
            
            // Get all pending sessions from our mapping
            List<Map<String, Object>> pendingSessions = orderSessionMappingService.getAllPendingSessions();
            
            if (pendingSessions.isEmpty()) {
                log.info("No pending payments to check");
                return;
            }
            
            log.info("Found {} pending payments to check", pendingSessions.size());
            
            // Check each pending payment
            for (Map<String, Object> sessionInfo : pendingSessions) {
                String sessionId = (String) sessionInfo.get("sessionId");
                String orderId = (String) sessionInfo.get("orderId");
                String supplierId = (String) sessionInfo.get("supplierId");
                
                try {
                    checkPaymentStatus(sessionId, orderId, supplierId);
                } catch (Exception e) {
                    log.error("Error checking payment status for session {}: {}", sessionId, e.getMessage());
                }
            }
            
            log.info("Automatic payment status check completed");
            
        } catch (Exception e) {
            log.error("Error in automatic payment status check: {}", e.getMessage(), e);
        }
    }

    /**
     * Check the status of a specific payment session
     */
    private void checkPaymentStatus(String sessionId, String orderId, String supplierId) {
        try {
            log.info("Checking payment status for session: {}", sessionId);
            
            // Set Stripe API key
            Stripe.apiKey = stripeSecretKey;
            
            // Retrieve the checkout session from Stripe
            SessionRetrieveParams params = SessionRetrieveParams.builder().build();
            Session session = Session.retrieve(sessionId, params, null);
            
            log.info("Stripe session status: {}", session.getStatus());
            
            // Check if payment is completed
            if ("complete".equals(session.getStatus())) {
                log.info("Payment completed for session: {}. Processing automatically...", sessionId);
                
                // Automatically complete the payment in our system
                Map<String, Object> result = paymentCompletionService.processPaymentCompletion(
                        sessionId, orderId, supplierId, null, "SUCCESS", Map.of());
                
                if ((Boolean) result.get("success")) {
                    log.info("Payment automatically completed for session: {}", sessionId);
                    
                    // Mark session as completed in our mapping
                    orderSessionMappingService.markSessionAsCompleted(sessionId);
                } else {
                    log.error("Failed to automatically complete payment for session {}: {}", 
                            sessionId, result.get("error"));
                }
                
            } else if ("expired".equals(session.getStatus())) {
                log.warn("Payment session expired for session: {}", sessionId);
                
                // Mark session as expired
                orderSessionMappingService.markSessionAsExpired(sessionId);
                
            } else {
                log.info("Payment still pending for session: {}. Status: {}", sessionId, session.getStatus());
            }
            
        } catch (Exception e) {
            log.error("Error checking Stripe session {}: {}", sessionId, e.getMessage());
        }
    }

    /**
     * Manually trigger payment status check for a specific session
     * This can be called from admin panel or API
     */
    public Map<String, Object> checkSpecificPayment(String sessionId) {
        try {
            log.info("Manual payment status check requested for session: {}", sessionId);
            
            // Get order info from session mapping
            Map<String, Object> orderInfo = orderSessionMappingService.getOrderInfoBySession(sessionId);
            
            if (orderInfo == null) {
                return Map.of(
                        "success", false,
                        "error", "No order found for session: " + sessionId
                );
            }
            
            String orderId = (String) orderInfo.get("orderId");
            String supplierId = (String) orderInfo.get("supplierId");
            
            // Check payment status
            checkPaymentStatus(sessionId, orderId, supplierId);
            
            return Map.of(
                    "success", true,
                    "message", "Payment status check completed for session: " + sessionId
            );
            
        } catch (Exception e) {
            log.error("Error in manual payment status check: {}", e.getMessage(), e);
            return Map.of(
                    "success", false,
                    "error", "Failed to check payment status: " + e.getMessage()
            );
        }
    }
} 