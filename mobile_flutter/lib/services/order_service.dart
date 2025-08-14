import 'package:dio/dio.dart';
import 'api_client.dart';

class MobileOrderService {
  final ApiClient _client;
  MobileOrderService(this._client);

  Future<List<Map<String, dynamic>>> listMyOrders() async {
    final Response res = await _client.get('/api/orders');
    final data = res.data;
    if (data is List) return data.cast<Map<String, dynamic>>();
    return [];
  }

  Future<Map<String, dynamic>> getOrder(int id) async {
    final Response res = await _client.get('/api/orders/$id');
    return Map<String, dynamic>.from(res.data);
  }
}


