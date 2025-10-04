'use client'

import { useEffect, useState } from 'react'

interface ViewCounterProps {
  slug: string
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  const [viewCount, setViewCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const trackView = async () => {
      if (!slug) return

      try {
        // Check if this article was already viewed in this session
        const sessionKey = `viewed_${slug}`
        const hasViewed = typeof window !== 'undefined' ? sessionStorage.getItem(sessionKey) : null
        console.log(`ViewCounter for ${slug}: hasViewed=${hasViewed}`)
        
        if (hasViewed) {
          // Just get the current count without incrementing
          const response = await fetch(`/api/posts/${slug}/views`)
          if (response.ok) {
            const data = await response.json()
            setViewCount(data.viewCount)
          }
          setIsLoading(false)
          return
        }

        // Increment only if this is the first view in this session
        const response = await fetch(`/api/posts/${slug}/views`, {
          method: 'POST',
        })
        
        if (response.ok) {
          const data = await response.json()
          setViewCount(data.viewCount)
          // Mark as viewed in this session
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(sessionKey, 'true')
          }
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Error tracking view:', error)
        setIsLoading(false)
      }
    }

    trackView()
  }, [slug])

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <svg 
        className="w-4 h-4 font-bold" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        strokeWidth={3}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
        />
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
        />
      </svg>
      <span className="font-bold">{isLoading ? '...' : `${viewCount} views`}</span>
    </div>
  )
}
