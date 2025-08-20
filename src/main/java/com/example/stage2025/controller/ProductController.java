package com.example.stage2025.controller;

import com.example.stage2025.dto.ProductDto;
import com.example.stage2025.entity.Product;
import com.example.stage2025.mapper.ProductMapper;
import com.example.stage2025.repository.ProductRepository;
import com.example.stage2025.service.ProductService;
import com.example.stage2025.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;


import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService productService;
    private final ProductRepository productRepository;

    /**
     * Get all products, or filter by category and/or supplier (as query params).
     * Ex: /api/products?category=Smartphones&supplier=Samsung&search=iphone&sortBy=price,desc&page=0&size=10&includeInactive=true
     */
    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<List<ProductDto>> getAll(
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "supplier", required = false) String supplier,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "sortBy", required = false, defaultValue = "name,asc") String sortBy,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "includeInactive", required = false, defaultValue = "false") boolean includeInactive,
            @RequestParam(value = "minPrice", required = false) Double minPrice,
            @RequestParam(value = "maxPrice", required = false) Double maxPrice
    ) {
        Sort sort = Sort.by(sortBy.split(",")[0]);
        if (sortBy.split(",").length > 1 && sortBy.split(",")[1].equalsIgnoreCase("desc")) {
            sort = sort.descending();
        } else {
            sort = sort.ascending();
        }
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Product> productPage = productService.getAllProducts(category, supplier, search, includeInactive, minPrice, maxPrice, pageable);
        List<ProductDto> products = productPage.getContent().stream()
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(products);
    }

    // Simple endpoint for admin to get all products without pagination
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProductDto>> getAllProductsSimple() {
        try {
            List<ProductDto> products = productService.getAllProducts();
            log.info("Admin requested all products: {} found", products.size());
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            log.error("Error getting all products: {}", e.getMessage());
            return ResponseEntity.ok(List.of());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDto> create(@RequestBody ProductDto dto) {
        return ResponseEntity.ok(productService.createProduct(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ProductDto dto) {
        try {
            // Basic validation
            if (dto.getName() != null && dto.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Product name cannot be empty"));
            }
            if (dto.getDisplayedPrice() != null && dto.getDisplayedPrice() < 0) {
                return ResponseEntity.badRequest().body(Map.of("error", "Price cannot be negative"));
            }
            if (dto.getSyncedStock() != null && dto.getSyncedStock() < 0) {
                return ResponseEntity.badRequest().body(Map.of("error", "Stock cannot be negative"));
            }

            ProductDto updated = productService.updateProduct(id, dto);
            return ResponseEntity.ok(updated);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error updating product {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    // --- Admin: List all inactive (pending validation) products ---
    @GetMapping("/inactive")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProductDto>> getInactiveProducts() {
        try {
            List<ProductDto> products = productService.getAllProductsForAdmin(false);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            log.error("Error getting inactive products: {}", e.getMessage());
            return ResponseEntity.ok(List.of());
        }
    }

    // --- Admin: Activate product ---
    @PutMapping("/{id}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> activateProduct(@PathVariable Long id) {
        try {
            ProductDto product = productService.activateProduct(id);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            log.error("Error activating product {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // --- Admin: Deactivate product ---
    @PutMapping("/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deactivateProduct(@PathVariable Long id) {
        try {
            ProductDto product = productService.suspendProduct(id);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            log.error("Error deactivating product {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // --- Public: Get featured products ---
    @GetMapping("/featured")
    public ResponseEntity<List<ProductDto>> getFeaturedProducts() {
        List<ProductDto> products = productService.getFeaturedProducts();
        return ResponseEntity.ok(products);
    }

    // --- Public: Get suggested products ---
    @GetMapping("/{id}/suggested")
    public ResponseEntity<List<ProductDto>> getSuggestedProducts(@PathVariable Long id) {
        List<ProductDto> products = productService.getSuggestedProducts(id);
        return ResponseEntity.ok(products);
    }
    
    // --- Admin: Get all products (including inactive) ---
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProductDto>> getAllProductsForAdmin(
            @RequestParam(value = "includeInactive", required = false, defaultValue = "true") boolean includeInactive) {
        try {
            List<ProductDto> products = productService.getAllProductsForAdmin(includeInactive);
            log.info("Returning {} products for admin (includeInactive={})", products.size(), includeInactive);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            log.error("Error getting products for admin: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(List.of());
        }
    }

    // --- Debug: Get product count ---
    @GetMapping("/admin/debug/count")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getProductCount() {
        try {
            long totalCount = productRepository.count();
            long activeCount = productRepository.countByActiveTrue();
            long inactiveCount = productRepository.countByActiveFalse();

            Map<String, Object> result = Map.of(
                "total", totalCount,
                "active", activeCount,
                "inactive", inactiveCount
            );

            log.info("Product counts - Total: {}, Active: {}, Inactive: {}", totalCount, activeCount, inactiveCount);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Error getting product count: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // --- Admin: Product approval endpoints ---
    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProductDto>> getPendingProducts() {
        return ResponseEntity.ok(productService.getPendingProducts());
    }
    
    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDto> approveProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.approveProduct(id));
    }
    
    @DeleteMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> rejectProduct(@PathVariable Long id) {
        productService.rejectProduct(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/approve-multiple")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProductDto>> approveMultipleProducts(@RequestBody java.util.Map<String, List<Long>> request) {
        List<Long> productIds = request.get("productIds");
        return ResponseEntity.ok(productService.approveMultipleProducts(productIds));
    }
    
    @PutMapping("/{id}/suspend")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDto> suspendProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.suspendProduct(id));
    }
    
    @DeleteMapping("/{id}/permanent")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> permanentDeleteProduct(@PathVariable Long id) {
        productService.permanentDeleteProduct(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/bulk-update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProductDto>> bulkUpdateProducts(@RequestBody java.util.Map<String, Object> request) {
        @SuppressWarnings("unchecked")
        List<Long> productIds = (List<Long>) request.get("productIds");
        @SuppressWarnings("unchecked")
        java.util.Map<String, Object> updateData = (java.util.Map<String, Object>) request.get("updateData");
        
        // Convert map to ProductDto (simplified)
        ProductDto updateDto = new ProductDto();
        if (updateData.containsKey("name")) updateDto.setName((String) updateData.get("name"));
        if (updateData.containsKey("description")) updateDto.setDescription((String) updateData.get("description"));
        
        // Fix: Add null check for displayedPrice
        if (updateData.containsKey("displayedPrice")) {
            Object priceObj = updateData.get("displayedPrice");
            if (priceObj != null) {
                updateDto.setDisplayedPrice(((Number) priceObj).doubleValue());
            }
        }
        
        if (updateData.containsKey("categoryName")) updateDto.setCategoryName((String) updateData.get("categoryName"));
        
        return ResponseEntity.ok(productService.bulkUpdateProducts(productIds, updateDto));
    }
}
