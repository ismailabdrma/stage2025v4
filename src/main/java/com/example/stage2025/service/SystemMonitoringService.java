package com.example.stage2025.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SystemMonitoringService implements HealthIndicator {

    // Performance metrics
    private final AtomicLong totalOrders = new AtomicLong(0);
    private final AtomicLong totalPayments = new AtomicLong(0);
    private final AtomicLong activeUsers = new AtomicLong(0);
    private final AtomicLong errorCount = new AtomicLong(0);
    
    // System health metrics
    private final Map<String, Object> systemMetrics = new ConcurrentHashMap<>();
    private final Map<String, LocalDateTime> componentHealth = new ConcurrentHashMap<>();
    
    // Performance tracking
    private final Map<String, Long> operationTimings = new ConcurrentHashMap<>();
    private final Map<String, AtomicLong> operationCounts = new ConcurrentHashMap<>();

    @Override
    public Health health() {
        boolean isHealthy = checkSystemHealth();
        
        Health.Builder status = isHealthy ? Health.up() : Health.down();
        
        return status
            .withDetail("totalOrders", totalOrders.get())
            .withDetail("totalPayments", totalPayments.get())
            .withDetail("activeUsers", activeUsers.get())
            .withDetail("errorCount", errorCount.get())
            .withDetail("systemLoad", getSystemLoad())
            .withDetail("databaseHealth", checkDatabaseHealth())
            .withDetail("paymentSystemHealth", checkPaymentSystemHealth())
            .withDetail("emailSystemHealth", checkEmailSystemHealth())
            .withDetail("lastHealthCheck", LocalDateTime.now())
            .build();
    }

    // Metric tracking methods
    public void recordOrderCreated() {
        totalOrders.incrementAndGet();
        recordOperation("order_creation");
    }

    public void recordPaymentProcessed() {
        totalPayments.incrementAndGet();
        recordOperation("payment_processing");
    }

    public void recordActiveUser() {
        activeUsers.incrementAndGet();
    }

    public void recordUserLogout() {
        activeUsers.decrementAndGet();
    }

    public void recordError(String component, Throwable error) {
        errorCount.incrementAndGet();
        log.error("System error in component {}: {}", component, error.getMessage());
        componentHealth.put(component, LocalDateTime.now());
    }

    public void recordOperationTime(String operation, long milliseconds) {
        operationTimings.put(operation, milliseconds);
        operationCounts.computeIfAbsent(operation, k -> new AtomicLong(0)).incrementAndGet();
        
        // Alert on slow operations
        if (milliseconds > 5000) { // 5 seconds
            log.warn("Slow operation detected: {} took {}ms", operation, milliseconds);
        }
    }

    private void recordOperation(String operation) {
        operationCounts.computeIfAbsent(operation, k -> new AtomicLong(0)).incrementAndGet();
    }

    // Health check methods
    private boolean checkSystemHealth() {
        try {
            boolean dbHealthy = checkDatabaseHealth();
            boolean paymentHealthy = checkPaymentSystemHealth();
            boolean emailHealthy = checkEmailSystemHealth();
            boolean performanceHealthy = checkPerformanceHealth();
            
            return dbHealthy && paymentHealthy && emailHealthy && performanceHealthy;
        } catch (Exception e) {
            log.error("Health check failed: {}", e.getMessage());
            return false;
        }
    }

    private boolean checkDatabaseHealth() {
        try {
            // This would typically ping the database
            componentHealth.put("database", LocalDateTime.now());
            return true;
        } catch (Exception e) {
            log.error("Database health check failed: {}", e.getMessage());
            return false;
        }
    }

    private boolean checkPaymentSystemHealth() {
        try {
            // This would check Stripe connectivity, payment processing queue, etc.
            componentHealth.put("payment_system", LocalDateTime.now());
            return true;
        } catch (Exception e) {
            log.error("Payment system health check failed: {}", e.getMessage());
            return false;
        }
    }

    private boolean checkEmailSystemHealth() {
        try {
            // This would check email server connectivity
            componentHealth.put("email_system", LocalDateTime.now());
            return true;
        } catch (Exception e) {
            log.error("Email system health check failed: {}", e.getMessage());
            return false;
        }
    }

    private boolean checkPerformanceHealth() {
        // Check if error rate is too high
        long recentErrors = errorCount.get();
        long recentOperations = operationCounts.values().stream()
            .mapToLong(AtomicLong::get)
            .sum();
        
        if (recentOperations > 0) {
            double errorRate = (double) recentErrors / recentOperations;
            if (errorRate > 0.05) { // 5% error rate threshold
                log.warn("High error rate detected: {}%", errorRate * 100);
                return false;
            }
        }
        
        return true;
    }

    private double getSystemLoad() {
        return java.lang.management.ManagementFactory.getOperatingSystemMXBean().getSystemLoadAverage();
    }

    // Scheduled health monitoring
    @Scheduled(fixedRate = 60000) // Every minute
    public void monitorSystemHealth() {
        try {
            updateSystemMetrics();
            checkResourceUsage();
            cleanupOldMetrics();
        } catch (Exception e) {
            log.error("Error during system monitoring: {}", e.getMessage());
        }
    }

    private void updateSystemMetrics() {
        Runtime runtime = Runtime.getRuntime();
        
        systemMetrics.put("memoryUsed", runtime.totalMemory() - runtime.freeMemory());
        systemMetrics.put("memoryTotal", runtime.totalMemory());
        systemMetrics.put("memoryMax", runtime.maxMemory());
        systemMetrics.put("processorCount", runtime.availableProcessors());
        systemMetrics.put("systemLoad", getSystemLoad());
        systemMetrics.put("timestamp", LocalDateTime.now());
    }

    private void checkResourceUsage() {
        Runtime runtime = Runtime.getRuntime();
        long usedMemory = runtime.totalMemory() - runtime.freeMemory();
        long maxMemory = runtime.maxMemory();
        double memoryUsage = (double) usedMemory / maxMemory;
        
        if (memoryUsage > 0.8) { // 80% memory usage
            log.warn("High memory usage detected: {}%", memoryUsage * 100);
        }
        
        double systemLoad = getSystemLoad();
        if (systemLoad > runtime.availableProcessors() * 0.8) {
            log.warn("High system load detected: {}", systemLoad);
        }
    }

    private void cleanupOldMetrics() {
        // Clean up metrics older than 1 hour
        LocalDateTime cutoff = LocalDateTime.now().minusHours(1);
        componentHealth.entrySet().removeIf(entry -> entry.getValue().isBefore(cutoff));
    }

    // Public getter methods for metrics
    public Map<String, Object> getSystemMetrics() {
        return new ConcurrentHashMap<>(systemMetrics);
    }

    public Map<String, Long> getOperationTimings() {
        return new ConcurrentHashMap<>(operationTimings);
    }

    public Map<String, Long> getOperationCounts() {
        return operationCounts.entrySet().stream()
            .collect(java.util.stream.Collectors.toMap(
                Map.Entry::getKey,
                entry -> entry.getValue().get()
            ));
    }

    public long getTotalOrders() {
        return totalOrders.get();
    }

    public long getTotalPayments() {
        return totalPayments.get();
    }

    public long getActiveUsers() {
        return activeUsers.get();
    }

    public long getErrorCount() {
        return errorCount.get();
    }

    // Performance analytics
    public double getAverageOperationTime(String operation) {
        Long totalTime = operationTimings.get(operation);
        AtomicLong count = operationCounts.get(operation);
        
        if (totalTime != null && count != null && count.get() > 0) {
            return (double) totalTime / count.get();
        }
        return 0.0;
    }

    public Map<String, Double> getPerformanceReport() {
        Map<String, Double> report = new ConcurrentHashMap<>();
        
        for (String operation : operationCounts.keySet()) {
            report.put(operation + "_avg_time", getAverageOperationTime(operation));
            report.put(operation + "_count", (double) operationCounts.get(operation).get());
        }
        
        report.put("total_orders", (double) totalOrders.get());
        report.put("total_payments", (double) totalPayments.get());
        report.put("active_users", (double) activeUsers.get());
        report.put("error_rate", calculateErrorRate());
        
        return report;
    }

    private double calculateErrorRate() {
        long totalOperations = operationCounts.values().stream()
            .mapToLong(AtomicLong::get)
            .sum();
        
        if (totalOperations > 0) {
            return (double) errorCount.get() / totalOperations;
        }
        return 0.0;
    }
}
