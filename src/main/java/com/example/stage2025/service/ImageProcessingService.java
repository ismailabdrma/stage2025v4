package com.example.stage2025.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
@Slf4j
public class ImageProcessingService {

    private static final String UPLOAD_DIR = "uploads/images";

    public ImageProcessingService() {
        // Create upload directory if it doesn't exist
        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
        } catch (IOException e) {
            log.error("Failed to create upload directory: {}", e.getMessage());
        }
    }

    /**
     * Convert base64 image data to a data URL that can be used directly in frontend
     */
    public String convertBase64ToDataUrl(String base64Data, String pictureFormat) {
        if (base64Data == null || base64Data.isBlank()) {
            return null;
        }
        
        // Determine MIME type from picture format
        String mimeType = getMimeType(pictureFormat);
        
        // Create data URL
        return "data:" + mimeType + ";base64," + base64Data;
    }

    /**
     * Save base64 image data to file system and return the file URL
     */
    public String saveBase64Image(String base64Data, String pictureFormat, String productId) {
        if (base64Data == null || base64Data.isBlank()) {
            return null;
        }

        try {
            // Decode base64 data
            byte[] imageBytes = Base64.getDecoder().decode(base64Data);
            
            // Generate unique filename
            String extension = getFileExtension(pictureFormat);
            String filename = "product_" + productId + "_" + UUID.randomUUID().toString() + "." + extension;
            
            // Save to file system
            Path filePath = Paths.get(UPLOAD_DIR, filename);
            Files.write(filePath, imageBytes);
            
            // Return URL accessible through our image proxy
            return "/api/images/proxy?url=" + filePath.toString().replace("\\", "/");
            
        } catch (Exception e) {
            log.error("Failed to save base64 image for product {}: {}", productId, e.getMessage());
            return null;
        }
    }

    /**
     * Get MIME type from picture format
     */
    private String getMimeType(String pictureFormat) {
        if (pictureFormat == null) {
            return "image/jpeg";
        }
        
        return switch (pictureFormat.toLowerCase()) {
            case "png" -> "image/png";
            case "gif" -> "image/gif";
            case "webp" -> "image/webp";
            case "bmp" -> "image/bmp";
            case "svg" -> "image/svg+xml";
            default -> "image/jpeg";
        };
    }

    /**
     * Get file extension from picture format
     */
    private String getFileExtension(String pictureFormat) {
        if (pictureFormat == null) {
            return "jpg";
        }
        
        return switch (pictureFormat.toLowerCase()) {
            case "jpeg" -> "jpg";
            case "png", "gif", "webp", "bmp", "svg" -> pictureFormat.toLowerCase();
            default -> "jpg";
        };
    }
}


