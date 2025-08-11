// src/main/java/com/example/stage2025/service/impl/ProductImportService.java
package com.example.stage2025.service.impl;

import com.example.stage2025.dto.SupplierProductDto;
import com.example.stage2025.entity.Category;
import com.example.stage2025.entity.Product;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.enums.ImportStatus;
import com.example.stage2025.repository.CategoryRepository;
import com.example.stage2025.repository.ProductRepository;
import com.example.stage2025.repository.SupplierRepository;
import com.example.stage2025.service.ImportLogService;
import com.example.stage2025.service.ProductFetcherFactory;
import com.example.stage2025.service.SoapMetadataRefreshService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductImportService {

    private final SupplierRepository supplierRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ImportLogService importLogService;
    private final ProductFetcherFactory fetcherFactory;
    private final SoapMetadataRefreshService metadataRefreshService;

    @Scheduled(fixedRate = 300_000) // every 5 min
    public void scheduledProductImport() {
        supplierRepository.findByActiveTrue().forEach(this::importProductsFromSupplier);
    }

    @Transactional
    public void importProductsFromSupplier(Supplier supplier) {
        log.info("🚀 Starting import for supplier: '{}' (ID: {}, Type: {}, Active: {})", 
                supplier.getName(), supplier.getId(), supplier.getClass().getSimpleName(), supplier.isActive());
        try {
            // Auto-refresh SOAP metadata if needed
            if (supplier instanceof com.example.stage2025.entity.SoapSupplier) {
                log.debug("🔄 Refreshing SOAP metadata for supplier: {}", supplier.getName());
                try {
                    metadataRefreshService.refreshSupplierMetadata((com.example.stage2025.entity.SoapSupplier) supplier);
                    log.debug("✅ SOAP metadata refresh completed for supplier: {}", supplier.getName());
                } catch (Exception metaEx) {
                    log.warn("⚠️  Failed to refresh metadata for supplier {}: {}", supplier.getName(), metaEx.getMessage());
                    // Continue with import even if metadata refresh fails
                }
            }
            
            log.debug("🔍 Fetching products using fetcherFactory for supplier: {} (ID: {})", supplier.getName(), supplier.getId());
            List<SupplierProductDto> products = fetcherFactory.fetch(supplier);
            log.info("📦 Fetched {} products from supplier: '{}' (ID: {})", products.size(), supplier.getName(), supplier.getId());
            
            if (products.isEmpty()) {
                log.warn("⚠️  NO PRODUCTS returned from supplier: '{}' (ID: {})", supplier.getName(), supplier.getId());
                log.warn("🔍 This could indicate:");
                log.warn("   1. Supplier API/file has no products");
                log.warn("   2. Supplier configuration is incorrect");
                log.warn("   3. Network/connectivity issues");
                log.warn("   4. Authentication problems");
                importLogService.saveLog(
                        supplier.getId(), ImportStatus.SUCCESS, 0, 0, "No products found from source");
                return;
            }
            
            // Log sample of fetched products for debugging
            log.debug("📋 Sample of fetched products:");
            products.stream().limit(3).forEach(p -> 
                log.debug("  - External ID: '{}', Name: '{}', Price: {}, Stock: {}", 
                         p.getExternalProductId(), p.getName(), p.getPrice(), p.getStock())
            );
            
            log.debug("Processing {} products for import", products.size());
            ImportStatus status = processImportedProducts(products, supplier);
            log.info("Import completed for supplier: {} with status: {}", supplier.getName(), status);
            
            importLogService.saveLog(
                    supplier.getId(), status, products.size(),
                    status == ImportStatus.SUCCESS ? 0 : -1, null);
        } catch (Exception ex) {
            log.error("Import FAILED for supplier {}: {}", supplier.getName(), ex.getMessage(), ex);
            importLogService.saveLog(
                    supplier.getId(), ImportStatus.FAILED, 0, 0, ex.getMessage());
        }
    }

    @Transactional
    public int importProductsFromList(List<SupplierProductDto> products, Long supplierId) {
        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found: " + supplierId));
        int before = (int) productRepository.count();
        processImportedProducts(products, supplier);
        int after = (int) productRepository.count();
        return Math.max(0, after - before);
    }

    public java.util.Map<String, Object> getImportStatus(Long supplierId) {
        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found: " + supplierId));
        java.util.Map<String, Object> status = new java.util.HashMap<>();
        status.put("lastImport", supplier.getLastImport());
        status.put("products", productRepository.count());
        return status;
    }

    public void triggerManualImport(Long supplierId) {
        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found: " + supplierId));
        importProductsFromSupplier(supplier);
    }

    private ImportStatus processImportedProducts(List<SupplierProductDto> products, Supplier supplier) {
        int errorCount = 0;
        int successCount = 0;
        
        log.info("🔄 Processing {} products for supplier: {}", products.size(), supplier.getName());
        
        for (SupplierProductDto dto : products) {
            try {
                upsertProduct(dto, supplier);
                successCount++;
                if (successCount % 10 == 0) {
                    log.debug("Processed {} products successfully...", successCount);
                }
            } catch (Exception e) {
                errorCount++;
                log.error("❌ Error processing product '{}' (External ID: '{}'): {}", 
                         dto.getName(), dto.getExternalProductId(), e.getMessage());
                // For database constraint errors, log more details
                if (e.getMessage().contains("Data truncation") || e.getMessage().contains("too long")) {
                    log.error("🔍 This looks like a database column size issue. Check image URLs or field lengths.");
                    if (dto.getImageUrls() != null) {
                        log.error("   Product has {} image URLs, first URL length: {}", 
                                dto.getImageUrls().size(), 
                                dto.getImageUrls().isEmpty() ? 0 : dto.getImageUrls().get(0).length());
                    }
                }
            }
        }
        
        log.info("📊 Import results for supplier '{}': {} successful, {} errors out of {} total", 
                supplier.getName(), successCount, errorCount, products.size());
        
        supplier.setLastImport(LocalDateTime.now());
        supplierRepository.save(supplier);
        return errorCount == 0 ? ImportStatus.SUCCESS : ImportStatus.PARTIAL;
    }

    private void upsertProduct(SupplierProductDto dto, Supplier supplier) {
        if (dto.getExternalProductId() == null || dto.getExternalProductId().isBlank()) {
            log.warn("Import: Missing externalProductId for supplier {} product '{}'. Generating fallback key.", supplier.getName(), dto.getName());
            // Fallback: generate a stable key based on supplier ID + name hash
            String fallbackId = supplier.getId() + "-" + Math.abs((dto.getName() + ":" + dto.getPrice()).hashCode());
            dto.setExternalProductId(fallbackId);
        }
        
        // CRITICAL: Ensure external ID is unique per supplier to prevent cross-supplier conflicts
        String uniqueExternalId = supplier.getId() + "_" + dto.getExternalProductId();
        
        log.debug("Import: Processing product '{}' with externalId '{}' -> unique ID '{}' for supplier '{}'", 
                 dto.getName(), dto.getExternalProductId(), uniqueExternalId, supplier.getName());
        
        // Prefer lookup by unique external ID only (robust across supplier proxies)
        Product product = productRepository
                .findByExternalProductId(uniqueExternalId)
                .or(() -> productRepository.findByNameIgnoreCaseAndSupplier(dto.getName(), supplier))
                .orElseGet(Product::new);

        // IMPORTANT: set keys/relations first
        product.setSupplier(supplier);
        product.setExternalProductId(uniqueExternalId); // ✅ ensures future updates match the same row AND are supplier-specific

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setSupplierPrice(dto.getPrice());
        product.setDynamicPrice(dto.getPrice());
        product.setDisplayedPrice(dto.getPrice());
        product.setSyncedStock(dto.getStock());
        product.setLastFetched(LocalDateTime.now());
        
        // Handle image URLs with proper validation and error handling
        if (dto.getImageUrls() != null && !dto.getImageUrls().isEmpty()) {
            log.debug("Processing {} image URLs for product '{}'", dto.getImageUrls().size(), dto.getName());
            try {
                product.setImageUrls(dto.getImageUrls());
            } catch (Exception e) {
                log.warn("Failed to set image URLs for product '{}': {}. Setting empty list.", dto.getName(), e.getMessage());
                product.setImageUrls(List.of()); // Set empty list to avoid save failure
            }
        } else {
            product.setImageUrls(List.of());
        }

        // default category
        if (product.getCategory() == null) {
            Category cat = categoryRepository.findByName("Uncategorized")
                    .orElseGet(() -> categoryRepository.save(
                            Category.builder()
                                    .name("Uncategorized")
                                    .description("Default category")
                                    .active(true)
                                    .build()
                    ));
            product.setCategory(cat);
        }

        // Only require approval for brand new products
        if (product.getId() == null) {
            product.setActive(false);
        }

        try {
            Product saved = productRepository.save(product);
            log.debug("✅ Import: Successfully saved product id={} externalId={} name='{}' for supplier {}", 
                     saved.getId(), saved.getExternalProductId(), saved.getName(), supplier.getName());
        } catch (Exception e) {
            log.error("❌ Import: Failed to save product '{}' for supplier '{}': {}", 
                     product.getName(), supplier.getName(), e.getMessage());
            throw e; // Re-throw to trigger proper error handling in processImportedProducts
        }
    }
}
