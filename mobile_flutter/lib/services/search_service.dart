import 'package:dio/dio.dart';
import '../models/product.dart';
import 'api_client.dart';

class MobileSearchService {
  final ApiClient _client;
  MobileSearchService(this._client);

  Future<List<ProductModel>> search(String q) async {
    final Response res = await _client.get('/api/products', query: {'q': q});
    final data = res.data;
    if (data is List) {
      return data.map((e) => ProductModel.fromJson(Map<String, dynamic>.from(e))).toList();
    }
    if (data is Map && data['content'] is List) {
      return (data['content'] as List).map((e) => ProductModel.fromJson(Map<String, dynamic>.from(e))).toList();
    }
    return [];
  }
}


