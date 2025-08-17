package com.example.stage2025.service.impl;

import com.example.stage2025.dto.OrderDto;
import com.example.stage2025.dto.PaymentIntentRequest;
import com.example.stage2025.dto.PaymentIntentResponse;
import com.example.stage2025.dto.PaymentDto;
import com.example.stage2025.entity.Order;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.enums.OrderStatus;
import com.example.stage2025.service.PaymentService;
import com.example.stage2025.service.OrderService;
import com.example.stage2025.service.EmailService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlatformPaymentService {

    private final PaymentService paymentService;
    private final OrderService orderService;
    private final EmailService emailService;

    /**
     * Creates payment intent for platform payment
     * Client pays to platform, platform distributes to suppliers
     */
    public PaymentIntentResponse createPlatformPaymentIntent(PaymentIntentRequest request,
                                                             SmartPaymentRoutingService.PaymentRoutingResult routing) {
        try {
            log.info("Creating platform payment intent for order: {} with {} suppliers",
                    request.getOrderId(), routing.getSupplierCount());

            // Get order details
            var orderDto = orderService.getOrderById(request.getOrderId());
            if (orderDto == null) {
                throw new RuntimeException("Order not found: " + request.getOrderId());
            }

            // Create Stripe payment intent for platform
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(request.getAmount())
                    .setCurrency(request.getCurrency())
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                    .setEnabled(true)
                                    .build()
                    )
                    .putMetadata("orderId", String.valueOf(request.getOrderId()))
                    .putMetadata("paymentFlow", "PLATFORM_PAYMENT")
                    .putMetadata("supplierCount", String.valueOf(routing.getSupplierCount()))
                    .setDescription(createPaymentDescription(routing))
                    .build();

            // Create payment intent
            PaymentIntent paymentIntent = PaymentIntent.create(params);

            // Persist payment record
            try {
                PaymentDto paymentDto = PaymentDto.builder()
                        .orderId(request.getOrderId())
                        .transactionRef(paymentIntent.getId())
                        .paymentMethod("PLATFORM_STRIPE")
                        .amount(paymentIntent.getAmount() != null ? paymentIntent.getAmount() / 100.0 : orderDto.getTotal())
                        .build();
                paymentService.createPayment(paymentDto);
            } catch (Exception persistEx) {
                log.warn("Failed to persist Payment record for intent {}: {}",
                        paymentIntent.getId(), persistEx.getMessage());
            }

            // Create response
            PaymentIntentResponse response = PaymentIntentResponse.builder()
                    .id(paymentIntent.getId())
                    .amount(paymentIntent.getAmount())
                    .currency(paymentIntent.getCurrency())
                    .status(paymentIntent.getStatus())
                    .clientSecret(paymentIntent.getClientSecret())
                    .paymentFlow("PLATFORM_PAYMENT")
                    .supplierCount(routing.getSupplierCount())
                    .description("Platform payment for " + routing.getSupplierCount() + " suppliers")
                    .build();

            log.info("Platform payment intent created successfully: {} for order: {}",
                    paymentIntent.getId(), request.getOrderId());
            return response;

        } catch (StripeException e) {
            log.error("Error creating platform payment intent: {}", e.getMessage());
            throw new RuntimeException("Failed to create payment intent: " + e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error creating platform payment intent: {}", e.getMessage());
            throw new RuntimeException("Failed to create payment intent: " + e.getMessage());
        }
    }

    /**
     * Processes successful platform payment and distributes to suppliers
     */
    public void processPlatformPaymentSuccess(String paymentIntentId) {
        try {
            log.info("Processing successful platform payment: {}", paymentIntentId);

            // Retrieve payment intent to get order info
            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
            String orderId = paymentIntent.getMetadata().get("orderId");

            if (orderId != null) {
                Long oid = Long.parseLong(orderId);

                // Update order status
                orderService.updateOrderStatus(oid, OrderStatus.PAID);
                orderService.finalizePaidOrder(oid);

                // Send customer confirmation
                sendPlatformPaymentConfirmation(oid);

                // Distribute payments to suppliers
                distributeToSuppliers(oid);

                log.info("Platform payment processing completed for order: {}", oid);
            }

        } catch (Exception e) {
            log.error("Error processing platform payment success: {}", e.getMessage(), e);
        }
    }

    private void distributeToSuppliers(Long orderId) {
        try {
            log.info("Starting supplier payment distribution for order: {}", orderId);

            var orderDto = orderService.getOrderById(orderId);
            if (orderDto == null) {
                log.error("Order not found for distribution: {}", orderId);
                return;
            }

            // Create Order object for supplier payment service
            Order order = convertToOrderEntity(orderDto);

            // TODO: Process supplier payments
            // supplierPaymentService.processSupplierPayments(order);
            log.info("Supplier payment processing not implemented yet for order {}", orderId);

        } catch (Exception e) {
            log.error("Error distributing payments to suppliers for order {}: {}", orderId, e.getMessage(), e);
        }
    }

    private void sendPlatformPaymentConfirmation(Long orderId) {
        try {
            var orderDto = orderService.getOrderById(orderId);
            if (orderDto != null) {
                // Send confirmation email to customer
                emailService.sendOrderConfirmationEmail(orderDto.getClientEmail(),
                        convertToOrderEntity(orderDto));

                // Send admin notification
                emailService.sendAdminNewOrderNotification(convertToOrderEntity(orderDto));

                // Send supplier order notifications (not payment confirmations)
                // TODO: Implement supplier notifications when OrderItemDto has product/supplier info
                log.info("Supplier notifications not implemented yet for order {}", orderDto.getId());
            }
        } catch (Exception e) {
            log.error("Error sending platform payment confirmation for order {}: {}", orderId, e.getMessage());
        }
    }

    private String createPaymentDescription(SmartPaymentRoutingService.PaymentRoutingResult routing) {
        if (routing.getSupplierCount() == 1) {
            return "Platform payment for single supplier order #" + routing.getOrderId();
        } else {
            return "Platform payment for " + routing.getSupplierCount() + " suppliers in order #" + routing.getOrderId();
        }
    }

    private Order convertToOrderEntity(OrderDto orderDto) {
        // Convert OrderDto to Order entity
        // Implementation depends on your DTO/Entity structure
        Order order = new Order();
        order.setId(orderDto.getId());
        order.setTotal(orderDto.getTotal());
        order.setOrderNumber(orderDto.getOrderNumber());
        order.setOrderDate(orderDto.getOrderDate());
        // TODO: Set other properties as needed
        return order;
    }
}