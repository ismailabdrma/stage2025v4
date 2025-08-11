-- Increase image_url column size to handle long URLs and base64 data
-- This fixes the "Data too long for column 'image_url'" error

ALTER TABLE product_images 
MODIFY COLUMN image_url LONGTEXT;

-- Also ensure other URL columns are large enough
ALTER TABLE supplier 
MODIFY COLUMN wsdl_url VARCHAR(1000),
MODIFY COLUMN api_url VARCHAR(1000),
MODIFY COLUMN payment_api_endpoint VARCHAR(1000),
MODIFY COLUMN commission_api_endpoint VARCHAR(1000);

-- Add index for performance on frequently queried columns
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_supplier_active ON supplier(active);
CREATE INDEX IF NOT EXISTS idx_supplier_type ON supplier(supplier_type);
