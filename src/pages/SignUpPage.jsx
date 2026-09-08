import React, { useState } from 'react';
import Logo from '../components/Logo';
import AuthHero from '../components/AuthHero';
import {
  User,
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
  { key: 'DONOR', title: 'Donor', icon: ChefHat, desc: 'Restaurants, hostels, caterers' },
  { key: 'NGO', title: 'NGO', icon: HeartHandshake, desc: 'Shelters, soup kitchens' },
  { key: 'VOLUNTEER', title: 'Volunteer', icon: Truck, desc: 'Pickup & distribution' },
  { key: 'ADMIN', title: 'Admin', icon: ShieldCheck, desc: 'Microservices & health' },
];

export default function SignUpPage({ onSignup, onSwitchToLogin, onBackHome }) {
  const [role, setRole] = useState('DONOR');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Fill in your name, email, and password to continue.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    onSignup(role, name, email);
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      <AuthHero mode="signup" />

      <div className="flex-1 flex flex-col">
        {/* Compact mobile header (hero hidden below lg) */}
        <div className="lg:hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 px-5 pt-6 pb-8">
          <Logo size={38} textVariant="light" />
          <h1 className="text-xl font-black text-white mt-5 leading-snug">
            Join the food rescue network 🍱
          </h1>
          <p className="text-xs text-blue-200/80 mt-1">Create an account to donate, match, or dispatch.</p>
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
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Create your account</h1>
              <p className="text-sm text-slate-500 mt-1">Join the community food rescue network.</p>
            </div>

            {/* Role picker */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Who are you?</label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map(r => {
                  const Icon = r.icon;
                  const active = role === r.key;
                  return (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setRole(r.key)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        active ? 'border-blue-600 bg-blue-50/70 shadow-xs' : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1.5 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span className="text-xs font-extrabold text-slate-900 block">{r.title}</span>
                      <span className="text-[10px] text-slate-400 line-clamp-1">{r.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Full name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Chaitali Sharma"
                    className="w-full text-sm font-medium pl-10 pr-3.5 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden"
                  />
                </div>
              </div>

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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPw ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-sm font-medium pl-9 pr-8 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(s => !s)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Confirm</label>
                  <input
                    type={showPw ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-sm font-medium px-3.5 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden"
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-3.5 rounded-2xl text-sm font-bold shadow-md shadow-blue-500/20 transition-all mt-1"
              >
                <span>Create {role.charAt(0) + role.slice(1).toLowerCase()} account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="text-center text-xs text-slate-500">
              Already have an account?{' '}
              <button onClick={onSwitchToLogin} className="font-bold text-blue-600 hover:underline">
                Log in
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
