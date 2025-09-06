import Link from "next/link";
import Container from "@/app/_components/container";

export default function Index() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
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
            
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold text-black relative z-10 flex items-center justify-center">
              <span className="inline-block animate-slide-in-left-continuous">
                HORIZON
              </span>
              <span className="inline-block mx-8 animate-bounce-between">
                <img 
                  src="/logo.webp" 
                  alt="HORIZON HASH Logo" 
                  className="w-16 h-16 object-contain rounded-full"
                />
              </span>
              <span className="inline-block animate-slide-in-right-continuous">
                HASH
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12 animate-fade-in-up animate-delay-300">
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 font-light">
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
                  <span className="branch-content">Market Insights</span>
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
