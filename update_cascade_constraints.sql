-- Update Cascade Constraints for Product Deletion
-- This script updates the foreign key constraints to support cascade delete
-- Run this script to fix product deletion issues

-- 1. Drop existing foreign key constraints
ALTER TABLE order_items DROP FOREIGN KEY IF EXISTS fk_order_items_product;
ALTER TABLE cart_items DROP FOREIGN KEY IF EXISTS fk_cart_items_product;

-- 2. Add new foreign key constraints with CASCADE DELETE
ALTER TABLE order_items 
ADD CONSTRAINT fk_order_items_product 
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;

ALTER TABLE cart_items 
ADD CONSTRAINT fk_cart_items_product 
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;

-- 3. Verify the constraints were created correctly
SELECT 
    CONSTRAINT_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME,
    DELETE_RULE
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
JOIN INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS rc 
    ON kcu.CONSTRAINT_NAME = rc.CONSTRAINT_NAME
WHERE kcu.TABLE_NAME IN ('order_items', 'cart_items')
AND kcu.REFERENCED_TABLE_NAME = 'products';

-- 4. Test product deletion (uncomment to test)
-- DELETE FROM products WHERE id = 1;

