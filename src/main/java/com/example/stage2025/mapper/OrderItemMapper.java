package com.example.stage2025.mapper;

import com.example.stage2025.dto.OrderItemDto;
import com.example.stage2025.entity.OrderItem;

public class OrderItemMapper {
    public static OrderItemDto toDto(OrderItem item) {
        OrderItemDto dto = new OrderItemDto();
        dto.setId(item.getId());
        dto.setQuantity(item.getQuantity());
        dto.setUnitPrice(item.getUnitPrice());
        dto.setProductName(item.getProductName() != null ? item.getProductName() : 
                           (item.getProduct() != null ? item.getProduct().getName() : "Unknown Product"));
        
        // Set supplier price from product
        if (item.getProduct() != null && item.getProduct().getSupplierPrice() != null) {
            dto.setSupplierPrice(item.getProduct().getSupplierPrice());
        } else {
            dto.setSupplierPrice(0.0);
        }
        
        // Set supplier name
        dto.setSupplierName(item.getSupplierName() != null ? item.getSupplierName() : 
                           (item.getProduct() != null && item.getProduct().getSupplier() != null ? 
                            item.getProduct().getSupplier().getName() : "Unknown Supplier"));
        
        return dto;
    }
}
