-- Debug script to test product approval
-- This will help us see what's happening when we approve a product

-- 1. First, let's see the current state of products
SELECT 
    id, 
    name, 
    active, 
    status, 
    created_at,
    updated_at
FROM products 
ORDER BY updated_at DESC 
LIMIT 5;

-- 2. Let's manually test the approval process
-- First, set a product to PENDING status
UPDATE products 
SET active = 0, status = 'PENDING', updated_at = NOW()
WHERE id = 1;

-- 3. Check the product is now PENDING
SELECT id, name, active, status FROM products WHERE id = 1;

-- 4. Now manually approve it (simulating what the API should do)
UPDATE products 
SET active = 1, status = 'APPROVED', updated_at = NOW()
WHERE id = 1;

-- 5. Check if the approval worked
SELECT id, name, active, status, updated_at FROM products WHERE id = 1;

-- 6. Check if there are any database constraints that might prevent the update
SHOW CREATE TABLE products;

-- 7. Check if there are any triggers on the products table
SHOW TRIGGERS LIKE 'products';

