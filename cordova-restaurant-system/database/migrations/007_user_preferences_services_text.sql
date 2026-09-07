-- ============================================================================
-- Migration 007: Allow Flexible Atmosphere & Service Preferences (TEXT[])
-- ============================================================================
-- Changes user_preferences.preferred_services from service_type[] enum
-- to TEXT[] so users can save atmosphere, amenities, and service types
-- (e.g., 'Outdoor / Al Fresco', 'Seaside / Sunset View', 'Dine-In', etc.)
-- without enum constraint violations.
-- ============================================================================

ALTER TABLE user_preferences 
  ALTER COLUMN preferred_services TYPE TEXT[] 
  USING preferred_services::TEXT[];
