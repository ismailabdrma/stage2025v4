-- Fix image_url column size to support base64 images
-- This resolves: Data truncation: Data too long for column 'image_url' at row 1

-- Update the product_images table to use LONGTEXT for image_url column
ALTER TABLE product_images 
MODIFY COLUMN image_url LONGTEXT;

-- Verify the change
DESCRIBE product_images;

-- Optional: Check if there are any existing truncated entries
SELECT product_id, LENGTH(image_url) as url_length, SUBSTRING(image_url, 1, 50) as url_preview
FROM product_images 
WHERE LENGTH(image_url) > 255
LIMIT 10;
