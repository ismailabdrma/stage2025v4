package com.example.stage2025.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Data
@DiscriminatorValue("SOAP")
@NoArgsConstructor
@AllArgsConstructor
public class SoapSupplier extends Supplier {

    // EXISTING FIELDS
    private String wsdlUrl;
    private String namespace;
    private String username;
    private String password;
    private String paymentOperationName;
    private String refundOperationName;
    private LocalDateTime lastMetadataRefresh;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<SoapSupplierOperationMeta> operations = new ArrayList<>();

    // PAYMENT FIELDS
    @Column(name = "payment_integration_type")
    private String paymentIntegrationType = "MANUAL"; // "SOAP" or "MANUAL"

    /**
     * Use the wrapper type to avoid "null to primitive" crashes when older DB rows have NULL.
     * Default to TRUE; the getter below is null-safe.
     */
    @Column(name = "auto_payment_enabled")
    private Boolean autoPaymentEnabled = Boolean.TRUE;

    @Column(name = "payment_wsdl_url")
    private String paymentWsdlUrl; // Separate from data import wsdlUrl

    @Column(name = "payment_operation_name_config")
    private String paymentOperationNameConfig; // Separate from data import operation

    @Column(name = "soap_action")
    private String soapAction;

    // LOGIC HELPERS

    /**
     * Supplier is considered to have its own payment system if:
     * - integration type is "SOAP" (case-insensitive) AND
     * - effective WSDL and operation name are present (non-blank)
     */
    public boolean isHasOwnPaymentSystem() {
        return "SOAP".equalsIgnoreCase(Objects.toString(paymentIntegrationType, ""))
                && notBlank(getEffectivePaymentWsdlUrl())
                && notBlank(getEffectivePaymentOperationName());
    }

    /**
     * Null-safe exposure for business checks.
     */
    public boolean isAutoPaymentEnabled() {
        return Boolean.TRUE.equals(autoPaymentEnabled);
    }

    // Effective payment WSDL (payment-specific or fallback to data import)
    public String getEffectivePaymentWsdlUrl() {
        return notBlank(paymentWsdlUrl) ? paymentWsdlUrl : wsdlUrl;
    }

    // Effective payment operation (payment-specific or fallback to data import)
    public String getEffectivePaymentOperationName() {
        return notBlank(paymentOperationNameConfig) ? paymentOperationNameConfig : paymentOperationName;
    }

    private static boolean notBlank(String s) {
        return s != null && !s.trim().isEmpty();
    }
}
