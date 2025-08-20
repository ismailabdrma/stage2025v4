-- Add amount field to supplier_commissions table
ALTER TABLE supplier_commissions ADD COLUMN amount DOUBLE NOT NULL DEFAULT 0.0;

-- Update existing records to set amount = commission_amount
UPDATE supplier_commissions SET amount = commission_amount WHERE amount = 0.0; 