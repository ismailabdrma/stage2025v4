# Stage2025 Mobile (Flutter)

A Flutter client for the Stage2025 REST API. Targets Android, iOS, and Web.

## Prerequisites
- Flutter SDK 3.16+ (stable)
- Android Studio/Xcode toolchains for device builds (optional if you run on Web)

## First-time setup
```bash
cd mobile_flutter
# Create missing platform folders (android/ios/web) for this source-only template
flutter create .
# Install dependencies
flutter pub get
# Configure API base URL (default http://10.0.2.2:8082)
# Edit: lib/config/environment.dart
# Run on Chrome (Web) or on a device
flutter run -d chrome
```

## What’s included (MVP)
- Auth: login (admin = direct JWT; user = OTP verification step)
- Products: list and detail with image proxy/base64 support
- Simple in-memory cart placeholder (extend as needed)

## Structure
- `lib/config/environment.dart` – API base URL
- `lib/models/` – Product, User
- `lib/services/` – Api client, AuthService, ProductService
- `lib/providers/` – AuthProvider, ProductsProvider
- `lib/screens/` – Login, OTP Verify, Products List, Product Detail
- `lib/widgets/` – ProductCard

Extend progressively to orders, payments, and admin features.




A Flutter client for the Stage2025 REST API. Targets Android, iOS, and Web.

## Prerequisites
- Flutter SDK 3.16+ (stable)
- Android Studio/Xcode toolchains for device builds (optional if you run on Web)

## First-time setup
```bash
cd mobile_flutter
# Create missing platform folders (android/ios/web) for this source-only template
flutter create .
# Install dependencies
flutter pub get
# Configure API base URL (default http://10.0.2.2:8082)
# Edit: lib/config/environment.dart
# Run on Chrome (Web) or on a device
flutter run -d chrome
```

## What’s included (MVP)
- Auth: login (admin = direct JWT; user = OTP verification step)
- Products: list and detail with image proxy/base64 support
- Simple in-memory cart placeholder (extend as needed)

## Structure
- `lib/config/environment.dart` – API base URL
- `lib/models/` – Product, User
- `lib/services/` – Api client, AuthService, ProductService
- `lib/providers/` – AuthProvider, ProductsProvider
- `lib/screens/` – Login, OTP Verify, Products List, Product Detail
- `lib/widgets/` – ProductCard

Extend progressively to orders, payments, and admin features.











