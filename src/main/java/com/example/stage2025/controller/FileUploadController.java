package com.example.stage2025.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@PreAuthorize("hasRole('ADMIN')")
public class FileUploadController {

    private static final Path UPLOAD_ROOT = Paths.get("uploads");
    private static final Path IMAGES_DIR = UPLOAD_ROOT.resolve("images");

    private static void ensureDirectories() throws IOException {
        if (!Files.exists(IMAGES_DIR)) {
            Files.createDirectories(IMAGES_DIR);
        }
    }

    @PostMapping("/image")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        ensureDirectories();

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Empty file"));
        }

        String original = file.getOriginalFilename() != null ? file.getOriginalFilename() : "image";
        String extension = "";
        int dot = original.lastIndexOf('.');
        if (dot >= 0) {
            extension = original.substring(dot);
        }

        String storedName = "img_" + UUID.randomUUID() + extension;
        Path target = IMAGES_DIR.resolve(storedName);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        // Served by WebConfig as /uploads/** -> file:uploads/
        String publicUrl = "/uploads/images/" + storedName;
        return ResponseEntity.ok(Map.of("url", publicUrl, "filename", storedName));
    }
}


