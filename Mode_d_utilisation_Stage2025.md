# 📖 **MODE D'UTILISATION - PLATEFORME STAGE2025**

## 🎯 **GUIDE COMPLET D'UTILISATION**

---

## 📋 **TABLE DES MATIÈRES**

1. [Introduction](#introduction)
2. [Prérequis et Installation](#prérequis-et-installation)
3. [Guide Utilisateur Client](#guide-utilisateur-client)
4. [Guide Administrateur](#guide-administrateur)
5. [Guide Développeur](#guide-développeur)
6. [API et Intégrations](#api-et-intégrations)
7. [Dépannage](#dépannage)
8. [FAQ](#faq)

---

## 🚀 **INTRODUCTION**

La plateforme Stage2025 est une solution e-commerce complète offrant :
- **Interface Web** moderne avec Angular 17+
- **Application Mobile** cross-platform avec Flutter
- **Backend robuste** avec Spring Boot
- **Intégration multi-fournisseurs** (REST, SOAP, Excel)
- **Système de paiement** sécurisé avec Stripe
- **Interface d'administration** complète

---

## ⚙️ **PRÉREQUIS ET INSTALLATION**

### **Exigences Système**

#### **Backend (Spring Boot)**
- Java 17 ou supérieur
- MySQL 8.0 ou supérieur
- Maven 3.6 ou supérieur
- 4GB RAM minimum
- 2GB espace disque

#### **Frontend (Angular)**
- Node.js 18 ou supérieur
- npm 9 ou supérieur
- Angular CLI 17 ou supérieur

#### **Mobile (Flutter)**
- Flutter 3.0 ou supérieur
- Dart 3.0 ou supérieur
- Android Studio ou VS Code

### **Installation Rapide**

#### **1. Cloner le Projet**
```bash
git clone https://github.com/stage2025/platform.git
cd stage2025
```

#### **2. Configuration Backend**
```bash
# Configuration de la base de données
cp src/main/resources/application.properties.example src/main/resources/application.properties

# Éditer application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/stage2025
spring.datasource.username=votre_username
spring.datasource.password=votre_password
stripe.secret.key=votre_stripe_secret_key
```

#### **3. Démarrage Backend**
```bash
./mvnw spring-boot:run
# Ou sur Windows
mvnw.cmd spring-boot:run
```

#### **4. Configuration Frontend**
```bash
cd frontend
npm install
cp src/environments/environment.example.ts src/environments/environment.ts

# Éditer environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  stripePublishableKey: 'votre_stripe_publishable_key'
};
```

#### **5. Démarrage Frontend**
```bash
npm start
```

#### **6. Configuration Mobile**
```bash
cd mobile_flutter
flutter pub get
cp lib/config/environment.example.dart lib/config/environment.dart

# Éditer environment.dart
class Environment {
  static const String apiUrl = 'http://localhost:8080/api';
}
```

#### **7. Démarrage Mobile**
```bash
flutter run
```

---

## 👤 **GUIDE UTILISATEUR CLIENT**

### **Inscription et Connexion**

#### **Créer un Compte**
1. Accéder à `http://localhost:4200`
2. Cliquer sur "S'inscrire"
3. Remplir le formulaire :
   - Nom et prénom
   - Email valide
   - Mot de passe sécurisé
4. Vérifier l'email (code OTP envoyé)
5. Confirmer l'inscription

#### **Se Connecter**
1. Cliquer sur "Se connecter"
2. Saisir email et mot de passe
3. Vérifier l'OTP reçu par email
4. Accéder au compte

### **Navigation et Recherche**

#### **Parcourir les Produits**
- **Page d'accueil** : Produits en vedette
- **Catégories** : Navigation par catégorie
- **Recherche** : Barre de recherche globale
- **Filtres** : Prix, marque, disponibilité

#### **Détails d'un Produit**
- **Images** : Galerie d'images
- **Description** : Informations détaillées
- **Prix** : Prix affiché et prix fournisseur
- **Stock** : Disponibilité en temps réel
- **Variantes** : Couleurs, tailles, options

### **Panier et Commande**

#### **Ajouter au Panier**
1. Sélectionner le produit
2. Choisir les variantes
3. Définir la quantité
4. Cliquer "Ajouter au panier"

#### **Gérer le Panier**
- **Modifier quantité** : Boutons +/- ou saisie directe
- **Supprimer article** : Bouton de suppression
- **Vider le panier** : Bouton "Vider"
- **Sauvegarde** : Panier sauvegardé automatiquement

#### **Passer Commande**
1. Cliquer "Commander"
2. Vérifier les articles
3. Choisir l'adresse de livraison
4. Sélectionner le mode de paiement
5. Confirmer la commande

### **Paiement**

#### **Modes de Paiement Disponibles**
- **Carte bancaire** : Via Stripe (sécurisé)
- **Paiement fournisseur** : Directement au fournisseur
- **Paiement différé** : Commande sans paiement immédiat

#### **Processus de Paiement Stripe**
1. Saisir les informations de carte
2. Vérification automatique
3. Confirmation de paiement
4. Email de confirmation

### **Suivi des Commandes**

#### **Historique des Commandes**
- **Liste** : Toutes les commandes passées
- **Statut** : En cours, expédiée, livrée, annulée
- **Détails** : Articles, prix, dates
- **Suivi** : Numéro de suivi si disponible

#### **Gestion du Profil**
- **Informations personnelles** : Nom, email, téléphone
- **Adresses** : Adresses de livraison et facturation
- **Préférences** : Notifications, langue
- **Sécurité** : Changer mot de passe

---

## 🔧 **GUIDE ADMINISTRATEUR**

### **Connexion Administration**

#### **Accès Admin**
1. Aller sur `http://localhost:4200/admin`
2. Se connecter avec un compte administrateur
3. Accéder au tableau de bord

### **Tableau de Bord**

#### **Statistiques Générales**
- **Ventes** : Chiffre d'affaires, nombre de commandes
- **Produits** : Total, actifs, en attente
- **Utilisateurs** : Inscrits, actifs, nouveaux
- **Fournisseurs** : Total, actifs, commissions

#### **Graphiques et Analyses**
- **Évolution des ventes** : Graphique temporel
- **Top produits** : Produits les plus vendus
- **Répartition géographique** : Ventes par région
- **Performance** : Temps de réponse, erreurs

### **Gestion des Produits**

#### **Catalogue Produits**
- **Liste** : Tous les produits avec filtres
- **Recherche** : Par nom, SKU, fournisseur
- **Tri** : Par prix, date, statut
- **Actions** : Modifier, supprimer, dupliquer

#### **Ajout/Modification Produit**
1. Cliquer "Nouveau produit"
2. Remplir les informations :
   - Nom et description
   - Prix et prix fournisseur
   - Catégorie et fournisseur
   - Images (upload ou URL)
   - Variantes (couleur, taille)
3. Sauvegarder

#### **Approbation des Produits**
- **File d'attente** : Produits en attente d'approbation
- **Prévisualisation** : Voir le produit avant approbation
- **Approuver** : Mettre en ligne
- **Rejeter** : Retourner au fournisseur avec commentaires

### **Gestion des Fournisseurs**

#### **Types de Fournisseurs**
- **API REST** : Intégration via API
- **SOAP** : Services web SOAP
- **Excel/CSV** : Import de fichiers

#### **Création Fournisseur API**
1. Sélectionner "Fournisseur API"
2. Remplir :
   - Nom et description
   - URL de l'API
   - Clés d'authentification
   - Endpoints de produits
3. Tester la connexion
4. Sauvegarder

#### **Création Fournisseur SOAP**
1. Sélectionner "Fournisseur SOAP"
2. Remplir :
   - Nom et description
   - URL du WSDL
   - Paramètres d'authentification
3. Générer automatiquement les classes
4. Configurer les opérations
5. Sauvegarder

#### **Import Excel/CSV**
1. Sélectionner "Fournisseur Excel"
2. Uploader le fichier
3. Mapper les colonnes
4. Prévisualiser les données
5. Confirmer l'import

#### **Synchronisation des Produits**
- **Synchronisation manuelle** : Bouton "Synchroniser"
- **Synchronisation automatique** : Planifiée
- **Logs de synchronisation** : Historique des imports
- **Gestion des erreurs** : Correction des problèmes

### **Gestion des Commandes**

#### **Liste des Commandes**
- **Filtres** : Par statut, date, client
- **Recherche** : Par numéro, client, produit
- **Actions** : Modifier statut, annuler, exporter

#### **Détails d'une Commande**
- **Informations client** : Nom, email, adresse
- **Articles** : Produits, quantités, prix
- **Paiement** : Mode, statut, transaction
- **Livraison** : Adresse, transporteur, suivi

#### **Gestion des Statuts**
- **PENDING** : En attente de paiement
- **PAID** : Payée, en préparation
- **SHIPPED** : Expédiée
- **DELIVERED** : Livrée
- **CANCELLED** : Annulée

### **Gestion des Utilisateurs**

#### **Liste des Utilisateurs**
- **Filtres** : Par rôle, statut, date d'inscription
- **Recherche** : Par nom, email
- **Actions** : Modifier, suspendre, supprimer

#### **Gestion des Rôles**
- **CLIENT** : Utilisateur standard
- **ADMIN** : Administrateur complet
- **SUPPLIER** : Fournisseur (lecture seule)

#### **Actions sur les Utilisateurs**
- **Suspendre** : Désactiver temporairement
- **Réactiver** : Réactiver le compte
- **Changer rôle** : Modifier les permissions
- **Réinitialiser mot de passe** : Envoyer un nouveau mot de passe

### **Système de Commissions**

#### **Calcul Automatique**
- **Commission plateforme** : Différence prix affiché - prix fournisseur
- **Commission fournisseur** : Pourcentage ou montant fixe
- **Suivi des dettes** : Commissions dues par les fournisseurs

#### **Gestion des Paiements**
- **Paiements fournisseurs** : Virements aux fournisseurs
- **Facturation** : Génération de factures
- **Rapports** : État des commissions

---

## 💻 **GUIDE DÉVELOPPEUR**

### **Architecture du Code**

#### **Structure Backend (Spring Boot)**
```
src/main/java/com/example/stage2025/
├── config/          # Configurations
├── controller/      # Contrôleurs REST
├── service/         # Services métier
├── repository/      # Accès aux données
├── entity/          # Entités JPA
├── dto/             # Objets de transfert
├── mapper/          # Mappers DTO/Entity
├── security/        # Sécurité
└── util/            # Utilitaires
```

#### **Structure Frontend (Angular)**
```
src/app/
├── core/            # Services, guards, interceptors
├── features/        # Modules fonctionnels
│   ├── auth/        # Authentification
│   ├── products/    # Produits
│   ├── cart/        # Panier
│   ├── orders/      # Commandes
│   └── admin/       # Administration
├── shared/          # Composants partagés
└── assets/          # Ressources statiques
```

### **API REST Endpoints**

#### **Authentification**
```http
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/verify-email
POST /api/auth/forgot-password
```

#### **Produits**
```http
GET    /api/products              # Liste des produits
GET    /api/products/{id}         # Détails d'un produit
POST   /api/products              # Créer un produit
PUT    /api/products/{id}         # Modifier un produit
DELETE /api/products/{id}         # Supprimer un produit
GET    /api/products/pending      # Produits en attente
PUT    /api/products/{id}/approve # Approuver un produit
```

#### **Commandes**
```http
POST /api/orders/create           # Créer une commande
GET  /api/orders                  # Liste des commandes
GET  /api/orders/{id}             # Détails d'une commande
PUT  /api/orders/{id}/status      # Modifier le statut
```

#### **Fournisseurs**
```http
GET  /api/suppliers               # Liste des fournisseurs
POST /api/suppliers               # Créer un fournisseur
POST /api/suppliers/auto-soap     # Créer fournisseur SOAP
POST /api/suppliers/{id}/import-products # Importer produits
```

### **Configuration et Variables d'Environnement**

#### **Backend (application.properties)**
```properties
# Base de données
spring.datasource.url=jdbc:mysql://localhost:3306/stage2025
spring.datasource.username=stage2025
spring.datasource.password=password

# JPA
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.jdbc.batch_size=40

# Stripe
stripe.secret.key=${STRIPE_SECRET_KEY}
stripe.publishable.key=${STRIPE_PUBLISHABLE_KEY}

# Email
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${EMAIL_USERNAME}
spring.mail.password=${EMAIL_PASSWORD}
```

#### **Frontend (environment.ts)**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  stripePublishableKey: 'pk_test_your_key_here'
};
```

### **Tests et Qualité**

#### **Tests Backend**
```bash
# Tests unitaires
./mvnw test

# Tests d'intégration
./mvnw verify

# Rapport de couverture
./mvnw jacoco:report
```

#### **Tests Frontend**
```bash
# Tests unitaires
npm test

# Tests e2e
npm run e2e

# Linting
npm run lint
```

#### **Tests Mobile**
```bash
# Tests unitaires
flutter test

# Tests d'intégration
flutter drive --target=test_driver/app.dart
```

---

## 🔌 **API ET INTÉGRATIONS**

### **Intégration Stripe**

#### **Configuration**
```java
@Configuration
public class StripeConfig {
    @Value("${stripe.secret.key}")
    private String secretKey;
    
    @Bean
    public StripeService stripeService() {
        Stripe.apiKey = secretKey;
        return new StripeService();
    }
}
```

#### **Création d'un Paiement**
```java
@Service
public class PaymentService {
    public PaymentIntentResponse createPaymentIntent(PaymentIntentRequest request) {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
            .setAmount(request.getAmount())
            .setCurrency(request.getCurrency())
            .build();
            
        PaymentIntent paymentIntent = StripeService.createPaymentIntent(params);
        return PaymentIntentResponse.builder()
            .clientSecret(paymentIntent.getClientSecret())
            .build();
    }
}
```

### **Intégration Fournisseurs SOAP**

#### **Configuration WSDL**
```java
@Configuration
public class SoapConfig {
    @Bean
    public Jaxb2Marshaller marshaller() {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        marshaller.setContextPath("com.supplier.ws");
        return marshaller;
    }
}
```

#### **Service SOAP**
```java
@Service
public class SoapSupplierService {
    public List<Product> fetchProducts(SoapSupplier supplier) {
        // Implémentation de l'appel SOAP
        return soapTemplate.marshalSendAndReceive(
            supplier.getWsdlUrl(),
            request,
            new SoapActionCallback("http://supplier.com/GetProducts")
        );
    }
}
```

### **Import Excel/CSV**

#### **Service d'Import**
```java
@Service
public class ExcelImportService {
    public List<Product> importFromExcel(MultipartFile file) {
        try (Workbook workbook = WorkbookFactory.create(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            return processSheet(sheet);
        } catch (IOException e) {
            throw new ImportException("Erreur lors de l'import", e);
        }
    }
}
```

---

## 🔧 **DÉPANNAGE**

### **Problèmes Courants**

#### **Backend ne démarre pas**
```bash
# Vérifier Java
java -version

# Vérifier MySQL
mysql --version

# Nettoyer et recompiler
./mvnw clean compile

# Vérifier les logs
tail -f logs/application.log
```

#### **Frontend ne se compile pas**
```bash
# Nettoyer node_modules
rm -rf node_modules package-lock.json
npm install

# Vérifier Angular CLI
ng version

# Recompiler
ng build
```

#### **Mobile ne démarre pas**
```bash
# Vérifier Flutter
flutter doctor

# Nettoyer le cache
flutter clean
flutter pub get

# Redémarrer
flutter run
```

#### **Problèmes de Base de Données**
```sql
-- Vérifier la connexion
SHOW DATABASES;

-- Vérifier les tables
USE stage2025;
SHOW TABLES;

-- Vérifier les contraintes
SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS;
```

### **Logs et Monitoring**

#### **Logs Backend**
```bash
# Logs en temps réel
tail -f logs/application.log

# Logs d'erreur
grep "ERROR" logs/application.log

# Logs de performance
grep "SLOW" logs/application.log
```

#### **Logs Frontend**
```bash
# Console du navigateur
F12 -> Console

# Logs de développement
ng serve --verbose
```

#### **Logs Mobile**
```bash
# Logs Flutter
flutter logs

# Logs Android
adb logcat

# Logs iOS
xcrun simctl spawn booted log stream
```

---

## ❓ **FAQ**

### **Questions Générales**

**Q: Comment changer le port du backend ?**
R: Modifier `server.port=8080` dans `application.properties`

**Q: Comment configurer HTTPS ?**
R: Ajouter la configuration SSL dans `application.properties`

**Q: Comment ajouter un nouveau fournisseur ?**
R: Utiliser l'interface admin ou l'API `/api/suppliers`

**Q: Comment modifier les frais de commission ?**
R: Configurer dans les paramètres du fournisseur

### **Questions Techniques**

**Q: Comment déboguer les appels API ?**
R: Activer `spring.jpa.show-sql=true` et utiliser les outils de développement du navigateur

**Q: Comment optimiser les performances ?**
R: Activer le cache, optimiser les requêtes, utiliser la pagination

**Q: Comment gérer les erreurs ?**
R: Utiliser le `GlobalExceptionHandler` et les logs appropriés

**Q: Comment déployer en production ?**
R: Configurer les variables d'environnement et utiliser Docker

### **Questions de Sécurité**

**Q: Comment sécuriser l'API ?**
R: Utiliser JWT, HTTPS, validation des entrées, rate limiting

**Q: Comment gérer les mots de passe ?**
R: Utiliser BCrypt et des politiques de sécurité strictes

**Q: Comment auditer les actions ?**
R: Implémenter un système de logs d'audit

---

## 📞 **SUPPORT ET CONTACT**

### **Documentation**
- **API Documentation** : `/api/docs` (Swagger)
- **Code Source** : Repository GitHub
- **Issues** : GitHub Issues

### **Support Technique**
- **Email** : support@stage2025.com
- **Discord** : Serveur de développement
- **Documentation** : Wiki du projet

### **Contribution**
- **Pull Requests** : Bienvenus
- **Issues** : Signaler les bugs
- **Documentation** : Améliorer la doc

---

**Version du Guide** : 1.0  
**Dernière Mise à Jour** : Janvier 2025  
**Plateforme Stage2025** : v2.0
