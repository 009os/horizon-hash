/**
 * View Repository - Data Access Layer
 * Abstracts Redis operations for view counts
 * Easy to replace with API calls when moving to backend
 */

import redis from '@/lib/redis';
import { DatabaseError } from '@/core/errors/app-error';
import { logger } from '@/core/utils/logger';

export class ViewRepository {
  async getViewCount(slug: string): Promise<number> {
    try {
      const count = await redis.get<number>(`post:${slug}:views`);
      return count || 0;
    } catch (error) {
      logger.error('Failed to get view count', error);
      throw new DatabaseError('Failed to get view count', error);
    }
  }

  async incrementViewCount(slug: string): Promise<number> {
    try {
      const newCount = await redis.incr(`post:${slug}:views`);
      return newCount;
    } catch (error) {
      logger.error('Failed to increment view count', error);
      throw new DatabaseError('Failed to increment view count', error);
    }
  }
}

export const viewRepository = new ViewRepository();

