-- Fix foreign key constraints to allow deletion of products and suppliers
-- Run this script in your database to fix the deletion issues

-- Step 1: Drop existing constraints that don't have cascade delete
ALTER TABLE order_item DROP FOREIGN KEY IF EXISTS FKc5uhmwioq5kscilyuchp4w49o;
ALTER TABLE order_item DROP FOREIGN KEY IF EXISTS fk_order_items_product;

-- Step 2: Add new constraints with cascade delete
ALTER TABLE order_item 
ADD CONSTRAINT fk_order_items_product_cascade 
FOREIGN KEY (product_id) REFERENCES products(id) 
ON DELETE CASCADE;

-- Step 3: Check if there are other tables with similar issues
-- For cart_items table
ALTER TABLE cart_items DROP FOREIGN KEY IF EXISTS fk_cart_items_product;
ALTER TABLE cart_items 
ADD CONSTRAINT fk_cart_items_product_cascade 
FOREIGN KEY (product_id) REFERENCES products(id) 
ON DELETE CASCADE;

-- For products table (supplier relationship)
ALTER TABLE products DROP FOREIGN KEY IF EXISTS fk_products_supplier;
ALTER TABLE products 
ADD CONSTRAINT fk_products_supplier_cascade 
FOREIGN KEY (supplier_id) REFERENCES supplier(id) 
ON DELETE CASCADE;

-- Step 4: Verify the constraints were added
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE 
WHERE REFERENCED_TABLE_NAME IN ('products', 'supplier')
ORDER BY TABLE_NAME, COLUMN_NAME; 