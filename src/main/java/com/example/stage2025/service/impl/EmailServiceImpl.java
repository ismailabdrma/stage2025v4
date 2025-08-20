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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.email.from:noreply@stage2025.com}")
    private String fromEmail;
    @Value("${spring.mail.username:}")
    private String mailUsername;

    private String resolveFrom() {
        // Prefer the SMTP username to avoid provider rejection on 'From'
        if (mailUsername != null && !mailUsername.isBlank()) return mailUsername;
        return fromEmail;
    }
    
    @Override
    public void sendEmail(String toEmail, String subject, String content) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(resolveFrom());
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(content);
            
            mailSender.send(message);
            log.info("Email sent successfully to: {} with subject: {}", toEmail, subject);
        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", toEmail, e.getMessage());
            throw new RuntimeException("Failed to send email", e);
        }
    }

    @Override
    public void sendOtpEmail(String toEmail, String otp, String purpose) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(resolveFrom());
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
            message.setFrom(resolveFrom());
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

  
    public void sendOrderConfirmation(Client client, Order order) {
        try {
            StringBuilder body = new StringBuilder();
            body.append("Dear ").append(client.getFirstName() != null ? client.getFirstName() : client.getUsername()).append(",\n\n");
            body.append("Thank you for your order #").append(order.getOrderNumber() != null ? order.getOrderNumber() : order.getId()).append(".\n\n");

            // Items breakdown
            body.append("Items:\n");
            order.getItems().forEach(item -> {
                body.append(" - ")
                    .append(item.getProduct().getName())
                    .append(" x")
                    .append(item.getQuantity())
                    .append(" @ €")
                    .append(String.format("%.2f", item.getUnitPrice()))
                    .append(" = €")
                    .append(String.format("%.2f", item.getSubtotal()))
                    .append("\n");
            });

            body.append("\nSubtotal: €").append(String.format("%.2f", order.getSubtotal() != null ? order.getSubtotal() : 0.0)).append("\n");
            body.append("Shipping: €").append(String.format("%.2f", order.getShippingFee() != null ? order.getShippingFee() : 0.0)).append("\n");
            body.append("Total: €").append(String.format("%.2f", order.getTotal() != null ? order.getTotal() : 0.0)).append("\n");

            body.append("Payment Status: ").append(order.getStatus() != null ? order.getStatus().name() : "PENDING").append("\n");

            if (order.getDeliveryAddress() != null) {
                body.append("\nDelivery Address:\n");
                body.append(order.getDeliveryAddress().getStreet()).append("\n")
                    .append(order.getDeliveryAddress().getCity()).append(" ")
                    .append(order.getDeliveryAddress().getZipCode()).append("\n")
                    .append(order.getDeliveryAddress().getCountry()).append("\n");
            }

            body.append("\nWe will notify you when your order ships.\n");

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(resolveFrom());
            message.setTo(client.getEmail());
            message.setSubject("Order Confirmation - Order #" + (order.getOrderNumber() != null ? order.getOrderNumber() : order.getId()));
            message.setText(body.toString());
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
            message.setFrom(resolveFrom());
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
            StringBuilder body = new StringBuilder();
            body.append("Dear ").append(supplier.getName()).append(",\n\n");
            body.append("A new order #").append(order.getOrderNumber() != null ? order.getOrderNumber() : order.getId()).append(" includes your items.\n\n");

            // Items for this supplier
            double supplierTotal = 0.0;
            body.append("Your items:\n");
            for (var item : order.getItems()) {
                if (item.getProduct().getSupplier() != null && item.getProduct().getSupplier().getId().equals(supplier.getId())) {
                    // Avoid null checks: assume subtotal is calculated when creating order items
                    supplierTotal += item.getSubtotal();
                    body.append(" - ")
                        .append(item.getProduct().getName())
                        .append(" x")
                        .append(item.getQuantity())
                        .append(" @ €")
                        .append(String.format("%.2f", item.getUnitPrice()))
                        .append(" = €")
                        .append(String.format("%.2f", item.getSubtotal()))
                        .append("\n");
                }
            }

            body.append("\nSubtotal of your items: €").append(String.format("%.2f", supplierTotal)).append("\n");

            // Payment flow
            if (supplier.isHasOwnPaymentSystem()) {
                body.append("Payment flow: Supplier handles customer payment.\n");
                body.append("Commission owed to us will be calculated per agreement and notified separately.");
            } else {
                body.append("Payment flow: We handle customer payment.\n");
                body.append("Payout will follow your schedule: ")
                    .append(String.valueOf(supplier.getPayoutFrequency()))
                    .append(".\n");
            }

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(resolveFrom());
            message.setTo(supplier.getContactEmail());
            message.setSubject("New Order - Order #" + (order.getOrderNumber() != null ? order.getOrderNumber() : order.getId()));
            message.setText(body.toString());
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
            message.setFrom(resolveFrom());
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
            message.setFrom(resolveFrom());
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
            message.setFrom(resolveFrom());
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
            mailMessage.setFrom(resolveFrom());
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

    @Override
    public void sendOrderConfirmationEmail(String clientEmail, Order order) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(resolveFrom());
            message.setTo(clientEmail);
            message.setSubject("Order Confirmation - Order #" + order.getOrderNumber());
            
            StringBuilder body = new StringBuilder();
            body.append("Dear ").append(order.getClient().getFirstName() != null ? order.getClient().getFirstName() : order.getClient().getUsername()).append(",\n\n");
            body.append("Thank you for your order #").append(order.getOrderNumber() != null ? order.getOrderNumber() : order.getId()).append(".\n\n");

            // Items breakdown
            body.append("Items:\n");
            order.getItems().forEach(item -> body.append(" - ")
                .append(item.getProduct().getName())
                .append(" x")
                .append(item.getQuantity())
                .append(" @ €")
                .append(String.format("%.2f", item.getUnitPrice()))
                .append(" = €")
                .append(String.format("%.2f", item.getSubtotal()))
                .append("\n"));

            body.append("\nSubtotal: €").append(String.format("%.2f", order.getSubtotal() != null ? order.getSubtotal() : 0.0)).append("\n");
            body.append("Shipping: €").append(String.format("%.2f", order.getShippingFee() != null ? order.getShippingFee() : 0.0)).append("\n");
            body.append("Total: €").append(String.format("%.2f", order.getTotal() != null ? order.getTotal() : 0.0)).append("\n");

            body.append("Payment Status: ").append(order.getStatus() != null ? order.getStatus().name() : "PENDING").append("\n");

            if (order.getDeliveryAddress() != null) {
                body.append("\nDelivery Address:\n");
                body.append(order.getDeliveryAddress().getStreet()).append("\n")
                    .append(order.getDeliveryAddress().getCity()).append(" ")
                    .append(order.getDeliveryAddress().getZipCode()).append("\n")
                    .append(order.getDeliveryAddress().getCountry()).append("\n");
            }

            body.append("\nWe will notify you when your order ships.\n");

            message.setText(body.toString());
            mailSender.send(message);
            log.info("Order confirmation email sent successfully to: {}", clientEmail);
        } catch (Exception e) {
            log.error("Failed to send order confirmation email to {}: {}", clientEmail, e.getMessage());
        }
    }

    @Override
    public void sendSupplierOrderSummary(String supplierEmail, Order order, List<OrderItem> items) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(resolveFrom());
        message.setTo(supplierEmail);
        message.setSubject("New Order Summary - Order #" + order.getOrderNumber());
        
        StringBuilder body = new StringBuilder();
        body.append("You have received a new order. Order details:\n\n");
        body.append("Order Number: ").append(order.getOrderNumber()).append("\n");
        body.append("Order Date: ").append(order.getOrderDate()).append("\n\n");
        body.append("Items:\n");
        
        for (OrderItem item : items) {
            body.append("- ").append(item.getProduct().getName())
                .append(" (Quantity: ").append(item.getQuantity())
                .append(", Price: €").append(item.getUnitPrice())
                .append(")\n");
        }
        
        body.append("\nTotal Amount: €").append(items.stream().mapToDouble(OrderItem::getSubtotal).sum());
        body.append("\n\nPlease process this order as soon as possible.");
        
        message.setText(body.toString());
        mailSender.send(message);
        log.info("Supplier order summary sent successfully to: {}", supplierEmail);
    }

    @Override
    public void sendCommissionReminder(Supplier supplier, SupplierCommission commission) {
        try {
            String subject = "Commission Payment Reminder - Order #" + commission.getOrder().getId();
            String content = String.format("""
                Dear %s,
                
                This is a friendly reminder that you owe the platform a commission payment.
                
                Order Details:
                - Order ID: #%s
                - Commission Amount: €%.2f
                - Due Date: %s
                - Display Price: €%.2f
                - Supplier Price: €%.2f
                
                Please process this payment within the next 7 days to avoid late fees.
                
                If you have any questions, please contact our support team.
                
                Best regards,
                Platform Team
                """,
                supplier.getName(),
                commission.getOrder().getId(),
                commission.getCommissionAmount(),
                commission.getDueDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")),
                commission.getDisplayPrice(),
                commission.getSupplierPrice()
            );
            
            sendEmail(supplier.getContactEmail(), subject, content);
            log.info("Commission reminder sent to supplier: {} for commission: {}", supplier.getName(), commission.getId());
            
        } catch (Exception e) {
            log.error("Error sending commission reminder to supplier {}: {}", supplier.getName(), e.getMessage());
        }
    }
    
    @Override
    public void sendCommissionOverdueReminder(Supplier supplier, SupplierCommission commission) {
        try {
            String subject = "URGENT: Commission Payment Overdue - Order #" + commission.getOrder().getId();
            String content = String.format("""
                Dear %s,
                
                Your commission payment is now OVERDUE and requires immediate attention.
                
                Order Details:
                - Order ID: #%s
                - Commission Amount: €%.2f
                - Due Date: %s (OVERDUE)
                - Days Late: %d
                
                This overdue payment may affect your account status and future orders.
                Please process payment immediately to avoid account suspension.
                
                If you have any questions, please contact our support team urgently.
                
                Best regards,
                Platform Team
                """,
                supplier.getName(),
                commission.getOrder().getId(),
                commission.getCommissionAmount(),
                commission.getDueDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")),
                java.time.Duration.between(commission.getDueDate(), LocalDateTime.now()).toDays()
            );
            
            sendEmail(supplier.getContactEmail(), subject, content);
            log.info("Commission overdue reminder sent to supplier: {} for commission: {}", supplier.getName(), commission.getId());
            
        } catch (Exception e) {
            log.error("Error sending commission overdue reminder to supplier {}: {}", supplier.getName(), e.getMessage());
        }
    }
    
    @Override
    public void sendCommissionPaidConfirmation(Supplier supplier, SupplierCommission commission) {
        try {
            String subject = "Commission Payment Confirmed - Order #" + commission.getOrder().getId();
            String content = String.format("""
                Dear %s,
                
                Thank you! Your commission payment has been received and confirmed.
                
                Payment Details:
                - Order ID: #%s
                - Commission Amount: €%.2f
                - Payment Date: %s
                - Payment Reference: %s
                
                Your account is now up to date. Thank you for your prompt payment.
                
                Best regards,
                Platform Team
                """,
                supplier.getName(),
                commission.getOrder().getId(),
                commission.getCommissionAmount(),
                commission.getPaidDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")),
                commission.getPaymentReference() != null ? commission.getPaymentReference() : "N/A"
            );
            
            sendEmail(supplier.getContactEmail(), subject, content);
            log.info("Commission paid confirmation sent to supplier: {} for commission: {}", supplier.getName(), commission.getId());
            
        } catch (Exception e) {
            log.error("Error sending commission paid confirmation to supplier {}: {}", supplier.getName(), e.getMessage());
        }
    }
    
    @Override
    public void sendOrderSummaryToClient(Client client, Order order, String paymentMethod) {
        try {
            String subject = "Order Confirmation - Order #" + order.getId();
            String content = String.format("""
                Dear %s %s,
                
                Thank you for your order! Here's your order summary:
                
                Order Details:
                - Order ID: #%s
                - Order Date: %s
                - Payment Method: %s
                - Total Amount: €%.2f
                
                Order Items:
                %s
                
                Payment Status: CONFIRMED
                Your order is being processed and will be shipped soon.
                
                If you have any questions, please contact our support team.
                
                Best regards,
                Platform Team
                """,
                client.getFirstName(),
                client.getLastName(),
                order.getId(),
                order.getCreatedAt().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")),
                paymentMethod,
                order.getTotal(),
                formatOrderItems(order)
            );
            
            sendEmail(client.getEmail(), subject, content);
            log.info("Order summary sent to client: {} for order: {}", client.getEmail(), order.getId());
            
        } catch (Exception e) {
            log.error("Error sending order summary to client {}: {}", client.getEmail(), e.getMessage());
        }
    }
    
    @Override
    public void sendOrderSummaryToSupplier(Supplier supplier, Order order, boolean isSupplierPayment, Double commissionAmount) {
        try {
            String subject = "Order Notification - Order #" + order.getId();
            String content;
            
            if (isSupplierPayment) {
                // Supplier handled payment - they owe us commission
                content = String.format("""
                    Dear %s,
                    
                    A new order has been placed through your supplier payment system.
                    
                    Order Details:
                    - Order ID: #%s
                    - Order Date: %s
                    - Customer Paid: €%.2f (directly to you)
                    - Commission Owed: €%.2f (to platform)
                    
                    Order Items:
                    %s
                    
                    IMPORTANT: You owe the platform €%.2f commission for this order.
                    Please process this payment within 30 days.
                    
                    Best regards,
                    Platform Team
                    """,
                    supplier.getName(),
                    order.getId(),
                    order.getCreatedAt().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")),
                    order.getTotal(),
                    commissionAmount,
                    formatOrderItems(order),
                    commissionAmount
                );
            } else {
                // Platform handled payment - we owe them
                content = String.format("""
                    Dear %s,
                    
                    A new order has been placed and paid through our platform.
                    
                    Order Details:
                    - Order ID: #%s
                    - Order Date: %s
                    - Customer Paid: €%.2f (to platform)
                    - Amount Owed to You: €%.2f
                    
                    Order Items:
                    %s
                    
                    We will process your payment within 7 business days.
                    
                    Best regards,
                    Platform Team
                    """,
                    supplier.getName(),
                    order.getId(),
                    order.getCreatedAt().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")),
                    order.getTotal(),
                    order.getTotal() - commissionAmount,
                    formatOrderItems(order)
                );
            }
            
            sendEmail(supplier.getContactEmail(), subject, content);
            log.info("Order summary sent to supplier: {} for order: {}", supplier.getName(), order.getId());
            
        } catch (Exception e) {
            log.error("Error sending order summary to supplier {}: {}", supplier.getName(), e.getMessage());
        }
    }
    
    private String formatOrderItems(Order order) {
        StringBuilder items = new StringBuilder();
        for (var item : order.getItems()) {
            items.append(String.format("- %s x%d @ €%.2f each = €%.2f\n",
                item.getProduct().getName(),
                item.getQuantity(),
                item.getUnitPrice(),
                item.getUnitPrice() * item.getQuantity()
            ));
        }
        return items.toString();
    }
    
}