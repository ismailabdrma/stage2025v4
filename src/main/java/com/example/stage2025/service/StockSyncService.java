package com.example.stage2025.service;

import com.example.stage2025.entity.Product;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.entity.ApiSupplier;
import com.example.stage2025.entity.SoapSupplier;
import com.example.stage2025.repository.ProductRepository;
import com.example.stage2025.repository.SupplierRepository;
import com.example.stage2025.service.parser.SoapProductParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class StockSyncService {

    private final SupplierRepository supplierRepository;
    private final ProductRepository productRepository;
    
    // Cache for stock sync status
    private final Map<Long, LocalDateTime> lastSyncTimes = new ConcurrentHashMap<>();

    /**
     * Scheduled task to sync stock every 5 minutes
     */
    @Scheduled(fixedRate = 300_000) // 5 minutes
    @Transactional
    public void scheduledStockSync() {
        log.info("Starting scheduled stock synchronization...");
        
        List<Supplier> activeSuppliers = supplierRepository.findByActiveTrue();
        
        for (Supplier supplier : activeSuppliers) {
            try {
                syncStockForSupplier(supplier);
            } catch (Exception e) {
                log.error("Failed to sync stock for supplier {}: {}", supplier.getName(), e.getMessage());
            }
        }
        
        log.info("Scheduled stock synchronization completed");
    }

    /**
     * Sync stock for a specific supplier
     */
    @Transactional
    public void syncStockForSupplier(Supplier supplier) {
        log.info("🔄 Starting stock sync for supplier: '{}' (ID: {}, Type: {}, Active: {})", 
                supplier.getName(), supplier.getId(), supplier.getClass().getSimpleName(), supplier.isActive());
        
        try {
            // Get products for this supplier using ID-based lookup (more reliable)
            List<Product> supplierProducts = productRepository.findBySupplierId(supplier.getId());
            
            log.info("📊 Query result: Found {} products for supplier '{}' (ID: {})", 
                    supplierProducts.size(), supplier.getName(), supplier.getId());
            
            // Detailed debugging for each product found
            if (!supplierProducts.isEmpty()) {
                log.debug("📋 Product details for supplier '{}':", supplier.getName());
                for (Product p : supplierProducts) {
                    log.debug("  - Product ID: {}, Name: '{}', ExternalID: '{}', Active: {}, SyncedStock: {}", 
                             p.getId(), p.getName(), p.getExternalProductId(), p.getActive(), p.getSyncedStock());
                }
            }
            
            if (supplierProducts.isEmpty()) {
                log.warn("⚠️  NO PRODUCTS FOUND for supplier: '{}' (ID: {})", supplier.getName(), supplier.getId());
                log.warn("📋 This could mean:");
                log.warn("   1. No products have been imported for this supplier");
                log.warn("   2. Products exist but supplier_id doesn't match");
                log.warn("   3. Database relationship issue");
                return;
            }
            
            // Fetch current stock from supplier API
            Map<String, Integer> currentStock = fetchCurrentStockFromSupplier(supplier);
            
            // Update product stock
            int updatedCount = 0;
            for (Product product : supplierProducts) {
                if (product.getExternalProductId() != null) {
                    Integer newStock = currentStock.get(product.getExternalProductId());
                    if (newStock != null && !newStock.equals(product.getSyncedStock())) {
                        product.setSyncedStock(newStock);
                        product.setLastFetched(LocalDateTime.now());
                        productRepository.save(product);
                        updatedCount++;
                        
                        log.debug("Updated stock for product {}: {} -> {}", 
                            product.getName(), product.getSyncedStock(), newStock);
                    }
                }
            }
            
            // Update last sync time
            lastSyncTimes.put(supplier.getId(), LocalDateTime.now());
            
            log.info("Stock sync completed for supplier {}. Updated {} products", 
                supplier.getName(), updatedCount);
            
        } catch (Exception e) {
            log.error("Stock sync failed for supplier {}: {}", supplier.getName(), e.getMessage());
            throw e;
        }
    }

    /**
     * Manual stock sync for a specific supplier
     */
    @Transactional
    public void manualStockSync(Long supplierId) {
        Supplier supplier = supplierRepository.findById(supplierId)
            .orElseThrow(() -> new RuntimeException("Supplier not found: " + supplierId));
        
        syncStockForSupplier(supplier);
    }

    /**
     * Fetch current stock from supplier API
     */
    private Map<String, Integer> fetchCurrentStockFromSupplier(Supplier supplier) {
        Map<String, Integer> stockMap = new ConcurrentHashMap<>();
        
        try {
            // This is a simplified implementation
            // You would need to implement the actual API call based on your supplier's API
            
            if (supplier instanceof SoapSupplier) {
                stockMap = fetchStockFromSoapApi((SoapSupplier) supplier);
            } else if (supplier instanceof ApiSupplier apiSupplier) {
                stockMap = fetchStockFromRestApi(apiSupplier);
            }
            
        } catch (Exception e) {
            log.error("Failed to fetch stock from supplier {}: {}", supplier.getName(), e.getMessage());
        }
        
        return stockMap;
    }

    /**
     * Fetch stock from SOAP API
     */
    private Map<String, Integer> fetchStockFromSoapApi(SoapSupplier supplier) {
        Map<String, Integer> stockMap = new ConcurrentHashMap<>();
        
        try {
            // Example SOAP request for stock
            String soapRequest = """
                <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
                   <soapenv:Header/>
                   <soapenv:Body>
                      <GetStockRequest>
                         <SupplierId>%s</SupplierId>
                      </GetStockRequest>
                   </soapenv:Body>
                </soapenv:Envelope>
                """.formatted(String.valueOf(supplier.getId()));
            
            // Make SOAP call and parse response
            // This is a placeholder - implement based on your actual SOAP API
            log.info("Fetching stock from SOAP API for supplier: {}", supplier.getName());
            
        } catch (Exception e) {
            log.error("SOAP stock fetch failed for supplier {}: {}", supplier.getName(), e.getMessage());
        }
        
        return stockMap;
    }

    /**
     * Fetch stock from REST API
     */
    private Map<String, Integer> fetchStockFromRestApi(ApiSupplier supplier) {
        Map<String, Integer> stockMap = new ConcurrentHashMap<>();
        
        try {
            // Example REST API call
            // This is a placeholder - implement based on your actual REST API
            log.info("Fetching stock from REST API for supplier: {}", supplier.getName());
            // Example: supplier.getApiUrl() can be used here
            
            // You would use WebClient or RestTemplate here
            // Example:
            // WebClient webClient = WebClient.create(supplier.getApiUrl());
            // StockResponse response = webClient.get()
            //     .uri("/stock")
            //     .header("Authorization", "Bearer " + supplier.getApiKey())
            //     .retrieve()
            //     .bodyToMono(StockResponse.class)
            //     .block();
            
        } catch (Exception e) {
            log.error("REST stock fetch failed for supplier {}: {}", supplier.getName(), e.getMessage());
        }
        
        return stockMap;
    }

    /**
     * Get last sync time for a supplier
     */
    public LocalDateTime getLastSyncTime(Long supplierId) {
        return lastSyncTimes.get(supplierId);
    }

    /**
     * Get sync status for all suppliers
     */
    public Map<Long, LocalDateTime> getAllSyncTimes() {
        return new ConcurrentHashMap<>(lastSyncTimes);
    }

    /**
     * Check if stock sync is needed for a supplier
     */
    public boolean isSyncNeeded(Long supplierId) {
        LocalDateTime lastSync = lastSyncTimes.get(supplierId);
        if (lastSync == null) {
            return true;
        }
        
        // Check if more than 5 minutes have passed since last sync
        return LocalDateTime.now().isAfter(lastSync.plusMinutes(5));
    }
}
