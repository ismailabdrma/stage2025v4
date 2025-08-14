import 'package:dio/dio.dart';
import '../models/product.dart';
import 'api_client.dart';

class ProductService {
  final ApiClient _client;
  ProductService(this._client);

  Future<List<ProductModel>> getProducts({Map<String, dynamic>? query}) async {
    final Response res = await _client.get('/api/products', query: query);
    final data = res.data;
    if (data is List) {
      return data.map((e) => ProductModel.fromJson(Map<String, dynamic>.from(e))).toList();
    }
    if (data is Map && data['content'] is List) {
      return (data['content'] as List).map((e) => ProductModel.fromJson(Map<String, dynamic>.from(e))).toList();
    }
    return [];
  }

  Future<ProductModel> getProduct(int id) async {
    final Response res = await _client.get('/api/products/$id');
    final raw = res.data;
    final Map<String, dynamic> map = raw is String ? (raw.isEmpty ? {} : Map<String, dynamic>.from({})) : Map<String, dynamic>.from(raw);
    return ProductModel.fromJson(map);
  }
}



import '../models/product.dart';
import 'api_client.dart';

class ProductService {
  final ApiClient _client;
  ProductService(this._client);

  Future<List<ProductModel>> getProducts({Map<String, dynamic>? query}) async {
    final Response res = await _client.get('/api/products', query: query);
    final data = res.data;
    if (data is List) {
      return data.map((e) => ProductModel.fromJson(Map<String, dynamic>.from(e))).toList();
    }
    if (data is Map && data['content'] is List) {
      return (data['content'] as List).map((e) => ProductModel.fromJson(Map<String, dynamic>.from(e))).toList();
    }
    return [];
  }

  Future<ProductModel> getProduct(int id) async {
    final Response res = await _client.get('/api/products/$id');
    return ProductModel.fromJson(Map<String, dynamic>.from(res.data));
  }
}











