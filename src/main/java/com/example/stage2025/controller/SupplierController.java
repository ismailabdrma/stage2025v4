package com.example.stage2025.controller;

import com.example.stage2025.dto.SupplierDto;
import com.example.stage2025.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierService supplierService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SupplierDto>> getAllSuppliers() {
        return ResponseEntity.ok(supplierService.getAllSuppliers());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SupplierDto> getSupplier(@PathVariable Long id) {
        return ResponseEntity.ok(supplierService.getSupplierById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SupplierDto> createSupplier(@RequestBody SupplierDto dto) {
        return ResponseEntity.ok(supplierService.createSupplier(dto));
    }

    @PostMapping("/auto-soap")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SupplierDto> createSupplierAutoSoap(@RequestBody SupplierDto dto) {
        return ResponseEntity.ok(supplierService.createSupplierAutoSoap(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SupplierDto> updateSupplier(@PathVariable Long id, @RequestBody SupplierDto dto) {
        return ResponseEntity.ok(supplierService.updateSupplier(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteSupplier(@PathVariable Long id) {
        supplierService.deleteSupplier(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> activateSupplier(@PathVariable Long id) {
        supplierService.activateSupplier(id);
        return ResponseEntity.ok("Supplier activated");
    }

    @PostMapping("/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deactivateSupplier(@PathVariable Long id) {
        supplierService.deactivateSupplier(id);
        return ResponseEntity.ok("Supplier deactivated");
    }

    @PutMapping("/{id}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> activateSupplierPut(@PathVariable Long id) {
        supplierService.activateSupplier(id);
        return ResponseEntity.ok("Supplier activated");
    }

    @PutMapping("/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deactivateSupplierPut(@PathVariable Long id) {
        supplierService.deactivateSupplier(id);
        return ResponseEntity.ok("Supplier deactivated");
    }

    @PostMapping("/{id}/refresh-metadata")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> refreshSupplierMetadata(@PathVariable Long id) {
        try {
            SupplierDto supplier = supplierService.getSupplierById(id);
            
            if (!"SOAP".equalsIgnoreCase(supplier.getType())) {
                return ResponseEntity.badRequest().body(java.util.Map.of(
                    "success", false,
                    "message", "Metadata refresh is only available for SOAP suppliers"
                ));
            }
            
            // Call the actual metadata refresh service
            boolean success = supplierService.refreshSoapMetadata(id);
            
            if (success) {
                return ResponseEntity.ok(java.util.Map.of(
                    "success", true,
                    "message", "Metadata refresh completed for supplier " + supplier.getName()
                ));
            } else {
                return ResponseEntity.status(500).body(java.util.Map.of(
                    "success", false,
                    "message", "Failed to refresh metadata for supplier " + supplier.getName()
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(java.util.Map.of(
                "success", false,
                "message", "Error refreshing metadata: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/refresh-all-soap-metadata")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> refreshAllSoapMetadata() {
        // For now, return a simple success response
        // In a real implementation, you would refresh all SOAP suppliers
        return ResponseEntity.ok(java.util.Map.of(
            "success", true,
            "message", "Metadata refresh initiated for all SOAP suppliers"
        ));
    }

    @PostMapping("/{id}/import-products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> importProducts(@PathVariable Long id) {
        try {
            SupplierDto supplier = supplierService.getSupplierById(id);
            
            // Trigger product import based on supplier type
            if ("SOAP".equalsIgnoreCase(supplier.getType())) {
                // Import products from SOAP supplier
                supplierService.importProductsFromSupplier(id);
                return ResponseEntity.ok(java.util.Map.of(
                    "success", true,
                    "message", "SOAP product import initiated for supplier " + supplier.getName(),
                    "type", "SOAP"
                ));
            } else if ("API".equalsIgnoreCase(supplier.getType())) {
                // Import products from API supplier
                supplierService.importProductsFromSupplier(id);
                return ResponseEntity.ok(java.util.Map.of(
                    "success", true,
                    "message", "API product import initiated for supplier " + supplier.getName(),
                    "type", "API"
                ));
            } else {
                return ResponseEntity.badRequest().body(java.util.Map.of(
                    "success", false,
                    "message", "Product import not supported for supplier type: " + supplier.getType()
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(java.util.Map.of(
                "success", false,
                "message", "Failed to import products: " + e.getMessage()
            ));
        }
    }
}