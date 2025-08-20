package com.example.stage2025.controller;

import com.example.stage2025.entity.SupplierCommission;
import com.example.stage2025.enums.CommissionStatus;
import com.example.stage2025.service.SupplierCommissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/commissions")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminCommissionController {

    private final SupplierCommissionService commissionService;

    // Dashboard Overview
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getCommissionDashboard() {
        Map<String, Object> dashboard = commissionService.getCommissionDashboard();
        return ResponseEntity.ok(dashboard);
    }

    // Get all commissions with filters
    @GetMapping
    public ResponseEntity<List<SupplierCommission>> getAllCommissions(
            @RequestParam(required = false) Long supplierId,
            @RequestParam(required = false) CommissionStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        
        List<SupplierCommission> commissions;
        
        if (supplierId != null) {
            commissions = commissionService.getCommissionsBySupplier(supplierId);
        } else if (status != null) {
            commissions = commissionService.getCommissionsByStatus(status);
        } else if (startDate != null && endDate != null) {
            Map<String, Object> stats = commissionService.getCommissionStatistics(startDate, endDate);
            // For now, return empty list - would need to implement date range query
            commissions = List.of();
        } else {
            commissions = commissionService.getAllCommissions();
        }
        
        return ResponseEntity.ok(commissions);
    }

    // Get commission by ID
    @GetMapping("/{commissionId}")
    public ResponseEntity<SupplierCommission> getCommission(@PathVariable Long commissionId) {
        SupplierCommission commission = commissionService.getCommissionById(commissionId);
        return ResponseEntity.ok(commission);
    }

    // Update commission status
    @PutMapping("/{commissionId}/status")
    public ResponseEntity<SupplierCommission> updateCommissionStatus(
            @PathVariable Long commissionId,
            @RequestBody UpdateCommissionStatusRequest request) {
        SupplierCommission commission = commissionService.updateCommissionStatus(
            commissionId, request.status(), request.notes());
        return ResponseEntity.ok(commission);
    }

    // Mark commission as paid
    @PostMapping("/{commissionId}/mark-paid")
    public ResponseEntity<SupplierCommission> markCommissionAsPaid(
            @PathVariable Long commissionId,
            @RequestBody MarkCommissionPaidRequest request) {
        SupplierCommission commission = commissionService.markCommissionAsPaid(
            commissionId, request.paymentReference(), request.notes());
        return ResponseEntity.ok(commission);
    }

    // Invoice supplier for commission
    @PostMapping("/{commissionId}/invoice")
    public ResponseEntity<SupplierCommission> invoiceSupplier(
            @PathVariable Long commissionId,
            @RequestBody InvoiceSupplierRequest request) {
        SupplierCommission commission = commissionService.invoiceSupplier(
            commissionId, request.dueDate());
        return ResponseEntity.ok(commission);
    }

    // Get pending commissions (what suppliers owe us)
    @GetMapping("/pending")
    public ResponseEntity<List<SupplierCommission>> getPendingCommissions() {
        List<SupplierCommission> commissions = commissionService.getPendingCommissions();
        return ResponseEntity.ok(commissions);
    }

    // Get overdue commissions
    @GetMapping("/overdue")
    public ResponseEntity<List<SupplierCommission>> getOverdueCommissions() {
        List<SupplierCommission> commissions = commissionService.getOverdueCommissions();
        return ResponseEntity.ok(commissions);
    }

    // Process overdue commissions
    @PostMapping("/process-overdue")
    public ResponseEntity<List<SupplierCommission>> processOverdueCommissions() {
        List<SupplierCommission> processed = commissionService.processOverdueCommissions();
        return ResponseEntity.ok(processed);
    }

    // Send payment reminders
    @PostMapping("/send-reminders")
    public ResponseEntity<Map<String, String>> sendPaymentReminders() {
        commissionService.sendPaymentReminders();
        return ResponseEntity.ok(Map.of("message", "Payment reminders sent successfully"));
    }

    // Get commission statistics
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getCommissionStatistics(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        
        LocalDateTime start = startDate != null ? startDate : LocalDateTime.now().minusDays(30);
        LocalDateTime end = endDate != null ? endDate : LocalDateTime.now();
        
        Map<String, Object> stats = commissionService.getCommissionStatistics(start, end);
        return ResponseEntity.ok(stats);
    }

    // DTOs for requests
    public record UpdateCommissionStatusRequest(CommissionStatus status, String notes) {}
    public record MarkCommissionPaidRequest(String paymentReference, String notes) {}
    public record InvoiceSupplierRequest(LocalDateTime dueDate) {}
} 