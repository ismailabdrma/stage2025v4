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
                s.setFirstName(order.getClient() != null ? order.getClient().getFirstName() : null);
                s.setLastName(order.getClient() != null ? order.getClient().getLastName() : null);
                s.setPhone(order.getClient() != null ? order.getClient().getPhone() : null);
                s.setAddress(a.getStreet());
                s.setCity(a.getCity());
                s.setPostalCode(a.getZipCode());
                s.setCountry(a.getCountry());
                dto.setShippingAddress(s);
            }
        } catch (Exception ignored) {}
        dto.setItems(order.getItems().stream()
                .map(OrderItemMapper::toDto)
                .collect(Collectors.toList()));
        return dto;
    }
}

