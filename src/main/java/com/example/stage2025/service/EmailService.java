package com.example.stage2025.service;

import com.example.stage2025.entity.*;
import com.example.stage2025.enums.Role;

public interface EmailService {
    void sendOtpEmail(String toEmail, String otp, String purpose);
    void sendAdminNewSupplierNotification(Supplier supplier);
    
    // Order-related emails
    void sendOrderConfirmation(Client client, Order order);
    void sendAdminNewOrderNotification(Order order);
    void sendSupplierOrderNotification(Supplier supplier, Order order);
    
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
}