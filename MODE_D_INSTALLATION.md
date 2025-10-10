# Mode d'Installation - Stage2025 E-commerce Platform

## 📋 Table des Matières
1. [Prérequis système](#prérequis-système)
2. [Installation de l'environnement](#installation-de-lenvironnement)
3. [Configuration de la base de données](#configuration-de-la-base-de-données)
4. [Installation du backend](#installation-du-backend)
5. [Installation du frontend](#installation-du-frontend)
6. [Installation de l'application mobile](#installation-de-lapplication-mobile)
7. [Configuration des services](#configuration-des-services)
8. [Déploiement en production](#déploiement-en-production)
9. [Vérification de l'installation](#vérification-de-linstallation)
10. [Dépannage](#dépannage)

## 🖥️ Prérequis système

### Configuration minimale
- **OS** : Windows 10/11, macOS 10.15+, ou Linux Ubuntu 18.04+
- **RAM** : 8 GB minimum (16 GB recommandé)
- **Stockage** : 10 GB d'espace libre
- **Processeur** : 4 cœurs minimum

### Logiciels requis

#### Backend (Java/Spring Boot)
- **Java** : JDK 17 ou supérieur
- **Maven** : 3.8+ pour la gestion des dépendances
- **Base de données** : MySQL 8.0+ ou PostgreSQL 13+

#### Frontend (Angular)
- **Node.js** : 18.x ou 20.x LTS
- **npm** : 9.x ou supérieur
- **Angular CLI** : 16.x ou supérieur

#### Mobile (Flutter)
- **Flutter SDK** : 3.10+ (stable)
- **Dart SDK** : 3.0+ (inclus avec Flutter)
- **Android Studio** : Pour le développement Android
- **Xcode** : Pour le développement iOS (macOS uniquement)

## 🔧 Installation de l'environnement

### 1. Installation de Java

#### Windows
```bash
# Télécharger depuis https://adoptium.net/
# Installer JDK 17 LTS
# Vérifier l'installation
java -version
javac -version
```

#### macOS
```bash
# Avec Homebrew
brew install openjdk@17
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install openjdk-17-jdk
java -version
```

### 2. Installation de Maven

#### Windows
```bash
# Télécharger depuis https://maven.apache.org/download.cgi
# Extraire et ajouter au PATH
# Vérifier l'installation
mvn -version
```

#### macOS
```bash
brew install maven
mvn -version
```

#### Linux
```bash
sudo apt install maven
mvn -version
```

### 3. Installation de Node.js et npm

#### Toutes plateformes
```bash
# Télécharger depuis https://nodejs.org/
# Installer la version LTS (18.x ou 20.x)
# Vérifier l'installation
node -v
npm -v
```

#### Installation d'Angular CLI
```bash
npm install -g @angular/cli@16
ng version
```

### 4. Installation de Flutter

#### Toutes plateformes
```bash
# Télécharger depuis https://flutter.dev/docs/get-started/install
# Extraire et ajouter au PATH
# Vérifier l'installation
flutter doctor
```

#### Configuration Android (optionnel)
```bash
# Installer Android Studio
# Configurer les variables d'environnement
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## 🗄️ Configuration de la base de données

### Installation de MySQL

#### Windows
```bash
# Télécharger MySQL Installer depuis https://dev.mysql.com/downloads/installer/
# Installer MySQL Server 8.0
# Configurer le mot de passe root
```

#### macOS
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

#### Linux
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

### Création de la base de données

```sql
-- Connexion à MySQL
mysql -u root -p

-- Création de la base de données
CREATE DATABASE stage2025_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Création d'un utilisateur dédié
CREATE USER 'stage2025_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON stage2025_db.* TO 'stage2025_user'@'localhost';
FLUSH PRIVILEGES;

-- Vérification
SHOW DATABASES;
```

### Configuration de l'application

#### Fichier application.properties
```properties
# src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/stage2025_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=stage2025_user
spring.datasource.password=votre_mot_de_passe
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Server Configuration
server.port=8080
server.servlet.context-path=/
```

## 🚀 Installation du backend

### 1. Cloner le repository
```bash
git clone [URL_DU_REPOSITORY]
cd stage2025v4
```

### 2. Configuration des variables d'environnement
```bash
# Créer le fichier .env (optionnel)
echo "DB_PASSWORD=votre_mot_de_passe" > .env
echo "JWT_SECRET=votre_secret_jwt" >> .env
```

### 3. Installation des dépendances
```bash
# Compilation et installation
mvn clean install

# Vérification des tests
mvn test
```

### 4. Démarrage du serveur
```bash
# Mode développement
mvn spring-boot:run

# Mode production
mvn package
java -jar target/stage2025-1.0.0.jar
```

### 5. Vérification du backend
```bash
# Test de santé
curl http://localhost:8080/api/payment-success/test

# Documentation API
# Ouvrir http://localhost:8080/swagger-ui.html
```

## 🌐 Installation du frontend

### 1. Navigation vers le dossier frontend
```bash
cd frontend
```

### 2. Installation des dépendances
```bash
# Installation des packages npm
npm install

# Vérification des dépendances
npm audit
```

### 3. Configuration de l'environnement
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

### 4. Configuration du proxy
```json
// proxy.conf.json
{
  "/api/*": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

### 5. Démarrage du serveur de développement
```bash
# Démarrage avec proxy
ng serve --proxy-config proxy.conf.json

# Ou démarrage simple
ng serve
```

### 6. Vérification du frontend
```bash
# Ouvrir http://localhost:4200
# Vérifier que l'interface se charge correctement
```

## 📱 Installation de l'application mobile

### 1. Navigation vers le dossier mobile
```bash
cd mobile_flutter
```

### 2. Vérification de l'environnement Flutter
```bash
flutter doctor
# Résoudre tous les problèmes signalés
```

### 3. Installation des dépendances
```bash
flutter pub get
```

### 4. Configuration de l'API
```dart
// lib/config/environment.dart
class Environment {
  static const String apiUrl = 'http://localhost:8080/api';
  static const String appName = 'Stage2025';
}
```

### 5. Compilation et test
```bash
# Test sur émulateur Android
flutter run

# Test sur émulateur iOS (macOS uniquement)
flutter run -d ios

# Test sur navigateur web
flutter run -d chrome
```

## ⚙️ Configuration des services

### 1. Configuration des fournisseurs

#### Fournisseur API
```json
{
  "name": "Mon Fournisseur API",
  "type": "API",
  "apiUrl": "https://api.fournisseur.com",
  "apiKey": "votre_cle_api",
  "active": true
}
```

#### Fournisseur Excel
```json
{
  "name": "Mon Fournisseur Excel",
  "type": "EXCEL",
  "filePath": "/uploads/excel/fournisseur.xlsx",
  "active": true
}
```

#### Fournisseur SOAP
```json
{
  "name": "Mon Fournisseur SOAP",
  "type": "SOAP",
  "wsdlUrl": "https://api.fournisseur.com/soap?wsdl",
  "username": "votre_username",
  "password": "votre_password",
  "active": true
}
```

### 2. Configuration des paiements

#### Stripe (paiements directs)
```properties
# application.properties
stripe.public.key=pk_test_votre_cle_publique
stripe.secret.key=sk_test_votre_cle_secrete
stripe.webhook.secret=whsec_votre_secret_webhook
```

#### Configuration des webhooks
```bash
# URL de webhook Stripe
https://votre-domaine.com/api/payment-webhook/stripe

# URL de retour de paiement
https://votre-domaine.com/api/payment-success/callback
```

### 3. Configuration de l'email

#### SMTP Configuration
```properties
# application.properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=votre_email@gmail.com
spring.mail.password=votre_mot_de_passe_app
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

## 🚀 Déploiement en production

### 1. Configuration de production

#### Base de données
```properties
# application-prod.properties
spring.datasource.url=jdbc:mysql://prod-server:3306/stage2025_prod
spring.datasource.username=stage2025_prod_user
spring.datasource.password=MotDePasseSecurise123!
spring.jpa.hibernate.ddl-auto=validate
```

#### Sécurité
```properties
# Configuration JWT
jwt.secret=SecretJWTTrèsSecuriséPourProduction123!
jwt.expiration=86400000

# CORS
cors.allowed.origins=https://votre-domaine.com
```

### 2. Build de production

#### Backend
```bash
# Build avec profil de production
mvn clean package -Pprod

# Création du JAR
java -jar target/stage2025-1.0.0.jar --spring.profiles.active=prod
```

#### Frontend
```bash
# Build de production
ng build --prod

# Les fichiers sont générés dans dist/
```

#### Mobile
```bash
# Build Android
flutter build apk --release

# Build iOS
flutter build ios --release
```

### 3. Déploiement avec Docker (optionnel)

#### Dockerfile Backend
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/stage2025-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

#### Dockerfile Frontend
```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

#### Docker Compose
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: stage2025_db
    ports:
      - "3306:3306"
  
  backend:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - mysql
  
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

## ✅ Vérification de l'installation

### 1. Tests de santé

#### Backend
```bash
# Test de l'API
curl http://localhost:8080/api/payment-success/test

# Test des services
curl http://localhost:8080/api/payment-success/debug/services

# Test de la base de données
curl http://localhost:8080/api/products
```

#### Frontend
```bash
# Vérifier que l'application se charge
curl http://localhost:4200

# Vérifier les appels API
# Ouvrir les outils de développement du navigateur
```

#### Mobile
```bash
# Test de l'application
flutter test

# Test sur émulateur
flutter run --debug
```

### 2. Tests fonctionnels

#### Test complet du flux
1. **Création d'un compte** utilisateur
2. **Navigation** dans le catalogue
3. **Ajout de produits** au panier
4. **Processus de commande** complet
5. **Paiement** avec un fournisseur
6. **Vérification** du statut de la commande

#### Test administrateur
1. **Connexion** en tant qu'administrateur
2. **Gestion des produits** (ajout, modification, suppression)
3. **Gestion des commandes** (validation, suivi)
4. **Configuration des fournisseurs**

## 🔧 Dépannage

### Problèmes courants

#### Backend ne démarre pas
```bash
# Vérifier Java
java -version

# Vérifier Maven
mvn -version

# Vérifier la base de données
mysql -u root -p -e "SHOW DATABASES;"

# Vérifier les logs
tail -f logs/application.log
```

#### Frontend ne se charge pas
```bash
# Vérifier Node.js
node -v
npm -v

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install

# Vérifier le proxy
curl http://localhost:8080/api/products
```

#### Mobile ne compile pas
```bash
# Vérifier Flutter
flutter doctor

# Nettoyer le cache
flutter clean
flutter pub get

# Vérifier les dépendances
flutter pub deps
```

### Logs et monitoring

#### Logs applicatifs
```bash
# Backend
tail -f logs/application.log

# Frontend (console du navigateur)
# F12 > Console

# Mobile
flutter logs
```

#### Monitoring de la base de données
```sql
-- Vérifier les connexions
SHOW PROCESSLIST;

-- Vérifier les tables
SHOW TABLES;

-- Vérifier les données
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM orders;
```

### Support et assistance

#### Documentation
- **API** : http://localhost:8080/swagger-ui.html
- **Code** : Documentation inline dans le code
- **Guides** : Fichiers README dans chaque module

#### Contact
- **Développeur** : [Votre nom]
- **Email** : [votre.email@example.com]
- **Repository** : [URL du repository]

---

## 📚 Ressources supplémentaires

- [Guide d'utilisation](MODE_D_UTILISATION.md)
- [Documentation API](API_ENDPOINTS_REFERENCE.md)
- [Guide de sécurité](SECURITY.md)
- [Rapport technique](Rapport_Stage2025.tex)




---

*Dernière mise à jour : Décembre 2024*
