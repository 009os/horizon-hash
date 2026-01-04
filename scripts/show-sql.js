/**
 * Shows the SQL to create users table - copy and paste into Supabase SQL Editor
 * Run with: node scripts/show-sql.js
 */

const sql = `
-- ============================================
-- Copy everything below and paste into Supabase SQL Editor
-- Go to: https://supabase.com/dashboard → Your Project → SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS users (
  userid TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow service role operations" ON users;
CREATE POLICY "Allow service role operations" ON users FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- After running, verify by going to Table Editor
-- You should see the 'users' table listed
-- ============================================
`;

console.log(sql);

