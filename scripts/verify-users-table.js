/**
 * Script to verify the users table exists in Supabase
 * Run with: node scripts/verify-users-table.js
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables!');
  console.error('Please ensure .env.local has:');
  console.error('  - NEXT_PUBLIC_SUPABASE_URL');
  console.error('  - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function verifyTable() {
  console.log('🔍 Checking if users table exists...\n');

  try {
    // Try to query the table
    const { data, error } = await supabase
      .from('users')
      .select('userid')
      .limit(1);

    if (error) {
      if (error.message.includes('relation') || error.message.includes('does not exist')) {
        console.error('❌ Users table does NOT exist!');
        console.error('\n📝 To create it, run this SQL in Supabase SQL Editor:');
        console.log(`
CREATE TABLE users (
  userid TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow service role operations" ON users FOR ALL USING (true) WITH CHECK (true);
        `);
        process.exit(1);
      } else {
        console.error('❌ Error checking table:', error.message);
        process.exit(1);
      }
    } else {
      console.log('✅ Users table exists!');
      console.log(`   Current user count: ${data ? data.length : 0}`);
      
      console.log('\n📊 Expected table structure:');
      console.log('   - userid (TEXT, PRIMARY KEY)');
      console.log('   - username (TEXT)');
      console.log('   - email (TEXT, UNIQUE)');
      console.log('   - password (TEXT)');
      console.log('   - last_login (TIMESTAMP)');
      console.log('   - created_at (TIMESTAMP)');
      console.log('   - updated_at (TIMESTAMP)');
      
      console.log('\n✅ Everything looks good! You can now use the signup/login features.');
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    process.exit(1);
  }
}

verifyTable();

