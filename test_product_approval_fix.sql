-- Test script to verify product approval status fix
-- This script will test the product approval functionality

-- 1. Check current product statuses
SELECT id, name, active, status, created_at 
FROM products 
ORDER BY created_at DESC 
LIMIT 10;

-- 2. Update a test product to PENDING status (simulate imported product)
UPDATE products 
SET active = false, status = 'PENDING' 
WHERE id = (SELECT id FROM products LIMIT 1);

-- 3. Verify the product is now PENDING
SELECT id, name, active, status 
FROM products 
WHERE status = 'PENDING' 
LIMIT 5;

-- 4. Test the approval process (this would normally be done via API)
-- The API endpoint PUT /api/products/{id}/approve should:
-- - Set active = true
-- - Set status = 'APPROVED'

-- 5. Check final status after approval
SELECT id, name, active, status, updated_at 
FROM products 
WHERE status = 'APPROVED' 
ORDER BY updated_at DESC 
LIMIT 5;

-- 6. Summary query
SELECT 
    status,
    COUNT(*) as count,
    SUM(CASE WHEN active = true THEN 1 ELSE 0 END) as active_count
FROM products 
GROUP BY status 
ORDER BY status;

