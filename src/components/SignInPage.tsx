// src/components/SignInPage.tsx
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

interface SignInPageProps {
  onSignIn: (email: string, password: string) => void;
  onCreateAccount: () => void;
}

function AuraFlowLogo() {
  return (
    <div className="relative w-20 h-20">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="logoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="logoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#logoGrad1)" strokeWidth="3" opacity="0.3" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="url(#logoGrad2)" strokeWidth="2" opacity="0.6" />
        <circle cx="50" cy="50" r="18" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.8" />

        <path
          d="M50 35 L52 45 L62 45 L54 52 L57 62 L50 55 L43 62 L46 52 L38 45 L48 45 Z"
          fill="url(#logoGrad1)"
        />

        <circle cx="35" cy="35" r="4" fill="#10b981" opacity="0.8" />
        <circle cx="65" cy="35" r="4" fill="#06b6d4" opacity="0.8" />
        <circle cx="35" cy="65" r="4" fill="#8b5cf6" opacity="0.8" />
        <circle cx="65" cy="65" r="4" fill="#ec4899" opacity="0.8" />
      </svg>
    </div>
  );
}

export function SignInPage({ onSignIn, onCreateAccount }: SignInPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <AuraFlowLogo />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent mb-2">
              InterLink
            </h1>
            <p className="text-cyan-300/70 text-sm"> Safety and Community All in One</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cyan-100 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400/60" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-xl text-white placeholder-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-cyan-100 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400/60" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-xl text-white placeholder-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400/60 hover:text-cyan-400 transition-all"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-slate-900/50 border-cyan-500/20 text-cyan-500 focus:ring-cyan-500/40"
                />
                <span className="text-cyan-300/70">Remember me</span>
              </label>
              <button type="button" className="text-cyan-400 hover:text-cyan-300 transition-all">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            <span className="text-cyan-400/60 text-sm">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          </div>

          <button
            onClick={onCreateAccount}
            className="w-full py-3 bg-slate-900/50 hover:bg-slate-900/70 border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-100 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Create New Account
          </button>

          <div className="mt-8 pt-6 border-t border-cyan-500/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
                <p className="text-xs text-cyan-300/70">Live Alerts</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-xs text-cyan-300/70">Find Friends</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                </div>
                <p className="text-xs text-cyan-300/70">Share Photos</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-cyan-400/50 text-xs mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
