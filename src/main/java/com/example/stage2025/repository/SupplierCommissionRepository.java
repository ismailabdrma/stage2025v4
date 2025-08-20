package com.example.stage2025.repository;

import com.example.stage2025.entity.SupplierCommission;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.enums.CommissionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SupplierCommissionRepository extends JpaRepository<SupplierCommission, Long> {
    
    // Find commissions by supplier
    List<SupplierCommission> findBySupplier(Supplier supplier);
    
    // Find commissions by status
    List<SupplierCommission> findByStatus(CommissionStatus status);
    
    // Find commissions by supplier and status
    List<SupplierCommission> findBySupplierAndStatus(Supplier supplier, CommissionStatus status);
    
    // Find pending commissions (what suppliers owe us)
    List<SupplierCommission> findByStatusIn(List<CommissionStatus> statuses);
    
    // Find overdue commissions
    @Query("SELECT sc FROM SupplierCommission sc WHERE sc.status = 'INVOICED' AND sc.dueDate < :now")
    List<SupplierCommission> findOverdueCommissions(@Param("now") LocalDateTime now);
    
    // Calculate total commission owed by supplier
    @Query("SELECT COALESCE(SUM(sc.commissionAmount), 0) FROM SupplierCommission sc WHERE sc.supplier = :supplier AND sc.status IN ('PENDING', 'INVOICED', 'OVERDUE')")
    Double calculateTotalCommissionOwed(@Param("supplier") Supplier supplier);
    
    // Calculate total commission owed by all suppliers
    @Query("SELECT COALESCE(SUM(sc.commissionAmount), 0) FROM SupplierCommission sc WHERE sc.status IN ('PENDING', 'INVOICED', 'OVERDUE')")
    Double calculateTotalCommissionOwed();
    
    // Find commissions by order
    List<SupplierCommission> findByOrderId(Long orderId);
    
    // Find commissions created in date range
    List<SupplierCommission> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
} 