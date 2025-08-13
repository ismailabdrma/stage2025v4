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


import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
                    Product product = resolveOrCreateProduct(supplier, supplierProduct);
                    // Map fields
                    product.setName(supplierProduct.getName());
                    product.setDescription(supplierProduct.getDescription());
                    // Supplier price: the original price from supplier feed
                    product.setSupplierPrice(supplierProduct.getPrice());
                    // Displayed price: KEEP existing if already set by admin. If new product, default to supplier price.
                    if (product.getDisplayedPrice() == null) {
                        product.setDisplayedPrice(supplierProduct.getPrice());
                    }
                    product.setSyncedStock(supplierProduct.getStock());
                    product.setActive(Optional.ofNullable(product.getActive()).orElse(false));

                    // Category default
                    Category category = categoryRepository.findByName("Default")
                            .orElseGet(() -> {
                                Category newCategory = new Category();
                                newCategory.setName("Default");
                                newCategory.setDescription("Auto-created from import");
                                return categoryRepository.save(newCategory);
                            });
                    product.setCategory(category);

                    // Image handling
                    if (supplierProduct.getImageUrls() != null && !supplierProduct.getImageUrls().isEmpty()) {
                        String normalized = saveOrNormalizeImage(supplierProduct.getImageUrls().get(0), supplier.getId(), supplierProduct.getExternalProductId());
                        product.setImageUrls(java.util.List.of(normalized));
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
                Product product = resolveOrCreateProduct(supplier, supplierProduct);
                product.setName(supplierProduct.getName());
                product.setDescription(supplierProduct.getDescription());
                product.setSupplierPrice(supplierProduct.getPrice());
                if (product.getDisplayedPrice() == null) {
                    product.setDisplayedPrice(supplierProduct.getPrice());
                }
                product.setSyncedStock(supplierProduct.getStock());
                product.setActive(Optional.ofNullable(product.getActive()).orElse(false));

                Category category = categoryRepository.findByName("Default")
                        .orElseGet(() -> {
                            Category newCategory = new Category();
                            newCategory.setName("Default");
                            newCategory.setDescription("Auto-created from import");
                            return categoryRepository.save(newCategory);
                        });
                product.setCategory(category);

                if (supplierProduct.getImageUrls() != null && !supplierProduct.getImageUrls().isEmpty()) {
                    String normalized = saveOrNormalizeImage(supplierProduct.getImageUrls().get(0), supplier.getId(), supplierProduct.getExternalProductId());
                    product.setImageUrls(java.util.List.of(normalized));
                }

                productRepository.save(product);
                successCount++;
            } catch (Exception e) {
                log.error("Failed to import product: {}", e.getMessage());
            }
        }
        
        return successCount;
    }

    private Product resolveOrCreateProduct(Supplier supplier, SupplierProductDto dto) {
        String externalId = (dto.getExternalProductId() != null && !dto.getExternalProductId().isBlank())
                ? dto.getExternalProductId()
                : (supplier.getName() + ":" + dto.getName()).toLowerCase();
        return productRepository.findByExternalProductIdAndSupplier(externalId, supplier)
                .orElseGet(() -> {
                    Product p = new Product();
                    p.setSupplier(supplier);
                    p.setExternalProductId(externalId);
                    return p;
                });
    }

    private String saveOrNormalizeImage(String value, Long supplierId, String externalId) {
        try {
            if (value.startsWith("http://") || value.startsWith("https://")) {
                String ext = value.contains(".") ? value.substring(value.lastIndexOf('.') + 1) : "jpg";
                Path dir = Paths.get("uploads", "images", String.valueOf(supplierId));
                Files.createDirectories(dir);
                Path out = dir.resolve((externalId != null ? externalId : String.valueOf(System.currentTimeMillis())) + "." + ext);
                try (InputStream in = new URL(value).openStream()) {
                    Files.copy(in, out, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
                }
                return "/uploads/images/" + supplierId + "/" + out.getFileName();
            }
            // Filename or relative → normalize to uploads/images
            value = value.replaceFirst("^/?(images/)?", "");
            return "/uploads/images/" + value;
        } catch (Exception e) {
            log.warn("Failed to save image {}, reason: {}", value, e.getMessage());
            return "/uploads/images/placeholder.jpg";
        }
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