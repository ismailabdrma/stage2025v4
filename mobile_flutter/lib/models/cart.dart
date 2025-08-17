class CartItemModel {
  final int id;
  final int productId;
  final String productName;
  final double unitPrice;
  int quantity;
  final String? productImage;

  CartItemModel({
    required this.id,
    required this.productId,
    required this.productName,
    required this.unitPrice,
    required this.quantity,
    this.productImage,
  });
}

class CartModel {
  final List<CartItemModel> items;
  final int itemCount;
  final double total;

  CartModel({required this.items, required this.itemCount, required this.total});
}







