/**
 * View Count API Route
 * Uses view service for business logic
 */

import { NextRequest, NextResponse } from 'next/server';
import { viewService } from '@/services/view.service';
import { logger } from '@/core/utils/logger';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const viewCount = await viewService.getViewCount(slug);
    return NextResponse.json({ viewCount });
  } catch (error) {
    logger.error('Error getting view count', error);
    return NextResponse.json({ viewCount: 0 });
  }
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const newCount = await viewService.trackView(slug);
    return NextResponse.json({ viewCount: newCount });
  } catch (error) {
    logger.error('Error incrementing view count', error);
    return NextResponse.json({ viewCount: 0 });
  }
}