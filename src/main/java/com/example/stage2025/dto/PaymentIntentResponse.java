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
    private String paymentFlow;        // "DIRECT_TO_SUPPLIER" or "PLATFORM_PAYMENT"
    private String paymentUrl;         // For direct supplier payments
    private String supplierName;       // For direct supplier payments
    private Integer supplierCount;     // For platform payments
    private String description;
    public boolean isDirectPayment() {
        return "DIRECT_TO_SUPPLIER".equals(paymentFlow);
    }

    public boolean isPlatformPayment() {
        return "PLATFORM_PAYMENT".equals(paymentFlow);
    }
}
