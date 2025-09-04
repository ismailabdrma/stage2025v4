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
        dto.setSupplierPrice(p.getSupplierPrice());

        // real-time cache fields
        dto.setSyncedStock(p.getSyncedStock());
        dto.setDynamicPrice(p.getDynamicPrice());
        dto.setLastFetched(p.getLastFetched());

        // Convert image URLs to use our proxy endpoint - handle lazy loading safely
        List<String> processedImageUrls = List.of();
        try {
            if (p.getImageUrls() != null && !p.getImageUrls().isEmpty()) {
                processedImageUrls = p.getImageUrls().stream()
                    .map(ProductMapper::processImageUrl)
                    .collect(Collectors.toList());
            }
        } catch (Exception e) {
            // If there's a lazy loading issue, just use empty list
            processedImageUrls = List.of();
        }
        dto.setImageUrls(processedImageUrls);
        // Guard against LazyInitialization if category is proxy and session closed
        try {
            dto.setCategoryName(p.getCategory() != null ? p.getCategory().getName() : null);
        } catch (Exception ignored) {
            dto.setCategoryName(null);
        }
        // Avoid lazy init: use supplierRef or safe access
        try {
            dto.setSupplierName(p.getSupplier() != null ? p.getSupplier().getName() : p.getSupplierRef());
        } catch (Exception ignored) {
            dto.setSupplierName(p.getSupplierRef());
        }

        // Active flag
        try {
            dto.setActive(p.getActive());
        } catch (Exception ignored) {
            dto.setActive(null);
        }

        // Status field
        try {
            dto.setStatus(p.getStatus() != null ? p.getStatus().toString() : null);
        } catch (Exception ignored) {
            dto.setStatus(null);
        }

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
        // If it's a data URL, return as-is so the browser can render directly
        if (originalUrl.startsWith("data:")) {
            return originalUrl;
        }

        // If it's a local/static path that our backend serves directly, keep as-is
        if (originalUrl.startsWith("/uploads/") || originalUrl.startsWith("/images/")) {
            return originalUrl;
        }

        // If it's a bare filename, assume it's in uploads/images
        if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://") && !originalUrl.startsWith("/")) {
            return "/uploads/images/" + originalUrl;
        }

        // Otherwise, it's a remote URL → wrap with proxy
        try {
            return "/api/images/proxy?url=" + java.net.URLEncoder.encode(originalUrl, "UTF-8");
        } catch (Exception e) {
            return "/api/images/proxy?url=placeholder.jpg";
        }
    }
}