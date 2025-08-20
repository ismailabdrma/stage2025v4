package com.example.stage2025.controller;

import com.example.stage2025.service.PaymentCompletionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/supplier")
@RequiredArgsConstructor
@Slf4j
public class SupplierRedirectController {

    private final PaymentCompletionService paymentCompletionService;

    /**
     * Handle supplier redirects to our platform
     * This endpoint receives customers from supplier's success page
     * and processes payment completion before redirecting to our success page
     */
    @GetMapping("/redirect")
    public ResponseEntity<?> handleSupplierRedirect(
            @RequestParam String order_id,
            @RequestParam String supplier_id,
            @RequestParam(required = false) String session_id) {
        
        try {
            log.info("=== SUPPLIER REDIRECT RECEIVED ===");
            log.info("Order ID: {}", order_id);
            log.info("Supplier ID: {}", supplier_id);
            log.info("Session ID: {}", session_id);
            log.info("=================================");
            
            // Create a unique session ID for this supplier redirect
            String supplierSessionId = "SUPPLIER_" + supplier_id + "_" + order_id + "_" + System.currentTimeMillis();
            
            // Process payment completion
            Map<String, Object> result = paymentCompletionService.processPaymentCompletion(
                supplierSessionId,  // sessionId
                order_id,           // orderId
                supplier_id,        // supplierId
                session_id,         // paymentId (using session_id as payment ID)
                "SUCCESS",          // status
                Map.of()            // empty webhook data
            );
            
            // Check if payment completion was successful
            boolean success = (Boolean) result.getOrDefault("success", false);
            
            if (success) {
                log.info("Payment completion successful for order: {}", order_id);
                
                // First redirect to supplier thank you page for 3 seconds
                String supplierThankYouUrl = "http://localhost:8082/thank-you.html?order_id=" + order_id + 
                                           "&supplier_id=" + supplier_id + 
                                           "&session_id=" + session_id +
                                           "&redirect_to=" + encodeRedirectUrl(order_id, supplier_id, session_id);
                
                log.info("Redirecting to supplier thank you page: {}", supplierThankYouUrl);
                
                return ResponseEntity.status(HttpStatus.FOUND)
                    .header("Location", supplierThankYouUrl)
                    .build();
                    
            } else {
                log.error("Payment completion failed for order: {}", order_id);
                
                // Redirect to error page
                String errorUrl = "http://localhost:4200/payment-error?error=payment_completion_failed&order_id=" + order_id;
                
                return ResponseEntity.status(HttpStatus.FOUND)
                    .header("Location", errorUrl)
                    .build();
            }
                
        } catch (Exception e) {
            log.error("Error processing supplier redirect for order: {}", order_id, e);
            
            // Redirect to error page with error details
            String errorUrl = "http://localhost:4200/payment-error?error=processing_error&order_id=" + order_id;
            
            return ResponseEntity.status(HttpStatus.FOUND)
                .header("Location", errorUrl)
                .build();
        }
    }

    /**
     * Helper method to encode the redirect URL to our platform
     */
    private String encodeRedirectUrl(String orderId, String supplierId, String sessionId) {
        String redirectUrl = "http://localhost:4200/success?order_id=" + orderId + 
                           "&supplier_id=" + supplierId + 
                           "&session_id=" + sessionId +
                           "&source=supplier_redirect";
        return java.net.URLEncoder.encode(redirectUrl, java.nio.charset.StandardCharsets.UTF_8);
    }

    /**
     * Health check endpoint for supplier redirects
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "healthy",
            "service", "supplier_redirect",
            "timestamp", System.currentTimeMillis()
        ));
    }
}
