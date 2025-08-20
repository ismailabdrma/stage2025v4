package com.example.stage2025.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CreateSupplierDto {
    
    @NotBlank(message = "Supplier name is required")
    @Size(min = 2, max = 100, message = "Supplier name must be between 2 and 100 characters")
    private String name;
    
    @NotBlank(message = "Supplier type is required")
    @Pattern(regexp = "API|SOAP|EXCEL|CSV", message = "Supplier type must be API, SOAP, EXCEL, or CSV")
    private String type;
    
    @Email(message = "Invalid email format")
    private String contactEmail;
    
    private Boolean active = true;
    
    // API Supplier Fields
    private String apiUrl; // Validated conditionally in controller
    
    @Pattern(regexp = "BEARER|BASIC|NONE", message = "Auth method must be BEARER, BASIC, or NONE")
    private String authMethod;
    
    @Size(max = 500, message = "API key cannot exceed 500 characters")
    private String apiKey;
    
    @Pattern(regexp = "JSON|XML", message = "Data format must be JSON or XML")
    private String dataFormat;
    
    @Size(max = 100, message = "Products endpoint cannot exceed 100 characters")
    private String productsEndpoint;
    
    @Size(max = 100, message = "Single endpoint cannot exceed 100 characters")
    private String singleEndpoint;
    
    // SOAP Supplier Fields
    private String wsdlUrl; // Validated conditionally in controller
    
    @Size(max = 200, message = "Namespace cannot exceed 200 characters")
    private String namespace;
    
    @Size(max = 50, message = "Username cannot exceed 50 characters")
    private String username;
    
    @Size(max = 100, message = "Password cannot exceed 100 characters")
    private String password;
    
    @Size(max = 100, message = "Operation name cannot exceed 100 characters")
    private String operation;
    
    // Excel/CSV Supplier Fields
    @Size(max = 100, message = "File name cannot exceed 100 characters")
    private String fileName;
    
    @Size(max = 500, message = "File path cannot exceed 500 characters")
    private String filePath;
    
    // Payment Configuration
    @Pattern(regexp = "DAILY|WEEKLY|MONTHLY|CUSTOM", message = "Payout frequency must be DAILY, WEEKLY, MONTHLY, or CUSTOM")
    private String payoutFrequency = "WEEKLY";
    
    private Boolean hasOwnPaymentSystem = false;
    
    // These fields are only required if hasOwnPaymentSystem = true
    private String paymentApiEndpoint;
    
    private String commissionApiEndpoint;
    
    @Size(max = 50, message = "Custom payment schedule cannot exceed 50 characters")
    private String customPaymentSchedule;
    
    @Pattern(regexp = "^[0-9,]*$", message = "Custom payment days must be comma-separated numbers")
    private String customPaymentDays;
    
    @Min(value = 0, message = "Payment hour must be between 0 and 23")
    @Max(value = 23, message = "Payment hour must be between 0 and 23")
    private Integer customPaymentHour = 18;
    
    @Min(value = 1, message = "Minimum payment amount must be at least 1")
    @Max(value = 100000, message = "Minimum payment amount cannot exceed 100,000")
    private Integer minimumPaymentAmount = 50;
    
    @Min(value = 1, message = "Maximum payment delay must be at least 1 day")
    @Max(value = 365, message = "Maximum payment delay cannot exceed 365 days")
    private Integer maximumPaymentDelay = 30;
}