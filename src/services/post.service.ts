/**
 * Post Service - Business Logic Layer
 * Handles business logic and data transformation
 * Can easily call API client when backend is separated
 */

import { Post } from '@/interfaces/post';
import { postRepository } from '@/data/repositories/post-repository';
import { DatabasePost } from '@/core/types/database';
import { NotFoundError } from '@/core/errors/app-error';

class PostService {
  private mapDatabasePostToPost(dbPost: DatabasePost): Post {
    return {
      slug: dbPost.slug,
      title: dbPost.title,
      date: dbPost.date,
      coverImage: dbPost.cover_image || '',
      author: dbPost.author ? {
        name: dbPost.author.name,
        picture: dbPost.author.picture || ''
      } : null,
      excerpt: dbPost.excerpt || '',
      ogImage: {
        url: dbPost.og_image_url || ''
      },
      content: dbPost.content,
      preview: dbPost.preview
    };
  }

  async getAllPosts(): Promise<Post[]> {
    const dbPosts = await postRepository.findAll();
    return dbPosts.map(post => this.mapDatabasePostToPost(post));
  }

  async getPostBySlug(slug: string): Promise<Post> {
    const dbPost = await postRepository.findBySlug(slug);
    
    if (!dbPost) {
      throw new NotFoundError('Post');
    }

    return this.mapDatabasePostToPost(dbPost);
  }

  async getPostSlugs(): Promise<string[]> {
    return postRepository.findAllSlugs();
  }
}

export const postService = new PostService();

