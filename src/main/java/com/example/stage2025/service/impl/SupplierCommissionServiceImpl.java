package com.example.stage2025.service.impl;

import com.example.stage2025.entity.SupplierCommission;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.entity.Order;
import com.example.stage2025.enums.CommissionStatus;
import com.example.stage2025.repository.SupplierCommissionRepository;
import com.example.stage2025.service.SupplierCommissionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.example.stage2025.service.EmailService;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SupplierCommissionServiceImpl implements SupplierCommissionService {
    
    private final SupplierCommissionRepository commissionRepository;
    private final EmailService emailService;
    
    @Override
    public SupplierCommission createCommission(Supplier supplier, Order order, Double commissionAmount, 
                                            Double displayPrice, Double supplierPrice) {
        try {
            log.info("Creating commission record: Supplier={}, Order={}, Commission={}, Display={}, Supplier={}", 
                    supplier.getName(), order.getId(), commissionAmount, displayPrice, supplierPrice);
            
            SupplierCommission commission = SupplierCommission.builder()
                    .supplier(supplier)
                    .order(order)
                    .commissionAmount(commissionAmount)
                    .displayPrice(displayPrice)
                    .supplierPrice(supplierPrice)
                    .status(CommissionStatus.PENDING)
                    .dueDate(LocalDateTime.now().plusDays(30)) // 30 days to pay
                    .build();
            
            SupplierCommission saved = commissionRepository.save(commission);
            log.info("Commission record created: ID={}, Amount={}", saved.getId(), saved.getCommissionAmount());
            
            return saved;
            
        } catch (Exception e) {
            log.error("Error creating commission record: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to create commission record: " + e.getMessage());
        }
    }
    
    @Override
    public SupplierCommission updateCommissionStatus(Long commissionId, CommissionStatus status, String notes) {
        try {
            SupplierCommission commission = commissionRepository.findById(commissionId)
                    .orElseThrow(() -> new RuntimeException("Commission not found: " + commissionId));
            
            commission.setStatus(status);
            commission.setNotes(notes);
            commission.setUpdatedAt(LocalDateTime.now());
            
            SupplierCommission updated = commissionRepository.save(commission);
            log.info("Commission status updated: ID={}, Status={}", commissionId, status);
            
            return updated;
            
        } catch (Exception e) {
            log.error("Error updating commission status: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to update commission status: " + e.getMessage());
        }
    }
    
    @Override
    public SupplierCommission markCommissionAsPaid(Long commissionId, String paymentReference, String notes) {
        try {
            SupplierCommission commission = commissionRepository.findById(commissionId)
                    .orElseThrow(() -> new RuntimeException("Commission not found: " + commissionId));
            
            commission.setStatus(CommissionStatus.PAID);
            commission.setPaymentReference(paymentReference);
            commission.setPaidDate(LocalDateTime.now());
            commission.setNotes(notes);
            commission.setUpdatedAt(LocalDateTime.now());
            
            SupplierCommission updated = commissionRepository.save(commission);
            log.info("Commission marked as paid: ID={}, Reference={}", commissionId, paymentReference);
            
            // Send confirmation email to supplier
            emailService.sendCommissionPaidConfirmation(commission.getSupplier(), commission);
            
            return updated;
            
        } catch (Exception e) {
            log.error("Error marking commission as paid: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to mark commission as paid: " + e.getMessage());
        }
    }
    
    @Override
    public SupplierCommission invoiceSupplier(Long commissionId, LocalDateTime dueDate) {
        try {
            SupplierCommission commission = commissionRepository.findById(commissionId)
                    .orElseThrow(() -> new RuntimeException("Commission not found: " + commissionId));
            
            commission.setStatus(CommissionStatus.INVOICED);
            commission.setDueDate(dueDate);
            commission.setUpdatedAt(LocalDateTime.now());
            
            SupplierCommission updated = commissionRepository.save(commission);
            log.info("Commission invoiced: ID={}, Due Date={}", commissionId, dueDate);
            
            return updated;
            
        } catch (Exception e) {
            log.error("Error invoicing commission: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to invoice commission: " + e.getMessage());
        }
    }
    
    @Override
    public List<SupplierCommission> getCommissionsBySupplier(Long supplierId) {
        // This would need a supplier service to get the supplier entity
        // For now, return empty list
        log.info("Getting commissions for supplier: {}", supplierId);
        return List.of();
    }
    
    @Override
    public List<SupplierCommission> getCommissionsByStatus(CommissionStatus status) {
        return commissionRepository.findByStatus(status);
    }
    
    @Override
    public List<SupplierCommission> getPendingCommissions() {
        return commissionRepository.findByStatusIn(List.of(
            CommissionStatus.PENDING, 
            CommissionStatus.INVOICED, 
            CommissionStatus.OVERDUE
        ));
    }
    
    @Override
    public List<SupplierCommission> getOverdueCommissions() {
        return commissionRepository.findOverdueCommissions(LocalDateTime.now());
    }
    
    @Override
    public Double getTotalCommissionOwedBySupplier(Long supplierId) {
        // This would need a supplier service to get the supplier entity
        // For now, return 0
        log.info("Getting total commission owed by supplier: {}", supplierId);
        return 0.0;
    }
    
    @Override
    public Double getTotalCommissionOwed() {
        return commissionRepository.calculateTotalCommissionOwed();
    }
    
    @Override
    public Map<String, Object> getCommissionDashboard() {
        Map<String, Object> dashboard = new HashMap<>();
        
        try {
            Double totalOwed = getTotalCommissionOwed();
            List<SupplierCommission> pendingCommissions = getPendingCommissions();
            List<SupplierCommission> overdueCommissions = getOverdueCommissions();
            
            dashboard.put("totalCommissionOwed", totalOwed);
            dashboard.put("pendingCommissionsCount", pendingCommissions.size());
            dashboard.put("overdueCommissionsCount", overdueCommissions.size());
            dashboard.put("totalCommissions", commissionRepository.count());
            
            log.info("Commission dashboard generated: Total owed={}, Pending={}, Overdue={}", 
                    totalOwed, pendingCommissions.size(), overdueCommissions.size());
            
        } catch (Exception e) {
            log.error("Error generating commission dashboard: {}", e.getMessage(), e);
            dashboard.put("error", e.getMessage());
        }
        
        return dashboard;
    }
    
    @Override
    public Map<String, Object> getCommissionStatistics(LocalDateTime startDate, LocalDateTime endDate) {
        Map<String, Object> stats = new HashMap<>();
        
        try {
            List<SupplierCommission> commissions = commissionRepository.findByCreatedAtBetween(startDate, endDate);
            
            Double totalCommission = commissions.stream()
                    .mapToDouble(SupplierCommission::getCommissionAmount)
                    .sum();
            
            Long paidCount = commissions.stream()
                    .filter(c -> c.getStatus() == CommissionStatus.PAID)
                    .count();
            
            Long pendingCount = commissions.stream()
                    .filter(c -> c.getStatus() == CommissionStatus.PENDING)
                    .count();
            
            stats.put("totalCommission", totalCommission);
            stats.put("paidCount", paidCount);
            stats.put("pendingCount", pendingCount);
            stats.put("totalCount", commissions.size());
            
            log.info("Commission statistics generated: Total={}, Paid={}, Pending={}", 
                    totalCommission, paidCount, pendingCount);
            
        } catch (Exception e) {
            log.error("Error generating commission statistics: {}", e.getMessage(), e);
            stats.put("error", e.getMessage());
        }
        
        return stats;
    }
    
    @Override
    public List<SupplierCommission> processOverdueCommissions() {
        try {
            List<SupplierCommission> overdueCommissions = getOverdueCommissions();
            
            for (SupplierCommission commission : overdueCommissions) {
                commission.setStatus(CommissionStatus.OVERDUE);
                commission.setUpdatedAt(LocalDateTime.now());
                commissionRepository.save(commission);
            }
            
            log.info("Processed {} overdue commissions", overdueCommissions.size());
            return overdueCommissions;
            
        } catch (Exception e) {
            log.error("Error processing overdue commissions: {}", e.getMessage(), e);
            return List.of();
        }
    }
    
    @Override
    public void sendPaymentReminders() {
        try {
            List<SupplierCommission> overdueCommissions = getOverdueCommissions();
            
            for (SupplierCommission commission : overdueCommissions) {
                // Send overdue reminder email
                emailService.sendCommissionOverdueReminder(commission.getSupplier(), commission);
                log.info("Payment reminder sent for overdue commission: ID={}, Supplier={}, Amount={}", 
                        commission.getId(), commission.getSupplier().getName(), commission.getCommissionAmount());
            }
            
            log.info("Sent payment reminders for {} overdue commissions", overdueCommissions.size());
            
        } catch (Exception e) {
            log.error("Error sending payment reminders: {}", e.getMessage(), e);
        }
    }
    
    @Override
    public SupplierCommission getCommissionById(Long commissionId) {
        return commissionRepository.findById(commissionId)
                .orElseThrow(() -> new RuntimeException("Commission not found: " + commissionId));
    }
    
    @Override
    public List<SupplierCommission> getAllCommissions() {
        return commissionRepository.findAll();
    }
} 