package com.example.stage2025.entity;

import com.example.stage2025.enums.PaymentStatus;
import com.example.stage2025.enums.PaymentType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "supplier_payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Supplier supplier;

    // Payment amounts
    private BigDecimal totalAmount;           // Total amount we owe supplier
    private BigDecimal ourPrice;              // Our selling price (what customer paid)
    private BigDecimal supplierPrice;         // Supplier's price (what we owe them)
    private BigDecimal commissionAmount;      // Our commission (ourPrice - supplierPrice)
    private BigDecimal commissionPercentage;  // Commission rate (e.g., 15%)

    @Enumerated(EnumType.STRING)
    private PaymentStatus status; // PENDING, PROCESSING, PAID, FAILED, CANCELLED

    @Enumerated(EnumType.STRING)
    private PaymentType paymentType; // IMMEDIATE, WEEKLY, MONTHLY, ON_DEMAND
    
    // Payment flow type
    private boolean supplierHandlesPayment = false;  // If true, supplier gets payment directly from customer
    private boolean isCommissionPayment = false;     // If true, this is commission owed TO us by supplier

    // Dates
    private LocalDateTime createdDate;
    private LocalDateTime scheduledDate;      // When payment should be made
    private LocalDateTime processedDate;      // When payment was actually made
    private LocalDateTime confirmedDate;      // When supplier confirmed receipt

    // References
    private String paymentReference;          // Unique payment reference
    private String batchId;                   // For grouped payments (weekly/monthly)
    private String externalTransactionId;     // Bank/API transaction ID
    
    // Period covered (for weekly/monthly payments)
    private LocalDateTime periodStart;
    private LocalDateTime periodEnd;
    
    // Audit and notes
    private String description;
    private String processingNotes;
    private String supplierNotes;            // Notes from supplier API
    private Long processedByAdminId;         // Which admin processed the payment
    
    // API Integration
    private String supplierApiEndpoint;      // Supplier's payment notification API
    private String supplierApiResponse;      // Response from supplier API
    private Boolean notificationSent;        // Email notification sent to supplier
    
    // Related orders (for audit trail)
    @OneToMany(mappedBy = "supplierPayment", cascade = CascadeType.ALL)
    private List<SupplierPaymentItem> paymentItems;
    
    // Compatibility methods for legacy mappers
    public BigDecimal getAmount() {
        return this.totalAmount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.totalAmount = amount;
    }
    
    public LocalDateTime getPaymentDate() {
        return this.scheduledDate;
    }
    
    public void setPaymentDate(LocalDateTime paymentDate) {
        this.scheduledDate = paymentDate;
    }
}
