package com.example.stage2025.service;

import com.example.stage2025.entity.*;
import com.example.stage2025.enums.Role;
import com.example.stage2025.entity.Order;
import com.example.stage2025.entity.OrderItem;

import java.util.List;

public interface EmailService {
    void sendOtpEmail(String toEmail, String otp, String purpose);
    void sendAdminNewSupplierNotification(Supplier supplier);
    
    // Order-related emails
    void sendOrderConfirmationEmail(String clientEmail, Order order);
    void sendAdminNewOrderNotification(Order order);
    void sendSupplierOrderNotification(Supplier supplier, Order order);
    void sendSupplierOrderSummary(String supplierEmail, Order order, List<OrderItem> items);
    
    // OTP and verification emails
    void sendEmailVerificationOTP(String email, String otp);
    
    // User management emails
    void sendUserSuspensionNotification(User user, String reason);
    void sendUserReactivationNotification(User user);
    void sendRoleChangeNotification(User user, Role oldRole, Role newRole);
    void sendPasswordResetByAdmin(User user, String newPassword);
    void sendForcePasswordChangeNotification(User user);
    
    // Supplier payment emails
    void sendSupplierPaymentRequest(Supplier supplier, Order order, String message);
    
    // Commission reminder emails
    void sendCommissionReminder(Supplier supplier, SupplierCommission commission);
    void sendCommissionOverdueReminder(Supplier supplier, SupplierCommission commission);
    void sendCommissionPaidConfirmation(Supplier supplier, SupplierCommission commission);
    
    // Order summary emails
    void sendOrderSummaryToClient(Client client, Order order, String paymentMethod);
    void sendOrderSummaryToSupplier(Supplier supplier, Order order, boolean isSupplierPayment, Double commissionAmount);
    
    // Generic email method
    void sendEmail(String toEmail, String subject, String content);
    
    // Order confirmation method
    void sendOrderConfirmation(Client client, Order order);
}