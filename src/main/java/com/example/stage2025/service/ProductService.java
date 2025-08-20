package com.example.stage2025.service;

import com.example.stage2025.dto.ProductDto;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    List<ProductDto> getAllProducts();
    ProductDto getProductById(Long id);
    ProductDto createProduct(ProductDto dto);
    ProductDto updateProduct(Long id, ProductDto dto);
    void deleteProduct(Long id);

    // Service Interface
    List<ProductDto> getProductsByCategoryName(String categoryName);
    List<ProductDto> getProductsBySupplierName(String supplierName);
    List<ProductDto> getProductsByCategoryAndSupplier(String categoryName, String supplierName);

    // New: paged, filtered products with price range and includeInactive
    Page<com.example.stage2025.entity.Product> getAllProducts(
            String category,
            String supplier,
            String search,
            boolean includeInactive,
            Double minPrice,
            Double maxPrice,
            Pageable pageable);

    // Featured & Suggested
    List<ProductDto> getFeaturedProducts();
    List<ProductDto> getSuggestedProducts(Long productId);

    // Admin Product Management
    List<ProductDto> getPendingProducts();
    ProductDto approveProduct(Long id);
    void rejectProduct(Long id);
    List<ProductDto> approveMultipleProducts(List<Long> productIds);
    ProductDto suspendProduct(Long id);
    ProductDto activateProduct(Long id);
    void permanentDeleteProduct(Long id);
    List<ProductDto> bulkUpdateProducts(List<Long> productIds, ProductDto updateData);
    
    // Admin: Get all products for admin panel
    List<ProductDto> getAllProductsForAdmin(boolean includeInactive);
}