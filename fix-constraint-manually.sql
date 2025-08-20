-- MANUAL FIX: Run this directly in your database to fix the deletion issue
-- This fixes the specific constraint FKc5uhmwioq5kscilyuchp4w49o that's preventing deletion

-- Step 1: Drop the problematic constraint
ALTER TABLE order_item DROP FOREIGN KEY FKc5uhmwioq5kscilyuchp4w49o;

-- Step 2: Add it back with cascade delete
ALTER TABLE order_item 
ADD CONSTRAINT FKc5uhmwioq5kscilyuchp4w49o 
FOREIGN KEY (product_id) REFERENCES products(id) 
ON DELETE CASCADE;

-- Step 3: Verify the constraint was added with cascade delete
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
WHERE kcu.REFERENCED_TABLE_NAME = 'products'
AND kcu.TABLE_NAME = 'order_item';

-- Alternative: If the table name is different, check what it actually is:
-- SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_NAME LIKE '%order%'; 