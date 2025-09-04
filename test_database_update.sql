-- Test database update directly
-- This will help us verify if the database update is working

-- 1. Check current state
SELECT id, name, active, status, updated_at FROM products WHERE id = 1;

-- 2. Try to update the product directly in the database
UPDATE products 
SET active = 1, status = 'APPROVED', updated_at = NOW()
WHERE id = 1;

-- 3. Check if the update worked
SELECT id, name, active, status, updated_at FROM products WHERE id = 1;

-- 4. If the update worked, try to revert it
UPDATE products 
SET active = 0, status = 'PENDING', updated_at = NOW()
WHERE id = 1;

-- 5. Check the revert worked
SELECT id, name, active, status, updated_at FROM products WHERE id = 1;

-- 6. Check if there are any database constraints
SHOW CREATE TABLE products;

-- 7. Check if there are any triggers
SHOW TRIGGERS LIKE 'products';

-- 8. Check if there are any foreign key constraints
SELECT 
    CONSTRAINT_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE TABLE_NAME = 'products' 
AND REFERENCED_TABLE_NAME IS NOT NULL;

