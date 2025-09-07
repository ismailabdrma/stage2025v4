# Documentation Architecture Générale - Stage2025 E-commerce Platform

## 📋 Table des Matières
1. [Vue d'Ensemble du Système](#vue-densemble-du-système)
2. [Architecture Globale](#architecture-globale)
3. [Composants Principaux](#composants-principaux)
4. [Flux de Données](#flux-de-données)
5. [Intégrations Externes](#intégrations-externes)
6. [Sécurité et Authentification](#sécurité-et-authentification)
7. [Déploiement et Infrastructure](#déploiement-et-infrastructure)
8. [Monitoring et Observabilité](#monitoring-et-observabilité)
9. [Évolutivité et Performance](#évolutivité-et-performance)
10. [Standards et Conventions](#standards-et-conventions)

## 🌐 Vue d'Ensemble du Système

### Description du Projet
Stage2025 est une plateforme e-commerce complète qui permet la gestion de produits, commandes, paiements et fournisseurs. Le système est conçu pour être modulaire, évolutif et supporte plusieurs types d'intégrations fournisseurs (API REST, SOAP, Excel).

### Objectifs Principaux
- **Gestion Multi-Fournisseurs** : Support de différents types de fournisseurs (API, SOAP, Excel)
- **E-commerce Complet** : Catalogue, panier, commandes, paiements
- **Interface Multi-Plateforme** : Web (Angular), Mobile (Flutter)
- **Administration Avancée** : Gestion des produits, commandes, fournisseurs
- **Sécurité Robuste** : Authentification JWT, autorisation basée sur les rôles
- **Monitoring Complet** : Logs, métriques, diagnostics

## 🏗️ Architecture Globale

### Architecture en Couches
```
┌─────────────────────────────────────────────────────────────────┐
│                    COUCHE PRÉSENTATION                         │
├─────────────────────────────────────────────────────────────────┤
│  Web App (Angular)    │    Mobile App (Flutter)               │
│  - Interface Admin    │    - Interface Client                 │
│  - Interface Client   │    - Gestion Panier                   │
│  - Gestion Produits   │    - Commandes                         │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                    COUCHE API GATEWAY                          │
├─────────────────────────────────────────────────────────────────┤
│  Spring Boot Backend                                            │
│  - REST APIs                                                   │
│  - WebSocket Support                                           │
│  - File Upload/Download                                        │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                    COUCHE MÉTIER                               │
├─────────────────────────────────────────────────────────────────┤
│  Services Business Logic                                       │
│  - Product Management                                          │
│  - Order Processing                                            │
│  - Payment Processing                                          │
│  - Supplier Integration                                        │
│  - User Management                                             │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                    COUCHE DONNÉES                              │
├─────────────────────────────────────────────────────────────────┤
│  MySQL Database        │    File Storage                       │
│  - Products            │    - Images                           │
│  - Orders              │    - Documents                        │
│  - Users               │    - Logs                             │
│  - Payments            │                                       │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                    COUCHE INTÉGRATIONS                         │
├─────────────────────────────────────────────────────────────────┤
│  External APIs         │    Payment Gateways                  │
│  - Supplier APIs       │    - Stripe                          │
│  - SOAP Services       │    - Webhooks                        │
│  - File Processing     │                                       │
└─────────────────────────────────────────────────────────────────┘
```

### Diagramme d'Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Client    │    │  Mobile Client  │    │  Admin Panel    │
│   (Angular)     │    │   (Flutter)     │    │   (Angular)     │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────┴─────────────┐
                    │     API Gateway           │
                    │   (Spring Boot)           │
                    │  - REST APIs              │
                    │  - Authentication         │
                    │  - Rate Limiting          │
                    └─────────────┬─────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                       │                        │
┌───────▼────────┐    ┌─────────▼────────┐    ┌─────────▼────────┐
│  Product       │    │   Order          │    │   Payment        │
│  Service       │    │   Service        │    │   Service        │
└───────┬────────┘    └─────────┬────────┘    └─────────┬────────┘
        │                       │                        │
        └───────────────────────┼────────────────────────┘
                                │
                    ┌─────────────▼─────────────┐
                    │     Data Layer            │
                    │   (MySQL + Files)         │
                    │  - Products               │
                    │  - Orders                 │
                    │  - Users                  │
                    │  - Payments               │
                    └───────────────────────────┘
                                │
                    ┌─────────────▼─────────────┐
                    │   External Integrations   │
                    │  - Supplier APIs          │
                    │  - SOAP Services          │
                    │  - Stripe Payment         │
                    │  - Email Service          │
                    └───────────────────────────┘
```

## 🧩 Composants Principaux

### 1. Backend (Spring Boot)
**Responsabilités :**
- API REST pour toutes les opérations
- Gestion de l'authentification et autorisation
- Logique métier centralisée
- Intégration avec les fournisseurs externes
- Gestion des paiements
- Administration système

**Technologies :**
- Spring Boot 3.2+
- Spring Security + JWT
- Spring Data JPA/Hibernate
- MySQL 8.0+
- Maven

### 2. Frontend Web (Angular)
**Responsabilités :**
- Interface utilisateur web
- Gestion des produits et commandes
- Interface d'administration
- Gestion des fournisseurs
- Tableaux de bord et analytics

**Technologies :**
- Angular 16+
- Angular Material
- RxJS
- TypeScript

### 3. Application Mobile (Flutter)
**Responsabilités :**
- Interface mobile pour clients
- Navigation et recherche de produits
- Gestion du panier
- Processus de commande
- Notifications push

**Technologies :**
- Flutter 3.10+
- Dart 3.0+
- Provider/Riverpod
- Dio (HTTP Client)

### 4. Base de Données (MySQL)
**Responsabilités :**
- Stockage des données persistantes
- Gestion des transactions
- Indexation pour les performances
- Sauvegarde et récupération

**Tables Principales :**
- `products` - Catalogue de produits
- `orders` - Commandes clients
- `payments` - Transactions de paiement
- `suppliers` - Fournisseurs
- `users` - Utilisateurs et administrateurs
- `cart_items` - Articles du panier

### 5. Stockage de Fichiers
**Responsabilités :**
- Images de produits
- Documents fournisseurs
- Logs d'importation
- Fichiers de configuration

## 🔄 Flux de Données

### 1. Flux de Commande Client
```
Client (Web/Mobile) 
    ↓ (HTTP Request)
API Gateway (Spring Boot)
    ↓ (Service Call)
Order Service
    ↓ (Database Write)
MySQL Database
    ↓ (Event)
Payment Service
    ↓ (External API)
Stripe Payment Gateway
    ↓ (Webhook)
Payment Success Handler
    ↓ (Update)
Order Status Update
    ↓ (Notification)
Email Service
```

### 2. Flux d'Importation Produits
```
Admin Panel
    ↓ (File Upload)
File Upload Controller
    ↓ (Parse)
Product Parser (CSV/Excel/JSON)
    ↓ (Validate)
Product Validation Service
    ↓ (Save)
Product Repository
    ↓ (Database)
MySQL Database
    ↓ (Event)
Notification Service
    ↓ (Email)
Admin Notification
```

### 3. Flux d'Intégration Fournisseur
```
Scheduled Job / Manual Trigger
    ↓ (API Call)
Supplier Integration Service
    ↓ (HTTP/SOAP)
External Supplier API
    ↓ (Response)
Product Parser
    ↓ (Transform)
Product Mapping Service
    ↓ (Save)
Product Repository
    ↓ (Database)
MySQL Database
```

## 🔌 Intégrations Externes

### 1. Fournisseurs API REST
**Configuration :**
- URL de l'API
- Clé d'authentification
- Format de données (JSON)
- Fréquence de synchronisation

**Exemple :**
```java
@Configuration
public class ApiSupplierConfig {
    @Bean
    public WebClient apiSupplierClient() {
        return WebClient.builder()
            .baseUrl("https://api.supplier.com")
            .defaultHeader("Authorization", "Bearer {token}")
            .build();
    }
}
```

### 2. Fournisseurs SOAP
**Configuration :**
- URL WSDL
- Nom d'utilisateur/Mot de passe
- Opérations disponibles
- Mapping des données

**Exemple :**
```java
@Service
public class SoapSupplierService {
    public List<Product> fetchProducts(String wsdlUrl) {
        // Configuration SOAP client
        // Appel des opérations
        // Parsing de la réponse
    }
}
```

### 3. Fournisseurs Excel/CSV
**Configuration :**
- Format de fichier
- Mapping des colonnes
- Validation des données
- Import en lot

### 4. Stripe Payment Gateway
**Fonctionnalités :**
- Création de Payment Intent
- Gestion des webhooks
- Gestion des remboursements
- Rapports de transaction

## 🔐 Sécurité et Authentification

### 1. Authentification JWT
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        return http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/products/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}
```

### 2. Autorisation Basée sur les Rôles
- **ADMIN** : Accès complet au système
- **USER** : Accès aux fonctionnalités client
- **SUPPLIER** : Accès aux données fournisseur

### 3. Sécurité des Données
- Chiffrement des mots de passe (BCrypt)
- Validation des entrées utilisateur
- Protection CSRF
- Headers de sécurité HTTP

## 🚀 Déploiement et Infrastructure

### 1. Configuration Docker
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: stage2025_db
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"

  backend:
    build: ./backend
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/stage2025_db
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: ${DB_PASSWORD}
    depends_on:
      - mysql
    ports:
      - "8080:8080"

  frontend:
    build: ./frontend
    ports:
      - "4200:80"
    depends_on:
      - backend

volumes:
  mysql_data:
```

### 2. Variables d'Environnement
```bash
# Base de données
DB_URL=jdbc:mysql://localhost:3306/stage2025_db
DB_USERNAME=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET_KEY=your_jwt_secret_key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
```

### 3. Script de Déploiement
```bash
#!/bin/bash
# deploy.sh

echo "Starting deployment..."

# Build backend
cd backend
mvn clean package -DskipTests
docker build -t stage2025-backend .

# Build frontend
cd ../frontend
npm run build:prod
docker build -t stage2025-frontend .

# Deploy with docker-compose
cd ..
docker-compose down
docker-compose up -d

echo "Deployment completed!"
```

## 📊 Monitoring et Observabilité

### 1. Logging
```java
@RestController
@Slf4j
public class ProductController {
    
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts() {
        log.info("Fetching all products");
        try {
            List<Product> products = productService.getAllProducts();
            log.info("Successfully fetched {} products", products.size());
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            log.error("Error fetching products", e);
            return ResponseEntity.status(500).build();
        }
    }
}
```

### 2. Métriques
```java
@Component
public class MetricsService {
    
    private final MeterRegistry meterRegistry;
    
    public void recordOrderCreated() {
        Counter.builder("orders.created")
            .description("Number of orders created")
            .register(meterRegistry)
            .increment();
    }
}
```

### 3. Health Checks
```java
@Component
public class DatabaseHealthIndicator implements HealthIndicator {
    
    @Override
    public Health health() {
        try {
            // Test database connection
            return Health.up()
                .withDetail("database", "Available")
                .build();
        } catch (Exception e) {
            return Health.down()
                .withDetail("database", "Unavailable")
                .withDetail("error", e.getMessage())
                .build();
        }
    }
}
```

## ⚡ Évolutivité et Performance

### 1. Optimisations Base de Données
- Index sur les colonnes fréquemment utilisées
- Pagination pour les grandes listes
- Requêtes optimisées avec JPA Specifications
- Cache de requêtes fréquentes

### 2. Optimisations API
- Compression GZIP
- Mise en cache des réponses
- Pagination des résultats
- Rate limiting

### 3. Optimisations Frontend
- Lazy loading des modules
- Mise en cache des données
- Optimisation des images
- Code splitting

## 📋 Standards et Conventions

### 1. Conventions de Code
- **Java** : CamelCase pour les méthodes et variables
- **TypeScript** : CamelCase pour les variables, PascalCase pour les classes
- **Dart** : Snake_case pour les fichiers, camelCase pour les variables

### 2. Conventions de Nommage
- **Controllers** : `*Controller.java`
- **Services** : `*Service.java` / `*ServiceImpl.java`
- **Repositories** : `*Repository.java`
- **DTOs** : `*Dto.java`
- **Entities** : `*.java` (nom de l'entité)

### 3. Structure des APIs
- **REST** : `/api/{resource}/{id}`
- **Versioning** : `/api/v1/{resource}`
- **Status Codes** : 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found), 500 (Internal Server Error)

### 4. Gestion des Erreurs
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException e) {
        ErrorResponse error = new ErrorResponse("RESOURCE_NOT_FOUND", e.getMessage());
        return ResponseEntity.status(404).body(error);
    }
}
```

---

## 📚 Ressources et Liens Utiles

- **Spring Boot** : https://spring.io/projects/spring-boot
- **Angular** : https://angular.io/
- **Flutter** : https://flutter.dev/
- **MySQL** : https://dev.mysql.com/doc/
- **Stripe** : https://stripe.com/docs
- **Docker** : https://docs.docker.com/

---

*Dernière mise à jour : Décembre 2024*
