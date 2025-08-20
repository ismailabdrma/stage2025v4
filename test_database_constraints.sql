-- Test Database Constraints - Check Why Payment ID is Not Being Set
-- This script identifies database constraint issues that prevent payment_id from being set

-- 1. Check if payment_id column exists and its type
DESCRIBE orders;

-- 2. Check if there are any foreign key constraints on payment_id
SELECT 
    'FOREIGN_KEY_CONSTRAINTS' as info,
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE 
WHERE TABLE_NAME = 'orders' AND COLUMN_NAME = 'payment_id';

-- 3. Check if there are any referential constraints
SELECT 
    'REFERENTIAL_CONSTRAINTS' as info,
    CONSTRAINT_NAME,
    TABLE_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.REFERENTIAL_CONSTRAINTS rc
JOIN information_schema.KEY_COLUMN_USAGE kcu ON rc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
WHERE kcu.TABLE_NAME = 'orders' AND kcu.COLUMN_NAME = 'payment_id';

-- 4. Check if payments table exists and has the right structure
DESCRIBE payments;

-- 5. Check if there are any existing payments
SELECT 
    'EXISTING_PAYMENTS' as info,
    COUNT(*) as total_payments,
    COUNT(CASE WHEN order_id IS NOT NULL THEN 1 END) as payments_with_orders,
    COUNT(CASE WHEN order_id IS NULL THEN 1 END) as payments_without_orders
FROM payments;

-- 6. Check if there are any orders with payment_id but no corresponding payment
SELECT 
    'ORDERS_WITHOUT_PAYMENTS' as info,
    o.id as order_id,
    o.status,
    o.payment_id,
    p.id as payment_exists
FROM orders o
LEFT JOIN payments p ON o.payment_id = p.id
WHERE o.payment_id IS NOT NULL AND p.id IS NULL;

-- 7. Check if there are any payments without orders
SELECT 
    'PAYMENTS_WITHOUT_ORDERS' as info,
    p.id as payment_id,
    p.order_id,
    p.amount,
    p.payment_status
FROM payments p
LEFT JOIN orders o ON p.order_id = o.id
WHERE o.id IS NULL;

-- 8. Test manual insertion to see if constraints prevent it
-- This will help identify if there are database-level issues
SELECT 
    'MANUAL_TEST_READY' as info,
    'Run this to test manual payment creation:' as instruction,
    'INSERT INTO payments (order_id, supplier_id, amount, currency, payment_status, payment_method, created_at, updated_at) VALUES (52, 1, 600.00, "EUR", "COMPLETED", "TEST", NOW(), NOW());' as test_command;

-- 9. Check if the issue is with the entity mapping
SELECT 
    'ENTITY_MAPPING_CHECK' as info,
    'If no foreign key constraints exist, the issue is with JPA entity mapping' as note,
    'Check @JoinColumn annotations in Order.java and Payment.java' as action;
