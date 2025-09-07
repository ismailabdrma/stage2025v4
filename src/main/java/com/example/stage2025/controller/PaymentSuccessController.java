package com.example.stage2025.controller;

import com.example.stage2025.entity.Order;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.repository.OrderRepository;
import com.example.stage2025.repository.SupplierRepository;
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
    private final OrderRepository orderRepository;
    private final SupplierRepository supplierRepository;

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
     * Debug endpoint to test order lookup
     */
    @GetMapping("/debug/order/{orderId}")
    public ResponseEntity<Map<String, Object>> debugOrder(@PathVariable String orderId) {
        try {
            log.info("Debug order lookup for orderId: {}", orderId);
            
            // Try to find order by ID
            Long orderIdLong = Long.valueOf(orderId);
            var orderOpt = orderRepository.findById(orderIdLong);
            
            Map<String, Object> response = new HashMap<>();
            response.put("orderId", orderId);
            response.put("orderIdLong", orderIdLong);
            response.put("orderFound", orderOpt.isPresent());
            
            if (orderOpt.isPresent()) {
                Order order = orderOpt.get();
                response.put("orderStatus", order.getStatus());
                response.put("orderTotal", order.getTotal());
                response.put("orderClient", order.getClient() != null ? order.getClient().getId() : "null");
                response.put("orderItems", order.getItems() != null ? order.getItems().size() : "null");
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error in debug order lookup: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of(
                    "error", e.getMessage(),
                    "exceptionType", e.getClass().getSimpleName()
            ));
        }
    }

    /**
     * Debug endpoint to test service dependencies
     */
    @GetMapping("/debug/services")
    public ResponseEntity<Map<String, Object>> debugServices() {
        try {
            Map<String, Object> response = new HashMap<>();
            
            // Test PaymentCompletionService
            response.put("paymentCompletionService", paymentCompletionService != null ? "OK" : "NULL");
            response.put("orderSessionMappingService", orderSessionMappingService != null ? "OK" : "NULL");
            response.put("orderRepository", orderRepository != null ? "OK" : "NULL");
            
            // Test a simple service call
            if (paymentCompletionService != null) {
                try {
                    Map<String, Object> testResult = paymentCompletionService.getPaymentStatus("test", "test");
                    response.put("paymentCompletionServiceTest", "OK");
                    response.put("testResult", testResult);
                } catch (Exception e) {
                    response.put("paymentCompletionServiceTest", "ERROR: " + e.getMessage());
                }
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error in debug services: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of(
                    "error", e.getMessage(),
                    "exceptionType", e.getClass().getSimpleName()
            ));
        }
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

    /**
     * Handle supplier-specific payment success
     * This endpoint is called by the frontend for supplier-owned payment systems
     */
    @PostMapping("/supplier-own/{orderId}")
    public ResponseEntity<Map<String, Object>> handleSupplierOwnPaymentSuccess(
            @PathVariable String orderId,
            @RequestBody Map<String, Object> request) {
        
        try {
            log.info("=== SUPPLIER-OWN PAYMENT SUCCESS DEBUG ===");
            log.info("Supplier-own payment success endpoint called - orderId: {}, request: {}", orderId, request);
            log.info("Request type: {}", request.getClass().getSimpleName());
            log.info("Request keys: {}", request.keySet());
            
            // Extract parameters from request
            Object supplierIdObj = request.get("supplierId");
            Object paymentIdObj = request.get("paymentId");
            Object amountObj = request.get("amount");
            Object statusObj = request.get("status");
            
            log.info("Raw parameters - supplierIdObj: {} (type: {}), paymentIdObj: {} (type: {}), amountObj: {} (type: {}), statusObj: {} (type: {})", 
                    supplierIdObj, supplierIdObj != null ? supplierIdObj.getClass().getSimpleName() : "null",
                    paymentIdObj, paymentIdObj != null ? paymentIdObj.getClass().getSimpleName() : "null",
                    amountObj, amountObj != null ? amountObj.getClass().getSimpleName() : "null",
                    statusObj, statusObj != null ? statusObj.getClass().getSimpleName() : "null");
            
            String supplierId = supplierIdObj != null ? supplierIdObj.toString() : null;
            String paymentId = paymentIdObj != null ? paymentIdObj.toString() : null;
            String status = statusObj != null ? statusObj.toString() : "SUCCEEDED";
            
            log.info("Converted parameters - supplierId: {}, paymentId: {}, status: {}", supplierId, paymentId, status);
            
            if (supplierId == null) {
                log.error("Missing required parameter - supplierId: {}", supplierId);
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "error", "Missing required parameter: supplierId is required"
                ));
            }
            
            log.info("Processing supplier-own payment completion - orderId: {}, supplierId: {}, paymentId: {}, status: {}", 
                    orderId, supplierId, paymentId, status);
            
            // Create a session ID for this payment (use orderId as session identifier)
            String sessionId = "supplier-own-" + orderId + "-" + System.currentTimeMillis();
            log.info("Generated sessionId: {}", sessionId);
            
            // Test basic order lookup first
            try {
                Long orderIdLong = Long.valueOf(orderId);
                var orderOpt = orderRepository.findById(orderIdLong);
                if (orderOpt.isPresent()) {
                    Order order = orderOpt.get();
                    log.info("Order found: id={}, status={}, total={}", order.getId(), order.getStatus(), order.getTotal());
                } else {
                    log.error("Order not found for ID: {}", orderId);
                    return ResponseEntity.badRequest().body(Map.of(
                            "success", false,
                            "error", "Order not found with ID: " + orderId
                    ));
                }
            } catch (NumberFormatException e) {
                log.error("Invalid order ID format: {}", orderId);
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "error", "Invalid order ID format: " + orderId
                ));
            }
            
            // Test supplier lookup
            try {
                Long supplierIdLong = Long.valueOf(supplierId);
                var supplierOpt = supplierRepository.findById(supplierIdLong);
                if (supplierOpt.isPresent()) {
                    Supplier supplier = supplierOpt.get();
                    log.info("Supplier found: id={}, name={}", supplier.getId(), supplier.getName());
                } else {
                    log.error("Supplier not found for ID: {}", supplierId);
                    return ResponseEntity.badRequest().body(Map.of(
                            "success", false,
                            "error", "Supplier not found with ID: " + supplierId
                    ));
                }
            } catch (NumberFormatException e) {
                log.error("Invalid supplier ID format: {}", supplierId);
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "error", "Invalid supplier ID format: " + supplierId
                ));
            }
            
            // Process the payment completion
            log.info("Calling paymentCompletionService.processPaymentCompletion...");
            Map<String, Object> result = paymentCompletionService.processPaymentCompletion(
                    sessionId, orderId, supplierId, paymentId, status, Map.of());
            
            log.info("Supplier-own payment completion processed successfully: {}", result);
            log.info("=== SUPPLIER-OWN PAYMENT SUCCESS DEBUG COMPLETE ===");
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            log.error("=== SUPPLIER-OWN PAYMENT SUCCESS ERROR ===");
            log.error("Error processing supplier-own payment completion: {}", e.getMessage(), e);
            log.error("Exception type: {}", e.getClass().getSimpleName());
            log.error("Exception cause: {}", e.getCause() != null ? e.getCause().getMessage() : "No cause");
            log.error("Stack trace:", e);
            
            // Check if it's a specific type of error
            if (e instanceof NullPointerException) {
                log.error("NullPointerException detected - likely missing dependency injection");
            } else if (e instanceof IllegalArgumentException) {
                log.error("IllegalArgumentException detected - likely invalid parameter");
            } else if (e instanceof org.springframework.dao.DataAccessException) {
                log.error("DataAccessException detected - likely database issue");
            }
            
            log.error("=== SUPPLIER-OWN PAYMENT SUCCESS ERROR COMPLETE ===");
            return ResponseEntity.status(500).body(Map.of(
                    "success", false,
                    "error", "Failed to process supplier-own payment completion: " + e.getMessage(),
                    "exceptionType", e.getClass().getSimpleName(),
                    "exceptionCause", e.getCause() != null ? e.getCause().getMessage() : "No cause"
            ));
        }
    }
} 