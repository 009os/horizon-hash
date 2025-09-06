const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function migrateArticles() {
  try {
    console.log('🚀 Starting migration to Supabase...');

    // First, create authors
    const authors = [
      {
        name: 'JJ',
        picture: '/assets/blog/authors/jj.jpeg'
      },
      {
        name: 'Joe',
        picture: '/assets/blog/authors/joe.jpeg'
      },
      {
        name: 'Tim',
        picture: '/assets/blog/authors/tim.jpeg'
      }
    ];

    console.log('📝 Creating authors...');
    
    // First, check if authors already exist
    const { data: existingAuthors } = await supabase
      .from('authors')
      .select('*');
    
    let authorsData = existingAuthors || [];
    
    // Only insert authors that don't exist
    for (const author of authors) {
      const existing = authorsData.find(a => a.name === author.name);
      if (!existing) {
        const { data: newAuthor, error: authorError } = await supabase
          .from('authors')
          .insert(author)
          .select()
          .single();
        
        if (authorError) {
          console.log(`⚠️  Author ${author.name} might already exist:`, authorError.message);
        } else {
          authorsData.push(newAuthor);
        }
      }
    }

    console.log(`✅ Found/created ${authorsData.length} authors`);

    // Read existing markdown files
    const postsDirectory = path.join(process.cwd(), '_posts');
    const files = fs.readdirSync(postsDirectory);
    
    console.log(`📄 Found ${files.length} markdown files`);

    const posts = [];

    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(postsDirectory, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        const slug = file.replace(/\.md$/, '');
        
        // Find author by name
        const author = authorsData.find(a => a.name === data.author?.name);
        
        posts.push({
          slug,
          title: data.title,
          date: new Date(data.date).toISOString(),
          cover_image: data.coverImage,
          author_id: author?.id,
          excerpt: data.excerpt,
          og_image_url: data.ogImage?.url,
          content,
          preview: data.preview || false
        });
      }
    }

    console.log('📝 Creating posts...');
    
    // Check existing posts to avoid duplicates
    const { data: existingPosts } = await supabase
      .from('posts')
      .select('slug');
    
    const existingSlugs = new Set(existingPosts?.map(p => p.slug) || []);
    
    // Only insert posts that don't exist
    const newPosts = posts.filter(post => !existingSlugs.has(post.slug));
    
    if (newPosts.length > 0) {
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .insert(newPosts)
        .select();

      if (postsError) {
        throw postsError;
      }

      console.log(`✅ Created ${postsData.length} new posts`);
    } else {
      console.log('ℹ️  All posts already exist, skipping insertion');
    }
    console.log('🎉 Migration completed successfully!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateArticles();
