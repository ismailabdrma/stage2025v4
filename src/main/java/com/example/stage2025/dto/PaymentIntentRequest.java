package com.example.stage2025.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentIntentRequest {
    private Long amount;
    @Builder.Default
    private String currency = "EUR"; // Default to EUR
    private Long orderId;
    private String paymentMethodId;
}
