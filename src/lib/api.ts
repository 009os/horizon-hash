import { Post } from "@/interfaces/post";
import { supabase } from "./supabase";

export async function getPostSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('slug')
    .eq('preview', false);

  if (error) {
    console.error('Error fetching post slugs:', error);
    throw new Error('Database connection failed');
  }

  return data?.map(post => post.slug) || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:author_id (
        name,
        picture
      )
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    throw new Error('Database connection failed');
  }

  if (!data) return null;

  return {
    slug: data.slug,
    title: data.title,
    date: data.date,
    coverImage: data.cover_image,
    author: data.author ? {
      name: data.author.name,
      picture: data.author.picture
    } : null,
    excerpt: data.excerpt,
    ogImage: {
      url: data.og_image_url
    },
    content: data.content,
    preview: data.preview
  } as Post;
}

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:author_id (
        name,
        picture
      )
    `)
    .eq('preview', false)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Database connection failed');
  }

  return data?.map(post => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    coverImage: post.cover_image,
    author: post.author ? {
      name: post.author.name,
      picture: post.author.picture
    } : null,
    excerpt: post.excerpt,
    ogImage: {
      url: post.og_image_url
    },
    content: post.content,
    preview: post.preview
  })) || [];
}
