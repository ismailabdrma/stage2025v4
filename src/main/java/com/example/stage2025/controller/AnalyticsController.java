package com.example.stage2025.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@Slf4j
public class AnalyticsController {

    /** 1. Track analytics events */
    @PostMapping("/events")
    public ResponseEntity<Map<String, String>> trackEvent(@RequestBody Map<String, Object> event, Authentication auth) {
        try {
            // Extract event data
            String eventType = (String) event.get("type");
            String category = (String) event.get("category");
            String action = (String) event.get("action");
            String sessionId = (String) event.get("sessionId");
            String timestamp = (String) event.get("timestamp");
            
            // Add user ID if authenticated
            String userId = null;
            if (auth != null) {
                userId = auth.getName();
            }
            
            // Log the event (in production, save to database)
            log.info("Analytics Event - Type: {}, Category: {}, Action: {}, User: {}, Session: {}, Time: {}", 
                    eventType, category, action, userId, sessionId, timestamp);
            
            // Log metadata if present
            if (event.containsKey("metadata")) {
                @SuppressWarnings("unchecked")
                Map<String, Object> metadata = (Map<String, Object>) event.get("metadata");
                log.debug("Event metadata: {}", metadata);
            }
            
            return ResponseEntity.ok(Map.of("status", "tracked"));
            
        } catch (Exception e) {
            log.error("Failed to track analytics event: {}", e.getMessage());
            return ResponseEntity.ok(Map.of("status", "error", "message", "Event tracking failed"));
        }
    }

    /** 2. Get analytics dashboard data (admin only) */
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardData(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) String eventType,
            @RequestParam(required = false) String category) {
        
        // Mock analytics data - in production, query from database
        Map<String, Object> dashboardData = Map.of(
            "overview", Map.of(
                "totalEvents", 15420,
                "uniqueUsers", 2847,
                "activeSessions", 184,
                "conversionRate", 2.8
            ),
            "events", Map.of(
                "page_views", 8942,
                "product_views", 3847,
                "add_to_cart", 1205,
                "purchases", 127
            ),
            "topProducts", List.of(
                Map.of("id", 1, "name", "Laptop Dell", "views", 842, "conversions", 23),
                Map.of("id", 2, "name", "iPhone 15", "views", 734, "conversions", 31),
                Map.of("id", 3, "name", "MacBook Pro", "views", 623, "conversions", 18)
            ),
            "conversionFunnel", Map.of(
                "product_view", 3847,
                "add_to_cart", 1205,
                "begin_checkout", 445,
                "purchase", 127
            ),
            "timeSeriesData", generateTimeSeriesData()
        );
        
        return ResponseEntity.ok(dashboardData);
    }

    /** 3. Get popular search terms */
    @GetMapping("/popular-searches")
    public ResponseEntity<List<String>> getPopularSearches() {
        List<String> popularSearches = List.of(
            "smartphone",
            "laptop",
            "casque audio",
            "montre connectée",
            "tablette",
            "appareil photo",
            "écouteurs",
            "chargeur",
            "coque téléphone",
            "accessoires"
        );
        
        return ResponseEntity.ok(popularSearches);
    }

    /** 4. Track search analytics */
    @PostMapping("/search")
    public ResponseEntity<Map<String, String>> trackSearch(@RequestBody Map<String, Object> searchData) {
        String query = (String) searchData.get("query");
        Integer resultsCount = (Integer) searchData.get("resultsCount");
        String timestamp = (String) searchData.get("timestamp");
        
        log.info("Search Analytics - Query: '{}', Results: {}, Time: {}", query, resultsCount, timestamp);
        
        return ResponseEntity.ok(Map.of("status", "tracked"));
    }

    /** 5. Get real-time analytics */
    @GetMapping("/realtime")
    public ResponseEntity<Map<String, Object>> getRealtimeAnalytics() {
        Map<String, Object> realtimeData = Map.of(
            "activeUsers", 184,
            "pageViews", 47,
            "events", Map.of(
                "page_view", 23,
                "product_view", 12,
                "add_to_cart", 5,
                "purchase", 2
            ),
            "topPages", List.of(
                Map.of("path", "/products", "users", 34),
                Map.of("path", "/", "users", 28),
                Map.of("path", "/products/123", "users", 19)
            ),
            "deviceTypes", Map.of(
                "desktop", 98,
                "mobile", 73,
                "tablet", 13
            ),
            "countries", Map.of(
                "France", 156,
                "Belgium", 18,
                "Switzerland", 10
            )
        );
        
        return ResponseEntity.ok(realtimeData);
    }

    // Helper method to generate mock time series data
    private List<Map<String, Object>> generateTimeSeriesData() {
        List<Map<String, Object>> data = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        
        for (int i = 23; i >= 0; i--) {
            LocalDateTime time = now.minusHours(i);
            data.add(Map.of(
                "timestamp", time.toString(),
                "pageViews", 150 + (int)(Math.random() * 100),
                "sessions", 45 + (int)(Math.random() * 30),
                "conversions", 2 + (int)(Math.random() * 8)
            ));
        }
        
        return data;
    }
}