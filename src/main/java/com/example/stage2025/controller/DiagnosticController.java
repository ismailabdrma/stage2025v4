package com.example.stage2025.controller;

import com.example.stage2025.entity.Product;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.repository.ProductRepository;
import com.example.stage2025.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/diagnostic")
@RequiredArgsConstructor
@Slf4j
public class DiagnosticController {
    
    private final SupplierRepository supplierRepository;
    private final ProductRepository productRepository;
    
    /**
     * Diagnostic endpoint to debug supplier-product relationships
     */
    @GetMapping("/supplier-products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getSupplierProductDiagnostic() {
        Map<String, Object> result = new HashMap<>();
        
        // Get all suppliers
        List<Supplier> suppliers = supplierRepository.findAll();
        result.put("totalSuppliers", suppliers.size());
        
        Map<String, Object> suppliersData = new HashMap<>();
        
        for (Supplier supplier : suppliers) {
            Map<String, Object> supplierInfo = new HashMap<>();
            supplierInfo.put("id", supplier.getId());
            supplierInfo.put("name", supplier.getName());
            supplierInfo.put("type", supplier.getClass().getSimpleName());
            supplierInfo.put("active", supplier.isActive());
            supplierInfo.put("lastImport", supplier.getLastImport());
            
            // Get products for this supplier
            List<Product> products = productRepository.findBySupplierId(supplier.getId());
            supplierInfo.put("totalProducts", products.size());
            
            long activeProducts = products.stream().filter(p -> Boolean.TRUE.equals(p.getActive())).count();
            long inactiveProducts = products.stream().filter(p -> Boolean.FALSE.equals(p.getActive())).count();
            
            supplierInfo.put("activeProducts", activeProducts);
            supplierInfo.put("inactiveProducts", inactiveProducts);
            
            // Sample product data
            if (!products.isEmpty()) {
                Product firstProduct = products.get(0);
                Map<String, Object> sampleProduct = new HashMap<>();
                sampleProduct.put("id", firstProduct.getId());
                sampleProduct.put("name", firstProduct.getName());
                sampleProduct.put("externalProductId", firstProduct.getExternalProductId());
                sampleProduct.put("active", firstProduct.getActive());
                sampleProduct.put("syncedStock", firstProduct.getSyncedStock());
                sampleProduct.put("lastFetched", firstProduct.getLastFetched());
                supplierInfo.put("sampleProduct", sampleProduct);
            }
            
            suppliersData.put(supplier.getName(), supplierInfo);
        }
        
        result.put("suppliers", suppliersData);
        
        // Special focus on "ismail" and similar names
        List<Supplier> ismailSuppliers = supplierRepository.findAll().stream()
                .filter(s -> s.getName().toLowerCase().contains("ismail"))
                .toList();
        
        Map<String, Object> ismailData = new HashMap<>();
        for (Supplier supplier : ismailSuppliers) {
            List<Product> products = productRepository.findBySupplierId(supplier.getId());
            Map<String, Object> info = new HashMap<>();
            info.put("supplierId", supplier.getId());
            info.put("supplierName", supplier.getName());
            info.put("supplierType", supplier.getClass().getSimpleName());
            info.put("active", supplier.isActive());
            info.put("productCount", products.size());
            info.put("products", products.stream().map(p -> {
                Map<String, Object> pInfo = new HashMap<>();
                pInfo.put("id", p.getId());
                pInfo.put("name", p.getName());
                pInfo.put("externalProductId", p.getExternalProductId());
                pInfo.put("active", p.getActive());
                return pInfo;
            }).toList());
            ismailData.put("supplier_" + supplier.getId(), info);
        }
        result.put("ismailSuppliers", ismailData);
        
        // Additional diagnostic: check for SOAP suppliers
        List<Supplier> soapSuppliers = supplierRepository.findAll().stream()
                .filter(s -> s.getClass().getSimpleName().equals("SoapSupplier"))
                .toList();
        
        Map<String, Object> soapData = new HashMap<>();
        for (Supplier supplier : soapSuppliers) {
            List<Product> products = productRepository.findBySupplierId(supplier.getId());
            Map<String, Object> info = new HashMap<>();
            info.put("supplierId", supplier.getId());
            info.put("supplierName", supplier.getName());
            info.put("active", supplier.isActive());
            info.put("productCount", products.size());
            soapData.put("soap_" + supplier.getId(), info);
        }
        result.put("soapSuppliers", soapData);
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Test stock sync for a specific supplier
     */
    @PostMapping("/test-stock-sync/{supplierId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> testStockSync(@PathVariable Long supplierId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Supplier supplier = supplierRepository.findById(supplierId)
                    .orElseThrow(() -> new RuntimeException("Supplier not found"));
            
            result.put("supplierId", supplierId);
            result.put("supplierName", supplier.getName());
            result.put("supplierType", supplier.getClass().getSimpleName());
            result.put("supplierActive", supplier.isActive());
            
            // Test the exact query used by StockSyncService
            List<Product> products = productRepository.findBySupplierId(supplierId);
            result.put("productsFound", products.size());
            
            if (!products.isEmpty()) {
                result.put("sampleProducts", products.stream().limit(3).map(p -> {
                    Map<String, Object> pInfo = new HashMap<>();
                    pInfo.put("id", p.getId());
                    pInfo.put("name", p.getName());
                    pInfo.put("externalProductId", p.getExternalProductId());
                    pInfo.put("active", p.getActive());
                    pInfo.put("syncedStock", p.getSyncedStock());
                    pInfo.put("lastFetched", p.getLastFetched());
                    return pInfo;
                }).toList());
            }
            
            result.put("success", true);
            
        } catch (Exception e) {
            result.put("success", false);
            result.put("error", e.getMessage());
            log.error("Test stock sync failed for supplier {}: {}", supplierId, e.getMessage());
        }
        
        return ResponseEntity.ok(result);
    }
}
