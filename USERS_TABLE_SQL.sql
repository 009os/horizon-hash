-- ============================================
-- USERS TABLE SETUP FOR AUTHENTICATION
-- ============================================
-- Copy and paste this entire file into Supabase SQL Editor
-- Then click "Run" to create the table
-- ============================================

-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  userid TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Allow service role operations" ON users;

-- Create policy for service role operations
-- Note: Service role key bypasses RLS, but this policy allows API access
CREATE POLICY "Allow service role operations" ON users FOR ALL USING (true) WITH CHECK (true);

-- Verify table was created (optional - you can run this separately)
-- SELECT COUNT(*) FROM users;

