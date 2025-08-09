package com.example.stage2025.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierPaymentItemDto {
    private Long id;
    private Long orderId;
    private Long orderItemId;
    
    // Product info
    private String productName;
    private String productExternalId;
    private Integer quantity;
    
    // Pricing breakdown
    private BigDecimal customerPaidPrice;
    private BigDecimal supplierPrice;
    private BigDecimal commissionPerUnit;
    
    private BigDecimal totalCustomerAmount;
    private BigDecimal totalSupplierAmount;
    private BigDecimal totalCommissionAmount;
    
    // Dates
    private LocalDateTime orderDate;
    private LocalDateTime addedToPaymentDate;
}
