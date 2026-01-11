'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(username, email, password);
      // Redirect will happen automatically via auth context
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="username" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2.5 text-sm bg-black/40 border border-gray-800/50 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 focus:bg-black/60 transition-all duration-200 font-light"
              placeholder="A unique username"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2.5 text-sm bg-black/40 border border-gray-800/50 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 focus:bg-black/60 transition-all duration-200 font-light"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2.5 text-sm bg-black/40 border border-gray-800/50 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 focus:bg-black/60 transition-all duration-200 font-light"
              placeholder="Password (min 6 chars)"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-950/30 border border-red-900/50 rounded-md text-red-300 text-sm font-light">
            {error}
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gray-900/80 hover:bg-gray-900 text-white rounded-md font-medium text-sm tracking-wide border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-900/80 shadow-inner"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
}

