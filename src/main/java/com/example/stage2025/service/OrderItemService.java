package com.example.stage2025.service;

import com.example.stage2025.entity.OrderItem;
import java.util.List;

public interface OrderItemService {
    
    /**
     * Find order items by order ID and supplier ID
     * @param orderId the order ID
     * @param supplierId the supplier ID
     * @return list of order items for the specified order and supplier
     */
    List<OrderItem> findByOrderIdAndSupplierId(Long orderId, Long supplierId);
} 