-- Test Payment ID Fix - Check Current State
-- This script helps debug why payment_id is NULL in orders table

-- 1. Check current orders and their payment status
SELECT 
    o.id,
    o.status,
    o.total,
    o.payment_id,
    o.created_at,
    p.id as payment_id_from_payments,
    p.payment_status,
    p.amount as payment_amount
FROM orders o
LEFT JOIN payments p ON o.payment_id = p.id
ORDER BY o.id DESC
LIMIT 10;

-- 2. Check if there are any payments without orders
SELECT 
    p.id,
    p.order_id,
    p.supplier_id,
    p.amount,
    p.payment_status,
    p.created_at
FROM payments p
LEFT JOIN orders o ON p.order_id = o.id
WHERE o.id IS NULL;

-- 3. Check the exact constraint on payment_id column
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE 
WHERE TABLE_NAME = 'orders' AND COLUMN_NAME = 'payment_id';

-- 4. Check if there are any foreign key constraints preventing payment_id from being set
SELECT 
    CONSTRAINT_NAME,
    TABLE_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.REFERENTIAL_CONSTRAINTS rc
JOIN information_schema.KEY_COLUMN_USAGE kcu ON rc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
WHERE kcu.TABLE_NAME = 'orders' AND kcu.COLUMN_NAME = 'payment_id';

-- 5. Test manual update of payment_id (if needed)
-- This will help verify if the constraint is working
-- UPDATE orders SET payment_id = 1 WHERE id = 51 AND payment_id IS NULL;

-- 6. Check if there are any pending payments that should be linked
SELECT 
    p.id as payment_id,
    p.order_id,
    p.supplier_id,
    p.amount,
    p.payment_status,
    o.id as order_id,
    o.status as order_status,
    o.payment_id as order_payment_id
FROM payments p
JOIN orders o ON p.order_id = o.id
WHERE o.payment_id IS NULL
ORDER BY p.created_at DESC;
