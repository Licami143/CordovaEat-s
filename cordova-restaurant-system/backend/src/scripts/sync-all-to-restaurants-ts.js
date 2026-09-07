require('dotenv').config();
const { pool } = require('../config/db');
const { syncToRestaurantTs, inferCategory, getDefaultCoverImage } = require('../services/restaurantSync.service');

const HD_MAP = {
  'horizon-bean-cafe': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&auto=format&fit=crop&q=85',
  'grillhouse-cordova-bbq': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1000&auto=format&fit=crop&q=85',
  'street-food-park': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&auto=format&fit=crop&q=85',
  'aby-road-resto-bar': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1000&auto=format&fit=crop&q=85',
  'eat-n-repeat': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&auto=format&fit=crop&q=85',
  'taytayan-pinoy-restaurant': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1000&auto=format&fit=crop&q=85',
  'stuffed-n-fried-cordova': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1000&auto=format&fit=crop&q=85',
  'mcdonalds-cordova': 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1000&auto=format&fit=crop&q=85',
  'barracks-grill-and-resto-bar': 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1000&auto=format&fit=crop&q=85',
  'bric-food-park': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=85',
  'rca-bilao-food-station': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1000&auto=format&fit=crop&q=85',
  'mavericks-by-the-baker-street': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&auto=format&fit=crop&q=85',
  'entoys-bakasihan': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=1000&auto=format&fit=crop&q=85',
  'tita-kims': 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=1000&auto=format&fit=crop&q=85',
  'burandat-seafood-bucket': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=1000&auto=format&fit=crop&q=85',
  'csalt-cafe-cordova': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&auto=format&fit=crop&q=85',
  'cafe-mafia': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=1000&auto=format&fit=crop&q=85',
  'solea-mactan-resort': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=85',
  'husbys-grill': 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1000&auto=format&fit=crop&q=85',
  'sungka-native-restaurant': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=85',
  'lantaw-floating-native-restaurant': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=85',
  'albertos-pizza-cordova': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&auto=format&fit=crop&q=85',
  'cascaja-cafe': 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1000&auto=format&fit=crop&q=85',
  'don-macchiatos-cordova': 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=1000&auto=format&fit=crop&q=85',
  'parola-seaview-restaurant': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=85',
  '10000-roses-cafe-and-more': 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1000&auto=format&fit=crop&q=85',
  'papsys-bbq': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=85',
};

async function syncAll() {
  console.log('🔄 Cleaning up database and synchronizing HD restaurant photos...');
  try {
    // Standardize slug for Papsy's BBQ
    await pool.query("UPDATE restaurants SET slug = 'papsys-bbq' WHERE name ILIKE '%papsy%'");

    const { rows } = await pool.query(`
      SELECT 
        r.*,
        COALESCE(
          (SELECT array_agg(c.name) FROM restaurant_cuisines rc
            JOIN cuisines c ON c.id = rc.cuisine_id WHERE rc.restaurant_id = r.id),
          '{}'
        ) AS cuisines
      FROM restaurants r
      WHERE r.status = 'verified'
      ORDER BY r.name ASC
    `);

    let count = 0;
    for (const r of rows) {
      let cover = r.cover_image_url;
      const slugKey = (r.slug || '').toLowerCase();
      if (HD_MAP[slugKey]) {
        cover = HD_MAP[slugKey];
        await pool.query('UPDATE restaurants SET cover_image_url = $1 WHERE id = $2', [cover, r.id]);
        r.cover_image_url = cover;
      } else if (!cover || cover.trim() === '' || cover.includes('encrypted-tbn0.gstatic.com')) {
        const cat = inferCategory(r.name, r.description, r.cuisines);
        cover = getDefaultCoverImage(r.name, r.description, cat);
        await pool.query('UPDATE restaurants SET cover_image_url = $1 WHERE id = $2', [cover, r.id]);
        r.cover_image_url = cover;
      }
      const ok = syncToRestaurantTs(r);
      if (ok) count++;
    }

    console.log(`✅ Successfully checked and synchronized ${count} restaurant(s) in restaurants.ts with HD images!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Sync failed:', err);
    process.exit(1);
  }
}

syncAll();
