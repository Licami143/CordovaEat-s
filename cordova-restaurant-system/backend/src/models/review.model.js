const { query } = require('../config/db');

async function listForRestaurant(restaurantId, { limit = 10, offset = 0, includeModerated = false, userId = null }) {
  const statusFilter = includeModerated ? '' : `AND rv.status = 'visible'`;
  const { rows } = await query(
    `SELECT rv.*, u.full_name AS reviewer_name, u.avatar_url AS reviewer_avatar,
       COALESCE((SELECT COUNT(*) FROM review_likes rl WHERE rl.review_id = rv.id), 0) AS like_count,
       EXISTS(SELECT 1 FROM review_likes rl WHERE rl.review_id = rv.id AND rl.user_id = $4) AS liked_by_me
     FROM reviews rv
     JOIN users u ON u.id = rv.user_id
     WHERE rv.restaurant_id = $1 ${statusFilter}
     ORDER BY rv.created_at DESC
     LIMIT $2 OFFSET $3`,
    [restaurantId, limit, offset, userId]
  );
  const { rows: countRows } = await query(
    `SELECT COUNT(*) FROM reviews rv WHERE rv.restaurant_id = $1 ${statusFilter}`,
    [restaurantId]
  );
  return { rows, totalCount: parseInt(countRows[0].count, 10) };
}

/** Toggles a "helpful" like on a review for the given user. Returns the new liked state. */
async function toggleLike(reviewId, userId) {
  const { rows: existing } = await query(
    `SELECT 1 FROM review_likes WHERE review_id = $1 AND user_id = $2`,
    [reviewId, userId]
  );
  if (existing.length > 0) {
    await query(`DELETE FROM review_likes WHERE review_id = $1 AND user_id = $2`, [reviewId, userId]);
    return false;
  }
  await query(`INSERT INTO review_likes (review_id, user_id) VALUES ($1, $2)`, [reviewId, userId]);
  return true;
}

async function findById(id) {
  const { rows } = await query(`SELECT * FROM reviews WHERE id = $1`, [id]);
  return rows[0] || null;
}

async function findByUserAndRestaurant(userId, restaurantId) {
  const { rows } = await query(
    `SELECT * FROM reviews WHERE user_id = $1 AND restaurant_id = $2`,
    [userId, restaurantId]
  );
  return rows[0] || null;
}

async function create({ restaurantId, userId, rating, comment, photos = [], reactions = {} }) {
  const { rows } = await query(
    `INSERT INTO reviews (restaurant_id, user_id, rating, comment, photos, reactions)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [restaurantId, userId, rating, comment || null, photos, reactions]
  );
  return rows[0];
}

async function update(id, userId, { rating, comment, photos }) {
  const { rows } = await query(
    `UPDATE reviews SET rating = COALESCE($3, rating), comment = COALESCE($4, comment), photos = COALESCE($5, photos)
     WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, userId, rating, comment, photos]
  );
  return rows[0] || null;
}

async function react(reviewId, emoji) {
  const safeEmoji = String(emoji || '❤️').slice(0, 10);
  const { rows } = await query(
    `UPDATE reviews
     SET reactions = jsonb_set(
       COALESCE(reactions, '{}'::jsonb),
       ARRAY[$2],
       to_jsonb(COALESCE((reactions->>$2)::int, 0) + 1),
       true
     )
     WHERE id = $1
     RETURNING reactions`,
    [reviewId, safeEmoji]
  );
  return rows[0]?.reactions || {};
}

async function remove(id, userId) {
  await query(`DELETE FROM reviews WHERE id = $1 AND user_id = $2`, [id, userId]);
}

async function ownerReply(id, restaurantOwnerId, replyText) {
  const { rows } = await query(
    `UPDATE reviews rv SET owner_reply = $3, owner_reply_at = now()
     FROM restaurants r
     WHERE rv.id = $1 AND rv.restaurant_id = r.id AND r.owner_id = $2
     RETURNING rv.*`,
    [id, restaurantOwnerId, replyText]
  );
  return rows[0] || null;
}

/** Admin moderation: flag, remove, or restore a review. */
async function moderate(id, { status, flaggedReason, moderatorId }) {
  const { rows } = await query(
    `UPDATE reviews SET status = $2, flagged_reason = $3, moderated_by = $4
     WHERE id = $1 RETURNING *`,
    [id, status, flaggedReason || null, moderatorId]
  );
  return rows[0] || null;
}

async function listFlagged({ limit, offset }) {
  return listAdminReviews({ status: 'flagged', limit, offset });
}

async function listAdminReviews({ status = 'flagged', limit = 50, offset = 0 } = {}) {
  const params = [];
  let idx = 1;
  const conditions = [];

  if (status && status !== 'all') {
    conditions.push(`rv.status = $${idx++}`);
    params.push(status);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const { rows } = await query(
    `SELECT rv.*, u.full_name AS reviewer_name, u.avatar_url AS reviewer_avatar, r.name AS restaurant_name, r.slug AS restaurant_slug
     FROM reviews rv
     JOIN users u ON u.id = rv.user_id
     JOIN restaurants r ON r.id = rv.restaurant_id
     ${where}
     ORDER BY rv.created_at DESC
     LIMIT $${idx++} OFFSET $${idx++}`,
    [...params, limit, offset]
  );
  const { rows: countRows } = await query(`SELECT COUNT(*) FROM reviews rv ${where}`, params.slice(0, conditions.length));
  return { rows, totalCount: parseInt(countRows[0]?.count || '0', 10) };
}

module.exports = {
  listForRestaurant, findById, findByUserAndRestaurant,
  create, update, remove, ownerReply, moderate, listFlagged, listAdminReviews, toggleLike, react,
};
