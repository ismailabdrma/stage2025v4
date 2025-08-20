-- 🧪 TEST PAYMENT FIX - VERIFICATION SCRIPT
-- Run this after applying the fix to verify everything works

-- =====================================================
-- VERIFY CURRENT STATE
-- =====================================================

-- 1. Check orders table
SELECT 
    'ORDERS TABLE' as table_name,
    id, 
    status, 
    payment_id, 
    created_at, 
    updated_at 
FROM orders 
WHERE id IN (51, 52) 
ORDER BY id;

-- 2. Check payments table
SELECT 
    'PAYMENTS TABLE' as table_name,
    id, 
    order_id, 
    amount, 
    commission_amount, 
    supplier_amount, 
    currency, 
    payment_status, 
    created_at
FROM payments 
WHERE order_id IN (51, 52) 
ORDER BY id;

-- 3. Check the relationship
SELECT 
    'RELATIONSHIP CHECK' as check_type,
    o.id as order_id, 
    o.status as order_status, 
    o.payment_id, 
    p.id as payment_id_from_payments,
    p.amount,
    p.commission_amount,
    p.supplier_amount,
    CASE 
        WHEN o.payment_id = p.id THEN '✅ LINKED CORRECTLY'
        ELSE '❌ NOT LINKED'
    END as link_status
FROM orders o
LEFT JOIN payments p ON o.payment_id = p.id
WHERE o.id IN (51, 52)
ORDER BY o.id;

-- 4. Check foreign key constraints
SELECT 
    'FOREIGN KEY' as constraint_type,
    TABLE_NAME, 
    COLUMN_NAME, 
    CONSTRAINT_NAME, 
    REFERENCED_TABLE_NAME 
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE TABLE_NAME = 'orders' AND COLUMN_NAME = 'payment_id';

-- =====================================================
-- EXPECTED RESULTS:
-- =====================================================
-- ✅ Order 51: status=PAID, payment_id=2
-- ✅ Order 52: status=PAID, payment_id=1
-- ✅ Both orders should link to payments table
-- ✅ Foreign key should reference 'payments' table
-- ✅ Link status should show "LINKED CORRECTLY"

-- =====================================================
-- IF STILL NOT WORKING:
-- =====================================================
-- 1. Run the complete fix script: fix_payment_table_mismatch.sql
-- 2. Restart your Spring Boot application
-- 3. Test payment completion endpoint again
-- 4. Check Spring Boot logs for any errors
