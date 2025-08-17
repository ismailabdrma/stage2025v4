import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/api_client.dart';
import '../services/order_service.dart';

class OrderDetailScreen extends StatefulWidget {
  const OrderDetailScreen({super.key});

  @override
  State<OrderDetailScreen> createState() => _OrderDetailScreenState();
}

class _OrderDetailScreenState extends State<OrderDetailScreen> {
  late final MobileOrderService _service;
  Map<String, dynamic>? _order;
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _service = MobileOrderService(context.read<ApiClient>());
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final id = ModalRoute.of(context)!.settings.arguments as int;
      _load(id);
    });
  }

  Future<void> _load(int id) async {
    setState(() { _loading = true; _error = null; });
    try {
      final o = await _service.getOrder(id);
      setState(() { _order = o; });
    } catch (e) {
      setState(() { _error = e.toString(); });
    } finally {
      setState(() { _loading = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Order Detail')),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text(_error!))
              : _order == null
                  ? const SizedBox.shrink()
                  : Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Order #${_order!['id']}'),
                          const SizedBox(height: 8),
                          Text('Status: ${_order!['status']}'),
                          const SizedBox(height: 8),
                          Text('Total: €${_order!['total']}'),
                          const Divider(height: 24),
                          const Text('Shipping Address', style: TextStyle(fontWeight: FontWeight.bold)),
                          if (_order!['shippingAddressDto'] != null) ...[
                            Text(_order!['shippingAddressDto']['street'] ?? ''),
                            Text('${_order!['shippingAddressDto']['city'] ?? ''} ${_order!['shippingAddressDto']['zipCode'] ?? ''}'),
                            Text(_order!['shippingAddressDto']['country'] ?? ''),
                            const SizedBox(height: 12),
                          ],
                          const Text('Items', style: TextStyle(fontWeight: FontWeight.bold)),
                          Expanded(
                            child: ListView.builder(
                              itemCount: (_order!['items'] as List).length,
                              itemBuilder: (context, index) {
                                final it = (_order!['items'] as List)[index] as Map<String, dynamic>;
                                return ListTile(
                                  title: Text(it['productName']?.toString() ?? ''),
                                  trailing: Text('x${it['quantity']}  €${it['unitPrice']}'),
                                );
                              },
                            ),
                          )
                        ],
                      ),
                    ),
    );
  }
}







