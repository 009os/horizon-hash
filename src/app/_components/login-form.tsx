'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';

const inputClass =
  'w-full px-4 py-2.5 text-slate-100 bg-slate-700/80 border border-slate-600 rounded-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500 transition-all';
const labelClass = 'block text-sm font-medium text-slate-300 mb-1';

type Props = {
  onSwitchToReset?: () => void;
};

export default function LoginForm({ onSwitchToReset }: Props) {
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
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-1">
            <label htmlFor="identifier" className={labelClass}>
              Username or email
            </label>
            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              placeholder="Username or email"
              className={inputClass}
            />
          </div>

          <div className="md:col-span-1">
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className={inputClass}
            />
          </div>

          <div className="md:col-span-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-lg shadow-lg shadow-blue-900/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Log in'}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => onSwitchToReset?.()}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700/60 border border-slate-600 rounded-lg hover:bg-slate-700 hover:text-blue-400 hover:border-blue-500/50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            Reset password
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-900/40 border border-red-700/60 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
