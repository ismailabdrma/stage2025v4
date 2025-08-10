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
        log.info("Starting import for supplier: {} (type: {})", supplier.getName(), supplier.getClass().getSimpleName());
        try {
            // Auto-refresh SOAP metadata if needed
            if (supplier instanceof com.example.stage2025.entity.SoapSupplier) {
                log.debug("Refreshing SOAP metadata for supplier: {}", supplier.getName());
                try {
                    metadataRefreshService.refreshSupplierMetadata((com.example.stage2025.entity.SoapSupplier) supplier);
                } catch (Exception metaEx) {
                    log.warn("Failed to refresh metadata for supplier {}: {}", supplier.getName(), metaEx.getMessage());
                    // Continue with import even if metadata refresh fails
                }
            }
            
            log.debug("Fetching products using fetcherFactory for supplier: {}", supplier.getId());
            List<SupplierProductDto> products = fetcherFactory.fetch(supplier);
            log.info("Fetched {} products from supplier: {}", products.size(), supplier.getName());
            
            if (products.isEmpty()) {
                log.warn("No products returned from supplier: {}", supplier.getName());
                importLogService.saveLog(
                        supplier.getId(), ImportStatus.SUCCESS, 0, 0, "No products found");
                return;
            }
            
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
        for (SupplierProductDto dto : products) {
            try {
                upsertProduct(dto, supplier);
            } catch (Exception e) {
                errorCount++;
                log.error("Error processing product {}: {}", dto.getExternalProductId(), e.getMessage());
            }
        }
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
        Product product = productRepository
                .findByExternalProductIdAndSupplier(dto.getExternalProductId(), supplier)
                .orElseGet(Product::new);

        // IMPORTANT: set keys/relations first
        product.setSupplier(supplier);
        product.setExternalProductId(dto.getExternalProductId()); // ✅ ensures future updates match the same row

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setSupplierPrice(dto.getPrice());
        product.setDynamicPrice(dto.getPrice());
        product.setDisplayedPrice(dto.getPrice());
        product.setSyncedStock(dto.getStock());
        product.setLastFetched(LocalDateTime.now());
        product.setImageUrls(dto.getImageUrls());

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

        // new products require admin approval
        if (product.getId() == null) {
            product.setActive(false);
        }

        Product saved = productRepository.save(product);
        log.debug("Import: Saved product id={} externalId={} name='{}' for supplier {}", saved.getId(), saved.getExternalProductId(), saved.getName(), supplier.getName());
    }
}
