const fs = require('fs');
const path = require('path');
const { query } = require('../config/db');

const sql = `-- Migration 008: Review Photos and Emoji Reactions
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS photos TEXT[] DEFAULT '{}'::text[];
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS reactions JSONB DEFAULT '{}'::jsonb;
`;

fs.writeFileSync(path.resolve(__dirname, '../../../database/migrations/008_review_photos_and_reactions.sql'), sql, 'utf8');

async function run() {
  try {
    await query("ALTER TABLE reviews ADD COLUMN IF NOT EXISTS photos TEXT[] DEFAULT '{}'::text[];");
    await query("ALTER TABLE reviews ADD COLUMN IF NOT EXISTS reactions JSONB DEFAULT '{}'::jsonb;");
    console.log('Migration 008 executed successfully on database!');
  } catch (err) {
    console.log('DB Note:', err.message);
  }
  process.exit(0);
}
run();
