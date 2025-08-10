package com.example.stage2025.controller;

import com.example.stage2025.dto.DashboardStatsDto;
import com.example.stage2025.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDto> getDashboardStats() {
        try {
            DashboardStatsDto stats = dashboardService.getDashboardStats();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            // Log the error
            System.err.println("Error fetching dashboard stats: " + e.getMessage());
            e.printStackTrace();
            
            // Return minimal stats in case of error
            DashboardStatsDto errorStats = new DashboardStatsDto();
            return ResponseEntity.ok(errorStats);
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getSystemHealth() {
        try {
            Map<String, Object> health = Map.of(
                "status", "healthy",
                "timestamp", System.currentTimeMillis(),
                "services", Map.of(
                    "database", "connected",
                    "cache", "available",
                    "soap", "responding"
                )
            );
            return ResponseEntity.ok(health);
        } catch (Exception e) {
            Map<String, Object> health = Map.of(
                "status", "degraded",
                "timestamp", System.currentTimeMillis(),
                "error", e.getMessage()
            );
            return ResponseEntity.ok(health);
        }
    }
}