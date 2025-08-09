package com.example.stage2025.dto;

import com.example.stage2025.enums.PaymentStatus;
import com.example.stage2025.enums.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@lombok.Builder
public class SupplierPaymentDto {
    private Long id;
    private Long supplierId;
    private String supplierName;
    private String supplierEmail;
    
    // Payment amounts
    private BigDecimal totalAmount;
    private BigDecimal ourPrice;
    private BigDecimal supplierPrice;
    private BigDecimal commissionAmount;
    private BigDecimal commissionPercentage;
    
    // Status and type
    private PaymentStatus status;
    private PaymentType paymentType;
    
    // Legacy fields for compatibility
    private BigDecimal amount;  // Alias for totalAmount
    private LocalDateTime paymentDate;  // Alias for scheduledDate
    
    // Dates
    private LocalDateTime createdDate;
    private LocalDateTime scheduledDate;
    private LocalDateTime processedDate;
    private LocalDateTime confirmedDate;
    
    // References
    private String paymentReference;
    private String batchId;
    private String externalTransactionId;
    
    // Period (for grouped payments)
    private LocalDateTime periodStart;
    private LocalDateTime periodEnd;
    
    // Audit info
    private String description;
    private String processingNotes;
    private String supplierNotes;
    private Long processedByAdminId;
    private String processedByAdminName;
    
    // API integration
    private String supplierApiEndpoint;
    private String supplierApiResponse;
    private Boolean notificationSent;
    
    // Payment breakdown
    private List<SupplierPaymentItemDto> paymentItems;
    private Integer totalOrders;
    private Integer totalItems;
}