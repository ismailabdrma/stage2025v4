package com.example.stage2025.entity;

import com.example.stage2025.enums.CommissionStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "supplier_commissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierCommission {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;
    
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    
    @Column(name = "commission_amount", nullable = false)
    private Double commissionAmount;
    
    @Column(name = "amount", nullable = false)
    private Double amount;
    
    @Column(name = "display_price", nullable = false)
    private Double displayPrice;
    
    @Column(name = "supplier_price", nullable = false)
    private Double supplierPrice;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private CommissionStatus status = CommissionStatus.PENDING;
    
    @Column(name = "due_date")
    private LocalDateTime dueDate;
    
    @Column(name = "paid_date")
    private LocalDateTime paidDate;
    
    @Column(name = "payment_reference")
    private String paymentReference;
    
    @Column(name = "notes")
    private String notes;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
} 