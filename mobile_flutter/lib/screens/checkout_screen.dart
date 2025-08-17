import 'package:flutter/material.dart';
import '../models/cart.dart';

class CheckoutScreen extends StatelessWidget {
  const CheckoutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final CartModel cart = ModalRoute.of(context)!.settings.arguments as CartModel;
    return Scaffold(
      appBar: AppBar(title: const Text('Checkout')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text('Total: €${cart.total.toStringAsFixed(2)}', style: const TextStyle(fontSize: 18)),
            const SizedBox(height: 16),
            const Text('Stripe integration TBD (mobile Elements or redirect).'),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Mobile Stripe flow not implemented yet.')),
                );
              },
              child: const Text('Pay with Stripe'),
            ),
          ],
        ),
      ),
    );
  }
}







