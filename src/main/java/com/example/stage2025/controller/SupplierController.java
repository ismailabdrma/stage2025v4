package com.example.stage2025.controller;

import com.example.stage2025.dto.SupplierDto;
import com.example.stage2025.dto.SupplierProductDto;
import com.example.stage2025.dto.SoapOperationMeta;

import com.example.stage2025.repository.SupplierRepository;
import com.example.stage2025.service.ProductFetcherFactory;
import com.example.stage2025.service.impl.ProductImportService;
import com.example.stage2025.service.SupplierService;
import com.example.stage2025.service.SoapMetadataRefreshService;
import com.example.stage2025.utils.WsdlFullMetadataUtils;
import com.example.stage2025.dto.CreateSupplierDto;
import com.example.stage2025.enums.PayoutFrequency;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/suppliers")
@RequiredArgsConstructor
public class SupplierController {

    private final ProductFetcherFactory fetcherFactory;
    private final SupplierRepository supplierRepository;
    private final SupplierService supplierService;
    private final ProductImportService productImportService;
    private final SoapMetadataRefreshService metadataRefreshService;

    @GetMapping
    public ResponseEntity<List<SupplierDto>> getAll() {
        return ResponseEntity.ok(supplierService.getAllSuppliers());
    }

    // --- Refresh all suppliers (SOAP metadata + trigger imports for all active suppliers) ---
    @PostMapping("/refresh-all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> refreshAllSuppliersAndImport() {
        try {
            int metaUpdated = metadataRefreshService.refreshAllSoapSuppliers();
            // Trigger import for all active suppliers (SOAP & EXCEL/API)
            supplierRepository.findByActiveTrue().forEach(productImportService::importProductsFromSupplier);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Refreshed SOAP metadata for " + metaUpdated + " suppliers and triggered imports for all active suppliers",
                    "metadataUpdated", metaUpdated
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Error during refresh/import: " + e.getMessage()
            ));
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<SupplierDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(supplierService.getSupplierById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SupplierDto> create(@Valid @RequestBody CreateSupplierDto dto) {
        validateSupplierDto(dto);
        SupplierDto supplierDto = convertToSupplierDto(dto);
        return ResponseEntity.ok(supplierService.createSupplier(supplierDto));
    }

    // --- Create SOAP supplier & auto-extract WSDL metadata ---
    @PostMapping("/auto-soap")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SupplierDto> createSoapAuto(@Valid @RequestBody CreateSupplierDto dto) throws Exception {
        if (!"SOAP".equalsIgnoreCase(dto.getType())) {
            throw new IllegalArgumentException("Type must be SOAP");
        }
        List<SoapOperationMeta> ops = WsdlFullMetadataUtils.getAllOperationMetadata(dto.getWsdlUrl());
        // Convert to SupplierDto for processing
        SupplierDto supplierDto = convertToSupplierDto(dto);
        supplierDto.setOperationsMeta(ops);
        return ResponseEntity.ok(supplierService.createSupplier(supplierDto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SupplierDto> update(@PathVariable @Min(1) Long id, @Valid @RequestBody CreateSupplierDto dto) {
        validateSupplierDto(dto);
        SupplierDto supplierDto = convertToSupplierDto(dto);
        return ResponseEntity.ok(supplierService.updateSupplier(id, supplierDto));
    }
    
    // Helper method to convert CreateSupplierDto to SupplierDto
    private SupplierDto convertToSupplierDto(CreateSupplierDto dto) {
        SupplierDto supplierDto = new SupplierDto();
        // Basic fields
        supplierDto.setName(dto.getName());
        supplierDto.setType(dto.getType());
        supplierDto.setContactEmail(dto.getContactEmail());
        supplierDto.setActive(dto.getActive());
        
        // API fields
        supplierDto.setApiUrl(dto.getApiUrl());
        supplierDto.setAuthMethod(dto.getAuthMethod());
        supplierDto.setApiKey(dto.getApiKey());
        supplierDto.setDataFormat(dto.getDataFormat());
        supplierDto.setProductsEndpoint(dto.getProductsEndpoint());
        supplierDto.setSingleEndpoint(dto.getSingleEndpoint());
        
        // SOAP fields
        supplierDto.setWsdlUrl(dto.getWsdlUrl());
        supplierDto.setNamespace(dto.getNamespace());
        supplierDto.setUsername(dto.getUsername());
        supplierDto.setPassword(dto.getPassword());
        
        // File fields
        supplierDto.setFileName(dto.getFileName());
        supplierDto.setFilePath(dto.getFilePath());
        
        // Payment fields
        try {
            if (dto.getPayoutFrequency() != null && !dto.getPayoutFrequency().isEmpty()) {
                supplierDto.setPayoutFrequency(PayoutFrequency.valueOf(dto.getPayoutFrequency().toUpperCase()));
            } else {
                supplierDto.setPayoutFrequency(PayoutFrequency.WEEKLY); // Default
            }
        } catch (IllegalArgumentException e) {
            supplierDto.setPayoutFrequency(PayoutFrequency.WEEKLY); // Fallback to default
        }
        supplierDto.setHasOwnPaymentSystem(dto.getHasOwnPaymentSystem());
        supplierDto.setPaymentApiEndpoint(dto.getPaymentApiEndpoint());
        supplierDto.setCommissionApiEndpoint(dto.getCommissionApiEndpoint());
        supplierDto.setCustomPaymentSchedule(dto.getCustomPaymentSchedule());
        supplierDto.setCustomPaymentDays(dto.getCustomPaymentDays());
        supplierDto.setCustomPaymentHour(dto.getCustomPaymentHour());
        supplierDto.setMinimumPaymentAmount(dto.getMinimumPaymentAmount());
        supplierDto.setMaximumPaymentDelay(dto.getMaximumPaymentDelay());
        
        return supplierDto;
    }
    
    /**
     * Validate supplier-specific required fields based on type
     */
    private void validateSupplierDto(CreateSupplierDto dto) {
        switch (dto.getType().toUpperCase()) {
            case "API":
                if (dto.getApiUrl() == null || dto.getApiUrl().isBlank()) {
                    throw new IllegalArgumentException("API URL is required for API suppliers");
                }
                // Validate API URL format
                if (!dto.getApiUrl().matches("^https?://.*")) {
                    throw new IllegalArgumentException("API URL must be a valid HTTP/HTTPS URL");
                }
                if (dto.getProductsEndpoint() == null || dto.getProductsEndpoint().isBlank()) {
                    dto.setProductsEndpoint("/products"); // Default value
                }
                break;
                
            case "SOAP":
                if (dto.getWsdlUrl() == null || dto.getWsdlUrl().isBlank()) {
                    throw new IllegalArgumentException("WSDL URL is required for SOAP suppliers");
                }
                // Validate WSDL URL format
                if (!dto.getWsdlUrl().matches("^https?://.*")) {
                    throw new IllegalArgumentException("WSDL URL must be a valid HTTP/HTTPS URL");
                }
                break;
                
            case "EXCEL":
            case "CSV":
                if (dto.getFilePath() == null || dto.getFilePath().isBlank()) {
                    throw new IllegalArgumentException("File path is required for file-based suppliers");
                }
                break;
        }
        
        // Validate payment system URLs only if hasOwnPaymentSystem is true
        if (Boolean.TRUE.equals(dto.getHasOwnPaymentSystem())) {
            if (dto.getPaymentApiEndpoint() != null && !dto.getPaymentApiEndpoint().isBlank()) {
                if (!dto.getPaymentApiEndpoint().matches("^https?://.*")) {
                    throw new IllegalArgumentException("Payment API endpoint must be a valid HTTP/HTTPS URL");
                }
            }
            if (dto.getCommissionApiEndpoint() != null && !dto.getCommissionApiEndpoint().isBlank()) {
                if (!dto.getCommissionApiEndpoint().matches("^https?://.*")) {
                    throw new IllegalArgumentException("Commission API endpoint must be a valid HTTP/HTTPS URL");
                }
            }
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        supplierService.deleteSupplier(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> activate(@PathVariable Long id) {
        supplierService.activateSupplier(id);
        return ResponseEntity.ok().body("Supplier activated");
    }

    @PutMapping("/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deactivate(@PathVariable Long id) {
        supplierService.deactivateSupplier(id);
        return ResponseEntity.ok().body("Supplier deactivated");
    }

    // --- Sync/preview products (does not save) ---
    @GetMapping("/{id}/sync-products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SupplierProductDto>> syncProducts(@PathVariable Long id) throws Exception {
        var supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        List<SupplierProductDto> products = fetcherFactory.fetch(supplier);
        return ResponseEntity.ok(products);
    }

    // --- NEW: Import & save products from supplier (SOAP/API/Excel) ---
    @PostMapping("/{id}/import-products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> importProducts(@PathVariable Long id) {
        var supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        productImportService.importProductsFromSupplier(supplier);
        return ResponseEntity.ok("Import started for supplier " + supplier.getName());
    }
    
    // --- DEBUG: Test product fetch without saving ---
    @GetMapping("/{id}/debug-fetch")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> debugFetch(@PathVariable Long id) {
        try {
            var supplier = supplierRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Supplier not found"));
            System.out.println("DEBUG: Testing fetch for supplier: " + supplier.getName() + " (" + supplier.getClass().getSimpleName() + ")");
            
            List<SupplierProductDto> products = fetcherFactory.fetch(supplier);
            System.out.println("DEBUG: Successfully fetched " + products.size() + " products");
            
            Map<String, Object> result = Map.of(
                "supplier", supplier.getName(),
                "type", supplier.getClass().getSimpleName(),
                "productCount", products.size(),
                "products", products.stream().limit(5).toList() // Show first 5 products
            );
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.err.println("DEBUG: Error during fetch: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    // --- SOAP Metadata Refresh Endpoints ---
    
    @PostMapping("/{id}/refresh-metadata")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> refreshSupplierMetadata(@PathVariable Long id) {
        try {
            boolean updated = metadataRefreshService.refreshSupplierById(id);
            if (updated) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Metadata refreshed successfully"
                ));
            } else {
                return ResponseEntity.ok(Map.of(
                    "success", false,
                    "message", "No metadata changes detected or supplier not found"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Error refreshing metadata: " + e.getMessage()
            ));
        }
    }
    
    @PostMapping("/refresh-all-soap-metadata")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> refreshAllSoapMetadata() {
        try {
            int updatedCount = metadataRefreshService.refreshAllSoapSuppliers();
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Refreshed metadata for " + updatedCount + " suppliers",
                "updatedCount", updatedCount
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Error refreshing metadata: " + e.getMessage()
            ));
        }
    }
}
