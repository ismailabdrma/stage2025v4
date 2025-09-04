-- Complete Morocco Shipping Fees - All Major Cities
-- This script adds comprehensive shipping fees for all major cities in Morocco

USE stage-db;

-- First, clear existing Morocco shipping fees to avoid duplicates
DELETE FROM shipping_fees WHERE country_code = 'MA';

-- Insert comprehensive Morocco shipping fees for all major cities
INSERT INTO shipping_fees (country_code, country_name, city, base_fee, currency, delivery_time_days, priority, is_active, notes) VALUES

-- Major Cities (Priority 1 - Express delivery)
('MA', 'Maroc', 'Casablanca', 20.00, 'MAD', 1, 1, TRUE, 'Livraison express à Casablanca'),
('MA', 'Maroc', 'Rabat', 22.00, 'MAD', 1, 1, TRUE, 'Livraison express à Rabat'),
('MA', 'Maroc', 'Marrakech', 23.00, 'MAD', 1, 1, TRUE, 'Livraison express à Marrakech'),
('MA', 'Maroc', 'Fès', 24.00, 'MAD', 1, 1, TRUE, 'Livraison express à Fès'),
('MA', 'Maroc', 'Tanger', 21.00, 'MAD', 1, 1, TRUE, 'Livraison express à Tanger'),
('MA', 'Maroc', 'Agadir', 25.00, 'MAD', 1, 1, TRUE, 'Livraison express à Agadir'),
('MA', 'Maroc', 'Meknès', 22.00, 'MAD', 1, 1, TRUE, 'Livraison express à Meknès'),
('MA', 'Maroc', 'Oujda', 26.00, 'MAD', 1, 1, TRUE, 'Livraison express à Oujda'),
('MA', 'Maroc', 'Kénitra', 20.00, 'MAD', 1, 1, TRUE, 'Livraison express à Kénitra'),
('MA', 'Maroc', 'Tétouan', 21.00, 'MAD', 1, 1, TRUE, 'Livraison express à Tétouan'),

-- Secondary Cities (Priority 2 - Standard delivery)
('MA', 'Maroc', 'Safi', 28.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Safi'),
('MA', 'Maroc', 'Mohammedia', 22.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Mohammedia'),
('MA', 'Maroc', 'Khouribga', 26.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Khouribga'),
('MA', 'Maroc', 'Beni Mellal', 30.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Beni Mellal'),
('MA', 'Maroc', 'El Jadida', 27.00, 'MAD', 2, 2, TRUE, 'Livraison standard à El Jadida'),
('MA', 'Maroc', 'Taza', 29.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Taza'),
('MA', 'Maroc', 'Nador', 28.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Nador'),
('MA', 'Maroc', 'Settat', 24.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Settat'),
('MA', 'Maroc', 'Larache', 25.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Larache'),
('MA', 'Maroc', 'Ksar El Kebir', 26.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Ksar El Kebir'),
('MA', 'Maroc', 'Khemisset', 25.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Khemisset'),
('MA', 'Maroc', 'Guelmim', 35.00, 'MAD', 3, 2, TRUE, 'Livraison standard à Guelmim'),
('MA', 'Maroc', 'Berrechid', 23.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Berrechid'),
('MA', 'Maroc', 'Oued Zem', 27.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Oued Zem'),
('MA', 'Maroc', 'Fquih Ben Salah', 28.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Fquih Ben Salah'),
('MA', 'Maroc', 'Taourirt', 30.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Taourirt'),
('MA', 'Maroc', 'Berkane', 29.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Berkane'),
('MA', 'Maroc', 'Sidi Slimane', 26.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Sidi Slimane'),
('MA', 'Maroc', 'Sidi Kacem', 27.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Sidi Kacem'),
('MA', 'Maroc', 'Moulay Yacoub', 25.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Moulay Yacoub'),

-- Regional Centers (Priority 3 - Extended delivery)
('MA', 'Maroc', 'Errachidia', 40.00, 'MAD', 3, 3, TRUE, 'Livraison étendue à Errachidia'),
('MA', 'Maroc', 'Ouarzazate', 38.00, 'MAD', 3, 3, TRUE, 'Livraison étendue à Ouarzazate'),
('MA', 'Maroc', 'Al Hoceïma', 32.00, 'MAD', 3, 3, TRUE, 'Livraison étendue à Al Hoceïma'),
('MA', 'Maroc', 'Ifrane', 28.00, 'MAD', 2, 3, TRUE, 'Livraison étendue à Ifrane'),
('MA', 'Maroc', 'Azrou', 29.00, 'MAD', 2, 3, TRUE, 'Livraison étendue à Azrou'),
('MA', 'Maroc', 'Midelt', 35.00, 'MAD', 3, 3, TRUE, 'Livraison étendue à Midelt'),
('MA', 'Maroc', 'Zagora', 45.00, 'MAD', 4, 3, TRUE, 'Livraison étendue à Zagora'),
('MA', 'Maroc', 'Tinghir', 42.00, 'MAD', 4, 3, TRUE, 'Livraison étendue à Tinghir'),
('MA', 'Maroc', 'Dakhla', 60.00, 'MAD', 5, 3, TRUE, 'Livraison étendue à Dakhla'),
('MA', 'Maroc', 'Laâyoune', 55.00, 'MAD', 5, 3, TRUE, 'Livraison étendue à Laâyoune'),
('MA', 'Maroc', 'Smara', 50.00, 'MAD', 4, 3, TRUE, 'Livraison étendue à Smara'),
('MA', 'Maroc', 'Boujdour', 58.00, 'MAD', 5, 3, TRUE, 'Livraison étendue à Boujdour'),
('MA', 'Maroc', 'Aousserd', 65.00, 'MAD', 6, 3, TRUE, 'Livraison étendue à Aousserd'),
('MA', 'Maroc', 'Es-Semara', 52.00, 'MAD', 4, 3, TRUE, 'Livraison étendue à Es-Semara'),
('MA', 'Maroc', 'Tarfaya', 60.00, 'MAD', 5, 3, TRUE, 'Livraison étendue à Tarfaya'),

-- Coastal Cities
('MA', 'Maroc', 'Essaouira', 30.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Essaouira'),
('MA', 'Maroc', 'El Aioun', 32.00, 'MAD', 3, 2, TRUE, 'Livraison standard à El Aioun'),
('MA', 'Maroc', 'Chefchaouen', 28.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Chefchaouen'),
('MA', 'Maroc', 'Asilah', 26.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Asilah'),
('MA', 'Maroc', 'Martil', 24.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Martil'),
('MA', 'Maroc', 'Fnideq', 25.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Fnideq'),
('MA', 'Maroc', 'Mdiq', 24.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Mdiq'),

-- Industrial Cities
('MA', 'Maroc', 'Nouaceur', 22.00, 'MAD', 1, 1, TRUE, 'Livraison express à Nouaceur'),
('MA', 'Maroc', 'Temara', 21.00, 'MAD', 1, 1, TRUE, 'Livraison express à Temara'),
('MA', 'Maroc', 'Skhirat', 22.00, 'MAD', 1, 1, TRUE, 'Livraison express à Skhirat'),
('MA', 'Maroc', 'Harhoura', 23.00, 'MAD', 1, 1, TRUE, 'Livraison express à Harhoura'),
('MA', 'Maroc', 'Ain Harrouda', 24.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Ain Harrouda'),
('MA', 'Maroc', 'Bouskoura', 23.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Bouskoura'),
('MA', 'Maroc', 'Mediouna', 25.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Mediouna'),
('MA', 'Maroc', 'Lahraouyine', 24.00, 'MAD', 2, 2, TRUE, 'Livraison standard à Lahraouyine'),

-- Default Morocco shipping fee (fallback for any city not listed)
('MA', 'Maroc', NULL, 30.00, 'MAD', 3, 100, TRUE, 'Livraison standard au Maroc (villes non listées)');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_shipping_fees_country_code ON shipping_fees(country_code);
CREATE INDEX IF NOT EXISTS idx_shipping_fees_city ON shipping_fees(city);
CREATE INDEX IF NOT EXISTS idx_shipping_fees_priority ON shipping_fees(priority);
CREATE INDEX IF NOT EXISTS idx_shipping_fees_active ON shipping_fees(is_active);
CREATE INDEX IF NOT EXISTS idx_shipping_fees_country_city ON shipping_fees(country_code, city);

-- Verify the data
SELECT 'Morocco shipping fees inserted successfully!' as status;
SELECT COUNT(*) as total_morocco_shipping_fees FROM shipping_fees WHERE country_code = 'MA';
SELECT city, base_fee, delivery_time_days, priority FROM shipping_fees WHERE country_code = 'MA' ORDER BY priority, base_fee;

