package com.example.stage2025.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class OrderDto {
    private Long id;
    private String orderNumber;
    private LocalDateTime orderDate;
    private LocalDateTime createdDate;
    private String status;
    private String shippingStatus;
    private Double total;
    private Double subtotal;
    private Double shipping;
    private Double tax;
    private String clientEmail;
    private Long clientId;
    private ShippingAddressDto shippingAddress;
    private List<OrderItemDto> items;
    private Double supplierPrice; // Total supplier price for all items
    private String supplierName; // Primary supplier name


}
