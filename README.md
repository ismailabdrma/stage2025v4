# Stage2025 - E-commerce Platform

A modern e-commerce platform built with Angular 17+ frontend and Spring Boot backend, featuring Stripe payment integration.

## 🚀 Features

- **Modern Angular 17+** with standalone components
- **Spring Boot 3.5+** backend with JPA/Hibernate
- **Stripe Payment Integration** for secure payments
- **JWT Authentication** with OTP verification
- **Responsive Design** for all devices
- **Admin Panel** for product and order management
- **Real-time Product Import** from suppliers
- **Shopping Cart** functionality
- **Order Management** system

## 🛠️ Recent Fixes Applied

### Frontend Fixes
- ✅ Fixed mixed React/Angular dependencies in root package.json
- ✅ Added Stripe payment dependencies
- ✅ Fixed syntax errors in home component
- ✅ Added missing MatDividerModule import
- ✅ Added missing getAllCategories method to ProductService
- ✅ Created comprehensive payment component with Stripe integration
- ✅ Added payment routes to orders module
- ✅ Fixed TypeScript compilation errors

### Backend Fixes
- ✅ Fixed syntax error in ProductImportService.java
- ✅ Created PaymentController for Stripe integration
- ✅ Added payment DTOs (PaymentIntentRequest, PaymentIntentResponse, PaymentConfirmRequest)
- ✅ Created StripeConfig for API key initialization
- ✅ Updated application.properties with Stripe configuration

## 📋 Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8.0+
- Angular CLI 17+
- Maven 3.6+

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd stage2025v2
npm run install-all
```

### 1.b Installation automatique locale du JDK 17 (Gestion des versions inférieures)

Pour les utilisateurs ayant une version de Java inférieure à 17 installée sur leur machine, un script d’installation locale est fourni afin de télécharger et configurer un JDK 17 directement dans le dossier du projet sans modifier la configuration Java globale.

#### macOS / Linux
```bash
chmod +x install-jdk-17-macOS.sh
./install-jdk-17-macOS.sh
```

Le script `install-jdk-17-macOS.sh` détecte automatiquement l’architecture (Intel ou ARM) et télécharge la version adaptée du JDK 17 dans un dossier `jdk` local.

#### Windows
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\install-jdk-17-windows.ps1
```

Le script PowerShell `install-jdk-17-windows.ps1` télécharge et extrait le JDK 17 64 bits dans un dossier `jdk-windows` local.

#### Configuration dans IntelliJ IDEA

Après l’exécution des scripts, configurez IntelliJ pour utiliser le JDK local :

- **macOS / Linux** : sélectionnez le SDK pointant vers `./jdk/<nom-dossier>/Contents/Home`
- **Windows** : sélectionnez le SDK pointant vers `.\jdk-windows\<nom-dossier>`

Cette méthode garantit le bon fonctionnement de la plateforme quelle que soit la version Java installée globalement sur la machine, sans modifier l’environnement système.

### 2. Configure Stripe (Required for Payments)

1. Sign up for a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Set environment variables:

```bash
# Windows
set STRIPE_SECRET_KEY=sk_test_your_actual_secret_key
set STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key

# Linux/Mac
export STRIPE_SECRET_KEY=sk_test_your_actual_secret_key
export STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key
```

### 3. Configure Database

Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/stage-db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 4. Start the Application

#### Backend (Spring Boot)
```bash
# From project root
./mvnw spring-boot:run
```

#### Frontend (Angular)
```bash
# From project root
npm start
# OR from frontend directory
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:4200
- Backend API: http://localhost:8080

## 🏗️ Project Structure

```
stage2025v2/
├── frontend/                 # Angular 17+ Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/         # Core services, guards, interceptors
│   │   │   ├── features/     # Feature modules
│   │   │   │   ├── auth/     # Authentication
│   │   │   │   ├── products/ # Product management
│   │   │   │   ├── cart/     # Shopping cart
│   │   │   │   ├── orders/   # Order management & payments
│   │   │   │   ├── profile/  # User profile
│   │   │   │   └── admin/    # Admin panel
│   │   └── shared/           # Shared components
│   │   └── environments/     # Environment configs
│   └── package.json
├── src/main/java/           # Spring Boot Backend
│   └── com/example/stage2025/
│       ├── controller/      # REST controllers
│       ├── service/         # Business logic
│       ├── entity/          # JPA entities
│       ├── dto/             # Data transfer objects
│       ├── repository/      # Data access layer
│       └── config/          # Configuration classes
└── pom.xml
```

## 💳 Payment Integration

The application includes a complete Stripe payment integration:

### Frontend Payment Flow
1. User adds items to cart
2. Proceeds to checkout
3. Enters payment information using Stripe Elements
4. Payment is processed securely through Stripe
5. Order status is updated upon successful payment

### Backend Payment Endpoints
- `POST /api/payments/create-payment-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/health` - Health check

## 🔧 Configuration

### Environment Variables
```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Database
DB_URL=jdbc:mysql://localhost:3306/stage-db
DB_USERNAME=your_username
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=86400000
```

### Frontend Environment
Update `frontend/src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:8080",
  stripePublishableKey: "pk_test_your_publishable_key"
};
```

## 🧪 Testing

### Backend Tests
```bash
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 API Documentation

The backend provides RESTful APIs for:

- **Authentication**: `/api/auth/*`
- **Products**: `/api/products/*`
- **Orders**: `/api/orders/*`
- **Payments**: `/api/payments/*`
- **Admin**: `/api/admin/*`

## 🔒 Security

- JWT-based authentication
- Role-based access control (ADMIN, CLIENT)
- CORS configuration
- Input validation
- Secure payment processing with Stripe

## 🚀 Deployment

### Backend Deployment
```bash
./mvnw clean package
java -jar target/stage2025-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy dist/stage2025-angular/ to your web server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the logs for error messages
2. Verify your Stripe API keys are correct
3. Ensure your database is running and accessible
4. Check that all environment variables are set

For additional support, please open an issue in the repository.

`