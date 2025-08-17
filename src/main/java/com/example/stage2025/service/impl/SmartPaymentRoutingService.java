package com.example.stage2025.service.impl;

import com.example.stage2025.dto.PaymentIntentRequest;
import com.example.stage2025.dto.PaymentIntentResponse;
import com.example.stage2025.entity.Order;
import com.example.stage2025.entity.OrderItem;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.entity.ApiSupplier;
import com.example.stage2025.entity.SoapSupplier;
import com.example.stage2025.entity.ExcelSupplier;
import com.example.stage2025.repository.OrderRepository;
import com.example.stage2025.service.OrderService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import com.example.stage2025.entity.SoapSupplier;
import com.example.stage2025.entity.ApiSupplier;
import com.example.stage2025.entity.ExcelSupplier;

@Service
@RequiredArgsConstructor
@Slf4j
public class SmartPaymentRoutingService {

    private final OrderService orderService;
    private final OrderRepository orderRepository;
    private final PlatformPaymentService platformPaymentService;
    private final DirectSupplierPaymentService directSupplierPaymentService;

    @PersistenceContext
    private EntityManager em;

    @Transactional(readOnly = true)
    public PaymentRoutingResult determinePaymentFlow(Long orderId) {
        log.info("ROUTING DEBUG: determinePaymentFlow called for order {}", orderId);
        try {
            var orderDto = orderService.getOrderById(orderId);
            if (orderDto == null) {
                return PaymentRoutingResult.builder()
                        .success(false)
                        .paymentFlow(PaymentFlow.PLATFORM_PAYMENT)
                        .orderId(orderId)
                        .message("Order not found")
                        .build();
            }

            Map<Supplier, List<OrderItem>> itemsBySupplier = groupItemsBySupplier(orderId);

            log.info("ROUTING DEBUG: Order {} has {} unique suppliers", orderId, itemsBySupplier.size());

            if (itemsBySupplier.size() == 1) {
                Supplier singleSupplier = itemsBySupplier.keySet().iterator().next();
                log.info("Single supplier detected: {} (type: {})", singleSupplier.getName(), singleSupplier.getClass().getSimpleName());
                
                // Force reload the supplier to ensure proper polymorphic type loading
                if (singleSupplier instanceof SoapSupplier) {
                    singleSupplier = em.find(SoapSupplier.class, singleSupplier.getId());
                } else if (singleSupplier instanceof ApiSupplier) {
                    singleSupplier = em.find(ApiSupplier.class, singleSupplier.getId());
                } else if (singleSupplier instanceof ExcelSupplier) {
                    singleSupplier = em.find(ExcelSupplier.class, singleSupplier.getId());
                }

                if (singleSupplier instanceof ExcelSupplier) {
                    log.info("Single ExcelSupplier {} -> platform payment", singleSupplier.getName());
                    return PaymentRoutingResult.builder()
                            .success(true)
                            .paymentFlow(PaymentFlow.PLATFORM_PAYMENT)
                            .orderId(orderId)
                            .totalAmount(orderDto.getTotal())
                            .supplierCount(1)
                            .message("Platform payment for Excel supplier")
                            .build();
                }

                if (hasOwnPaymentSystem(singleSupplier)) {
                    log.info("Single supplier {} ({}) with own payment system -> direct payment",
                            singleSupplier.getName(), singleSupplier.getClass().getSimpleName());
                    return PaymentRoutingResult.builder()
                            .success(true)
                            .paymentFlow(PaymentFlow.DIRECT_TO_SUPPLIER)
                            .primarySupplier(singleSupplier)
                            .orderId(orderId)
                            .totalAmount(orderDto.getTotal())
                            .message("Direct payment to " + singleSupplier.getClass().getSimpleName())
                            .build();
                } else {
                    log.info("Single supplier {} without own payment system -> platform",
                            singleSupplier.getName());
                    return PaymentRoutingResult.builder()
                            .success(true)
                            .paymentFlow(PaymentFlow.PLATFORM_PAYMENT)
                            .orderId(orderId)
                            .totalAmount(orderDto.getTotal())
                            .supplierCount(1)
                            .message("Platform payment for single supplier")
                            .build();
                }
            } else {
                log.info("Multiple suppliers ({}) -> platform payment", itemsBySupplier.size());
                return PaymentRoutingResult.builder()
                        .success(true)
                        .paymentFlow(PaymentFlow.PLATFORM_PAYMENT)
                        .orderId(orderId)
                        .totalAmount(orderDto.getTotal())
                        .supplierCount(itemsBySupplier.size())
                        .message("Platform payment for multiple suppliers")
                        .build();
            }

        } catch (Exception e) {
            log.error("Error determining payment flow for order {}: {}", orderId, e.getMessage(), e);
            return PaymentRoutingResult.builder()
                    .success(false)
                    .paymentFlow(PaymentFlow.PLATFORM_PAYMENT)
                    .orderId(orderId)
                    .message("Error determining payment flow: " + e.getMessage())
                    .build();
        }
    }

    private boolean hasOwnPaymentSystem(Supplier supplier) {
        if (supplier instanceof ApiSupplier apiSupplier) {
            boolean hasOwn = apiSupplier.isHasOwnPaymentSystem() && apiSupplier.isAutoPaymentEnabled();
            log.info("ApiSupplier {} - hasOwnPaymentSystem: {}, autoPaymentEnabled: {}, result: {}", 
                    apiSupplier.getName(), apiSupplier.isHasOwnPaymentSystem(), apiSupplier.isAutoPaymentEnabled(), hasOwn);
            return hasOwn;
        } else if (supplier instanceof SoapSupplier soapSupplier) {
            boolean hasOwn = soapSupplier.isHasOwnPaymentSystem() && soapSupplier.isAutoPaymentEnabled();
            log.info("SoapSupplier {} - hasOwnPaymentSystem: {}, autoPaymentEnabled: {}, result: {}", 
                    soapSupplier.getName(), soapSupplier.isHasOwnPaymentSystem(), soapSupplier.isAutoPaymentEnabled(), hasOwn);
            return hasOwn;
        } else {
            log.debug("Supplier type {} does not support direct payment systems",
                    supplier.getClass().getSimpleName());
            return false;
        }
    }

    public PaymentIntentResponse createPaymentIntent(PaymentIntentRequest request) {
        try {
            log.info("Creating payment intent for order: {}", request.getOrderId());

            PaymentRoutingResult routing = determinePaymentFlow(request.getOrderId());
            if (!routing.isSuccess()) {
                throw new RuntimeException(routing.getMessage());
            }
            if (routing.getPaymentFlow() == null) {
                log.warn("Payment flow is null for order {}, defaulting to platform", request.getOrderId());
                routing = PaymentRoutingResult.builder()
                        .success(true)
                        .paymentFlow(PaymentFlow.PLATFORM_PAYMENT)
                        .orderId(request.getOrderId())
                        .message("Defaulted to platform payment due to null flow")
                        .build();
            }

            return switch (routing.getPaymentFlow()) {
                case DIRECT_TO_SUPPLIER -> createDirectSupplierPaymentIntent(request, routing.getPrimarySupplier());
                case PLATFORM_PAYMENT    -> createPlatformPaymentIntent(request, routing);
            };

        } catch (Exception e) {
            log.error("Error creating payment intent for order {}: {}", request.getOrderId(), e.getMessage(), e);
            throw new RuntimeException("Failed to create payment intent: " + e.getMessage());
        }
    }

    private PaymentIntentResponse createDirectSupplierPaymentIntent(PaymentIntentRequest request, Supplier supplier) {
        if (supplier == null) {
            throw new IllegalStateException("Primary supplier is null for DIRECT_TO_SUPPLIER flow");
        }
        log.info("Direct payment intent for supplier: {} ({})",
                supplier.getName(), supplier.getClass().getSimpleName());
        return directSupplierPaymentService.createSupplierPaymentIntent(request, supplier);
    }

    private PaymentIntentResponse createPlatformPaymentIntent(PaymentIntentRequest request, PaymentRoutingResult routing) {
        log.info("Platform payment intent for order: {}", request.getOrderId());
        return platformPaymentService.createPlatformPaymentIntent(request, routing);
    }

    /**
     * IMPORTANT: avoid streaming the JPA result; materialize then pick first.
     * This prevents "Operation not allowed after ResultSet closed" with MySQL/Hibernate 6.
     */
    @Transactional(readOnly = true)
    private Map<Supplier, List<OrderItem>> groupItemsBySupplier(Long orderId) {
        List<Order> results = em.createQuery("""
                select distinct o
                from Order o
                left join fetch o.items i
                left join fetch i.product p
                left join fetch p.supplier s
                where o.id = :id
                """, Order.class)
                .setParameter("id", orderId)
                .getResultList();

        if (results.isEmpty()) {
            throw new RuntimeException("Order not found: " + orderId);
        }

        Order order = results.get(0);

        return order.getItems().stream()
                .filter(Objects::nonNull)
                .collect(Collectors.groupingBy(item -> item.getProduct().getSupplier()));
    }

    public enum PaymentFlow {
        DIRECT_TO_SUPPLIER,
        PLATFORM_PAYMENT
    }

    @Data
    @Builder
    public static class PaymentRoutingResult {
        private boolean success;
        private String message;
        private PaymentFlow paymentFlow;
        private Long orderId;
        private Double totalAmount;
        private Supplier primarySupplier;
        private Integer supplierCount;
    }
}
