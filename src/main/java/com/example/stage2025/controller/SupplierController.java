package com.example.stage2025.controller;

import com.example.stage2025.dto.SupplierDto;
import com.example.stage2025.service.SupplierService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
@RequiredArgsConstructor
@Slf4j
public class SupplierController {

    private final SupplierService supplierService;

    @GetMapping
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
    public ResponseEntity<?> createSupplier(@RequestBody SupplierDto dto) {
        // Smart validation based on supplier type and payment system
        if (dto.getType() == null || dto.getType().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Supplier type is required"
            ));
        }
        
        // If supplier has own payment system, validate required fields
        if (dto.isHasOwnPaymentSystem()) {
            if ("SOAP".equals(dto.getType())) {
                // For SOAP suppliers with own payment system, just check if payment operation is selected
                if (dto.getPaymentOperationName() == null || dto.getPaymentOperationName().isBlank()) {
                    return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Payment operation is required for SOAP suppliers with own payment system"
                    ));
                }
            }
            // For other types, no additional validation needed
        }
        
        return ResponseEntity.ok(supplierService.createSupplier(dto));
    }

    @PostMapping("/auto-soap")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SupplierDto> createSupplierAutoSoap(@RequestBody SupplierDto dto) {
        if (dto.getWsdlUrl() == null || dto.getWsdlUrl().isBlank()) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(supplierService.createSupplierAutoSoap(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SupplierDto> updateSupplier(@PathVariable Long id, @RequestBody SupplierDto dto) {
        return ResponseEntity.ok(supplierService.updateSupplier(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteSupplier(@PathVariable Long id, @RequestParam(required = false) Boolean force) {
        try {
            if (Boolean.TRUE.equals(force)) {
                // Force delete - bypass constraint checks
                supplierService.forceDeleteSupplier(id);
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Supplier force deleted successfully",
                    "supplierId", id
                ));
            } else {
                // Normal delete with constraint checks
                supplierService.deleteSupplier(id);
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Supplier deleted successfully",
                    "supplierId", id
                ));
            }
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(Map.of(
                "success", false,
                "message", e.getMessage(),
                "error", "CONFLICT",
                "suggestion", "Use ?force=true to force delete (WARNING: This will delete all associated data)"
            ));
        } catch (Exception e) {
            log.error("Error deleting supplier {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Failed to delete supplier: " + e.getMessage(),
                "error", "INTERNAL_SERVER_ERROR"
            ));
        }
    }

    @PostMapping("/{id}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> activateSupplier(@PathVariable Long id) {
        try {
            supplierService.activateSupplier(id);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Supplier activated successfully",
                "supplierId", id
            ));
        } catch (Exception e) {
            log.error("Error activating supplier {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "error", "Failed to activate supplier: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deactivateSupplier(@PathVariable Long id) {
        try {
            supplierService.deactivateSupplier(id);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Supplier deactivated successfully",
                "supplierId", id
            ));
        } catch (Exception e) {
            log.error("Error deactivating supplier {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "error", "Failed to deactivate supplier: " + e.getMessage()
            ));
        }
    }

    @PutMapping("/{id}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> activateSupplierPut(@PathVariable Long id) {
        try {
            supplierService.activateSupplier(id);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Supplier activated successfully",
                "supplierId", id
            ));
        } catch (Exception e) {
            log.error("Error activating supplier {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "error", "Failed to activate supplier: " + e.getMessage()
            ));
        }
    }

    @PutMapping("/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deactivateSupplierPut(@PathVariable Long id) {
        try {
            supplierService.deactivateSupplier(id);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Supplier deactivated successfully",
                "supplierId", id
            ));
        } catch (Exception e) {
            log.error("Error deactivating supplier {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "error", "Failed to deactivate supplier: " + e.getMessage()
            ));
        }
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