package com.example.stage2025.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "supplier_payment_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierPaymentItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_payment_id")
    private SupplierPayment supplierPayment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_item_id")
    private OrderItem orderItem;

    // Product details
    private String productName;
    private String productExternalId;
    private Integer quantity;

    // Pricing breakdown
    private BigDecimal customerPaidPrice;     // What customer paid per unit
    private BigDecimal supplierPrice;         // What supplier gets per unit
    private BigDecimal commissionPerUnit;     // Our commission per unit
    
    private BigDecimal totalCustomerAmount;   // customerPaidPrice * quantity
    private BigDecimal totalSupplierAmount;   // supplierPrice * quantity
    private BigDecimal totalCommissionAmount; // commissionPerUnit * quantity

    // Audit
    private LocalDateTime orderDate;
    private LocalDateTime addedToPaymentDate;
}
