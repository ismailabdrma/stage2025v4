package com.example.stage2025.controller;

import com.example.stage2025.dto.SupplierPaymentDto;
import com.example.stage2025.service.SupplierPaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

/**
 * Handles supplier payout management (admin only).
 */
@RestController
@RequestMapping("/api/suppliers/payments")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class SupplierPaymentController {

    private final SupplierPaymentService supplierPaymentService;
    private final WebClient.Builder webClientBuilder;

    /**
     * List all supplier payments (admin only)
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SupplierPaymentDto>> getAll() {
        return ResponseEntity.ok(supplierPaymentService.getAllPayments());
    }

    /**
     * List payments by supplier ID (admin only)
     */
    @GetMapping("/supplier/{supplierId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SupplierPaymentDto>> getBySupplier(@PathVariable Long supplierId) {
        return ResponseEntity.ok(supplierPaymentService.getPaymentsBySupplier(supplierId));
    }

    /**
     * Get a specific supplier payment by ID (admin only)
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SupplierPaymentDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(supplierPaymentService.getPaymentById(id));
    }

    /**
     * Create a new manual supplier payout (admin only)
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SupplierPaymentDto> create(@RequestBody SupplierPaymentDto dto) {
        return ResponseEntity.ok(supplierPaymentService.createPayment(dto));
    }

    @PostMapping("/forward")
    public ResponseEntity<Map<String, Object>> forwardPaymentToSupplier(
            @RequestParam String supplierApiUrl,
            @RequestBody Map<String, Object> payload,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        try {
            WebClient client = webClientBuilder.build();

            WebClient.RequestBodySpec request = client.post().uri(supplierApiUrl)
                    .header("Content-Type", "application/json");
            if (authHeader != null) {
                request = request.header("Authorization", authHeader);
            }

            Map<String, Object> response = request
                    .bodyValue(payload)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Supplier payment forwarding failed: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }
}
