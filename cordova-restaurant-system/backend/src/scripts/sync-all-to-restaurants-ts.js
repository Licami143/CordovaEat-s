require('dotenv').config();
const { pool } = require('../config/db');
const { syncToRestaurantTs } = require('../services/restaurantSync.service');

async function syncAll() {
  console.log('🔄 Syncing all database restaurants into frontend/src/data/restaurants.ts...');
  try {
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
      const ok = syncToRestaurantTs(r);
      if (ok) count++;
    }

    console.log(`✅ Successfully synchronized ${count} restaurant(s) to restaurants.ts!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Sync failed:', err);
    process.exit(1);
  }
}

syncAll();
