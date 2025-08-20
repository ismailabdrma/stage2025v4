package com.example.stage2025.enums;

public enum CommissionStatus {
    PENDING,        // Commission created, waiting for payment
    INVOICED,       // Invoice sent to supplier
    OVERDUE,        // Payment past due date
    PAID,           // Commission paid by supplier
    DISPUTED,       // Supplier disputes commission
    CANCELLED       // Commission cancelled
} 