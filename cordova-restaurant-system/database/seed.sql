-- ============================================================================
-- 002_seed_data.sql
-- Seed script for Cordova Restaurant Directory System (Development / Demo)
-- ============================================================================

-- Users ----------------------------------------------------------------------
-- password is 'Password123!' hashed with bcrypt (cost factor 10)
-- $2b$10$64m6JYqwt4wOGjJW1eQSfu5ep9BUaRwr7rnsanKIP30DqmEKw9Zjm
INSERT INTO users (id, email, password_hash, full_name, role, phone_number, email_verified, created_at) VALUES
('11111111-1111-1111-a111-111111111111', 'admin@cordovateats.ph',   '$2b$10$64m6JYqwt4wOGjJW1eQSfu5ep9BUaRwr7rnsanKIP30DqmEKw9Zjm', 'System Administrator', 'admin',  '+639171234560', TRUE, now()),
('22222222-2222-2222-a222-222222222221', 'owner.lantaw@example.com',  '$2b$10$64m6JYqwt4wOGjJW1eQSfu5ep9BUaRwr7rnsanKIP30DqmEKw9Zjm', 'Juan dela Cruz',       'owner',  '+639171234561', TRUE, now()),
('22222222-2222-2222-a222-222222222222', 'owner.roses@example.com',   '$2b$10$64m6JYqwt4wOGjJW1eQSfu5ep9BUaRwr7rnsanKIP30DqmEKw9Zjm', 'Maria Santos',         'owner',  '+639171234562', TRUE, now()),
('22222222-2222-2222-a222-222222222223', 'owner.grillhouse@example.com','$2b$10$64m6JYqwt4wOGjJW1eQSfu5ep9BUaRwr7rnsanKIP30DqmEKw9Zjm', 'Liza Fernandez',     'owner',  '+639171234563', TRUE, now()),
('33333333-3333-3333-a333-333333333331', 'diner.carlos@example.com',  '$2b$10$64m6JYqwt4wOGjJW1eQSfu5ep9BUaRwr7rnsanKIP30DqmEKw9Zjm', 'Carlos Reyes',         'diner',  '+639171234564', TRUE, now()),
('33333333-3333-3333-a333-333333333332', 'diner.ana@example.com',     '$2b$10$64m6JYqwt4wOGjJW1eQSfu5ep9BUaRwr7rnsanKIP30DqmEKw9Zjm', 'Ana Lim',              'diner',  '+639171234565', TRUE, now())
ON CONFLICT (email) DO NOTHING;

-- Cuisines -------------------------------------------------------------------
INSERT INTO cuisines (slug, name, icon) VALUES
('seafood',          'Seafood',           '🦞'),
('cebuano-local',    'Cebuano & Native',  '🥥'),
('grill-bbq',        'Grill & BBQ',       '🔥'),
('cafe-desserts',    'Cafe & Desserts',   '☕'),
('filipino',         'Filipino Classic',  '🍲'),
('asian-fusion',     'Asian Fusion',      '🍜'),
('fast-food',        'Fast Food',         '🍔'),
('vegetarian-vegan', 'Vegetarian / Vegan','🥗')
ON CONFLICT (slug) DO NOTHING;

-- Restaurants ----------------------------------------------------------------
INSERT INTO restaurants (
  id, owner_id, name, slug, description, address, barangay,
  latitude, longitude, phone, price_range, services_offered,
  status, verified_by, verified_at, avg_rating, review_count
) VALUES
('44444444-4444-4444-a444-444444444441', '22222222-2222-2222-a222-222222222221',
 'Horizon Bean Cafe', 'horizon-bean-cafe',
 'A cozy, small-scale neighborhood coffee shop known for its premium coffee, comfort food, and late-night chill vibe.',
 'Unit 3, JMP Building, Purok 1 San Miguel Road, Cordova', 'San Miguel', 10.2550, 123.9480, '0975 174 5866',
 'budget', ARRAY['dine_in','takeout','delivery']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.8, 42),

('44444444-4444-4444-a444-444444444442', '22222222-2222-2222-a222-222222222222',
 'CSalt Cafe', 'csalt-cafe',
 'Cozy cafe with ocean views, specializing in coffee, pastries and light vegetarian meals.',
 'Poblacion Cordova, near the wharf', 'Poblacion', 10.2537, 123.9481, '+639201112234',
 'budget', ARRAY['dine_in','takeout','delivery']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.7, 18),

('44444444-4444-4444-a444-444444444443', '22222222-2222-2222-a222-222222222223',
 'Grillhouse Cordova BBQ', 'grillhouse-cordova-bbq',
 'Classic Filipino BBQ and grilled favorites, budget-friendly family dining.',
 'San Miguel Road, Ibabao', 'Ibabao', 10.2561, 123.9459, '0927 296 4811',
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
 'Bangbang, Cordova', 'Bangbang', 10.2510, 123.9460, '(032) 238 5718',
 'moderate', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.6, 12),

('44444444-4444-4444-a444-444444444446', '22222222-2222-2222-a222-222222222222',
 'Eat n Repeat', 'eat-n-repeat',
 'Aesthetic and Instagram-worthy cafe and tambayan.',
 'Bangbang, Cordova', 'Bangbang', 10.2520, 123.9470, '0915 151 6595',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.7, 20),

('44444444-4444-4444-a444-444444444447', '22222222-2222-2222-a222-222222222223',
 'Taytayan Pinoy Restaurant', 'taytayan-pinoy-restaurant',
 'Kilalang open-air at lutong-bahay na kainan serving native Cebuano dishes.',
 'Ibabao, Cordova', 'Ibabao', 10.2540, 123.9440, '(032) 412 3783',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.6, 14),

('44444444-4444-4444-a444-444444444448', '22222222-2222-2222-a222-222222222221',
 'STUFFED N FRIED Cordova Branch', 'stuffed-n-fried-cordova-branch',
 'Popular local chicken house known for signature double-fried whole chicken and lechon kawali.',
 'Gabi, Cordova', 'Gabi', 10.2485, 123.9510, '0975 985 6145',
 'budget', ARRAY['dine_in','takeout','delivery']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.8, 35),

('44444444-4444-4444-a444-444444444449', '22222222-2222-2222-a222-222222222221',
 'McDonalds Cordova', 'mcdonalds-cordova',
 'World-famous fast-food hamburger restaurant serving burgers, fries, and breakfast favorites.',
 'San Miguel, Cordova', 'San Miguel', 10.2550, 123.9490, '0968 851 0931',
 'budget', ARRAY['dine_in','takeout','delivery']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.5, 50),

('44444444-4444-4444-a444-44444444444a', '22222222-2222-2222-a222-222222222223',
 'Barracks Grill and Resto Bar', 'barracks-grill-and-resto-bar',
 'Casual nightspot and dining place with grilled specialties.',
 'Gabi, Cordova', 'Gabi', 10.2470, 123.9530, '0977 328 7689',
 'moderate', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.5, 16),

('44444444-4444-4444-a444-44444444444b', '22222222-2222-2222-a222-222222222221',
 'BRIC Food Park', 'bric-food-park',
 'A vibrant, open-air al fresco dining destination with multiple food stalls.',
 'San Miguel, Cordova', 'San Miguel', 10.2560, 123.9500, 'N/A',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.6, 22),

('44444444-4444-4444-a444-44444444444c', '22222222-2222-2222-a222-222222222221',
 'RCA Bilao Food Station', 'rca-bilao-food-station',
 'Pansit stir-fry, boneless lechon belly, and kakanin bilao food trays.',
 'Gabi, Cordova', 'Gabi', 10.2490, 123.9525, '(032) 326 8766',
 'budget', ARRAY['dine_in','takeout','delivery']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.7, 19),

('44444444-4444-4444-a444-44444444444d', '22222222-2222-2222-a222-222222222222',
 'MAVERICKS by The Baker Street', 'mavericks-by-the-baker-street',
 'Creative space, collective stories, pastry party, and specialty coffee.',
 'Gabi, Cordova', 'Gabi', 10.2488, 123.9515, '0920 527 6233',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.9, 28),

('44444444-4444-4444-a444-44444444444e', '22222222-2222-2222-a222-222222222221',
 'Entoys Bakasihan', 'entoys-bakasihan',
 'Famous open-air eatery famous for its signature reef eel dish nilarang na bakasi.',
 'Buagsong, Cordova', 'Buagsong', 10.2505, 123.9420, '0966 931 7531',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.7, 40),

('44444444-4444-4444-a444-44444444444f', '22222222-2222-2222-a222-222222222223',
 'Tita Kims', 'tita-kims',
 'Affordable buffet-style Filipino restaurant located along the National Highway.',
 'Gabi, Cordova', 'Gabi', 10.2475, 123.9540, '0998 868 8573',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.6, 25),

('44444444-4444-4444-a444-444444444450', '22222222-2222-2222-a222-222222222221',
 'Burandat Seafood Bucket', 'burandat-seafood-bucket',
 'Fresh catch-of-the-day seafood grilled to order, right by the shoreline.',
 'Gabi, Cordova', 'Gabi', 10.2465, 123.9500, '0916 473 3656',
 'moderate', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.7, 32),

('44444444-4444-4444-a444-444444444451', '22222222-2222-2222-a222-222222222222',
 'Cafe Mafia', 'cafe-mafia',
 'Gourmet burgers, artisan coffee, and mafia-themed ambiance.',
 'Dapitan, Cordova', 'Dapitan', 10.2580, 123.9475, '0917 321 0453',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.8, 26),

('44444444-4444-4444-a444-444444444452', '22222222-2222-2222-a222-222222222221',
 'Solea Mactan Resort', 'solea-mactan-restaurant',
 'Resort dining featuring international buffets and local specialties.',
 'Alegria, Cordova', 'Alegria', 10.2390, 123.9600, '(032) 517 8889',
 'premium', ARRAY['dine_in']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.9, 65),

('44444444-4444-4444-a444-444444444453', '22222222-2222-2222-a222-222222222223',
 'Husbys Grill', 'husbys-grill',
 'Local grill house known for tender ribs, BBQ skewers, and family meals.',
 'Gabi, Cordova', 'Gabi', 10.2482, 123.9535, '+63 917 138 3144',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.7, 21),

('44444444-4444-4444-a444-444444444454', '22222222-2222-2222-a222-222222222221',
 'Sungka Native Restaurant', 'sungka-native-restaurant',
 'Classic Filipino dishes served with warm hospitality near Cordova port.',
 'Day-as, Cordova', 'Day-as', 10.2525, 123.9430, 'sungkanative@gmail.com',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.6, 17),

('44444444-4444-4444-a444-444444444455', '22222222-2222-2222-a222-222222222221',
 'Lantaw Floating Native Restaurant', 'lantaw-floating-native-restaurant',
 'Floating native restaurant on the Cordova waterfront with sunset views and seafood.',
 'Day-as, Cordova', 'Day-as', 10.2515, 123.9410, '0985 052 3061',
 'moderate', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.8, 80),

('44444444-4444-4444-a444-444444444456', '22222222-2222-2222-a222-222222222221',
 'Albertos Pizza Cordova', 'albertos-pizza-cordova',
 'Affordable freshly-baked local favorites and specialty pizzas.',
 'Gabi, Cordova', 'Gabi', 10.2492, 123.9512, '0925 871 4539',
 'budget', ARRAY['dine_in','takeout','delivery']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.6, 38),

('44444444-4444-4444-a444-444444444457', '22222222-2222-2222-a222-222222222222',
 'Cascaja Cafe', 'cascadja-cafe',
 'Cozy coffee shop in Cordova offering delicious coffee, rice meals, pasta, and drinks.',
 'Calan, Cordova', 'Calan', 10.2570, 123.9465, '+63 995 755 0983',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.7, 24),

('44444444-4444-4444-a444-444444444458', '22222222-2222-2222-a222-222222222222',
 'Don Macchiatos Cordova', 'don-macchiatos-cordova',
 'Budget-friendly espresso drinks, iced caramel macchiatos, and coffee favorites.',
 'San Miguel, Cordova', 'San Miguel', 10.2555, 123.9495, '0918 596 7413',
 'budget', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.8, 45),

('44444444-4444-4444-a444-444444444459', '22222222-2222-2222-a222-222222222221',
 'Parola Seaview Restaurant', 'parola-seaview-restaurant',
 'Open-air seaside dining centered around an illuminated lighthouse overlooking the bay.',
 'Poblacion, Cordova', 'Poblacion', 10.2530, 123.9470, '(032) 514 9005',
 'moderate', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.9, 70),

('44444444-4444-4444-a444-44444444445a', '22222222-2222-2222-a222-222222222222',
 '10000 Roses Cafe & More', '10000-roses-cafe-and-more',
 'Iconic tourist attraction and cafe surrounded by thousands of LED-lit artificial white roses.',
 'Day-as, Cordova', 'Day-as', 10.2510, 123.9405, '0956 839 9427',
 'moderate', ARRAY['dine_in','takeout']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.9, 95),

('44444444-4444-4444-a444-44444444445b', '22222222-2222-2222-a222-222222222221',
 'Papsys BBQ', 'papsys-bbq',
 'A popular Filipino casual dining restaurant chain known for its signature charcoal-grilled specialties and rustic, modern ambiance.',
 'Barangay Bang-bang, Cordova, Cebu', 'Bang-bang', 10.2579, 123.9485, '0927 296 4811',
 'budget', ARRAY['dine_in','takeout','delivery']::service_type[], 'verified',
 '11111111-1111-1111-a111-111111111111', now(), 4.8, 52)
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
INSERT INTO restaurant_cuisines (restaurant_id, cuisine_id)
SELECT '44444444-4444-4444-a444-44444444445b', id FROM cuisines WHERE slug IN ('grill-bbq','filipino')
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
INSERT INTO operating_hours (restaurant_id, day_of_week, open_time, close_time)
SELECT '44444444-4444-4444-a444-44444444445b', d, '09:00', '21:00' FROM generate_series(0,6) d
ON CONFLICT DO NOTHING;

-- Default Menu ------------------------------------------------------------------
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


-- McDonalds Cordova Menu Categories
INSERT INTO menu_categories (id, restaurant_id, name, sort_order) VALUES
('60337da8-4f8c-4fc4-834a-4d3a9047465a', '44444444-4444-4444-a444-444444444449', 'Burgers & Sandwiches', 1),
('16dbacfa-94cf-4fe1-a9c4-af86ec718cde', '44444444-4444-4444-a444-444444444449', 'Chicken McDo & Platters', 2),
('74154098-e87d-4645-a453-22bcc2d8e7d0', '44444444-4444-4444-a444-444444444449', 'McSpaghetti & Rice Meals', 3),
('adc70935-b25c-4994-bb48-a7d1e3760b9b', '44444444-4444-4444-a444-444444444449', 'McFries & Sides', 4),
('f53513ef-1203-4338-81ec-f27f3e862819', '44444444-4444-4444-a444-444444444449', 'Desserts & Sweet Treats', 5),
('9bec9a91-c365-4764-8995-0f705fd8eef8', '44444444-4444-4444-a444-444444444449', 'McCafé & Beverages', 6),
('8440b510-d832-4cc2-a660-e69ab240fea8', '44444444-4444-4444-a444-444444444449', 'Group Meals & McShare', 7)
ON CONFLICT DO NOTHING;

-- McDonalds Cordova Menu Items
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, image_url, is_available, dietary_tags) VALUES
('44444444-4444-4444-a444-444444444449', '16dbacfa-94cf-4fe1-a9c4-af86ec718cde', '1-pc. Chicken McDo Meal', 'Signature crispy, golden-brown chicken that is juicy on the inside, served with steamed rice and signature gravy.', 115.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/Sulit-Busog-1-pc.-Chicken-Mcdo-Meal.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '16dbacfa-94cf-4fe1-a9c4-af86ec718cde', '1-pc. Chicken McDo with Fries Meal', '1-pc. Chicken McDo with steamed rice, world-famous golden fries, and a regular drink.', 198.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/1-pc.-Chicken-McDo-Fries-Meal.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '74154098-e87d-4645-a453-22bcc2d8e7d0', '1-pc. Chicken McDo with McSpaghetti & Fries Meal', '1-pc. Chicken McDo, McSpaghetti, world-famous golden fries, and a chilled drink.', 262.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/spagetti-meal-mcdonalds-06.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '74154098-e87d-4645-a453-22bcc2d8e7d0', '1-pc. Chicken McDo with McSpaghetti Meal', 'The iconic combination of 1-pc. crispy Chicken McDo and sweet-style McSpaghetti noodles.', 201.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/spagetti-meal-mcdonalds-08.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '16dbacfa-94cf-4fe1-a9c4-af86ec718cde', '1-pc. Spicy Chicken McDo & Fries Meal', '1-pc. Spicy Chicken McDo with rice, world-famous golden fries, and regular beverage.', 203.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/1-pc.-Spicy-Chicken-McDo-Fries-Meal.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '16dbacfa-94cf-4fe1-a9c4-af86ec718cde', '1-pc. Spicy Chicken McDo Meal', 'Crispy chicken cooked with fiery spices throughout the meat, served with warm rice and savory gravy.', 120.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/1-pc.-Spicy-Chicken-McDo-Meal.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '16dbacfa-94cf-4fe1-a9c4-af86ec718cde', '10-pc. Chicken McNuggets', 'Ten pieces of golden, crispy Chicken McNuggets with delicious dipping sauce.', 189.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/10-pc-chicken-mcnuggets.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '16dbacfa-94cf-4fe1-a9c4-af86ec718cde', '2-pc. Chicken McDo & Fries Meal', 'Two pieces of Chicken McDo, steamed rice, signature fries, and refreshing drink.', 288.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/2-pc.-Chicken-McDo-Fries-Meal.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '16dbacfa-94cf-4fe1-a9c4-af86ec718cde', '2-pc. Chicken McDo Meal', 'Two pieces of crispy, juicy Chicken McDo served with warm steamed rice and rich gravy.', 231.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/2-pc.-Chicken-McDo-Meal.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '16dbacfa-94cf-4fe1-a9c4-af86ec718cde', '2-pc. Spicy Chicken McDo Meal', 'Two pieces of hot and spicy Chicken McDo served with steamed white rice and rich gravy.', 241.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/2-pc.-Chicken-McDo-Meal.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '16dbacfa-94cf-4fe1-a9c4-af86ec718cde', '20-pc. Chicken McNuggets', 'Twenty golden pieces of Chicken McNuggets made with tender white meat chicken, perfect for sharing.', 375.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/20-pc-chicken-mcnuggets.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '8440b510-d832-4cc2-a660-e69ab240fea8', '4-pc. Burger McDo McShare Bundle', 'Bundle of 4 Burger McDo burgers with 4 regular fries and 4 drinks.', 460.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo-burgers-price-05.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '16dbacfa-94cf-4fe1-a9c4-af86ec718cde', '6-pc. Chicken McNuggets with Fries Meal', 'Six tender, juicy pieces of white meat chicken McNuggets with your choice of dipping sauce, fries, and drink.', 215.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/6-pc.-Chicken-McNuggets-w-Fries-Meal.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '8440b510-d832-4cc2-a660-e69ab240fea8', '6-pc. Chicken McShare Box', 'Six pieces of crispy, juicy Chicken McDo with gravy, perfect for sharing with family and friends.', 513.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/6-pc-chicken-mcshare-box-2.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '8440b510-d832-4cc2-a660-e69ab240fea8', '6-pc. Spicy Chicken McShare Box', 'Six pieces of spicy-spiced Chicken McDo pieces packed in a sharing box.', 533.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/6-pc-chicken-mcshare-box-2.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '8440b510-d832-4cc2-a660-e69ab240fea8', '8-pc. Chicken McShare Box', 'Eight pieces of freshly cooked Chicken McDo served with savory dipping gravy.', 670.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/8-pc-chicken-mcshare-box-3.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '8440b510-d832-4cc2-a660-e69ab240fea8', '8-pc. Spicy Chicken McShare Box', 'Eight pieces of spicy Chicken McDo for party bundles and family meals.', 690.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/8-pc-chicken-mcshare-box-3.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'f53513ef-1203-4338-81ec-f27f3e862819', 'Apple Pie', 'Crispy, flaky golden pastry crust filled with warm, sweet cinnamon apple filling.', 45.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/apple-pie-mcdo-philippines.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'adc70935-b25c-4994-bb48-a7d1e3760b9b', 'BFF Fries', 'Extra-large sharing size of iconic McDonald''s crispy golden fries for you and your friends.', 175.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo-fries-13.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '60337da8-4f8c-4fc4-834a-4d3a9047465a', 'Big Mac Meal', 'Two 100% beef patties, Big Mac sauce, crisp shredded lettuce, American cheese, pickles, and onions on a toasted sesame seed bun. Served with fries and drink.', 284.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo-burgers-price-16.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '60337da8-4f8c-4fc4-834a-4d3a9047465a', 'Burger McDo Meal', 'Beef patty topped with sweet-savory signature sauce in a soft toasted bun. Served with fries and drink.', 157.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo-burgers-price-05.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '60337da8-4f8c-4fc4-834a-4d3a9047465a', 'Cheeseburger Meal', '100% pure beef patty seasoned with a pinch of salt and pepper, topped with a tangy pickle, chopped onions, ketchup, mustard, and a slice of melty American cheese. Served with fries and drink.', 156.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo-burgers-price-15.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '60337da8-4f8c-4fc4-834a-4d3a9047465a', 'Cheesy Burger McDo Meal', 'Classic Burger McDo layered with creamy cheese. Served with fries and drink.', 167.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo-burgers-price-19.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'f53513ef-1203-4338-81ec-f27f3e862819', 'Choco Lava Puff', 'Crispy warm puff with an oozing, molten rich chocolate center.', 77.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2026/07/mcdo-Choco-Lava-Puff.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '9bec9a91-c365-4764-8995-0f705fd8eef8', 'Coca-Cola Medium', 'Classic ice-cold, refreshing Coca-Cola.', 59.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/Coca-Cola.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'f53513ef-1203-4338-81ec-f27f3e862819', 'Coke McFloat', 'Ice-cold bubbly Coca-Cola topped with creamy vanilla soft serve and sweet chocolate syrup.', 82.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/drinks-mcdo-image-04-philippines.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'f53513ef-1203-4338-81ec-f27f3e862819', 'Cotton Candy McFloat', 'Fun, pastel cotton candy flavored soda topped with creamy soft serve ice cream.', 61.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/cotton-candy-mcfloat.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '16dbacfa-94cf-4fe1-a9c4-af86ec718cde', 'Crispy Chicken Fillet Ala King Meal', 'Crispy chicken fillet with creamy buttery Ala King sauce over hot steamed rice.', 105.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/Crispy-Chicken-Fillet-Ala-King-Meal.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '16dbacfa-94cf-4fe1-a9c4-af86ec718cde', 'Crispy Chicken Fillet Ala King with Fries Meal', 'Golden crispy chicken fillet smothered in rich, creamy Ala King sauce with steamed rice, fries, and drink.', 170.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/Crispy-Chicken-Fillet-Ala-King-w-Fries-Meal.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '60337da8-4f8c-4fc4-834a-4d3a9047465a', 'Crispy Chicken Fillet Sandwich with Fries Meal', 'Crispy, juicy chicken fillet served with creamy sauce on a toasted bun. Served with fries and drink.', 177.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo-burgers-price-12.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '60337da8-4f8c-4fc4-834a-4d3a9047465a', 'Double Big Mac Meal', 'Four 100% beef patties with signature Big Mac sauce, lettuce, cheese, pickles, and onions. Served with fries and drink.', 346.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo-price-02.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '60337da8-4f8c-4fc4-834a-4d3a9047465a', 'Double Cheeseburger Meal', 'Two 100% pure beef patties seasoned with just a pinch of salt and pepper, topped with tangy pickles, minced onions, ketchup, mustard, and two slices of melted American cheese. Served with fries and drink.', 250.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo-burgers-price-14.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '60337da8-4f8c-4fc4-834a-4d3a9047465a', 'Double McChicken Meal', 'Two crispy chicken patties topped with savory mayonnaise and shredded lettuce on a toasted bun. Served with fries and drink.', 264.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo01-price-01.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '60337da8-4f8c-4fc4-834a-4d3a9047465a', 'Double Quarter Pounder with Cheese Meal', 'Two quarter-pound 100% pure beef patties served hot and juicy with melted American cheese, slivered onions, and pickles. Served with fries and drink.', 346.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo-burgers-price-07.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '60337da8-4f8c-4fc4-834a-4d3a9047465a', 'Ebi Burger Meal', 'Crisp, golden shrimp patty drizzled with Thousand Island dressing and fresh lettuce. Served with fries and drink.', 265.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2026/02/Ebi-Burger-Meal.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'adc70935-b25c-4994-bb48-a7d1e3760b9b', 'Hash Browns', 'Golden, crispy, and fluffy shredded potato patty.', 48.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/hash-brown.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'f53513ef-1203-4338-81ec-f27f3e862819', 'Hot Caramel Sundae', 'Velvety vanilla soft serve drizzled with warm, rich caramel fudge topping.', 59.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/drinks-mcdo-image-03-philippines.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '9bec9a91-c365-4764-8995-0f705fd8eef8', 'Hot Chocolate', 'Steaming cup of rich, creamy decadent chocolate.', 85.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/Hot-Chocolate.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'f53513ef-1203-4338-81ec-f27f3e862819', 'Hot Fudge Sundae', 'Vanilla soft serve smothered in rich, warm chocolate fudge.', 59.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/drinks-mcdo-image-02-philippines.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '9bec9a91-c365-4764-8995-0f705fd8eef8', 'Iced Tea Medium', 'Chilled sweet and tangy iced tea.', 65.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/Iced-Tea.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'adc70935-b25c-4994-bb48-a7d1e3760b9b', 'Large Fries', 'Generous serving of crispy golden fries lightly salted to perfection.', 125.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcfries-original.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'adc70935-b25c-4994-bb48-a7d1e3760b9b', 'Large Poptato', 'Bite-sized crispy golden potato pops seasoned to perfection.', 100.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2026/07/mcdo-Large-Poptato.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'f53513ef-1203-4338-81ec-f27f3e862819', 'Matcha McFlurry with Oreo', 'Smooth matcha green tea swirl blended with vanilla soft-serve and crushed Oreo cookies.', 83.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/drinks-mcdo-image-10-philippines.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '9bec9a91-c365-4764-8995-0f705fd8eef8', 'McCafé Caramel Frappe', 'Ice-blended coffee with rich caramel syrup, topped with fluffy whipped cream and caramel drizzle.', 169.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/McCafe-Caramel-Frappe.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '9bec9a91-c365-4764-8995-0f705fd8eef8', 'McCafé Dalandan Smoothie', 'Refreshing citrus dalandan fruit smoothie blended icy cold.', 149.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/McCafe-Dalandan-Smoothie.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '9bec9a91-c365-4764-8995-0f705fd8eef8', 'McCafé Iced Coffee Black', 'Bold, chilled freshly brewed coffee served over ice.', 59.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/McCafe-Iced-Americano-Medium.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '9bec9a91-c365-4764-8995-0f705fd8eef8', 'McCafé Iced Coffee Original', 'Chilled premium roast coffee blended with sweet milk and ice.', 69.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/McCafe-Iced-Latte-Medium.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '9bec9a91-c365-4764-8995-0f705fd8eef8', 'McCafé Iced Latte', 'Freshly pulled espresso poured over cold fresh milk and ice.', 99.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/McCafe-Iced-Latte-Medium.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '9bec9a91-c365-4764-8995-0f705fd8eef8', 'McCafé Mocha Frappe', 'Blended coffee and rich chocolaty fudge topped with whipped cream and chocolate drizzle.', 169.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/McCafe-Mocha-Frappe.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '9bec9a91-c365-4764-8995-0f705fd8eef8', 'McCafé Premium Roast Coffee', 'Freshly brewed 100% Arabica coffee with a rich aroma and smooth, balanced taste.', 63.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/McCafe-Premium-Roast-Coffee.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '9bec9a91-c365-4764-8995-0f705fd8eef8', 'McCafé Strawberry Smoothie', 'Sweet, fruity blended strawberry smoothie with real fruit flavors.', 149.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/McCafe-Strawberry-Smoothie.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '60337da8-4f8c-4fc4-834a-4d3a9047465a', 'McChicken Meal', 'Crispy chicken patty topped with mayonnaise and shredded lettuce on a toasted bun. Served with fries and drink.', 234.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo-burgers-price-06.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'f53513ef-1203-4338-81ec-f27f3e862819', 'McFlurry with Oreo', 'Creamy vanilla soft-serve blended with crunchy crumbled Oreo cookie pieces.', 70.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/drinks-mcdo-image-11-philippines.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '8440b510-d832-4cc2-a660-e69ab240fea8', 'McSpaghetti & Chicken McShare Bundle', 'Combo bundle featuring 6-pc Chicken McDo with McSpaghetti Platter for groups.', 765.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcspaghetti-platter-1.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '74154098-e87d-4645-a453-22bcc2d8e7d0', 'McSpaghetti Meal', 'Sweet Pinoy-style spaghetti noodles tossed with savory meat sauce, sliced hotdogs, and topped with shredded cheese.', 105.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/spagetti-meal-mcdonalds-04.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '74154098-e87d-4645-a453-22bcc2d8e7d0', 'McSpaghetti Platter', 'Generous sharing platter of iconic sweet McSpaghetti with cheesy sauce and hotdogs, great for group gatherings.', 262.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcspaghetti-platter-1.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '74154098-e87d-4645-a453-22bcc2d8e7d0', 'McSpaghetti with Fries Meal', 'Classic sweet-style McSpaghetti paired with world-famous golden fries and a refreshing beverage.', 168.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/spagetti-meal-mcdonalds-03.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'adc70935-b25c-4994-bb48-a7d1e3760b9b', 'Medium Fries', 'World-famous McDonald''s French Fries — crispy and golden on the outside, fluffy on the inside.', 92.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcfries-original.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '60337da8-4f8c-4fc4-834a-4d3a9047465a', 'Quarter Pounder with Cheese Meal', 'A quarter-pound of 100% fresh beef cooked right when you order, with two slices of melted cheese, slivered onions, and pickles on a sesame seed bun. Served with fries and drink.', 284.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo-burgers-price-11.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'adc70935-b25c-4994-bb48-a7d1e3760b9b', 'Shake Shake Fries BBQ', 'Golden fries tossed with smoky, tangy barbecue seasoning.', 101.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo-fries-15.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'adc70935-b25c-4994-bb48-a7d1e3760b9b', 'Shake Shake Fries Cheese', 'Golden fries shaken with savory, cheesy flavor powder for an addictive bite.', 101.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo-fries-14.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '9bec9a91-c365-4764-8995-0f705fd8eef8', 'Sprite Medium', 'Crisp, refreshing lemon-lime flavored carbonated soda.', 59.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/Sprite.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'f53513ef-1203-4338-81ec-f27f3e862819', 'Taro Custard Pie', 'Flaky fried pie stuffed with creamy taro and sweet velvety custard.', 51.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2026/07/mcdo-Taro-Custard-Pie-philippines.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '60337da8-4f8c-4fc4-834a-4d3a9047465a', 'The BCB Meal', 'Beef patty loaded with crispy bacon and cheese in a warm bun. Served with fries and drink.', 277.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo-burgers-price-03.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', '60337da8-4f8c-4fc4-834a-4d3a9047465a', 'Triple Cheeseburger Meal', 'Three 100% pure beef patties layered with three slices of melted American cheese, pickles, ketchup, and mustard. Served with fries and drink.', 290.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/mcdo-burgers-price-13.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'adc70935-b25c-4994-bb48-a7d1e3760b9b', 'Twister Fries Regular', 'Crispy, spiral-cut seasoned potato curls bursting with savory flavor.', 99.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/twister-fries-regular.webp', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444449', 'adc70935-b25c-4994-bb48-a7d1e3760b9b', 'Twister Fries Sharing', 'Large sharing portion of crunchy seasoned twister fries.', 199.00, 'https://mcdomenuprices.com.ph/wp-content/uploads/2025/08/twister-fries-sharing.webp', true, ARRAY[]::text[])
ON CONFLICT DO NOTHING;


-- Papsys BBQ Menu Categories
INSERT INTO menu_categories (id, restaurant_id, name, sort_order) VALUES
('cat-papsy-1', '44444444-4444-4444-a444-44444444445b', 'FROM THE GRILL', 1),
('cat-papsy-2', '44444444-4444-4444-a444-44444444445b', 'FROM THE FRYER', 2),
('cat-papsy-3', '44444444-4444-4444-a444-44444444445b', 'FROM THE KITCHEN', 3),
('cat-papsy-4', '44444444-4444-4444-a444-44444444445b', 'FROMT THE SIDE', 4),
('cat-papsy-5', '44444444-4444-4444-a444-44444444445b', 'From The Chiller & Dessert', 5)
ON CONFLICT DO NOTHING;

-- Papsys BBQ Menu Items
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, image_url, is_available, dietary_tags) VALUES
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Paa With 2 Rice', 'Served with rice', 200, 'https://images.deliveryhero.io/image/fd-ph/Products/38946730.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Pecho With 2 Rice', 'Served with rice', 220, 'https://images.deliveryhero.io/image/fd-ph/Products/38946731.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Pork Belly With 2 Rice', 'Served with rice', 224, 'https://images.deliveryhero.io/image/fd-ph/Products/38946734.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Pork BBQ With 2 Rice', '2 Pcs. Served with rice', 198, 'https://images.deliveryhero.io/image/fd-ph/Products/38946732.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Tanguige Steak', 'Served with rice', 306, 'https://images.deliveryhero.io/image/fd-ph/Products/38946735.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Half Bangus With 2 Rice', 'For reference: A half portion of bangus (milkfish) served with two cups of rice.', 182, 'https://images.deliveryhero.io/image/fd-ph/Products/39822657.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Grilled Bangus', 'Fresh and flavorful milkfish marinated in savory spices and grilled to perfection, topped with minced onions and tomatoes for a fresh and tangy finish—juicy meat and crispy skin for a satisfying Filipino favorite.', 296, 'https://images.deliveryhero.io/image/fd-ph/Products/38946726.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Scallops', 'For reference: Tender and juicy scallops.', 240, 'https://images.deliveryhero.io/image/fd-ph/Products/38946733.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Sweet N Sour Meatballs With 2 Rice', 'For reference: Sweet and sour meatballs served with two cups of rice.', 172, 'https://images.deliveryhero.io/image/fd-ph/Products/40145529.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', '3pc Fried Chicken', '3 Pcs. Served with rice', 265, 'https://images.deliveryhero.io/image/fd-ph/Products/38946729.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', '6pc. Fried Chicken', 'For reference: A serving of six crispy and juicy fried chicken pieces, seasoned and deep-fried to golden perfection.', 498, 'https://images.deliveryhero.io/image/fd-ph/Products/40145524.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', '9pc Fried Chicken Bucket', 'For reference: A generous bucket of nine pieces of crispy fried chicken, seasoned and cooked to a golden crisp.', 678, 'https://images.deliveryhero.io/image/fd-ph/Products/40145526.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Calamares', 'For reference: Savor the crispy and flavorful delight of this Calamares, featuring tender squid rings coated in a light and crispy batter.', 292, 'https://images.deliveryhero.io/image/fd-ph/Products/38946723.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Camaron Rebosado', 'For reference: Savor the crispy and succulent goodness of Camaron Rebosado.', 292, 'https://images.deliveryhero.io/image/fd-ph/Products/38946738.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'French Fries', 'For reference: Savor the crispy and golden goodness of this French Fries, freshly fried to perfection and seasoned.', 88, 'https://images.deliveryhero.io/image/fd-ph/Products/38946719.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Chicken Skin', 'For reference only: Experience the indulgent taste of the Chicken Skin, seasoned to perfection with a delightful blend of spices for a mouthwatering treat.', 142, 'https://images.deliveryhero.io/image/fd-ph/Products/38946718.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', '2pc Burger Steak', '2 Pcs. Served with rice', 176, 'https://images.deliveryhero.io/image/fd-ph/Products/38946725.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Adobo Chicken Liver & Gizzard', 'For reference: A savory Filipino dish made with chicken liver and gizzard, marinated in vinegar, soy sauce, and spices.', 210, 'https://images.deliveryhero.io/image/fd-ph/Products/40145578.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Pork Sisig', 'For reference: Indulge in the sizzling flavors of this Pork Sisig.', 298, 'https://images.deliveryhero.io/image/fd-ph/Products/38946727.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Squid Adobo', 'For reference: Squid cooked adobo-style.', 308, 'https://images.deliveryhero.io/image/fd-ph/Products/38946724.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Hamburger', 'For reference: Sink your teeth into the juicy goodness of a classic Hamburger.', 88, 'https://images.deliveryhero.io/image/fd-ph/Products/38946728.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Crispy Chicken Sandwich', 'For reference only: Sandwich made with crispy fried chicken fillet served in between two slices of bread or a bun, typically accompanied by lettuce, tomato, and mayonnaise.', 196, 'https://images.deliveryhero.io/image/fd-ph/Products/40145572.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Fish Kinilaw', 'For reference only: Fresh fish marinated in vinegar and spices.', 322, 'https://images.deliveryhero.io/image/fd-ph/Products/38946739.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Chopsuey', 'For reference: Dive into a colorful and flavorful medley of vegetables with our Chopsuey, featuring a delightful mix of stir-fried veggies, all tossed in a savory sauce for a wholesome and satisfying dish.', 290, 'https://images.deliveryhero.io/image/fd-ph/Products/38946736.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Macau Canton', 'For reference: A flavorful Macau-style Cantonese dish, combining tender meats and vegetables.', 260, 'https://images.deliveryhero.io/image/fd-ph/Products/38946740.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Pancit Guisado', 'For reference only: Delight in the rich flavors of this Pancit Guisado, where perfectly cooked noodles are matched with fresh ingredients!', 260, 'https://images.deliveryhero.io/image/fd-ph/Products/38946720.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Tinola Manok', 'For reference only: A comforting bowl of tinola manok, featuring tender chicken and vegetables in a flavorful broth.', 314, 'https://images.deliveryhero.io/image/fd-ph/Products/38946742.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Baboy', 'For reference: Savory pork dish, classic Filipino flavor.', 314, 'https://images.deliveryhero.io/image/fd-ph/Products/38946747.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Shrimp', 'For reference only: Succulent shrimp prepared in various ways.', 314, 'https://images.deliveryhero.io/image/fd-ph/Products/38946746.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Tanguige', 'For reference: A delicate and flavorful tanguige (mackerel) dish.', 338, 'https://images.deliveryhero.io/image/fd-ph/Products/38946745.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Bangus', 'For reference only: Enjoy the delectable flavors of the Bangus, marinated in a special blend of herbs and spices.', 314, 'https://images.deliveryhero.io/image/fd-ph/Products/38946748.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Rice 1 Cup', 'For reference: A serving of one cup of steamed rice, perfectly cooked and fluffy.', 42, 'https://images.deliveryhero.io/image/fd-ph/Products/40145589.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Rice 2 CUP', 'For reference: A serving of two cups of steamed rice, fluffy and light.', 68, 'https://images.deliveryhero.io/image/fd-ph/Products/38946722.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Chicken Oil', 'Chix oil', 7, 'https://images.deliveryhero.io/image/fd-ph/Products/102375438.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'HALO-HALO Overload', 'For reference: A refreshing, chilled dessert with crushed ice, sweet beans, and fruits for a delightful treat.', 198, 'https://images.deliveryhero.io/image/global-menu-service/FP_PH/vendor/l1mu/product/69933109/99e74348-aa16-4771-a34a-0918b36306b7.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Mango Float Overload with Fresh Mango', 'Mango Float Overload with Fresh Mango', 228, 'https://images.deliveryhero.io/image/global-menu-service/FP_PH/vendor/l1mu/PRODUCT/0a882f29-b493-48b5-b61d-d8a2265399a5.png', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Mango Float Overload', 'Mango Float Overload', 215, 'https://images.deliveryhero.io/image/global-menu-service/FP_PH/vendor/l1mu/PRODUCT/cb40a9fb-a223-40ec-ba94-737e2b9190c8.png', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Mango Float', 'For reference only: Experience tropical temptation in this sweet treat featuring juicy mangoes and rich cream!', 108, 'https://images.deliveryhero.io/image/fd-ph/Products/38946753.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Leche Flan', 'For reference: A classic Filipino dessert made with rich and creamy caramelized custard.', 102, 'https://images.deliveryhero.io/image/fd-ph/Products/38946756.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'CANNED SODA & JUICES FPANDA', 'For reference: A selection of canned sodas and juices.', 88, 'https://images.deliveryhero.io/image/fd-ph/Products/40144814.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Bottled Water', 'For reference only: Perfect for on-the-go or as a referencereshment with any meal.', 46, 'https://images.deliveryhero.io/image/fd-ph/Products/38946765.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Avocado Shake', 'Avocado Shake', 162, 'https://images.deliveryhero.io/image/global-menu-service/FP_PH/vendor/l1mu/PRODUCT/0879e691-3622-41bd-a48d-ccdfaeac7267.png', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Apple Carrot', 'For reference: Fresh apple and carrot juice.', 162, 'https://images.deliveryhero.io/image/fd-ph/Products/38946768.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Apple Cucumber', 'For reference: A refreshing drink with the flavors of apple and cucumber.', 162, 'https://images.deliveryhero.io/image/fd-ph/Products/38946769.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Lychee', 'For reference: Enjoy the refreshing taste of Lychee.', 162, 'https://images.deliveryhero.io/image/fd-ph/Products/38946773.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Mango', 'For reference: Delight in the sweet and juicy flavors of this Mango, offering a tropical taste!', 162, 'https://images.deliveryhero.io/image/fd-ph/Products/38946774.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Mango Green', 'For reference: A refreshing mango green tea, blending the sweetness of ripe mango.', 162, 'https://images.deliveryhero.io/image/fd-ph/Products/38946775.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-44444444445b', 'b4f34382-5f86-45ee-ada3-61959dc94323', 'Strawberry', 'For reference only: It offers a sweet and tangy taste that adds a burst of fruity flavor that is sure to delight.', 162, 'https://images.deliveryhero.io/image/fd-ph/Products/38946778.jpg', true, ARRAY[]::text[])
ON CONFLICT DO NOTHING;

-- Parola Seaview Restaurant Menu Categories
INSERT INTO menu_categories (id, restaurant_id, name, sort_order) VALUES
('532987c3-038d-4083-896d-5e3e68c87f7d', '44444444-4444-4444-a444-444444444459', 'Parola Seafood & House Specialties', 1),
('b45449f6-a5d0-46a7-82f2-b7c71b57ca62', '44444444-4444-4444-a444-444444444459', 'Pork, Beef & Meat Specialties', 2),
('dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5', '44444444-4444-4444-a444-444444444459', 'Soups, Noodles & Native Dishes', 3),
('d66da36b-dd99-4c24-afea-0edb0d53d352', '44444444-4444-4444-a444-444444444459', 'Parola Seafood Bilao & Group Sets', 4),
('7475bafb-7505-4d38-97e4-d9c34056aa41', '44444444-4444-4444-a444-444444444459', 'Rice & Side Extras', 5),
('d984b38a-b6e5-4ce2-bf7b-cda91a5f1d7e', '44444444-4444-4444-a444-444444444459', 'Desserts, Shakes & Drinks', 6)
ON CONFLICT DO NOTHING;

-- Parola Seaview Restaurant Menu Items
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, image_url, is_available, dietary_tags) VALUES
('44444444-4444-4444-a444-444444444459', '532987c3-038d-4083-896d-5e3e68c87f7d', 'Baked Scallops with Cheese & Garlic', 'Fresh local Bantayan scallops baked to golden perfection with melted butter, rich garlic, and cheddar cheese.', 295.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU2SeIGTvOEIiD7TNoKqF_7o0tvYvvr98NZbYL50OJUA&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', '532987c3-038d-4083-896d-5e3e68c87f7d', 'Crispy Calamares', 'Tender squid rings lightly battered and deep-fried to a crisp crunch, served with homemade tartar dipping sauce.', 285.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReaLRSnvc46AJDHyMj97jDsg11bLV5jFsJWM8UV5FPGA&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', '532987c3-038d-4083-896d-5e3e68c87f7d', 'Garlic Butter Shrimp', 'Plump succulent prawns tossed in savory golden garlic butter sauce and fresh island spring onions.', 360.00, 'https://www.thepeachkitchen.com/wp-content/uploads/2023/12/Garlic-Butter-Shrimp-with-Ketchup2.png', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', '532987c3-038d-4083-896d-5e3e68c87f7d', 'Grilled Tuna Panga (Seaside Grill)', 'Charcoal-grilled premium tuna jaw glazed in sweet-savory calamansi soy marinade and chili garlic.', 395.00, 'https://www.thepeachkitchen.com/wp-content/uploads/2016/09/Grilled-Tuna-Panga.png', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', '532987c3-038d-4083-896d-5e3e68c87f7d', 'Tuna Pomelo Kinilaw', 'Fresh raw yellowfin tuna cubes ceviche cured in native coconut vinegar, ginger, chili, and sweet Davao pomelo pulp.', 275.00, 'https://kusinasecrets.com/wp-content/uploads/2025/04/u3317447599_Homemade_Filipino_Tuna_Kinilaw_in_a_white_ceramic_8957013c-ba69-4769-9a57-4b16995438df_2-500x500.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', '532987c3-038d-4083-896d-5e3e68c87f7d', 'Grilled Stuffed Squid (Inihaw na Pusit)', 'Whole ocean squid stuffed with diced tomatoes, onions, and native herbs, grilled over open charcoal embers.', 330.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg2emjnvjFE_dRW9Q0SrRjJP6er1ZTRa91_fUHlv5lOJfziQFiPHt4DyA&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', '532987c3-038d-4083-896d-5e3e68c87f7d', 'Sweet & Sour Lapu-Lapu', 'Crispy fried local grouper fillet smothered in vibrant sweet and sour bell pepper sauce with pineapple chunks.', 420.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFAwlbmBbi6Slexl19wcrg8DH6XvIGE2f4kvVfpvhmqM0_X1ftM0IB8aY&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', '532987c3-038d-4083-896d-5e3e68c87f7d', 'Sizzling Gambas al Ajillo', 'Spanish-Filipino style spicy sautéed shrimp bubbling on a cast-iron skillet with olive oil, lots of toasted garlic, and chili peppers.', 320.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKDiLne_EaFS9DH_udyhsgNJlB2u4jQ-9U-TLRlV3rSA&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'b45449f6-a5d0-46a7-82f2-b7c71b57ca62', 'Parola Signature Crispy Pata', 'Deep-fried pork knuckle with blistered crackling skin and juicy tender meat, served with spiced soy vinegar dip.', 695.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWb4Hhn5AXUwTBjVKFCobvoPbKe_p6RD41dsZHLUSUyA&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'b45449f6-a5d0-46a7-82f2-b7c71b57ca62', 'Sizzling Pork Sisig with Egg', 'Minced pork cheeks and crispy mask seasoned with calamansi, onions, and chili peppers, topped with a fresh farm egg.', 265.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9xn7LNABu1ygwBh0BGh1pfNSOqeXOYWg9R8LRMgQ6zQ&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'b45449f6-a5d0-46a7-82f2-b7c71b57ca62', 'Signature Tinapa Sisig', 'Parola specialty smoked fish flakes sautéed with aromatics, mayonnaise, and chili on a sizzling plate.', 245.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFTq1nFAdDhUwI5x4S80vbceMXo3M16tZr9G_nwvEmnw&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'b45449f6-a5d0-46a7-82f2-b7c71b57ca62', 'Beef Kare-Kare with Bagoong Alamang', 'Tender beef shank and tripe stewed in thick savory peanut sauce with string beans, eggplant, pechay, and shrimp paste.', 450.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5nnhGQ2QW8hYwsMqKKjxrO8xNA6OqC5lC3BtvVwylSw&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'b45449f6-a5d0-46a7-82f2-b7c71b57ca62', 'Lechon Kawali', 'Golden crunchy pork belly slabs fried to crisp perfection, accompanied by homemade liver gravy and spiced vinegar.', 330.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0B6fkOlijN29x4DYrvsedu6knlm8PKkqd3XT4NrpJ9Q&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'b45449f6-a5d0-46a7-82f2-b7c71b57ca62', 'Crispy Buttered Fried Chicken (Whole)', 'Deep-fried whole marinated chicken coated in aromatic melted garlic butter and golden seasonings.', 380.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Xg0gDlZ7xBtAPhXaHZKBWjD3vkKK1Y6Z_qBJtVqmQw&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'b45449f6-a5d0-46a7-82f2-b7c71b57ca62', 'Pork BBQ Skewers (4 Sticks)', 'Tender skewered pork shoulder glazed in sweet Filipino banana ketchup and calamansi barbecue basting.', 195.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq-oWjQVFJoPIwFsyCFFWkD-e1KPU-7bbem-fwwwxSVQ&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5', 'Sinigang na Isda sa Bayabas & Sampalok', 'Fresh island fish simmered in tangy tamarind and guava broth with kangkong, radish, tomatoes, and long green chili.', 345.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXGSagoTqcbxLBelDoDOjIx4BZlvLjZ-rivTYhxJmrmpz2HpCywWdLeKo&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5', 'Nilarang na Tanguige / Bakasi', 'Authentic Cordova-style sour fish stew prepared with fermented black beans (tausi), ginger, tomatoes, and lemongrass.', 320.00, 'https://pbs.twimg.com/media/EhYyrC2XsAAwRAl.jpg', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5', 'Sinigang na Baboy', 'Tender pork ribs simmered in sour tamarind broth loaded with garden kangkong, taro root, eggplant, and string beans.', 340.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYo5JcyksRbq4HGY8_KLL1PTvs_yS0DUym6a5CPN7fWlsh9yw_kGest6U&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5', 'Special Bulalo Soup with Bone Marrow', 'Slow-boiled beef shank soup with rich melted bone marrow, sweet corn on the cob, pechay, and whole peppercorns.', 430.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi0CBbkVlHJ124l82AVoB4b2qdYbJ_-Yyi28hM--zI6g&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5', 'Native Tinolang Manok', 'Free-range native chicken soup infused with fresh ginger broth, green papaya slices, dahon ng sili, and lemongrass.', 310.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu8-32NmLQG5KS6zz-5TwSsSX-QFdNlG5rRqc4t7MpTQ&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5', 'Seafood Bam-i (Cebuano Pancit)', 'Stir-fried medley of egg noodles (canton) and glass vermicelli (sotanghon) with shrimp, squid, pork strips, and vegetables.', 250.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLsJYobXBAI8p9kc1NAy-IRnSA7rS65Bi174tPWEhTbg&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5', 'Special Pancit Canton Guisado', 'Savory stir-fried flour noodles topped with shrimp, chicken liver, tender pork, snow peas, carrots, and cabbage.', 240.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_Q2YSY1IUYdvIKtez-RDpLL_DK_IwBMKeOrl5YtOeA&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'dcf35cc2-21bc-49f0-a4dc-b0b75a4ac0c5', 'Chopsuey Guisado with Seafood', 'Crisp garden vegetables including broccoli, cauliflower, carrots, young corn, and bell peppers sautéed with fresh shrimp and squid.', 230.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgZjroHA2g6Y5qnqzj-yUjPyAohQ7t81va7fG3ZFNAJeKXsYrF-UK6b4k&s=10', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'd66da36b-dd99-4c24-afea-0edb0d53d352', 'Parola Grand Seafood Bilao (Good for 4-6)', 'Signature seaside feast platter with Baked Scallops, Grilled Squid, Garlic Butter Shrimp, Crispy Calamares, Tuna Kinilaw, and Garlic Rice.', 1350.00, 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'd66da36b-dd99-4c24-afea-0edb0d53d352', 'Barkada Sunset Fiesta Set (Good for 4-5)', 'Crispy Pata, Pork Sisig, Buttered Chicken, Sinigang na Isda, Garlic Rice Platter, and 1 Pitcher of House Iced Tea.', 1650.00, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'd66da36b-dd99-4c24-afea-0edb0d53d352', 'Family Seaview Boodle Platter (Good for 6-8)', 'Boodle fight banquet on banana leaves with Inihaw na Pusit, Grilled Tuna Belly, Pork BBQ skewers, Lechon Kawali, Salted Eggs, Ensaladang Talong, and Unlimited Garlic Rice.', 2150.00, 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', '7475bafb-7505-4d38-97e4-d9c34056aa41', 'Garlic Butter Rice Platter (Big Bowl)', 'Fragrant jasmine rice stir-fried with lots of golden toasted garlic crisps and creamy butter.', 160.00, 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', '7475bafb-7505-4d38-97e4-d9c34056aa41', 'Seafood Fried Rice Platter', 'Wok-tossed fried rice with chopped shrimp, squid bits, scrambled egg, and green peas.', 240.00, 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', '7475bafb-7505-4d38-97e4-d9c34056aa41', 'Steamed White Jasmine Rice Platter', 'Platter of steaming fluffy white jasmine rice, good for 4-5 persons.', 120.00, 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', '7475bafb-7505-4d38-97e4-d9c34056aa41', 'Ensaladang Talong with Salted Egg & Tomatoes', 'Charred grilled eggplant with diced fresh tomatoes, red onions, and cured salted duck eggs in calamansi vinaigrette.', 150.00, 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'd984b38a-b6e5-4ce2-bf7b-cda91a5f1d7e', 'Parola Halo-Halo Supreme with Ice Cream', 'Classic crushed ice dessert loaded with ube halaya, sweetened bananas, nata de coco, leche flan, pinipig, and a scoop of creamy ube ice cream.', 145.00, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'd984b38a-b6e5-4ce2-bf7b-cda91a5f1d7e', 'Fresh Ripe Mango Shake', 'Refreshing blended shake made with sweet ripe Cebu mangoes and chilled milk.', 125.00, 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'd984b38a-b6e5-4ce2-bf7b-cda91a5f1d7e', 'Fresh Young Coconut (Buko)', 'Fresh whole young coconut served chilled with natural sweet coconut water and soft meat.', 95.00, 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=600&q=80', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'd984b38a-b6e5-4ce2-bf7b-cda91a5f1d7e', 'Buko Pandan Shake', 'Creamy blended young coconut shake flavored with fragrant pandan leaves and jelly pearls.', 120.00, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'd984b38a-b6e5-4ce2-bf7b-cda91a5f1d7e', 'Traditional Creamy Leche Flan', 'Rich and silky steamed caramel egg custard made with pure egg yolks and condensed milk.', 95.00, 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'd984b38a-b6e5-4ce2-bf7b-cda91a5f1d7e', 'House Iced Tea Pitcher (1.5L)', 'Freshly brewed sweet calamansi iced tea served ice-cold in a family sharing pitcher.', 160.00, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80', true, ARRAY[]::text[]),
('44444444-4444-4444-a444-444444444459', 'd984b38a-b6e5-4ce2-bf7b-cda91a5f1d7e', 'San Miguel Pale Pilsen / Light (330ml)', 'Chilled iconic Filipino beer bottle, perfect companion for sunset seaside seafood dining.', 85.00, 'https://images.unsplash.com/photo-1608270119335-59427b03b174?auto=format&fit=crop&w=600&q=80', true, ARRAY[]::text[])
ON CONFLICT DO NOTHING;
