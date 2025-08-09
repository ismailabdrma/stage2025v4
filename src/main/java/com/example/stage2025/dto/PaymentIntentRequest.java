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
    private String currency;
    private Long orderId;
    private String paymentMethodId;
}
