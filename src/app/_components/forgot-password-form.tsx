'use client';

import { useState } from 'react';

type Props = {
  onBack: () => void;
};

const inputClass =
  'w-full px-4 py-2.5 text-slate-100 bg-slate-700/80 border border-slate-600 rounded-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500 transition-all';
const labelClass = 'block text-sm font-medium text-slate-300 mb-1';

export default function ForgotPasswordForm({ onBack }: Props) {
  const [identifier, setIdentifier] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: identifier.trim(),
          currentPassword,
          newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-slate-400 text-sm">
          Password updated. You can now log in with your new password.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-2"
        >
          Back to login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="forgot-identifier" className={labelClass}>
            Email or username
          </label>
          <input
            id="forgot-identifier"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            placeholder="Email or username"
            className={inputClass}
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="forgot-current-password" className={labelClass}>
            Current password
          </label>
          <input
            id="forgot-current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            placeholder="Current password"
            className={inputClass}
            autoComplete="current-password"
          />
          <p className="text-xs text-slate-500 mt-1">Required for security.</p>
        </div>

        <div>
          <label htmlFor="forgot-new-password" className={labelClass}>
            New password
          </label>
          <input
            id="forgot-new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            placeholder="At least 6 characters"
            className={inputClass}
            autoComplete="new-password"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label htmlFor="forgot-confirm-password" className={labelClass}>
            Confirm new password
          </label>
          <input
            id="forgot-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            placeholder="Re-enter new password"
            className={inputClass}
            autoComplete="new-password"
          />
        </div>

        <div className="md:col-span-2 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-lg shadow-lg shadow-blue-900/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Reset password'}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="py-2.5 px-4 border border-slate-600 text-slate-300 font-medium rounded-lg hover:bg-slate-700/80 transition-colors bg-slate-700/50"
          >
            Back
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-300">{error}</p>}
    </form>
  );
}
