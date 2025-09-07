package com.example.stage2025.service;

import com.example.stage2025.dto.SupplierPaymentDto;
import com.example.stage2025.dto.SupplierPaymentSummaryDto;
import com.example.stage2025.entity.Order;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.entity.SupplierPayment;
import com.example.stage2025.enums.PaymentStatus;
import com.example.stage2025.enums.PaymentType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface SupplierPaymentService {
    
    // Core payment operations
    SupplierPaymentDto createPaymentForOrder(Order order);
    SupplierPaymentDto processImmediatePayment(Long paymentId, Long adminId);
    SupplierPaymentDto processImmediatePayment(Long paymentId, Long adminId, Object request);
    List<SupplierPaymentDto> processScheduledPayments();
    
    // Batch payments (weekly/monthly)
    List<SupplierPaymentDto> createWeeklyPayments();
    List<SupplierPaymentDto> createMonthlyPayments();
    SupplierPaymentDto processGroupedPayment(Long supplierId, PaymentType type, LocalDateTime periodStart, LocalDateTime periodEnd);
    
    // Payment status management
    SupplierPaymentDto updatePaymentStatus(Long paymentId, PaymentStatus status, String notes, Long adminId);
    SupplierPaymentDto confirmPayment(Long paymentId, String notes, Long adminId);
    SupplierPaymentDto confirmPaymentReceived(Long paymentId, String supplierApiResponse);
    SupplierPaymentDto cancelPayment(Long paymentId, String reason, Long adminId);
    
    // API Integration
    void notifySupplierPayment(SupplierPayment payment);
    void sendPaymentToSupplierApi(SupplierPayment payment);
    
    // Queries and reporting
    List<SupplierPaymentDto> getPaymentsBySupplier(Long supplierId);
    List<SupplierPaymentDto> getPaymentsByStatus(PaymentStatus status);
    List<SupplierPaymentDto> getPaymentsByDateRange(LocalDateTime start, LocalDateTime end);
    List<SupplierPaymentDto> getPendingPayments();
    
    // Dashboard summaries
    SupplierPaymentSummaryDto getPaymentSummary();
    SupplierPaymentSummaryDto getSupplierPaymentSummary(Long supplierId);
    List<SupplierPaymentSummaryDto> getAllSupplierSummaries();
    
    // Audit and admin functions
    List<SupplierPaymentDto> getPaymentHistory(Long paymentId);
    void auditPaymentAction(Long paymentId, String action, String details, Long adminId);
    
    // Controller compatibility methods
    List<SupplierPaymentDto> getAllPayments();

    SupplierPaymentDto getPaymentById(Long paymentId);
    SupplierPaymentDto createPayment(SupplierPaymentDto dto);
    
    // Dashboard data
    Map<String, Object> getDashboard();
}