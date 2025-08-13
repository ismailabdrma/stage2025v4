package com.example.stage2025.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
public class ImageUrlValidator {

    /**
     * Validates and normalizes image URLs to ensure they are accessible
     */
    public List<String> validateAndNormalizeImageUrls(List<String> imageUrls) {
        if (imageUrls == null || imageUrls.isEmpty()) {
            return List.of();
        }

        return imageUrls.stream()
                .filter(this::isValidImageUrl)
                .map(this::normalizeImageUrl)
                .collect(Collectors.toList());
    }

    /**
     * Checks if an image URL is valid and accessible
     */
    public boolean isValidImageUrl(String url) {
        if (url == null || url.trim().isEmpty()) {
            return false;
        }

        try {
            // Handle data URLs (base64 images)
            if (url.startsWith("data:image/")) {
                return true;
            }

            // Handle HTTP/HTTPS URLs
            if (url.startsWith("http://") || url.startsWith("https://")) {
                // For external URLs, we assume they're valid
                // In production, you might want to actually check if they're accessible
                return true;
            }

            // Handle local file paths
            if (url.startsWith("/uploads/") || url.startsWith("/images/")) {
                return true;
            }

            // Handle relative paths
            Path imagePath = Paths.get("uploads/images", url.replaceFirst("^/?(images/)?", ""));
            return Files.exists(imagePath);

        } catch (Exception e) {
            log.warn("Invalid image URL: {}, reason: {}", url, e.getMessage());
            return false;
        }
    }

    /**
     * Normalizes image URL to a consistent format
     */
    public String normalizeImageUrl(String url) {
        if (url == null || url.trim().isEmpty()) {
            return "/uploads/images/placeholder.jpg";
        }

        // Keep data URLs as-is
        if (url.startsWith("data:image/")) {
            return url;
        }

        // Keep absolute URLs as-is
        if (url.startsWith("http://") || url.startsWith("https://")) {
            return url;
        }

        // Normalize API and upload paths
        if (url.startsWith("/api/") || url.startsWith("/uploads/") || url.startsWith("/images/")) {
            return url;
        }

        // Convert relative paths to uploads/images format
        String clean = url.replaceFirst("^/?(images/)?", "");
        return "/uploads/images/" + clean;
    }

    /**
     * Gets a placeholder image URL for products without images
     */
    public String getPlaceholderImageUrl() {
        return "/uploads/images/placeholder.jpg";
    }
}
