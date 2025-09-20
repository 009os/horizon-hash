import Link from "next/link";
import Container from "@/app/_components/container";

export default function Index() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden" style={{
      backdropFilter: 'blur(1px)',
      backgroundAttachment: 'fixed'
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Floating Crypto Bubbles */}
        <div className="floating-shapes">
          <div className="shape shape-1 crypto-btc">
            <span className="crypto-text">BTC</span>
          </div>
          <div className="shape shape-2 crypto-eth">
            <span className="crypto-text">ETH</span>
          </div>
          <div className="shape shape-3 crypto-shib">
            <span className="crypto-text">SHIB</span>
          </div>
          <div className="shape shape-4 crypto-sol">
            <span className="crypto-text">SOL</span>
          </div>
          <div className="shape shape-5 crypto-xrp">
            <span className="crypto-text">XRP</span>
          </div>
        </div>
        
        {/* Animated Particles */}
        <div className="particles-container">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
          <div className="particle particle-7"></div>
          <div className="particle particle-8"></div>
        </div>
      </div>

      <Container>
        {/* Hero Section */}
        <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
          {/* Main Title with Split Animation */}
          <div className="mb-8 relative">
            {/* Particle Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
              <div className="particle particle-5"></div>
            </div>
            
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold text-white relative z-10 flex items-center justify-center">
              <span className="inline-block animate-slide-in-left-continuous min-w-0 flex-shrink-0">
                HORIZON
              </span>
              <span className="inline-block mx-4 sm:mx-6 md:mx-8 lg:mx-12 animate-bounce-between flex-shrink-0">
                <img 
                  src="/logo.webp" 
                  alt="HORIZON HASH Logo" 
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain rounded-full"
                />
              </span>
              <span className="inline-block animate-slide-in-right-continuous min-w-0 flex-shrink-0" style={{ animationDelay: '0.5s' }}>
                HASH
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12 animate-fade-in-up animate-delay-300">
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light">
              Decoding the Future of Digital Markets
            </p>
          </div>

          {/* Blog Sections */}
          <div className="mb-16 animate-fade-in-up animate-delay-500">
            <div className="tree-container">
              <button className="tree-root btn-secondary-bw">
                <span className="btn-content">Explore Blogs</span>
              </button>
              
              <div className="tree-branches">
                <Link href="/blog" className="tree-branch branch-left">
                  <span className="branch-content">Market Insights & Quant</span>
                </Link>
                
                <button className="tree-branch branch-right">
                  <span className="branch-content">Crypto History</span>
                </button>
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
