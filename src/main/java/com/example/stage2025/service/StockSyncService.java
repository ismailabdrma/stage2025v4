package com.example.stage2025.service;

import com.example.stage2025.entity.Product;
import com.example.stage2025.entity.Supplier;
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
    
    @Scheduled(fixedDelay = 3600000) // Every hour
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
        
        List<Product> products = productRepository.findBySupplierId(supplier.getId());
        
        for (Product product : products) {
            try {
                // Mock stock sync - in real implementation, call supplier API
                int newStock = (int) (Math.random() * 100);
                        product.setSyncedStock(newStock);
                        product.setLastFetched(LocalDateTime.now());
                        productRepository.save(product);
        } catch (Exception e) {
                log.error("Failed to sync stock for product {}: {}", product.getName(), e.getMessage());
            }
        }
        
        log.info("Completed stock sync for supplier {} - {} products updated", supplier.getName(), products.size());
    }
}