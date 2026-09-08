import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import MealSymbol from '../components/MealSymbol';
import IdTag from '../components/IdTag';
import { 
  ArrowRight, 
  CheckCircle, 
  Heart, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Share2, 
  Cpu, 
  Layers
} from 'lucide-react';

export default function LandingPage({ onGetStarted, onDonateClick, onExploreFood, donations }) {
  const [mealsSaved, setMealsSaved] = useState(12000);

  // Counter animation on load
  useEffect(() => {
    const target = 12482;
    const interval = setInterval(() => {
      setMealsSaved(prev => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + 17;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10 pb-12">
      
      {/* Outer Bento Hero Capsule */}
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-b from-blue-50/80 via-white to-slate-50 border border-blue-100 p-8 sm:p-14 text-center shadow-sm">
        
        {/* Subtle decorative glow blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto space-y-6">
          
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 shadow-xs">
            <Logo size={24} showText={false} />
            <span className="text-xs font-bold text-blue-800 tracking-tight">
              Cloud-Native Microservices Food Rescue
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Turn surplus food into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">someone's meal.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            FoodLink connects hotels, hostels, and caterers with local NGOs and volunteers using independently deployable microservices hosted in the cloud.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onDonateClick}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-7 py-3.5 rounded-2xl text-sm font-bold shadow-lg shadow-blue-500/25 transition-all"
            >
              <span>Donate Food</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreFood}
              className="flex items-center gap-2 bg-white hover:bg-slate-100 active:scale-95 text-slate-800 border border-slate-200 px-7 py-3.5 rounded-2xl text-sm font-bold shadow-xs transition-all"
            >
              <span>Find Food Near You</span>
            </button>
          </div>

          {/* Live Dynamic Counter */}
          <div className="pt-6 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl border border-blue-100 shadow-sm">
              <span className="text-2xl">🍱</span>
              <div className="text-left">
                <span className="text-xl font-extrabold text-blue-700 tracking-tight">
                  {mealsSaved.toLocaleString()}
                </span>
                <span className="text-xs font-semibold text-slate-500 block">
                  meals rescued from waste
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Donor Experience */}
        <div className="bento-card p-6 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">👨‍🍳</span>
            </div>
            <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase">For Donors</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">Post in 30 Seconds</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Enter surplus meal quantity, location, and pickup deadline. Our automated matching immediately notifies nearby verified shelters.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
            <span>Try Donor Portal</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: NGO Proximity Matching */}
        <div className="bento-card p-6 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🤝</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 tracking-wider uppercase">For NGOs & Volunteers</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">Proximity-Based Match</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              The Matching Service computes real-time proximity (2.1 km away) and food capacity to dispatch volunteers before meals expire.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
            <span>Explore Active Feeds</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Cloud Microservices Architecture */}
        <div className="bento-card p-6 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">⚡</span>
            </div>
            <span className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase">Cloud & Docker</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">5 Isolated Microservices</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Decoupled User, Food, Matching, and Notification services communicate via an API Gateway and Redis pub/sub with MongoDB.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
            <span>Inspect System Health</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Featured Live Available Donations Showcase */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900">Live Rescue Stream</h2>
            <p className="text-xs text-slate-500">Real-time donations currently tracked across the cloud network</p>
          </div>
          <button 
            onClick={onExploreFood}
            className="text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            View all ({donations.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {donations.slice(0, 4).map(donation => (
            <div key={donation.id} className="bento-card overflow-hidden flex flex-col justify-between">
              <div className="relative h-28 w-full bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center">
                <MealSymbol name={donation.name} foodType={donation.foodType} size="lg" />
                <div className="absolute top-2.5 right-2.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                    donation.status === 'AVAILABLE' ? 'bg-emerald-500 text-white' :
                    donation.status === 'CLAIMED' ? 'bg-blue-600 text-white' :
                    donation.status === 'PICKUP' ? 'bg-amber-500 text-white' : 'bg-slate-700 text-white'
                  }`}>
                    {donation.status}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg bg-white/80 backdrop-blur-xs text-slate-700 text-[10px] font-semibold flex items-center gap-1 border border-slate-200/80">
                  <MapPin className="w-3 h-3 text-blue-600" />
                  <span>{donation.distanceKm} km away</span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-semibold text-blue-600">{donation.foodType}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {donation.availableUntil}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">{donation.name}</h4>
                  <p className="text-xs font-semibold text-slate-700 mt-1">🍱 {donation.quantity} Meals</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <IdTag id={donation.id} />
                  <span className="text-xs font-bold text-blue-600 hover:underline cursor-pointer" onClick={onExploreFood}>
                    Inspect →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
