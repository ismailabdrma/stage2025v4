-- Fix foreign key constraint mismatch between orders and payments tables
-- The orders table has a foreign key referencing 'payment' but should reference 'payments'

-- First, drop the existing foreign key constraint
ALTER TABLE orders DROP FOREIGN KEY FKag8ppnkjvx255gj7lm3m18wkj;

-- Then, add the correct foreign key constraint referencing 'payments' table
ALTER TABLE orders 
ADD CONSTRAINT FK_orders_payments 
FOREIGN KEY (payment_id) REFERENCES payments(id);

-- Verify the constraint was created correctly
SHOW CREATE TABLE orders;
