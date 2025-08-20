package com.example.stage2025.service.impl;

import com.example.stage2025.entity.Order;
import com.example.stage2025.service.OrderSessionMappingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class OrderSessionMappingServiceImpl implements OrderSessionMappingService {
    
    // In-memory storage for session mappings
    // In production, this should be stored in database
    private final Map<String, SessionMapping> sessionMappings = new ConcurrentHashMap<>();
    
    @Override
    public void storeSessionMapping(String sessionId, Long orderId, Long supplierId, String paymentType) {
        SessionMapping mapping = new SessionMapping(orderId, supplierId, paymentType);
        mapping.setSessionId(sessionId);
        sessionMappings.put(sessionId, mapping);
        log.info("Stored session mapping: sessionId={}, orderId={}, supplierId={}, paymentType={}", 
                sessionId, orderId, supplierId, paymentType);
    }
    
    @Override
    public void storeSessionMapping(String sessionId, Long orderId, Long supplierId, String paymentType, String stripeSessionId) {
        SessionMapping mapping = new SessionMapping(orderId, supplierId, paymentType);
        mapping.setSessionId(sessionId);
        mapping.setStripeSessionId(stripeSessionId);
        sessionMappings.put(sessionId, mapping);
        log.info("Stored session mapping with Stripe ID: sessionId={}, orderId={}, supplierId={}, paymentType={}, stripeSessionId={}", 
                sessionId, orderId, supplierId, paymentType, stripeSessionId);
    }
    
    @Override
    public Order findOrderBySession(String sessionId) {
        SessionMapping mapping = sessionMappings.get(sessionId);
        if (mapping != null) {
            log.info("Found order mapping for session {}: orderId={}", sessionId, mapping.orderId);
            // In a real implementation, you would load the order from database
            // For now, we'll return null and let the caller handle it
            return null;
        }
        log.warn("No order mapping found for session: {}", sessionId);
        return null;
    }
    
    @Override
    public Map<String, Object> getOrderInfoBySession(String sessionId) {
        SessionMapping mapping = sessionMappings.get(sessionId);
        if (mapping != null) {
            Map<String, Object> result = new java.util.HashMap<>();
            result.put("orderId", mapping.orderId.toString());
            result.put("supplierId", mapping.supplierId.toString());
            result.put("paymentType", mapping.paymentType);
            result.put("status", mapping.status);
            log.info("Retrieved order info for session {}: {}", sessionId, result);
            return result;
        }
        log.warn("No order mapping found for session: {}", sessionId);
        return null;
    }
    
    @Override
    public List<Map<String, Object>> getAllPendingSessions() {
        List<Map<String, Object>> pendingSessions = new java.util.ArrayList<>();
        
        for (Map.Entry<String, SessionMapping> entry : sessionMappings.entrySet()) {
            SessionMapping mapping = entry.getValue();
            if ("PENDING".equals(mapping.status)) {
                Map<String, Object> sessionInfo = new java.util.HashMap<>();
                sessionInfo.put("sessionId", entry.getKey());
                sessionInfo.put("orderId", mapping.orderId.toString());
                sessionInfo.put("supplierId", mapping.supplierId.toString());
                sessionInfo.put("paymentType", mapping.paymentType);
                sessionInfo.put("status", mapping.status);
                pendingSessions.add(sessionInfo);
            }
        }
        
        log.info("Found {} pending sessions", pendingSessions.size());
        return pendingSessions;
    }
    
    @Override
    public void markSessionAsCompleted(String sessionId) {
        SessionMapping mapping = sessionMappings.get(sessionId);
        if (mapping != null) {
            mapping.status = "COMPLETED";
            log.info("Marked session {} as completed", sessionId);
        } else {
            log.warn("No session mapping found to mark as completed: {}", sessionId);
        }
    }
    
    @Override
    public void markSessionAsExpired(String sessionId) {
        SessionMapping mapping = sessionMappings.get(sessionId);
        if (mapping != null) {
            mapping.status = "EXPIRED";
            log.info("Marked session {} as expired", sessionId);
        } else {
            log.warn("No session mapping found to mark as expired: {}", sessionId);
        }
    }
    
    @Override
    public SessionMapping getSessionMapping(String sessionId) {
        SessionMapping mapping = sessionMappings.get(sessionId);
        if (mapping != null) {
            log.info("Found session mapping for session {}: orderId={}, supplierId={}, paymentType={}", 
                    sessionId, mapping.orderId, mapping.supplierId, mapping.paymentType);
        } else {
            log.warn("No session mapping found for session: {}", sessionId);
        }
        return mapping;
    }
    
    @Override
    public void removeSessionMapping(String sessionId) {
        SessionMapping removed = sessionMappings.remove(sessionId);
        if (removed != null) {
            log.info("Removed session mapping for session {}: orderId={}, supplierId={}, paymentType={}", 
                    sessionId, removed.orderId, removed.supplierId, removed.paymentType);
        } else {
            log.warn("No session mapping found to remove for session: {}", sessionId);
        }
    }
    
    @Override
    public List<SessionMapping> getAllActiveSessions() {
        List<SessionMapping> activeSessions = new java.util.ArrayList<>();
        
        for (Map.Entry<String, SessionMapping> entry : sessionMappings.entrySet()) {
            SessionMapping mapping = entry.getValue();
            if ("PENDING".equals(mapping.status)) {
                activeSessions.add(mapping);
            }
        }
        
        log.info("Found {} active sessions", activeSessions.size());
        return activeSessions;
    }
    
    @Override
    public void updateStripeSessionId(String sessionId, String stripeSessionId) {
        SessionMapping mapping = sessionMappings.get(sessionId);
        if (mapping != null) {
            mapping.setStripeSessionId(stripeSessionId);
            log.info("Updated Stripe session ID for session {}: {}", sessionId, stripeSessionId);
        } else {
            log.warn("No session mapping found to update Stripe session ID: {}", sessionId);
        }
    }
} 