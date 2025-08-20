-- Comprehensive fix for all foreign key constraints without cascade delete
-- This migration will find and fix ALL constraints that prevent deletion

-- Step 1: Find all existing foreign key constraints
-- This will show us what we're working with
SELECT 
    'EXISTING CONSTRAINTS' as info,
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE 
WHERE REFERENCED_TABLE_NAME IN ('products', 'supplier')
ORDER BY TABLE_NAME, COLUMN_NAME;

-- Step 2: Drop ALL existing foreign key constraints for these tables
-- We'll recreate them with cascade delete

-- For order_items table - find and drop ALL constraints
SET @sql = (
    SELECT GROUP_CONCAT(
        CONCAT('ALTER TABLE order_items DROP FOREIGN KEY ', CONSTRAINT_NAME)
        SEPARATOR '; '
    )
    FROM information_schema.KEY_COLUMN_USAGE 
    WHERE TABLE_NAME = 'order_items' 
    AND REFERENCED_TABLE_NAME = 'products'
);

-- Execute the drop statements
SET @sql = IF(@sql IS NOT NULL, @sql, 'SELECT "No constraints to drop for order_items" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- For cart_items table - find and drop ALL constraints
SET @sql = (
    SELECT GROUP_CONCAT(
        CONCAT('ALTER TABLE cart_items DROP FOREIGN KEY ', CONSTRAINT_NAME)
        SEPARATOR '; '
    )
    FROM information_schema.KEY_COLUMN_USAGE 
    WHERE TABLE_NAME = 'cart_items' 
    AND REFERENCED_TABLE_NAME = 'products'
);

SET @sql = IF(@sql IS NOT NULL, @sql, 'SELECT "No constraints to drop for cart_items" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- For products table - find and drop ALL constraints
SET @sql = (
    SELECT GROUP_CONCAT(
        CONCAT('ALTER TABLE products DROP FOREIGN KEY ', CONSTRAINT_NAME)
        SEPARATOR '; '
    )
    FROM information_schema.KEY_COLUMN_USAGE 
    WHERE TABLE_NAME = 'products' 
    AND REFERENCED_TABLE_NAME = 'supplier'
);

SET @sql = IF(@sql IS NOT NULL, @sql, 'SELECT "No constraints to drop for products" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- For supplier_commissions table - find and drop ALL constraints
SET @sql = (
    SELECT GROUP_CONCAT(
        CONCAT('ALTER TABLE supplier_commissions DROP FOREIGN KEY ', CONSTRAINT_NAME)
        SEPARATOR '; '
    )
    FROM information_schema.KEY_COLUMN_USAGE 
    WHERE TABLE_NAME = 'supplier_commissions' 
    AND REFERENCED_TABLE_NAME = 'supplier'
);

SET @sql = IF(@sql IS NOT NULL, @sql, 'SELECT "No constraints to drop for supplier_commissions" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- For supplier_payments table - find and drop ALL constraints
SET @sql = (
    SELECT GROUP_CONCAT(
        CONCAT('ALTER TABLE supplier_payments DROP FOREIGN KEY ', CONSTRAINT_NAME)
        SEPARATOR '; '
    )
    FROM information_schema.KEY_COLUMN_USAGE 
    WHERE TABLE_NAME = 'supplier_payments' 
    AND REFERENCED_TABLE_NAME = 'supplier'
);

SET @sql = IF(@sql IS NOT NULL, @sql, 'SELECT "No constraints to drop for supplier_payments" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- For import_logs table - find and drop ALL constraints
SET @sql = (
    SELECT GROUP_CONCAT(
        CONCAT('ALTER TABLE import_logs DROP FOREIGN KEY ', CONSTRAINT_NAME)
        SEPARATOR '; '
    )
    FROM information_schema.KEY_COLUMN_USAGE 
    WHERE TABLE_NAME = 'import_logs' 
    AND REFERENCED_TABLE_NAME = 'supplier'
);

SET @sql = IF(@sql IS NOT NULL, @sql, 'SELECT "No constraints to drop for import_logs" as message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Step 3: Add new constraints with cascade delete

-- For order_items table
ALTER TABLE order_items 
ADD CONSTRAINT fk_order_items_product_cascade 
FOREIGN KEY (product_id) REFERENCES products(id) 
ON DELETE CASCADE;

-- For cart_items table
ALTER TABLE cart_items 
ADD CONSTRAINT fk_cart_items_product_cascade 
FOREIGN KEY (product_id) REFERENCES products(id) 
ON DELETE CASCADE;

-- For products table (supplier relationship)
ALTER TABLE products 
ADD CONSTRAINT fk_products_supplier_cascade 
FOREIGN KEY (supplier_id) REFERENCES supplier(id) 
ON DELETE CASCADE;

-- For supplier_commissions table
ALTER TABLE supplier_commissions 
ADD CONSTRAINT fk_supplier_commissions_supplier_cascade 
FOREIGN KEY (supplier_id) REFERENCES supplier(id) 
ON DELETE CASCADE;

-- For supplier_payments table
ALTER TABLE supplier_payments 
ADD CONSTRAINT fk_supplier_payments_supplier_cascade 
FOREIGN KEY (supplier_id) REFERENCES supplier(id) 
ON DELETE CASCADE;

-- For import_logs table
ALTER TABLE import_logs 
ADD CONSTRAINT fk_import_logs_supplier_cascade 
FOREIGN KEY (supplier_id) REFERENCES supplier(id) 
ON DELETE CASCADE;

-- Step 4: Verify all constraints were added with cascade delete
SELECT 
    'NEW CONSTRAINTS WITH CASCADE DELETE' as info,
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE 
WHERE REFERENCED_TABLE_NAME IN ('products', 'supplier')
ORDER BY TABLE_NAME, COLUMN_NAME;

-- Step 5: Test that cascade delete is working
-- This will show the constraint details including ON DELETE behavior
SELECT 
    CONSTRAINT_NAME,
    TABLE_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME,
    DELETE_RULE
FROM information_schema.REFERENTIAL_CONSTRAINTS rc
JOIN information_schema.KEY_COLUMN_USAGE kcu 
    ON rc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
WHERE kcu.REFERENCED_TABLE_NAME IN ('products', 'supplier')
ORDER BY TABLE_NAME, COLUMN_NAME; 