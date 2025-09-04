# Test Product Approval Endpoint

## Test the approval endpoint to make sure it's working

### 1. First, check current product status:
```sql
SELECT id, name, active, status FROM products WHERE id = 1;
```

### 2. Test the approval API endpoint:
```bash
# Replace {product_id} with the actual product ID (1 in your case)
curl -X PUT "http://localhost:8080/api/products/1/approve" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 3. Check the product status after approval:
```sql
SELECT id, name, active, status, updated_at FROM products WHERE id = 1;
```

### Expected Result:
- `active` should be `1` (true)
- `status` should be `'APPROVED'`
- `updated_at` should be recent timestamp

## If the API doesn't work, check:

1. **Authentication**: Make sure you're logged in as ADMIN
2. **Backend logs**: Check if there are any errors in the backend
3. **Database connection**: Make sure the backend can write to the database

## Manual Database Fix:
If the API still doesn't work, you can manually fix the database:

```sql
UPDATE products 
SET status = 'APPROVED', updated_at = NOW()
WHERE id = 1;
```

