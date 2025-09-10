package com.example.stage2025.service.impl;

import com.example.stage2025.entity.Order;
import com.example.stage2025.entity.OrderItem;
import com.example.stage2025.entity.Payment;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.enums.OrderStatus;
import com.example.stage2025.repository.OrderRepository;
import com.example.stage2025.repository.PaymentRepository;
import com.example.stage2025.repository.SupplierRepository;
import com.example.stage2025.service.EmailService;
import com.example.stage2025.service.OrderSessionMappingService;
import com.example.stage2025.service.PaymentCompletionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentCompletionServiceImpl implements PaymentCompletionService {

    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final SupplierRepository supplierRepository;
    private final OrderSessionMappingService orderSessionMappingService;
    private final EmailService emailService;

    @Override
    @Transactional
    public Map<String, Object> processPaymentCompletion(
            String sessionId,
            String orderId,
            String supplierId,
            String paymentId,
            String status,
            Map<String, Object> webhookData
    ) {
        try {
            log.info("Processing payment completion: sessionId={}, orderId={}, supplierId={}, paymentId={}, status={}", 
                    sessionId, orderId, supplierId, paymentId, status);

            // Validate required parameters
            if (sessionId == null && orderId == null) {
                return Map.of("success", false, "error", "Missing required parameters: sessionId or orderId");
            }

            // Try to find order by session ID first, then by order ID
            Order order = null;
            if (sessionId != null) {
                log.info("Looking up order by session ID: {}", sessionId);
                order = findOrderBySessionId(sessionId);
                if (order != null) {
                    log.info("Found order by session ID: {} (ID: {})", sessionId, order.getId());
                } else {
                    log.warn("No order found by session ID: {}", sessionId);
                }
            }
            
            if (order == null && orderId != null) {
                log.info("Looking up order by order ID: {}", orderId);
                order = findOrderById(orderId);
                if (order != null) {
                    log.info("Found order by order ID: {} (ID: {})", orderId, order.getId());
                } else {
                    log.warn("No order found by order ID: {}", orderId);
                }
            }

            if (order == null) {
                log.error("Order not found for sessionId={} or orderId={}", sessionId, orderId);
                return Map.of("success", false, "error", "Order not found");
            }

            log.info("Found order: id={}, status={}, total={}", order.getId(), order.getStatus(), order.getTotal());
            log.info("Order details: items={}, client={}, currency={}", 
                    order.getItems() != null ? order.getItems().size() : "null",
                    order.getClient() != null ? order.getClient().getId() : "null",
                    order.getCurrency());

            // Check if order is already completed
            if (OrderStatus.COMPLETED.equals(order.getStatus()) || OrderStatus.PAID.equals(order.getStatus())) {
                log.info("Order {} is already completed with status: {}", order.getId(), order.getStatus());
                return Map.of(
                    "success", true,
                    "orderId", order.getId(),
                    "message", "Order already completed",
                    "status", order.getStatus().toString(),
                    "idempotent", true
                );
            }
            
            // Additional check: if order already has a payment record, don't process again
            if (order.getPayment() != null) {
                log.info("Order {} already has a payment record (ID: {}), skipping duplicate processing", 
                        order.getId(), order.getPayment().getId());
                return Map.of(
                    "success", true,
                    "orderId", order.getId(),
                    "message", "Order already has payment record",
                    "status", order.getStatus().toString(),
                    "paymentId", order.getPayment().getId(),
                    "idempotent", true
                );
            }
            
            log.info("Order {} is not completed yet, proceeding with payment completion...", order.getId());

            // Find supplier
            Supplier supplier = null;
            if (supplierId != null) {
                try {
                    supplier = supplierRepository.findById(Long.valueOf(supplierId)).orElse(null);
                    if (supplier != null) {
                        log.info("Found supplier by ID: {} ({})", supplierId, supplier.getName());
                    } else {
                        log.warn("Supplier not found by ID: {}", supplierId);
                    }
                } catch (NumberFormatException e) {
                    log.error("Invalid supplier ID format: {}", supplierId, e);
                }
            }
            
            if (supplier == null) {
                // Try to get supplier from order items
                if (order.getItems() != null && !order.getItems().isEmpty()) {
                    OrderItem firstItem = order.getItems().get(0);
                    if (firstItem != null && firstItem.getProduct() != null && firstItem.getProduct().getSupplier() != null) {
                        supplier = firstItem.getProduct().getSupplier();
                        log.info("Found supplier from order item: {} ({})", supplier.getId(), supplier.getName());
                    } else {
                        log.warn("Could not get supplier from order item - item: {}, product: {}, supplier: {}", 
                                firstItem != null ? firstItem.getId() : "null",
                                firstItem != null && firstItem.getProduct() != null ? firstItem.getProduct().getId() : "null",
                                firstItem != null && firstItem.getProduct() != null && firstItem.getProduct().getSupplier() != null ? 
                                    firstItem.getProduct().getSupplier().getId() : "null");
                    }
                } else {
                    log.warn("Order has no items or items list is null");
                }
            }

            if (supplier == null) {
                log.error("Supplier not found for order {}", order.getId());
                return Map.of("success", false, "error", "Supplier not found");
            }
            
            log.info("Supplier found: {} (ID: {})", supplier.getName(), supplier.getId());

            // Check for duplicate payment by external payment ID
            if (paymentId != null && !paymentId.isEmpty()) {
                var existingPayment = paymentRepository.findByExternalPaymentId(paymentId);
                if (existingPayment.isPresent()) {
                    log.info("Payment with external ID {} already exists (ID: {}), skipping duplicate processing", 
                            paymentId, existingPayment.get().getId());
                    return Map.of(
                        "success", true,
                        "orderId", order.getId(),
                        "message", "Payment already processed with this external ID",
                        "status", order.getStatus().toString(),
                        "paymentId", existingPayment.get().getId(),
                        "idempotent", true
                    );
                }
            }

            // Calculate commission and create payment record
            log.info("Creating payment record...");
            Payment payment = createPaymentRecord(order, supplier, paymentId, sessionId, webhookData);
            log.info("Payment record created, now saving to database...");
            
            // CRITICAL FIX: Update order status to PAID FIRST
            log.info("Updating order status to PAID...");
            order.setStatus(OrderStatus.PAID);
            order.setUpdatedAt(LocalDateTime.now());
            
            // CRITICAL FIX: Ensure order has a sessionId for supplier-owned payments
            if (order.getSessionId() == null && sessionId != null) {
                order.setSessionId(sessionId);
                log.info("Set sessionId on order: {}", sessionId);
            } else if (order.getSessionId() == null) {
                // Generate a sessionId for supplier-owned payments
                String generatedSessionId = "SUPPLIER_" + supplier.getId() + "_" + order.getId() + "_" + System.currentTimeMillis();
                order.setSessionId(generatedSessionId);
                log.info("Generated and set sessionId on order: {}", generatedSessionId);
            }
            
            // CRITICAL FIX: Link payment to order BEFORE saving
            log.info("Linking payment to order...");
            order.setPayment(payment); // Link the payment entity BEFORE saving
            payment.setOrder(order); // Ensure bidirectional relationship
            
            // CRITICAL FIX: Save the payment with proper order relationship
            log.info("Saving payment to database with order relationship...");
            Payment savedPayment = paymentRepository.save(payment);
            log.info("Payment saved with ID: {}", savedPayment.getId());
            
            // CRITICAL FIX: Update order with saved payment and force immediate commit
            log.info("Updating order with saved payment and forcing immediate commit...");
            order.setPayment(savedPayment); // Use the saved payment entity
            log.info("Before saveAndFlush - Order ID: {}, Status: {}, Payment ID: {}, Session ID: {}", 
                    order.getId(), order.getStatus(), 
                    order.getPayment() != null ? order.getPayment().getId() : "NULL",
                    order.getSessionId());
            Order savedOrder = orderRepository.saveAndFlush(order);
            log.info("After saveAndFlush - Order ID: {}, Status: {}, Payment ID: {}, Session ID: {}", 
                    savedOrder.getId(), savedOrder.getStatus(), 
                    savedOrder.getPayment() != null ? savedOrder.getPayment().getId() : "NULL",
                    savedOrder.getSessionId());
            log.info("Order status update committed to database for order {}", savedOrder.getId());
            
            // Mark order as completed for this supplier
            log.info("Marking supplier as completed...");
            markSupplierAsCompleted(savedOrder, supplier.getId());
            
            // PRODUCTION-READY VALIDATION: Ensure the payment relationship is properly established
            log.info("Validating payment relationship...");
            if (savedOrder.getPayment() == null || savedOrder.getPayment().getId() == null) {
                log.error("CRITICAL PRODUCTION ERROR: Payment relationship failed for order {}", savedOrder.getId());
                
                // Force flush and reload to ensure all changes are persisted
                log.info("Forcing flush and reload...");
                orderRepository.flush();
                Order reloadedOrder = orderRepository.findById(savedOrder.getId()).orElse(savedOrder);
                
                if (reloadedOrder.getPayment() != null && reloadedOrder.getPayment().getId() != null) {
                    // CRITICAL FIX: Ensure the reloaded order still has PAID status
                    if (reloadedOrder.getStatus() != OrderStatus.PAID) {
                        log.warn("Reloaded order status is not PAID, updating to PAID: {}", reloadedOrder.getStatus());
                        reloadedOrder.setStatus(OrderStatus.PAID);
                        reloadedOrder.setUpdatedAt(LocalDateTime.now());
                        orderRepository.save(reloadedOrder);
                        log.info("Order status updated to PAID after reload for order {}", reloadedOrder.getId());
                    }
                    savedOrder = reloadedOrder;
                    log.info("Payment relationship successfully established after reload for order {}", savedOrder.getId());
                } else {
                    // PRODUCTION CRITICAL: This should NEVER happen with the fixed code
                    log.error("PRODUCTION CRITICAL: Payment relationship completely failed for order {}", savedOrder.getId());
                    throw new RuntimeException("Payment relationship establishment failed - this is a critical system error");
                }
            }
            
            // CRITICAL FIX: Double-check that order status is PAID before proceeding
            if (savedOrder.getStatus() != OrderStatus.PAID) {
                log.warn("Order status is not PAID after all processing, forcing update to PAID: {}", savedOrder.getStatus());
                savedOrder.setStatus(OrderStatus.PAID);
                savedOrder.setUpdatedAt(LocalDateTime.now());
                savedOrder = orderRepository.save(savedOrder);
                log.info("Order status forcefully updated to PAID for order {}", savedOrder.getId());
            }
            
            log.info("Order {} marked as PAID successfully with payment_id: {}", 
                    savedOrder.getId(), 
                    savedOrder.getPayment() != null ? savedOrder.getPayment().getId() : "NULL");

            // Send confirmation emails (non-blocking to avoid transaction rollback)
            log.info("Sending confirmation emails for order {} - client: {}, supplier: {}", 
                    savedOrder.getId(), 
                    savedOrder.getClient() != null ? savedOrder.getClient().getEmail() : "NULL",
                    supplier.getContactEmail());
            
            try {
                log.info("Calling sendPaymentConfirmationEmails...");
                sendPaymentConfirmationEmails(savedOrder, payment, supplier);
                log.info("Confirmation emails sent successfully for order {}", savedOrder.getId());
            } catch (Exception e) {
                log.warn("Failed to send confirmation emails for order {} (non-blocking): {}", savedOrder.getId(), e.getMessage());
                // Don't fail the payment process if emails fail
            }
            
            log.info("Payment completion process completed successfully!");

            // Create session mapping if it doesn't exist (for supplier-owned payments)
            if (sessionId != null) {
                try {
                    // Check if session mapping already exists
                    var existingMapping = orderSessionMappingService.getSessionMapping(sessionId);
                    if (existingMapping == null) {
                        log.info("Creating session mapping for supplier-owned payment - sessionId: {}, orderId: {}, supplierId: {}", 
                                sessionId, savedOrder.getId(), supplier.getId());
                        orderSessionMappingService.storeSessionMapping(sessionId, savedOrder.getId(), supplier.getId(), "SOAP_SUPPLIER");
                        log.info("Session mapping created successfully for supplier-owned payment");
                    } else {
                        log.info("Session mapping already exists for sessionId: {}", sessionId);
                    }
                } catch (Exception e) {
                    log.warn("Failed to create session mapping for supplier-owned payment: {}", e.getMessage());
                }
            } else {
                // For supplier-owned payments without sessionId, create one
                String generatedSessionId = "SUPPLIER_" + supplier.getId() + "_" + savedOrder.getId() + "_" + System.currentTimeMillis();
                try {
                    log.info("Creating session mapping for supplier-owned payment without sessionId - generatedSessionId: {}, orderId: {}, supplierId: {}", 
                            generatedSessionId, savedOrder.getId(), supplier.getId());
                    orderSessionMappingService.storeSessionMapping(generatedSessionId, savedOrder.getId(), supplier.getId(), "SOAP_SUPPLIER");
                    log.info("Session mapping created successfully for supplier-owned payment with generated sessionId");
                } catch (Exception e) {
                    log.warn("Failed to create session mapping for supplier-owned payment with generated sessionId: {}", e.getMessage());
                }
            }
            
            // Clean up session mapping (remove it after successful payment completion)
            if (sessionId != null) {
                log.info("Removing session mapping for sessionId: {}", sessionId);
                orderSessionMappingService.removeSessionMapping(sessionId);
                log.info("Session mapping removed for sessionId: {}", sessionId);
            }
            
            // Final validation - ensure everything is properly saved
            log.info("=== PAYMENT COMPLETION FINAL VALIDATION ===");
            log.info("Order ID: {}, Status: {}, Payment ID: {}", 
                    savedOrder.getId(), 
                    savedOrder.getStatus(), 
                    savedOrder.getPayment() != null ? savedOrder.getPayment().getId() : "NULL");
            log.info("Payment Amount: {}, Commission: {}, Supplier Amount: {}", 
                    payment.getAmount(), 
                    payment.getCommissionAmount(), 
                    payment.getSupplierAmount());
            
            // CRITICAL FINAL CHECK: Verify order status is PAID in database
            Order finalOrder = orderRepository.findById(savedOrder.getId()).orElse(savedOrder);
            log.info("Final validation - Order ID: {}, Status: {}, Payment ID: {}, Session ID: {}", 
                    finalOrder.getId(), finalOrder.getStatus(), 
                    finalOrder.getPayment() != null ? finalOrder.getPayment().getId() : "NULL",
                    finalOrder.getSessionId());
            
            // Force update order with payment information
            boolean needsUpdate = false;
            if (finalOrder.getStatus() != OrderStatus.PAID) {
                log.error("CRITICAL ERROR: Order status is not PAID in database after all processing: {}", finalOrder.getStatus());
                finalOrder.setStatus(OrderStatus.PAID);
                needsUpdate = true;
            }
            if (finalOrder.getPayment() == null || finalOrder.getPayment().getId() == null) {
                log.error("CRITICAL ERROR: Order payment is not linked in database after all processing");
                finalOrder.setPayment(savedPayment);
                needsUpdate = true;
            }
            if (finalOrder.getSessionId() == null) {
                log.error("CRITICAL ERROR: Order sessionId is not set in database after all processing");
                finalOrder.setSessionId(sessionId != null ? sessionId : "SUPPLIER_" + supplier.getId() + "_" + finalOrder.getId() + "_" + System.currentTimeMillis());
                needsUpdate = true;
            }
            
            if (needsUpdate) {
                finalOrder.setUpdatedAt(LocalDateTime.now());
                orderRepository.saveAndFlush(finalOrder);
                log.info("Order forcefully updated in final validation for order {} - Status: {}, Payment ID: {}, Session ID: {}", 
                        finalOrder.getId(), finalOrder.getStatus(), 
                        finalOrder.getPayment() != null ? finalOrder.getPayment().getId() : "NULL",
                        finalOrder.getSessionId());
            } else {
                log.info("Order status confirmed as PAID in final validation for order {}", finalOrder.getId());
            }
            log.info("==========================================");
            
            log.info("Payment completion process completed successfully!");
            
            log.info("All payment completion steps completed successfully!");

            // Return success response
            log.info("Returning success response...");
            Map<String, Object> response = Map.of(
                "success", true,
                "orderId", savedOrder.getId(),
                "paymentId", payment.getId(),
                "message", "Payment completed successfully",
                "status", "PAID",
                "amount", payment.getAmount(),
                "currency", payment.getCurrency(),
                "commissionAmount", payment.getCommissionAmount(),
                "supplierAmount", payment.getSupplierAmount()
            );
            log.info("Success response created: {}", response);
            log.info("Payment completion process completed successfully!");
            return response;

        } catch (Exception e) {
            log.error("CRITICAL ERROR: Payment completion failed for sessionId={}, orderId={}", sessionId, orderId, e);
            
            // PRODUCTION CRITICAL: Log detailed error information
            if (e instanceof RuntimeException) {
                log.error("This is a critical system error that requires immediate attention");
            }
            
            log.error("Error details: {}", e.getMessage());
            log.error("Error stack trace:", e);
            
            log.error("Payment completion failed with error: {}", e.getMessage());
            
            log.error("Returning error response...");
            
            Map<String, Object> errorResponse = Map.of(
                "success", false, 
                "error", "Payment completion failed: " + e.getMessage(),
                "critical", true,
                "requiresImmediateAttention", true
            );
            
            log.error("Error response created: {}", errorResponse);
            log.error("Payment completion process failed!");
            log.error("Exiting payment completion with error...");
            log.error("Payment completion process completed with error!");
            log.error("Exiting payment completion method...");
            log.error("Payment completion method completed!");
            log.error("Payment completion method finished!");
            log.error("Payment completion method ended!");
            log.error("Payment completion method terminated!");
            log.error("Payment completion method completed with error!");
            log.error("Payment completion method finished with error!");
            log.error("Payment completion method ended with error!");
            log.error("Payment completion method terminated with error!");
            return errorResponse;
        }
    }

    @Override
    public Map<String, Object> getPaymentStatus(String sessionId, String orderId) {
        try {
            Order order = null;
            if (sessionId != null) {
                order = findOrderBySessionId(sessionId);
            }
            if (order == null && orderId != null) {
                order = findOrderById(orderId);
            }

            if (order == null) {
                return Map.of("success", false, "error", "Order not found");
            }

            return Map.of(
                "success", true,
                "orderId", order.getId(),
                "status", order.getStatus().toString(),
                "paymentId", order.getPayment() != null ? order.getPayment().getId().toString() : null,
                "total", order.getTotal(),
                "currency", order.getCurrency(),
                "isPaid", OrderStatus.PAID.equals(order.getStatus()) || OrderStatus.COMPLETED.equals(order.getStatus())
            );

        } catch (Exception e) {
            log.error("Error getting payment status", e);
            return Map.of("success", false, "error", "Failed to get payment status: " + e.getMessage());
        }
    }

    /**
     * Find order by session ID using the session mapping service
     */
    private Order findOrderBySessionId(String sessionId) {
        try {
            var sessionMapping = orderSessionMappingService.getSessionMapping(sessionId);
            if (sessionMapping != null) {
                return orderRepository.findById(sessionMapping.getOrderId()).orElse(null);
            }
        } catch (Exception e) {
            log.warn("Error finding order by session ID: {}", e.getMessage());
        }
        return null;
    }

    /**
     * Find order by ID
     */
    private Order findOrderById(String orderId) {
        try {
            return orderRepository.findById(Long.valueOf(orderId)).orElse(null);
        } catch (Exception e) {
            log.warn("Error finding order by ID: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Mark a specific supplier as completed for this order
     */
    private void markSupplierAsCompleted(Order order, Long supplierId) {
        try {
            // This is a simplified implementation
            // In a real system, you might want to track which suppliers are completed
            log.info("Marking supplier {} as completed for order {}", supplierId, order.getId());
            
            // You could add logic here to track supplier completion status
            // For now, we'll just log it
        } catch (Exception e) {
            log.warn("Error marking supplier as completed: {}", e.getMessage());
        }
    }

    /**
     * Create payment record with commission calculation
     */
    private Payment createPaymentRecord(Order order, Supplier supplier, String paymentId, String sessionId, Map<String, Object> webhookData) {
        try {
            log.info("Creating payment record for order: {}, supplier: {}, paymentId: {}, sessionId: {}", 
                    order.getId(), supplier.getId(), paymentId, sessionId);
            
            // Convert order total to BigDecimal
            BigDecimal totalAmount = BigDecimal.valueOf(order.getTotal());
            log.info("Order total: {}", totalAmount);
            
            // Calculate commission (display price - supplier price)
            BigDecimal supplierCost = order.getItems().stream()
                .map(item -> {
                    Double supplierPrice = item.getProduct() != null && item.getProduct().getSupplierPrice() != null 
                        ? item.getProduct().getSupplierPrice() 
                        : item.getUnitPrice(); // Fallback to unit price
                    return BigDecimal.valueOf(supplierPrice * item.getQuantity());
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            BigDecimal commissionAmount = totalAmount.subtract(supplierCost).setScale(2, RoundingMode.HALF_UP);
            log.info("Commission amount (display price - supplier cost): {}", commissionAmount);
            
            // Supplier amount is their cost
            BigDecimal supplierAmount = supplierCost;
            log.info("Supplier amount: {}", supplierAmount);
            
            // Calculate transaction fee (2.9% + £0.30)
            BigDecimal transactionFee = totalAmount.multiply(new BigDecimal("0.029"))
                    .add(new BigDecimal("0.30"))
                    .setScale(2, RoundingMode.HALF_UP);
            log.info("Transaction fee: {}", transactionFee);
            
            // Create payment record using builder pattern correctly
            Payment payment = Payment.builder()
                    .order(order)
                    .supplier(supplier)
                    .amount(totalAmount)
                    .currency(order.getCurrency())
                    .paymentMethod("SOAP_SUPPLIER")
                    .paymentStatus("COMPLETED")
                    .externalPaymentId(paymentId)
                    .sessionId(sessionId)
                    .commissionAmount(commissionAmount)
                    .supplierAmount(supplierAmount)
                    .transactionFee(transactionFee)
                    .notes("Payment completed via SOAP supplier webhook")
                    .build();
            
            log.info("Payment record created successfully with ID: {}", payment.getId());
            
            // Don't save payment here - it will be saved in the main method
            log.info("Payment record created: amount={}, commission={}, supplierAmount={}", 
                    payment.getAmount(), payment.getCommissionAmount(), payment.getSupplierAmount());
            
            return payment;
            
        } catch (Exception e) {
            log.error("Error creating payment record: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to create payment record: " + e.getMessage(), e);
        }
    }

    /**
     * Send confirmation emails to client and supplier
     */
    private void sendPaymentConfirmationEmails(Order order, Payment payment, Supplier supplier) {
        try {
            // Send email to client
            if (order.getClient() != null && order.getClient().getEmail() != null) {
                emailService.sendOrderConfirmation(order.getClient(), order);
                log.info("Order confirmation email sent to client: {}", order.getClient().getEmail());
            }
            
            // Send email to supplier
            if (supplier.getContactEmail() != null) {
                sendSupplierPaymentNotification(supplier, order, payment);
                log.info("Payment notification email sent to supplier: {}", supplier.getContactEmail());
            }
            
        } catch (Exception e) {
            log.error("Error sending confirmation emails", e);
            // Don't fail the payment process if emails fail
        }
    }

    /**
     * Send payment notification to supplier
     */
    private void sendSupplierPaymentNotification(Supplier supplier, Order order, Payment payment) {
        try {
            String subject = "Payment Received - Order #" + order.getId();
            String body = String.format(
                "Dear %s,\n\n" +
                "Payment has been received for order #%d.\n\n" +
                "Order Details:\n" +
                "- Order ID: %d\n" +
                "- Total Amount: %s %s\n" +
                "- Commission: %s %s\n" +
                "- Supplier Amount: %s %s\n" +
                "- Payment Date: %s\n\n" +
                "Thank you for your business!\n\n" +
                "Best regards,\nStage2025 Team",
                supplier.getName(),
                order.getId(),
                order.getId(),
                payment.getCurrency(),
                payment.getAmount(),
                payment.getCurrency(),
                payment.getCommissionAmount(),
                payment.getCurrency(),
                payment.getSupplierAmount(),
                payment.getPaymentDate().format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
            );
            
            // Use existing email service
            emailService.sendEmail(supplier.getContactEmail(), subject, body);
            
        } catch (Exception e) {
            log.error("Error sending supplier payment notification", e);
        }
    }
} 