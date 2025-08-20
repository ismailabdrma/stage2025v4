package com.example.stage2025.service;

import com.example.stage2025.entity.Order;
import com.example.stage2025.entity.Supplier;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class CommissionService {
    
    // Default commission rates
    private static final BigDecimal DEFAULT_COMMISSION_RATE = new BigDecimal("0.05"); // 5%
    private static final BigDecimal MINIMUM_COMMISSION = new BigDecimal("0.50"); // £0.50
    private static final BigDecimal MAXIMUM_COMMISSION_RATE = new BigDecimal("0.15"); // 15%
    
    /**
     * Calculate commission for a supplier payment
     */
    public CommissionCalculation calculateCommission(Order order, Supplier supplier, BigDecimal paymentAmount) {
        CommissionCalculation calculation = new CommissionCalculation();
        calculation.setOrderId(order.getId());
        calculation.setSupplierId(supplier.getId());
        calculation.setTotalAmount(paymentAmount);
        calculation.setCurrency(order.getCurrency());
        
        // Get commission rate from supplier or use default
        BigDecimal commissionRate = getCommissionRate(supplier);
        calculation.setCommissionRate(commissionRate);
        
        // Calculate commission amount
        BigDecimal commissionAmount = paymentAmount.multiply(commissionRate)
                .setScale(2, RoundingMode.HALF_UP);
        
        // Apply minimum commission
        if (commissionAmount.compareTo(MINIMUM_COMMISSION) < 0) {
            commissionAmount = MINIMUM_COMMISSION;
        }
        
        calculation.setCommissionAmount(commissionAmount);
        
        // Calculate supplier amount (total - commission)
        BigDecimal supplierAmount = paymentAmount.subtract(commissionAmount);
        calculation.setSupplierAmount(supplierAmount);
        
        // Calculate transaction fee (if applicable)
        BigDecimal transactionFee = calculateTransactionFee(paymentAmount, supplier);
        calculation.setTransactionFee(transactionFee);
        
        // Final supplier amount after all deductions
        BigDecimal finalSupplierAmount = supplierAmount.subtract(transactionFee);
        calculation.setFinalSupplierAmount(finalSupplierAmount);
        
        return calculation;
    }
    
    /**
     * Get commission rate for a supplier
     */
    private BigDecimal getCommissionRate(Supplier supplier) {
        // Check if supplier has custom commission rate
        if (supplier.getCommissionApiEndpoint() != null && !supplier.getCommissionApiEndpoint().isEmpty()) {
            // TODO: Call supplier's commission API to get custom rate
            // For now, use default rate
        }
        
        // Use default commission rate
        return DEFAULT_COMMISSION_RATE;
    }
    
    /**
     * Calculate transaction fee
     */
    private BigDecimal calculateTransactionFee(BigDecimal amount, Supplier supplier) {
        // Base transaction fee: 2.9% + £0.30 (similar to Stripe)
        BigDecimal percentageFee = amount.multiply(new BigDecimal("0.029"));
        BigDecimal fixedFee = new BigDecimal("0.30");
        
        BigDecimal totalFee = percentageFee.add(fixedFee);
        
        // Round to 2 decimal places
        return totalFee.setScale(2, RoundingMode.HALF_UP);
    }
    
    /**
     * Commission calculation result
     */
    public static class CommissionCalculation {
        private Long orderId;
        private Long supplierId;
        private BigDecimal totalAmount;
        private String currency;
        private BigDecimal commissionRate;
        private BigDecimal commissionAmount;
        private BigDecimal supplierAmount;
        private BigDecimal transactionFee;
        private BigDecimal finalSupplierAmount;
        
        // Getters and Setters
        public Long getOrderId() { return orderId; }
        public void setOrderId(Long orderId) { this.orderId = orderId; }
        
        public Long getSupplierId() { return supplierId; }
        public void setSupplierId(Long supplierId) { this.supplierId = supplierId; }
        
        public BigDecimal getTotalAmount() { return totalAmount; }
        public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
        
        public String getCurrency() { return currency; }
        public void setCurrency(String currency) { this.currency = currency; }
        
        public BigDecimal getCommissionRate() { return commissionRate; }
        public void setCommissionRate(BigDecimal commissionRate) { this.commissionRate = commissionRate; }
        
        public BigDecimal getCommissionAmount() { return commissionAmount; }
        public void setCommissionAmount(BigDecimal commissionAmount) { this.commissionAmount = commissionAmount; }
        
        public BigDecimal getSupplierAmount() { return supplierAmount; }
        public void setSupplierAmount(BigDecimal supplierAmount) { this.supplierAmount = supplierAmount; }
        
        public BigDecimal getTransactionFee() { return transactionFee; }
        public void setTransactionFee(BigDecimal transactionFee) { this.transactionFee = transactionFee; }
        
        public BigDecimal getFinalSupplierAmount() { return finalSupplierAmount; }
        public void setFinalSupplierAmount(BigDecimal finalSupplierAmount) { this.finalSupplierAmount = finalSupplierAmount; }
        
        @Override
        public String toString() {
            return String.format(
                "CommissionCalculation{orderId=%d, supplierId=%d, totalAmount=%s, commissionAmount=%s, supplierAmount=%s, transactionFee=%s}",
                orderId, supplierId, totalAmount, commissionAmount, supplierAmount, transactionFee
            );
        }
    }
} 