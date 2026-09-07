require('dotenv').config();
const { pool } = require('../config/db');
const { syncToRestaurantTs, inferCategory, getDefaultCoverImage } = require('../services/restaurantSync.service');

async function syncAll() {
  console.log('🔄 Cleaning up database and synchronizing restaurants.ts...');
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
      if (!cover || cover.trim() === '') {
        const cat = inferCategory(r.name, r.description, r.cuisines);
        cover = getDefaultCoverImage(r.name, r.description, cat);
        await pool.query('UPDATE restaurants SET cover_image_url = $1 WHERE id = $2', [cover, r.id]);
        r.cover_image_url = cover;
      }
      const ok = syncToRestaurantTs(r);
      if (ok) count++;
    }

    console.log(`✅ Successfully checked and synchronized ${count} restaurant(s) in restaurants.ts!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Sync failed:', err);
    process.exit(1);
  }
}

syncAll();
