# Mode d'Utilisation - Stage2025 E-commerce Platform

## 📋 Table des Matières
1. [Vue d'ensemble](#vue-densemble)
2. [Accès au système](#accès-au-système)
3. [Gestion des produits](#gestion-des-produits)
4. [Gestion des commandes](#gestion-des-commandes)
5. [Gestion des fournisseurs](#gestion-des-fournisseurs)
6. [Système de paiement](#système-de-paiement)
7. [Interface administrateur](#interface-administrateur)
8. [Application mobile](#application-mobile)
9. [Dépannage](#dépannage)

## 🎯 Vue d'ensemble

Stage2025 est une plateforme e-commerce complète avec :
- **Frontend Angular** : Interface utilisateur moderne et responsive
- **Backend Spring Boot** : API REST robuste avec gestion des paiements
- **Application mobile Flutter** : Application native pour iOS/Android
- **Système multi-fournisseurs** : Gestion de plusieurs fournisseurs avec leurs propres systèmes de paiement

## 🚀 Accès au système

### Frontend Web
- **URL** : `http://localhost:4200`
- **Démarrage** : `cd frontend && npm start`
- **Fonctionnalités** :
  - Catalogue de produits avec filtres avancés
  - Panier d'achat et processus de commande
  - Gestion des profils utilisateur
  - Interface de paiement sécurisée

### Backend API
- **URL** : `http://localhost:8080`
- **Démarrage** : `mvn spring-boot:run`
- **Documentation API** : `http://localhost:8080/swagger-ui.html`
- **Endpoints principaux** :
  - `/api/products` - Gestion des produits
  - `/api/orders` - Gestion des commandes
  - `/api/suppliers` - Gestion des fournisseurs
  - `/api/payment-success` - Traitement des paiements

### Application Mobile
- **Démarrage** : `cd mobile_flutter && flutter run`
- **Plateformes** : iOS, Android, Web
- **Fonctionnalités** :
  - Navigation intuitive
  - Synchronisation en temps réel
  - Paiements intégrés

## 🛍️ Gestion des produits

### Pour les utilisateurs finaux

#### Navigation et recherche
1. **Page d'accueil** : Affiche les produits vedettes
2. **Catalogue** : Liste complète avec filtres
   - Filtre par catégorie
   - Filtre par fournisseur
   - Filtre par prix
   - Recherche textuelle
3. **Détails produit** : Informations complètes et images

#### Processus d'achat
1. **Ajout au panier** : Clic sur "Ajouter au panier"
2. **Gestion du panier** : Modification des quantités
3. **Commande** : Processus de commande en 3 étapes
4. **Paiement** : Intégration avec les systèmes de paiement des fournisseurs

### Pour les administrateurs

#### Gestion du catalogue
1. **Ajout de produits** :
   - Nom, description, prix
   - Images multiples
   - Catégorie et fournisseur
   - Statut (actif/inactif)

2. **Modification de produits** :
   - Mise à jour des informations
   - Gestion des images
   - Ajustement des prix

3. **Approbation des produits** :
   - Validation des nouveaux produits
   - Activation/désactivation
   - Gestion des statuts

## 📦 Gestion des commandes

### Processus de commande

#### Côté client
1. **Sélection des produits** dans le catalogue
2. **Configuration du panier** (quantités, options)
3. **Saisie des informations** de livraison
4. **Sélection du mode de paiement**
5. **Confirmation et paiement**

#### Côté administrateur
1. **Suivi des commandes** en temps réel
2. **Gestion des statuts** :
   - PENDING : En attente
   - PAID : Payée
   - PROCESSING : En cours de traitement
   - SHIPPED : Expédiée
   - DELIVERED : Livrée
   - CANCELLED : Annulée

3. **Traitement des commandes** :
   - Validation des paiements
   - Coordination avec les fournisseurs
   - Suivi de l'expédition

## 🏢 Gestion des fournisseurs

### Types de fournisseurs supportés

#### 1. Fournisseurs API
- **Configuration** : URL de l'API et clé d'authentification
- **Synchronisation** : Import automatique des produits
- **Paiements** : Intégration avec leur système de paiement

#### 2. Fournisseurs Excel
- **Import** : Upload de fichiers Excel
- **Format** : Template standardisé fourni
- **Synchronisation** : Mise à jour périodique

#### 3. Fournisseurs SOAP
- **Configuration** : URL WSDL et authentification
- **Opérations** : Découverte automatique des méthodes
- **Paiements** : Intégration SOAP pour les transactions

### Configuration d'un nouveau fournisseur

1. **Accès admin** : Interface d'administration
2. **Création** : Formulaire de configuration
3. **Test de connexion** : Validation des paramètres
4. **Import initial** : Synchronisation des produits
5. **Configuration des paiements** : Paramétrage du système de paiement

## 💳 Système de paiement

### Architecture de paiement

#### Paiements directs (Stripe)
- **Processus** : Paiement via Stripe
- **Sécurité** : Chiffrement et conformité PCI
- **Gestion** : Webhooks pour les notifications

#### Paiements fournisseurs
- **Redirection** : Vers le système du fournisseur
- **Retour** : Page de succès avec confirmation
- **Synchronisation** : Mise à jour automatique du statut

### Gestion des commissions

1. **Calcul automatique** : Différence entre prix affiché et prix fournisseur
2. **Frais de transaction** : 2.9% + 0.30€ par transaction
3. **Paiements fournisseurs** : Montant net après commission
4. **Rapports** : Suivi des commissions et paiements

## 🔧 Interface administrateur

### Tableau de bord principal

#### Statistiques en temps réel
- Nombre total de commandes
- Chiffre d'affaires
- Produits actifs/inactifs
- Commandes en attente

#### Gestion des utilisateurs
- Liste des clients
- Gestion des rôles
- Historique des commandes

#### Configuration système
- Paramètres généraux
- Configuration des paiements
- Gestion des catégories
- Maintenance de la base de données

### Outils d'administration

#### Import/Export
- **Produits** : Import en masse via Excel
- **Commandes** : Export pour analyse
- **Fournisseurs** : Synchronisation des données

#### Monitoring
- **Logs système** : Suivi des erreurs
- **Performance** : Métriques de performance
- **Sécurité** : Surveillance des accès

## 📱 Application mobile

### Fonctionnalités principales

#### Navigation
- **Accueil** : Produits vedettes et promotions
- **Catégories** : Navigation par catégorie
- **Recherche** : Recherche avancée avec filtres
- **Profil** : Gestion du compte utilisateur

#### Achat
- **Panier** : Gestion des articles
- **Commande** : Processus simplifié
- **Paiement** : Intégration native
- **Suivi** : Statut des commandes

#### Fonctionnalités avancées
- **Notifications push** : Alertes et promotions
- **Mode hors ligne** : Cache des données
- **Synchronisation** : Mise à jour automatique

### Configuration mobile

#### Variables d'environnement
```dart
// lib/config/environment.dart
class Environment {
  static const String apiUrl = 'http://localhost:8080/api';
  static const String appName = 'Stage2025';
}
```

#### Services principaux
- **AuthService** : Authentification
- **ProductService** : Gestion des produits
- **OrderService** : Gestion des commandes
- **PaymentService** : Gestion des paiements

## 🔍 Dépannage

### Problèmes courants

#### Frontend ne se charge pas
1. Vérifier que le serveur Angular est démarré
2. Contrôler les erreurs dans la console du navigateur
3. Vérifier la configuration du proxy

#### API ne répond pas
1. Vérifier que Spring Boot est démarré
2. Contrôler les logs du serveur
3. Vérifier la configuration de la base de données

#### Paiements échouent
1. Vérifier la configuration des fournisseurs
2. Contrôler les logs de paiement
3. Tester avec les endpoints de debug

### Logs et monitoring

#### Logs applicatifs
- **Backend** : `logs/application.log`
- **Frontend** : Console du navigateur
- **Mobile** : Logs Flutter

#### Endpoints de debug
- `/api/payment-success/debug/services` : Test des services
- `/api/payment-success/debug/order/{id}` : Test des commandes
- `/api/payment-success/test` : Test de santé

### Support technique

#### Documentation
- **API** : Swagger UI disponible
- **Code** : Documentation inline
- **Guides** : Fichiers README détaillés

#### Contact
- **Développeur** : [Votre nom]
- **Email** : [votre.email@example.com]
- **Repository** : [URL du repository]

---

## 📚 Ressources supplémentaires

- [Guide d'installation](MODE_D_INSTALLATION.md)
- [Documentation API](API_ENDPOINTS_REFERENCE.md)
- [Guide de sécurité](SECURITY.md)
- [Rapport technique](Rapport_Stage2025.tex)

---

*Dernière mise à jour : Décembre 2024*
