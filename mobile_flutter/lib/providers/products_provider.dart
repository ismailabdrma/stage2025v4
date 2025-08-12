import 'package:flutter/foundation.dart';
import '../models/product.dart';
import '../services/api_client.dart';
import '../services/product_service.dart';

class ProductsProvider extends ChangeNotifier {
  final ProductService _service;
  List<ProductModel> products = [];
  bool loading = false;
  String? error;

  ProductsProvider(ApiClient client) : _service = ProductService(client);

  Future<void> load() async {
    loading = true; error = null; notifyListeners();
    try {
      products = await _service.getProducts();
    } catch (e) {
      error = e.toString();
    } finally {
      loading = false; notifyListeners();
    }
  }
}



import '../models/product.dart';
import '../services/api_client.dart';
import '../services/product_service.dart';

class ProductsProvider extends ChangeNotifier {
  final ProductService _service;
  List<ProductModel> products = [];
  bool loading = false;
  String? error;

  ProductsProvider(ApiClient client) : _service = ProductService(client);

  Future<void> load() async {
    loading = true; error = null; notifyListeners();
    try {
      products = await _service.getProducts();
    } catch (e) {
      error = e.toString();
    } finally {
      loading = false; notifyListeners();
    }
  }
}











