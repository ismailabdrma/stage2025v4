import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/auth_provider.dart';
import 'providers/products_provider.dart';
import 'services/api_client.dart';
import 'screens/login_screen.dart';
import 'screens/otp_screen.dart';
import 'screens/products_screen.dart';
import 'screens/product_detail_screen.dart';

void main() {
  final apiClient = ApiClient();
  runApp(MobileApp(apiClient: apiClient));
}

class MobileApp extends StatelessWidget {
  final ApiClient apiClient;
  const MobileApp({super.key, required this.apiClient});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider(apiClient)),
        ChangeNotifierProvider(create: (_) => ProductsProvider(apiClient)),
      ],
      child: MaterialApp(
        title: 'Stage2025 Mobile',
        theme: ThemeData(useMaterial3: true, colorSchemeSeed: Colors.blue),
        initialRoute: '/login',
        routes: {
          '/login': (_) => const LoginScreen(),
          '/otp': (_) => const OtpScreen(),
          '/products': (_) => const ProductsScreen(),
          '/product': (_) => const ProductDetailScreen(),
        },
      ),
    );
  }
}



import 'package:provider/provider.dart';
import 'providers/auth_provider.dart';
import 'providers/products_provider.dart';
import 'services/api_client.dart';
import 'screens/login_screen.dart';
import 'screens/otp_screen.dart';
import 'screens/products_screen.dart';
import 'screens/product_detail_screen.dart';

void main() {
  final apiClient = ApiClient();
  runApp(MobileApp(apiClient: apiClient));
}

class MobileApp extends StatelessWidget {
  final ApiClient apiClient;
  const MobileApp({super.key, required this.apiClient});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider(apiClient)),
        ChangeNotifierProvider(create: (_) => ProductsProvider(apiClient)),
      ],
      child: MaterialApp(
        title: 'Stage2025 Mobile',
        theme: ThemeData(useMaterial3: true, colorSchemeSeed: Colors.blue),
        initialRoute: '/login',
        routes: {
          '/login': (_) => const LoginScreen(),
          '/otp': (_) => const OtpScreen(),
          '/products': (_) => const ProductsScreen(),
          '/product': (_) => const ProductDetailScreen(),
        },
      ),
    );
  }
}











