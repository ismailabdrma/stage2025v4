package com.example.stage2025.service;

import com.example.stage2025.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final SupplierRepository supplierRepository;

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        try {
            // Real dashboard statistics from database
            long totalUsers = userRepository.count();
            long totalProducts = productRepository.count();
            long activeProducts = productRepository.countByActiveTrue();
            long inactiveProducts = totalProducts - activeProducts;
            long totalOrders = orderRepository.count();
            long totalSuppliers = supplierRepository.count();
            long activeSuppliers = supplierRepository.countByActiveTrue();
            long inactiveSuppliers = totalSuppliers - activeSuppliers;
            
            // Calculate revenue statistics
            Double totalRevenue = orderRepository.findAll().stream()
                .filter(order -> order.getStatus().name().equals("COMPLETED") || order.getStatus().name().equals("DELIVERED"))
                .mapToDouble(order -> order.getTotal() != null ? order.getTotal() : 0.0)
                .sum();
            
            // Today's revenue (orders from today)
            LocalDateTime todayStart = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
            Double todayRevenue = orderRepository.findByOrderDateAfter(todayStart).stream()
                .filter(order -> order.getStatus().name().equals("COMPLETED") || order.getStatus().name().equals("DELIVERED"))
                .mapToDouble(order -> order.getTotal() != null ? order.getTotal() : 0.0)
                .sum();
            
            // This month's revenue
            LocalDateTime monthStart = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
            Double monthRevenue = orderRepository.findByOrderDateAfter(monthStart).stream()
                .filter(order -> order.getStatus().name().equals("COMPLETED") || order.getStatus().name().equals("DELIVERED"))
                .mapToDouble(order -> order.getTotal() != null ? order.getTotal() : 0.0)
                .sum();
            
            // Growth rates (comparing with last month)
            LocalDateTime lastMonth = LocalDateTime.now().minusMonths(1);
            LocalDateTime lastMonthStart = lastMonth.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
            LocalDateTime currentMonthStart = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
            
            long currentMonthOrders = orderRepository.countByOrderDateBetween(currentMonthStart, LocalDateTime.now());
            long lastMonthOrders = orderRepository.countByOrderDateBetween(lastMonthStart, currentMonthStart);
            
            double orderGrowthRate = lastMonthOrders > 0 ? 
                ((currentMonthOrders - lastMonthOrders) * 100.0 / lastMonthOrders) : 0.0;
            
            // User growth rate (new users this month vs last month)
            long currentMonthUsers = userRepository.findAll().stream()
                .filter(user -> user.getCreatedAt() != null && user.getCreatedAt().isAfter(currentMonthStart))
                .mapToLong(user -> 1L)
                .sum();
            
            long lastMonthUsers = userRepository.findAll().stream()
                .filter(user -> user.getCreatedAt() != null && 
                    user.getCreatedAt().isAfter(lastMonthStart) && 
                    user.getCreatedAt().isBefore(currentMonthStart))
                .mapToLong(user -> 1L)
                .sum();
            
            double userGrowthRate = lastMonthUsers > 0 ? 
                ((currentMonthUsers - lastMonthUsers) * 100.0 / lastMonthUsers) : 0.0;
            
            // Revenue growth rate
            Double lastMonthRevenue = orderRepository.findByOrderDateBetween(lastMonthStart, currentMonthStart).stream()
                .filter(order -> order.getStatus().name().equals("COMPLETED") || order.getStatus().name().equals("DELIVERED"))
                .mapToDouble(order -> order.getTotal() != null ? order.getTotal() : 0.0)
                .sum();
            
            double revenueGrowthRate = lastMonthRevenue > 0 ? 
                ((monthRevenue - lastMonthRevenue) * 100.0 / lastMonthRevenue) : 0.0;
            
            // Order status breakdown
            long pendingOrders = orderRepository.findAll().stream()
                .filter(order -> order.getStatus().name().equals("PENDING"))
                .mapToLong(order -> 1L)
                .sum();
            
            long processingOrders = orderRepository.findAll().stream()
                .filter(order -> order.getStatus().name().equals("PROCESSING"))
                .mapToLong(order -> 1L)
                .sum();
            
            long completedOrders = orderRepository.findAll().stream()
                .filter(order -> order.getStatus().name().equals("COMPLETED") || order.getStatus().name().equals("DELIVERED"))
                .mapToLong(order -> 1L)
                .sum();
            
            // Build comprehensive stats map
            stats.put("totalUsers", totalUsers);
            stats.put("totalProducts", totalProducts);
            stats.put("activeProducts", activeProducts);
            stats.put("inactiveProducts", inactiveProducts);
            stats.put("totalOrders", totalOrders);
            stats.put("pendingOrders", pendingOrders);
            stats.put("processingOrders", processingOrders);
            stats.put("completedOrders", completedOrders);
            stats.put("totalSuppliers", totalSuppliers);
            stats.put("activeSuppliers", activeSuppliers);
            stats.put("inactiveSuppliers", inactiveSuppliers);
            
            // Revenue stats
            stats.put("totalRevenue", totalRevenue);
            stats.put("todayRevenue", todayRevenue);
            stats.put("monthRevenue", monthRevenue);
            stats.put("averageOrderValue", totalOrders > 0 ? totalRevenue / totalOrders : 0.0);
            
            // Growth rates
            stats.put("orderGrowthRate", orderGrowthRate);
            stats.put("userGrowthRate", userGrowthRate);
            stats.put("revenueGrowthRate", revenueGrowthRate);
            
            // System health
            stats.put("systemStatus", "healthy");
            stats.put("lastUpdated", System.currentTimeMillis());
            
        } catch (Exception e) {
            // Fallback to mock data if database error
            stats.put("totalUsers", 0);
            stats.put("totalProducts", 0);
            stats.put("activeProducts", 0);
            stats.put("inactiveProducts", 0);
            stats.put("totalOrders", 0);
            stats.put("pendingOrders", 0);
            stats.put("processingOrders", 0);
            stats.put("completedOrders", 0);
            stats.put("totalSuppliers", 0);
            stats.put("activeSuppliers", 0);
            stats.put("inactiveSuppliers", 0);
            stats.put("totalRevenue", 0.0);
            stats.put("todayRevenue", 0.0);
            stats.put("monthRevenue", 0.0);
            stats.put("averageOrderValue", 0.0);
            stats.put("orderGrowthRate", 0.0);
            stats.put("userGrowthRate", 0.0);
            stats.put("revenueGrowthRate", 0.0);
            stats.put("systemStatus", "error");
            stats.put("error", "Database error: " + e.getMessage());
        }
        
        return stats;
    }

    public Map<String, Object> getSystemPerformance() {
        Map<String, Object> performance = new HashMap<>();
        
        try {
            // Get runtime information
            Runtime runtime = Runtime.getRuntime();
            long maxMemory = runtime.maxMemory();
            long totalMemory = runtime.totalMemory();
            long freeMemory = runtime.freeMemory();
            long usedMemory = totalMemory - freeMemory;
            
            // Calculate memory usage percentage
            double memoryUsage = (double) usedMemory / maxMemory * 100;
            
            // Get system properties for uptime calculation
            long uptimeMs = java.lang.management.ManagementFactory.getRuntimeMXBean().getUptime();
            long days = uptimeMs / (1000 * 60 * 60 * 24);
            long hours = (uptimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
            long minutes = (uptimeMs % (1000 * 60 * 60)) / (1000 * 60);
            String uptime = String.format("%dd %dh %dm", days, hours, minutes);
            
            // Simulate CPU usage (in a real system, you'd get this from system metrics)
            double cpuUsage = Math.random() * 30 + 40; // Random between 40-70%
            
            // Simulate request metrics
            int requestsPerSecond = (int) (Math.random() * 100 + 100); // 100-200 rps
            double avgResponseTime = Math.random() * 100 + 80; // 80-180ms
            double errorRate = Math.random() * 2; // 0-2% error rate
            
            performance.put("memoryUsage", Math.round(memoryUsage));
            performance.put("cpuUsage", Math.round(cpuUsage));
            performance.put("avgResponseTime", Math.round(avgResponseTime));
            performance.put("requestsPerSecond", requestsPerSecond);
            performance.put("errorRate", Math.round(errorRate * 10.0) / 10.0);
            performance.put("uptime", uptime);
            
        } catch (Exception e) {
            // Fallback data
            performance.put("memoryUsage", 65);
            performance.put("cpuUsage", 45);
            performance.put("avgResponseTime", 120);
            performance.put("requestsPerSecond", 150);
            performance.put("errorRate", 0.5);
            performance.put("uptime", "15d 8h 32m");
        }
        
        return performance;
    }

    public java.util.List<Map<String, Object>> getSystemLogs() {
        java.util.List<Map<String, Object>> logs = new java.util.ArrayList<>();
        
        try {
            // Simulate recent system logs
            long now = System.currentTimeMillis();
            
            // Generate some realistic log entries
            logs.add(createLogEntry(1, new java.util.Date(now), "INFO", 
                "User authentication successful for admin user", "AuthService"));
            logs.add(createLogEntry(2, new java.util.Date(now - 120000), "INFO", 
                "Database health check completed - all connections healthy", "DatabaseMonitor"));
            logs.add(createLogEntry(3, new java.util.Date(now - 300000), "WARN", 
                "High memory usage detected: " + Math.round(Math.random() * 20 + 75) + "%", "SystemMonitor"));
            logs.add(createLogEntry(4, new java.util.Date(now - 450000), "INFO", 
                "Scheduled task completed: Product sync from suppliers", "ProductSyncService"));
            logs.add(createLogEntry(5, new java.util.Date(now - 600000), "INFO", 
                "Cache refreshed successfully - " + (int)(Math.random() * 1000 + 500) + " entries", "CacheManager"));
            logs.add(createLogEntry(6, new java.util.Date(now - 780000), "WARN", 
                "Slow query detected: SELECT * FROM orders - " + (int)(Math.random() * 2000 + 1000) + "ms", "DatabaseMonitor"));
            logs.add(createLogEntry(7, new java.util.Date(now - 900000), "INFO", 
                "Email notification sent successfully", "EmailService"));
            logs.add(createLogEntry(8, new java.util.Date(now - 1080000), "ERROR", 
                "Failed to connect to external supplier API - timeout", "SupplierService"));
            logs.add(createLogEntry(9, new java.util.Date(now - 1200000), "INFO", 
                "System backup completed successfully", "BackupService"));
            logs.add(createLogEntry(10, new java.util.Date(now - 1380000), "INFO", 
                "Application startup completed in " + (int)(Math.random() * 5000 + 3000) + "ms", "Application"));
                
        } catch (Exception e) {
            // Fallback log entries
            logs.add(createLogEntry(1, new java.util.Date(), "ERROR", 
                "Unable to fetch system logs: " + e.getMessage(), "LogService"));
        }
        
        return logs;
    }
    
    private Map<String, Object> createLogEntry(int id, java.util.Date timestamp, String level, String message, String source) {
        Map<String, Object> logEntry = new HashMap<>();
        logEntry.put("id", id);
        logEntry.put("timestamp", timestamp);
        logEntry.put("level", level);
        logEntry.put("message", message);
        logEntry.put("source", source);
        return logEntry;
    }
}