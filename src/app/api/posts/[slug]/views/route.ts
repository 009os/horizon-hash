import { NextRequest, NextResponse } from 'next/server'
import redis from '@/lib/redis'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const viewCount = await redis.get<number>(`post:${slug}:views`) || 0
    
    return NextResponse.json({ viewCount })
  } catch (error) {
    console.error('Error getting view count:', error)
    return NextResponse.json({ viewCount: 0 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const newCount = await redis.incr(`post:${slug}:views`)
    
    return NextResponse.json({ viewCount: newCount })
  } catch (error) {
    console.error('Error incrementing view count:', error)
    return NextResponse.json({ viewCount: 0 })
  }
}