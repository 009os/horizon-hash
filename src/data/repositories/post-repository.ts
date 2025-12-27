/**
 * Post Repository - Data Access Layer
 * Abstracts database operations for posts
 * Easy to replace with API calls when moving to backend
 */

import { supabase } from '@/lib/supabase';
import { DatabasePost } from '@/core/types/database';
import { DatabaseError, NetworkError } from '@/core/errors/app-error';
import { logger } from '@/core/utils/logger';
import { diagnoseSupabaseConnection } from '@/core/utils/diagnostics';

export class PostRepository {
  async findAll(includePreview = false): Promise<DatabasePost[]> {
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          author:author_id (
            name,
            picture
          )
        `)
        .order('date', { ascending: false });

      if (!includePreview) {
        query = query.eq('preview', false);
      }

      const { data, error } = await query;

      if (error) {
        logger.error('Failed to fetch posts', error);
        throw new DatabaseError(`Failed to fetch posts: ${error.message}`, error);
      }

      return (data as DatabasePost[]) || [];
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isNetworkError = errorMessage.includes('fetch failed') || 
                            errorMessage.includes('ECONNREFUSED') ||
                            errorMessage.includes('ENOTFOUND') ||
                            errorMessage.includes('network');
      
      if (isNetworkError) {
        logger.error('Network error fetching posts - check Supabase connection', error);
        diagnoseSupabaseConnection();
        throw new NetworkError(
          'Unable to connect to database. Please check your internet connection and Supabase configuration.',
          error
        );
      }
      
      logger.error('Unexpected error fetching posts', error);
      throw new DatabaseError(`Unexpected error fetching posts: ${errorMessage}`, error);
    }
  }

  async findBySlug(slug: string): Promise<DatabasePost | null> {
    try {
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
        if (error.code === 'PGRST116') {
          return null;
        }
        logger.error('Failed to fetch post by slug', error);
        throw new DatabaseError(`Failed to fetch post: ${error.message}`, error);
      }

      return (data as DatabasePost) || null;
    } catch (error) {
      if (error instanceof DatabaseError || error instanceof NetworkError) throw error;
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isNetworkError = errorMessage.includes('fetch failed') || 
                            errorMessage.includes('ECONNREFUSED') ||
                            errorMessage.includes('ENOTFOUND') ||
                            errorMessage.includes('network');
      
      if (isNetworkError) {
        logger.error('Network error fetching post - check Supabase connection', error);
        throw new NetworkError(
          'Unable to connect to database. Please check your internet connection and Supabase configuration.',
          error
        );
      }
      
      logger.error('Unexpected error fetching post', error);
      throw new DatabaseError(`Unexpected error fetching post: ${errorMessage}`, error);
    }
  }

  async findAllSlugs(includePreview = false): Promise<string[]> {
    try {
      let query = supabase
        .from('posts')
        .select('slug');

      if (!includePreview) {
        query = query.eq('preview', false);
      }

      const { data, error } = await query;

      if (error) {
        logger.error('Failed to fetch post slugs', error);
        throw new DatabaseError(`Failed to fetch post slugs: ${error.message}`, error);
      }

      return data?.map(post => post.slug) || [];
    } catch (error) {
      if (error instanceof DatabaseError || error instanceof NetworkError) throw error;
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isNetworkError = errorMessage.includes('fetch failed') || 
                            errorMessage.includes('ECONNREFUSED') ||
                            errorMessage.includes('ENOTFOUND') ||
                            errorMessage.includes('network');
      
      if (isNetworkError) {
        logger.error('Network error fetching post slugs - check Supabase connection', error);
        throw new NetworkError(
          'Unable to connect to database. Please check your internet connection and Supabase configuration.',
          error
        );
      }
      
      logger.error('Unexpected error fetching post slugs', error);
      throw new DatabaseError(`Unexpected error fetching post slugs: ${errorMessage}`, error);
    }
  }

  async findByCategory(category: string, includePreview = false): Promise<DatabasePost[]> {
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          author:author_id (
            name,
            picture
          )
        `)
        .like('slug', `${category}-%`)
        .order('date', { ascending: false });

      if (!includePreview) {
        query = query.eq('preview', false);
      }

      const { data, error } = await query;

      if (error) {
        logger.error('Failed to fetch posts by category', error);
        throw new DatabaseError(`Failed to fetch posts by category: ${error.message}`, error);
      }

      return (data as DatabasePost[]) || [];
    } catch (error) {
      if (error instanceof DatabaseError || error instanceof NetworkError) throw error;
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isNetworkError = errorMessage.includes('fetch failed') || 
                            errorMessage.includes('ECONNREFUSED') ||
                            errorMessage.includes('ENOTFOUND') ||
                            errorMessage.includes('network');
      
      if (isNetworkError) {
        logger.error('Network error fetching posts by category - check Supabase connection', error);
        diagnoseSupabaseConnection();
        throw new NetworkError(
          'Unable to connect to database. Please check your internet connection and Supabase configuration.',
          error
        );
      }
      
      logger.error('Unexpected error fetching posts by category', error);
      throw new DatabaseError(`Unexpected error fetching posts by category: ${errorMessage}`, error);
    }
  }
}

export const postRepository = new PostRepository();

