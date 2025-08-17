import 'package:dio/dio.dart';
import '../models/cart.dart';
import 'api_client.dart';

class MobileCartService {
  final ApiClient _client;
  MobileCartService(this._client);

  Future<CartModel> getCart() async {
    final Response res = await _client.get('/api/cart');
    final data = res.data as Map<String, dynamic>;
    final items = (data['items'] as List<dynamic>? ?? []).map((e) {
      final m = e as Map<String, dynamic>;
      return CartItemModel(
        id: (m['id'] as num).toInt(),
        productId: (m['productId'] as num).toInt(),
        productName: m['productName'] as String,
        unitPrice: (m['unitPrice'] ?? m['price'] as num).toDouble(),
        quantity: (m['quantity'] as num).toInt(),
        productImage: m['productImage'] as String?,
      );
    }).toList();
    final itemCount = (data['totalItems'] ?? data['itemCount'] ?? items.fold<int>(0, (s, it) => s + it.quantity)) as int;
    final total = ((data['totalAmount'] ?? data['total']) as num?)?.toDouble() ??
        items.fold<double>(0, (s, it) => s + it.unitPrice * it.quantity);
    return CartModel(items: items, itemCount: itemCount, total: total);
  }

  Future<CartModel> addItem({required int productId, int quantity = 1}) async {
    final Response res = await _client.post('/api/cart/items', data: {
      'productId': productId,
      'quantity': quantity,
    });
    return getCart();
  }

  Future<CartModel> updateQuantity(int cartItemId, int quantity) async {
    await _client.put('/api/cart/items/$cartItemId', data: {'quantity': quantity});
    return getCart();
  }

  Future<CartModel> removeItem(int cartItemId) async {
    await _client.delete('/api/cart/items/$cartItemId');
    return getCart();
  }
}







