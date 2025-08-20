package com.example.stage2025.service;

import java.util.Map;

public interface PaymentCompletionService {
    
    /**
     * Process payment completion from webhook or redirect
     * This method handles the core logic of completing a payment
     */
    Map<String, Object> processPaymentCompletion(
            String sessionId,
            String orderId,
            String supplierId,
            String paymentId,
            String status,
            Map<String, Object> webhookData
    );
    
    /**
     * Get payment status for a session or order
     */
    Map<String, Object> getPaymentStatus(String sessionId, String orderId);
} 