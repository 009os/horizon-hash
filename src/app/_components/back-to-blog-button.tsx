'use client'

import Link from 'next/link'

export default function BackToBlogButton() {
  console.log('BackToBlogButton component rendering...')
  return (
    <Link 
      href="/blog" 
      className="inline-block p-2 rounded-lg bg-gray-100 hover:bg-blue-100 hover:scale-110 transition-all duration-200 group"
    >
      <svg 
        className="w-8 h-8 text-gray-800 group-hover:text-blue-600 transition-colors duration-200" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        strokeWidth={3}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M10 19l-7-7m0 0l7-7m-7 7h18" 
        />
      </svg>
    </Link>
  )
}
