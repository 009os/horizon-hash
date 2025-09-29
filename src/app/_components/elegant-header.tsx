"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ElegantHeader = () => {
  const pathname = usePathname();
  
  // Check if we're on a dark theme page
  const isDarkPage = pathname === "/" || pathname === "/blog" || pathname.startsWith("/posts/") || pathname === "/contact" || pathname === "/about";
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isDarkPage ? 'elegant-header-dark' : 'elegant-header'}`}>
      <div className="w-full px-8">
        <div className="flex items-center justify-start h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src="/logo.webp" 
                alt="Horizon Hash Logo" 
                className="w-10 h-10 object-contain rounded-full shadow-sm"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ElegantHeader;
