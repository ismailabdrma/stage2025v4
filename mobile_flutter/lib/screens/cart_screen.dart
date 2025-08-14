import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/cart.dart';
import '../services/api_client.dart';
import '../services/cart_service.dart';

class CartScreen extends StatefulWidget {
  const CartScreen({super.key});

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  late final MobileCartService _service;
  CartModel? _cart;
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _service = MobileCartService(context.read<ApiClient>());
    _load();
  }

  Future<void> _load() async {
    setState(() { _loading = true; _error = null; });
    try {
      final c = await _service.getCart();
      setState(() { _cart = c; });
    } catch (e) {
      setState(() { _error = e.toString(); });
    } finally {
      setState(() { _loading = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Cart')),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text(_error!))
              : _cart == null || _cart!.items.isEmpty
                  ? const Center(child: Text('Your cart is empty'))
                  : Column(
                      children: [
                        Expanded(
                          child: ListView.separated(
                            itemCount: _cart!.items.length,
                            separatorBuilder: (_, __) => const Divider(height: 1),
                            itemBuilder: (context, index) {
                              final item = _cart!.items[index];
                              return ListTile(
                                leading: item.productImage != null && item.productImage!.isNotEmpty
                                    ? Image.network(item.productImage!, width: 56, height: 56, fit: BoxFit.cover)
                                    : const Icon(Icons.inventory_2),
                                title: Text(item.productName),
                                subtitle: Text('€${item.unitPrice.toStringAsFixed(2)} x ${item.quantity}'),
                                trailing: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    IconButton(
                                      icon: const Icon(Icons.remove),
                                      onPressed: () async {
                                        final q = item.quantity > 1 ? item.quantity - 1 : 1;
                                        final updated = await _service.updateQuantity(item.id, q);
                                        setState(() { _cart = updated; });
                                      },
                                    ),
                                    Text('${item.quantity}'),
                                    IconButton(
                                      icon: const Icon(Icons.add),
                                      onPressed: () async {
                                        final updated = await _service.updateQuantity(item.id, item.quantity + 1);
                                        setState(() { _cart = updated; });
                                      },
                                    ),
                                    IconButton(
                                      icon: const Icon(Icons.delete_outline),
                                      onPressed: () async {
                                        final updated = await _service.removeItem(item.id);
                                        setState(() { _cart = updated; });
                                      },
                                    ),
                                  ],
                                ),
                              );
                            },
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              Text('Subtotal: €${_cart!.total.toStringAsFixed(2)}', textAlign: TextAlign.right),
                              const SizedBox(height: 8),
                              ElevatedButton(
                                onPressed: () {
                                  Navigator.pushNamed(context, '/checkout', arguments: _cart);
                                },
                                child: const Text('Checkout'),
                              ),
                            ],
                          ),
                        )
                      ],
                    ),
    );
  }
}


