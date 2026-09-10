const { query, withTransaction } = require('../config/db');

async function listForRestaurant(restaurantId) {
  const { rows } = await query(
    `SELECT * FROM operating_hours WHERE restaurant_id = $1 ORDER BY day_of_week`,
    [restaurantId]
  );
  return rows;
}

/**
 * Replaces the full week's schedule in one transaction — simplest mental
 * model for the owner-facing "Operating hours configuration" screen
 * (a 7-row form submitted as a whole).
 */
async function replaceWeek(restaurantId, days) {
  return withTransaction(async (client) => {
    await client.query(`DELETE FROM operating_hours WHERE restaurant_id = $1`, [restaurantId]);
    for (let i = 0; i < days.length; i++) {
      const d = days[i];
      const dayOfWeek = d.day_of_week !== undefined ? Number(d.day_of_week) : (d.dayOfWeek !== undefined ? Number(d.dayOfWeek) : i);
      const openTime = d.open_time || d.openTime || '09:00';
      const closeTime = d.close_time || d.closeTime || '21:00';
      const isClosed = Boolean(d.is_closed !== undefined ? d.is_closed : d.isClosed);

      await client.query(
        `INSERT INTO operating_hours (restaurant_id, day_of_week, open_time, close_time, is_closed)
         VALUES ($1,$2,$3,$4,$5)`,
        [restaurantId, dayOfWeek, openTime, closeTime, isClosed]
      );
    }
    const { rows } = await client.query(
      `SELECT * FROM operating_hours WHERE restaurant_id = $1 ORDER BY day_of_week`,
      [restaurantId]
    );
    return rows;
  });
}

/**
 * Is the restaurant open right now (or at a given JS Date)? Used by the
 * recommendation engine's "availability" scoring factor.
 */
async function isOpenAt(restaurantId, date = new Date()) {
  const dayOfWeek = date.getDay();
  const timeStr = date.toTimeString().slice(0, 8); // HH:MM:SS
  const { rows } = await query(
    `SELECT * FROM operating_hours
     WHERE restaurant_id = $1 AND day_of_week = $2 AND is_closed = FALSE
       AND $3::time BETWEEN open_time AND close_time`,
    [restaurantId, dayOfWeek, timeStr]
  );
  return rows.length > 0;
}

module.exports = { listForRestaurant, replaceWeek, isOpenAt };
