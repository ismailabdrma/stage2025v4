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



            if (itemsBySupplier.size() == 1) {
                Supplier singleSupplier = itemsBySupplier.keySet().iterator().next();
                
                // Excel suppliers always use platform payment
                if (singleSupplier instanceof ExcelSupplier) {
                    return PaymentRoutingResult.builder()
                            .success(true)
                            .paymentFlow(PaymentFlow.PLATFORM_PAYMENT)
                            .orderId(orderId)
                            .totalAmount(orderDto.getTotal())
                            .supplierCount(1)
                            .message("Platform payment for Excel supplier")
                            .build();
                }

                // Check if supplier has own payment system
                if (hasOwnPaymentSystem(singleSupplier)) {
                    return PaymentRoutingResult.builder()
                            .success(true)
                            .paymentFlow(PaymentFlow.DIRECT_TO_SUPPLIER)
                            .primarySupplier(singleSupplier)
                            .orderId(orderId)
                            .totalAmount(orderDto.getTotal())
                            .message("Direct payment to supplier")
                            .build();
                } else {
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
                // Multiple suppliers always use platform payment
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
        // If admin explicitly marked the supplier as owning their payment system, honor it
        if (supplier.isHasOwnPaymentSystem()) {
            return true;
        }

        if (supplier instanceof ApiSupplier apiSupplier) {
            return apiSupplier.isHasOwnPaymentSystem() && apiSupplier.isAutoPaymentEnabled();
        } else if (supplier instanceof SoapSupplier soapSupplier) {
            return soapSupplier.isHasOwnPaymentSystem() && soapSupplier.isAutoPaymentEnabled();
        } else {
            return false;
        }
    }

    public PaymentIntentResponse createPaymentIntent(PaymentIntentRequest request) {
        if (request.getOrderId() == null) {
            throw new IllegalArgumentException("Order ID is required");
        }

        PaymentRoutingResult routing = determinePaymentFlow(request.getOrderId());
        if (!routing.isSuccess()) {
            throw new RuntimeException(routing.getMessage());
        }

        return switch (routing.getPaymentFlow()) {
            case DIRECT_TO_SUPPLIER -> createDirectSupplierPaymentIntent(request, routing.getPrimarySupplier());
            case PLATFORM_PAYMENT    -> createPlatformPaymentIntent(request, routing);
        };
    }

    /**
     * Create payment intent using existing routing result (avoids calling determinePaymentFlow again)
     */
    public PaymentIntentResponse createPaymentIntentWithRouting(PaymentIntentRequest request, PaymentRoutingResult routing) {
        if (!routing.isSuccess()) {
            throw new RuntimeException(routing.getMessage());
        }

        return switch (routing.getPaymentFlow()) {
            case DIRECT_TO_SUPPLIER -> createDirectSupplierPaymentIntent(request, routing.getPrimarySupplier());
            case PLATFORM_PAYMENT    -> createPlatformPaymentIntent(request, routing);
        };
    }

    private PaymentIntentResponse createDirectSupplierPaymentIntent(PaymentIntentRequest request, Supplier supplier) {
        if (supplier == null) {
            throw new IllegalStateException("Primary supplier is null for DIRECT_TO_SUPPLIER flow");
        }
        return directSupplierPaymentService.createSupplierPaymentIntent(request, supplier);
    }

    private PaymentIntentResponse createPlatformPaymentIntent(PaymentIntentRequest request, PaymentRoutingResult routing) {
        return platformPaymentService.createPlatformPaymentIntent(request, routing);
    }

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
