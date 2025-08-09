package com.example.stage2025.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentIntentResponse {
    private String id;
    private Long amount;
    private String currency;
    private String status;
    private String clientSecret;
}
