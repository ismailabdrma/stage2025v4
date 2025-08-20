package com.example.stage2025.repository;

import com.example.stage2025.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    
    @Query("SELECT oi FROM OrderItem oi JOIN oi.product p WHERE oi.order.id = :orderId AND p.supplier.id = :supplierId")
    List<OrderItem> findByOrderIdAndSupplierId(@Param("orderId") Long orderId, @Param("supplierId") Long supplierId);
}
