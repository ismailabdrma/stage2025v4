package com.example.stage2025.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierPaymentSummaryDto {
    private Long supplierId;
    private String supplierName;
    private String supplierEmail;
    
    // Payment totals
    private BigDecimal totalPendingAmount;
    private BigDecimal totalPaidAmount;
    private BigDecimal totalCommissionEarned;
    
    // Counts
    private Integer pendingPaymentsCount;
    private Integer paidPaymentsCount;
    private Integer failedPaymentsCount;
    private Integer totalOrdersCount;
    
    // Date ranges
    private LocalDateTime oldestPendingDate;
    private LocalDateTime lastPaymentDate;
    private LocalDateTime nextScheduledPayment;
    
    // Statistics
    private BigDecimal averagePaymentAmount;
    private BigDecimal averageCommissionRate;
    
    // Recent activity
    private LocalDateTime lastActivityDate;
    private String lastActivityType;
    
    // Flags
    private Boolean hasOverduePayments;
    private Boolean hasFailedPayments;
    private Boolean requiresAttention;
}
