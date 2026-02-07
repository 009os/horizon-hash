'use client';

import { useState } from 'react';
import LoginForm from './login-form';
import SignupForm from './signup-form';
import ForgotPasswordForm from './forgot-password-form';

export default function AuthModal() {
  const [view, setView] = useState<'login' | 'signup' | 'reset'>('signup');

  const isLogin = view === 'login';
  const isSignup = view === 'signup';
  const isReset = view === 'reset';

  const heading = isReset ? 'Reset password!' : isLogin ? 'Welcome back' : 'Create your account';
  const subtext = isReset ? 'Enter your current password and choose a new one.' : isLogin ? 'Sign in to explore blogs' : 'Sign up to get started';

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-600/80 shadow-2xl shadow-black/30 bg-slate-800/95 backdrop-blur-sm">
      {/* Accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-400" />
      <div className="px-8 pt-6 pb-2">
        <h2 className="text-2xl font-semibold text-slate-100 text-center">
          {heading}
        </h2>
        <p className="text-slate-400 text-sm text-center mt-1">
          {subtext}
        </p>
      </div>

      <div className="px-8 py-6">
        {isReset ? (
          <ForgotPasswordForm onBack={() => setView('login')} />
        ) : isLogin ? (
          <LoginForm onSwitchToReset={() => setView('reset')} />
        ) : (
          <SignupForm />
        )}
      </div>

      {!isReset && (
        <div className="px-8 pb-8 pt-4 text-center border-t border-slate-600/80 bg-slate-900/50">
          <p className="text-sm text-slate-400">
            {isLogin ? (
              <>
                Don&apos;t have an account?{' '}
                <button type="button" onClick={() => setView('signup')} className="font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-2 focus:outline-none">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button type="button" onClick={() => setView('login')} className="font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-2 focus:outline-none">
                  Log in
                </button>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
