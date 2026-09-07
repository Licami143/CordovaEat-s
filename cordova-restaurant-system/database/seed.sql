-- ============================================================================
-- Seed Data — Cordova Local Restaurant Recommendation System
-- Run AFTER migrations 001 and 002.
-- Password for ALL seeded accounts is "Password123!" — the hash below is a
-- real, verified bcrypt hash of that password (cost 10), confirmed working.
-- ============================================================================

-- Admin ------------------------------------------------------------------
INSERT INTO users (id, email, password_hash, full_name, role, email_verified, email_verified_at)
VALUES (
  '11111111-1111-1111-a111-111111111111',
  'admin@cordova-restaurants.gov.ph',
  '$2b$10$64m6JYqwt4wOGjJW1eQSfu5ep9BUaRwr7rnsanKIP30DqmEKw9Zjm',
  'System Administrator',
  'admin',
  TRUE,
  now()
) ON CONFLICT (email) DO NOTHING;

-- Restaurant owners --------------------------------------------------------
INSERT INTO users (id, email, password_hash, full_name, role, phone, email_verified, email_verified_at) VALUES
('22222222-2222-2222-a222-222222222221', 'owner.lapulapu@example.com', '$2b$10$64m6JYqwt4wOGjJW1eQSfu5ep9BUaRwr7rnsanKIP30DqmEKw9Zjm', 'Maria Santos', 'owner', '+639171234561', TRUE, now()),
('22222222-2222-2222-a222-222222222222', 'owner.seaside@example.com',  '$2b$10$64m6JYqwt4wOGjJW1eQSfu5ep9BUaRwr7rnsanKIP30DqmEKw9Zjm', 'Jun Dela Cruz', 'owner', '+639171234562', TRUE, now()),
('22222222-2222-2222-a222-222222222223', 'owner.grillhouse@example.com','$2b$10$64m6JYqwt4wOGjJW1eQSfu5ep9BUaRwr7rnsanKIP30DqmEKw9Zjm', 'Liza Fernandez', 'owner', '+639171234563', TRUE, now())
ON CONFLICT (email) DO NOTHING;

-- Customers -----------------------------------------------------------------
INSERT INTO users (id, email, password_hash, full_name, role, email_verified, email_verified_at) VALUES
('33333333-3333-3333-a333-333333333331', 'juan.delacruz@example.com', '$2b$10$64m6JYqwt4wOGjJW1eQSfu5ep9BUaRwr7rnsanKIP30DqmEKw9Zjm', 'Juan Dela Cruz', 'customer', TRUE, now()),
('33333333-3333-3333-a333-333333333332', 'ana.reyes@example.com',     '$2b$10$64m6JYqwt4wOGjJW1eQSfu5ep9BUaRwr7rnsanKIP30DqmEKw9Zjm', 'Ana Reyes', 'customer', TRUE, now())
ON CONFLICT (email) DO NOTHING;

INSERT INTO user_preferences (user_id, preferred_cuisines, dietary_restrictions, budget_range, preferred_services, home_latitude, home_longitude, max_distance_km)
VALUES
('33333333-3333-3333-a333-333333333331', ARRAY['Seafood','Cebuano / Local'], ARRAY[]::text[], 'moderate', ARRAY['dine_in','takeout']::service_type[], 10.2530, 123.9490, 5.0),
('33333333-3333-3333-a333-333333333332', ARRAY['Cafe & Desserts','Japanese'], ARRAY['vegetarian'], 'budget', ARRAY['dine_in']::service_type[], 10.2480, 123.9530, 4.0)
ON CONFLICT (user_id) DO NOTHING;

-- Restaurants (coordinates approximate real barangays in Cordova, Cebu) -----
INSERT INTO restaurants (id, owner_id, name, slug, description, address, barangay, latitude, longitude, phone, price_range, services_offered, status, verified_by, verified_at, avg_rating, review_count) VALUES
('44444444-4444-4444-a444-444444444441', '22222222-2222-2222-a222-222222222221',
 'Horizon Bean Cafe', 'horizon-bean-cafe',
 'A cozy, small-scale neighborhood coffee shop known for its premium coffee, comfort food, and late-night chill vibe.',
 'San Miguel, Cordova', 'San Miguel', 10.2545, 123.9485, '+639201112233',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.8, 24),

('44444444-4444-4444-a444-444444444442', '22222222-2222-2222-a222-222222222222',
 'Seaside Cafe Cordova', 'seaside-cafe-cordova',
 'Cozy cafe with ocean views, specializing in coffee, pastries and light vegetarian meals.',
 'Poblacion Cordova, near the wharf', 'Poblacion', 10.2537, 123.9481, '+639201112234',
 'budget', ARRAY['dine_in','takeout','delivery']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.7, 18),

('44444444-4444-4444-a444-444444444443', '22222222-2222-2222-a222-222222222223',
 'Grillhouse Cordova BBQ', 'grillhouse-cordova-bbq',
 'Classic Filipino BBQ and grilled favorites, budget-friendly family dining.',
 'San Miguel Road, Ibabao', 'Ibabao', 10.2561, 123.9459, '+639201112235',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.6, 15),

('44444444-4444-4444-a444-444444444444', '22222222-2222-2222-a222-222222222221',
 'Street Food Park', 'street-food-park',
 'Affordable local street food and fresh seafood paired with a cool ocean breeze and sunset.',
 'Roro Port, Cordova', 'Roro Port', 10.2450, 123.9520, '+639201112236',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.5, 30),

('44444444-4444-4444-a444-444444444445', '22222222-2222-2222-a222-222222222222',
 'ABY ROAD Resto Bar', 'aby-road-resto-bar',
 'Beatles-inspired restobar with local and international favorites.',
 'Bangbang, Cordova', 'Bangbang', 10.2510, 123.9460, '+639201112237',
 'moderate', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.6, 12),

('44444444-4444-4444-a444-444444444446', '22222222-2222-2222-a222-222222222222',
 'Eat n Repeat', 'eat-n-repeat',
 'Aesthetic and Instagram-worthy cafe and tambayan.',
 'Bangbang, Cordova', 'Bangbang', 10.2520, 123.9470, '+639201112238',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.7, 20),

('44444444-4444-4444-a444-444444444447', '22222222-2222-2222-a222-222222222223',
 'Taytayan Pinoy Restaurant', 'taytayan-pinoy-restaurant',
 'Kilalang open-air at lutong-bahay na kainan serving native Cebuano dishes.',
 'Ibabao, Cordova', 'Ibabao', 10.2540, 123.9440, '+639201112239',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.6, 14),

('44444444-4444-4444-a444-444444444448', '22222222-2222-2222-a222-222222222221',
 'STUFFED N FRIED Cordova Branch', 'stuffed-n-fried-cordova-branch',
 'Popular local chicken house known for signature double-fried whole chicken and lechon kawali.',
 'Gabi, Cordova', 'Gabi', 10.2485, 123.9510, '+639201112240',
 'budget', ARRAY['dine_in','takeout','delivery']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.8, 35),

('44444444-4444-4444-a444-444444444449', '22222222-2222-2222-a222-222222222221',
 'McDonalds Cordova', 'mcdonalds-cordova',
 'World-famous fast-food hamburger restaurant serving burgers, fries, and breakfast favorites.',
 'San Miguel, Cordova', 'San Miguel', 10.2550, 123.9490, '+639201112241',
 'budget', ARRAY['dine_in','takeout','delivery']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.5, 50),

('44444444-4444-4444-a444-44444444444a', '22222222-2222-2222-a222-222222222223',
 'Barracks Grill and Resto Bar', 'barracks-grill-and-resto-bar',
 'Casual nightspot and dining place with grilled specialties.',
 'Gabi, Cordova', 'Gabi', 10.2470, 123.9530, '+639201112242',
 'moderate', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.5, 16),

('44444444-4444-4444-a444-44444444444b', '22222222-2222-2222-a222-222222222221',
 'BRIC Food Park', 'bric-food-park',
 'A vibrant, open-air al fresco dining destination with multiple food stalls.',
 'San Miguel, Cordova', 'San Miguel', 10.2560, 123.9500, '+639201112243',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.6, 22),

('44444444-4444-4444-a444-44444444444c', '22222222-2222-2222-a222-222222222221',
 'RCA Bilao Food Station', 'rca-bilao-food-station',
 'Pansit stir-fry, boneless lechon belly, and kakanin bilao food trays.',
 'Gabi, Cordova', 'Gabi', 10.2490, 123.9525, '+639201112244',
 'budget', ARRAY['dine_in','takeout','delivery']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.7, 19),

('44444444-4444-4444-a444-44444444444d', '22222222-2222-2222-a222-222222222222',
 'MAVERICKS by The Baker Street', 'mavericks-by-the-baker-street',
 'Creative space, collective stories, pastry party, and specialty coffee.',
 'Gabi, Cordova', 'Gabi', 10.2488, 123.9515, '+639201112245',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.9, 28),

('44444444-4444-4444-a444-44444444444e', '22222222-2222-2222-a222-222222222221',
 'Entoys Bakasihan', 'entoys-bakasihan',
 'Famous open-air eatery famous for its signature reef eel dish nilarang na bakasi.',
 'Buagsong, Cordova', 'Buagsong', 10.2505, 123.9420, '+639201112246',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.7, 40),

('44444444-4444-4444-a444-44444444444f', '22222222-2222-2222-a222-222222222223',
 'Tita Kims', 'tita-kims',
 'Affordable buffet-style Filipino restaurant located along the National Highway.',
 'Gabi, Cordova', 'Gabi', 10.2475, 123.9540, '+639201112247',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.6, 25),

('44444444-4444-4444-a444-444444444450', '22222222-2222-2222-a222-222222222221',
 'Burandat Seafood Bucket', 'burandat-seafood-bucket',
 'Fresh catch-of-the-day seafood grilled to order, right by the shoreline.',
 'Gabi, Cordova', 'Gabi', 10.2465, 123.9500, '+639201112248',
 'moderate', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.7, 32),

('44444444-4444-4444-a444-444444444451', '22222222-2222-2222-a222-222222222222',
 'Cafe Mafia', 'cafe-mafia',
 'Gourmet burgers, artisan coffee, and mafia-themed ambiance.',
 'Dapitan, Cordova', 'Dapitan', 10.2580, 123.9475, '+639201112249',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.8, 26),

('44444444-4444-4444-a444-444444444452', '22222222-2222-2222-a222-222222222221',
 'Solea Mactan Resort', 'solea-mactan-restaurant',
 'Resort dining featuring international buffets and local specialties.',
 'Alegria, Cordova', 'Alegria', 10.2390, 123.9600, '+639201112250',
 'premium', ARRAY['dine_in']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.9, 65),

('44444444-4444-4444-a444-444444444453', '22222222-2222-2222-a222-222222222223',
 'Husbys Grill', 'husbys-grill',
 'Local grill house known for tender ribs, BBQ skewers, and family meals.',
 'Gabi, Cordova', 'Gabi', 10.2482, 123.9535, '+639201112251',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.7, 21),

('44444444-4444-4444-a444-444444444454', '22222222-2222-2222-a222-222222222221',
 'Sungka Native Restaurant', 'sungka-native-restaurant',
 'Classic Filipino dishes served with warm hospitality near Cordova port.',
 'Day-as, Cordova', 'Day-as', 10.2525, 123.9430, '+639201112252',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.6, 17),

('44444444-4444-4444-a444-444444444455', '22222222-2222-2222-a222-222222222221',
 'Lantaw Floating Native Restaurant', 'lantaw-floating-native-restaurant',
 'Floating native restaurant on the Cordova waterfront with sunset views and seafood.',
 'Day-as, Cordova', 'Day-as', 10.2515, 123.9410, '+639201112253',
 'moderate', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.8, 80),

('44444444-4444-4444-a444-444444444456', '22222222-2222-2222-a222-222222222221',
 'Albertos Pizza Cordova', 'albertos-pizza-cordova',
 'Affordable freshly-baked local favorites and specialty pizzas.',
 'Gabi, Cordova', 'Gabi', 10.2492, 123.9512, '+639201112254',
 'budget', ARRAY['dine_in','takeout','delivery']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.6, 38),

('44444444-4444-4444-a444-444444444457', '22222222-2222-2222-a222-222222222222',
 'Cascaja Cafe', 'cascadja-cafe',
 'Cozy coffee shop in Cordova offering delicious coffee, rice meals, pasta, and drinks.',
 'Calan, Cordova', 'Calan', 10.2570, 123.9465, '+639201112255',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.7, 24),

('44444444-4444-4444-a444-444444444458', '22222222-2222-2222-a222-222222222222',
 'Don Macchiatos Cordova', 'don-macchiatos-cordova',
 'Budget-friendly espresso drinks, iced caramel macchiatos, and coffee favorites.',
 'San Miguel, Cordova', 'San Miguel', 10.2555, 123.9495, '+639201112256',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.8, 45),

('44444444-4444-4444-a444-444444444459', '22222222-2222-2222-a222-222222222221',
 'Parola Seaview Restaurant', 'parola-seaview-restaurant',
 'Open-air seaside dining centered around an illuminated lighthouse overlooking the bay.',
 'Poblacion, Cordova', 'Poblacion', 10.2530, 123.9470, '+639201112257',
 'moderate', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.9, 70),

('44444444-4444-4444-a444-44444444445a', '22222222-2222-2222-a222-222222222222',
 '10000 Roses Cafe & More', '10000-roses-cafe-and-more',
 'Iconic tourist attraction and cafe surrounded by thousands of LED-lit artificial white roses.',
 'Day-as, Cordova', 'Day-as', 10.2510, 123.9405, '+639201112258',
 'moderate', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.9, 95)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  address = EXCLUDED.address,
  barangay = EXCLUDED.barangay,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  phone = EXCLUDED.phone,
  price_range = EXCLUDED.price_range,
  status = EXCLUDED.status;

-- Restaurant <-> cuisine mapping ---------------------------------------------
INSERT INTO restaurant_cuisines (restaurant_id, cuisine_id)
SELECT '44444444-4444-4444-a444-444444444441', id FROM cuisines WHERE slug IN ('seafood','cebuano-local','grill-bbq')
ON CONFLICT DO NOTHING;
INSERT INTO restaurant_cuisines (restaurant_id, cuisine_id)
SELECT '44444444-4444-4444-a444-444444444442', id FROM cuisines WHERE slug IN ('cafe-desserts','vegetarian-vegan')
ON CONFLICT DO NOTHING;
INSERT INTO restaurant_cuisines (restaurant_id, cuisine_id)
SELECT '44444444-4444-4444-a444-444444444443', id FROM cuisines WHERE slug IN ('grill-bbq','filipino')
ON CONFLICT DO NOTHING;

INSERT INTO restaurant_dietary_options (restaurant_id, option) VALUES
('44444444-4444-4444-a444-444444444442', 'vegetarian'),
('44444444-4444-4444-a444-444444444442', 'vegan')
ON CONFLICT DO NOTHING;

-- Operating hours (Mon-Sun, 0=Sunday) ----------------------------------------
INSERT INTO operating_hours (restaurant_id, day_of_week, open_time, close_time)
SELECT '44444444-4444-4444-a444-444444444441', d, '10:00', '21:00' FROM generate_series(0,6) d
ON CONFLICT DO NOTHING;
INSERT INTO operating_hours (restaurant_id, day_of_week, open_time, close_time)
SELECT '44444444-4444-4444-a444-444444444442', d, '07:00', '20:00' FROM generate_series(0,6) d
ON CONFLICT DO NOTHING;
INSERT INTO operating_hours (restaurant_id, day_of_week, open_time, close_time, is_closed)
SELECT '44444444-4444-4444-a444-444444444443', d, '11:00', '22:00', (d = 1) FROM generate_series(0,6) d
ON CONFLICT DO NOTHING;

-- Menu ------------------------------------------------------------------
INSERT INTO menu_categories (id, restaurant_id, name, sort_order) VALUES
('55555555-5555-5555-a555-555555555551', '44444444-4444-4444-a444-444444444441', 'Grilled Seafood', 1),
('55555555-5555-5555-a555-555555555552', '44444444-4444-4444-a444-444444444442', 'Coffee & Beverages', 1),
('55555555-5555-5555-a555-555555555553', '44444444-4444-4444-a444-444444444443', 'BBQ Skewers', 1)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (restaurant_id, category_id, name, description, price, dietary_tags) VALUES
('44444444-4444-4444-a444-444444444441', '55555555-5555-5555-a555-555555555551', 'Grilled Bangus Belly', 'Whole milkfish belly, grilled with calamansi-soy dip', 220.00, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444441', '55555555-5555-5555-a555-555555555551', 'Garlic Butter Shrimp', 'Half kilo of shrimp sauteed in garlic butter', 350.00, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444442', '55555555-5555-5555-a555-555555555552', 'Iced Spanish Latte', 'House specialty cold brew latte', 140.00, ARRAY['vegetarian']),
('44444444-4444-4444-a444-444444444442', '55555555-5555-5555-a555-555555555552', 'Vegan Banana Muffin', 'Freshly baked, dairy-free', 85.00, ARRAY['vegan','vegetarian']),
('44444444-4444-4444-a444-444444444443', '55555555-5555-5555-a555-555555555553', 'Pork BBQ Skewer (3pcs)', 'Sweet-savory marinated pork skewers', 90.00, ARRAY[]::text[])
ON CONFLICT DO NOTHING;

-- Reviews ------------------------------------------------------------------
INSERT INTO reviews (restaurant_id, user_id, rating, comment) VALUES
('44444444-4444-4444-a444-444444444441', '33333333-3333-3333-a333-333333333331', 5, 'Freshest seafood in Cordova, worth the trip!'),
('44444444-4444-4444-a444-444444444442', '33333333-3333-3333-a333-333333333332', 4, 'Great vegan options and a relaxing view.')
ON CONFLICT DO NOTHING;

-- Promotions -----------------------------------------------------------------
INSERT INTO promotions (restaurant_id, title, description, discount_label, start_date, end_date, status) VALUES
('44444444-4444-4444-a444-444444444441', 'Weekend Seafood Feast', 'Get a free side dish with any order above ₱500 on weekends.', 'Free Side Dish', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 'active')
ON CONFLICT DO NOTHING;
