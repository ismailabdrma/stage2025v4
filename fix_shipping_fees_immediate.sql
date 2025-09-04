-- IMMEDIATE FIX: Insert Shipping Fees for Stage2025
-- Run this script to fix the "No shipping fee found" error

USE stage-db;

-- Drop and recreate the shipping_fees table to ensure proper structure
DROP TABLE IF EXISTS shipping_fees;

CREATE TABLE shipping_fees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    country_code VARCHAR(3) NOT NULL,
    country_name VARCHAR(255) NOT NULL,
    region VARCHAR(100),
    city VARCHAR(100),
    postal_code_from VARCHAR(20),
    postal_code_to VARCHAR(20),
    base_fee DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'EUR',
    min_order_amount DECIMAL(10,2),
    free_shipping_threshold DECIMAL(10,2),
    delivery_time_days INT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    priority INT NOT NULL DEFAULT 100,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert comprehensive shipping fees data
INSERT INTO shipping_fees (country_code, country_name, base_fee, currency, delivery_time_days, priority, is_active, notes) VALUES
-- Morocco (Default)
('MA', 'Maroc', 25.00, 'MAD', 3, 1, TRUE, 'Livraison standard au Maroc'),
-- European Union
('FR', 'France', 5.99, 'EUR', 2, 1, TRUE, 'Livraison standard en France'),
('BE', 'Belgique', 7.99, 'EUR', 3, 1, TRUE, 'Livraison standard en Belgique'),
('DE', 'Allemagne', 8.99, 'EUR', 3, 1, TRUE, 'Livraison standard en Allemagne'),
('IT', 'Italie', 9.99, 'EUR', 4, 1, TRUE, 'Livraison standard en Italie'),
('ES', 'Espagne', 6.99, 'EUR', 3, 1, TRUE, 'Livraison standard en Espagne'),
('NL', 'Pays-Bas', 7.99, 'EUR', 2, 1, TRUE, 'Livraison standard aux Pays-Bas'),
('PT', 'Portugal', 8.99, 'EUR', 4, 1, TRUE, 'Livraison standard au Portugal'),
('AT', 'Autriche', 9.99, 'EUR', 3, 1, TRUE, 'Livraison standard en Autriche'),
('CH', 'Suisse', 12.99, 'CHF', 4, 1, TRUE, 'Livraison standard en Suisse'),
-- North America
('CA', 'Canada', 15.99, 'CAD', 7, 1, TRUE, 'Livraison standard au Canada'),
('US', 'États-Unis', 19.99, 'USD', 8, 1, TRUE, 'Livraison standard aux États-Unis'),
-- Other Countries
('GB', 'Royaume-Uni', 8.99, 'GBP', 3, 1, TRUE, 'Livraison standard au Royaume-Uni'),
('AU', 'Australie', 24.99, 'AUD', 10, 1, TRUE, 'Livraison standard en Australie');

-- Insert specific city-based shipping fees for Morocco (HIGH PRIORITY)
INSERT INTO shipping_fees (country_code, country_name, city, base_fee, currency, delivery_time_days, priority, is_active, notes) VALUES
('MA', 'Maroc', 'Casablanca', 20.00, 'MAD', 1, 1, TRUE, 'Livraison express à Casablanca'),
('MA', 'Maroc', 'Rabat', 22.00, 'MAD', 1, 1, TRUE, 'Livraison express à Rabat'),
('MA', 'Maroc', 'Marrakech', 23.00, 'MAD', 2, 1, TRUE, 'Livraison standard à Marrakech'),
('MA', 'Maroc', 'Fès', 24.00, 'MAD', 2, 1, TRUE, 'Livraison standard à Fès'),
('MA', 'Maroc', 'Tanger', 21.00, 'MAD', 2, 1, TRUE, 'Livraison standard à Tanger'),
('MA', 'Maroc', 'Agadir', 25.00, 'MAD', 3, 1, TRUE, 'Livraison standard à Agadir'),
('MA', 'Maroc', 'Meknès', 22.00, 'MAD', 2, 1, TRUE, 'Livraison standard à Meknès'),
('MA', 'Maroc', 'Oujda', 26.00, 'MAD', 3, 1, TRUE, 'Livraison standard à Oujda'),
('MA', 'Maroc', 'Kénitra', 20.00, 'MAD', 2, 1, TRUE, 'Livraison standard à Kénitra'),
('MA', 'Maroc', 'Tétouan', 21.00, 'MAD', 2, 1, TRUE, 'Livraison standard à Tétouan');

-- Insert postal code based shipping fees for major cities
INSERT INTO shipping_fees (country_code, country_name, city, postal_code_from, postal_code_to, base_fee, currency, delivery_time_days, priority, is_active, notes) VALUES
-- Casablanca postal codes
('MA', 'Maroc', 'Casablanca', '20000', '20999', 18.00, 'MAD', 1, 1, TRUE, 'Livraison express Casablanca centre'),
('MA', 'Maroc', 'Casablanca', '21000', '21999', 20.00, 'MAD', 1, 1, TRUE, 'Livraison express Casablanca périphérie'),
('MA', 'Maroc', 'Casablanca', '22000', '22999', 22.00, 'MAD', 2, 1, TRUE, 'Livraison standard Casablanca banlieue'),
-- Rabat postal codes
('MA', 'Maroc', 'Rabat', '10000', '10999', 20.00, 'MAD', 1, 1, TRUE, 'Livraison express Rabat centre'),
('MA', 'Maroc', 'Rabat', '11000', '11999', 22.00, 'MAD', 1, 1, TRUE, 'Livraison express Rabat périphérie'),
-- Paris postal codes (for reference)
('FR', 'France', 'Paris', '75001', '75020', 3.99, 'EUR', 1, 1, TRUE, 'Livraison express Paris'),
('FR', 'France', 'Paris', '75021', '75020', 4.99, 'EUR', 2, 1, TRUE, 'Livraison standard Paris');

-- Create performance indexes
CREATE INDEX idx_shipping_fees_country_code ON shipping_fees(country_code);
CREATE INDEX idx_shipping_fees_city ON shipping_fees(city);
CREATE INDEX idx_shipping_fees_postal_code ON shipping_fees(postal_code_from, postal_code_to);
CREATE INDEX idx_shipping_fees_active ON shipping_fees(is_active);
CREATE INDEX idx_shipping_fees_priority ON shipping_fees(priority);
CREATE INDEX idx_shipping_fees_country_city ON shipping_fees(country_code, city);

-- Verify the data
SELECT '✅ Shipping fees inserted successfully!' as status;
SELECT COUNT(*) as total_shipping_fees FROM shipping_fees;
SELECT '📊 Shipping fees by country:' as info;
SELECT country_code, country_name, COUNT(*) as fee_count FROM shipping_fees GROUP BY country_code, country_name ORDER BY country_code;
SELECT '🏙️ City-specific fees:' as info;
SELECT country_code, city, base_fee, currency, delivery_time_days FROM shipping_fees WHERE city IS NOT NULL ORDER BY country_code, city;




