/**
 * API Client - Abstraction for future backend separation
 * Currently uses services directly, but can be replaced with HTTP calls
 * 
 * When moving to backend:
 * 1. Replace service calls with fetch/axios calls
 * 2. Update base URL from env
 * 3. Add authentication headers
 * 4. Keep same interface - no changes needed in components
 */

import { Post } from '@/interfaces/post';
import { postService } from '@/services/post.service';
import { viewService } from '@/services/view.service';

class ApiClient {
  // Post endpoints
  async getPosts(): Promise<Post[]> {
    return postService.getAllPosts();
  }

  async getPost(slug: string): Promise<Post> {
    return postService.getPostBySlug(slug);
  }

  async getPostSlugs(): Promise<string[]> {
    return postService.getPostSlugs();
  }

  // View endpoints
  async getViewCount(slug: string): Promise<number> {
    return viewService.getViewCount(slug);
  }

  async trackView(slug: string): Promise<number> {
    return viewService.trackView(slug);
  }
}

export const apiClient = new ApiClient();

