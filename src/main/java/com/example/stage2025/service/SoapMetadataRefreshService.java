package com.example.stage2025.service;

import com.example.stage2025.dto.SoapOperationMeta;
import com.example.stage2025.entity.SoapSupplier;
import com.example.stage2025.entity.SoapSupplierOperationMeta;
import com.example.stage2025.repository.SoapSupplierOperationMetaRepository;
import com.example.stage2025.repository.SupplierRepository;
import com.example.stage2025.utils.JsonUtils;
import com.example.stage2025.utils.WsdlFullMetadataUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SoapMetadataRefreshService {

    private final SupplierRepository supplierRepository;
    private final SoapSupplierOperationMetaRepository operationMetaRepository;

    /**
     * Scheduled task to refresh SOAP metadata every hour
     */
    @Scheduled(fixedRate = 3600_000) // 1 hour
    @Transactional
    public void scheduledMetadataRefresh() {
        log.info("Starting scheduled SOAP metadata refresh...");
        
        List<SoapSupplier> soapSuppliers = supplierRepository.findByActiveTrue()
                .stream()
                .filter(s -> s instanceof SoapSupplier)
                .map(s -> (SoapSupplier) s)
                .collect(Collectors.toList());
        
        for (SoapSupplier supplier : soapSuppliers) {
            try {
                if (supplier.getWsdlUrl() == null || supplier.getWsdlUrl().isBlank()) {
                    log.warn("Skipping metadata refresh for supplier {} - no WSDL URL configured", supplier.getName());
                    continue;
                }
                
                refreshSupplierMetadata(supplier);
            } catch (Exception e) {
                log.error("Failed to refresh metadata for supplier {} with WSDL {}: {}", 
                         supplier.getName(), supplier.getWsdlUrl(), e.getMessage());
                // Continue processing other suppliers even if one fails
            }
        }
        
        log.info("Scheduled SOAP metadata refresh completed");
    }

    /**
     * Refresh metadata for a specific SOAP supplier
     */
    @Transactional
    public boolean refreshSupplierMetadata(SoapSupplier supplier) {
        try {
            log.info("🔄 Refreshing SOAP metadata for supplier: '{}' with WSDL: {}", 
                    supplier.getName(), supplier.getWsdlUrl());
            
            // Validate WSDL URL first
            if (supplier.getWsdlUrl() == null || supplier.getWsdlUrl().isBlank()) {
                log.error("❌ WSDL URL is null or empty for supplier: {}", supplier.getName());
                return false;
            }
            
            // Test WSDL connectivity first
            try {
                java.net.URL url = new java.net.URL(supplier.getWsdlUrl());
                java.net.HttpURLConnection connection = (java.net.HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");
                connection.setConnectTimeout(10000);
                connection.setReadTimeout(10000);
                
                int responseCode = connection.getResponseCode();
                if (responseCode != 200) {
                    log.error("❌ WSDL not accessible - HTTP {}: {}", responseCode, supplier.getWsdlUrl());
                    return false;
                }
                log.info("✅ WSDL accessible - HTTP {}: {}", responseCode, supplier.getWsdlUrl());
            } catch (Exception e) {
                log.error("❌ Failed to connect to WSDL {}: {}", supplier.getWsdlUrl(), e.getMessage());
                return false;
            }
            
            // Fetch latest operation metadata from WSDL
            log.debug("📡 Fetching operation metadata from WSDL...");
            List<SoapOperationMeta> latestOps = WsdlFullMetadataUtils.getAllOperationMetadata(supplier.getWsdlUrl());
            
            log.info("📊 Found {} operations in WSDL for supplier: {}", latestOps.size(), supplier.getName());
            
            if (latestOps.isEmpty()) {
                log.warn("⚠️  No operations found in WSDL for supplier: {} - WSDL might be invalid or empty", supplier.getName());
                return false;
            }
            
            // Log found operations for debugging
            log.debug("📋 Operations found:");
            latestOps.forEach(op -> log.debug("  - Operation: '{}', Input: '{}', Output: '{}'", 
                    op.getOperationName(), op.getInputElement(), op.getOutputElement()));
            
            // Check if metadata has changed
            if (hasMetadataChanged(supplier, latestOps)) {
                log.info("Metadata changed for supplier: {}. Updating...", supplier.getName());
                updateSupplierOperations(supplier, latestOps);
                
                // Update last refresh time
                supplier.setLastMetadataRefresh(LocalDateTime.now());
                supplierRepository.save(supplier);
                
                log.info("Successfully updated metadata for supplier: {}", supplier.getName());
                return true;
            } else {
                log.debug("No metadata changes detected for supplier: {}", supplier.getName());
                return false;
            }
            
        } catch (Exception e) {
            log.error("Error refreshing metadata for supplier {}: {}", supplier.getName(), e.getMessage(), e);
            return false;
        }
    }

    /**
     * Check if the metadata has changed compared to what's stored
     */
    private boolean hasMetadataChanged(SoapSupplier supplier, List<SoapOperationMeta> latestOps) {
        List<SoapSupplierOperationMeta> currentOps = supplier.getOperations();
        
        // Simple check: compare operation count and names
        if (currentOps.size() != latestOps.size()) {
            return true;
        }
        
        // Check if operation names match
        List<String> currentOpNames = currentOps.stream()
                .map(SoapSupplierOperationMeta::getOperationName)
                .sorted()
                .collect(Collectors.toList());
        
        List<String> latestOpNames = latestOps.stream()
                .map(SoapOperationMeta::getOperationName)
                .sorted()
                .collect(Collectors.toList());
        
        if (!currentOpNames.equals(latestOpNames)) {
            return true;
        }
        
        // Deep check: compare field schemas for critical operations
        for (SoapOperationMeta latestOp : latestOps) {
            if (isProductOperation(latestOp.getOperationName())) {
                SoapSupplierOperationMeta currentOp = currentOps.stream()
                        .filter(op -> op.getOperationName().equals(latestOp.getOperationName()))
                        .findFirst()
                        .orElse(null);
                
                if (currentOp == null) {
                    return true; // Operation missing
                }
                
                // Compare output fields (where product schema is defined)
                String currentOutputFields = currentOp.getOutputFieldsJson();
                String latestOutputFields = JsonUtils.toJson(latestOp.getOutputFields());
                
                if (!currentOutputFields.equals(latestOutputFields)) {
                    log.info("Output fields changed for operation: {}", latestOp.getOperationName());
                    return true;
                }
            }
        }
        
        return false;
    }

    /**
     * Check if this is a product-related operation
     */
    private boolean isProductOperation(String operationName) {
        return operationName != null && (
                operationName.toLowerCase().contains("product") ||
                operationName.toLowerCase().contains("getall") ||
                operationName.toLowerCase().contains("fetch")
        );
    }

    /**
     * Update supplier operations with new metadata
     */
    @Transactional
    public void updateSupplierOperations(SoapSupplier supplier, List<SoapOperationMeta> newOps) {
        // Delete existing operations
        operationMetaRepository.deleteBySupplier(supplier);
        
        // Create new operations
        List<SoapSupplierOperationMeta> newOperations = newOps.stream()
                .map(metaDto -> {
                    SoapSupplierOperationMeta op = new SoapSupplierOperationMeta();
                    op.setOperationName(metaDto.getOperationName());
                    op.setInputElement(metaDto.getInputElement());
                    op.setOutputElement(metaDto.getOutputElement());
                    op.setSoapAction(metaDto.getSoapAction());
                    op.setInputFieldsJson(JsonUtils.toJson(metaDto.getInputFields()));
                    op.setOutputFieldsJson(JsonUtils.toJson(metaDto.getOutputFields()));
                    op.setSupplier(supplier);
                    return op;
                })
                .collect(Collectors.toList());
        
        // Save new operations
        operationMetaRepository.saveAll(newOperations);
        
        // Update supplier reference
        supplier.setOperations(newOperations);
    }

    /**
     * Manual refresh for a specific supplier by ID
     */
    @Transactional
    public boolean refreshSupplierById(Long supplierId) {
        return supplierRepository.findById(supplierId)
                .filter(s -> s instanceof SoapSupplier)
                .map(s -> refreshSupplierMetadata((SoapSupplier) s))
                .orElse(false);
    }

    /**
     * Refresh all SOAP suppliers manually
     */
    @Transactional
    public int refreshAllSoapSuppliers() {
        List<SoapSupplier> soapSuppliers = supplierRepository.findByActiveTrue()
                .stream()
                .filter(s -> s instanceof SoapSupplier)
                .map(s -> (SoapSupplier) s)
                .collect(Collectors.toList());
        
        int updatedCount = 0;
        for (SoapSupplier supplier : soapSuppliers) {
            try {
                if (refreshSupplierMetadata(supplier)) {
                    updatedCount++;
                }
            } catch (Exception e) {
                log.error("Failed to refresh metadata for supplier {}: {}", supplier.getName(), e.getMessage());
            }
        }
        
        return updatedCount;
    }
}


