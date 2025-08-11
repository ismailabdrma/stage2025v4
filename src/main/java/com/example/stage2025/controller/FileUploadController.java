package com.example.stage2025.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/upload")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
public class FileUploadController {

    @Value("${app.upload.dir:./uploads/supplier-files}")
    private String uploadDir;

    @PostMapping("/supplier-file")
    public ResponseEntity<Map<String, Object>> uploadSupplierFile(
            @RequestParam("file") MultipartFile file) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validate file
            if (file.isEmpty()) {
                response.put("success", false);
                response.put("message", "Please select a file to upload");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Validate file type
            String fileName = file.getOriginalFilename();
            if (fileName == null || (!fileName.toLowerCase().endsWith(".xlsx") && 
                                   !fileName.toLowerCase().endsWith(".xls") && 
                                   !fileName.toLowerCase().endsWith(".csv"))) {
                response.put("success", false);
                response.put("message", "Only Excel (.xlsx, .xls) and CSV files are allowed");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            // Generate unique filename to avoid conflicts
            String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
            Path filePath = uploadPath.resolve(uniqueFileName);
            
            // Save file
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            log.info("File uploaded successfully: {}", filePath.toString());
            
            response.put("success", true);
            response.put("message", "File uploaded successfully");
            response.put("fileName", fileName);
            response.put("filePath", filePath.toString());
            response.put("relativePath", "/uploads/supplier-files/" + uniqueFileName);
            response.put("fileSize", file.getSize());
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            log.error("File upload failed: {}", e.getMessage(), e);
            
            response.put("success", false);
            response.put("message", "File upload failed: " + e.getMessage());
            
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    @DeleteMapping("/supplier-file")
    public ResponseEntity<Map<String, Object>> deleteSupplierFile(
            @RequestParam("filePath") String filePath) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            Path path = Paths.get(filePath);
            
            // Security check: ensure file is within upload directory
            if (!path.startsWith(Paths.get(uploadDir))) {
                response.put("success", false);
                response.put("message", "Invalid file path");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (Files.exists(path)) {
                Files.delete(path);
                log.info("File deleted successfully: {}", filePath);
            }
            
            response.put("success", true);
            response.put("message", "File deleted successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            log.error("File deletion failed: {}", e.getMessage(), e);
            
            response.put("success", false);
            response.put("message", "File deletion failed: " + e.getMessage());
            
            return ResponseEntity.internalServerError().body(response);
        }
    }
}
