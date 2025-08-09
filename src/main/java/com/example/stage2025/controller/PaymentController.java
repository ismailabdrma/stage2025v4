package com.example.stage2025.controller;

import com.example.stage2025.dto.PaymentIntentRequest;
import com.example.stage2025.dto.PaymentIntentResponse;
import com.example.stage2025.dto.PaymentConfirmRequest;
import com.example.stage2025.enums.OrderStatus;
import com.example.stage2025.service.OrderService;
import com.example.stage2025.entity.Order;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
}
