-- Fix products being assigned to wrong suppliers
-- This resolves the critical bug where products from one supplier appear under another supplier

-- 1. First, let's see the current problem
SELECT 
    p.id,
    p.name,
    p.external_product_id,
    s.id as supplier_id,
    s.name as supplier_name,
    s.supplier_type
FROM products p 
JOIN supplier s ON p.supplier_id = s.id 
ORDER BY p.external_product_id, s.name;

-- 2. Check for products with duplicate external_product_ids across different suppliers
SELECT 
    external_product_id,
    COUNT(*) as product_count,
    GROUP_CONCAT(DISTINCT supplier_id) as supplier_ids,
    GROUP_CONCAT(DISTINCT s.name) as supplier_names
FROM products p
JOIN supplier s ON p.supplier_id = s.id
GROUP BY external_product_id
HAVING COUNT(*) > 1;

-- 3. Fix: Update external_product_ids to be supplier-specific
-- This will be done automatically by the application code, but for existing data:
UPDATE products p
SET external_product_id = CONCAT(p.supplier_id, '_', p.external_product_id)
WHERE external_product_id NOT LIKE CONCAT(p.supplier_id, '_%');

-- 4. Verify the fix
SELECT 
    p.id,
    p.name,
    p.external_product_id,
    s.id as supplier_id,
    s.name as supplier_name
FROM products p 
JOIN supplier s ON p.supplier_id = s.id 
WHERE s.name IN ('ismail', 'SOAP v2', 'Supplier SOAP v2')
ORDER BY s.name, p.name;

-- 5. Optional: Remove any duplicate products that may have been created
-- (Run this ONLY after verifying the above results look correct)
/*
DELETE p1 FROM products p1
INNER JOIN products p2 ON 
    p1.name = p2.name AND 
    p1.supplier_id = p2.supplier_id AND 
    p1.id > p2.id;
*/
