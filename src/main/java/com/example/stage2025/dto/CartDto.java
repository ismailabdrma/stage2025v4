package com.example.stage2025.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@lombok.Builder
public class CartDto {
    private Long id;
    private Long clientId;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private LocalDateTime lastUpdated;
    private List<CartItemDto> items;
    private Integer totalItems;
    private Double totalAmount;
}