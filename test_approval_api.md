# Test Product Approval API

## Step 1: Check current product status
```sql
SELECT id, name, active, status FROM products WHERE id = 1;
```

## Step 2: Test the approval API endpoint
```bash
# Test the approval endpoint
curl -X PUT "http://localhost:8080/api/products/1/approve" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

## Step 3: Check if the approval worked
```sql
SELECT id, name, active, status, updated_at FROM products WHERE id = 1;
```

## Expected Result:
- `active` should be `1` (true)
- `status` should be `'APPROVED'`
- `updated_at` should be recent

## If it's still not working, let's debug:

### Check backend logs
Look for any errors in the backend console when calling the approval endpoint.

### Check database constraints
```sql
-- Check if there are any constraints on the active column
SHOW CREATE TABLE products;

-- Check if there are any triggers
SHOW TRIGGERS LIKE 'products';
```

### Manual database test
```sql
-- Try to manually update the product
UPDATE products 
SET active = 1, status = 'APPROVED', updated_at = NOW()
WHERE id = 1;

-- Check if it worked
SELECT id, name, active, status FROM products WHERE id = 1;
```

## Possible Issues:
1. **Database constraint**: There might be a constraint preventing the update
2. **Transaction rollback**: The transaction might be rolling back
3. **Entity mapping issue**: The field might not be mapped correctly
4. **Caching issue**: The data might be cached somewhere

