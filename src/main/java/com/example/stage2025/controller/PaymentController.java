package com.example.stage2025.controller;

import com.example.stage2025.dto.PaymentIntentRequest;
import com.example.stage2025.dto.PaymentIntentResponse;
import com.example.stage2025.dto.PaymentConfirmRequest;
import com.example.stage2025.dto.PaymentDto;
import com.example.stage2025.enums.OrderStatus;
import com.example.stage2025.service.OrderService;
import com.example.stage2025.service.PaymentService;
import com.example.stage2025.service.EmailService;
import com.example.stage2025.repository.OrderRepository;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.entity.Order;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Event;
import com.stripe.net.Webhook;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class PaymentController {

    private final OrderService orderService;
    private final PaymentService paymentService;
    private final EmailService emailService;
    private final OrderRepository orderRepository;
    // private final SupplierPaymentService supplierPaymentService;

    @Value("${stripe.webhook.secret:}")
    private String stripeWebhookSecret;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<PaymentIntentResponse> createPaymentIntent(@RequestBody PaymentIntentRequest request) {
        try {
            log.info("Creating payment intent for order: {}", request.getOrderId());
            
            // Get order details
            var orderDto = orderService.getOrderById(request.getOrderId());
            if (orderDto == null) {
                return ResponseEntity.badRequest().build();
            }

            // Create payment intent parameters
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(request.getAmount())
                    .setCurrency(request.getCurrency())
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                    .setEnabled(true)
                                    .build()
                    )
                    .putMetadata("orderId", String.valueOf(request.getOrderId()))
                    .build();

            // Create payment intent
            PaymentIntent paymentIntent = PaymentIntent.create(params);

            // Persist a Payment record linked to the order using Stripe intent id as transactionRef
            try {
                PaymentDto paymentDto = PaymentDto.builder()
                        .orderId(request.getOrderId())
                        .transactionRef(paymentIntent.getId())
                        .paymentMethod("STRIPE")
                        .amount(paymentIntent.getAmount() != null ? paymentIntent.getAmount() / 100.0 : orderDto.getTotal())
                        .build();
                paymentService.createPayment(paymentDto);
            } catch (Exception persistEx) {
                log.warn("Failed to persist Payment record for intent {}: {}", paymentIntent.getId(), persistEx.getMessage());
            }

            // Create response
            PaymentIntentResponse response = PaymentIntentResponse.builder()
                    .id(paymentIntent.getId())
                    .amount(paymentIntent.getAmount())
                    .currency(paymentIntent.getCurrency())
                    .status(paymentIntent.getStatus())
                    .clientSecret(paymentIntent.getClientSecret())
                    .build();

            log.info("Payment intent created successfully: {}", paymentIntent.getId());
            return ResponseEntity.ok(response);

        } catch (StripeException e) {
            log.error("Error creating payment intent: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            log.error("Unexpected error creating payment intent: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<Map<String, Object>> confirmPayment(@RequestBody PaymentConfirmRequest request) {
        try {
            log.info("Confirming payment: {}", request.getPaymentIntentId());
            
            // Confirm the payment intent
            PaymentIntent paymentIntent = PaymentIntent.retrieve(request.getPaymentIntentId());
            
            if (paymentIntent.getStatus().equals("succeeded")) {
                // Update order status to confirmed
                String orderId = paymentIntent.getMetadata().get("orderId");
                if (orderId != null) {
                    orderService.updateOrderStatus(Long.parseLong(orderId), OrderStatus.PAID);
                }

                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Payment confirmed successfully");
                response.put("paymentIntentId", paymentIntent.getId());
                
                log.info("Payment confirmed successfully: {}", paymentIntent.getId());
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Payment not succeeded");
                response.put("status", paymentIntent.getStatus());
                
                return ResponseEntity.ok(response);
            }

        } catch (StripeException e) {
            log.error("Error confirming payment: {}", e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Payment confirmation failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            log.error("Unexpected error confirming payment: {}", e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Internal server error");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "Payment service is running");
        return ResponseEntity.ok(response);
    }

    // Refund a payment intent
    @PostMapping("/refund")
    public ResponseEntity<Map<String, Object>> refund(@RequestBody Map<String, Object> payload) {
        try {
            String paymentIntentId = (String) payload.get("paymentIntentId");
            if (paymentIntentId == null || paymentIntentId.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", "paymentIntentId is required"));
            }
            com.stripe.model.Refund.create(Map.of("payment_intent", paymentIntentId));
            paymentService.updatePaymentStatusByTransactionRef(paymentIntentId, "REFUNDED");
            return ResponseEntity.ok(Map.of("status", "refunded"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    // Capture an authorized payment intent
    @PostMapping("/capture")
    public ResponseEntity<Map<String, Object>> capture(@RequestBody Map<String, Object> payload) {
        try {
            String paymentIntentId = (String) payload.get("paymentIntentId");
            if (paymentIntentId == null || paymentIntentId.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", "paymentIntentId is required"));
            }
            PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);
            PaymentIntent captured = intent.capture();
            if ("succeeded".equalsIgnoreCase(captured.getStatus())) {
                paymentService.updatePaymentStatusByTransactionRef(paymentIntentId, "PAID");
            }
            return ResponseEntity.ok(Map.of("status", captured.getStatus()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Stripe webhook to process asynchronous payment events
     */
    @PostMapping("/stripe-webhook")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload,
                                                      @RequestHeader(name = "Stripe-Signature", required = false) String sigHeader) {
        if (stripeWebhookSecret == null || stripeWebhookSecret.isBlank()) {
            log.warn("Stripe webhook secret not configured; skipping signature verification");
        }

        try {
            if (stripeWebhookSecret == null || stripeWebhookSecret.isBlank()) {
                log.warn("No webhook secret configured; ignoring webhook payload");
                return ResponseEntity.ok("ignored");
            }

            Event event = Webhook.constructEvent(payload, sigHeader, stripeWebhookSecret);

            String eventType = event.getType();
            log.info("Received Stripe event: {}", eventType);

            var dataObjectDeserializer = event.getDataObjectDeserializer();
            if (!dataObjectDeserializer.getObject().isPresent()) {
                log.warn("Unable to deserialize Stripe event data for type {}", eventType);
                return ResponseEntity.ok("ignored");
            }

            if ("payment_intent.succeeded".equals(eventType)) {
                PaymentIntent intent = (PaymentIntent) dataObjectDeserializer.getObject().get();
                String paymentIntentId = intent.getId();
                paymentService.updatePaymentStatusByTransactionRef(paymentIntentId, "PAID");

                // Also update order status using metadata
                String orderId = intent.getMetadata() != null ? intent.getMetadata().get("orderId") : null;
                if (orderId != null) {
                    orderService.updateOrderStatus(Long.parseLong(orderId), OrderStatus.PAID);
                    try {
                        Long oid = Long.parseLong(orderId);
                        java.util.Optional<Order> orderOpt = orderRepository.findById(oid);
                        if (orderOpt.isPresent()) {
                            Order order = orderOpt.get();
                            order.getItems().forEach(i -> {
                                Supplier s = i.getProduct().getSupplier();
                                if (s != null && s.isHasOwnPaymentSystem()) {
                                    emailService.sendSupplierPaymentRequest(s, order,
                                            "Commission owed notification for order #" + order.getId());
                                }
                            });
                        }
                    } catch (Exception ignored) {}
                }
            } else if ("payment_intent.payment_failed".equals(eventType)) {
                PaymentIntent intent = (PaymentIntent) dataObjectDeserializer.getObject().get();
                String paymentIntentId = intent.getId();
                paymentService.updatePaymentStatusByTransactionRef(paymentIntentId, "FAILED");
            }

            return ResponseEntity.ok("success");
        } catch (SignatureVerificationException e) {
            log.error("Stripe webhook signature verification failed: {}", e.getMessage());
            return ResponseEntity.status(400).body("invalid signature");
        } catch (Exception e) {
            log.error("Error handling Stripe webhook: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("webhook error");
        }
    }
}
