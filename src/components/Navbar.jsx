import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import {
  PlusCircle,
  Activity,
  ShieldCheck,
  HeartHandshake,
  ChefHat,
  Menu,
  X,
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function Navbar({
  currentPage,
  setCurrentPage,
  currentUser,
  onLoginClick,
  onSignupClick,
  onLogout,
  onOpenDonate,
  servicesHealth
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const healthyCount = Object.values(servicesHealth).filter(Boolean).length;
  const totalServices = Object.keys(servicesHealth).length;

  const navItems = [
    { key: 'landing', label: 'Overview', icon: null },
    { key: 'donor', label: 'Donor Hub', icon: ChefHat },
    { key: 'ngo', label: 'NGO / Volunteer', icon: HeartHandshake },
    { key: 'tracking', label: 'Live Tracking', icon: Activity },
    { key: 'admin', label: 'System Health', icon: ShieldCheck, badge: `${healthyCount}/${totalServices}` },
  ];

  const handleNavClick = (key) => {
    setCurrentPage(key);
    setIsMenuOpen(false);
  };

  // Close the profile dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">

        {/* Brand Logo */}
        <div onClick={() => handleNavClick('landing')} className="cursor-pointer shrink-0">
          <div className="sm:hidden">
            <Logo size={36} showText={true} />
          </div>
          <div className="hidden sm:block">
            <Logo size={46} showText={true} />
          </div>
        </div>

        {/* Navigation Tabs (desktop) */}
        <nav className="hidden md:flex items-center p-1 bg-slate-100/80 rounded-2xl border border-slate-200/60">
          <button
            onClick={() => handleNavClick('landing')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentPage === 'landing' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleNavClick('donor')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentPage === 'donor' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            Donor Hub
          </button>
          <button
            onClick={() => handleNavClick('ngo')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentPage === 'ngo' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            NGO / Volunteer
          </button>
          <button
            onClick={() => handleNavClick('tracking')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentPage === 'tracking' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Live Tracking
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentPage === 'admin' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            System Health
            <span className={`ml-1 px-1.5 py-0.2 text-[9px] rounded-full font-bold ${
              healthyCount === totalServices ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700 animate-pulse'
            }`}>
              {healthyCount}/{totalServices}
            </span>
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            onClick={onOpenDonate}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-2.5 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs font-bold transition-all shadow-sm shadow-blue-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Donate Food</span>
          </button>

          {currentUser ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(prev => !prev)}
                className="flex items-center gap-2 p-1.5 sm:pr-2.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl sm:rounded-2xl border border-slate-200 cursor-pointer transition-colors"
                aria-expanded={isProfileOpen}
              >
                <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</span>
                  <span className="text-[10px] font-semibold text-blue-600 uppercase">{currentUser.role}</span>
                </div>
                <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 animate-fade-in">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <span className="text-xs font-bold text-slate-900 block">{currentUser.name}</span>
                    <span className="text-[10px] text-slate-400">{currentUser.email}</span>
                  </div>
                  <button
                    onClick={() => { setIsProfileOpen(false); onLogout(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={onLoginClick}
                className="px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={onSignupClick}
                className="px-3.5 py-2 rounded-2xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMenuOpen(prev => !prev)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200/80 transition-colors shrink-0"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 animate-fade-in">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                </span>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 text-[9px] rounded-full font-bold ${
                    healthyCount === totalServices ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 mt-2 border-t border-slate-100">
            {currentUser ? (
              <button
                onClick={() => { setIsMenuOpen(false); onLogout(); }}
                className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            ) : (
              <div className="flex items-center gap-2 px-1">
                <button
                  onClick={() => { setIsMenuOpen(false); onLoginClick(); }}
                  className="flex-1 px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-700 border border-slate-200"
                >
                  Log In
                </button>
                <button
                  onClick={() => { setIsMenuOpen(false); onSignupClick(); }}
                  className="flex-1 px-3.5 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
