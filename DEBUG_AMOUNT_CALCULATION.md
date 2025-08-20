# Debug Amount Calculation Issue

## 🚨 Current Problem

**Supplier is still receiving wrong amounts:**
- **Expected**: `amount: 100.0` (price per piece)
- **Actual**: `amount: 600.0` (total amount)

## 🔍 Debug Steps

### **Step 1: Check if Fix is Deployed**
The logs show the supplier is still receiving `amount: 600.0`, which means either:
1. The fix wasn't deployed
2. The fix isn't working
3. There's a different code path being executed

### **Step 2: Verify Current Code**
Check if this code exists in `SoapPaymentService.java`:
```java
// Calculate price per piece to avoid supplier multiplying by quantity
double pricePerPiece = order.getTotal() / order.getItems().get(0).getQuantity();

requestData.put("amount", pricePerPiece); // Price per piece, not total
requestData.put("quantity", order.getItems().get(0).getQuantity());
requestData.put("totalAmount", order.getTotal()); // For verification
```

### **Step 3: Check Logs**
Look for these log messages:
```
Amount calculation for order {}: total={}, quantity={}, pricePerPiece={}
Sending to supplier: amount={} (price per piece), quantity={}, totalAmount={}
```

### **Step 4: Test Order Structure**
Verify that `order.getItems().get(0).getQuantity()` returns the correct value:
```java
log.info("Order items: {}", order.getItems());
log.info("First item quantity: {}", order.getItems().get(0).getQuantity());
log.info("Order total: {}", order.getTotal());
```

## 🧪 Quick Test

### **Test 1: Manual Calculation**
```java
// Add this debug code temporarily
OrderItem firstItem = order.getItems().get(0);
double total = order.getTotal();
int quantity = firstItem.getQuantity();
double pricePerPiece = total / quantity;

log.info("DEBUG: total={}, quantity={}, pricePerPiece={}", total, quantity, pricePerPiece);
log.info("DEBUG: firstItem={}", firstItem);
```

### **Test 2: Check Order Data**
```sql
-- Check order structure in database
SELECT o.id, o.total, oi.quantity, oi.unit_price 
FROM orders o 
JOIN order_item oi ON o.id = oi.order_id 
WHERE o.id = 41;
```

## 🔧 Possible Issues

### **Issue 1: Code Not Deployed**
- Check if the updated `SoapPaymentService.java` is in the running application
- Restart the application after code changes

### **Issue 2: Different Code Path**
- The SOAP payment might be going through a different service
- Check if there are multiple payment services

### **Issue 3: Order Structure**
- `order.getItems()` might be empty or null
- `order.getItems().get(0)` might not exist

### **Issue 4: Compilation Error**
- The code might not be compiling due to errors
- Check application logs for compilation issues

## 📊 Expected vs Actual

### **Expected (After Fix):**
```
Amount calculation for order 41: total=600.0, quantity=6, pricePerPiece=100.0
Sending to supplier: amount=100.0 (price per piece), quantity=6, totalAmount=600.0
```

### **Actual (Current):**
```
SOAP processPayment for product 2 x 6 with amount 600.0 EUR
```

## 🎯 Next Steps

1. **Verify code deployment** - Check if fix is in running application
2. **Add debug logging** - Temporarily add detailed logging
3. **Check order structure** - Verify order items exist and have correct data
4. **Test with simple order** - Create a test order with known values
5. **Check compilation** - Ensure no compilation errors

## 🚀 Quick Fix Test

Add this debug code to `SoapPaymentService.java`:
```java
// TEMPORARY DEBUG CODE
log.info("=== DEBUG AMOUNT CALCULATION ===");
log.info("Order ID: {}", order.getId());
log.info("Order Total: {}", order.getTotal());
log.info("Order Items Count: {}", order.getItems().size());
if (!order.getItems().isEmpty()) {
    OrderItem firstItem = order.getItems().get(0);
    log.info("First Item: {}", firstItem);
    log.info("First Item Quantity: {}", firstItem.getQuantity());
    log.info("First Item Unit Price: {}", firstItem.getUnitPrice());
    log.info("Calculated Price Per Piece: {}", order.getTotal() / firstItem.getQuantity());
}
log.info("=== END DEBUG ===");
```

This will show exactly what data is being processed and help identify the issue.


