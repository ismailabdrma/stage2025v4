# Payment Success Endpoint Test Guide

## Overview
This guide tests the payment success endpoint to ensure it properly processes payment completions and marks orders as PAID.

## Test 1: Test Payment Success Endpoint

### Endpoint
```
POST /api/payments/success/{sessionId}
```

### Test Data
Based on the logs, we have:
- **Session ID**: `SOAP_1_41_1755518530733`
- **Order ID**: `41`
- **Supplier ID**: `1`

### Test Command
```bash
curl -X POST http://localhost:8080/api/payments/success/SOAP_1_41_1755518530733 \
  -H "Content-Type: application/json" \
  -d '{"orderId": "41", "supplierId": "1"}'
```

### Expected Response
```json
{
  "success": true,
  "message": "Payment completed successfully",
  "orderId": "41",
  "redirectUrl": "/"
}
```

## Test 2: Test Direct Payment Completion

### Test URL
```
http://localhost:8080/success.html?order_id=41&supplier_id=1
```

### Expected Behavior
1. Success page loads with order_id=41 and supplier_id=1
2. Page automatically processes payment completion
3. Order is marked as PAID in database
4. Customer is redirected to marketplace (/)

## Test 3: Test Stripe Session Lookup

### Test URL
```
http://localhost:8080/success.html?session_id=cs_test_a1rZDAP5euqmjwSxhji8FRtPspSlhQ8Jfrgv9wmugmQis2L8ip949rpnSh
```

### Expected Behavior
1. Success page loads with Stripe session ID
2. Page looks up internal session mapping
3. Payment completion is processed
4. Customer is redirected to marketplace (/)

## Verification Steps

### 1. Check Database
Verify that order 41 is marked as PAID:
```sql
SELECT id, status, payment_id FROM orders WHERE id = 41;
```

### 2. Check Payment Record
Verify that a payment record was created:
```sql
SELECT * FROM payments WHERE order_id = 41;
```

### 3. Check Session Mapping
Verify that session mapping was cleaned up:
```sql
SELECT * FROM order_session_mappings WHERE session_id = 'SOAP_1_41_1755518530733';
```

## Troubleshooting

### If Payment Success Endpoint Fails
1. Check if PaymentCompletionService is properly injected
2. Verify that OrderSessionMappingService exists
3. Check database connectivity

### If Order Status Not Updated
1. Verify that the order exists in database
2. Check if PaymentCompletionService has proper permissions
3. Review transaction logs

### If Redirect Fails
1. Check if frontend routes are properly configured
2. Verify that marketplace page exists
3. Check browser console for JavaScript errors

## Success Criteria
✅ Payment success endpoint responds with success=true  
✅ Order status is updated to PAID in database  
✅ Payment record is created with proper amounts  
✅ Customer is redirected to marketplace  
✅ Session mapping is cleaned up  
✅ Confirmation emails are sent (if configured)  

## Next Steps
After successful testing:
1. Configure supplier to redirect to success page with order_id and supplier_id
2. Test complete payment flow from supplier to platform
3. Monitor payment completion logs
4. Verify commission calculations


