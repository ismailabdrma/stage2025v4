package com.example.stage2025.service.impl;

import com.example.stage2025.dto.SupplierProductDto;
import com.example.stage2025.entity.*;
import com.example.stage2025.repository.*;
import com.example.stage2025.service.parser.ProductParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductImportService {

    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;
    private final CategoryRepository categoryRepository;
    private final ImportLogRepository importLogRepository;

    @Transactional
    public ImportLog importProductsFromFile(MultipartFile file, Long supplierId, ProductParser parser) throws Exception {
        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        ImportLog importLog = new ImportLog();
        importLog.setSupplier(supplier);
        importLog.setImportDate(LocalDateTime.now());
        importLog.setStatus("PROCESSING");

        try {
            byte[] fileData = file.getBytes();
            List<SupplierProductDto> supplierProducts = parser.parse(fileData);

            int successCount = 0;
            int errorCount = 0;

            for (SupplierProductDto supplierProduct : supplierProducts) {
                try {
                    Product product = new Product();
                    product.setName(supplierProduct.getName());
                    product.setDescription(supplierProduct.getDescription());
                    product.setSupplierPrice(supplierProduct.getPrice());
                    product.setDisplayedPrice(supplierProduct.getPrice() * 1.2); // 20% markup
                    product.setStockQuantity(supplierProduct.getStock());
                    product.setExternalProductId(supplierProduct.getExternalProductId());
                    product.setSupplier(supplier);
                    product.setActive(false); // Admin approval required
                    // setCreated is not available, using @CreationTimestamp instead

                    // Handle category
                    if (supplierProduct.getName() != null) { // getCategoryName() doesn't exist, using getName() instead
                        Category category = categoryRepository.findByName("Default")
                                .orElseGet(() -> {
                                    Category newCategory = new Category();
                                    newCategory.setName("Default");
                                    newCategory.setDescription("Auto-created from import");
                                    return categoryRepository.save(newCategory);
                                });
                        product.setCategory(category);
                    }

                    productRepository.save(product);
                successCount++;
            } catch (Exception e) {
                    log.error("Failed to import product: {}", e.getMessage());
                errorCount++;
                }
            }

            importLog.setImportedCount(successCount);
            importLog.setErrorCount(errorCount);
            importLog.setStatus(errorCount == 0 ? "COMPLETED" : "COMPLETED_WITH_ERRORS");

        } catch (Exception e) {
            importLog.setStatus("FAILED");
            importLog.setErrorMessage(e.getMessage());
            throw e;
        }

        return importLogRepository.save(importLog);
    }

    public int importProductsFromList(List<SupplierProductDto> products, Long supplierId) {
        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        
        int successCount = 0;
        
        for (SupplierProductDto supplierProduct : products) {
            try {
                Product product = new Product();
                product.setName(supplierProduct.getName());
                product.setDescription(supplierProduct.getDescription());
                product.setSupplierPrice(supplierProduct.getPrice());
                product.setDisplayedPrice(supplierProduct.getPrice() * 1.2); // 20% markup
                product.setStockQuantity(supplierProduct.getStock());
                product.setExternalProductId(supplierProduct.getExternalProductId());
                product.setSupplier(supplier);
                product.setActive(false); // Admin approval required
                
                // Handle category
                Category category = categoryRepository.findByName("Default")
                        .orElseGet(() -> {
                            Category newCategory = new Category();
                            newCategory.setName("Default");
                            newCategory.setDescription("Auto-created from import");
                            return categoryRepository.save(newCategory);
                        });
                product.setCategory(category);
                
                productRepository.save(product);
                successCount++;
            } catch (Exception e) {
                log.error("Failed to import product: {}", e.getMessage());
            }
        }
        
        return successCount;
    }
    
    public java.util.Map<String, Object> getImportStatus(Long supplierId) {
        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        
        // Get recent import logs for this supplier
        List<ImportLog> recentLogs = importLogRepository.findTop5BySupplierOrderByImportDateDesc(supplier);
        
        java.util.Map<String, Object> status = new java.util.HashMap<>();
        status.put("supplierId", supplierId);
        status.put("supplierName", supplier.getName());
        status.put("recentImports", recentLogs);
        status.put("totalProducts", productRepository.countBySupplier(supplier));
        
        return status;
    }
    
    public void triggerManualImport(Long supplierId) {
        // Implement manual import trigger logic
        log.info("Manual import triggered for supplier: {}", supplierId);
        // This would typically trigger an async job or call external APIs
    }
}