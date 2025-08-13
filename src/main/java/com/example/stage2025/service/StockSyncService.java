package com.example.stage2025.service;

import com.example.stage2025.entity.Product;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.dto.SupplierProductDto;
import com.example.stage2025.repository.ProductRepository;
import com.example.stage2025.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StockSyncService {

    private final SupplierRepository supplierRepository;
    private final ProductRepository productRepository;
    private final ProductFetcherFactory productFetcherFactory;
    
    @Scheduled(fixedDelay = 60000) // Every 1 minute
    public void syncAllSupplierStock() {
        log.info("Starting scheduled stock sync for all suppliers");
        
        List<Supplier> activeSuppliers = supplierRepository.findByActiveTrue();
        
        for (Supplier supplier : activeSuppliers) {
            try {
                syncStockForSupplier(supplier);
            } catch (Exception e) {
                log.error("Failed to sync stock for supplier {}: {}", supplier.getName(), e.getMessage());
            }
        }
        
        log.info("Completed scheduled stock sync for {} suppliers", activeSuppliers.size());
    }

    public void syncStockForSupplier(Supplier supplier) {
        log.info("Syncing stock for supplier: {}", supplier.getName());
        
        int updatedCount = 0;
        try {
            // Fetch latest products from supplier
            List<SupplierProductDto> latest = productFetcherFactory.fetch(supplier);
            if (latest == null || latest.isEmpty()) {
                log.warn("No products returned from supplier {} during sync", supplier.getName());
                return;
            }

            // Map by external id for quick lookup
            java.util.Map<String, SupplierProductDto> byExternal = new java.util.HashMap<>();
            for (SupplierProductDto dto : latest) {
                if (dto.getExternalProductId() != null) {
                    byExternal.put(dto.getExternalProductId(), dto);
                }
            }

            List<Product> products = productRepository.findBySupplierId(supplier.getId());
            for (Product product : products) {
                SupplierProductDto dto = byExternal.get(product.getExternalProductId());
                if (dto != null) {
                    product.setSyncedStock(dto.getStock());
                    product.setLastFetched(LocalDateTime.now());
                    productRepository.save(product);
                    updatedCount++;
                }
            }
        } catch (Exception e) {
            log.error("Failed to fetch/update stock for supplier {}: {}", supplier.getName(), e.getMessage());
        }
        
        log.info("Completed stock sync for supplier {} - {} products updated", supplier.getName(), updatedCount);
    }
}