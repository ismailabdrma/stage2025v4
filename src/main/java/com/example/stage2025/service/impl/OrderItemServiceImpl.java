package com.example.stage2025.service.impl;

import com.example.stage2025.entity.OrderItem;
import com.example.stage2025.repository.OrderItemRepository;
import com.example.stage2025.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemServiceImpl implements OrderItemService {
    
    private final OrderItemRepository orderItemRepository;
    
    @Autowired
    public OrderItemServiceImpl(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }
    
    @Override
    public List<OrderItem> findByOrderIdAndSupplierId(Long orderId, Long supplierId) {
        return orderItemRepository.findByOrderIdAndSupplierId(orderId, supplierId);
    }
} 