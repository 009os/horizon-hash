#!/usr/bin/env node

/**
 * Environment Variables Checker
 * 
 * This script helps verify that your Supabase environment variables
 * are properly configured for both local development and Vercel deployment.
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Checking Supabase Environment Variables...\n');

// Check environment variables
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

let allPresent = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  const status = value ? '✅ Set' : '❌ Missing';
  const preview = value ? `${value.substring(0, 20)}...` : 'Not found';
  
  console.log(`${varName}: ${status}`);
  if (value) {
    console.log(`  Preview: ${preview}`);
  }
  console.log('');
  
  if (!value) {
    allPresent = false;
  }
});

if (allPresent) {
  console.log('🎉 All environment variables are configured!');
  console.log('Your Supabase connection should work properly.');
} else {
  console.log('⚠️  Some environment variables are missing.');
  console.log('\n📋 To fix this:');
  console.log('1. Create a .env.local file in your project root');
  console.log('2. Add your Supabase credentials:');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here');
  console.log('   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here');
  console.log('\n3. For Vercel deployment, add these same variables in:');
  console.log('   Vercel Dashboard → Project Settings → Environment Variables');
}

console.log('\n🔗 Get your Supabase credentials from:');
console.log('https://supabase.com/dashboard → Your Project → Settings → API');
