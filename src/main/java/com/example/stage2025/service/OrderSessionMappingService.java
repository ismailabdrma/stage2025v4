package com.example.stage2025.service;

import com.example.stage2025.entity.Order;

public interface OrderSessionMappingService {
    
    /**
     * Store a mapping between a payment session and an order
     * 
     * @param sessionId The payment session ID (e.g., Stripe session ID)
     * @param orderId The order ID
     * @param supplierId The supplier ID
     * @param paymentType The type of payment (STRIPE, DIRECT, etc.)
     */
    void storeSessionMapping(String sessionId, Long orderId, Long supplierId, String paymentType);
    
    /**
     * Store a mapping between a payment session and an order with Stripe session ID
     * 
     * @param sessionId The payment session ID (e.g., Stripe session ID)
     * @param orderId The order ID
     * @param supplierId The supplier ID
     * @param paymentType The type of payment (STRIPE, DIRECT, etc.)
     * @param stripeSessionId The Stripe session ID for external payment tracking
     */
    void storeSessionMapping(String sessionId, Long orderId, Long supplierId, String paymentType, String stripeSessionId);
    
    /**
     * Find an order by payment session ID
     * 
     * @param sessionId The payment session ID
     * @return The order if found, null otherwise
     */
    Order findOrderBySession(String sessionId);
    
    /**
     * Get order and supplier information by session ID
     * 
     * @param sessionId The payment session ID
     * @return Map containing orderId and supplierId, or null if not found
     */
    java.util.Map<String, Object> getOrderInfoBySession(String sessionId);
    
    /**
     * Get all pending payment sessions
     * 
     * @return List of pending session information
     */
    java.util.List<java.util.Map<String, Object>> getAllPendingSessions();
    
    /**
     * Mark a session as completed
     * 
     * @param sessionId The payment session ID
     */
    void markSessionAsCompleted(String sessionId);
    
    /**
     * Mark a session as expired
     * 
     * @param sessionId The payment session ID
     */
    void markSessionAsExpired(String sessionId);
    
    /**
     * Get session mapping by session ID
     * 
     * @param sessionId The payment session ID
     * @return The session mapping if found, null otherwise
     */
    SessionMapping getSessionMapping(String sessionId);
    
    /**
     * Remove a session mapping
     * 
     * @param sessionId The payment session ID
     */
    void removeSessionMapping(String sessionId);
    
    /**
     * Get all active session mappings
     * 
     * @return List of all active session mappings
     */
    java.util.List<SessionMapping> getAllActiveSessions();
    
    /**
     * Update session mapping with Stripe session ID
     * 
     * @param sessionId The internal session ID
     * @param stripeSessionId The Stripe session ID
     */
    void updateStripeSessionId(String sessionId, String stripeSessionId);
    
    /**
     * Session mapping data class
     */
    class SessionMapping {
        public final Long orderId;
        public final Long supplierId;
        public final String paymentType;
        public String status = "PENDING";
        public String stripeSessionId; // Add Stripe session ID storage
        
        public SessionMapping(Long orderId, Long supplierId, String paymentType) {
            this.orderId = orderId;
            this.supplierId = supplierId;
            this.paymentType = paymentType;
        }
        
        // Add getter methods for compatibility
        public Long getOrderId() { return orderId; }
        public Long getSupplierId() { return supplierId; }
        public String getPaymentType() { return paymentType; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        
        // Add sessionId field and getter for compatibility
        private String sessionId;
        public String getSessionId() { return sessionId; }
        public void setSessionId(String sessionId) { this.sessionId = sessionId; }
        
        // Add getter/setter for Stripe session ID
        public String getStripeSessionId() { return stripeSessionId; }
        public void setStripeSessionId(String stripeSessionId) { this.stripeSessionId = stripeSessionId; }
    }
} 