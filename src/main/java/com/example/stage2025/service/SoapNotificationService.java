package com.example.stage2025.service;

import com.example.stage2025.entity.Supplier;

public interface SoapNotificationService {
    
    /**
     * Notify supplier that payment is complete
     * Uses the existing 'notifyPaymentStatus' operation from WSDL
     * 
     * @param supplier The supplier to notify
     * @param paymentId The payment ID from the supplier's system (must be long)
     * @param status The payment status (e.g., "SUCCESS", "COMPLETED")
     * @return true if notification was sent successfully
     */
    boolean notifyPaymentStatus(Supplier supplier, Long paymentId, String status);
} 