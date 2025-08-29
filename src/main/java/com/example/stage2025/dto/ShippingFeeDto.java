package com.example.stage2025.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingFeeDto {
    private Long id;
    private String country;
    private String cityCode;
    private String cityName;
    private Double fee;
    private Boolean active;
}


