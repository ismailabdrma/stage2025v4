# Documentation Backend - Stage2025 E-commerce Platform

## 📋 Table des Matières
1. [Architecture Backend](#architecture-backend)
2. [Structure du Projet](#structure-du-projet)
3. [Configuration et Démarrage](#configuration-et-démarrage)
4. [API Endpoints](#api-endpoints)
5. [Base de Données](#base-de-données)
6. [Services et Logique Métier](#services-et-logique-métier)
7. [Sécurité et Authentification](#sécurité-et-authentification)
8. [Gestion des Paiements](#gestion-des-paiements)
9. [Intégration Fournisseurs](#intégration-fournisseurs)
10. [Tests et Qualité](#tests-et-qualité)
11. [Déploiement](#déploiement)
12. [Monitoring et Logs](#monitoring-et-logs)

## 🏗️ Architecture Backend

### Stack Technologique
- **Framework** : Spring Boot 3.2+
- **Java** : JDK 17+
- **Base de données** : MySQL 8.0+
- **ORM** : JPA/Hibernate
- **Sécurité** : Spring Security + JWT
- **Documentation** : Swagger/OpenAPI 3
- **Build** : Maven 3.8+

### Architecture en Couches
```
┌─────────────────────────────────────┐
│           Controllers               │ ← REST API Layer
├─────────────────────────────────────┤
│           Services                  │ ← Business Logic Layer
├─────────────────────────────────────┤
│         Repositories                │ ← Data Access Layer
├─────────────────────────────────────┤
│         Entities                    │ ← Domain Model Layer
└─────────────────────────────────────┘
```

## 📁 Structure du Projet

```
src/main/java/com/example/stage2025/
├── controller/                 # Contrôleurs REST (30+ contrôleurs)
│   ├── ProductController.java
│   ├── OrderController.java
│   ├── PaymentController.java
│   ├── PaymentSuccessController.java
│   ├── PaymentWebhookController.java
│   ├── StripeWebhookController.java
│   ├── SupplierController.java
│   ├── SupplierWebhookController.java
│   ├── AdminController.java
│   ├── AuthController.java
│   ├── CartController.java
│   ├── CategoryController.java
│   ├── UserController.java
│   ├── UserManagementController.java
│   ├── AdminMonitoringController.java
│   ├── AdminSupplierPaymentController.java
│   ├── AnalyticsController.java
│   ├── DashboardController.java
│   ├── FileUploadController.java
│   ├── ImageController.java
│   ├── ShippingController.java
│   ├── SoapTestController.java
│   ├── DynamicSoapController.java
│   └── ... (autres contrôleurs)
├── service/                    # Services métier (68+ services)
│   ├── ProductService.java
│   ├── OrderService.java
│   ├── PaymentService.java
│   ├── PaymentCompletionService.java
│   ├── SupplierService.java
│   ├── CartService.java
│   ├── CategoryService.java
│   ├── EmailService.java
│   ├── UserManagementService.java
│   ├── CommissionService.java
│   ├── DashboardService.java
│   ├── ShippingService.java
│   ├── StockSyncService.java
│   ├── SoapNotificationService.java
│   ├── SystemMonitoringService.java
│   ├── impl/                   # Implémentations
│   │   ├── ProductServiceImpl.java
│   │   ├── OrderServiceImpl.java
│   │   ├── PaymentServiceImpl.java
│   │   ├── PaymentCompletionServiceImpl.java
│   │   ├── SupplierServiceImpl.java
│   │   ├── CartServiceImpl.java
│   │   ├── EmailServiceImpl.java
│   │   ├── UserManagementServiceImpl.java
│   │   ├── SoapPaymentService.java
│   │   ├── RestApiPaymentService.java
│   │   ├── PlatformPaymentService.java
│   │   ├── SmartPaymentRoutingService.java
│   │   ├── DirectSupplierPaymentService.java
│   │   ├── SupplierPaymentServiceImpl.java
│   │   └── ... (autres implémentations)
│   └── parser/                 # Parsers de données
│       ├── ProductParser.java
│       ├── CsvProductParser.java
│       ├── ExcelProductParser.java
│       ├── JsonProductParser.java
│       ├── XmlProductParser.java
│       └── SoapProductParser.java
├── repository/                 # Accès aux données (23+ repositories)
│   ├── ProductRepository.java
│   ├── OrderRepository.java
│   ├── PaymentRepository.java
│   ├── SupplierRepository.java
│   ├── UserRepository.java
│   ├── CartRepository.java
│   ├── CategoryRepository.java
│   ├── AddressRepository.java
│   ├── SupplierPaymentRepository.java
│   ├── SupplierCommissionRepository.java
│   ├── ImportLogRepository.java
│   ├── ActivityLogRepository.java
│   └── ... (autres repositories)
├── entity/                     # Entités JPA (23+ entités)
│   ├── Product.java
│   ├── Order.java
│   ├── Payment.java
│   ├── Supplier.java
│   ├── User.java
│   ├── Client.java
│   ├── Admin.java
│   ├── Cart.java
│   ├── CartItem.java
│   ├── OrderItem.java
│   ├── Category.java
│   ├── Address.java
│   ├── ApiSupplier.java
│   ├── ExcelSupplier.java
│   ├── SoapSupplier.java
│   ├── SupplierPayment.java
│   ├── SupplierCommission.java
│   ├── ImportLog.java
│   ├── ActivityLog.java
│   ├── OtpToken.java
│   ├── ShippingFee.java
│   └── ... (autres entités)
├── dto/                        # Objets de transfert (25+ DTOs)
│   ├── ProductDto.java
│   ├── OrderDto.java
│   ├── PaymentDto.java
│   ├── SupplierDto.java
│   ├── UserDto.java
│   ├── CartDto.java
│   ├── CategoryDto.java
│   ├── AddressDto.java
│   ├── LoginRequest.java
│   ├── RegisterRequest.java
│   ├── PaymentIntentRequest.java
│   ├── PaymentIntentResponse.java
│   ├── ApiResponse.java
│   ├── DashboardStatsDto.java
│   ├── SupplierPaymentDto.java
│   ├── soap/
│   │   └── PaymentRequest.java
│   └── ... (autres DTOs)
├── enums/                      # Énumérations (11+ enums)
│   ├── OrderStatus.java
│   ├── PaymentStatus.java
│   ├── ProductStatus.java
│   ├── Role.java
│   ├── Status.java
│   ├── DeliveryStatus.java
│   ├── CommissionStatus.java
│   ├── ImportStatus.java
│   ├── PaymentType.java
│   ├── PayoutFrequency.java
│   └── DataFormat.java
├── exception/                  # Gestion des erreurs (4+ exceptions)
│   ├── ResourceNotFoundException.java
│   ├── BusinessException.java
│   ├── ValidationException.java
│   └── ... (autres exceptions)
├── config/                     # Configuration (10+ configurations)
│   ├── SecurityConfig.java
│   ├── DataSeeder.java
│   ├── EnterpriseConfiguration.java
│   ├── PasswordEncoderConfig.java
│   ├── RestTemplateConfig.java
│   ├── SchedulingConfig.java
│   ├── StripeConfig.java
│   ├── WebClientConfig.java
│   ├── WebConfig.java
│   └── WebServiceConfig.java
├── security/                   # Sécurité
│   ├── JwtAuthFilter.java
│   └── JwtUtils.java
├── mapper/                     # Mappers (13+ mappers)
│   ├── ProductMapper.java
│   ├── OrderMapper.java
│   ├── PaymentMapper.java
│   ├── SupplierMapper.java
│   ├── UserMapper.java
│   └── ... (autres mappers)
├── util/                       # Utilitaires
│   ├── ImageUrlValidator.java
│   └── ... (autres utilitaires)
├── utils/                      # Utilitaires supplémentaires (5+ fichiers)
│   ├── EmailUtils.java
│   ├── FileUtils.java
│   ├── ValidationUtils.java
│   └── ... (autres utilitaires)
├── Stage2025Application.java   # Classe principale
└── supplier.wsdl              # Fichier WSDL pour SOAP
```

## ⚙️ Configuration et Démarrage

### Fichier de Configuration Principal
```properties
# application.properties
# Configuration de l'application
spring.application.name=stage2025

# Configuration de la base de données - SÉCURISÉE
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/stage-db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:}

# Configuration avancée du pool de connexions
spring.datasource.hikari.maximumPoolSize=${DB_POOL_MAX_SIZE:20}
spring.datasource.hikari.minimumIdle=${DB_POOL_MIN_IDLE:10}
spring.datasource.hikari.idleTimeout=600000
spring.datasource.hikari.connectionTimeout=30000
spring.datasource.hikari.leakDetectionThreshold=60000

# Configuration JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.jdbc.batch_size=40
spring.jpa.properties.hibernate.default_batch_fetch_size=40
spring.jpa.properties.hibernate.max_fetch_depth=1
spring.jpa.open-in-view=false
spring.jpa.hibernate.ddl-auto=update

# Configuration des fichiers
spring.servlet.multipart.max-file-size=30MB
spring.servlet.multipart.max-request-size=100MB

# Configuration Flyway (désactivée)
spring.flyway.enabled=false
spring.flyway.baseline-on-migrate=true
spring.flyway.locations=classpath:db/migration

# Configuration JWT - SÉCURISÉE
application.security.jwt.secret-key=${JWT_SECRET_KEY:Njg4YWFhYmJiY2NjZGRkZWVlZmZmMDAwMDEyMzQ1Njc4OWFiY2RlZg==}
application.security.jwt.expiration=86400000

# Configuration Email
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${MAIL_USERNAME:ismail3030abderma@gmail.com}
spring.mail.password=${MAIL_PASSWORD:oxzbtsqnxdbrjxee}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# Configuration Stripe - SÉCURISÉE
stripe.secret.key=${STRIPE_SECRET_KEY:sk_test_51Rr415PTOIKoa3xLGSwnzb4u8QSSvIDyYEXS715BLxKPi5Bcb2nG0LxKLT9dL1rFjoCBEYcop8sQktEioKFmesGv00ybAZfhz9}
stripe.publishable.key=${STRIPE_PUBLISHABLE_KEY:pk_test_51Rr415PTOIKoa3xLk646xdY5KgD8julDKXA5AYYuJtT9ysLKSvfQ8iWWE54qCVB8WXZgluDKWr3vYFSiswzav0gj00v1ujOYrl}
stripe.webhook.secret=${STRIPE_WEBHOOK_SECRET:whsec_c7bpNWDGISvAZpGFLF0uHDmcOUwWBB3T}

# Configuration Admin
app.admin.email=${ADMIN_EMAIL:admin@stage2025.com}
app.admin.password=${ADMIN_PASSWORD:Admin123!@}
app.admin.username=${ADMIN_USERNAME:admin}

# Configuration Email
app.email.from=${EMAIL_FROM:noreply@stage2025.com}
app.base-url=${BASE_URL:http://localhost:4200}

# Configuration Management/Actuator
management.endpoints.web.exposure.include=health,info,metrics,prometheus
management.endpoint.health.show-details=always
management.health.db.enabled=true
management.metrics.export.prometheus.enabled=true

# Configuration des fichiers
app.upload.dir=./uploads/supplier-files

# Configuration HTTP
server.max-http-request-header-size=65536
server.port=8080

# Configuration de développement
spring.devtools.restart.enabled=true
spring.devtools.livereload.enabled=true

# Configuration des logs - MODE DEBUG COMPLET
logging.level.root=DEBUG
logging.level.org.springframework=DEBUG
logging.level.org.springframework.web=DEBUG
logging.level.org.springframework.security=DEBUG
```

### Démarrage du Serveur
```bash
# Mode développement
mvn spring-boot:run

# Mode production
mvn clean package
java -jar target/stage2025-1.0.0.jar

# Avec profil spécifique
java -jar target/stage2025-1.0.0.jar --spring.profiles.active=prod
```

## 🔌 API Endpoints

### Produits
```http
GET    /api/products                    # Liste des produits
GET    /api/products/{id}               # Détails d'un produit
POST   /api/products                    # Créer un produit (Admin)
PUT    /api/products/{id}               # Modifier un produit (Admin)
DELETE /api/products/{id}               # Supprimer un produit (Admin)
GET    /api/products/featured           # Produits vedettes
GET    /api/products/category/{name}    # Produits par catégorie
GET    /api/products/supplier/{name}    # Produits par fournisseur
POST   /api/products/import             # Importer des produits
GET    /api/products/import/logs        # Logs d'importation
```

### Commandes
```http
GET    /api/orders                      # Liste des commandes
GET    /api/orders/{id}                 # Détails d'une commande
POST   /api/orders                      # Créer une commande
PUT    /api/orders/{id}                 # Modifier une commande
GET    /api/orders/client/{clientId}    # Commandes d'un client
PUT    /api/orders/{id}/status          # Changer le statut
GET    /api/orders/session/{sessionId}  # Commandes par session
```

### Paiements
```http
POST   /api/payments/create             # Créer un paiement
POST   /api/payments/process            # Traiter un paiement
GET    /api/payments/{id}               # Détails d'un paiement
POST   /api/payment-success/callback    # Callback de succès
POST   /api/payment-success/supplier-own/{orderId}  # Paiement fournisseur
POST   /api/payment-webhook/stripe      # Webhook Stripe
POST   /api/payment-webhook/supplier    # Webhook fournisseur
```

### Fournisseurs
```http
GET    /api/suppliers                   # Liste des fournisseurs
GET    /api/suppliers/{id}              # Détails d'un fournisseur
POST   /api/suppliers                   # Créer un fournisseur
PUT    /api/suppliers/{id}              # Modifier un fournisseur
DELETE /api/suppliers/{id}              # Supprimer un fournisseur
POST   /api/suppliers/{id}/import       # Importer des produits
POST   /api/suppliers/{id}/refresh      # Actualiser les métadonnées
GET    /api/suppliers/{id}/payments     # Paiements du fournisseur
POST   /api/suppliers/{id}/test-soap    # Tester la connexion SOAP
```

### Panier
```http
GET    /api/cart                        # Obtenir le panier
POST   /api/cart/add                    # Ajouter au panier
PUT    /api/cart/update                 # Modifier le panier
DELETE /api/cart/remove                 # Supprimer du panier
POST   /api/cart/clear                  # Vider le panier
```

### Authentification
```http
POST   /api/auth/login                  # Connexion
POST   /api/auth/register               # Inscription
POST   /api/auth/logout                 # Déconnexion
POST   /api/auth/refresh                # Rafraîchir le token
POST   /api/auth/forgot-password        # Mot de passe oublié
POST   /api/auth/reset-password         # Réinitialiser le mot de passe
POST   /api/auth/verify-otp             # Vérifier OTP
POST   /api/auth/resend-otp             # Renvoyer OTP
```

### Administration
```http
GET    /api/admin/products/pending      # Produits en attente
PUT    /api/admin/products/{id}/approve # Approuver un produit
DELETE /api/admin/products/{id}/reject  # Rejeter un produit
GET    /api/admin/orders                # Toutes les commandes
GET    /api/admin/statistics            # Statistiques
GET    /api/admin/dashboard             # Tableau de bord admin
GET    /api/admin/monitoring            # Monitoring système
GET    /api/admin/supplier-payments     # Paiements fournisseurs
POST   /api/admin/supplier-payments/process  # Traiter les paiements
```

### SOAP/Web Services
```http
POST   /api/soap/test                   # Tester SOAP
GET    /api/soap/operations             # Opérations SOAP disponibles
POST   /api/soap/execute                # Exécuter une opération SOAP
GET    /api/soap/wsdl                   # Obtenir le WSDL
POST   /api/soap/diagnostic             # Diagnostic SOAP
```

### Fichiers et Images
```http
POST   /api/files/upload                # Upload de fichiers
GET    /api/files/{id}                  # Télécharger un fichier
DELETE /api/files/{id}                  # Supprimer un fichier
POST   /api/images/upload               # Upload d'images
GET    /api/images/{id}                 # Obtenir une image
```

### Monitoring et Diagnostics
```http
GET    /api/health                      # Santé de l'application
GET    /api/metrics                     # Métriques
GET    /api/actuator/health             # Actuator health
GET    /api/actuator/info               # Informations système
GET    /api/debug/orders/{id}           # Debug commande
GET    /api/diagnostic/system           # Diagnostic système
```

## 🗄️ Base de Données

### Schéma Principal

#### Table Products
```sql
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    displayed_price DECIMAL(10,2) NOT NULL,
    supplier_price DECIMAL(10,2),
    synced_stock INT DEFAULT 0,
    active BOOLEAN DEFAULT FALSE,
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED'),
    external_product_id VARCHAR(255),
    supplier_ref VARCHAR(255),
    category_id BIGINT,
    supplier_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);
```

#### Table Orders
```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'),
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_fee DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    client_id BIGINT,
    address_id BIGINT,
    payment_id BIGINT,
    session_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES users(id),
    FOREIGN KEY (address_id) REFERENCES addresses(id),
    FOREIGN KEY (payment_id) REFERENCES payments(id)
);
```

#### Table Payments
```sql
CREATE TABLE payments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    payment_method VARCHAR(50),
    payment_status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'),
    external_payment_id VARCHAR(255),
    session_id VARCHAR(255),
    commission_amount DECIMAL(10,2),
    supplier_amount DECIMAL(10,2),
    transaction_fee DECIMAL(10,2),
    order_id BIGINT,
    supplier_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);
```

### Relations JPA

#### Entité Product
```java
@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "displayed_price", nullable = false)
    private Double displayedPrice;
    
    @Column(name = "supplier_price")
    private Double supplierPrice;
    
    @Column(name = "synced_stock")
    private Integer syncedStock = 0;
    
    @Column(nullable = false)
    private Boolean active = false;
    
    @Enumerated(EnumType.STRING)
    private ProductStatus status = ProductStatus.PENDING;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;
    
    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> imageUrls = new ArrayList<>();
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems = new ArrayList<>();
}
```

## 🔧 Services et Logique Métier

### ProductService
```java
@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {
    
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;
    
    @Override
    @Transactional(readOnly = true)
    public List<ProductDto> getAllProducts() {
        return productRepository.findActiveProductsFromActiveSuppliers()
                .stream()
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional
    public ProductDto createProduct(ProductDto dto) {
        Category category = categoryRepository.findByName(dto.getCategoryName())
                .orElseThrow(() -> new ResourceNotFoundException("Catégorie non trouvée"));
        
        Supplier supplier = supplierRepository.findByName(dto.getSupplierName())
                .orElseThrow(() -> new ResourceNotFoundException("Fournisseur non trouvé"));
        
        Product product = Product.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .displayedPrice(dto.getDisplayedPrice())
                .imageUrls(dto.getImageUrls())
                .category(category)
                .supplier(supplier)
                .active(false) // Nécessite approbation admin
                .build();
        
        Product saved = productRepository.save(product);
        return ProductMapper.toDto(saved);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<Product> getAllProducts(String category, String supplier, String search, 
                                      boolean includeInactive, Double minPrice, Double maxPrice, 
                                      Pageable pageable) {
        Specification<Product> spec = Specification.where((root, query, criteriaBuilder) -> 
            criteriaBuilder.conjunction());
        
        if (category != null && !category.isBlank()) {
            spec = spec.and((root, q, cb) -> 
                cb.equal(cb.lower(root.get("category").get("name")), category.toLowerCase()));
        }
        
        if (supplier != null && !supplier.isBlank()) {
            spec = spec.and((root, q, cb) -> 
                cb.equal(cb.lower(root.get("supplier").get("name")), supplier.toLowerCase()));
        }
        
        if (search != null && !search.isBlank()) {
            String like = "%" + search.toLowerCase() + "%";
            spec = spec.and((root, q, cb) -> cb.or(
                cb.like(cb.lower(root.get("name")), like),
                cb.like(cb.lower(root.get("description")), like)
            ));
        }
        
        if (!includeInactive) {
            spec = spec.and((root, q, cb) -> cb.and(
                cb.isTrue(root.get("active")),
                cb.equal(root.get("status"), ProductStatus.APPROVED),
                cb.isTrue(root.get("supplier").get("active"))
            ));
        }
        
        if (minPrice != null) {
            spec = spec.and((root, q, cb) -> 
                cb.greaterThanOrEqualTo(root.get("displayedPrice"), minPrice));
        }
        
        if (maxPrice != null) {
            spec = spec.and((root, q, cb) -> 
                cb.lessThanOrEqualTo(root.get("displayedPrice"), maxPrice));
        }
        
        return productRepository.findAll(spec, pageable);
    }
}
```

### PaymentCompletionService
```java
@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentCompletionServiceImpl implements PaymentCompletionService {
    
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final SupplierRepository supplierRepository;
    private final EmailService emailService;
    
    @Override
    @Transactional
    public Map<String, Object> processPaymentCompletion(String sessionId, String orderId, 
                                                       String supplierId, String paymentId, 
                                                       String status, Map<String, Object> webhookData) {
        try {
            // Validation des paramètres
            if (sessionId == null && orderId == null) {
                return Map.of("success", false, "error", "Missing required parameters");
            }
            
            // Recherche de la commande
            Order order = findOrderById(orderId);
            if (order == null) {
                return Map.of("success", false, "error", "Order not found");
            }
            
            // Vérification d'idempotence
            if (OrderStatus.PAID.equals(order.getStatus()) || OrderStatus.COMPLETED.equals(order.getStatus())) {
                return Map.of("success", true, "message", "Order already completed", "idempotent", true);
            }
            
            // Recherche du fournisseur
            Supplier supplier = supplierRepository.findById(Long.valueOf(supplierId))
                    .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));
            
            // Vérification des doublons de paiement
            if (paymentId != null && !paymentId.isEmpty()) {
                var existingPayment = paymentRepository.findByExternalPaymentId(paymentId);
                if (existingPayment.isPresent()) {
                    return Map.of("success", true, "message", "Payment already processed", "idempotent", true);
                }
            }
            
            // Création du paiement
            Payment payment = createPaymentRecord(order, supplier, paymentId, sessionId, webhookData);
            Payment savedPayment = paymentRepository.save(payment);
            
            // Mise à jour de la commande
            order.setStatus(OrderStatus.PAID);
            order.setPayment(savedPayment);
            order.setUpdatedAt(LocalDateTime.now());
            Order savedOrder = orderRepository.save(order);
            
            // Envoi des emails de confirmation
            emailService.sendOrderConfirmationEmail(savedOrder);
            emailService.sendPaymentConfirmationEmail(savedOrder, savedPayment);
            
            return Map.of(
                "success", true,
                "orderId", savedOrder.getId(),
                "paymentId", savedPayment.getId(),
                "message", "Payment completed successfully"
            );
            
        } catch (Exception e) {
            log.error("Payment completion failed", e);
            return Map.of("success", false, "error", e.getMessage());
        }
    }
}
```

## 🔐 Sécurité et Authentification

### Configuration Spring Security
```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {
    
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtRequestFilter jwtRequestFilter;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/products/**").permitAll()
                .requestMatchers("/api/categories/**").permitAll()
                .requestMatchers("/api/payment-success/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/orders/**").hasAnyRole("USER", "ADMIN")
                .anyRequest().authenticated()
            )
            .exceptionHandling(ex -> ex.authenticationEntryPoint(jwtAuthenticationEntryPoint))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
```

### JWT Utilitaire
```java
@Component
@RequiredArgsConstructor
public class JwtUtil {
    
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration}")
    private int expiration;
    
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }
    
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
    
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }
    
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }
    
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }
    
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }
    
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
}
```

## 💳 Gestion des Paiements

### Stripe Integration
```java
@Service
@RequiredArgsConstructor
@Slf4j
public class StripePaymentService {
    
    @Value("${stripe.secret.key}")
    private String stripeSecretKey;
    
    @Value("${stripe.public.key}")
    private String stripePublicKey;
    
    private final Stripe stripe = new Stripe(stripeSecretKey);
    
    public PaymentIntent createPaymentIntent(Long amount, String currency, String orderId) {
        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amount * 100) // Convert to cents
                    .setCurrency(currency)
                    .putMetadata("order_id", orderId.toString())
                    .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                            .setEnabled(true)
                            .build()
                    )
                    .build();
            
            PaymentIntent paymentIntent = stripe.paymentIntents().create(params);
            log.info("Created payment intent: {}", paymentIntent.getId());
            return paymentIntent;
            
        } catch (StripeException e) {
            log.error("Error creating payment intent", e);
            throw new RuntimeException("Failed to create payment intent", e);
        }
    }
    
    public PaymentIntent confirmPaymentIntent(String paymentIntentId) {
        try {
            PaymentIntent paymentIntent = stripe.paymentIntents().retrieve(paymentIntentId);
            return paymentIntent;
        } catch (StripeException e) {
            log.error("Error confirming payment intent", e);
            throw new RuntimeException("Failed to confirm payment intent", e);
        }
    }
}
```

### Webhook Handler
```java
@RestController
@RequestMapping("/api/payment-webhook")
@RequiredArgsConstructor
@Slf4j
public class PaymentWebhookController {
    
    private final PaymentCompletionService paymentCompletionService;
    
    @PostMapping("/stripe")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload, 
                                                    @RequestHeader("Stripe-Signature") String sigHeader) {
        try {
            Event event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
            
            switch (event.getType()) {
                case "payment_intent.succeeded":
                    PaymentIntent paymentIntent = (PaymentIntent) event.getDataObjectDeserializer().getObject().orElse(null);
                    handlePaymentSuccess(paymentIntent);
                    break;
                case "payment_intent.payment_failed":
                    PaymentIntent failedPayment = (PaymentIntent) event.getDataObjectDeserializer().getObject().orElse(null);
                    handlePaymentFailure(failedPayment);
                    break;
                default:
                    log.info("Unhandled event type: {}", event.getType());
            }
            
            return ResponseEntity.ok("Webhook processed successfully");
            
        } catch (Exception e) {
            log.error("Webhook error", e);
            return ResponseEntity.status(400).body("Webhook error");
        }
    }
}
```

## 🏢 Intégration Fournisseurs

### Supplier Service Interface
```java
public interface SupplierService {
    List<SupplierDto> getAllSuppliers();
    SupplierDto getSupplierById(Long id);
    SupplierDto createSupplier(SupplierDto dto);
    SupplierDto updateSupplier(Long id, SupplierDto dto);
    void deleteSupplier(Long id);
    List<ProductDto> importProducts(Long supplierId);
    void refreshMetadata(Long supplierId);
}
```

### API Supplier Implementation
```java
@Service("apiSupplierService")
@RequiredArgsConstructor
@Slf4j
public class ApiSupplierServiceImpl implements SupplierService {
    
    private final WebClient webClient;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    
    @Override
    public List<ProductDto> importProducts(Long supplierId) {
        ApiSupplier supplier = (ApiSupplier) supplierRepository.findById(supplierId)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));
        
        try {
            // Appel API du fournisseur
            String response = webClient.get()
                    .uri(supplier.getApiUrl())
                    .header("Authorization", "Bearer " + supplier.getApiKey())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            
            // Parsing de la réponse
            List<ProductDto> products = parseApiResponse(response);
            
            // Sauvegarde des produits
            List<Product> savedProducts = new ArrayList<>();
            for (ProductDto productDto : products) {
                Product product = createProductFromDto(productDto, supplier);
                savedProducts.add(productRepository.save(product));
            }
            
            log.info("Imported {} products from API supplier {}", savedProducts.size(), supplier.getName());
            return savedProducts.stream().map(ProductMapper::toDto).collect(Collectors.toList());
            
        } catch (Exception e) {
            log.error("Error importing products from API supplier", e);
            throw new RuntimeException("Failed to import products", e);
        }
    }
}
```

### SOAP Supplier Implementation
```java
@Service("soapSupplierService")
@RequiredArgsConstructor
@Slf4j
public class SoapSupplierServiceImpl implements SupplierService {
    
    private final SoapClient soapClient;
    private final ProductRepository productRepository;
    
    @Override
    public List<ProductDto> importProducts(Long supplierId) {
        SoapSupplier supplier = (SoapSupplier) supplierRepository.findById(supplierId)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));
        
        try {
            // Configuration du client SOAP
            SoapClient soapClient = SoapClient.builder()
                    .endpoint(supplier.getWsdlUrl())
                    .username(supplier.getUsername())
                    .password(supplier.getPassword())
                    .build();
            
            // Appel de l'opération SOAP
            SoapResponse response = soapClient.call(supplier.getOperation(), new HashMap<>());
            
            // Parsing de la réponse SOAP
            List<ProductDto> products = parseSoapResponse(response);
            
            // Sauvegarde des produits
            List<Product> savedProducts = new ArrayList<>();
            for (ProductDto productDto : products) {
                Product product = createProductFromDto(productDto, supplier);
                savedProducts.add(productRepository.save(product));
            }
            
            log.info("Imported {} products from SOAP supplier {}", savedProducts.size(), supplier.getName());
            return savedProducts.stream().map(ProductMapper::toDto).collect(Collectors.toList());
            
        } catch (Exception e) {
            log.error("Error importing products from SOAP supplier", e);
            throw new RuntimeException("Failed to import products", e);
        }
    }
}
```

## 🧪 Tests et Qualité

### Tests Unitaires
```java
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
    
    @Mock
    private ProductRepository productRepository;
    
    @Mock
    private CategoryRepository categoryRepository;
    
    @Mock
    private SupplierRepository supplierRepository;
    
    @InjectMocks
    private ProductServiceImpl productService;
    
    @Test
    void shouldCreateProductSuccessfully() {
        // Given
        ProductDto productDto = ProductDto.builder()
                .name("Test Product")
                .description("Test Description")
                .displayedPrice(100.0)
                .categoryName("Electronics")
                .supplierName("Test Supplier")
                .build();
        
        Category category = new Category();
        category.setName("Electronics");
        
        Supplier supplier = new Supplier();
        supplier.setName("Test Supplier");
        
        when(categoryRepository.findByName("Electronics")).thenReturn(Optional.of(category));
        when(supplierRepository.findByName("Test Supplier")).thenReturn(Optional.of(supplier));
        when(productRepository.save(any(Product.class))).thenReturn(new Product());
        
        // When
        ProductDto result = productService.createProduct(productDto);
        
        // Then
        assertThat(result).isNotNull();
        verify(productRepository).save(any(Product.class));
    }
    
    @Test
    void shouldThrowExceptionWhenCategoryNotFound() {
        // Given
        ProductDto productDto = ProductDto.builder()
                .categoryName("NonExistentCategory")
                .build();
        
        when(categoryRepository.findByName("NonExistentCategory")).thenReturn(Optional.empty());
        
        // When & Then
        assertThrows(ResourceNotFoundException.class, () -> productService.createProduct(productDto));
    }
}
```

### Tests d'Intégration
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = "classpath:application-test.properties")
class ProductControllerIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Test
    void shouldGetAllProducts() {
        // Given
        Product product = Product.builder()
                .name("Test Product")
                .displayedPrice(100.0)
                .active(true)
                .build();
        productRepository.save(product);
        
        // When
        ResponseEntity<ProductDto[]> response = restTemplate.getForEntity("/api/products", ProductDto[].class);
        
        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).hasSize(1);
        assertThat(response.getBody()[0].getName()).isEqualTo("Test Product");
    }
}
```

### Configuration de Tests
```properties
# application-test.properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
logging.level.org.springframework.web=DEBUG
```

## 🚀 Déploiement

### Configuration Docker
```dockerfile
# Dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/stage2025-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: stage2025_db
      MYSQL_USER: stage2025_user
      MYSQL_PASSWORD: stage2025_password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
  
  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/stage2025_db
      SPRING_DATASOURCE_USERNAME: stage2025_user
      SPRING_DATASOURCE_PASSWORD: stage2025_password
    depends_on:
      - mysql
    volumes:
      - ./logs:/app/logs

volumes:
  mysql_data:
```

### Script de Déploiement
```bash
#!/bin/bash
# deploy.sh

echo "Starting deployment..."

# Build the application
echo "Building application..."
mvn clean package -DskipTests

# Build Docker image
echo "Building Docker image..."
docker build -t stage2025-backend .

# Stop existing containers
echo "Stopping existing containers..."
docker-compose down

# Start new containers
echo "Starting new containers..."
docker-compose up -d

# Wait for application to start
echo "Waiting for application to start..."
sleep 30

# Health check
echo "Performing health check..."
curl -f http://localhost:8080/api/payment-success/test || exit 1

echo "Deployment completed successfully!"
```

## 📊 Monitoring et Logs

### Configuration des Logs
```xml
<!-- logback-spring.xml -->
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/application.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/application.%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <root level="INFO">
        <appender-ref ref="STDOUT" />
        <appender-ref ref="FILE" />
    </root>
</configuration>
```

### Métriques et Monitoring
```java
@Component
@RequiredArgsConstructor
public class MetricsService {
    
    private final MeterRegistry meterRegistry;
    
    public void recordOrderCreated() {
        Counter.builder("orders.created")
                .description("Number of orders created")
                .register(meterRegistry)
                .increment();
    }
    
    public void recordPaymentProcessed(String status) {
        Counter.builder("payments.processed")
                .tag("status", status)
                .description("Number of payments processed")
                .register(meterRegistry)
                .increment();
    }
    
    public void recordProductImported(String supplierType) {
        Counter.builder("products.imported")
                .tag("supplier_type", supplierType)
                .description("Number of products imported")
                .register(meterRegistry)
                .increment();
    }
}
```

### Health Checks
```java
@Component
@RequiredArgsConstructor
public class DatabaseHealthIndicator implements HealthIndicator {
    
    private final DataSource dataSource;
    
    @Override
    public Health health() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(1)) {
                return Health.up()
                        .withDetail("database", "Available")
                        .withDetail("validationQuery", "SELECT 1")
                        .build();
            }
        } catch (SQLException e) {
            return Health.down()
                    .withDetail("database", "Unavailable")
                    .withDetail("error", e.getMessage())
                    .build();
        }
        return Health.down().withDetail("database", "Unavailable").build();
    }
}
```

---

## 📚 Ressources et Liens Utiles

- **Documentation Spring Boot** : https://spring.io/projects/spring-boot
- **Documentation JPA/Hibernate** : https://hibernate.org/orm/documentation/
- **Documentation MySQL** : https://dev.mysql.com/doc/
- **Documentation Stripe** : https://stripe.com/docs
- **Documentation Swagger** : https://swagger.io/docs/

---

*Dernière mise à jour : Décembre 2025*
