package com.example.stage2025.repository;

import com.example.stage2025.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    /**
     * Find payments by order ID
     */
    List<Payment> findByOrderId(Long orderId);
    
    /**
     * Find payments by supplier ID
     */
    List<Payment> findBySupplierId(Long supplierId);
    
    /**
     * Find payment by session ID
     */
    Optional<Payment> findBySessionId(String sessionId);
    
    /**
     * Find payment by external payment ID
     */
    Optional<Payment> findByExternalPaymentId(String externalPaymentId);

    /**
     * When historical duplicates exist, fetch all rows by external id
     */
    List<Payment> findAllByExternalPaymentId(String externalPaymentId);
    
    /**
     * Find payments by status
     */
    List<Payment> findByPaymentStatus(String status);
    
    /**
     * Find completed payments by order ID
     */
    @Query("SELECT p FROM Payment p WHERE p.order.id = :orderId AND p.paymentStatus = 'COMPLETED'")
    List<Payment> findCompletedPaymentsByOrderId(@Param("orderId") Long orderId);
    
    /**
     * Find payments by order ID and supplier ID
     */
    @Query("SELECT p FROM Payment p WHERE p.order.id = :orderId AND p.supplier.id = :supplierId")
    List<Payment> findByOrderIdAndSupplierId(@Param("orderId") Long orderId, @Param("supplierId") Long supplierId);
    
    /**
     * Check if order has completed payments
     */
    @Query("SELECT COUNT(p) > 0 FROM Payment p WHERE p.order.id = :orderId AND p.paymentStatus = 'COMPLETED'")
    boolean hasCompletedPayments(@Param("orderId") Long orderId);
    
    /**
     * Get total commission amount for a supplier
     */
    @Query("SELECT COALESCE(SUM(p.commissionAmount), 0) FROM Payment p WHERE p.supplier.id = :supplierId AND p.paymentStatus = 'COMPLETED'")
    Double getTotalCommissionForSupplier(@Param("supplierId") Long supplierId);
    
    /**
     * Get total payments amount for a supplier
     */
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.supplier.id = :supplierId AND p.paymentStatus = 'COMPLETED'")
    Double getTotalPaymentsForSupplier(@Param("supplierId") Long supplierId);
}
