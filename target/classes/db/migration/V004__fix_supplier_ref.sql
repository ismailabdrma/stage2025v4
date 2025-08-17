-- Migration to fix existing products with missing supplier_ref values
-- Set supplier_ref to external_product_id for products where supplier_ref is null
UPDATE products SET supplier_ref = external_product_id 
WHERE supplier_ref IS NULL AND external_product_id IS NOT NULL; 