import Container from "@/app/_components/container";

export default function Contact() {
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
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-formal text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 font-light">
              Let's Connect and Build the Future Together
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">Get in Touch</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Email */}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                    <a 
                      href="mailto:horizonhash009@gmail.com" 
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      horizonhash009@gmail.com
                    </a>
                    <p className="text-gray-400 text-sm mt-2">
                      We typically respond within 24 hours
                    </p>
                  </div>

                  {/* Instagram */}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Instagram</h3>
                    <a 
                      href="https://instagram.com/horizonhash" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:text-pink-300 transition-colors"
                    >
                      @horizonhash
                    </a>
                    <p className="text-gray-400 text-sm mt-2">
                      Follow us for daily market updates
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Contact Us */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">Why Reach Out?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Collaboration opportunities</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Guest writing inquiries</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Partnership discussions</span>
                    </li>
                  </ul>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>General questions about crypto</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Feedback and suggestions</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Business inquiries</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
