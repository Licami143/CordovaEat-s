-- ============================================================================
-- Migration 006: Subscription Tiers, Availability, User Preferences & Orders
-- ============================================================================

-- 1. Create subscription_tier ENUM if it doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscription_tier') THEN
    CREATE TYPE subscription_tier AS ENUM ('none', 'basic', 'premium', 'featured');
  END IF;
END$$;

-- 2. Add subscription and availability fields to restaurants
ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS subscription_tier subscription_tier NOT NULL DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS subscription_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS is_open BOOLEAN NOT NULL DEFAULT TRUE;

CREATE INDEX IF NOT EXISTS idx_restaurants_subscription_tier ON restaurants(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_restaurants_is_open ON restaurants(is_open);

-- 3. Ensure users table has preferences JSONB column
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS preferences JSONB;

-- 4. Add orders table for ordering platform and past-behavior scoring
CREATE TABLE IF NOT EXISTS orders (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id  UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  items          JSONB NOT NULL DEFAULT '[]',
  total_amount   NUMERIC(10,2) NOT NULL DEFAULT 0.00 CHECK (total_amount >= 0),
  status         VARCHAR(50) NOT NULL DEFAULT 'pending',
  delivery_address TEXT,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_restaurant ON orders(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- 5. Text search indexes for fast keyword matching on restaurants and menu items
CREATE INDEX IF NOT EXISTS idx_menu_items_name_trgm ON menu_items USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_menu_items_description_trgm ON menu_items USING gin (description gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_restaurants_desc_trgm ON restaurants USING gin (description gin_trgm_ops);
