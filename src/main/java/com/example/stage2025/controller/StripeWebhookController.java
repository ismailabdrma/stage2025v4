package com.example.stage2025.controller;

import com.example.stage2025.service.PaymentCompletionService;
import com.example.stage2025.service.OrderSessionMappingService;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/stripe/webhook")
@Slf4j
public class StripeWebhookController {

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    private final PaymentCompletionService paymentCompletionService;
    private final OrderSessionMappingService orderSessionMappingService;

    public StripeWebhookController(
            PaymentCompletionService paymentCompletionService,
            OrderSessionMappingService orderSessionMappingService) {
        this.paymentCompletionService = paymentCompletionService;
        this.orderSessionMappingService = orderSessionMappingService;
    }

    /**
     * Stripe webhook endpoint to automatically handle payment status updates
     * This eliminates the need for manual payment completion
     */
    @PostMapping
    public ResponseEntity<String> handleStripeWebhook(
            @RequestHeader("Stripe-Signature") String signature,
            @RequestBody String payload) {
        
        try {
            log.info("Received Stripe webhook");
            
            // Verify webhook signature
            Event event = Webhook.constructEvent(payload, signature, webhookSecret);
            
            log.info("Webhook event type: {}", event.getType());
            
            // Handle different event types
            switch (event.getType()) {
                case "checkout.session.completed":
                    handleCheckoutSessionCompleted(event);
                    break;
                case "payment_intent.succeeded":
                    handlePaymentIntentSucceeded(event);
                    break;
                case "payment_intent.payment_failed":
                    handlePaymentIntentFailed(event);
                    break;
                default:
                    log.info("Unhandled event type: {}", event.getType());
            }
            
            return ResponseEntity.ok("Webhook processed successfully");
            
        } catch (Exception e) {
            log.error("Error processing Stripe webhook: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body("Webhook processing failed");
        }
    }

    /**
     * Handle successful checkout session completion
     */
    private void handleCheckoutSessionCompleted(Event event) {
        try {
            EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
            StripeObject stripeObject = null;
            
            if (dataObjectDeserializer.getObject().isPresent()) {
                stripeObject = dataObjectDeserializer.getObject().get();
            } else {
                log.error("Failed to deserialize checkout session");
                return;
            }

            if (stripeObject instanceof Session) {
                Session session = (Session) stripeObject;
                String sessionId = session.getId();
                
                log.info("Processing completed checkout session: {}", sessionId);
                
                // Get order info from our session mapping
                Map<String, Object> orderInfo = orderSessionMappingService.getOrderInfoBySession(sessionId);
                
                if (orderInfo != null) {
                    String orderId = (String) orderInfo.get("orderId");
                    String supplierId = (String) orderInfo.get("supplierId");
                    
                    log.info("Found order mapping: orderId={}, supplierId={}", orderId, supplierId);
                    
                    // Automatically complete the payment
                    Map<String, Object> result = paymentCompletionService.processPaymentCompletion(
                            sessionId, orderId, supplierId, null, "SUCCESS", Map.of());
                    
                    if ((Boolean) result.get("success")) {
                        log.info("Payment automatically completed via webhook for session: {}", sessionId);
                    } else {
                        log.error("Failed to complete payment via webhook: {}", result.get("error"));
                    }
                } else {
                    log.warn("No order mapping found for Stripe session: {}", sessionId);
                }
            }
            
        } catch (Exception e) {
            log.error("Error handling checkout session completed: {}", e.getMessage(), e);
        }
    }

    /**
     * Handle successful payment intent
     */
    private void handlePaymentIntentSucceeded(Event event) {
        try {
            EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
            StripeObject stripeObject = null;
            
            if (dataObjectDeserializer.getObject().isPresent()) {
                stripeObject = dataObjectDeserializer.getObject().get();
            } else {
                log.error("Failed to deserialize payment intent");
                return;
            }

            if (stripeObject instanceof com.stripe.model.PaymentIntent) {
                com.stripe.model.PaymentIntent paymentIntent = (com.stripe.model.PaymentIntent) stripeObject;
                String paymentIntentId = paymentIntent.getId();
                
                log.info("Processing successful payment intent: {}", paymentIntentId);
                
                // Try to find session by payment intent ID
                // This is a fallback if checkout session mapping is not available
                // You might need to store payment intent to session mapping as well
            }
            
        } catch (Exception e) {
            log.error("Error handling payment intent succeeded: {}", e.getMessage(), e);
        }
    }

    /**
     * Handle failed payment intent
     */
    private void handlePaymentIntentFailed(Event event) {
        try {
            EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
            StripeObject stripeObject = null;
            
            if (dataObjectDeserializer.getObject().isPresent()) {
                stripeObject = dataObjectDeserializer.getObject().get();
            } else {
                log.error("Failed to deserialize payment intent");
                return;
            }

            if (stripeObject instanceof com.stripe.model.PaymentIntent) {
                com.stripe.model.PaymentIntent paymentIntent = (com.stripe.model.PaymentIntent) stripeObject;
                String paymentIntentId = paymentIntent.getId();
                
                log.info("Processing failed payment intent: {}", paymentIntentId);
                
                // Handle failed payment - mark order as failed, notify customer, etc.
            }
            
        } catch (Exception e) {
            log.error("Error handling payment intent failed: {}", e.getMessage(), e);
        }
    }
} 