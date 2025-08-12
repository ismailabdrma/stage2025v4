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
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SoapMetadataRefreshService {

    private final SoapSupplierOperationMetaRepository operationMetaRepository;
    private final SupplierRepository supplierRepository;

    public boolean refreshSupplierMetadata(SoapSupplier supplier) {
        try {
            log.info("Refreshing metadata for SOAP supplier: {}", supplier.getName());
            
            if (supplier.getWsdlUrl() == null || supplier.getWsdlUrl().isEmpty()) {
                log.warn("No WSDL URL configured for supplier: {}", supplier.getName());
                return false;
            }
            
            // Parse WSDL and get operations metadata
            List<SoapOperationMeta> operations = WsdlFullMetadataUtils.getAllOperationMetadata(supplier.getWsdlUrl());
            
            if (operations == null || operations.isEmpty()) {
                log.warn("No operations found in WSDL for supplier: {}", supplier.getName());
                return false;
            }
            
            // Delete existing operations for this supplier
            if (supplier.getOperations() != null) {
                operationMetaRepository.deleteAll(supplier.getOperations());
            }
            
            // Create new operation metadata entities
            List<SoapSupplierOperationMeta> operationMetas = new ArrayList<>();
            for (SoapOperationMeta opMeta : operations) {
                SoapSupplierOperationMeta supplierOpMeta = new SoapSupplierOperationMeta();
                supplierOpMeta.setOperationName(opMeta.getOperationName());
                supplierOpMeta.setInputElement(opMeta.getInputElement());
                supplierOpMeta.setOutputElement(opMeta.getOutputElement());
                supplierOpMeta.setSoapAction(opMeta.getSoapAction());
                
                if (opMeta.getInputFields() != null) {
                    supplierOpMeta.setInputFieldsJson(JsonUtils.toJson(opMeta.getInputFields()));
                }
                if (opMeta.getOutputFields() != null) {
                    supplierOpMeta.setOutputFieldsJson(JsonUtils.toJson(opMeta.getOutputFields()));
                }
                
                supplierOpMeta.setSupplier(supplier);
                operationMetas.add(supplierOpMeta);
            }
            
            // Save new operations
            operationMetaRepository.saveAll(operationMetas);
            
            // Update supplier with new operations and refresh timestamp
            supplier.setOperations(operationMetas);
            supplier.setLastMetadataRefresh(LocalDateTime.now());
            supplierRepository.save(supplier);
            
            log.info("Successfully refreshed metadata for supplier: {} - Found {} operations", 
                    supplier.getName(), operationMetas.size());
            return true;
        } catch (Exception e) {
            log.error("Failed to refresh metadata for supplier {}: {}", supplier.getName(), e.getMessage(), e);
            return false;
        }
    }
}