package com.example.stage2025.service.impl;

import com.example.stage2025.entity.*;
import com.example.stage2025.service.EmailService;
import com.example.stage2025.enums.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.email.from}")
    private String fromEmail;

    @Override
    public void sendOtpEmail(String toEmail, String otp, String purpose) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Your OTP Code - Stage2025");
            message.setText("Your OTP code for " + purpose + " is: " + otp + "\n\nThis code will expire in 10 minutes.");
            
            mailSender.send(message);
            log.info("OTP email sent successfully to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send OTP email to {}: {}", toEmail, e.getMessage());
            throw new RuntimeException("Failed to send OTP email", e);
        }
    }

    @Override
    public void sendAdminNewSupplierNotification(Supplier supplier) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo("admin@stage2025.com");
            message.setSubject("New Supplier Configuration - " + supplier.getName());
            message.setText("A new supplier has been configured:\n\n" +
                    "Name: " + supplier.getName() + "\n" +
                    "Type: " + supplier.getClass().getSimpleName() + "\n" +
                    "Contact: " + supplier.getContactEmail() + "\n" +
                    "Status: " + (supplier.isActive() ? "Active" : "Inactive"));
            
            mailSender.send(message);
            log.info("Admin notification sent for new supplier: {}", supplier.getName());
        } catch (Exception e) {
            log.error("Failed to send admin notification for supplier {}: {}", supplier.getName(), e.getMessage());
        }
    }

    @Override
    public void sendOrderConfirmation(Client client, Order order) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(client.getEmail());
            message.setSubject("Order Confirmation - Order #" + order.getId());
            message.setText("Dear " + client.getFirstName() + ",\n\n" +
                    "Your order #" + order.getId() + " has been confirmed.\n" +
                    "Total Amount: €" + order.getTotalAmount() + "\n" +
                    "Status: " + order.getStatus() + "\n\n" +
                    "Thank you for your order!");
            
            mailSender.send(message);
            log.info("Order confirmation sent to: {}", client.getEmail());
        } catch (Exception e) {
            log.error("Failed to send order confirmation to {}: {}", client.getEmail(), e.getMessage());
        }
    }

    @Override
    public void sendAdminNewOrderNotification(Order order) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo("admin@stage2025.com");
            message.setSubject("New Order Received - #" + order.getId());
            message.setText("A new order has been received:\n\n" +
                    "Order ID: " + order.getId() + "\n" +
                    "Customer: " + order.getClient().getFirstName() + " " + order.getClient().getLastName() + "\n" +
                    "Total Amount: €" + order.getTotalAmount() + "\n" +
                    "Status: " + order.getStatus());
            
            mailSender.send(message);
            log.info("Admin notification sent for new order: {}", order.getId());
        } catch (Exception e) {
            log.error("Failed to send admin notification for order {}: {}", order.getId(), e.getMessage());
        }
    }

    @Override
    public void sendSupplierOrderNotification(Supplier supplier, Order order) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(supplier.getContactEmail());
            message.setSubject("New Order - Order #" + order.getId());
            message.setText("Dear " + supplier.getName() + ",\n\n" +
                    "A new order has been placed that includes your products:\n\n" +
                    "Order ID: " + order.getId() + "\n" +
                    "Total Amount: €" + order.getTotalAmount() + "\n" +
                    "Please prepare the items for shipment.");
            
            mailSender.send(message);
            log.info("Supplier notification sent to: {}", supplier.getContactEmail());
        } catch (Exception e) {
            log.error("Failed to send supplier notification to {}: {}", supplier.getContactEmail(), e.getMessage());
        }
    }

    @Override
    public void sendEmailVerificationOTP(String email, String otp) {
        sendOtpEmail(email, otp, "email verification");
    }

    @Override
    public void sendUserSuspensionNotification(User user, String reason) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(user.getEmail());
            message.setSubject("Account Suspended - Stage2025");
            message.setText("Dear " + user.getFirstName() + ",\n\n" +
                    "Your account has been suspended.\n" +
                    "Reason: " + reason + "\n\n" +
                    "Please contact support for assistance.");
            
            mailSender.send(message);
            log.info("Suspension notification sent to: {}", user.getEmail());
        } catch (Exception e) {
            log.error("Failed to send suspension notification to {}: {}", user.getEmail(), e.getMessage());
        }
    }

    @Override
    public void sendUserReactivationNotification(User user) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(user.getEmail());
            message.setSubject("Account Reactivated - Stage2025");
            message.setText("Dear " + user.getFirstName() + ",\n\n" +
                    "Your account has been reactivated.\n" +
                    "You can now access all features again.\n\n" +
                    "Welcome back!");
            
            mailSender.send(message);
            log.info("Reactivation notification sent to: {}", user.getEmail());
        } catch (Exception e) {
            log.error("Failed to send reactivation notification to {}: {}", user.getEmail(), e.getMessage());
        }
    }

    @Override
    public void sendRoleChangeNotification(User user, Role oldRole, Role newRole) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(user.getEmail());
            message.setSubject("Role Updated - Stage2025");
            message.setText("Dear " + user.getFirstName() + ",\n\n" +
                    "Your role has been updated from " + oldRole + " to " + newRole + ".\n\n" +
                    "Your access permissions have been adjusted accordingly.");
            
            mailSender.send(message);
            log.info("Role change notification sent to: {}", user.getEmail());
        } catch (Exception e) {
            log.error("Failed to send role change notification to {}: {}", user.getEmail(), e.getMessage());
        }
    }

    @Override
    public void sendPasswordResetByAdmin(User user, String newPassword) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(user.getEmail());
            message.setSubject("Password Reset - Stage2025");
            message.setText("Dear " + user.getFirstName() + ",\n\n" +
                    "Your password has been reset by an administrator.\n" +
                    "Your new temporary password is: " + newPassword + "\n\n" +
                    "Please change this password after logging in.");
            
            mailSender.send(message);
            log.info("Password reset notification sent to: {}", user.getEmail());
        } catch (Exception e) {
            log.error("Failed to send password reset notification to {}: {}", user.getEmail(), e.getMessage());
        }
    }

    @Override
    public void sendForcePasswordChangeNotification(User user) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(user.getEmail());
            message.setSubject("Password Change Required - Stage2025");
            message.setText("Dear " + user.getFirstName() + ",\n\n" +
                    "You are required to change your password on your next login.\n" +
                    "This is for security purposes.\n\n" +
                    "Please log in and update your password.");
            
            mailSender.send(message);
            log.info("Force password change notification sent to: {}", user.getEmail());
        } catch (Exception e) {
            log.error("Failed to send force password change notification to {}: {}", user.getEmail(), e.getMessage());
        }
    }

    @Override
    public void sendSupplierPaymentRequest(Supplier supplier, Order order, String message) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(fromEmail);
            mailMessage.setTo(supplier.getContactEmail());
            mailMessage.setSubject("Payment Request - Order #" + order.getId());
            mailMessage.setText("Dear " + supplier.getName() + ",\n\n" +
                    "Payment is requested for order #" + order.getId() + ".\n\n" +
                    "Message: " + message + "\n\n" +
                    "Please process the payment at your earliest convenience.");
            
            mailSender.send(mailMessage);
            log.info("Payment request sent to supplier: {}", supplier.getContactEmail());
        } catch (Exception e) {
            log.error("Failed to send payment request to supplier {}: {}", supplier.getContactEmail(), e.getMessage());
        }
    }
}