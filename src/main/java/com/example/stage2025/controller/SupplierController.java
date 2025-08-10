package com.example.stage2025.controller;

import com.example.stage2025.dto.SupplierDto;
import com.example.stage2025.dto.SupplierProductDto;
import com.example.stage2025.dto.SoapOperationMeta;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.repository.SupplierRepository;
import com.example.stage2025.service.ProductFetcherFactory;
import com.example.stage2025.service.impl.ProductImportService;
import com.example.stage2025.service.SupplierService;
import com.example.stage2025.service.SoapMetadataRefreshService;
import com.example.stage2025.utils.WsdlFullMetadataUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/suppliers")
@RequiredArgsConstructor
public class SupplierController {

    private final ProductFetcherFactory fetcherFactory;
    private final SupplierRepository supplierRepository;
    private final SupplierService supplierService;
    private final ProductImportService productImportService;
    private final SoapMetadataRefreshService metadataRefreshService;

    @GetMapping
    public ResponseEntity<List<SupplierDto>> getAll() {
        return ResponseEntity.ok(supplierService.getAllSuppliers());
    }

    // --- Refresh all suppliers (SOAP metadata + trigger imports for all active suppliers) ---
    @PostMapping("/refresh-all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> refreshAllSuppliersAndImport() {
        try {
            int metaUpdated = metadataRefreshService.refreshAllSoapSuppliers();
            // Trigger import for all active suppliers (SOAP & EXCEL/API)
            supplierRepository.findByActiveTrue().forEach(productImportService::importProductsFromSupplier);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Refreshed SOAP metadata for " + metaUpdated + " suppliers and triggered imports for all active suppliers",
                    "metadataUpdated", metaUpdated
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Error during refresh/import: " + e.getMessage()
            ));
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<SupplierDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(supplierService.getSupplierById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SupplierDto> create(@RequestBody SupplierDto dto) {
        return ResponseEntity.ok(supplierService.createSupplier(dto));
    }

    // --- Create SOAP supplier & auto-extract WSDL metadata ---
    @PostMapping("/auto-soap")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SupplierDto> createSoapAuto(@RequestBody SupplierDto dto) throws Exception {
        if (!"SOAP".equalsIgnoreCase(dto.getType())) {
            throw new IllegalArgumentException("Type must be SOAP");
        }
        List<SoapOperationMeta> ops = WsdlFullMetadataUtils.getAllOperationMetadata(dto.getWsdlUrl());
        dto.setOperationsMeta(ops);
        return ResponseEntity.ok(supplierService.createSupplier(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SupplierDto> update(@PathVariable Long id, @RequestBody SupplierDto dto) {
        return ResponseEntity.ok(supplierService.updateSupplier(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        supplierService.deleteSupplier(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> activate(@PathVariable Long id) {
        supplierService.activateSupplier(id);
        return ResponseEntity.ok().body("Supplier activated");
    }

    @PutMapping("/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deactivate(@PathVariable Long id) {
        supplierService.deactivateSupplier(id);
        return ResponseEntity.ok().body("Supplier deactivated");
    }

    // --- Sync/preview products (does not save) ---
    @GetMapping("/{id}/sync-products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SupplierProductDto>> syncProducts(@PathVariable Long id) throws Exception {
        var supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        List<SupplierProductDto> products = fetcherFactory.fetch(supplier);
        return ResponseEntity.ok(products);
    }

    // --- NEW: Import & save products from supplier (SOAP/API/Excel) ---
    @PostMapping("/{id}/import-products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> importProducts(@PathVariable Long id) {
        var supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        productImportService.importProductsFromSupplier(supplier);
        return ResponseEntity.ok("Import started for supplier " + supplier.getName());
    }
    
    // --- DEBUG: Test product fetch without saving ---
    @GetMapping("/{id}/debug-fetch")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> debugFetch(@PathVariable Long id) {
        try {
            var supplier = supplierRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Supplier not found"));
            System.out.println("DEBUG: Testing fetch for supplier: " + supplier.getName() + " (" + supplier.getClass().getSimpleName() + ")");
            
            List<SupplierProductDto> products = fetcherFactory.fetch(supplier);
            System.out.println("DEBUG: Successfully fetched " + products.size() + " products");
            
            Map<String, Object> result = Map.of(
                "supplier", supplier.getName(),
                "type", supplier.getClass().getSimpleName(),
                "productCount", products.size(),
                "products", products.stream().limit(5).toList() // Show first 5 products
            );
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.err.println("DEBUG: Error during fetch: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    // --- SOAP Metadata Refresh Endpoints ---
    
    @PostMapping("/{id}/refresh-metadata")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> refreshSupplierMetadata(@PathVariable Long id) {
        try {
            boolean updated = metadataRefreshService.refreshSupplierById(id);
            if (updated) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Metadata refreshed successfully"
                ));
            } else {
                return ResponseEntity.ok(Map.of(
                    "success", false,
                    "message", "No metadata changes detected or supplier not found"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Error refreshing metadata: " + e.getMessage()
            ));
        }
    }
    
    @PostMapping("/refresh-all-soap-metadata")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> refreshAllSoapMetadata() {
        try {
            int updatedCount = metadataRefreshService.refreshAllSoapSuppliers();
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Refreshed metadata for " + updatedCount + " suppliers",
                "updatedCount", updatedCount
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Error refreshing metadata: " + e.getMessage()
            ));
        }
    }
}
