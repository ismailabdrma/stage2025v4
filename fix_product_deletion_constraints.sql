-- Fix Product Deletion Constraints
-- This script will help fix foreign key constraints that prevent product deletion

-- 1. Check current foreign key constraints
SELECT 
    CONSTRAINT_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME,
    DELETE_RULE
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
JOIN INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS rc 
    ON kcu.CONSTRAINT_NAME = rc.CONSTRAINT_NAME
WHERE kcu.TABLE_NAME = 'products' 
AND kcu.REFERENCED_TABLE_NAME IS NOT NULL;

-- 2. Check if there are any products with foreign key references
SELECT 
    p.id,
    p.name,
    'order_items' as reference_table,
    COUNT(oi.id) as reference_count
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name
HAVING COUNT(oi.id) > 0

UNION ALL

SELECT 
    p.id,
    p.name,
    'cart_items' as reference_table,
    COUNT(ci.id) as reference_count
FROM products p
LEFT JOIN cart_items ci ON p.id = ci.product_id
GROUP BY p.id, p.name
HAVING COUNT(ci.id) > 0;

-- 3. If there are foreign key constraints preventing deletion, we need to:
-- Option A: Set foreign keys to CASCADE DELETE (recommended)
-- Option B: Set foreign keys to SET NULL (if the column allows NULL)
-- Option C: Delete the referencing records first

-- 4. Check the current foreign key constraints on order_items and cart_items
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

-- 5. If needed, update foreign key constraints to CASCADE DELETE
-- (Uncomment the following lines if you want to enable cascade delete)

-- ALTER TABLE order_items DROP FOREIGN KEY fk_order_items_product;
-- ALTER TABLE order_items ADD CONSTRAINT fk_order_items_product 
--     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;

-- ALTER TABLE cart_items DROP FOREIGN KEY fk_cart_items_product;
-- ALTER TABLE cart_items ADD CONSTRAINT fk_cart_items_product 
--     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;

-- 6. Alternative: Set foreign keys to SET NULL (if product_id allows NULL)
-- (Uncomment the following lines if you want to set NULL on delete)

-- ALTER TABLE order_items DROP FOREIGN KEY fk_order_items_product;
-- ALTER TABLE order_items ADD CONSTRAINT fk_order_items_product 
--     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL;

-- ALTER TABLE cart_items DROP FOREIGN KEY fk_cart_items_product;
-- ALTER TABLE cart_items ADD CONSTRAINT fk_cart_items_product 
--     FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL;

-- 7. Test deletion after fixing constraints
-- DELETE FROM products WHERE id = 1; -- Replace 1 with actual product ID

