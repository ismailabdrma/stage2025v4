package com.example.stage2025.enums;

public enum PaymentType {
    IMMEDIATE,    // Pay supplier immediately when order is placed
    WEEKLY,       // Pay supplier weekly (every Monday)  
    MONTHLY,      // Pay supplier monthly (1st of month)
    ON_DEMAND     // Pay supplier when they request via API
}
