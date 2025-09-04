package com.example.stage2025.entity;

import com.example.stage2025.enums.DataFormat;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;
@Entity
@DiscriminatorValue("API")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class ApiSupplier extends Supplier {

    // EXISTING FIELDS - keep as they are
    private String apiUrl;
    private String authMethod;
    private String apiKey;
    private DataFormat dataFormat = DataFormat.JSON;
    private String productsEndpoint = "/products";
    private String singleEndpoint;
    private String imageEndpoint;
    private String paymentEndpoint;
    private String refundEndpoint;

    // ADD THESE PAYMENT FIELDS:
    @Column(name = "payment_integration_type")
    private String paymentIntegrationType = "MANUAL"; // "REST_API" or "MANUAL"

    @Column(name = "auto_payment_enabled")
    private boolean autoPaymentEnabled = true;

    @Column(name = "payment_api_url")
    private String paymentApiUrl; // Separate from data import apiUrl

    @Column(name = "payment_api_key")
    private String paymentApiKey; // Separate from data import apiKey

    @Column(name = "api_secret")
    private String apiSecret;

    // ADD THESE METHODS:
    public boolean isHasOwnPaymentSystem() {
        // Only honor admin toggle on the base Supplier - no automatic detection
        return super.isHasOwnPaymentSystem();
    }

    public boolean isAutoPaymentEnabled() {
        return autoPaymentEnabled;
    }
}