import Container from "@/app/_components/container";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden" style={{
      backdropFilter: 'blur(1px)',
      backgroundAttachment: 'fixed'
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      <Container>
        <div className="relative z-10 pt-20 pb-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-formal text-white mb-6 animate-fade-in-up">
              About Horizon Hash
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 font-light animate-fade-in-up animate-delay-300">
              Decoding the Future of Digital Markets
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Mission Section */}
            <section className="animate-fade-in-up animate-delay-500">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Mission</h2>
                <p className="text-gray-300 text-lg leading-relaxed text-center">
                  At Horizon Hash, we believe that understanding digital markets shouldn't be reserved for Wall Street elites. 
                  Our mission is to democratize financial knowledge and empower investors with data-driven strategies, 
                  comprehensive market intelligence, and cutting-edge quantitative analysis.
                </p>
              </div>
            </section>

            {/* What We Do Section */}
            <section className="animate-fade-in-up animate-delay-700">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Market Analysis</h3>
                    <p className="text-gray-400 text-sm">
                      Deep-dive technical analysis, quantitative research, and market insights to help you navigate the crypto landscape.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Education</h3>
                    <p className="text-gray-400 text-sm">
                      Comprehensive guides on crypto basics, blockchain technology, DeFi, NFTs, and Web3 fundamentals.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Values Section */}
            <section className="animate-fade-in-up animate-delay-900">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Innovation</h3>
                  <p className="text-gray-400 text-sm">Cutting-edge analysis and forward-thinking strategies</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Accuracy</h3>
                  <p className="text-gray-400 text-sm">Data-driven insights with rigorous research methodology</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
                  <p className="text-gray-400 text-sm">Building a knowledgeable and supportive crypto community</p>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="animate-fade-in-up animate-delay-1100">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Ready to Explore?</h2>
                <p className="text-gray-300 mb-6">
                  Join thousands of investors who trust Horizon Hash for their market analysis and education needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/blog" 
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
                  >
                    Explore Our Blog
                  </a>
                  <a 
                    href="/contact" 
                    className="px-8 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 font-semibold"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
