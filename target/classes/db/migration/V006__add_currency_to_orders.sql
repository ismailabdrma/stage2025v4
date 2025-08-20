-- Add currency column to orders table
ALTER TABLE orders ADD COLUMN currency VARCHAR(3) NOT NULL DEFAULT 'EUR';

-- Update existing orders to have EUR currency
UPDATE orders SET currency = 'EUR' WHERE currency IS NULL; 