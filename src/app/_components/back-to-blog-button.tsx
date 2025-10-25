'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function BackToBlogButton() {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <Link 
      href="/blog" 
      className="group relative inline-flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background circle */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-800 via-black to-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-110 blur-sm"></div>
      
      {/* Main button container */}
      <div className="relative z-10 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm border-2 border-gray-200 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
        
        {/* Animated arrow */}
        <div className="relative">
          {/* Main arrow */}
          <svg 
            className={`w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-white transition-all duration-300 transform ${isHovered ? 'translate-x-[-2px]' : 'translate-x-0'}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          
          {/* Trail effect */}
          <svg 
            className={`absolute inset-0 w-5 h-5 md:w-6 md:h-6 text-gray-400 opacity-0 group-hover:opacity-60 transition-all duration-300 transform ${isHovered ? 'translate-x-[-4px]' : 'translate-x-0'}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/2 left-1/2 w-1 h-1 bg-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 ${isHovered ? 'animate-ping' : ''}`}></div>
          <div className={`absolute top-1/2 left-1/2 w-1 h-1 bg-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-1/2 -translate-y-1/2 delay-100 ${isHovered ? 'animate-ping' : ''}`}></div>
          <div className={`absolute top-1/2 left-1/2 w-1 h-1 bg-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-900 transform -translate-x-1/2 -translate-y-1/2 delay-200 ${isHovered ? 'animate-ping' : ''}`}></div>
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Back to Blog
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </Link>
  )
}
