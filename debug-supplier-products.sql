-- Debug query to check supplier-product relationships
-- This will help diagnose why StockSyncService says "No products found"

-- 1. Check all suppliers and their product counts
SELECT 
    s.id as supplier_id,
    s.name as supplier_name,
    s.supplier_type,
    s.active as supplier_active,
    COUNT(p.id) as product_count,
    COUNT(CASE WHEN p.active = 1 THEN 1 END) as active_products,
    COUNT(CASE WHEN p.active = 0 THEN 1 END) as inactive_products
FROM supplier s
LEFT JOIN products p ON s.id = p.supplier_id
GROUP BY s.id, s.name, s.supplier_type, s.active
ORDER BY s.name;

-- 2. Check specifically for "ismail" supplier
SELECT 
    s.id,
    s.name,
    s.supplier_type,
    s.active,
    p.id as product_id,
    p.name as product_name,
    p.external_product_id,
    p.active as product_active,
    p.synced_stock,
    p.last_fetched
FROM supplier s
LEFT JOIN products p ON s.id = p.supplier_id
WHERE s.name = 'ismail'
ORDER BY p.id;

-- 3. Check for any products that might have NULL supplier_id
SELECT 
    p.id,
    p.name,
    p.external_product_id,
    p.supplier_id,
    'ORPHANED - NO SUPPLIER' as issue
FROM products p
WHERE p.supplier_id IS NULL;

-- 4. Check for products with external_product_id patterns
SELECT 
    p.id,
    p.name,
    p.external_product_id,
    s.name as supplier_name,
    s.id as supplier_id,
    CASE 
        WHEN p.external_product_id LIKE CONCAT(s.id, '_%') THEN 'CORRECT_FORMAT'
        ELSE 'INCORRECT_FORMAT'
    END as id_format_check
FROM products p
JOIN supplier s ON p.supplier_id = s.id
WHERE s.name = 'ismail'
ORDER BY p.id;

-- 5. Test the exact query that StockSyncService uses
SELECT 
    p.id,
    p.name,
    p.external_product_id,
    p.supplier_id,
    s.name as supplier_name
FROM products p 
LEFT JOIN supplier s ON p.supplier_id = s.id
WHERE p.supplier_id = (SELECT id FROM supplier WHERE name = 'ismail' LIMIT 1);

-- Expected result: Should show products for ismail supplier
-- If empty, then there's a data issue
-- If shows products, then there's a code issue in StockSyncService
