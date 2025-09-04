package com.example.stage2025.entity;

import com.example.stage2025.enums.ProductStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Version
    private Long version;

    @Column(length = 1000)
    private String description;

    /** prix original du fournisseur (non modifiable) */
    private Double supplierPrice;

    /** prix affiché au client (modifiable) */
    private Double displayedPrice;

    /** stock local (cache) */
    private Integer stockQuantity;

    /** identifiant du produit chez le fournisseur */
    @Column(name = "external_product_id")
    private String externalProductId;

    /** date de dernière récupération depuis l’API/fichier */
    private LocalDateTime lastFetched;

    /** stock remonté par l’API/fichier (cache) */
    private Integer syncedStock;

    /** prix remonté par l’API/fichier (cache) */
    private Double dynamicPrice;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url", columnDefinition = "LONGTEXT")
    @OrderColumn(name = "image_order")
    private List<String> imageUrls = new ArrayList<>();

    private String supplierRef;
    
    @Builder.Default
    private Boolean active = true;
    
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ProductStatus status = ProductStatus.PENDING;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Supplier supplier;
     // from supplier (live)
    private Integer reservedStock;

    // One-to-many relationships with cascade delete
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<OrderItem> orderItems = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<CartItem> cartItems = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
