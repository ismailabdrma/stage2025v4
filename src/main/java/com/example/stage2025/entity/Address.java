package com.example.stage2025.entity;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private String phone;
    private String label;
    
    @Column(name = "default_address")
    private boolean defaultAddress;

    @ManyToOne
    @ToString.Exclude
    private Client client;
}
