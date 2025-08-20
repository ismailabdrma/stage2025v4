package com.example.stage2025.service;

import com.example.stage2025.entity.SupplierCommission;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.entity.Order;
import com.example.stage2025.enums.CommissionStatus;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface SupplierCommissionService {
    
    // Create commission record when supplier handles payment
    SupplierCommission createCommission(Supplier supplier, Order order, Double commissionAmount, 
                                      Double displayPrice, Double supplierPrice);
    
    // Update commission status
    SupplierCommission updateCommissionStatus(Long commissionId, CommissionStatus status, String notes);
    
    // Mark commission as paid
    SupplierCommission markCommissionAsPaid(Long commissionId, String paymentReference, String notes);
    
    // Invoice supplier for commission
    SupplierCommission invoiceSupplier(Long commissionId, LocalDateTime dueDate);
    
    // Get commissions by supplier
    List<SupplierCommission> getCommissionsBySupplier(Long supplierId);
    
    // Get commissions by status
    List<SupplierCommission> getCommissionsByStatus(CommissionStatus status);
    
    // Get pending commissions (what suppliers owe us)
    List<SupplierCommission> getPendingCommissions();
    
    // Get overdue commissions
    List<SupplierCommission> getOverdueCommissions();
    
    // Calculate total commission owed by supplier
    Double getTotalCommissionOwedBySupplier(Long supplierId);
    
    // Calculate total commission owed by all suppliers
    Double getTotalCommissionOwed();
    
    // Get commission summary for dashboard
    Map<String, Object> getCommissionDashboard();
    
    // Get commission statistics
    Map<String, Object> getCommissionStatistics(LocalDateTime startDate, LocalDateTime endDate);
    
    // Process overdue commissions
    List<SupplierCommission> processOverdueCommissions();
    
    // Send payment reminders
    void sendPaymentReminders();
    
    // Get commission by ID
    SupplierCommission getCommissionById(Long commissionId);
    
    // Get all commissions
    List<SupplierCommission> getAllCommissions();
} 