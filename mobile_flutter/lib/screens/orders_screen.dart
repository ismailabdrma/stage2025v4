import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/api_client.dart';
import '../services/order_service.dart';

class OrdersScreen extends StatefulWidget {
  const OrdersScreen({super.key});

  @override
  State<OrdersScreen> createState() => _OrdersScreenState();
}

class _OrdersScreenState extends State<OrdersScreen> {
  late final MobileOrderService _service;
  List<Map<String, dynamic>> _orders = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _service = MobileOrderService(context.read<ApiClient>());
    _load();
  }

  Future<void> _load() async {
    setState(() { _loading = true; _error = null; });
    try {
      final list = await _service.listMyOrders();
      setState(() { _orders = list; });
    } catch (e) {
      setState(() { _error = e.toString(); });
    } finally {
      setState(() { _loading = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Orders')),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text(_error!))
              : ListView.separated(
                  itemCount: _orders.length,
                  separatorBuilder: (_, __) => const Divider(height: 1),
                  itemBuilder: (context, index) {
                    final o = _orders[index];
                    final id = o['id'] ?? o['orderId'];
                    final status = o['status'] ?? 'UNKNOWN';
                    final total = (o['total'] ?? 0).toString();
                    return ListTile(
                      title: Text('Order #$id'),
                      subtitle: Text('Status: $status'),
                      trailing: Text('€$total'),
                      onTap: () => Navigator.pushNamed(context, '/order', arguments: id),
                    );
                  },
                ),
    );
  }
}


