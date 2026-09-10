const { pool } = require('../config/db');

async function run() {
  const countRes = await pool.query(`
    SELECT 
      COUNT(*) FILTER (WHERE role = 'customer') AS customers,
      COUNT(*) FILTER (WHERE role = 'owner') AS owners,
      COUNT(*) FILTER (WHERE role = 'admin') AS admins,
      COUNT(*) AS total_users
    FROM users
  `);
  console.log('User Counts in DB:', countRes.rows[0]);

  const restCountRes = await pool.query(`
    SELECT 
      COUNT(*) FILTER (WHERE status = 'verified') AS verified,
      COUNT(*) FILTER (WHERE status = 'pending') AS pending,
      COUNT(*) AS total
    FROM restaurants
  `);
  console.log('Restaurant Counts in DB:', restCountRes.rows[0]);

  await pool.end();
}

run().catch(err => {
  console.error(err);
  pool.end();
});
