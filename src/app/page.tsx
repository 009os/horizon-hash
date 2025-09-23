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
        <section className="relative z-10 flex flex-col items-center justify-start text-center pt-20">
          {/* Main Title with Split Animation - Optimized */}
          <div className="mb-8 relative">
            {/* Particle Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
              <div className="particle particle-5"></div>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-formal text-white relative z-10 flex items-center justify-center animate-gentle-swing">
              <span className="inline-block animate-slide-in-left-continuous min-w-0 flex-shrink-0">
                Horizon
              </span>
              <span className="inline-block mx-1 sm:mx-1 md:mx-2 lg:mx-2 flex-shrink-0">
                &nbsp;
              </span>
              <span className="inline-block animate-slide-in-right-continuous min-w-0 flex-shrink-0" style={{ animationDelay: '0.5s' }}>
                Hash
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-8 animate-fade-in-up animate-delay-300">
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light">
              Decoding the Future of Digital Markets
            </p>
          </div>

          {/* Blog Sections */}
          <div className="mb-8 animate-fade-in-up animate-delay-500">
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
