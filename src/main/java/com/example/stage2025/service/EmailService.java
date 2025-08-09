package com.example.stage2025.service;

import com.example.stage2025.entity.Supplier;
import com.example.stage2025.entity.User;
import com.example.stage2025.entity.Order;

public interface EmailService {
    
    // User email notifications
    void sendWelcomeEmail(User user);
    void sendEmailVerificationOTP(String email, String otp);
    void sendPasswordResetOTP(String email, String otp);
    void sendOrderConfirmation(User user, Order order);
    
    // Supplier email notifications (external suppliers, not user accounts)
    void sendSupplierOrderNotification(Supplier supplier, Order order);
    void sendSupplierPaymentRequest(Supplier supplier, Order order, String paymentDetails);
    
    // Admin notifications
    void sendAdminNewOrderNotification(Order order);
    void sendAdminNewSupplierNotification(Supplier supplier);
}