package com.example.stage2025.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.*;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id", nullable = true)
    private Supplier supplier;
    
    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;
    
    @Column(name = "currency", nullable = false, length = 3)
    private String currency;
    
    @Column(name = "payment_method", length = 50)
    private String paymentMethod;
    
    @Column(name = "payment_status", length = 20, nullable = false)
    @Builder.Default
    private String paymentStatus = "PENDING";
    
    @Column(name = "external_payment_id", length = 255)
    private String externalPaymentId;
    
    @Column(name = "session_id", length = 255)
    private String sessionId;
    
    @Column(name = "commission_amount", precision = 10, scale = 2)
    private BigDecimal commissionAmount;
    
    @Column(name = "supplier_amount", precision = 10, scale = 2)
    private BigDecimal supplierAmount;
    
    @Column(name = "transaction_fee", precision = 10, scale = 2)
    private BigDecimal transactionFee;
    
    @Column(name = "payment_date", nullable = false)
    @Builder.Default
    private LocalDateTime paymentDate = LocalDateTime.now();
    
    @Column(name = "created_at", nullable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
    
    public Supplier getSupplier() { return supplier; }
    public void setSupplier(Supplier supplier) { this.supplier = supplier; }
    
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    
    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
    
    public String getExternalPaymentId() { return externalPaymentId; }
    public void setExternalPaymentId(String externalPaymentId) { this.externalPaymentId = externalPaymentId; }
    
    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
    
    public BigDecimal getCommissionAmount() { return commissionAmount; }
    public void setCommissionAmount(BigDecimal commissionAmount) { this.commissionAmount = commissionAmount; }
    
    public BigDecimal getSupplierAmount() { return supplierAmount; }
    public void setSupplierAmount(BigDecimal supplierAmount) { this.supplierAmount = supplierAmount; }
    
    public BigDecimal getTransactionFee() { return transactionFee; }
    public void setTransactionFee(BigDecimal transactionFee) { this.transactionFee = transactionFee; }
    
    public LocalDateTime getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    // Additional methods for compatibility
    public String getStatus() { return getPaymentStatus(); }
    public void setStatus(String status) { setPaymentStatus(status); }
    
    public void setStatus(com.example.stage2025.enums.PaymentStatus status) { 
        setPaymentStatus(status.name()); 
    }
    
    public String getTransactionRef() { return getExternalPaymentId(); }
    public void setTransactionRef(String transactionRef) { setExternalPaymentId(transactionRef); }
    
    // Business methods
    public void markAsCompleted() {
        this.paymentStatus = "COMPLETED";
        this.updatedAt = LocalDateTime.now();
    }
    
    public void markAsFailed() {
        this.paymentStatus = "FAILED";
        this.updatedAt = LocalDateTime.now();
    }
    
    public boolean isCompleted() {
        return "COMPLETED".equals(this.paymentStatus);
    }
    
    public boolean isPending() {
        return "PENDING".equals(this.paymentStatus);
    }
    
    public boolean isFailed() {
        return "FAILED".equals(this.paymentStatus);
    }
}
