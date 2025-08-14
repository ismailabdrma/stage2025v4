package com.example.stage2025.controller;

import com.example.stage2025.service.ShippingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/shipping")
@RequiredArgsConstructor
public class ShippingController {

    private final ShippingService shippingService;

    private Long getClientId(Authentication auth) { return Long.valueOf(auth.getName()); }

    @PostMapping("/quote")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Map<String,Object>> getQuote(Authentication auth, @RequestBody Map<String, Object> payload) {
        Long clientId = getClientId(auth);
        Long addressId = ((Number) payload.get("addressId")).longValue();
        return ResponseEntity.ok(shippingService.getQuote(clientId, addressId));
    }

    @GetMapping("/tracking/{trackingNumber}")
    public ResponseEntity<Map<String,Object>> track(@PathVariable String trackingNumber) {
        return ResponseEntity.ok(shippingService.getTracking(trackingNumber));
    }
}






