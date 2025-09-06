# 🚀 Supabase Setup Guide for Horizon Hash Blog

This guide will help you migrate your blog from markdown files to Supabase database.

## 📋 Prerequisites

- Node.js installed
- A Supabase account (free at [supabase.com](https://supabase.com))

## 🔧 Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `horizon-hash-blog`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be ready (2-3 minutes)

## 🔑 Step 2: Get API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)
   - **service_role** key (starts with `eyJ`)

## ⚙️ Step 3: Configure Environment Variables

1. Open `.env.local` in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 🗄️ Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase-schema.sql`
4. Click "Run" to execute the SQL

This will create:
- `authors` table for blog authors
- `posts` table for blog articles
- Proper indexes and relationships
- Row Level Security policies

## 📦 Step 5: Migrate Existing Articles

1. Run the migration script:
```bash
node scripts/migrate-to-supabase.js
```

This will:
- Create your authors in the database
- Migrate all markdown files to database records
- Preserve all metadata and content

## 🧪 Step 6: Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Visit `http://localhost:3000/blog` to see your articles
3. Click on individual articles to verify they load correctly

## 🎉 Step 7: Verify in Supabase Dashboard

1. Go to **Table Editor** in your Supabase dashboard
2. Check the `authors` and `posts` tables
3. Verify your articles are properly stored

## 🔄 Future Article Management

### Adding New Articles via Supabase Dashboard

1. Go to **Table Editor** → **posts**
2. Click "Insert" → "Insert row"
3. Fill in the required fields:
   - `slug`: URL-friendly version of title
   - `title`: Article title
   - `date`: Publication date
   - `content`: Full article content (markdown)
   - `excerpt`: Short description
   - `author_id`: Select from existing authors
   - `cover_image`: Image URL
   - `og_image_url`: Social media preview image

### Adding New Authors

1. Go to **Table Editor** → **authors**
2. Click "Insert" → "Insert row"
3. Add:
   - `name`: Author name
   - `picture`: Author photo URL

## 🚀 Benefits of This Setup

- ✅ **Scalable**: Handle thousands of articles easily
- ✅ **Fast**: Database queries are much faster than file system
- ✅ **Searchable**: Built-in full-text search capabilities
- ✅ **Manageable**: Admin interface for content management
- ✅ **Reliable**: Professional database with backups
- ✅ **Free**: Generous free tier (500MB, 50K users/month)

## 🔧 Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Double-check your `.env.local` file
   - Ensure no extra spaces or quotes around the keys

2. **"Relation does not exist" error**
   - Make sure you ran the SQL schema setup
   - Check that tables were created in the correct database

3. **Articles not showing**
   - Verify the migration script ran successfully
   - Check that `preview` field is set to `false` for published articles

4. **Build errors**
   - Make sure all API functions are properly awaited
   - Check that environment variables are loaded

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the migration script logs for specific errors
- Ensure your Next.js app is using the latest API functions

## 🎯 Next Steps

Once everything is working:

1. **Remove old markdown files** (optional, keep as backup)
2. **Set up content management** - consider building an admin interface
3. **Add search functionality** - Supabase has built-in full-text search
4. **Implement caching** - for even better performance
5. **Add analytics** - track article views and engagement

---

**Note**: This system is proprietary and private, but selected backend modules are publicly available to showcase the architecture and implementation approach.
