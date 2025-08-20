package com.example.stage2025.controller;

import com.example.stage2025.service.PaymentCompletionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/supplier-webhook")
@RequiredArgsConstructor
@Slf4j
public class SupplierWebhookController {

    private final PaymentCompletionService paymentCompletionService;

    /**
     * Webhook endpoint for suppliers to notify payment completion
     * This is called by the supplier's system after successful payment
     */
    @PostMapping("/payment-complete")
    public ResponseEntity<Map<String, Object>> handlePaymentComplete(
            @RequestBody Map<String, Object> webhookData) {
        
        try {
            log.info("Payment completion webhook received from supplier: {}", webhookData);
            
            // Extract payment information
            String sessionId = (String) webhookData.get("session_id");
            String orderId = (String) webhookData.get("order_id");
            String supplierId = (String) webhookData.get("supplier_id");
            String status = (String) webhookData.get("status");
            String paymentId = (String) webhookData.get("payment_id");
            
            // Validate required fields
            if (sessionId == null || orderId == null || supplierId == null) {
                log.error("Missing required fields in webhook: session_id, order_id, or supplier_id");
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "error", "Missing required fields: session_id, order_id, supplier_id"
                ));
            }
            
            // Check if payment was successful
            if (!"success".equalsIgnoreCase(status) && !"completed".equalsIgnoreCase(status)) {
                log.warn("Payment not successful, status: {}", status);
                return ResponseEntity.ok().body(Map.of(
                        "success", true,
                        "message", "Payment status received: " + status
                ));
            }
            
            // Process the payment completion
            Map<String, Object> result = paymentCompletionService.processPaymentCompletion(
                    sessionId, orderId, supplierId, paymentId, status, webhookData);
            
            log.info("Payment completion webhook processed successfully: {}", result);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            log.error("Error processing payment completion webhook: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Failed to process webhook: " + e.getMessage()
            ));
        }
    }

    /**
     * Health check endpoint for suppliers
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        return ResponseEntity.ok(Map.of(
                "status", "healthy",
                "timestamp", System.currentTimeMillis(),
                "message", "Supplier webhook endpoint is operational"
        ));
    }
} 