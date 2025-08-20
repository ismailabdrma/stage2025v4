-- Add success operation field to supplier table
ALTER TABLE supplier ADD COLUMN success_operation_name VARCHAR(255);

-- Set default value for existing suppliers
UPDATE supplier SET success_operation_name = 'notifyPaymentStatus' WHERE success_operation_name IS NULL; 