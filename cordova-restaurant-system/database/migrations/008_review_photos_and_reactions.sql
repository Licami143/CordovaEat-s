-- Migration 008: Review Photos and Emoji Reactions
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS photos TEXT[] DEFAULT '{}'::text[];
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS reactions JSONB DEFAULT '{}'::jsonb;
