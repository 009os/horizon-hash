/**
 * View Service - Business Logic Layer
 * Handles view tracking logic
 */

import { viewRepository } from '@/data/repositories/view-repository';

class ViewService {
  async getViewCount(slug: string): Promise<number> {
    return viewRepository.getViewCount(slug);
  }

  async trackView(slug: string): Promise<number> {
    return viewRepository.incrementViewCount(slug);
  }
}

export const viewService = new ViewService();

