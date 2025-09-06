'use client';

export default function ServerOverloaded() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated Terminal */}
        <div className="bg-black/80 rounded-lg p-6 mb-8 font-mono text-green-400 border border-green-500/30 shadow-2xl">
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="ml-4 text-gray-400">terminal</span>
          </div>
          <div className="space-y-2 text-left">
            <div className="flex items-center">
              <span className="text-blue-400">$</span>
              <span className="ml-2 text-white">npm run dev</span>
            </div>
            <div className="text-yellow-400">⚠️  Server overloaded - too many requests</div>
            <div className="text-red-400">❌ Database connection timeout</div>
            <div className="text-green-400">🔄 Retrying in 3... 2... 1...</div>
            <div className="flex items-center">
              <span className="text-blue-400">$</span>
              <span className="ml-2 text-white animate-pulse">_</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h1 className="text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Server Overloaded
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Our servers are working overtime! 🚀
          </p>

          {/* Fun ASCII Art */}
          <div className="text-green-400 font-mono text-sm mb-8">
            <pre>{`
    ╔══════════════════════════════════════╗
    ║  🔥 SERVER STATUS: OVERLOADED 🔥     ║
    ║                                      ║
    ║  💾 Database: [████████░░] 80%       ║
    ║  🚀 CPU: [██████████░░] 90%         ║
    ║  💨 Memory: [█████████░░] 85%       ║
    ║                                      ║
    ║  Status: Too many awesome requests!  ║
    ╚══════════════════════════════════════╝
            `}</pre>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🔄 Try Again
            </button>
            
            <div className="text-gray-400 text-sm">
              <p>💡 Pro tip: Wait a moment and refresh the page</p>
              <p>🛠️ Our team is working hard to fix this!</p>
            </div>
          </div>

          {/* Fun Loading Animation */}
          <div className="flex justify-center space-x-2 mt-8">
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
