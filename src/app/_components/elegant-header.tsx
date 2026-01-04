"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useState, useEffect } from "react";

const ElegantHeader = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Check if we're on a dark theme page
  const isDarkPage = pathname === "/" || pathname === "/blog" || pathname === "/crypto-history" || pathname.startsWith("/posts/") || pathname === "/contact" || pathname === "/about";
  
  const handleLogout = async () => {
    await logout();
    setShowProfileMenu(false);
    window.location.href = '/';
  };

  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showProfileMenu]);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isDarkPage ? 'elegant-header-dark' : 'elegant-header'}`}>
      <div className="w-full px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src="/logo.webp" 
                alt="Horizon Hash Logo" 
                className="w-16 h-16 object-contain rounded-full shadow-sm"
              />
            </Link>
          </div>

          {/* Right side - Profile Section - Only show if logged in */}
          {user && (
            <div className="profile-menu-container relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors duration-200"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
                <span className="font-medium">{user.username}</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-700">
                    <div className="text-sm text-gray-400">Signed in as</div>
                    <div className="text-white font-medium">{user.username}</div>
                    <div className="text-xs text-gray-500 mt-1">{user.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17 16l-4-4m0 0l-4 4m4-4v12" 
                      />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ElegantHeader;
