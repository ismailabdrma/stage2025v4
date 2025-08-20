package com.example.stage2025.service.impl;

import com.example.stage2025.dto.PaymentDto;
import com.example.stage2025.entity.Order;
import com.example.stage2025.entity.Payment;
import com.example.stage2025.enums.OrderStatus;
import com.example.stage2025.enums.PaymentStatus;
import com.example.stage2025.exception.ResourceNotFoundException;
import com.example.stage2025.mapper.PaymentMapper;
import com.example.stage2025.repository.OrderRepository;
import com.example.stage2025.repository.PaymentRepository;
import com.example.stage2025.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    @Override
    @Transactional
    public PaymentDto createPayment(PaymentDto dto) {
        Payment payment = Payment.builder()
                .amount(java.math.BigDecimal.valueOf(dto.getAmount()))
                .currency("EUR")
                .paymentMethod(dto.getPaymentMethod())
                .externalPaymentId(dto.getTransactionRef())
                .paymentDate(dto.getPaymentDate() != null ? dto.getPaymentDate() : LocalDateTime.now())
                .paymentStatus(PaymentStatus.PENDING.name())
                .build();

        // Attach order if provided
        Order order = null;
        if (dto.getOrderId() != null) {
            order = orderRepository.findById(dto.getOrderId())
                    .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + dto.getOrderId()));
            payment.setOrder(order);

            // If supplier is not set and order has a single supplier, attach it for reporting
            try {
                if (payment.getSupplier() == null && order.getItems() != null && !order.getItems().isEmpty()) {
                    var firstSupplier = order.getItems().get(0).getProduct() != null
                            ? order.getItems().get(0).getProduct().getSupplier() : null;
                    boolean singleSupplier = firstSupplier != null && order.getItems().stream().allMatch(it ->
                            it.getProduct() != null && it.getProduct().getSupplier() != null &&
                                    it.getProduct().getSupplier().getId().equals(firstSupplier.getId())
                    );
                    if (singleSupplier) {
                        payment.setSupplier(firstSupplier);
                    }
                }
            } catch (Exception ignored) {}
        }

        Payment savedPayment = paymentRepository.save(payment);

        // If this is a PAID payment, also link the order back to this payment
        if (order != null && "PAID".equalsIgnoreCase(savedPayment.getPaymentStatus())) {
            order.setPayment(savedPayment);
            order.setStatus(OrderStatus.PAID);
            order.setUpdatedAt(LocalDateTime.now());
            orderRepository.save(order);
            
            log.info("Created PAID payment {} and linked to order {} - order.payment_id set to {}", 
                    savedPayment.getId(), order.getId(), savedPayment.getId());
        }

        return PaymentMapper.toDto(savedPayment);
    }

    @Override
    public PaymentDto getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paiement non trouvé : ID = " + id));
        return PaymentMapper.toDto(payment);
    }

    @Override
    public List<PaymentDto> getAllPayments() {
        return paymentRepository.findAll()
                .stream()
                .map(PaymentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public PaymentDto updatePaymentStatus(Long id, String status) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paiement non trouvé : ID = " + id));
        payment.setPaymentStatus(status.toUpperCase());
        return PaymentMapper.toDto(paymentRepository.save(payment));
    }

    @Override
    @Transactional
    public void updatePaymentStatusByTransactionRef(String transactionRef, String status) {
        var payments = paymentRepository.findAllByExternalPaymentId(transactionRef);
        if (payments == null || payments.isEmpty()) {
            throw new ResourceNotFoundException("Payment not found with ref: " + transactionRef);
        }

        // Prefer updating a PAID row if it exists, otherwise the newest row
        Payment payment = payments.stream()
                .filter(p -> status.equalsIgnoreCase("PAID") && "PAID".equalsIgnoreCase(p.getPaymentStatus()))
                .findFirst()
                .orElseGet(() -> payments.stream()
                        .sorted((a, b) -> Long.compare(
                                b.getId() != null ? b.getId() : 0L,
                                a.getId() != null ? a.getId() : 0L
                        ))
                        .findFirst()
                        .orElse(payments.get(0))
                );

        payment.setPaymentStatus(status.toUpperCase());
        payment.setPaymentDate(LocalDateTime.now()); // Update payment date
        Payment savedPayment = paymentRepository.save(payment);

        // Optionally, update the order to have payment and mark as paid
        if (savedPayment.getOrder() != null && status.equalsIgnoreCase("PAID")) {
            Order order = savedPayment.getOrder();
            order.setPayment(savedPayment); // Link the payment to the order
            order.setStatus(OrderStatus.PAID);
            order.setUpdatedAt(LocalDateTime.now());
            orderRepository.save(order);
            
            // Log the successful linking
            log.info("Successfully linked payment {} to order {} - order.payment_id now set to {}", 
                    savedPayment.getId(), order.getId(), savedPayment.getId());
        }
    }
}
