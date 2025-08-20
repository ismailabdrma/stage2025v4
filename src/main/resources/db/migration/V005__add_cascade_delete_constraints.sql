-- Add cascade delete constraints for proper product and supplier deletion
-- This fixes the foreign key constraint errors when deleting products/suppliers

-- First, let's see what constraints exist
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE 
WHERE REFERENCED_TABLE_NAME IN ('products', 'supplier')
ORDER BY TABLE_NAME, COLUMN_NAME;

-- Drop existing foreign key constraints that don't have cascade delete
-- We need to drop them first before recreating with cascade delete

-- For order_items table
ALTER TABLE order_items DROP FOREIGN KEY IF EXISTS FKc5uhmwioq5kscilyuchp4w49o;
ALTER TABLE order_items DROP FOREIGN KEY IF EXISTS fk_order_items_product;

-- For cart_items table  
ALTER TABLE cart_items DROP FOREIGN KEY IF EXISTS fk_cart_items_product;

-- For products table (supplier relationship)
ALTER TABLE products DROP FOREIGN KEY IF EXISTS fk_products_supplier;

-- For supplier_commissions table
ALTER TABLE supplier_commissions DROP FOREIGN KEY IF EXISTS fk_supplier_commissions_supplier;

-- For supplier_payments table
ALTER TABLE supplier_payments DROP FOREIGN KEY IF EXISTS fk_supplier_payments_supplier;

-- For import_logs table
ALTER TABLE import_logs DROP FOREIGN KEY IF EXISTS fk_import_logs_supplier;

-- Now add new constraints with cascade delete

-- For order_items table
ALTER TABLE order_items 
ADD CONSTRAINT fk_order_items_product 
FOREIGN KEY (product_id) REFERENCES products(id) 
ON DELETE CASCADE;

-- For cart_items table
ALTER TABLE cart_items 
ADD CONSTRAINT fk_cart_items_product 
FOREIGN KEY (product_id) REFERENCES products(id) 
ON DELETE CASCADE;

-- For products table (supplier relationship)
ALTER TABLE products 
ADD CONSTRAINT fk_products_supplier 
FOREIGN KEY (supplier_id) REFERENCES supplier(id) 
ON DELETE CASCADE;

-- For supplier_commissions table
ALTER TABLE supplier_commissions 
ADD CONSTRAINT fk_supplier_commissions_supplier 
FOREIGN KEY (supplier_id) REFERENCES supplier(id) 
ON DELETE CASCADE;

-- For supplier_payments table
ALTER TABLE supplier_payments 
ADD CONSTRAINT fk_supplier_payments_supplier 
FOREIGN KEY (supplier_id) REFERENCES supplier(id) 
ON DELETE CASCADE;

-- For import_logs table
ALTER TABLE import_logs 
ADD CONSTRAINT fk_import_logs_supplier 
FOREIGN KEY (supplier_id) REFERENCES supplier(id) 
ON DELETE CASCADE;

-- Verify constraints were added
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE 
WHERE REFERENCED_TABLE_NAME IN ('products', 'supplier')
ORDER BY TABLE_NAME, COLUMN_NAME; 