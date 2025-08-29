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
import com.example.stage2025.entity.Order;
import com.example.stage2025.entity.OrderItem;
import com.example.stage2025.entity.Product;
import com.example.stage2025.service.impl.SoapPaymentService;

@RestController
@RequestMapping("/api/soap-diagnostic")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
public class SoapDiagnosticController {

    private final SupplierRepository supplierRepository;
    private final SoapMetadataRefreshService metadataRefreshService;
    private final SoapPaymentService soapPaymentService;

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

    @GetMapping("/test-payment-config/{supplierId}")
    public ResponseEntity<Map<String, Object>> testPaymentConfiguration(@PathVariable Long supplierId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            SoapSupplier soapSupplier = (SoapSupplier) supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
            
            result.put("supplierName", soapSupplier.getName());
            result.put("supplierType", "SOAP"); // SOAP suppliers are always of type "SOAP"
            
            // Check payment system configuration
            result.put("hasOwnPaymentSystem", soapSupplier.isHasOwnPaymentSystem());
            result.put("autoPaymentEnabled", soapSupplier.isAutoPaymentEnabled());
            result.put("paymentIntegrationType", soapSupplier.getPaymentIntegrationType());
            
            // Check WSDL configuration
            result.put("wsdlUrl", soapSupplier.getWsdlUrl());
            result.put("paymentWsdlUrl", soapSupplier.getPaymentWsdlUrl());
            result.put("effectivePaymentWsdlUrl", soapSupplier.getEffectivePaymentWsdlUrl());
            
            // Check operation configuration
            result.put("paymentOperationName", soapSupplier.getPaymentOperationName());
            result.put("paymentOperationNameConfig", soapSupplier.getPaymentOperationNameConfig());
            result.put("effectivePaymentOperationName", soapSupplier.getEffectivePaymentOperationName());
            
            // Check stored operations
            List<com.example.stage2025.entity.SoapSupplierOperationMeta> storedOps = soapSupplier.getOperations();
            result.put("storedOperationsCount", storedOps.size());
            result.put("storedOperations", storedOps.stream().map(op -> {
                Map<String, Object> opInfo = new HashMap<>();
                opInfo.put("name", op.getOperationName());
                opInfo.put("inputElement", op.getInputElement());
                opInfo.put("outputElement", op.getOutputElement());
                opInfo.put("soapAction", op.getSoapAction());
                opInfo.put("isPaymentOperation", op.getOperationName().equals(soapSupplier.getEffectivePaymentOperationName()));
                return opInfo;
            }).toList());
            
            // Test payment system detection
            result.put("paymentSystemTest", Map.of(
                "hasStoredOperations", storedOps != null && !storedOps.isEmpty(),
                "hasPaymentOperation", soapSupplier.getEffectivePaymentOperationName() != null,
                "hasWsdlUrl", soapSupplier.getEffectivePaymentWsdlUrl() != null,
                "autoPaymentEnabled", soapSupplier.isAutoPaymentEnabled()
            ));
            
            result.put("success", true);
            result.put("message", "Payment configuration test completed");
            
        } catch (Exception e) {
            log.error("Payment configuration test failed: {}", e.getMessage());
            result.put("success", false);
            result.put("error", e.getMessage());
        }
        
        return ResponseEntity.ok(result);
    }

    @PostMapping("/test-payment-call/{supplierId}")
    public ResponseEntity<Map<String, Object>> testPaymentCall(@PathVariable Long supplierId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            SoapSupplier soapSupplier = (SoapSupplier) supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
            
            // Check if supplier has payment system
            if (!soapSupplier.isHasOwnPaymentSystem()) {
                result.put("success", false);
                result.put("error", "Supplier does not have own payment system configured");
                result.put("details", Map.of(
                    "hasStoredOperations", soapSupplier.getOperations() != null && !soapSupplier.getOperations().isEmpty(),
                    "hasPaymentOperation", soapSupplier.getEffectivePaymentOperationName() != null,
                    "hasWsdlUrl", soapSupplier.getEffectivePaymentWsdlUrl() != null,
                    "autoPaymentEnabled", soapSupplier.isAutoPaymentEnabled()
                ));
                return ResponseEntity.ok(result);
            }
            
            // Create a test order for testing
            Order testOrder = new Order();
            testOrder.setId(999999L); // Test ID
            testOrder.setTotal(130.0); // Test amount
            testOrder.setCurrency("EUR");
            
            // Create test order item
            OrderItem testItem = new OrderItem();
            testItem.setQuantity(1);
            
            // Create test product
            Product testProduct = new Product();
            testProduct.setSupplierRef("TEST_PRODUCT_001");
            testProduct.setExternalProductId("EXT_001");
            testItem.setProduct(testProduct);
            
            testOrder.setItems(List.of(testItem));
            
            log.info("Testing SOAP payment call for supplier: {} with test order: {}", 
                    soapSupplier.getName(), testOrder.getId());
            
            // Call the SOAP payment service
            Map<String, Object> paymentResult = soapPaymentService.processSoapPaymentWithResponse(supplierId, testOrder);
            
            result.put("success", true);
            result.put("paymentResult", paymentResult);
            result.put("testOrder", Map.of(
                "id", testOrder.getId(),
                "total", testOrder.getTotal(),
                "currency", testOrder.getCurrency(),
                "itemsCount", testOrder.getItems().size()
            ));
            result.put("message", "SOAP payment test completed successfully");
            
        } catch (Exception e) {
            log.error("SOAP payment test failed: {}", e.getMessage(), e);
            result.put("success", false);
            result.put("error", e.getMessage());
            result.put("errorType", e.getClass().getSimpleName());
        }
        
        return ResponseEntity.ok(result);
    }
}

