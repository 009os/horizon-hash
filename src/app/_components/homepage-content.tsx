'use client';

import Link from "next/link";
import Container from "@/app/_components/container";
import { useAuth } from "@/contexts/auth-context";
import AuthModal from "./auth-modal";

export default function HomepageContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden" style={{
        backdropFilter: 'blur(1px)',
        backgroundAttachment: 'fixed'
      }}>
        <Container>
          <section className="relative z-10 flex flex-col items-center justify-center text-center pt-40 min-h-[60vh]">
            <div className="text-white text-xl">Loading...</div>
          </section>
        </Container>
      </main>
    );
  }

  if (!user) {
    // Show Login/Signup
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden" style={{
        backdropFilter: 'blur(1px)',
        backgroundAttachment: 'fixed'
      }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Grid Background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          {/* Universe Background Elements */}
          <div className="absolute inset-0">
            {/* Nebula Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 animate-nebula-flow"></div>
            
            {/* Shooting Stars */}
            <div className="absolute top-20 left-0 w-2 h-2 bg-white rounded-full animate-shooting-star opacity-80"></div>
            <div className="absolute top-40 right-0 w-1 h-1 bg-blue-300 rounded-full animate-shooting-star opacity-60" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-shooting-star opacity-70" style={{animationDelay: '4s'}}></div>
            
            {/* Constellation Stars */}
            <div className="absolute top-32 left-1/3 w-1 h-1 bg-white rounded-full animate-constellation-twinkle"></div>
            <div className="absolute top-48 right-1/3 w-1 h-1 bg-blue-200 rounded-full animate-constellation-twinkle" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-72 left-1/2 w-1 h-1 bg-purple-200 rounded-full animate-constellation-twinkle" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-24 right-1/4 w-1 h-1 bg-indigo-200 rounded-full animate-constellation-twinkle" style={{animationDelay: '3s'}}></div>
          </div>
        </div>

        <Container>
          {/* Hero Section */}
          <section className="relative z-10 flex flex-col items-center justify-start text-center pt-40">
            {/* Main Heading */}
            <div className="mb-8 animate-fade-in-up animate-delay-300">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-formal font-bold text-center leading-tight sm:leading-tight md:leading-tight lg:leading-tight animate-pulse-slow hover:animate-bounce-gentle transition-all duration-500">
                Decoding the Future of Digital Markets
              </h1>
            </div>

            {/* Auth Modal */}
            <div className="mb-8 animate-fade-in-up animate-delay-500">
              <AuthModal />
            </div>
          </section>
        </Container>
      </main>
    );
  }

  // Show Explore Blogs
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden" style={{
      backdropFilter: 'blur(1px)',
      backgroundAttachment: 'fixed'
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Universe Background Elements */}
        <div className="absolute inset-0">
          {/* Nebula Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 animate-nebula-flow"></div>
          
          {/* Shooting Stars */}
          <div className="absolute top-20 left-0 w-2 h-2 bg-white rounded-full animate-shooting-star opacity-80"></div>
          <div className="absolute top-40 right-0 w-1 h-1 bg-blue-300 rounded-full animate-shooting-star opacity-60" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-shooting-star opacity-70" style={{animationDelay: '4s'}}></div>
          
          {/* Constellation Stars */}
          <div className="absolute top-32 left-1/3 w-1 h-1 bg-white rounded-full animate-constellation-twinkle"></div>
          <div className="absolute top-48 right-1/3 w-1 h-1 bg-blue-200 rounded-full animate-constellation-twinkle" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-72 left-1/2 w-1 h-1 bg-purple-200 rounded-full animate-constellation-twinkle" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-24 right-1/4 w-1 h-1 bg-indigo-200 rounded-full animate-constellation-twinkle" style={{animationDelay: '3s'}}></div>
          
          {/* Galaxy Spiral */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/10 rounded-full animate-galaxy-spin opacity-30"></div>
          <div className="absolute top-1/4 right-1/4 w-24 h-24 border border-blue-300/20 rounded-full animate-galaxy-spin opacity-40" style={{animationDelay: '5s'}}></div>
          <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-purple-300/30 rounded-full animate-galaxy-spin opacity-50" style={{animationDelay: '10s'}}></div>
        </div>
        
        {/* Floating Crypto Bubbles */}
        <div className="floating-shapes">
          <div className="shape shape-1 crypto-btc animate-cosmic-drift">
            <span className="crypto-text">BTC</span>
          </div>
          <div className="shape shape-2 crypto-eth animate-stellar-pulse">
            <span className="crypto-text">ETH</span>
          </div>
          <div className="shape shape-3 crypto-shib animate-cosmic-drift" style={{animationDelay: '2s'}}>
            <span className="crypto-text">SHIB</span>
          </div>
          <div className="shape shape-4 crypto-sol animate-stellar-pulse" style={{animationDelay: '1s'}}>
            <span className="crypto-text">SOL</span>
          </div>
          <div className="shape shape-5 crypto-xrp animate-cosmic-drift" style={{animationDelay: '3s'}}>
            <span className="crypto-text">XRP</span>
          </div>
          <div className="shape shape-6 crypto-usdt animate-stellar-pulse" style={{animationDelay: '2s'}}>
            <span className="crypto-text">USDT</span>
          </div>
          <div className="shape shape-7 crypto-bnb animate-stellar-pulse" style={{animationDelay: '3s'}}>
            <span className="crypto-text">BNB</span>
          </div>
          <div className="shape shape-8 crypto-doge animate-stellar-pulse" style={{animationDelay: '4s'}}>
            <span className="crypto-text">DOGE</span>
          </div>
        </div>
        
        {/* Enhanced Animated Particles */}
        <div className="particles-container">
          <div className="particle particle-1 animate-constellation-twinkle"></div>
          <div className="particle particle-2 animate-constellation-twinkle" style={{animationDelay: '1s'}}></div>
          <div className="particle particle-3 animate-constellation-twinkle" style={{animationDelay: '2s'}}></div>
          <div className="particle particle-4 animate-constellation-twinkle" style={{animationDelay: '3s'}}></div>
          <div className="particle particle-5 animate-constellation-twinkle" style={{animationDelay: '4s'}}></div>
          <div className="particle particle-6 animate-constellation-twinkle" style={{animationDelay: '5s'}}></div>
          <div className="particle particle-7 animate-constellation-twinkle" style={{animationDelay: '6s'}}></div>
          <div className="particle particle-8 animate-constellation-twinkle" style={{animationDelay: '7s'}}></div>
        </div>
      </div>

      <Container>
        {/* Hero Section */}
        <section className="relative z-10 flex flex-col items-center justify-start text-center pt-40">

          {/* Main Heading */}
          <div className="mb-8 animate-fade-in-up animate-delay-300">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-formal font-bold text-center leading-tight sm:leading-tight md:leading-tight lg:leading-tight animate-pulse-slow hover:animate-bounce-gentle transition-all duration-500">
              Decoding the Future of Digital Markets
            </h1>
          </div>

          {/* Blog Sections */}
          <div className="mb-8 animate-fade-in-up animate-delay-500">
            <div className="tree-container animate-float-slow">
              <button className="tree-root btn-secondary-bw hover:animate-pulse hover:scale-105 transition-all duration-300 animate-glow-slow">
                <span className="btn-content">Explore Blogs</span>
              </button>
              
              <div className="tree-branches">
                <Link href="/blog" className="tree-branch branch-left hover:animate-bounce-gentle hover:scale-110 transition-all duration-300 animate-slide-in-left">
                  <span className="branch-content">Market Insights & Quant</span>
                </Link>
                
                <Link href="/crypto-history" className="tree-branch branch-right hover:animate-bounce-gentle hover:scale-110 transition-all duration-300 animate-slide-in-right">
                  <span className="branch-content">Crypto History</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Future Sections Placeholder */}
          <div className="animate-fade-in-up animate-delay-700">
          </div>
        </section>
      </Container>
    </main>
  );
}

