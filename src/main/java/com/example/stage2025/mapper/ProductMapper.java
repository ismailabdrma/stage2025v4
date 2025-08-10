// src/main/java/com/example/stage2025/mapper/ProductMapper.java
package com.example.stage2025.mapper;

import com.example.stage2025.dto.ProductDto;
import com.example.stage2025.entity.Product;
import java.util.List;
import java.util.stream.Collectors;

public class ProductMapper {

    public static ProductDto toDto(Product p) {
        if (p == null) return null;

        ProductDto dto = new ProductDto();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setDescription(p.getDescription());
        dto.setDisplayedPrice(p.getDisplayedPrice());

        // real-time cache fields
        dto.setSyncedStock(p.getSyncedStock());
        dto.setDynamicPrice(p.getDynamicPrice());
        dto.setLastFetched(p.getLastFetched());

        // Convert image URLs to use our proxy endpoint
        List<String> processedImageUrls = p.getImageUrls() != null ? 
            p.getImageUrls().stream()
                .map(ProductMapper::processImageUrl)
                .collect(Collectors.toList()) 
            : List.of();
        dto.setImageUrls(processedImageUrls);
        dto.setCategoryName(p.getCategory() != null ? p.getCategory().getName() : null);
        // Avoid lazy init: use supplierRef or safe access
        dto.setSupplierName(p.getSupplier() != null ? p.getSupplier().getName() : p.getSupplierRef());

        dto.setExternalProductId(p.getExternalProductId()); // <-- ADD THIS LINE

        return dto;
    }

    /**
     * Converts image URLs to use our backend proxy endpoint
     */
    private static String processImageUrl(String originalUrl) {
        if (originalUrl == null || originalUrl.isBlank()) {
            return "/api/images/proxy?url=placeholder.jpg";
        }
        
        // If it's already a proxy URL, don't double-wrap
        if (originalUrl.startsWith("/api/images/proxy")) {
            return originalUrl;
        }
        
        // Encode the original URL as a parameter for our proxy
        try {
            return "/api/images/proxy?url=" + java.net.URLEncoder.encode(originalUrl, "UTF-8");
        } catch (Exception e) {
            return "/api/images/proxy?url=placeholder.jpg";
        }
    }

}
