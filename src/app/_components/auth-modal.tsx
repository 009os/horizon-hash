'use client';

import { useState } from 'react';
import LoginForm from './login-form';
import SignupForm from './signup-form';

export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-lg p-8 shadow-2xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-formal text-white mb-2 tracking-wide">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-gray-400 text-sm font-light tracking-wide uppercase">
          {isLogin ? 'Login to explore blogs' : 'Sign up to get started'}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex bg-black/40 border border-gray-800/50 rounded-md p-1">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 px-6 rounded-md font-medium text-sm transition-all duration-300 tracking-wide ${
              isLogin
                ? 'bg-gray-900/80 text-white border border-gray-700/50 shadow-inner'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 px-6 rounded-md font-medium text-sm transition-all duration-300 tracking-wide ${
              !isLogin
                ? 'bg-gray-900/80 text-white border border-gray-700/50 shadow-inner'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {isLogin ? <LoginForm /> : <SignupForm />}
    </div>
  );
}

