package com.example.stage2025.mapper;

import com.example.stage2025.dto.OrderDto;
import com.example.stage2025.entity.Order;

import java.util.stream.Collectors;

public class OrderMapper {
    public static OrderDto toDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setOrderDate(order.getOrderDate());
        dto.setCreatedDate(order.getCreatedAt());
        dto.setStatus(order.getStatus().name());
        dto.setShippingStatus(order.getShippingStatus().name());
        dto.setTotal(order.getTotal());
        dto.setSubtotal(order.getSubtotal());
        dto.setShipping(order.getShippingFee());
        dto.setTax(0.0);
        try {
            dto.setClientEmail(order.getClient() != null ? order.getClient().getEmail() : null);
        } catch (Exception ignored) {}
        try {
            dto.setClientId(order.getClient() != null ? order.getClient().getId() : null);
        } catch (Exception ignored) {}
        try {
            if (order.getDeliveryAddress() != null) {
                var a = order.getDeliveryAddress();
                com.example.stage2025.dto.ShippingAddressDto s = new com.example.stage2025.dto.ShippingAddressDto();
                
                // Set client information
                s.setFirstName(order.getClient() != null ? order.getClient().getFirstName() : null);
                s.setLastName(order.getClient() != null ? order.getClient().getLastName() : null);
                s.setPhone(order.getClient() != null ? order.getClient().getPhone() : null);
                
                // Set complete address information
                s.setAddress(a.getStreet());
                s.setCity(a.getCity());
                s.setState(a.getState());  // Set state field
                s.setPostalCode(a.getZipCode());
                s.setCountry(a.getCountry());
                
                // Remove the old logic that was concatenating state to address
                // s.setAddress(a.getStreet() + (a.getState() != null ? ", " + a.getState() : ""));
                
                dto.setShippingAddress(s);
            }
        } catch (Exception ignored) {}
        dto.setItems(order.getItems().stream()
                .map(OrderItemMapper::toDto)
                .collect(Collectors.toList()));
        
        // Calculate total supplier price and get primary supplier name
        if (order.getItems() != null && !order.getItems().isEmpty()) {
            double totalSupplierPrice = order.getItems().stream()
                    .mapToDouble(item -> {
                        if (item.getProduct() != null && item.getProduct().getSupplierPrice() != null) {
                            return item.getProduct().getSupplierPrice() * item.getQuantity();
                        }
                        return 0.0;
                    })
                    .sum();
            dto.setSupplierPrice(totalSupplierPrice);
            
            // Get the primary supplier name (first item's supplier)
            String primarySupplierName = order.getItems().get(0).getSupplierName();
            if (primarySupplierName == null && order.getItems().get(0).getProduct() != null && 
                order.getItems().get(0).getProduct().getSupplier() != null) {
                primarySupplierName = order.getItems().get(0).getProduct().getSupplier().getName();
            }
            dto.setSupplierName(primarySupplierName);
        } else {
            dto.setSupplierPrice(0.0);
            dto.setSupplierName("Unknown Supplier");
        }
        
        return dto;
    }
}

