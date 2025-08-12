import 'package:flutter/material.dart';
import '../models/product.dart';

class ProductDetailScreen extends StatelessWidget {
  const ProductDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final ProductModel p = ModalRoute.of(context)!.settings.arguments as ProductModel;
    final img = p.imageUrls.isNotEmpty ? p.imageUrls.first : '';

    return Scaffold(
      appBar: AppBar(title: Text(p.name)),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            AspectRatio(
              aspectRatio: 16/9,
              child: img.isEmpty
                  ? Container(color: Colors.grey.shade200)
                  : Image.network(img, fit: BoxFit.cover),
            ),
            const SizedBox(height: 16),
            Text(p.name, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Text('${p.displayedPrice.toStringAsFixed(2)} €', style: const TextStyle(fontSize: 18, color: Colors.blueAccent)),
            const SizedBox(height: 12),
            if (p.description != null) Text(p.description!),
          ],
        ),
      ),
    );
  }
}



import '../models/product.dart';

class ProductDetailScreen extends StatelessWidget {
  const ProductDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final ProductModel p = ModalRoute.of(context)!.settings.arguments as ProductModel;
    final img = p.imageUrls.isNotEmpty ? p.imageUrls.first : '';

    return Scaffold(
      appBar: AppBar(title: Text(p.name)),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            AspectRatio(
              aspectRatio: 16/9,
              child: img.isEmpty
                  ? Container(color: Colors.grey.shade200)
                  : Image.network(img, fit: BoxFit.cover),
            ),
            const SizedBox(height: 16),
            Text(p.name, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Text('${p.displayedPrice.toStringAsFixed(2)} €', style: const TextStyle(fontSize: 18, color: Colors.blueAccent)),
            const SizedBox(height: 12),
            if (p.description != null) Text(p.description!),
          ],
        ),
      ),
    );
  }
}











