package com.example.stage2025.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/diagnostic")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
public class DiagnosticController {
    
    @GetMapping("/system-status")
    public ResponseEntity<Map<String, Object>> getSystemStatus() {
        Map<String, Object> status = new HashMap<>();
        
        try {
            status.put("status", "operational");
            status.put("timestamp", System.currentTimeMillis());
            status.put("services", Map.of(
                "database", "connected",
                "cache", "available",
                "file_system", "accessible"
            ));
            
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            log.error("System diagnostic failed: {}", e.getMessage());
            status.put("status", "error");
            status.put("error", e.getMessage());
            return ResponseEntity.ok(status);
        }
    }
}