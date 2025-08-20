// src/main/java/com/example/stage2025/entity/Supplier.java
package com.example.stage2025.entity;

import com.example.stage2025.enums.PayoutFrequency;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.DiscriminatorValue;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "supplier_type", discriminatorType = DiscriminatorType.STRING)
public abstract class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String contactEmail;
    private boolean active;
    private LocalDateTime created;
    private LocalDateTime lastImport;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL)
    private List<ImportLog> importLogs;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Product> products;

    @Enumerated(EnumType.STRING)
    private PayoutFrequency payoutFrequency = PayoutFrequency.WEEKLY;

    // Payment handling method
    private boolean hasOwnPaymentSystem = false;  // If true, supplier handles payment directly
    private String paymentApiEndpoint;            // Supplier's payment API endpoint
    private String commissionApiEndpoint;         // Where we notify supplier of commission owed
    
    // Custom payment schedule (for CUSTOM frequency)
    private String customPaymentSchedule;         // e.g., "EVERY_15_DAYS", "TWICE_MONTHLY", "SPECIFIC_DATES"
    private String customPaymentDays;             // e.g., "1,15" for 1st and 15th of month
    private Integer customPaymentHour = 18;       // Hour of day to process (default 6 PM)
    private Integer minimumPaymentAmount;         // Minimum amount before payment (e.g., €50)
    private Integer maximumPaymentDelay = 30;     // Maximum days to hold payment (default 30)
    
    // For batch payout tracking
    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL)
    private List<SupplierPayment> payments;
    
    // SOAP operation for payment status notifications
    @Column(name = "success_operation_name")
    private String successOperationName;  // e.g., "notifyPaymentStatus"
    
    /**
     * Get the supplier type from the discriminator column
     * This is needed for proper payment routing
     */
    public String getSupplierType() {
        // Get the discriminator value from the entity class
        DiscriminatorValue discriminatorValue = this.getClass().getAnnotation(DiscriminatorValue.class);
        if (discriminatorValue != null) {
            return discriminatorValue.value();
        }
        // Fallback: check the class name
        String className = this.getClass().getSimpleName();
        if (className.endsWith("Supplier")) {
            return className.substring(0, className.length() - 8).toUpperCase();
        }
        return "UNKNOWN";
    }
}
