package com.example.stage2025.service.impl;

import com.example.stage2025.dto.OrderDto;
import com.example.stage2025.dto.PaymentIntentRequest;
import com.example.stage2025.dto.PaymentIntentResponse;
import com.example.stage2025.entity.Order;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.entity.SoapSupplier;
import com.example.stage2025.enums.OrderStatus;
import com.example.stage2025.service.OrderService;
import com.example.stage2025.repository.OrderRepository;
import com.example.stage2025.repository.ProductRepository;
import com.example.stage2025.service.EmailService;
import com.example.stage2025.service.impl.SoapPaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class DirectSupplierPaymentService {
    private void validateOrderItems(com.example.stage2025.entity.Order order) {
        if (order.getItems() != null) {
            for (com.example.stage2025.entity.OrderItem item : order.getItems()) {
                if (item.getProduct() == null) {
                    throw new IllegalStateException(
                        "Product is null for item: " + item.getProductName()
                    );
                }
                
                // Check if product has either supplierRef or externalProductId (fallback logic like SoapPaymentService)
                String supplierRef = item.getProduct().getSupplierRef();
                String externalProductId = item.getProduct().getExternalProductId();
                
                if ((supplierRef == null || supplierRef.isEmpty()) && 
                    (externalProductId == null || externalProductId.isEmpty())) {
                    throw new IllegalStateException(
                        "Product missing supplier reference (both supplierRef and externalProductId are null/empty) for item: " + item.getProductName()
                    );
                }
            }
        }
    }

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    private final RestTemplate restTemplate;
    private final SoapPaymentService soapPaymentService;
    private final OrderService orderService;
    private final EmailService emailService;

    /**
     * Creates payment intent directly with supplier's payment system
     * Client will pay directly to supplier, not to platform
     */
    public PaymentIntentResponse createSupplierPaymentIntent(PaymentIntentRequest request, Supplier supplier) {
        try {
            log.info("Creating direct payment intent with supplier: {} for order: {}",
                    supplier.getName(), request.getOrderId());

            // Always load the order and its items/products from the DB, never from DTO
            var orderOpt = orderRepository.findWithItemsAndProductSupplierById(request.getOrderId());
            if (orderOpt.isEmpty()) {
                throw new RuntimeException("Order not found: " + request.getOrderId());
            }
            var order = orderOpt.get();

            // Route to appropriate supplier payment system based on supplier type
            if (supplier.isHasOwnPaymentSystem()) {
                if (supplier instanceof SoapSupplier) {
                    log.info("Routing to SOAP payment for supplier: {}", supplier.getName());
                    return createSoapPaymentIntentFromOrder(request, supplier, order);
                } else {
                    log.info("Routing to REST API payment for supplier: {}", supplier.getName());
                    return createRestApiPaymentIntentFromOrder(request, supplier, order);
                }
            } else {
                throw new RuntimeException("Supplier does not have own payment system configured");
            }

        } catch (Exception e) {
            log.error("Error creating supplier payment intent: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to create supplier payment intent: " + e.getMessage());
        }
    }

    private PaymentIntentResponse createRestApiPaymentIntent(PaymentIntentRequest request,
                                                             Supplier supplier,
                                                             OrderDto orderDto) {
        try {
            log.info("Creating REST API payment intent with supplier: {}", supplier.getName());

            // Prepare request for supplier's API
            Map<String, Object> supplierRequest = new HashMap<>();
            supplierRequest.put("orderId", request.getOrderId());
            supplierRequest.put("amount", request.getAmount());
            supplierRequest.put("currency", request.getCurrency());
            supplierRequest.put("clientEmail", orderDto.getClientEmail());
            supplierRequest.put("description", "Order #" + request.getOrderId());
            supplierRequest.put("returnUrl", getReturnUrl(request.getOrderId()));
            supplierRequest.put("cancelUrl", getCancelUrl(request.getOrderId()));

            // Add order items details
            supplierRequest.put("items", orderDto.getItems());

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // TODO: Add authentication when API key/secret fields are added to Supplier entity
            // if (supplier.getApiKey() != null && !supplier.getApiKey().isEmpty()) {
            //     headers.set("Authorization", "Bearer " + supplier.getApiKey());
            // }
            // if (supplier.getApiSecret() != null && !supplier.getApiSecret().isEmpty()) {
            //     headers.set("X-API-Secret", supplier.getApiSecret());
            // }

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(supplierRequest, headers);

            // Call supplier's payment API
            String paymentEndpoint = supplier.getPaymentApiEndpoint() + "/create-payment-intent";
            ResponseEntity<Map> response = restTemplate.exchange(
                    paymentEndpoint,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> responseBody = response.getBody();

                return PaymentIntentResponse.builder()
                        .id((String) responseBody.get("id"))
                        .amount(((Number) responseBody.get("amount")).longValue())
                        .currency((String) responseBody.get("currency"))
                        .status((String) responseBody.get("status"))
                        .clientSecret((String) responseBody.get("clientSecret"))
                        .paymentUrl((String) responseBody.get("paymentUrl")) // Direct payment URL
                        .paymentFlow("DIRECT_TO_SUPPLIER")
                        .supplierName(supplier.getName())
                        .build();
            } else {
                throw new RuntimeException("Invalid response from supplier payment API");
            }

        } catch (Exception e) {
            log.error("Error creating REST API payment intent with supplier {}: {}",
                    supplier.getName(), e.getMessage(), e);
            throw new RuntimeException("Failed to create payment intent with supplier: " + e.getMessage());
        }
    }

    // Always use Order entity from DB for SOAP payment
    private PaymentIntentResponse createSoapPaymentIntentFromOrder(PaymentIntentRequest request,
                                                                  Supplier supplier,
                                                                  Order order) {
        try {
            log.info("Creating SOAP payment intent with supplier: {} (DB order)", supplier.getName());

            // Validate all order items before payment
            validateOrderItems(order);

            // Call SOAP service to create payment session
            try {
                Map<String, Object> soapResult = createSoapPaymentSession(supplier, order);
                if (soapResult.get("success").equals(true)) {
                    String paymentUrl = (String) soapResult.get("paymentUrl");
                    log.info("SOAP payment session created successfully. PaymentURL: {}", paymentUrl);
                    return PaymentIntentResponse.builder()
                            .id((String) soapResult.get("sessionId"))
                            .amount(request.getAmount())
                            .currency(request.getCurrency())
                            .status("requires_payment_method")
                            .paymentUrl(paymentUrl)
                            .paymentFlow("DIRECT_TO_SUPPLIER")
                            .supplierName(supplier.getName())
                            .build();
                } else {
                    throw new RuntimeException("SOAP payment session creation failed");
                }
            } catch (RuntimeException e) {
                log.error("SOAP payment failed for supplier {}: {}", supplier.getName(), e.getMessage());
                throw new RuntimeException("Supplier payment failed: " + e.getMessage());
            }

        } catch (Exception e) {
            log.error("Error creating SOAP payment intent with supplier {}: {}",
                    supplier.getName(), e.getMessage(), e);
            throw new RuntimeException("Failed to create SOAP payment intent: " + e.getMessage());
        }
    }

    // Always use Order entity from DB for REST API payment (stub)
    private PaymentIntentResponse createRestApiPaymentIntentFromOrder(PaymentIntentRequest request,
                                                                     Supplier supplier,
                                                                     Order order) {
        throw new UnsupportedOperationException("REST API payment from DB order not implemented");
    }

    private Map<String, Object> createSoapPaymentSession(Supplier supplier, Order order) {
        Map<String, Object> result = new HashMap<>();
        try {
            // Actually call the SOAP payment service and get the full response
            Map<String, Object> soapResponse = soapPaymentService.processSoapPaymentWithResponse(supplier.getId(), order);
            log.info("SOAP Response received: {}", soapResponse);
            
            boolean success = (Boolean) soapResponse.getOrDefault("success", false);
            
            if (success) {
                // Extract real data from SOAP response
                String sessionId = (String) soapResponse.get("stripeSessionId");
                String paymentUrl = (String) soapResponse.get("url");
                
                log.info("Extracted from SOAP response - sessionId: {}, paymentUrl: {}", sessionId, paymentUrl);
                
                // Fallback to generated values if SOAP doesn't provide them
                if (sessionId == null) {
                    sessionId = "soap_session_" + order.getId() + "_" + System.currentTimeMillis();
                    log.info("Generated fallback sessionId: {}", sessionId);
                }
                if (paymentUrl == null) {
                    paymentUrl = supplier.getPaymentApiEndpoint() + "/pay?session=" + sessionId;
                    log.info("Generated fallback paymentUrl: {}", paymentUrl);
                }
                
                result.put("success", true);
                result.put("sessionId", sessionId);
                result.put("paymentUrl", paymentUrl);
                log.info("Final result: sessionId={}, paymentUrl={}", sessionId, paymentUrl);
            } else {
                result.put("success", false);
                result.put("error", (String) soapResponse.getOrDefault("error", "SOAP payment failed"));
            }
            return result;
        } catch (Exception e) {
            log.error("Error creating SOAP payment session: {}", e.getMessage());
            result.put("success", false);
            result.put("error", e.getMessage());
            return result;
        }
    }

    /**
     * Handles webhook/callback from supplier after direct payment
     */
    public void handleSupplierPaymentCallback(String supplierId, Map<String, Object> callbackData) {
        try {
            log.info("Received payment callback from supplier: {}", supplierId);

            String orderId = (String) callbackData.get("orderId");
            String status = (String) callbackData.get("status");
            String transactionRef = (String) callbackData.get("transactionRef");

            if ("success".equalsIgnoreCase(status) || "completed".equalsIgnoreCase(status)) {
                // Mark order as paid
                orderService.updateOrderStatus(Long.parseLong(orderId), OrderStatus.PAID);

                // Send confirmation emails
                sendDirectPaymentConfirmation(Long.parseLong(orderId), supplierId, transactionRef);

                log.info("Direct supplier payment confirmed for order: {}", orderId);
            } else {
                log.warn("Direct supplier payment failed for order: {} with status: {}", orderId, status);
                // Handle failed payment
                orderService.updateOrderStatus(Long.parseLong(orderId), OrderStatus.PAYMENT_FAILED);
            }

        } catch (Exception e) {
            log.error("Error handling supplier payment callback: {}", e.getMessage(), e);
        }
    }

    private void sendDirectPaymentConfirmation(Long orderId, String supplierId, String transactionRef) {
        try {
            var orderDto = orderService.getOrderById(orderId);
            if (orderDto != null) {
                // TODO: Send confirmation email to customer
                // emailService.sendDirectPaymentConfirmation(orderDto.getClientEmail(), orderDto, supplierId);

                // TODO: Send notification to admin
                // emailService.sendAdminDirectPaymentNotification(orderDto, supplierId, transactionRef);
                log.info("Direct payment confirmation emails not implemented yet for order {}", orderId);
            }
        } catch (Exception e) {
            log.error("Error sending direct payment confirmation: {}", e.getMessage());
        }
    }

    private String getReturnUrl(Long orderId) {
        return "https://yourplatform.com/payment/success?orderId=" + orderId;
    }

    private String getCancelUrl(Long orderId) {
        return "https://yourplatform.com/payment/cancel?orderId=" + orderId;
    }
}