package com.example.stage2025.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @GetMapping("/proxy")
    public ResponseEntity<byte[]> proxyImage(@RequestParam String url) {
        try {
            // If it's a local file path, serve it directly
            if (!url.startsWith("http")) {
                Path imagePath = Paths.get(url);
                if (Files.exists(imagePath)) {
                    byte[] imageBytes = Files.readAllBytes(imagePath);
                    String contentType = Files.probeContentType(imagePath);
                    if (contentType == null) {
                        contentType = "image/jpeg"; // default
                    }
                    
                    return ResponseEntity.ok()
                            .header(HttpHeaders.CONTENT_TYPE, contentType)
                            .body(imageBytes);
                }
            } else {
                // If it's a URL, fetch it
                try {
                    URL imageUrl = new URL(url);
                    byte[] imageBytes = imageUrl.openStream().readAllBytes();
                    
                    // Determine content type based on URL extension
                    String contentType = "image/jpeg";
                    if (url.toLowerCase().endsWith(".png")) {
                        contentType = "image/png";
                    } else if (url.toLowerCase().endsWith(".gif")) {
                        contentType = "image/gif";
                    } else if (url.toLowerCase().endsWith(".webp")) {
                        contentType = "image/webp";
                    }
                    
                    return ResponseEntity.ok()
                            .header(HttpHeaders.CONTENT_TYPE, contentType)
                            .body(imageBytes);
                } catch (IOException e) {
                    // Fall through to return placeholder
                }
            }
        } catch (Exception e) {
            // Fall through to return placeholder
        }
        
        // Return a placeholder image if the original fails
        return getPlaceholderImage();
    }

    private ResponseEntity<byte[]> getPlaceholderImage() {
        try {
            // Create a simple placeholder SVG
            String placeholderSvg = """
                <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#f0f0f0"/>
                    <text x="50%" y="50%" text-anchor="middle" dy="0.35em" 
                          font-family="Arial, sans-serif" font-size="16" fill="#999">
                        Image non disponible
                    </text>
                </svg>
                """;
            
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "image/svg+xml")
                    .body(placeholderSvg.getBytes());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}

