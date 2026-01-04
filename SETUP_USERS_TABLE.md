# How to Create Users Table in Supabase

## Step 1: Open Supabase SQL Editor

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click on **SQL Editor** in the left sidebar

## Step 2: Run the Users Table SQL

Copy and paste the following SQL into the SQL Editor and click **Run**:

```sql
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

-- Create policy for service role operations
-- Note: Service role key bypasses RLS, but this policy allows API access
DROP POLICY IF EXISTS "Allow service role operations" ON users;
CREATE POLICY "Allow service role operations" ON users FOR ALL USING (true) WITH CHECK (true);
```

## Step 3: Verify the Table Was Created

### Option A: Using Supabase Dashboard
1. In Supabase Dashboard, go to **Table Editor** in the left sidebar
2. You should see a `users` table listed
3. Click on it to see the columns:
   - `userid` (Primary Key)
   - `username`
   - `email` (Unique)
   - `password`
   - `last_login`
   - `created_at`
   - `updated_at`

### Option B: Using SQL Query
Run this query in SQL Editor to verify:

```sql
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'users'
ORDER BY ordinal_position;
```

You should see all 7 columns listed.

### Option C: Check Table Exists
Run this simple query:

```sql
SELECT COUNT(*) FROM users;
```

This should return `0` (no error means table exists).

## Step 4: Verify Environment Variables

Make sure you have these in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

You can find these in Supabase Dashboard → Settings → API

## Troubleshooting

If you get an error:
- **"relation users does not exist"** → Table wasn't created, run the SQL again
- **"permission denied"** → Make sure you're using the SQL Editor (not restricted by RLS)
- **"duplicate key value"** → Table already exists, that's okay!

