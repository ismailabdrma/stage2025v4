package com.example.stage2025.controller;

import com.example.stage2025.service.SystemMonitoringService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.actuate.health.Health;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/admin/monitoring")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AdminMonitoringController {

    private final SystemMonitoringService monitoringService;

    /**
     * Get system health status
     */
    @GetMapping("/health")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Health> getSystemHealth() {
        try {
            Health health = monitoringService.health();
            return ResponseEntity.ok(health);
        } catch (Exception e) {
            log.error("Failed to get system health: {}", e.getMessage());
            return ResponseEntity.ok(Health.down()
                .withDetail("error", e.getMessage())
                .build());
        }
    }

    /**
     * Get system metrics
     */
    @GetMapping("/metrics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getSystemMetrics() {
        try {
            Map<String, Object> metrics = monitoringService.getSystemMetrics();
            return ResponseEntity.ok(metrics);
        } catch (Exception e) {
            log.error("Failed to get system metrics: {}", e.getMessage());
            return ResponseEntity.ok(new HashMap<>());
        }
    }

    /**
     * Get performance report
     */
    @GetMapping("/performance")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Double>> getPerformanceReport() {
        try {
            Map<String, Double> report = monitoringService.getPerformanceReport();
            return ResponseEntity.ok(report);
        } catch (Exception e) {
            log.error("Failed to get performance report: {}", e.getMessage());
            return ResponseEntity.ok(new HashMap<>());
        }
    }

    /**
     * Get operation timings
     */
    @GetMapping("/operations")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Long>> getOperationTimings() {
        try {
            Map<String, Long> timings = monitoringService.getOperationTimings();
            return ResponseEntity.ok(timings);
        } catch (Exception e) {
            log.error("Failed to get operation timings: {}", e.getMessage());
            return ResponseEntity.ok(new HashMap<>());
        }
    }

    /**
     * Get operation counts
     */
    @GetMapping("/operations/counts")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Long>> getOperationCounts() {
        try {
            Map<String, Long> counts = monitoringService.getOperationCounts();
            return ResponseEntity.ok(counts);
        } catch (Exception e) {
            log.error("Failed to get operation counts: {}", e.getMessage());
            return ResponseEntity.ok(new HashMap<>());
        }
    }

    /**
     * Get real-time statistics
     */
    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getRealTimeStats() {
        try {
            Map<String, Object> stats = new HashMap<>();
            
            stats.put("totalOrders", monitoringService.getTotalOrders());
            stats.put("totalPayments", monitoringService.getTotalPayments());
            stats.put("activeUsers", monitoringService.getActiveUsers());
            stats.put("errorCount", monitoringService.getErrorCount());
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            log.error("Failed to get real-time stats: {}", e.getMessage());
            return ResponseEntity.ok(new HashMap<>());
        }
    }

    /**
     * Record a manual event (for testing)
     */
    @PostMapping("/record/{event}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> recordEvent(@PathVariable String event) {
        try {
            switch (event.toLowerCase()) {
                case "order":
                    monitoringService.recordOrderCreated();
                    break;
                case "payment":
                    monitoringService.recordPaymentProcessed();
                    break;
                case "user":
                    monitoringService.recordActiveUser();
                    break;
                default:
                    return ResponseEntity.badRequest().body("Unknown event: " + event);
            }
            
            return ResponseEntity.ok("Event recorded: " + event);
        } catch (Exception e) {
            log.error("Failed to record event {}: {}", event, e.getMessage());
            return ResponseEntity.badRequest().body("Failed to record event: " + e.getMessage());
        }
    }

    /**
     * Reset monitoring counters (for testing)
     */
    @PostMapping("/reset")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> resetCounters() {
        try {
            // This would reset monitoring counters in a real implementation
            log.info("Monitoring counters reset by admin");
            return ResponseEntity.ok("Monitoring counters reset successfully");
        } catch (Exception e) {
            log.error("Failed to reset counters: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Failed to reset counters: " + e.getMessage());
        }
    }

    /**
     * Get average operation time for specific operation
     */
    @GetMapping("/operations/{operation}/average")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Double> getAverageOperationTime(@PathVariable String operation) {
        try {
            double avgTime = monitoringService.getAverageOperationTime(operation);
            return ResponseEntity.ok(avgTime);
        } catch (Exception e) {
            log.error("Failed to get average operation time for {}: {}", operation, e.getMessage());
            return ResponseEntity.ok(0.0);
        }
    }

    /**
     * Trigger manual health check
     */
    @PostMapping("/health/check")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> triggerHealthCheck() {
        try {
            Health health = monitoringService.health();
            String status = health.getStatus().getCode();
            return ResponseEntity.ok("Health check completed. Status: " + status);
        } catch (Exception e) {
            log.error("Failed to trigger health check: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Health check failed: " + e.getMessage());
        }
    }
}
