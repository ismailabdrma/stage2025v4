package com.example.stage2025.service.impl;

import com.example.stage2025.dto.SupplierPaymentDto;
import com.example.stage2025.dto.SupplierPaymentSummaryDto;
import com.example.stage2025.entity.Order;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.entity.SupplierPayment;
import com.example.stage2025.enums.PaymentStatus;
import com.example.stage2025.enums.PaymentType;
import com.example.stage2025.mapper.SupplierPaymentMapper;
import com.example.stage2025.repository.SupplierPaymentRepository;
import com.example.stage2025.repository.SupplierRepository;
import com.example.stage2025.service.SupplierPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierPaymentServiceImpl implements SupplierPaymentService {

    private final SupplierPaymentRepository paymentRepository;
    private final SupplierRepository supplierRepository;

    @Override
    public List<SupplierPaymentDto> getAllPayments() {
        return paymentRepository.findAll()
                .stream()
                .map(SupplierPaymentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<SupplierPaymentDto> getPaymentsBySupplier(Long supplierId) {
        return paymentRepository.findBySupplierId(supplierId)
                .stream()
                .map(SupplierPaymentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public SupplierPaymentDto getPaymentById(Long id) {
        SupplierPayment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        return SupplierPaymentMapper.toDto(payment);
    }

    @Override
    public SupplierPaymentDto createPayment(SupplierPaymentDto dto) {
        Supplier supplier = supplierRepository.findById(dto.getSupplierId())
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        SupplierPayment payment = SupplierPayment.builder()
                .supplier(supplier)
                .totalAmount(dto.getAmount() != null ? dto.getAmount() : dto.getTotalAmount())
                .status(dto.getStatus() != null ? dto.getStatus() : PaymentStatus.PENDING)
                .scheduledDate(dto.getPaymentDate() != null ? dto.getPaymentDate() : LocalDateTime.now())
                .description(dto.getDescription())
                .build();

        return SupplierPaymentMapper.toDto(paymentRepository.save(payment));
    }

    // --- Additional interface methods (simple/default implementations) ---

    @Override
    public SupplierPaymentDto createPaymentForOrder(Order order) {
        throw new UnsupportedOperationException("Not supported in simple implementation");
    }

    @Override
    public SupplierPaymentDto processImmediatePayment(Long paymentId, Long adminId) {
        throw new UnsupportedOperationException("Not supported in simple implementation");
    }

    @Override
    public List<SupplierPaymentDto> processScheduledPayments() {
        return Collections.emptyList();
    }

    @Override
    public List<SupplierPaymentDto> createWeeklyPayments() {
        return Collections.emptyList();
    }

    @Override
    public List<SupplierPaymentDto> createMonthlyPayments() {
        return Collections.emptyList();
    }

    @Override
    public SupplierPaymentDto processGroupedPayment(Long supplierId, PaymentType type, LocalDateTime periodStart, LocalDateTime periodEnd) {
        throw new UnsupportedOperationException("Not supported in simple implementation");
    }

    @Override
    public SupplierPaymentDto updatePaymentStatus(Long paymentId, PaymentStatus status, String notes, Long adminId) {
        SupplierPayment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        payment.setStatus(status);
        payment.setProcessingNotes(notes);
        payment.setProcessedByAdminId(adminId);
        if (status == PaymentStatus.PAID) {
            payment.setProcessedDate(LocalDateTime.now());
        }
        SupplierPayment saved = paymentRepository.save(payment);
        return SupplierPaymentMapper.toDto(saved);
    }

    @Override
    public SupplierPaymentDto confirmPaymentReceived(Long paymentId, String supplierApiResponse) {
        SupplierPayment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        payment.setSupplierApiResponse(supplierApiResponse);
        payment.setConfirmedDate(LocalDateTime.now());
        payment.setStatus(PaymentStatus.PAID);
        SupplierPayment saved = paymentRepository.save(payment);
        return SupplierPaymentMapper.toDto(saved);
    }

    @Override
    public SupplierPaymentDto cancelPayment(Long paymentId, String reason, Long adminId) {
        SupplierPayment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        payment.setStatus(PaymentStatus.CANCELLED);
        payment.setProcessingNotes(reason);
        payment.setProcessedByAdminId(adminId);
        SupplierPayment saved = paymentRepository.save(payment);
        return SupplierPaymentMapper.toDto(saved);
    }

    @Override
    public void notifySupplierPayment(SupplierPayment payment) {
        // no-op in simple implementation
    }

    @Override
    public void sendPaymentToSupplierApi(SupplierPayment payment) {
        // no-op in simple implementation
    }

    @Override
    public List<SupplierPaymentDto> getPaymentsByStatus(PaymentStatus status) {
        return paymentRepository.findByStatus(status)
                .stream()
                .map(SupplierPaymentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<SupplierPaymentDto> getPaymentsByDateRange(LocalDateTime start, LocalDateTime end) {
        return paymentRepository.findByCreatedDateBetween(start, end)
                .stream()
                .map(SupplierPaymentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<SupplierPaymentDto> getPendingPayments() {
        return paymentRepository.findPendingAndProcessing()
                .stream()
                .map(SupplierPaymentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public SupplierPaymentSummaryDto getPaymentSummary() {
        return null;
    }

    @Override
    public SupplierPaymentSummaryDto getSupplierPaymentSummary(Long supplierId) {
        return null;
    }

    @Override
    public List<SupplierPaymentSummaryDto> getAllSupplierSummaries() {
        return Collections.emptyList();
    }

    @Override
    public List<SupplierPaymentDto> getPaymentHistory(Long paymentId) {
        return Collections.emptyList();
    }

    @Override
    public void auditPaymentAction(Long paymentId, String action, String details, Long adminId) {
        // no-op in simple implementation
    }

    @Override
    public Map<String, Object> getDashboard() {
        Map<String, Object> dashboard = new HashMap<>();
        
        try {
            // Get basic payment statistics
            List<SupplierPayment> allPayments = paymentRepository.findAll();
            List<SupplierPayment> pendingPayments = allPayments.stream()
                .filter(p -> p.getStatus() == PaymentStatus.PENDING)
                .collect(Collectors.toList());
            
            List<SupplierPayment> recentPayments = allPayments.stream()
                .filter(p -> p.getCreatedDate() != null && 
                    p.getCreatedDate().isAfter(LocalDateTime.now().minusDays(7)))
                .limit(10)
                .collect(Collectors.toList());
            
            // Calculate totals
            double totalPendingAmount = pendingPayments.stream()
                .mapToDouble(p -> p.getTotalAmount() != null ? p.getTotalAmount().doubleValue() : 0.0)
                .sum();
            
            double totalCommissionEarned = allPayments.stream()
                .filter(p -> p.getStatus() == PaymentStatus.PAID)
                .mapToDouble(p -> p.getCommissionAmount() != null ? p.getCommissionAmount().doubleValue() : 0.0)
                .sum();
            
            // Convert to DTOs
            List<SupplierPaymentDto> pendingDtos = pendingPayments.stream()
                .map(SupplierPaymentMapper::toDto)
                .collect(Collectors.toList());
            
            List<SupplierPaymentDto> recentDtos = recentPayments.stream()
                .map(SupplierPaymentMapper::toDto)
                .collect(Collectors.toList());
            
            // Build dashboard response
            dashboard.put("pendingPayments", pendingDtos);
            dashboard.put("pendingCount", pendingPayments.size());
            dashboard.put("totalPendingAmount", totalPendingAmount);
            dashboard.put("totalCommissionEarned", totalCommissionEarned);
            dashboard.put("overduePayments", Collections.emptyList()); // TODO: implement overdue logic
            dashboard.put("recentPayments", recentDtos);
            dashboard.put("paymentsByStatus", Map.of(
                "PENDING", pendingPayments.size(),
                "PAID", (int) allPayments.stream().filter(p -> p.getStatus() == PaymentStatus.PAID).count(),
                "FAILED", (int) allPayments.stream().filter(p -> p.getStatus() == PaymentStatus.FAILED).count()
            ));
            dashboard.put("paymentTrends", Collections.emptyList()); // TODO: implement trends
            
        } catch (Exception e) {
            // Return empty dashboard on error
            dashboard.put("pendingPayments", Collections.emptyList());
            dashboard.put("pendingCount", 0);
            dashboard.put("totalPendingAmount", 0.0);
            dashboard.put("totalCommissionEarned", 0.0);
            dashboard.put("overduePayments", Collections.emptyList());
            dashboard.put("recentPayments", Collections.emptyList());
            dashboard.put("paymentsByStatus", Collections.emptyMap());
            dashboard.put("paymentTrends", Collections.emptyList());
        }
        
        return dashboard;
    }
}
