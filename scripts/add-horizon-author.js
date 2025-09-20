const { createClient } = require('@supabase/supabase-js');

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

async function addHorizonAuthor() {
  try {
    console.log('🚀 Adding Horizon author and updating posts...');

    // First, check if Horizon author already exists
    const { data: existingAuthor } = await supabase
      .from('authors')
      .select('*')
      .eq('name', 'Horizon')
      .single();

    let horizonAuthor;
    
    if (existingAuthor) {
      console.log('✅ Horizon author already exists');
      horizonAuthor = existingAuthor;
    } else {
      // Create Horizon author
      const { data: newAuthor, error: authorError } = await supabase
        .from('authors')
        .insert({
          name: 'Horizon',
          picture: '/logo.webp'
        })
        .select()
        .single();

      if (authorError) {
        throw authorError;
      }

      console.log('✅ Created Horizon author');
      horizonAuthor = newAuthor;
    }

    // Get all existing posts
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*');

    if (postsError) {
      throw postsError;
    }

    console.log(`📄 Found ${posts.length} posts`);

    // Update all posts to use Horizon as author
    for (const post of posts) {
      const { error: updateError } = await supabase
        .from('posts')
        .update({ author_id: horizonAuthor.id })
        .eq('id', post.id);

      if (updateError) {
        console.error(`❌ Error updating post ${post.slug}:`, updateError);
      } else {
        console.log(`✅ Updated post: ${post.slug}`);
      }
    }

    console.log('🎉 All posts updated with Horizon author!');

  } catch (error) {
    console.error('❌ Operation failed:', error);
    process.exit(1);
  }
}

addHorizonAuthor();
