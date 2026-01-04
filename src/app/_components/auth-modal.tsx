'use client';

import { useState } from 'react';
import LoginForm from './login-form';
import SignupForm from './signup-form';

export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-gray-400">
          {isLogin ? 'Login to explore blogs' : 'Sign up to get started'}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex bg-gray-800/50 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
              isLogin
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
              !isLogin
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
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

