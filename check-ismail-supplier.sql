-- Quick diagnosis for ismail supplier issue
-- Run these queries to understand what's happening

-- 1. Find all suppliers that might be "ismail"
SELECT 
    'FINDING ISMAIL SUPPLIERS' as step,
    id, name, supplier_type, active, created, last_import
FROM supplier 
WHERE LOWER(name) LIKE '%ismail%'
   OR name = 'ismail'
   OR name = 'Ismail'
   OR name = 'ISMAIL';

-- 2. Count products for each supplier
SELECT 
    'PRODUCT COUNTS BY SUPPLIER' as step,
    s.id, 
    s.name, 
    s.supplier_type,
    s.active,
    COUNT(p.id) as product_count
FROM supplier s
LEFT JOIN products p ON s.id = p.supplier_id
GROUP BY s.id, s.name, s.supplier_type, s.active
HAVING COUNT(p.id) > 0
ORDER BY s.name;

-- 3. Show all products with their supplier info
SELECT 
    'ALL PRODUCTS WITH SUPPLIERS' as step,
    p.id as product_id,
    p.name as product_name,
    p.external_product_id,
    p.active as product_active,
    p.supplier_id,
    s.name as supplier_name,
    s.supplier_type
FROM products p
LEFT JOIN supplier s ON p.supplier_id = s.id
ORDER BY s.name, p.id;

-- 4. Check for any supplier-product relationship issues
SELECT 
    'POTENTIAL ISSUES' as step,
    CASE 
        WHEN p.supplier_id IS NULL THEN 'ORPHANED_PRODUCT'
        WHEN s.id IS NULL THEN 'MISSING_SUPPLIER'
        ELSE 'OK'
    END as issue_type,
    p.id as product_id,
    p.name as product_name,
    p.supplier_id,
    s.name as supplier_name
FROM products p
LEFT JOIN supplier s ON p.supplier_id = s.id
WHERE p.supplier_id IS NULL OR s.id IS NULL;

-- 5. Test the exact query used by StockSyncService for any ismail-like supplier
SELECT 
    'STOCK_SYNC_QUERY_TEST' as step,
    p.id,
    p.name,
    p.external_product_id,
    p.active,
    p.synced_stock,
    p.supplier_id
FROM products p
WHERE p.supplier_id IN (
    SELECT id FROM supplier WHERE LOWER(name) LIKE '%ismail%'
);

-- Expected: Should show products if they exist for ismail supplier
-- If empty: No products exist for ismail supplier  
-- If shows data: Products exist but stock sync has other issues
