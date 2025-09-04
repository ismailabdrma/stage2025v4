-- Test Product Deletion
-- This script will help us test and debug product deletion issues

-- 1. Check if there are any products that can be deleted
SELECT 
    p.id, 
    p.name, 
    p.active, 
    p.status,
    COUNT(oi.id) as order_items_count,
    COUNT(ci.id) as cart_items_count
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN cart_items ci ON p.id = ci.product_id
GROUP BY p.id, p.name, p.active, p.status
ORDER BY p.id
LIMIT 10;

-- 2. Check for foreign key constraints that might prevent deletion
SELECT 
    CONSTRAINT_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE TABLE_NAME = 'products' 
AND REFERENCED_TABLE_NAME IS NOT NULL;

-- 3. Check if there are any products with foreign key references
SELECT 
    p.id,
    p.name,
    'order_items' as reference_table,
    COUNT(oi.id) as reference_count
FROM products p
INNER JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name

UNION ALL

SELECT 
    p.id,
    p.name,
    'cart_items' as reference_table,
    COUNT(ci.id) as reference_count
FROM products p
INNER JOIN cart_items ci ON p.id = ci.product_id
GROUP BY p.id, p.name;

-- 4. Try to delete a test product (replace 1 with actual product ID)
-- DELETE FROM products WHERE id = 1;

-- 5. Check if there are any triggers on the products table
SHOW TRIGGERS LIKE 'products';

-- 6. Check the table structure
SHOW CREATE TABLE products;

