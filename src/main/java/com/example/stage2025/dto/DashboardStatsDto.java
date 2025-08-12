// src/main/java/com/example/stage2025/dto/DashboardStatsDto.java
package com.example.stage2025.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDto {
    // Basic counts
    private long totalUsers;
    private long totalProducts;
    private long activeProducts;
    private long pendingProducts;
    private long totalSuppliers;
    private long activeSuppliers;
    private long totalCategories;
    
    // Order statistics
    private long totalOrders;
    private long pendingOrders;
    private long processingOrders;
    private long shippedOrders;
    private long deliveredOrders;
    private long cancelledOrders;
    
    // Revenue statistics
    private BigDecimal totalRevenue;
    private BigDecimal todayRevenue;
    private BigDecimal monthRevenue;
    private BigDecimal averageOrderValue;
    
    // Growth metrics
    private double userGrowthRate;
    private double orderGrowthRate;
    private double revenueGrowthRate;
    
    // Recent activity
    private List<Map<String, Object>> recentOrders;
    private List<Map<String, Object>> lowStockProducts;
    private List<Map<String, Object>> pendingPayments;
    
    // Performance data
    private List<Map<String, Object>> supplierPerformance;
    private List<Map<String, Object>> topSellingProducts;
    private List<Map<String, Object>> categoryDistribution;
}
 
