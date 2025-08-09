package com.example.stage2025.repository;

import com.example.stage2025.entity.SupplierPaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SupplierPaymentItemRepository extends JpaRepository<SupplierPaymentItem, Long> {
    
    List<SupplierPaymentItem> findBySupplierPaymentId(Long paymentId);
    
    List<SupplierPaymentItem> findByOrderId(Long orderId);
    
    List<SupplierPaymentItem> findByOrderItemId(Long orderItemId);
    
    @Query("SELECT spi FROM SupplierPaymentItem spi WHERE spi.supplierPayment.supplier.id = :supplierId")
    List<SupplierPaymentItem> findBySupplier(@Param("supplierId") Long supplierId);
    
    @Query("SELECT spi FROM SupplierPaymentItem spi WHERE spi.orderDate BETWEEN :start AND :end")
    List<SupplierPaymentItem> findByOrderDateRange(@Param("start") LocalDateTime start, 
                                                   @Param("end") LocalDateTime end);
}
