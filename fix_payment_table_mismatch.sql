-- 🔧 FIX PAYMENT TABLE MISMATCH - COMPLETE SOLUTION
-- This script fixes the issue where orders.payment_id points to wrong table

-- =====================================================
-- STEP 1: CHECK CURRENT STATE
-- =====================================================

-- Check current foreign key constraints
SELECT 
    TABLE_NAME, 
    COLUMN_NAME, 
    CONSTRAINT_NAME, 
    REFERENCED_TABLE_NAME 
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE TABLE_NAME = 'orders' AND COLUMN_NAME = 'payment_id';

-- Check current orders status
SELECT id, status, payment_id, created_at, updated_at 
FROM orders 
WHERE id IN (51, 52) 
ORDER BY id;

-- Check payments table (where payments are actually saved)
SELECT id, order_id, amount, commission_amount, supplier_amount, currency, payment_status, created_at
FROM payments 
WHERE order_id IN (51, 52) 
ORDER BY id;

-- Check payment table (where orders are trying to link)
SELECT * FROM payment WHERE id IN (1, 2);

-- =====================================================
-- STEP 2: FIX FOREIGN KEY CONSTRAINT
-- =====================================================

-- Drop the wrong foreign key constraint (if it exists)
-- Note: Replace 'fk_orders_payment' with the actual constraint name from step 1
ALTER TABLE orders DROP CONSTRAINT IF EXISTS fk_orders_payment;
ALTER TABLE orders DROP CONSTRAINT IF EXISTS fk_orders_payments;
ALTER TABLE orders DROP CONSTRAINT IF EXISTS FK8aol9f99s97mtyhij0tvfj41f;
ALTER TABLE orders DROP CONSTRAINT IF EXISTS FKag8ppnkjvx255gj7lm3m18wkj;

-- Add the correct foreign key constraint to payments table
ALTER TABLE orders ADD CONSTRAINT fk_orders_payments_correct 
FOREIGN KEY (payment_id) REFERENCES payments(id);

-- =====================================================
-- STEP 3: UPDATE EXISTING ORDERS
-- =====================================================

-- Update order 52 to point to payment ID 1 in payments table
UPDATE orders 
SET payment_id = 1, updated_at = NOW() 
WHERE id = 52;

-- Update order 51 to point to payment ID 2 in payments table (if it exists)
UPDATE orders 
SET payment_id = 2, updated_at = NOW() 
WHERE id = 51;

-- =====================================================
-- STEP 4: VERIFY THE FIX
-- =====================================================

-- Check orders after fix
SELECT 
    o.id, 
    o.status, 
    o.payment_id, 
    o.updated_at,
    p.amount,
    p.commission_amount,
    p.supplier_amount,
    p.currency
FROM orders o
LEFT JOIN payments p ON o.payment_id = p.id
WHERE o.id IN (51, 52)
ORDER BY o.id;

-- Check foreign key constraint
SELECT 
    TABLE_NAME, 
    COLUMN_NAME, 
    CONSTRAINT_NAME, 
    REFERENCED_TABLE_NAME 
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE TABLE_NAME = 'orders' AND COLUMN_NAME = 'payment_id';

-- =====================================================
-- STEP 5: TEST PAYMENT COMPLETION
-- =====================================================

-- After running this script, test the payment completion endpoint again:
-- curl -X POST http://localhost:8080/api/payment-success/success/SUCCESS_53_1234567890 \
--   -H "Content-Type: application/json" \
--   -d '{"orderId": "53", "supplierId": "1"}'

-- =====================================================
-- EXPECTED RESULTS AFTER FIX:
-- =====================================================
-- 1. orders.payment_id should point to payments.id (not payment.id)
-- 2. Foreign key constraint should reference payments table
-- 3. Orders 51 and 52 should have correct payment_id values
-- 4. Payment completion should work for new orders
-- 5. No more table mismatch errors

-- =====================================================
-- TROUBLESHOOTING:
-- =====================================================
-- If you get "constraint does not exist" errors, run step 1 first
-- to see what the actual constraint names are, then update step 2 accordingly.

-- If you get "table does not exist" errors, check your database schema
-- and ensure the table names match exactly.
