'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';

export default function LoginForm() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(identifier, password);
      // Redirect will happen automatically via auth context
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-1">
            <label htmlFor="identifier" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              Username, or Email
            </label>
            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full px-3 py-2.5 text-sm bg-black/40 border border-gray-800/50 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 focus:bg-black/60 transition-all duration-200 font-light"
              placeholder="Username or Email"
            />
          </div>

          <div className="md:col-span-1">
            <label htmlFor="password" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2.5 text-sm bg-black/40 border border-gray-800/50 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 focus:bg-black/60 transition-all duration-200 font-light"
              placeholder="Enter your password"
            />
          </div>

          <div className="md:col-span-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gray-900/80 hover:bg-gray-900 text-white rounded-md font-medium text-sm tracking-wide border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-900/80 shadow-inner"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-950/30 border border-red-900/50 rounded-md text-red-300 text-sm font-light">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

