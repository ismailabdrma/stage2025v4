package com.example.stage2025.controller;

import com.example.stage2025.entity.ShippingFee;
import com.example.stage2025.service.ShippingFeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/shipping-fees")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
public class AdminShippingFeeController {
    
    private final ShippingFeeService shippingFeeService;
    
    /**
     * Get all shipping fees (admin only)
     */
    @GetMapping
    public ResponseEntity<List<ShippingFee>> getAllShippingFees() {
        log.info("Admin requesting all shipping fees");
        List<ShippingFee> fees = shippingFeeService.getAllActiveShippingFees();
        return ResponseEntity.ok(fees);
    }
    
    /**
     * Get shipping fees by country
     */
    @GetMapping("/country/{countryCode}")
    public ResponseEntity<List<ShippingFee>> getShippingFeesByCountry(@PathVariable String countryCode) {
        log.info("Admin requesting shipping fees for country: {}", countryCode);
        List<ShippingFee> fees = shippingFeeService.getShippingFeesByCountry(countryCode);
        return ResponseEntity.ok(fees);
    }
    
    /**
     * Get shipping fee by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ShippingFee> getShippingFeeById(@PathVariable Long id) {
        log.info("Admin requesting shipping fee with ID: {}", id);
        return shippingFeeService.getShippingFeeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Create new shipping fee
     */
    @PostMapping
    public ResponseEntity<ShippingFee> createShippingFee(@RequestBody ShippingFee shippingFee) {
        log.info("Admin creating new shipping fee for country: {} {}", 
                shippingFee.getCountryCode(), shippingFee.getCountryName());
        
        try {
            ShippingFee created = shippingFeeService.createShippingFee(shippingFee);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            log.error("Error creating shipping fee: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Update existing shipping fee
     */
    @PutMapping("/{id}")
    public ResponseEntity<ShippingFee> updateShippingFee(@PathVariable Long id, @RequestBody ShippingFee shippingFee) {
        log.info("Admin updating shipping fee with ID: {}", id);
        
        try {
            ShippingFee updated = shippingFeeService.updateShippingFee(id, shippingFee);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            log.error("Error updating shipping fee: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Delete shipping fee
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShippingFee(@PathVariable Long id) {
        log.info("Admin deleting shipping fee with ID: {}", id);
        
        try {
            shippingFeeService.deleteShippingFee(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            log.error("Error deleting shipping fee: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Toggle shipping fee active status
     */
    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<ShippingFee> toggleShippingFeeStatus(@PathVariable Long id) {
        log.info("Admin toggling shipping fee status for ID: {}", id);
        
        try {
            ShippingFee updated = shippingFeeService.toggleShippingFeeStatus(id);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            log.error("Error toggling shipping fee status: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Initialize default shipping fees
     */
    @PostMapping("/initialize-defaults")
    public ResponseEntity<Map<String, String>> initializeDefaultShippingFees() {
        log.info("Admin initializing default shipping fees");
        
        try {
            // Check if table exists first
            long countBefore = shippingFeeService.getTotalCount();
            log.info("Shipping fees count before initialization: {}", countBefore);
            
            shippingFeeService.initializeDefaultShippingFees();
            
            long countAfter = shippingFeeService.getTotalCount();
            log.info("Shipping fees count after initialization: {}", countAfter);
            
            return ResponseEntity.ok(Map.of(
                "message", "Default shipping fees initialized successfully",
                "countBefore", String.valueOf(countBefore),
                "countAfter", String.valueOf(countAfter)
            ));
        } catch (Exception e) {
            log.error("Error initializing default shipping fees: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to initialize default shipping fees: " + e.getMessage()));
        }
    }
    
    /**
     * Debug endpoint to check database contents
     */
    @GetMapping("/debug")
    public ResponseEntity<Map<String, Object>> debugShippingFees() {
        log.info("Debug endpoint called");
        
        long totalCount = shippingFeeService.getTotalCount();
        long moroccoCount = shippingFeeService.getMoroccoCount();
        List<ShippingFee> allFees = shippingFeeService.getAllActiveShippingFees();
        
        Map<String, Object> debugInfo = new HashMap<>();
        debugInfo.put("totalCount", totalCount);
        debugInfo.put("moroccoCount", moroccoCount);
        debugInfo.put("allFeesCount", allFees.size());
        debugInfo.put("feesByCountry", allFees.stream()
            .collect(Collectors.groupingBy(ShippingFee::getCountryCode, Collectors.counting())));
        
        return ResponseEntity.ok(debugInfo);
    }
    
    /**
     * Test shipping fee calculation
     */
    @PostMapping("/test-calculation")
    public ResponseEntity<Map<String, Object>> testShippingFeeCalculation(@RequestBody Map<String, Object> request) {
        String countryCode = (String) request.get("countryCode");
        String city = (String) request.get("city");
        String postalCode = (String) request.get("postalCode");
        BigDecimal orderAmount = new BigDecimal(request.get("orderAmount").toString());
        
        log.info("Admin testing shipping fee calculation for: {}, {}, {}, {}", 
                countryCode, city, postalCode, orderAmount);
        
        try {
            BigDecimal shippingFee = shippingFeeService.calculateShippingFee(countryCode, city, postalCode, orderAmount);
            boolean freeShippingAvailable = shippingFeeService.isFreeShippingAvailable(countryCode, orderAmount);
            Integer deliveryTime = shippingFeeService.getDeliveryTimeEstimate(countryCode, city, postalCode);
            
            Map<String, Object> result = Map.of(
                "countryCode", countryCode,
                "city", city,
                "postalCode", postalCode,
                "orderAmount", orderAmount,
                "shippingFee", shippingFee,
                "freeShippingAvailable", freeShippingAvailable,
                "deliveryTimeDays", deliveryTime
            );
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Error testing shipping fee calculation: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    /**
     * Get shipping fee statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getShippingFeeStatistics() {
        log.info("Admin requesting shipping fee statistics");
        
        List<ShippingFee> allFees = shippingFeeService.getAllActiveShippingFees();
        
        long totalFees = allFees.size();
        long activeFees = allFees.stream().filter(ShippingFee::getIsActive).count();
        long inactiveFees = totalFees - activeFees;
        
        // Count by currency
        long eurFees = allFees.stream().filter(f -> "EUR".equals(f.getCurrency())).count();
        long madFees = allFees.stream().filter(f -> "MAD".equals(f.getCurrency())).count();
        long usdFees = allFees.stream().filter(f -> "USD".equals(f.getCurrency())).count();
        
        // Count by country
        long moroccoFees = allFees.stream().filter(f -> "MA".equals(f.getCountryCode())).count();
        long franceFees = allFees.stream().filter(f -> "FR".equals(f.getCountryCode())).count();
        long otherFees = totalFees - moroccoFees - franceFees;
        
        Map<String, Object> stats = Map.of(
            "totalFees", totalFees,
            "activeFees", activeFees,
            "inactiveFees", inactiveFees,
            "byCurrency", Map.of(
                "EUR", eurFees,
                "MAD", madFees,
                "USD", usdFees
            ),
            "byCountry", Map.of(
                "Morocco", moroccoFees,
                "France", franceFees,
                "Other", otherFees
            )
        );
        
        return ResponseEntity.ok(stats);
    }
}

