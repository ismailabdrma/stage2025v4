// src/main/java/com/example/stage2025/dto/SupplierDto.java
package com.example.stage2025.dto;

import com.example.stage2025.enums.PayoutFrequency;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data @NoArgsConstructor @AllArgsConstructor
public class SupplierDto {
    private Long id;
    private String name;
    private String contactEmail;
    private boolean active;
    private String type;         // API, SOAP, EXCEL, etc.
    private String apiUrl;
    private String apiKey;
    private String authMethod;
    private String dataFormat;           // JSON, XML
    private String productsEndpoint;     // /products
    private String singleEndpoint;       // /product/{id}
    private String fileName;
    private String filePath;
    private String wsdlUrl;
    private String namespace;
    private String username;
    private String password;
    private Map<String, String> operationMappings; // For mapping special SOAP/API ops
    private List<SoapOperationMeta> operationsMeta; // Dynamic SOAP ops
    private LocalDateTime created;
    private LocalDateTime lastImport;
    private PayoutFrequency payoutFrequency;
    
    // Payment system configuration
    private boolean hasOwnPaymentSystem = false;
    private String paymentApiEndpoint;
    private String commissionApiEndpoint;
    private String customPaymentSchedule;
    private String customPaymentDays;
    private Integer customPaymentHour = 18;
    private Integer minimumPaymentAmount = 50;
    private Integer maximumPaymentDelay = 30;
}
