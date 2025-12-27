'use client';

import { useEffect, useState } from 'react';

interface ViewCounterProps {
  slug: string;
}

const SESSION_STORAGE_KEY = (slug: string) => `viewed_${slug}`;

export default function ViewCounter({ slug }: ViewCounterProps) {
  const [viewCount, setViewCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!slug) return;

    const trackView = async () => {
      try {
        const sessionKey = SESSION_STORAGE_KEY(slug);
        const hasViewed = typeof window !== 'undefined' 
          ? sessionStorage.getItem(sessionKey) 
          : null;
        
        const endpoint = `/api/posts/${slug}/views`;
        const method = hasViewed ? 'GET' : 'POST';
        
        const response = await fetch(endpoint, { method });
        
        if (response.ok) {
          const { viewCount: count } = await response.json();
          setViewCount(count);
          
          if (!hasViewed && typeof window !== 'undefined') {
            sessionStorage.setItem(sessionKey, 'true');
          }
        }
      } catch (error) {
        // Silently fail - view count is not critical
      } finally {
        setIsLoading(false);
      }
    };

    trackView();
  }, [slug]);

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
  );
}
