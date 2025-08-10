package com.example.stage2025.service;

import com.example.stage2025.dto.DashboardStatsDto;
import com.example.stage2025.entity.*;
import com.example.stage2025.enums.OrderStatus;
import com.example.stage2025.enums.PaymentStatus;
import com.example.stage2025.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final SupplierRepository supplierRepository;
    private final SupplierPaymentRepository supplierPaymentRepository;
    private final CategoryRepository categoryRepository;

    public DashboardStatsDto getDashboardStats() {
        DashboardStatsDto stats = new DashboardStatsDto();
        
        // Basic counts
        stats.setTotalUsers(userRepository.count());
        stats.setTotalProducts(productRepository.count());
        stats.setActiveProducts(productRepository.countByActiveTrue());
        stats.setPendingProducts(productRepository.countByActiveFalse());
        stats.setTotalSuppliers(supplierRepository.count());
        stats.setActiveSuppliers(supplierRepository.countByActiveTrue());
        stats.setTotalCategories(categoryRepository.count());
        
        // Order statistics
        stats.setTotalOrders(orderRepository.count());
        stats.setPendingOrders(orderRepository.countByStatus(OrderStatus.PENDING));
        stats.setProcessingOrders(orderRepository.countByStatus(OrderStatus.PROCESSING));
        stats.setShippedOrders(orderRepository.countByStatus(OrderStatus.SHIPPED));
        stats.setDeliveredOrders(orderRepository.countByStatus(OrderStatus.DELIVERED));
        stats.setCancelledOrders(orderRepository.countByStatus(OrderStatus.CANCELLED));
        
        // Revenue statistics
        calculateRevenueStats(stats);
        
        // Recent activity
        stats.setRecentOrders(getRecentOrders());
        stats.setLowStockProducts(getLowStockProducts());
        stats.setPendingPayments(getPendingSupplierPayments());
        
        // Growth metrics
        calculateGrowthMetrics(stats);
        
        // Supplier performance
        calculateSupplierStats(stats);
        
        // Product performance
        calculateProductStats(stats);
        
        return stats;
    }
    
    private void calculateRevenueStats(DashboardStatsDto stats) {
        List<Order> allOrders = orderRepository.findAll();
        
        BigDecimal totalRevenue = allOrders.stream()
            .filter(o -> o.getStatus() == OrderStatus.DELIVERED)
            .map(o -> BigDecimal.valueOf(o.getTotal()))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        stats.setTotalRevenue(totalRevenue);
        
        // Today's revenue
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        BigDecimal todayRevenue = allOrders.stream()
            .filter(o -> o.getOrderDate().isAfter(startOfDay))
            .filter(o -> o.getStatus() == OrderStatus.DELIVERED)
            .map(o -> BigDecimal.valueOf(o.getTotal()))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        stats.setTodayRevenue(todayRevenue);
        
        // This month's revenue
        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        BigDecimal monthRevenue = allOrders.stream()
            .filter(o -> o.getOrderDate().isAfter(startOfMonth))
            .filter(o -> o.getStatus() == OrderStatus.DELIVERED)
            .map(o -> BigDecimal.valueOf(o.getTotal()))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        stats.setMonthRevenue(monthRevenue);
        
        // Average order value
        if (stats.getTotalOrders() > 0) {
            BigDecimal avgOrderValue = totalRevenue.divide(BigDecimal.valueOf(stats.getTotalOrders()), 2, java.math.RoundingMode.HALF_UP);
            stats.setAverageOrderValue(avgOrderValue);
        } else {
            stats.setAverageOrderValue(BigDecimal.ZERO);
        }
    }
    
    private List<Map<String, Object>> getRecentOrders() {
        return orderRepository.findTop10ByOrderByOrderDateDesc()
            .stream()
            .map(this::orderToMap)
            .collect(Collectors.toList());
    }
    
    private List<Map<String, Object>> getLowStockProducts() {
        return productRepository.findBySyncedStockLessThanAndActiveTrue(10)
            .stream()
            .limit(10)
            .map(this::productToMap)
            .collect(Collectors.toList());
    }
    
    private List<Map<String, Object>> getPendingSupplierPayments() {
        return supplierPaymentRepository.findByStatus(PaymentStatus.PENDING)
            .stream()
            .limit(10)
            .map(this::paymentToMap)
            .collect(Collectors.toList());
    }
    
    private void calculateGrowthMetrics(DashboardStatsDto stats) {
        LocalDateTime lastMonth = LocalDateTime.now().minusMonths(1);
        LocalDateTime lastWeek = LocalDateTime.now().minusWeeks(1);
        
        // User growth
        long newUsersThisMonth = userRepository.countByCreatedAtAfter(lastMonth);
        long newUsersLastMonth = userRepository.countByCreatedAtBetween(lastMonth.minusMonths(1), lastMonth);
        stats.setUserGrowthRate(calculateGrowthRate(newUsersThisMonth, newUsersLastMonth));
        
        // Order growth
        long ordersThisWeek = orderRepository.countByCreatedAtAfter(lastWeek);
        long ordersLastWeek = orderRepository.countByCreatedAtBetween(lastWeek.minusWeeks(1), lastWeek);
        stats.setOrderGrowthRate(calculateGrowthRate(ordersThisWeek, ordersLastWeek));
        
        // Revenue growth
        BigDecimal revenueThisMonth = orderRepository.findByCreatedAtAfter(lastMonth)
            .stream()
            .filter(o -> o.getStatus() == OrderStatus.DELIVERED)
            .map(o -> BigDecimal.valueOf(o.getTotal()))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        BigDecimal revenueLastMonth = orderRepository.findByCreatedAtBetween(lastMonth.minusMonths(1), lastMonth)
            .stream()
            .filter(o -> o.getStatus() == OrderStatus.DELIVERED)
            .map(o -> BigDecimal.valueOf(o.getTotal()))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
            
        stats.setRevenueGrowthRate(calculateGrowthRate(revenueThisMonth, revenueLastMonth));
    }
    
    private void calculateSupplierStats(DashboardStatsDto stats) {
        List<Map<String, Object>> supplierPerformance = new ArrayList<>();
        
        for (Supplier supplier : supplierRepository.findByActiveTrue()) {
            Map<String, Object> performance = new HashMap<>();
            performance.put("id", supplier.getId());
            performance.put("name", supplier.getName());
            performance.put("type", supplier.getClass().getSimpleName().replace("Supplier", ""));
            
            // Product count
            long productCount = productRepository.countBySupplier(supplier);
            performance.put("productCount", productCount);
            
            // Revenue from this supplier
            BigDecimal supplierRevenue = orderRepository.findAll()
                .stream()
                .filter(o -> o.getStatus() == OrderStatus.DELIVERED)
                .flatMap(o -> o.getItems().stream())
                .filter(item -> item.getProduct().getSupplier().getId().equals(supplier.getId()))
                .map(item -> BigDecimal.valueOf(item.getUnitPrice()).multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            performance.put("revenue", supplierRevenue);
            
            // Pending payments
            BigDecimal pendingPayments = supplierPaymentRepository.findBySupplierAndStatus(supplier, PaymentStatus.PENDING)
                .stream()
                .map(p -> p.getTotalAmount() != null ? p.getTotalAmount() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            performance.put("pendingPayments", pendingPayments);
            
            // Last import date
            performance.put("lastImport", supplier.getLastImport());
            
            supplierPerformance.add(performance);
        }
        
        stats.setSupplierPerformance(supplierPerformance);
    }
    
    private void calculateProductStats(DashboardStatsDto stats) {
        // Top selling products
        Map<Product, Long> productSales = orderRepository.findAll()
            .stream()
            .filter(o -> o.getStatus() == OrderStatus.DELIVERED)
            .flatMap(o -> o.getItems().stream())
            .collect(Collectors.groupingBy(
                OrderItem::getProduct,
                Collectors.summingLong(OrderItem::getQuantity)
            ));
        
        List<Map<String, Object>> topProducts = productSales.entrySet()
            .stream()
            .sorted(Map.Entry.<Product, Long>comparingByValue().reversed())
            .limit(10)
            .map(entry -> {
                Map<String, Object> productData = new HashMap<>();
                Product product = entry.getKey();
                productData.put("id", product.getId());
                productData.put("name", product.getName());
                productData.put("soldQuantity", entry.getValue());
                productData.put("revenue", BigDecimal.valueOf(product.getDisplayedPrice()).multiply(BigDecimal.valueOf(entry.getValue())));
                productData.put("supplier", product.getSupplier().getName());
                return productData;
            })
            .collect(Collectors.toList());
        
        stats.setTopSellingProducts(topProducts);
        
        // Category distribution
        Map<String, Long> categoryStats = productRepository.findAll()
            .stream()
            .filter(Product::getActive)
            .collect(Collectors.groupingBy(
                p -> p.getCategory() != null ? p.getCategory().getName() : "Uncategorized",
                Collectors.counting()
            ));
        
        stats.setCategoryDistribution(categoryStats.entrySet()
            .stream()
            .map(entry -> {
                Map<String, Object> categoryData = new HashMap<>();
                categoryData.put("category", entry.getKey());
                categoryData.put("productCount", entry.getValue());
                return categoryData;
            })
            .collect(Collectors.toList()));
    }
    
    // Helper methods
    private double calculateGrowthRate(long current, long previous) {
        if (previous == 0) return current > 0 ? 100.0 : 0.0;
        return ((double) (current - previous) / previous) * 100.0;
    }
    
    private double calculateGrowthRate(BigDecimal current, BigDecimal previous) {
        if (previous.equals(BigDecimal.ZERO)) {
            return current.compareTo(BigDecimal.ZERO) > 0 ? 100.0 : 0.0;
        }
        return current.subtract(previous)
            .divide(previous, 4, java.math.RoundingMode.HALF_UP)
            .multiply(BigDecimal.valueOf(100))
            .doubleValue();
    }
    
    private Map<String, Object> orderToMap(Order order) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", order.getId());
        map.put("clientName", order.getClient().getUsername());
        map.put("totalAmount", order.getTotal());
        map.put("status", order.getStatus().toString());
        map.put("createdAt", order.getOrderDate().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        map.put("itemCount", order.getItems().size());
        return map;
    }
    
    private Map<String, Object> productToMap(Product product) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", product.getId());
        map.put("name", product.getName());
        map.put("stock", product.getSyncedStock());
        map.put("supplier", product.getSupplier().getName());
        map.put("price", product.getDisplayedPrice());
        return map;
    }
    
    private Map<String, Object> paymentToMap(SupplierPayment payment) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", payment.getId());
        map.put("supplier", payment.getSupplier().getName());
        map.put("amount", payment.getAmount());
        map.put("dueDate", payment.getScheduledDate().format(DateTimeFormatter.ISO_LOCAL_DATE));
        map.put("description", payment.getDescription());
        return map;
    }
}
