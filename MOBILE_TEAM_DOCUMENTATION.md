# Documentation Mobile - Stage2025 E-commerce Platform

## 📋 Table des Matières
1. [Architecture Mobile](#architecture-mobile)
2. [Structure du Projet](#structure-du-projet)
3. [Configuration et Démarrage](#configuration-et-démarrage)
4. [Écrans Principaux](#écrans-principaux)
5. [Services et State Management](#services-et-state-management)
6. [Navigation et Routing](#navigation-et-routing)
7. [Authentification](#authentification)
8. [Intégration API](#intégration-api)
9. [UI/UX et Thèmes](#uiux-et-thèmes)
10. [Tests et Qualité](#tests-et-qualité)
11. [Build et Déploiement](#build-et-déploiement)
12. [Performance et Optimisation](#performance-et-optimisation)

## 🏗️ Architecture Mobile

### Stack Technologique
- **Framework** : Flutter 3.10+
- **Language** : Dart 3.0+
- **State Management** : Provider + Riverpod
- **Navigation** : GoRouter
- **HTTP Client** : Dio
- **Local Storage** : SharedPreferences + Hive
- **Testing** : Flutter Test + Integration Test

### Architecture en Couches
```
┌─────────────────────────────────────┐
│           Screens/Pages             │ ← Presentation Layer
├─────────────────────────────────────┤
│           Providers                 │ ← State Management Layer
├─────────────────────────────────────┤
│           Services                  │ ← Business Logic Layer
├─────────────────────────────────────┤
│           Models                    │ ← Data Models Layer
├─────────────────────────────────────┤
│           API Client                │ ← Data Access Layer
└─────────────────────────────────────┘
```

## 📁 Structure du Projet

```
mobile_flutter/lib/
├── config/                       # Configuration
│   └── environment.dart
├── main.dart                     # Point d'entrée
├── models/                       # Modèles de données
│   ├── product.dart
│   ├── order.dart
│   ├── cart.dart
│   └── user.dart
├── providers/                    # Gestion d'état
│   ├── auth_provider.dart
│   ├── products_provider.dart
│   ├── cart_provider.dart
│   └── orders_provider.dart
├── services/                     # Services métier
│   ├── api_client.dart
│   ├── auth_service.dart
│   ├── product_service.dart
│   ├── order_service.dart
│   ├── cart_service.dart
│   └── search_service.dart
├── screens/                      # Écrans de l'application
│   ├── login_screen.dart
│   ├── products_screen.dart
│   ├── product_detail_screen.dart
│   ├── cart_screen.dart
│   ├── checkout_screen.dart
│   ├── orders_screen.dart
│   ├── order_detail_screen.dart
│   ├── profile_screen.dart
│   └── wishlist_screen.dart
├── widgets/                      # Widgets réutilisables
│   ├── product_card.dart
│   ├── custom_app_bar.dart
│   ├── loading_widget.dart
│   └── error_widget.dart
└── utils/                        # Utilitaires
    ├── constants.dart
    ├── helpers.dart
    └── validators.dart
```

## ⚙️ Configuration et Démarrage

### Prérequis
```bash
# Flutter SDK 3.10+
flutter --version

# Dart SDK 3.0+ (inclus avec Flutter)
dart --version

# Android Studio (pour Android)
# Xcode (pour iOS - macOS uniquement)
```

### Installation
```bash
# Cloner le projet
git clone [repository-url]
cd mobile_flutter

# Vérifier l'environnement Flutter
flutter doctor

# Installer les dépendances
flutter pub get

# Démarrer l'application
flutter run

# Ou sur un appareil spécifique
flutter run -d chrome          # Web
flutter run -d android         # Android
flutter run -d ios             # iOS (macOS uniquement)
```

### Configuration de l'Environnement
```dart
// lib/config/environment.dart
class Environment {
  static const String apiUrl = 'http://localhost:8080/api';
  static const String appName = 'Stage2025';
  static const String version = '1.0.0';
  static const bool isProduction = false;
  
  // Configuration Stripe
  static const String stripePublishableKey = 'pk_test_your_key';
  
  // Configuration de debug
  static const bool enableLogging = true;
  static const bool enableAnalytics = false;
}
```

### Dépendances Principales
```yaml
# pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  provider: ^6.0.5
  riverpod: ^2.4.0
  flutter_riverpod: ^2.4.0
  
  # Navigation
  go_router: ^12.0.0
  
  # HTTP Client
  dio: ^5.3.0
  retrofit: ^4.0.0
  
  # Local Storage
  shared_preferences: ^2.2.0
  hive: ^2.2.3
  hive_flutter: ^1.1.0
  
  # UI Components
  cupertino_icons: ^1.0.6
  material_design_icons_flutter: ^7.0.0
  
  # Utils
  intl: ^0.18.1
  cached_network_image: ^3.3.0
  shimmer: ^3.0.0
  pull_to_refresh: ^2.0.0
  
  # Payment
  stripe_payment: ^1.1.4
  
  # Analytics
  firebase_analytics: ^10.5.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0
  hive_generator: ^2.0.0
  retrofit_generator: ^8.0.0
  build_runner: ^2.4.6
```

## 📱 Écrans Principaux

### ProductsScreen
```dart
// lib/screens/products_screen.dart
class ProductsScreen extends ConsumerStatefulWidget {
  const ProductsScreen({super.key});

  @override
  ConsumerState<ProductsScreen> createState() => _ProductsScreenState();
}

class _ProductsScreenState extends ConsumerState<ProductsScreen> {
  final ScrollController _scrollController = ScrollController();
  final TextEditingController _searchController = TextEditingController();
  
  String _selectedCategory = '';
  String _selectedSupplier = '';
  String _sortBy = 'name';
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _loadProducts();
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  void _loadProducts() async {
    setState(() => _isLoading = true);
    
    try {
      await ref.read(productsProvider.notifier).loadProducts(
        category: _selectedCategory,
        supplier: _selectedSupplier,
        search: _searchController.text,
        sortBy: _sortBy,
      );
    } catch (e) {
      _showErrorSnackBar('Erreur lors du chargement des produits');
    } finally {
      setState(() => _isLoading = false);
    }
  }

  void _onScroll() {
    if (_scrollController.position.pixels >= 
        _scrollController.position.maxScrollExtent * 0.8) {
      _loadMoreProducts();
    }
  }

  void _loadMoreProducts() async {
    if (!_isLoading) {
      await ref.read(productsProvider.notifier).loadMoreProducts();
    }
  }

  @override
  Widget build(BuildContext context) {
    final productsState = ref.watch(productsProvider);
    
    return Scaffold(
      appBar: CustomAppBar(
        title: 'Produits',
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: _showSearchDialog,
          ),
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: _showFilterDialog,
          ),
        ],
      ),
      body: Column(
        children: [
          // Barre de recherche
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Rechercher un produit...',
                prefixIcon: const Icon(Icons.search),
                suffixIcon: _searchController.text.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear),
                        onPressed: () {
                          _searchController.clear();
                          _loadProducts();
                        },
                      )
                    : null,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              onSubmitted: (_) => _loadProducts(),
            ),
          ),
          
          // Liste des produits
          Expanded(
            child: _buildProductsList(productsState),
          ),
        ],
      ),
    );
  }

  Widget _buildProductsList(ProductsState state) {
    if (state.isLoading && state.products.isEmpty) {
      return const Center(child: CircularProgressIndicator());
    }

    if (state.hasError) {
      return ErrorWidget(
        message: state.errorMessage ?? 'Erreur inconnue',
        onRetry: _loadProducts,
      );
    }

    if (state.products.isEmpty) {
      return const EmptyStateWidget(
        icon: Icons.inventory_2,
        title: 'Aucun produit trouvé',
        subtitle: 'Essayez de modifier vos critères de recherche',
      );
    }

    return RefreshIndicator(
      onRefresh: _loadProducts,
      child: GridView.builder(
        controller: _scrollController,
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          childAspectRatio: 0.7,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
        ),
        itemCount: state.products.length + (state.isLoadingMore ? 1 : 0),
        itemBuilder: (context, index) {
          if (index == state.products.length) {
            return const Center(child: CircularProgressIndicator());
          }
          
          return ProductCard(
            product: state.products[index],
            onTap: () => _navigateToProductDetail(state.products[index]),
            onAddToCart: () => _addToCart(state.products[index]),
          );
        },
      ),
    );
  }

  void _showSearchDialog() {
    showDialog(
      context: context,
      builder: (context) => SearchDialog(
        controller: _searchController,
        onSearch: _loadProducts,
      ),
    );
  }

  void _showFilterDialog() {
    showDialog(
      context: context,
      builder: (context) => FilterDialog(
        selectedCategory: _selectedCategory,
        selectedSupplier: _selectedSupplier,
        sortBy: _sortBy,
        onApply: (category, supplier, sortBy) {
          setState(() {
            _selectedCategory = category;
            _selectedSupplier = supplier;
            _sortBy = sortBy;
          });
          _loadProducts();
        },
      ),
    );
  }

  void _navigateToProductDetail(Product product) {
    context.go('/products/${product.id}');
  }

  void _addToCart(Product product) {
    ref.read(cartProvider.notifier).addToCart(product);
    _showSuccessSnackBar('Produit ajouté au panier');
  }

  void _showErrorSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.red,
      ),
    );
  }

  void _showSuccessSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.green,
      ),
    );
  }
}
```

### ProductDetailScreen
```dart
// lib/screens/product_detail_screen.dart
class ProductDetailScreen extends ConsumerStatefulWidget {
  final int productId;
  
  const ProductDetailScreen({
    super.key,
    required this.productId,
  });

  @override
  ConsumerState<ProductDetailScreen> createState() => _ProductDetailScreenState();
}

class _ProductDetailScreenState extends ConsumerState<ProductDetailScreen> {
  int _quantity = 1;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _loadProduct();
  }

  void _loadProduct() async {
    setState(() => _isLoading = true);
    
    try {
      await ref.read(productsProvider.notifier).loadProduct(widget.productId);
    } catch (e) {
      _showErrorSnackBar('Erreur lors du chargement du produit');
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final productState = ref.watch(productsProvider);
    final product = productState.selectedProduct;
    
    if (_isLoading && product == null) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    if (product == null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Produit')),
        body: const Center(
          child: Text('Produit non trouvé'),
        ),
      );
    }

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          // App Bar avec image
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              background: CachedNetworkImage(
                imageUrl: product.imageUrl ?? '',
                fit: BoxFit.cover,
                placeholder: (context, url) => const ShimmerWidget(),
                errorWidget: (context, url, error) => const Icon(Icons.error),
              ),
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.favorite_border),
                onPressed: () => _toggleWishlist(product),
              ),
              IconButton(
                icon: const Icon(Icons.share),
                onPressed: () => _shareProduct(product),
              ),
            ],
          ),
          
          // Contenu du produit
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Nom et prix
                  Text(
                    product.name,
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  const SizedBox(height: 8),
                  
                  Row(
                    children: [
                      Text(
                        '${product.price.toStringAsFixed(2)} €',
                        style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                          color: Theme.of(context).primaryColor,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      if (product.originalPrice != null && 
                          product.originalPrice! > product.price) ...[
                        const SizedBox(width: 8),
                        Text(
                          '${product.originalPrice!.toStringAsFixed(2)} €',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            decoration: TextDecoration.lineThrough,
                            color: Colors.grey,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: Colors.red,
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            '-${((product.originalPrice! - product.price) / product.originalPrice! * 100).round()}%',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                  
                  const SizedBox(height: 16),
                  
                  // Description
                  Text(
                    'Description',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    product.description ?? 'Aucune description disponible',
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                  
                  const SizedBox(height: 24),
                  
                  // Sélecteur de quantité
                  Row(
                    children: [
                      Text(
                        'Quantité:',
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const SizedBox(width: 16),
                      Row(
                        children: [
                          IconButton(
                            icon: const Icon(Icons.remove),
                            onPressed: _quantity > 1 ? () => setState(() => _quantity--) : null,
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                            decoration: BoxDecoration(
                              border: Border.all(color: Colors.grey),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              _quantity.toString(),
                              style: Theme.of(context).textTheme.titleMedium,
                            ),
                          ),
                          IconButton(
                            icon: const Icon(Icons.add),
                            onPressed: () => setState(() => _quantity++),
                          ),
                        ],
                      ),
                    ],
                  ),
                  
                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),
        ],
      ),
      
      // Boutons d'action
      bottomNavigationBar: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Theme.of(context).scaffoldBackgroundColor,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 4,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () => _addToCart(product),
                icon: const Icon(Icons.shopping_cart),
                label: const Text('Ajouter au panier'),
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: ElevatedButton.icon(
                onPressed: () => _buyNow(product),
                icon: const Icon(Icons.shopping_bag),
                label: const Text('Acheter maintenant'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _addToCart(Product product) {
    ref.read(cartProvider.notifier).addToCart(product, _quantity);
    _showSuccessSnackBar('Produit ajouté au panier');
  }

  void _buyNow(Product product) {
    ref.read(cartProvider.notifier).addToCart(product, _quantity);
    context.go('/checkout');
  }

  void _toggleWishlist(Product product) {
    // Implémentation de la wishlist
  }

  void _shareProduct(Product product) {
    // Implémentation du partage
  }

  void _showErrorSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.red,
      ),
    );
  }

  void _showSuccessSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.green,
      ),
    );
  }
}
```

## 🔧 Services et State Management

### ProductsProvider
```dart
// lib/providers/products_provider.dart
@riverpod
class ProductsNotifier extends _$ProductsNotifier {
  @override
  ProductsState build() => const ProductsState();

  Future<void> loadProducts({
    String? category,
    String? supplier,
    String? search,
    String? sortBy,
  }) async {
    state = state.copyWith(isLoading: true, hasError: false);
    
    try {
      final products = await ref.read(productServiceProvider).getProducts(
        category: category,
        supplier: supplier,
        search: search,
        sortBy: sortBy,
      );
      
      state = state.copyWith(
        products: products,
        isLoading: false,
        hasError: false,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        hasError: true,
        errorMessage: e.toString(),
      );
    }
  }

  Future<void> loadMoreProducts() async {
    if (state.isLoadingMore) return;
    
    state = state.copyWith(isLoadingMore: true);
    
    try {
      final moreProducts = await ref.read(productServiceProvider).getProducts(
        page: (state.products.length / 20).ceil() + 1,
      );
      
      state = state.copyWith(
        products: [...state.products, ...moreProducts],
        isLoadingMore: false,
      );
    } catch (e) {
      state = state.copyWith(isLoadingMore: false);
    }
  }

  Future<void> loadProduct(int productId) async {
    try {
      final product = await ref.read(productServiceProvider).getProduct(productId);
      state = state.copyWith(selectedProduct: product);
    } catch (e) {
      // Gestion d'erreur
    }
  }
}

@riverpod
class ProductsState extends _$ProductsState {
  @override
  ProductsState build() => const ProductsState();
}

class ProductsState {
  final List<Product> products;
  final Product? selectedProduct;
  final bool isLoading;
  final bool isLoadingMore;
  final bool hasError;
  final String? errorMessage;

  const ProductsState({
    this.products = const [],
    this.selectedProduct,
    this.isLoading = false,
    this.isLoadingMore = false,
    this.hasError = false,
    this.errorMessage,
  });

  ProductsState copyWith({
    List<Product>? products,
    Product? selectedProduct,
    bool? isLoading,
    bool? isLoadingMore,
    bool? hasError,
    String? errorMessage,
  }) {
    return ProductsState(
      products: products ?? this.products,
      selectedProduct: selectedProduct ?? this.selectedProduct,
      isLoading: isLoading ?? this.isLoading,
      isLoadingMore: isLoadingMore ?? this.isLoadingMore,
      hasError: hasError ?? this.hasError,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}
```

### ProductService
```dart
// lib/services/product_service.dart
@riverpod
ProductService productService(ProductServiceRef ref) {
  return ProductService(ref.read(apiClientProvider));
}

class ProductService {
  final ApiClient _apiClient;

  ProductService(this._apiClient);

  Future<List<Product>> getProducts({
    String? category,
    String? supplier,
    String? search,
    String? sortBy,
    int page = 1,
    int limit = 20,
  }) async {
    try {
      final response = await _apiClient.getProducts(
        category: category,
        supplier: supplier,
        search: search,
        sortBy: sortBy,
        page: page,
        limit: limit,
      );
      
      return response.data.map((json) => Product.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Erreur lors du chargement des produits: $e');
    }
  }

  Future<Product> getProduct(int id) async {
    try {
      final response = await _apiClient.getProduct(id);
      return Product.fromJson(response.data);
    } catch (e) {
      throw Exception('Erreur lors du chargement du produit: $e');
    }
  }

  Future<List<Product>> getFeaturedProducts() async {
    try {
      final response = await _apiClient.getFeaturedProducts();
      return response.data.map((json) => Product.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Erreur lors du chargement des produits vedettes: $e');
    }
  }

  Future<List<Product>> getSuggestedProducts(int productId) async {
    try {
      final response = await _apiClient.getSuggestedProducts(productId);
      return response.data.map((json) => Product.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Erreur lors du chargement des suggestions: $e');
    }
  }
}
```

### ApiClient
```dart
// lib/services/api_client.dart
@riverpod
ApiClient apiClient(ApiClientRef ref) {
  return ApiClient();
}

class ApiClient {
  late final Dio _dio;

  ApiClient() {
    _dio = Dio(BaseOptions(
      baseUrl: Environment.apiUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    ));

    _dio.interceptors.add(LogInterceptor(
      requestBody: true,
      responseBody: true,
      logPrint: (obj) => debugPrint(obj.toString()),
    ));

    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        // Ajouter le token d'authentification
        final token = await SharedPreferences.getInstance()
            .then((prefs) => prefs.getString('token'));
        
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        
        handler.next(options);
      },
      onError: (error, handler) async {
        if (error.response?.statusCode == 401) {
          // Token expiré, rediriger vers la page de connexion
          // Implémentation de la déconnexion automatique
        }
        handler.next(error);
      },
    ));
  }

  Future<Response<List<dynamic>>> getProducts({
    String? category,
    String? supplier,
    String? search,
    String? sortBy,
    int page = 1,
    int limit = 20,
  }) async {
    final queryParams = <String, dynamic>{
      'page': page - 1,
      'size': limit,
    };

    if (category != null) queryParams['category'] = category;
    if (supplier != null) queryParams['supplier'] = supplier;
    if (search != null) queryParams['search'] = search;
    if (sortBy != null) queryParams['sortBy'] = sortBy;

    return await _dio.get('/products', queryParameters: queryParams);
  }

  Future<Response<Map<String, dynamic>>> getProduct(int id) async {
    return await _dio.get('/products/$id');
  }

  Future<Response<List<dynamic>>> getFeaturedProducts() async {
    return await _dio.get('/products/featured');
  }

  Future<Response<List<dynamic>>> getSuggestedProducts(int productId) async {
    return await _dio.get('/products/$productId/suggested');
  }

  Future<Response<List<dynamic>>> getCategories() async {
    return await _dio.get('/categories');
  }

  Future<Response<List<dynamic>>> getSuppliers() async {
    return await _dio.get('/suppliers');
  }
}
```

## 🛣️ Navigation et Routing

### Configuration GoRouter
```dart
// lib/main.dart
void main() {
  runApp(
    ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);
    
    return MaterialApp.router(
      title: Environment.appName,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      routerConfig: router,
    );
  }
}

// lib/routes.dart
final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/products',
    routes: [
      // Routes publiques
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/register',
        builder: (context, state) => const RegisterScreen(),
      ),
      GoRoute(
        path: '/products',
        builder: (context, state) => const ProductsScreen(),
        routes: [
          GoRoute(
            path: '/:id',
            builder: (context, state) {
              final productId = int.parse(state.pathParameters['id']!);
              return ProductDetailScreen(productId: productId);
            },
          ),
        ],
      ),
      
      // Routes protégées
      GoRoute(
        path: '/cart',
        builder: (context, state) => const CartScreen(),
      ),
      GoRoute(
        path: '/checkout',
        builder: (context, state) => const CheckoutScreen(),
      ),
      GoRoute(
        path: '/orders',
        builder: (context, state) => const OrdersScreen(),
        routes: [
          GoRoute(
            path: '/:id',
            builder: (context, state) {
              final orderId = int.parse(state.pathParameters['id']!);
              return OrderDetailScreen(orderId: orderId);
            },
          ),
        ],
      ),
      GoRoute(
        path: '/profile',
        builder: (context, state) => const ProfileScreen(),
      ),
      GoRoute(
        path: '/wishlist',
        builder: (context, state) => const WishlistScreen(),
      ),
    ],
    redirect: (context, state) {
      final isLoggedIn = ref.read(authProvider).isAuthenticated;
      final isLoggingIn = state.matchedLocation == '/login' || 
                          state.matchedLocation == '/register';
      
      if (!isLoggedIn && !isLoggingIn) {
        return '/login';
      }
      
      if (isLoggedIn && isLoggingIn) {
        return '/products';
      }
      
      return null;
    },
  );
});
```

## 🔐 Authentification

### AuthProvider
```dart
// lib/providers/auth_provider.dart
@riverpod
class AuthNotifier extends _$AuthNotifier {
  @override
  AuthState build() => const AuthState();

  Future<void> login(String email, String password) async {
    state = state.copyWith(isLoading: true, hasError: false);
    
    try {
      final response = await ref.read(authServiceProvider).login(email, password);
      
      // Sauvegarder le token
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', response.token);
      await prefs.setString('user', jsonEncode(response.user.toJson()));
      
      state = state.copyWith(
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        hasError: false,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        hasError: true,
        errorMessage: e.toString(),
      );
    }
  }

  Future<void> register(String email, String password, String name) async {
    state = state.copyWith(isLoading: true, hasError: false);
    
    try {
      final response = await ref.read(authServiceProvider).register(email, password, name);
      
      // Sauvegarder le token
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', response.token);
      await prefs.setString('user', jsonEncode(response.user.toJson()));
      
      state = state.copyWith(
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        hasError: false,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        hasError: true,
        errorMessage: e.toString(),
      );
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    await prefs.remove('user');
    
    state = const AuthState();
  }

  Future<void> loadUserFromStorage() async {
    final prefs = await SharedPreferences.getInstance();
    final userJson = prefs.getString('user');
    final token = prefs.getString('token');
    
    if (userJson != null && token != null) {
      final user = User.fromJson(jsonDecode(userJson));
      state = state.copyWith(
        user: user,
        isAuthenticated: true,
      );
    }
  }
}

class AuthState {
  final User? user;
  final bool isAuthenticated;
  final bool isLoading;
  final bool hasError;
  final String? errorMessage;

  const AuthState({
    this.user,
    this.isAuthenticated = false,
    this.isLoading = false,
    this.hasError = false,
    this.errorMessage,
  });

  AuthState copyWith({
    User? user,
    bool? isAuthenticated,
    bool? isLoading,
    bool? hasError,
    String? errorMessage,
  }) {
    return AuthState(
      user: user ?? this.user,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      isLoading: isLoading ?? this.isLoading,
      hasError: hasError ?? this.hasError,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}
```

## 🎨 UI/UX et Thèmes

### Thème Personnalisé
```dart
// lib/theme/app_theme.dart
class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: const Color(0xFF1976D2),
        brightness: Brightness.light,
      ),
      appBarTheme: const AppBarTheme(
        centerTitle: true,
        elevation: 0,
        scrolledUnderElevation: 1,
      ),
      cardTheme: CardTheme(
        elevation: 2,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: const Color(0xFF1976D2),
        brightness: Brightness.dark,
      ),
      // Configuration similaire pour le thème sombre
    );
  }
}
```

### Widgets Personnalisés
```dart
// lib/widgets/product_card.dart
class ProductCard extends StatelessWidget {
  final Product product;
  final VoidCallback? onTap;
  final VoidCallback? onAddToCart;

  const ProductCard({
    super.key,
    required this.product,
    this.onTap,
    this.onAddToCart,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Image du produit
            Expanded(
              flex: 3,
              child: CachedNetworkImage(
                imageUrl: product.imageUrl ?? '',
                fit: BoxFit.cover,
                width: double.infinity,
                placeholder: (context, url) => const ShimmerWidget(),
                errorWidget: (context, url, error) => Container(
                  color: Colors.grey[300],
                  child: const Icon(Icons.error, size: 48),
                ),
              ),
            ),
            
            // Informations du produit
            Expanded(
              flex: 2,
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Nom du produit
                    Text(
                      product.name,
                      style: Theme.of(context).textTheme.titleSmall,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    
                    const SizedBox(height: 4),
                    
                    // Prix
                    Row(
                      children: [
                        Text(
                          '${product.price.toStringAsFixed(2)} €',
                          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            color: Theme.of(context).primaryColor,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        if (product.originalPrice != null && 
                            product.originalPrice! > product.price) ...[
                          const SizedBox(width: 8),
                          Text(
                            '${product.originalPrice!.toStringAsFixed(2)} €',
                            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              decoration: TextDecoration.lineThrough,
                              color: Colors.grey,
                            ),
                          ),
                        ],
                      ],
                    ),
                    
                    const Spacer(),
                    
                    // Bouton d'ajout au panier
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        onPressed: onAddToCart,
                        icon: const Icon(Icons.shopping_cart, size: 16),
                        label: const Text('Ajouter'),
                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 8),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

## 🧪 Tests et Qualité

### Tests Unitaires
```dart
// test/services/product_service_test.dart
void main() {
  group('ProductService', () {
    late ProductService productService;
    late MockApiClient mockApiClient;

    setUp(() {
      mockApiClient = MockApiClient();
      productService = ProductService(mockApiClient);
    });

    test('should return products when getProducts is called', () async {
      // Arrange
      final mockProducts = [
        {'id': 1, 'name': 'Test Product', 'price': 100.0},
        {'id': 2, 'name': 'Test Product 2', 'price': 200.0},
      ];
      
      when(mockApiClient.getProducts()).thenAnswer(
        (_) async => Response<List<dynamic>>(
          data: mockProducts,
          statusCode: 200,
        ),
      );

      // Act
      final result = await productService.getProducts();

      // Assert
      expect(result, isA<List<Product>>());
      expect(result.length, equals(2));
      expect(result.first.name, equals('Test Product'));
    });

    test('should throw exception when API call fails', () async {
      // Arrange
      when(mockApiClient.getProducts()).thenThrow(Exception('API Error'));

      // Act & Assert
      expect(
        () => productService.getProducts(),
        throwsA(isA<Exception>()),
      );
    });
  });
}
```

### Tests d'Intégration
```dart
// integration_test/app_test.dart
void main() {
  group('App Integration Tests', () {
    testWidgets('should navigate to product detail when product is tapped',
        (WidgetTester tester) async {
      // Arrange
      await tester.pumpWidget(MyApp());
      await tester.pumpAndSettle();

      // Act
      await tester.tap(find.byType(ProductCard).first);
      await tester.pumpAndSettle();

      // Assert
      expect(find.byType(ProductDetailScreen), findsOneWidget);
    });

    testWidgets('should add product to cart when add button is pressed',
        (WidgetTester tester) async {
      // Arrange
      await tester.pumpWidget(MyApp());
      await tester.pumpAndSettle();

      // Act
      await tester.tap(find.byIcon(Icons.shopping_cart).first);
      await tester.pumpAndSettle();

      // Assert
      expect(find.text('Produit ajouté au panier'), findsOneWidget);
    });
  });
}
```

## 🚀 Build et Déploiement

### Configuration de Build
```yaml
# pubspec.yaml
flutter:
  uses-material-design: true
  
  # Configuration des assets
  assets:
    - assets/images/
    - assets/icons/
  
  # Configuration des fonts
  fonts:
    - family: Roboto
      fonts:
        - asset: assets/fonts/Roboto-Regular.ttf
        - asset: assets/fonts/Roboto-Bold.ttf
          weight: 700
```

### Scripts de Build
```bash
# Build pour Android
flutter build apk --release

# Build pour iOS
flutter build ios --release

# Build pour Web
flutter build web --release

# Build pour toutes les plateformes
flutter build apk --release
flutter build ios --release
flutter build web --release
```

### Configuration Android
```gradle
// android/app/build.gradle
android {
    compileSdkVersion 34
    
    defaultConfig {
        applicationId "com.stage2025.mobile"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Configuration iOS
```xml
<!-- ios/Runner/Info.plist -->
<dict>
    <key>CFBundleDisplayName</key>
    <string>Stage2025</string>
    <key>CFBundleIdentifier</key>
    <string>com.stage2025.mobile</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
</dict>
```

## ⚡ Performance et Optimisation

### Optimisation des Images
```dart
// Utilisation de CachedNetworkImage pour le cache
CachedNetworkImage(
  imageUrl: product.imageUrl ?? '',
  memCacheWidth: 300, // Optimisation de la mémoire
  memCacheHeight: 300,
  placeholder: (context, url) => const ShimmerWidget(),
  errorWidget: (context, url, error) => const Icon(Icons.error),
)
```

### Lazy Loading
```dart
// Utilisation de ListView.builder pour les listes longues
ListView.builder(
  itemCount: products.length,
  itemBuilder: (context, index) {
    return ProductCard(product: products[index]);
  },
)
```

### Gestion de la Mémoire
```dart
// Disposal des contrôleurs
@override
void dispose() {
  _scrollController.dispose();
  _searchController.dispose();
  super.dispose();
}
```

---

## 📚 Ressources et Liens Utiles

- **Documentation Flutter** : https://flutter.dev/docs
- **Riverpod** : https://riverpod.dev/
- **GoRouter** : https://pub.dev/packages/go_router
- **Dio** : https://pub.dev/packages/dio
- **Cached Network Image** : https://pub.dev/packages/cached_network_image

---

*Dernière mise à jour : Décembre 2024*
