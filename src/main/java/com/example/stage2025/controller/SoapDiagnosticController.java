package com.example.stage2025.controller;

import com.example.stage2025.dto.SoapOperationMeta;
import com.example.stage2025.entity.SoapSupplier;
import com.example.stage2025.repository.SupplierRepository;
import com.example.stage2025.service.SoapMetadataRefreshService;
import com.example.stage2025.utils.WsdlFullMetadataUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/soap-diagnostic")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
public class SoapDiagnosticController {

    private final SupplierRepository supplierRepository;
    private final SoapMetadataRefreshService metadataRefreshService;

    @GetMapping("/test-wsdl-url")
    public ResponseEntity<Map<String, Object>> testWsdlUrl(@RequestParam String wsdlUrl) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            log.info("🧪 Testing WSDL URL: {}", wsdlUrl);
            
            // Test basic connectivity
            URL url = new URL(wsdlUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(10000);
            connection.setReadTimeout(10000);
            
            int responseCode = connection.getResponseCode();
            String contentType = connection.getContentType();
            long contentLength = connection.getContentLength();
            
            result.put("success", responseCode == 200);
            result.put("responseCode", responseCode);
            result.put("contentType", contentType);
            result.put("contentLength", contentLength);
            result.put("wsdlUrl", wsdlUrl);
            
            if (responseCode == 200) {
                result.put("message", "✅ WSDL is accessible");
                
                // Try to parse operations
                try {
                    List<SoapOperationMeta> operations = WsdlFullMetadataUtils.getAllOperationMetadata(wsdlUrl);
                    result.put("operationsFound", operations.size());
                    result.put("operations", operations.stream().map(op -> {
                        Map<String, Object> opInfo = new HashMap<>();
                        opInfo.put("name", op.getOperationName());
                        opInfo.put("inputElement", op.getInputElement());
                        opInfo.put("outputElement", op.getOutputElement());
                        opInfo.put("soapAction", op.getSoapAction());
                        return opInfo;
                    }).toList());
                    
                    if (operations.isEmpty()) {
                        result.put("warning", "⚠️ WSDL is accessible but no operations found");
                    } else {
                        result.put("message", "✅ WSDL is accessible with " + operations.size() + " operations");
                    }
                } catch (Exception parseEx) {
                    result.put("warning", "⚠️ WSDL accessible but parsing failed: " + parseEx.getMessage());
                    result.put("parseError", parseEx.getMessage());
                }
            } else {
                result.put("message", "❌ WSDL not accessible - HTTP " + responseCode);
            }
            
        } catch (Exception e) {
            log.error("❌ WSDL test failed: {}", e.getMessage());
            result.put("success", false);
            result.put("error", e.getMessage());
            result.put("message", "❌ Connection failed: " + e.getMessage());
        }
        
        return ResponseEntity.ok(result);
    }

    @GetMapping("/diagnose-supplier/{supplierId}")
    public ResponseEntity<Map<String, Object>> diagnoseSupplier(@PathVariable Long supplierId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            var supplier = supplierRepository.findById(supplierId)
                    .orElseThrow(() -> new RuntimeException("Supplier not found"));
            
            if (!(supplier instanceof SoapSupplier)) {
                result.put("error", "Supplier is not a SOAP supplier");
                return ResponseEntity.ok(result);
            }
            
            SoapSupplier soapSupplier = (SoapSupplier) supplier;
            
            result.put("supplierId", supplierId);
            result.put("supplierName", soapSupplier.getName());
            result.put("supplierType", soapSupplier.getClass().getSimpleName());
            result.put("active", soapSupplier.isActive());
            result.put("wsdlUrl", soapSupplier.getWsdlUrl());
            result.put("namespace", soapSupplier.getNamespace());
            result.put("lastMetadataRefresh", soapSupplier.getLastMetadataRefresh());
            
            // Test WSDL accessibility
            if (soapSupplier.getWsdlUrl() != null) {
                try {
                    URL url = new URL(soapSupplier.getWsdlUrl());
                    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestMethod("GET");
                    connection.setConnectTimeout(5000);
                    connection.setReadTimeout(5000);
                    
                    int responseCode = connection.getResponseCode();
                    result.put("wsdlAccessible", responseCode == 200);
                    result.put("wsdlResponseCode", responseCode);
                } catch (Exception e) {
                    result.put("wsdlAccessible", false);
                    result.put("wsdlError", e.getMessage());
                }
            }
            
            // Check stored operations
            List<com.example.stage2025.entity.SoapSupplierOperationMeta> storedOps = soapSupplier.getOperations();
            result.put("storedOperationsCount", storedOps.size());
            result.put("storedOperations", storedOps.stream().map(op -> {
                Map<String, Object> opInfo = new HashMap<>();
                opInfo.put("name", op.getOperationName());
                opInfo.put("inputElement", op.getInputElement());
                opInfo.put("outputElement", op.getOutputElement());
                opInfo.put("soapAction", op.getSoapAction());
                return opInfo;
            }).toList());
            
            // Try refreshing metadata
            try {
                boolean refreshed = metadataRefreshService.refreshSupplierMetadata(soapSupplier);
                result.put("metadataRefreshAttempted", true);
                result.put("metadataRefreshSuccessful", refreshed);
            } catch (Exception e) {
                result.put("metadataRefreshAttempted", true);
                result.put("metadataRefreshSuccessful", false);
                result.put("metadataRefreshError", e.getMessage());
            }
            
        } catch (Exception e) {
            log.error("Supplier diagnosis failed: {}", e.getMessage());
            result.put("error", e.getMessage());
        }
        
        return ResponseEntity.ok(result);
    }

    @PostMapping("/test-soap-operation")
    public ResponseEntity<Map<String, Object>> testSoapOperation(@RequestBody Map<String, String> request) {
        Map<String, Object> result = new HashMap<>();
        
        String wsdlUrl = request.get("wsdlUrl");
        String namespace = request.get("namespace");
        String operationName = request.get("operationName");
        
        try {
            log.info("🧪 Testing SOAP operation: {} for WSDL: {}", operationName, wsdlUrl);
            
            // Get operation metadata
            List<SoapOperationMeta> operations = WsdlFullMetadataUtils.getAllOperationMetadata(wsdlUrl);
            
            SoapOperationMeta targetOp = operations.stream()
                    .filter(op -> op.getOperationName().equals(operationName))
                    .findFirst()
                    .orElse(null);
            
            if (targetOp == null) {
                result.put("success", false);
                result.put("error", "Operation '" + operationName + "' not found in WSDL");
                result.put("availableOperations", operations.stream().map(SoapOperationMeta::getOperationName).toList());
                return ResponseEntity.ok(result);
            }
            
            result.put("success", true);
            result.put("operationFound", true);
            result.put("operationName", targetOp.getOperationName());
            result.put("inputElement", targetOp.getInputElement());
            result.put("outputElement", targetOp.getOutputElement());
            result.put("soapAction", targetOp.getSoapAction());
            result.put("inputFields", targetOp.getInputFields());
            result.put("outputFields", targetOp.getOutputFields());
            
        } catch (Exception e) {
            log.error("SOAP operation test failed: {}", e.getMessage());
            result.put("success", false);
            result.put("error", e.getMessage());
        }
        
        return ResponseEntity.ok(result);
    }

    @PostMapping("/force-refresh-supplier/{supplierId}")
    public ResponseEntity<Map<String, Object>> forceRefreshSupplier(@PathVariable Long supplierId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            var supplier = supplierRepository.findById(supplierId)
                    .orElseThrow(() -> new RuntimeException("Supplier not found"));
            
            if (!(supplier instanceof SoapSupplier)) {
                result.put("success", false);
                result.put("error", "Supplier is not a SOAP supplier");
                return ResponseEntity.ok(result);
            }
            
            SoapSupplier soapSupplier = (SoapSupplier) supplier;
            
            log.info("🔄 Force refreshing metadata for supplier: {}", soapSupplier.getName());
            
            boolean refreshed = metadataRefreshService.refreshSupplierMetadata(soapSupplier);
            
            result.put("success", refreshed);
            result.put("supplierId", supplierId);
            result.put("supplierName", soapSupplier.getName());
            result.put("refreshed", refreshed);
            result.put("message", refreshed ? "✅ Metadata refreshed successfully" : "⚠️ No metadata changes detected");
            
        } catch (Exception e) {
            log.error("Force refresh failed: {}", e.getMessage());
            result.put("success", false);
            result.put("error", e.getMessage());
        }
        
        return ResponseEntity.ok(result);
    }
}
