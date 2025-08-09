// src/main/java/com/example/stage2025/enums/PayoutFrequency.java
package com.example.stage2025.enums;

public enum PayoutFrequency {
    IMMEDIATE,      // Same time as order (real-time)
    DAILY,          // Every day at 6 PM
    WEEKLY,         // Every Monday
    BI_WEEKLY,      // Every 15 days (twice per month)
    MONTHLY,        // 1st of every month
    CUSTOM          // Custom schedule defined per supplier
}
