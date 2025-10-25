# 🚨 Vercel Deployment Fix Guide

## Problem Identified
Your Vercel deployment is failing because **Supabase environment variables are not configured**. The build process can't connect to your database, causing the "Database connection failed" error.

## ✅ What I've Fixed
1. **Improved error handling** - Better debugging information in logs
2. **Environment variable validation** - Clear error messages when variables are missing
3. **Created environment checker script** - `scripts/check-env.js` to verify configuration

## 🔧 How to Fix Your Deployment

### Step 1: Get Your Supabase Credentials
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy these values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)
   - **service_role** key (starts with `eyJ`)

### Step 2: Configure Vercel Environment Variables
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `horizon-hash` project
3. Go to **Settings** → **Environment Variables**
4. Add these three variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Important**: Make sure to:
- ✅ Set environment to **Production** (and Preview if you want)
- ✅ No extra spaces or quotes around the values
- ✅ Use the exact variable names shown above

### Step 3: Redeploy
1. After adding the environment variables, trigger a new deployment
2. You can either:
   - Push a new commit to your repository
   - Or go to **Deployments** tab and click **Redeploy** on the latest deployment

### Step 4: Verify the Fix
1. Check the build logs - you should no longer see "Database connection failed"
2. Visit your live site - the blog should load properly
3. Test individual blog posts to ensure they work

## 🧪 Local Development Setup (Optional)
If you want to test locally, create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Then run:
```bash
npm run dev
```

## 🔍 Troubleshooting

### If you still get errors:
1. **Double-check the environment variable names** - they must be exact
2. **Verify your Supabase project is active** - check the dashboard
3. **Ensure your database schema is set up** - run the SQL from `supabase-schema.sql`
4. **Check the build logs** - look for specific error messages

### Common Issues:
- **"Invalid API key"** → Check that you copied the keys correctly
- **"Relation does not exist"** → Run the database schema setup
- **"Environment variable not found"** → Verify the variable names in Vercel

## 📊 Expected Results
After fixing the environment variables:
- ✅ Build will complete successfully
- ✅ Blog page will load with your articles
- ✅ Individual posts will be accessible
- ✅ No more "Server Overloaded" errors

## 🎯 Next Steps
Once your deployment is working:
1. **Test all functionality** - blog listing, individual posts, etc.
2. **Add content** - create new blog posts via Supabase dashboard
3. **Monitor performance** - check Vercel analytics
4. **Set up custom domain** - if you have one

---
**Need help?** Check the build logs in Vercel for specific error messages, or refer to the Supabase documentation.
