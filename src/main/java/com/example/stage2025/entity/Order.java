package com.example.stage2025.entity;

import com.example.stage2025.enums.DeliveryStatus;
import com.example.stage2025.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "orders", indexes = {
    @Index(name = "idx_order_client_status", columnList = "client_id, status"),
    @Index(name = "idx_order_date", columnList = "orderDate"),
    @Index(name = "idx_order_number", columnList = "orderNumber"),
    @Index(name = "idx_order_status", columnList = "status")
})
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String orderNumber;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus shippingStatus;

    @Column(length = 100)
    private String trackingNumber;
    
    @Column(length = 50)
    private String carrierName;
    
    private LocalDateTime deliveryDate;

    @Column(nullable = false)
    private Double subtotal;
    
    @Column(nullable = false)
    private Double shippingFee;
    
    @Column(nullable = false)
    private Double total;

    @Column(length = 1000)
    private String comments;
    
    // Enterprise fields for multi-supplier handling
    @Column(nullable = false)
    private Integer totalSuppliers = 0;  // Number of suppliers in this order
    
    @Column(nullable = false)
    private Integer completedSuppliers = 0;  // Suppliers who completed their part
    
    @Column(length = 50)
    private String sessionId;  // For tracking user session during order creation
    
    @Column(length = 50)
    private String lockToken;  // For concurrent order modification protection
    
    private LocalDateTime lockExpiry;  // When lock expires
    
    @Version
    private Long version;  // Optimistic locking for concurrent updates

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address deliveryAddress;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items;

    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id")
    private Payment payment;
    
    // Add getter/setter for payment
    public Payment getPayment() {
        return payment;
    }
    
    public void setPayment(Payment payment) {
        this.payment = payment;
    }
    
    // Compatibility methods for EmailService
    public Double getTotalAmount() {
        return this.total;
    }
    
    public void setTotalAmount(Double totalAmount) {
        this.total = totalAmount;
    }
    
    // Add missing getTotal method that PaymentCompletionService expects
    public Double getTotal() {
        return this.total;
    }
    
    public void setTotal(Double total) {
        this.total = total;
    }
    
    public User getUser() {
        return this.client; // Client extends User
    }
    
    public void setUser(User user) {
        if (user instanceof Client) {
            this.client = (Client) user;
        }
    }

    @Column(length = 3, nullable = false)
    private String currency = "EUR"; // Default to EUR

    public String getCurrency() {
        return currency != null ? currency : "EUR"; // Ensure never returns null
    }

    public void setCurrency(String currency) {
        this.currency = currency != null ? currency : "EUR"; // Ensure never set to null
    }
    
    // Add getter for items that PaymentCompletionService expects
    public List<OrderItem> getItems() {
        return items;
    }
    
    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
    
    // Add missing getStatus method that PaymentCompletionService expects
    public OrderStatus getStatus() {
        return this.status;
    }
    
    public void setStatus(OrderStatus status) {
        this.status = status;
    }
    
    // Add missing getUpdatedAt and setUpdatedAt methods
    public LocalDateTime getUpdatedAt() {
        return this.updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
