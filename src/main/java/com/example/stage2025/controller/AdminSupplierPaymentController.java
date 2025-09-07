package com.example.stage2025.controller;

import com.example.stage2025.dto.SupplierPaymentDto;
import com.example.stage2025.dto.SupplierPaymentSummaryDto;
import com.example.stage2025.enums.PaymentStatus;
import com.example.stage2025.service.SupplierPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/supplier-payments")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminSupplierPaymentController {

    private final SupplierPaymentService supplierPaymentService;

    // Dashboard Overview
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getPaymentDashboard() {
        Map<String, Object> dashboard = supplierPaymentService.getDashboard();
        return ResponseEntity.ok(dashboard);
    }

    // Get all payments with filters
    @GetMapping
    public ResponseEntity<List<SupplierPaymentDto>> getAllPayments(
            @RequestParam(required = false) Long supplierId,
            @RequestParam(required = false) PaymentStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        
        List<SupplierPaymentDto> payments;
        
        if (supplierId != null) {
            payments = supplierPaymentService.getPaymentsBySupplier(supplierId);
        } else if (status != null) {
            payments = supplierPaymentService.getPaymentsByStatus(status);
        } else if (startDate != null && endDate != null) {
            payments = supplierPaymentService.getPaymentsByDateRange(startDate, endDate);
        } else {
            payments = supplierPaymentService.getAllPayments(); // Default to all payments
        }
        
        return ResponseEntity.ok(payments);
    }

    // Get payment by ID
    @GetMapping("/{paymentId}")
    public ResponseEntity<SupplierPaymentDto> getPayment(@PathVariable Long paymentId) {
        SupplierPaymentDto dto = supplierPaymentService.getPaymentById(paymentId);
        return ResponseEntity.ok(dto);
    }

    // Process immediate payment
    @PostMapping("/{paymentId}/process")
    public ResponseEntity<SupplierPaymentDto> processPayment(
            @PathVariable Long paymentId,
            @RequestBody ProcessPaymentRequest request) {
        // Admin id is optional; service will record it if provided elsewhere
        SupplierPaymentDto payment = supplierPaymentService.processImmediatePayment(paymentId, null, request);
        return ResponseEntity.ok(payment);
    }

    // Confirm payment
    @PostMapping("/{paymentId}/confirm")
    public ResponseEntity<SupplierPaymentDto> confirmPayment(
            @PathVariable Long paymentId,
            @RequestBody ConfirmPaymentRequest request) {
        SupplierPaymentDto payment = supplierPaymentService.confirmPayment(paymentId, request.notes(), null);
        return ResponseEntity.ok(payment);
    }

    // Update payment status
    @PutMapping("/{paymentId}/status")
    public ResponseEntity<SupplierPaymentDto> updatePaymentStatus(
            @PathVariable Long paymentId,
            @RequestBody UpdatePaymentStatusRequest request) {
        SupplierPaymentDto payment = supplierPaymentService.updatePaymentStatus(
            paymentId, request.status(), request.notes(), null);
        return ResponseEntity.ok(payment);
    }

    // Cancel payment
    @PostMapping("/{paymentId}/cancel")
    public ResponseEntity<SupplierPaymentDto> cancelPayment(
            @PathVariable Long paymentId,
            @RequestBody CancelPaymentRequest request) {
        SupplierPaymentDto payment = supplierPaymentService.cancelPayment(
            paymentId, request.reason(), null);
        return ResponseEntity.ok(payment);
    }

    // Get supplier payment summary
    @GetMapping("/suppliers/{supplierId}/summary")
    public ResponseEntity<SupplierPaymentSummaryDto> getSupplierSummary(@PathVariable Long supplierId) {
        SupplierPaymentSummaryDto summary = supplierPaymentService.getSupplierPaymentSummary(supplierId);
        return ResponseEntity.ok(summary);
    }

    // Get all supplier summaries
    @GetMapping("/suppliers/summaries")
    public ResponseEntity<List<SupplierPaymentSummaryDto>> getAllSupplierSummaries() {
        List<SupplierPaymentSummaryDto> summaries = supplierPaymentService.getAllSupplierSummaries();
        return ResponseEntity.ok(summaries);
    }

    // Process scheduled payments (manual trigger)
    @PostMapping("/process-scheduled")
    public ResponseEntity<List<SupplierPaymentDto>> processScheduledPayments() {
        List<SupplierPaymentDto> processedPayments = supplierPaymentService.processScheduledPayments();
        return ResponseEntity.ok(processedPayments);
    }

    // Create weekly batch payments
    @PostMapping("/batch/weekly")
    public ResponseEntity<List<SupplierPaymentDto>> createWeeklyPayments() {
        List<SupplierPaymentDto> payments = supplierPaymentService.createWeeklyPayments();
        return ResponseEntity.ok(payments);
    }

    // Create monthly batch payments
    @PostMapping("/batch/monthly")
    public ResponseEntity<List<SupplierPaymentDto>> createMonthlyPayments() {
        List<SupplierPaymentDto> payments = supplierPaymentService.createMonthlyPayments();
        return ResponseEntity.ok(payments);
    }

    // Get payment audit history
    @GetMapping("/{paymentId}/history")
    public ResponseEntity<List<SupplierPaymentDto>> getPaymentHistory(@PathVariable Long paymentId) {
        List<SupplierPaymentDto> history = supplierPaymentService.getPaymentHistory(paymentId);
        return ResponseEntity.ok(history);
    }

    // DTOs for requests
    public record UpdatePaymentStatusRequest(PaymentStatus status, String notes) {}
    public record CancelPaymentRequest(String reason) {}
    public record ProcessPaymentRequest(String paymentMethod, String paymentReference, String processingNotes, Boolean confirmed) {}
    public record ConfirmPaymentRequest(String notes) {}

    // Payment Statistics endpoint
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getPaymentStatistics(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        
        // This would calculate comprehensive statistics
        Map<String, Object> stats = Map.of(
            "totalPayments", 0,
            "totalAmount", 0.0,
            "totalCommission", 0.0,
            "averagePaymentAmount", 0.0,
            "paymentsByStatus", Map.of(
                "PENDING", 0,
                "PAID", 0,
                "FAILED", 0
            ),
            "topSuppliers", List.of(),
            "monthlyTrends", List.of()
        );
        
        return ResponseEntity.ok(stats);
    }
}
