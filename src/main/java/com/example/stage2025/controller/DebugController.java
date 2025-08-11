package com.example.stage2025.controller;

import com.example.stage2025.entity.Product;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.repository.ProductRepository;
import com.example.stage2025.repository.SupplierRepository;
import com.example.stage2025.service.StockSyncService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/debug")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
public class DebugController {

    private final SupplierRepository supplierRepository;
    private final ProductRepository productRepository;
    private final StockSyncService stockSyncService;

    @GetMapping("/suppliers")
    public ResponseEntity<Map<String, Object>> getAllSuppliersWithProducts() {
        Map<String, Object> result = new HashMap<>();
        
        List<Supplier> suppliers = supplierRepository.findAll();
        Map<String, Object> supplierData = new HashMap<>();
        
        for (Supplier supplier : suppliers) {
            Map<String, Object> data = new HashMap<>();
            data.put("id", supplier.getId());
            data.put("name", supplier.getName());
            data.put("type", supplier.getClass().getSimpleName());
            data.put("active", supplier.isActive());
            
            List<Product> products = productRepository.findBySupplierId(supplier.getId());
            data.put("totalProducts", products.size());
            data.put("activeProducts", products.stream().mapToInt(p -> Boolean.TRUE.equals(p.getActive()) ? 1 : 0).sum());
            data.put("inactiveProducts", products.stream().mapToInt(p -> Boolean.FALSE.equals(p.getActive()) ? 1 : 0).sum());
            
            // Add product details
            List<Map<String, Object>> productDetails = products.stream().map(p -> {
                Map<String, Object> pData = new HashMap<>();
                pData.put("id", p.getId());
                pData.put("name", p.getName());
                pData.put("externalId", p.getExternalProductId());
                pData.put("active", p.getActive());
                pData.put("syncedStock", p.getSyncedStock());
                pData.put("lastFetched", p.getLastFetched());
                return pData;
            }).toList();
            data.put("products", productDetails);
            
            supplierData.put(supplier.getName(), data);
        }
        
        result.put("suppliers", supplierData);
        result.put("totalSuppliers", suppliers.size());
        
        return ResponseEntity.ok(result);
    }

    @GetMapping("/supplier/{name}")
    public ResponseEntity<Map<String, Object>> getSupplierByName(@PathVariable String name) {
        Map<String, Object> result = new HashMap<>();
        
        // Case-insensitive search
        List<Supplier> suppliers = supplierRepository.findAll().stream()
                .filter(s -> s.getName().toLowerCase().contains(name.toLowerCase()))
                .toList();
        
        if (suppliers.isEmpty()) {
            result.put("error", "No suppliers found with name containing: " + name);
            return ResponseEntity.ok(result);
        }
        
        for (Supplier supplier : suppliers) {
            Map<String, Object> data = new HashMap<>();
            data.put("id", supplier.getId());
            data.put("name", supplier.getName());
            data.put("type", supplier.getClass().getSimpleName());
            data.put("active", supplier.isActive());
            data.put("created", supplier.getCreated());
            data.put("lastImport", supplier.getLastImport());
            
            // Get products using the same method as StockSyncService
            List<Product> products = productRepository.findBySupplierId(supplier.getId());
            data.put("productsFound", products.size());
            
            List<Map<String, Object>> productList = products.stream().map(p -> {
                Map<String, Object> pData = new HashMap<>();
                pData.put("id", p.getId());
                pData.put("name", p.getName());
                pData.put("externalId", p.getExternalProductId());
                pData.put("active", p.getActive());
                pData.put("syncedStock", p.getSyncedStock());
                pData.put("supplierPrice", p.getSupplierPrice());
                pData.put("lastFetched", p.getLastFetched());
                return pData;
            }).toList();
            data.put("products", productList);
            
            result.put(supplier.getName(), data);
        }
        
        return ResponseEntity.ok(result);
    }

    @PostMapping("/test-stock-sync/{supplierId}")
    public ResponseEntity<Map<String, Object>> testStockSync(@PathVariable Long supplierId) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            Supplier supplier = supplierRepository.findById(supplierId)
                    .orElseThrow(() -> new RuntimeException("Supplier not found"));
            
            result.put("supplierName", supplier.getName());
            result.put("supplierId", supplier.getId());
            result.put("supplierActive", supplier.isActive());
            
            // Test the exact same query as StockSyncService
            List<Product> products = productRepository.findBySupplierId(supplierId);
            result.put("productsFoundCount", products.size());
            
            if (products.isEmpty()) {
                result.put("issue", "NO_PRODUCTS_FOUND");
                result.put("suggestion", "Check if products exist for this supplier in database");
            } else {
                result.put("status", "PRODUCTS_FOUND");
                
                // Try to run stock sync
                stockSyncService.syncStockForSupplier(supplier);
                result.put("syncResult", "SUCCESS");
            }
            
        } catch (Exception e) {
            result.put("error", e.getMessage());
            result.put("stackTrace", e.getClass().getSimpleName());
            log.error("Stock sync test failed for supplier {}: {}", supplierId, e.getMessage(), e);
        }
        
        return ResponseEntity.ok(result);
    }

    @GetMapping("/external-ids")
    public ResponseEntity<Map<String, Object>> checkExternalIds() {
        Map<String, Object> result = new HashMap<>();
        
        List<Product> allProducts = productRepository.findAll();
        Map<String, Object> stats = new HashMap<>();
        
        int nullExternalIds = 0;
        int validFormat = 0;
        int invalidFormat = 0;
        Map<String, Integer> supplierCounts = new HashMap<>();
        
        for (Product product : allProducts) {
            if (product.getExternalProductId() == null || product.getExternalProductId().isBlank()) {
                nullExternalIds++;
            } else if (product.getExternalProductId().matches("\\d+_.*")) {
                validFormat++;
                String supplierId = product.getExternalProductId().split("_")[0];
                supplierCounts.put(supplierId, supplierCounts.getOrDefault(supplierId, 0) + 1);
            } else {
                invalidFormat++;
            }
        }
        
        stats.put("totalProducts", allProducts.size());
        stats.put("nullExternalIds", nullExternalIds);
        stats.put("validFormat", validFormat);
        stats.put("invalidFormat", invalidFormat);
        stats.put("productsBySupplier", supplierCounts);
        
        result.put("externalIdStats", stats);
        
        return ResponseEntity.ok(result);
    }
}
