import React, { useState } from 'react';
import Logo from '../components/Logo';
import AuthHero from '../components/AuthHero';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ChefHat,
  HeartHandshake,
  Truck,
  ShieldCheck
} from 'lucide-react';

const roles = [
  { key: 'DONOR', title: 'Donor', icon: ChefHat },
  { key: 'NGO', title: 'NGO', icon: HeartHandshake },
  { key: 'VOLUNTEER', title: 'Volunteer', icon: Truck },
  { key: 'ADMIN', title: 'Admin', icon: ShieldCheck },
];

export default function LoginPage({ onLogin, onSwitchToSignup, onBackHome }) {
  const [role, setRole] = useState('DONOR');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Enter your email and password to continue.');
      return;
    }
    setError('');
    const inferredName = email.split('@')[0].replace(/[._]/g, ' ');
    const displayName = inferredName.charAt(0).toUpperCase() + inferredName.slice(1);
    onLogin(role, displayName, email);
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      <AuthHero mode="login" />

      {/* Form column */}
      <div className="flex-1 flex flex-col">
        {/* Compact mobile header (hero hidden below lg) */}
        <div className="lg:hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 px-5 pt-6 pb-8">
          <Logo size={38} textVariant="light" />
          <h1 className="text-xl font-black text-white mt-5 leading-snug">
            Welcome back to FoodLink 👋
          </h1>
          <p className="text-xs text-blue-200/80 mt-1">Log in to manage donations, matches & pickups.</p>
        </div>

        <div className="flex-1 flex items-center justify-center px-5 sm:px-10 py-10">
          <div className="w-full max-w-sm space-y-6">
            <button
              onClick={onBackHome}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to home
            </button>

            <div className="hidden lg:block">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Log in</h1>
              <p className="text-sm text-slate-500 mt-1">Select your role and sign in to continue.</p>
            </div>

            {/* Role picker */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">I am a...</label>
              <div className="grid grid-cols-4 gap-2">
                {roles.map(r => {
                  const Icon = r.icon;
                  const active = role === r.key;
                  return (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setRole(r.key)}
                      className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border text-center transition-all ${
                        active ? 'border-blue-600 bg-blue-50/70 text-blue-700 shadow-xs' : 'border-slate-200 text-slate-500 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px] font-bold">{r.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full text-sm font-medium pl-10 pr-3.5 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPw ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full text-sm font-medium pl-10 pr-10 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(s => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">
                  {error}
                </p>
              )}

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  Remember me
                </label>
                <button type="button" className="font-bold text-blue-600 hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-3.5 rounded-2xl text-sm font-bold shadow-md shadow-blue-500/20 transition-all"
              >
                <span>Log in as {role.charAt(0) + role.slice(1).toLowerCase()}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="text-center text-xs text-slate-500">
              Don't have an account?{' '}
              <button onClick={onSwitchToSignup} className="font-bold text-blue-600 hover:underline">
                Sign up
              </button>
            </p>

            <button
              onClick={onBackHome}
              className="lg:hidden w-full text-center text-xs font-bold text-slate-400 hover:text-slate-700 pt-1"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
