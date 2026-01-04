# Quick Setup - Create Users Table

## Option 1: Automatic (Recommended if you have DATABASE_URL)

1. Get your database connection string from Supabase:
   - Go to: **Supabase Dashboard → Settings → Database**
   - Scroll to **Connection string** section
   - Copy the **URI** (it looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)

2. Add it to `.env.local`:
   ```env
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

3. Run the script:
   ```bash
   node scripts/create-users-table.js
   ```

## Option 2: Manual (Takes 2 minutes)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **SQL Editor** in left sidebar
4. Copy and paste this SQL:

```sql
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
```

5. Click **Run** (or press Cmd/Ctrl + Enter)

6. Verify: Go to **Table Editor** → You should see `users` table

## Verify It Worked

Run this to check:
```bash
node scripts/verify-users-table.js
```

Or try signing up on your website - it should work now!

