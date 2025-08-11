class ProductModel {
  final int id;
  final String name;
  final String? description;
  final double displayedPrice;
  final List<String> imageUrls;
  final String? supplierName;
  final String? categoryName;

  ProductModel({
    required this.id,
    required this.name,
    this.description,
    required this.displayedPrice,
    required this.imageUrls,
    this.supplierName,
    this.categoryName,
  });

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      id: json['id'] as int,
      name: json['name'] as String,
      description: json['description'] as String?,
      displayedPrice: (json['displayedPrice'] as num).toDouble(),
      imageUrls: (json['imageUrls'] as List?)?.map((e) => e.toString()).toList() ?? const [],
      supplierName: json['supplierName'] as String?,
      categoryName: json['categoryName'] as String?,
    );
  }
}


