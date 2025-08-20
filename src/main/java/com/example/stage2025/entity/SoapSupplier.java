package com.example.stage2025.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Data
@DiscriminatorValue("SOAP")
@NoArgsConstructor
@AllArgsConstructor
@Slf4j
public class SoapSupplier extends Supplier {

    // EXISTING FIELDS
    private String wsdlUrl;
    private String namespace;
    private String username;
    private String password;
    private String paymentOperationName;
    private String refundOperationName;
    private String successOperationName;  // For payment status notifications
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
     * Enhanced check: SOAP supplier has own payment system if:
     * 1. Has stored operations from WSDL metadata
     * 2. Has a payment operation configured (either specific or from main operations)
     * 3. Has auto payment enabled
     */
    public boolean isHasOwnPaymentSystem() {
        // Honor admin toggle on the base Supplier first
        if (super.isHasOwnPaymentSystem()) {
            log.debug("SOAP Supplier {} payment system check: base flag is true (admin override)", getName());
            return true;
        }
        // Check if we have stored operations from WSDL
        boolean hasStoredOperations = operations != null && !operations.isEmpty();
        
        // Check if we have a payment operation configured
        boolean hasPaymentOperation = notBlank(getEffectivePaymentOperationName());
        
        // Check if auto payment is enabled
        boolean autoPaymentEnabled = isAutoPaymentEnabled();
        
        // Check if we have a WSDL URL (either payment-specific or main)
        boolean hasWsdlUrl = notBlank(getEffectivePaymentWsdlUrl());
        
        log.debug("SOAP Supplier {} payment system check: hasStoredOperations={}, hasPaymentOperation={}, autoPaymentEnabled={}, hasWsdlUrl={}", 
                getName(), hasStoredOperations, hasPaymentOperation, autoPaymentEnabled, hasWsdlUrl);
        
        return hasStoredOperations && hasPaymentOperation && autoPaymentEnabled && hasWsdlUrl;
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
        // First try payment-specific configuration
        if (notBlank(paymentOperationNameConfig)) {
            return paymentOperationNameConfig;
        }
        
        // Fallback to main payment operation name
        if (notBlank(paymentOperationName)) {
            return paymentOperationName;
        }
        
        // If no payment operation configured, try to find one in stored operations
        if (operations != null && !operations.isEmpty()) {
            // Look for common payment operation names in stored operations
            String paymentOp = operations.stream()
                .map(op -> op.getOperationName().toLowerCase())
                .filter(opName -> opName.contains("payment") || 
                                 opName.contains("pay") || 
                                 opName.contains("process") ||
                                 opName.contains("order"))
                .findFirst()
                .orElse(null);
            
            if (paymentOp != null) {
                log.info("Auto-detected payment operation '{}' for supplier {}", paymentOp, getName());
                return paymentOp;
            }
        }
        
        return null;
    }

    private static boolean notBlank(String s) {
        return s != null && !s.trim().isEmpty();
    }
}
