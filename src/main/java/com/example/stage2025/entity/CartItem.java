package com.example.stage2025.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;

    private double unitPrice;
    
    // Enterprise fields for better tracking
    @Column(length = 255)
    private String productName;  // Store product name for quick access
    
    private LocalDateTime lastUpdated; // Track when item was last modified

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @ToString.Exclude
    @JsonIgnore
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private LocalDateTime addedDate;
}
