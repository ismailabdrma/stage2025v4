package com.example.stage2025.repository;

import com.example.stage2025.entity.SupplierPayment;
import com.example.stage2025.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SupplierPaymentRepository extends JpaRepository<SupplierPayment, Long> {
    
    List<SupplierPayment> findBySupplierId(Long supplierId);
    
    List<SupplierPayment> findByStatus(PaymentStatus status);
    
    List<SupplierPayment> findByStatusAndScheduledDateBefore(PaymentStatus status, LocalDateTime date);
    
    List<SupplierPayment> findByCreatedDateBetween(LocalDateTime start, LocalDateTime end);
    
    List<SupplierPayment> findBySupplierIdAndStatus(Long supplierId, PaymentStatus status);
    
    @Query("SELECT sp FROM SupplierPayment sp WHERE sp.supplier.id = :supplierId AND sp.createdDate BETWEEN :start AND :end")
    List<SupplierPayment> findBySupplierAndDateRange(@Param("supplierId") Long supplierId, 
                                                     @Param("start") LocalDateTime start, 
                                                     @Param("end") LocalDateTime end);
    
    @Query("SELECT sp FROM SupplierPayment sp WHERE sp.status IN ('PENDING', 'PROCESSING') ORDER BY sp.scheduledDate ASC")
    List<SupplierPayment> findPendingAndProcessing();
    
    @Query("SELECT sp FROM SupplierPayment sp WHERE sp.scheduledDate < :date AND sp.status = 'PENDING'")
    List<SupplierPayment> findOverduePayments(@Param("date") LocalDateTime date);
    
    // Dashboard statistics methods
    List<SupplierPayment> findBySupplierAndStatus(com.example.stage2025.entity.Supplier supplier, PaymentStatus status);
}