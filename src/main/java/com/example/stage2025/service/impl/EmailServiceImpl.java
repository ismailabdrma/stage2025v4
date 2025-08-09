package com.example.stage2025.service.impl;

import com.example.stage2025.entity.Order;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.entity.User;
import com.example.stage2025.service.EmailService;
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

    @Value("${app.email.from:noreply@stage2025.com}")
    private String fromEmail;

    @Value("${app.base-url:http://localhost:4200}")
    private String baseUrl;

    @Override
    public void sendWelcomeEmail(User user) {
        try {
            String subject = "Bienvenue sur Stage2025 Marketplace!";
            String content = String.format("""
                Bonjour %s,
                
                Bienvenue sur Stage2025 Marketplace!
                
                Votre compte a été créé avec succès. Vous pouvez maintenant:
                • Parcourir notre catalogue de produits
                • Passer des commandes
                • Gérer votre profil
                
                Connectez-vous ici: %s/auth/login
                
                Merci de nous faire confiance!
                
                L'équipe Stage2025
                """, user.getUsername(), baseUrl);

            sendSimpleEmail(user.getEmail(), subject, content);
            
        } catch (Exception e) {
            log.error("Failed to send welcome email to {}: {}", user.getEmail(), e.getMessage());
        }
    }

    @Override
    public void sendEmailVerificationOTP(String email, String otp) {
        try {
            String subject = "Code de vérification Stage2025";
            String content = String.format("""
                Votre code de vérification Stage2025 est:
                
                %s
                
                Ce code expire dans 10 minutes.
                
                Si vous n'avez pas demandé ce code, ignorez cet email.
                
                L'équipe Stage2025
                """, otp);

            sendSimpleEmail(email, subject, content);
            
        } catch (Exception e) {
            log.error("Failed to send OTP email to {}: {}", email, e.getMessage());
        }
    }

    @Override
    public void sendPasswordResetOTP(String email, String otp) {
        try {
            String subject = "Réinitialisation de mot de passe Stage2025";
            String content = String.format("""
                Votre code de réinitialisation de mot de passe est:
                
                %s
                
                Ce code expire dans 10 minutes.
                
                Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
                
                L'équipe Stage2025
                """, otp);

            sendSimpleEmail(email, subject, content);
            
        } catch (Exception e) {
            log.error("Failed to send password reset email to {}: {}", email, e.getMessage());
        }
    }

    @Override
    public void sendOrderConfirmation(User user, Order order) {
        try {
            String subject = "Confirmation de commande #" + order.getId();
            
            StringBuilder itemsList = new StringBuilder();
            order.getItems().forEach(item -> 
                itemsList.append(String.format("• %s x%d - %.2f€\n", 
                    item.getProductName(), item.getQuantity(), 
                    item.getUnitPrice() * item.getQuantity()))
            );

            String content = String.format("""
                Bonjour %s,
                
                Votre commande #%d a été confirmée!
                
                Détails de la commande:
                %s
                
                Total: %.2f€
                Statut: %s
                
                Vous recevrez un email de confirmation une fois votre commande traitée.
                
                Suivez vos commandes: %s/orders
                
                Merci pour votre confiance!
                
                L'équipe Stage2025
                """, user.getUsername(), order.getId(), itemsList.toString(), 
                order.getTotalAmount(), order.getStatus(), baseUrl);

            sendSimpleEmail(user.getEmail(), subject, content);
            
        } catch (Exception e) {
            log.error("Failed to send order confirmation to {}: {}", user.getEmail(), e.getMessage());
        }
    }



    @Override
    public void sendSupplierOrderNotification(Supplier supplier, Order order) {
        try {
            String subject = "Nouvelle commande - Stage2025 Marketplace";
            
            StringBuilder itemsList = new StringBuilder();
            
            // Filter items for this specific supplier and calculate total
            order.getItems().stream()
                .filter(item -> item.getProduct().getSupplier().getId().equals(supplier.getId()))
                .forEach(item -> {
                    double itemTotal = item.getUnitPrice() * item.getQuantity();
                    itemsList.append(String.format("• %s x%d - %.2f€\n", 
                        item.getProductName(), item.getQuantity(), itemTotal));
                });

            // Calculate total for this supplier's products only
            double finalSupplierTotal = order.getItems().stream()
                .filter(item -> item.getProduct().getSupplier().getId().equals(supplier.getId()))
                .mapToDouble(item -> item.getUnitPrice() * item.getQuantity())
                .sum();

            String content = String.format("""
                Bonjour %s,
                
                Une nouvelle commande contient vos produits sur notre marketplace Stage2025!
                
                📦 DÉTAILS DE LA COMMANDE:
                Commande #%d
                Date: %s
                Client: %s
                
                🛍️ VOS PRODUITS COMMANDÉS:
                %s
                💰 Montant total pour vos produits: %.2f€
                
                📋 INFORMATIONS CLIENT:
                • Nom: %s
                • Email: %s
                
                📬 ADRESSE DE LIVRAISON:
                %s
                %s, %s %s
                %s
                
                ⚡ ACTIONS REQUISES:
                • Préparer les produits pour expédition
                • Confirmer la disponibilité du stock
                • Coordonner la livraison si nécessaire
                
                📞 Pour toute question, contactez-nous à admin@stage2025.com
                
                Merci de votre partenariat!
                L'équipe Stage2025 Marketplace
                """, 
                supplier.getName(),
                order.getId(), 
                order.getOrderDate().toLocalDate(),
                order.getUser().getUsername(),
                itemsList.toString(),
                finalSupplierTotal,
                order.getUser().getFirstName() + " " + order.getUser().getLastName(),
                order.getUser().getEmail(),
                order.getDeliveryAddress().getStreet(),
                order.getDeliveryAddress().getCity(),
                order.getDeliveryAddress().getState(),
                order.getDeliveryAddress().getZipCode(),
                order.getDeliveryAddress().getCountry());

            sendSimpleEmail(supplier.getContactEmail(), subject, content);
            
        } catch (Exception e) {
            log.error("Failed to send order notification to supplier {}: {}", supplier.getContactEmail(), e.getMessage());
        }
    }

    @Override
    public void sendSupplierPaymentRequest(Supplier supplier, Order order, String paymentDetails) {
        try {
            String subject = "Demande de paiement - Commande #" + order.getId();
            String content = String.format("""
                Bonjour,
                
                Une demande de paiement a été initiée pour la commande #%d.
                
                Détails du paiement:
                %s
                
                Montant total: %.2f€
                
                Actions disponibles:
                • Accepter le paiement
                • Demander des modifications
                • Contacter le support
                
                Portail paiements: %s/supplier/payments
                
                L'équipe Stage2025
                """, order.getId(), paymentDetails, order.getTotalAmount(), baseUrl);

            sendSimpleEmail(supplier.getContactEmail(), subject, content);
            
        } catch (Exception e) {
            log.error("Failed to send payment request to supplier {}: {}", supplier.getContactEmail(), e.getMessage());
        }
    }

    @Override
    public void sendAdminNewOrderNotification(Order order) {
        try {
            String subject = "Nouvelle commande sur Stage2025 - #" + order.getId();
            String content = String.format("""
                Nouvelle commande reçue!
                
                Commande #%d
                Client: %s (%s)
                Montant: %.2f€
                Statut: %s
                
                Nombre d'articles: %d
                
                Voir la commande: %s/admin/orders/%d
                
                Système Stage2025
                """, order.getId(), order.getUser().getUsername(), order.getUser().getEmail(),
                order.getTotalAmount(), order.getStatus(), order.getItems().size(), baseUrl, order.getId());

            sendSimpleEmail("admin@stage2025.com", subject, content);
            
        } catch (Exception e) {
            log.error("Failed to send admin order notification: {}", e.getMessage());
        }
    }

    @Override
    public void sendAdminNewSupplierNotification(Supplier supplier) {
        try {
            String subject = "Nouvelle configuration fournisseur - Stage2025";
            String content = String.format("""
                Nouvelle configuration fournisseur créée!
                
                📋 INFORMATIONS:
                • Nom: %s
                • Email de contact: %s
                • Type d'intégration: %s
                • Statut: %s
                • Date de création: %s
                
                🔧 ACTIONS RECOMMANDÉES:
                • Tester l'importation de produits
                • Vérifier la synchronisation des stocks
                • Valider les informations de contact
                • Activer l'intégration si les tests sont concluants
                
                💡 Cette configuration permet d'importer des produits depuis ce fournisseur externe.
                Les notifications de commande seront envoyées à: %s
                
                Voir la configuration: %s/admin/suppliers/%d
                
                Système Stage2025
                """, 
                supplier.getName(), 
                supplier.getContactEmail() != null ? supplier.getContactEmail() : "Non renseigné",
                supplier.getClass().getSimpleName(),
                supplier.isActive() ? "Actif" : "Inactif", 
                supplier.getCreated() != null ? supplier.getCreated().toLocalDate() : "Maintenant",
                supplier.getContactEmail() != null ? supplier.getContactEmail() : "Aucun email configuré",
                baseUrl, 
                supplier.getId());

            sendSimpleEmail("admin@stage2025.com", subject, content);
            
        } catch (Exception e) {
            log.error("Failed to send admin supplier notification: {}", e.getMessage());
        }
    }

    private void sendSimpleEmail(String to, String subject, String content) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(content);
            
            mailSender.send(message);
            log.info("Email sent successfully to {}: {}", to, subject);
            
        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage());
        }
    }
}