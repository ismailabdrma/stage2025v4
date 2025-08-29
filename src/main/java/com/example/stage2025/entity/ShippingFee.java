package com.example.stage2025.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "shipping_fees")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShippingFee {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "country_code", nullable = false, length = 3)
    private String countryCode;
    
    @Column(name = "country_name", nullable = false)
    private String countryName;
    
    @Column(name = "region", length = 100)
    private String region;
    
    @Column(name = "city", length = 100)
    private String city;
    
    @Column(name = "postal_code_from", length = 20)
    private String postalCodeFrom;
    
    @Column(name = "postal_code_to", length = 20)
    private String postalCodeTo;
    
    @Column(name = "base_fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal baseFee;
    
    @Column(name = "currency", nullable = false, length = 3)
    private String currency;
    
    @Column(name = "min_order_amount", precision = 10, scale = 2)
    private BigDecimal minOrderAmount;
    
    @Column(name = "free_shipping_threshold", precision = 10, scale = 2)
    private BigDecimal freeShippingThreshold;
    
    @Column(name = "delivery_time_days")
    private Integer deliveryTimeDays;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;
    
    @Column(name = "priority", nullable = false)
    private Integer priority;
    
    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        if (isActive == null) {
            isActive = true;
        }
        if (priority == null) {
            priority = 100;
        }
        if (currency == null) {
            currency = "EUR";
        }
    }
}

