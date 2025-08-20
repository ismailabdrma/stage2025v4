package com.example.stage2025.enums;

public enum ProductStatus {
    PENDING,    // Waiting for admin approval
    APPROVED,   // Approved and active
    REJECTED,   // Rejected by admin
    SUSPENDED,  // Temporarily suspended
    DELETED     // Marked for deletion (soft delete)
}
