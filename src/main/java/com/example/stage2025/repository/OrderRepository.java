package com.example.stage2025.repository;

import com.example.stage2025.entity.Order;
import com.example.stage2025.enums.OrderStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
  List<Order> findByClientId(Long clientId);
  List<Order> findByClientIdOrderByOrderDateDesc(Long clientId);
  Optional<Order> findByOrderNumber(String orderNumber);
  List<Order> findByStatus(OrderStatus status);
  
  // Dashboard statistics methods
  long countByStatus(OrderStatus status);
  List<Order> findTop10ByOrderByOrderDateDesc();
  List<Order> findByOrderDateAfter(LocalDateTime date);
  List<Order> findByOrderDateBetween(LocalDateTime start, LocalDateTime end);
  long countByOrderDateAfter(LocalDateTime date);
  long countByOrderDateBetween(LocalDateTime start, LocalDateTime end);
  
  @Query("SELECT o FROM Order o WHERE o.orderDate >= :date")
  List<Order> findByCreatedAtAfter(LocalDateTime date);
  
  @Query("SELECT o FROM Order o WHERE o.orderDate BETWEEN :start AND :end")
  List<Order> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
  
  @Query("SELECT COUNT(o) FROM Order o WHERE o.orderDate >= :date")
  long countByCreatedAtAfter(LocalDateTime date);
  
  @Query("SELECT COUNT(o) FROM Order o WHERE o.orderDate BETWEEN :start AND :end")
  long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
  @EntityGraph(attributePaths = {"items", "items.product", "items.product.supplier"})
  Optional<Order> findWithItemsAndProductSupplierById(Long id);
  
  // Payment confirmation methods
  Optional<Order> findBySessionId(String sessionId);
  List<Order> findTop5ByStatusOrderByCreatedAtDesc(OrderStatus status);
}