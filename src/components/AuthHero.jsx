import React from 'react';
import Logo from './Logo';
import {
  Utensils,
  HeartHandshake,
  Truck,
  Soup,
  ShieldCheck,
  Sparkles,
  PackageOpen,
  HandHeart
} from 'lucide-react';

const cards = [
  { icon: PackageOpen, label: 'Donate Food', tint: 'bg-blue-500/15 text-blue-100 border-blue-300/20' },
  { icon: HeartHandshake, label: 'Get Matched', tint: 'bg-cyan-500/15 text-cyan-100 border-cyan-300/20' },
  { icon: Truck, label: 'Fast Pickup', tint: 'bg-indigo-500/15 text-indigo-100 border-indigo-300/20' },
  { icon: Soup, label: 'Feed Families', tint: 'bg-emerald-500/15 text-emerald-100 border-emerald-300/20' },
  { icon: ShieldCheck, label: 'Verified NGOs', tint: 'bg-amber-500/15 text-amber-100 border-amber-300/20' },
  { icon: HandHeart, label: 'Zero Waste', tint: 'bg-rose-500/15 text-rose-100 border-rose-300/20' },
];

// Full-height creative showcase panel shown alongside the Login / Sign up forms.
// Built entirely from original iconography + typography (no external imagery),
// so it stays crisp, on-brand, and license-clean at any screen size.
export default function AuthHero({ mode = 'login' }) {
  return (
    <div className="relative hidden lg:flex lg:w-[46%] xl:w-[42%] flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 px-10 py-10 xl:px-14 xl:py-12">
      {/* Decorative glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
        backgroundSize: '22px 22px'
      }} />

      {/* Top: brand */}
      <div className="relative z-10">
        <Logo size={44} textVariant="light" />
      </div>

      {/* Middle: headline + bento icon grid */}
      <div className="relative z-10 space-y-8 py-8">
        <div className="space-y-3 max-w-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold text-blue-100 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Cloud-native food rescue
          </div>
          <h2 className="text-3xl xl:text-4xl font-black text-white leading-[1.15]">
            {mode === 'login'
              ? <>Welcome back to a network that turns surplus into <span className="text-cyan-300">someone's dinner.</span></>
              : <>Join the network that turns surplus into <span className="text-cyan-300">someone's dinner.</span></>}
          </h2>
          <p className="text-sm text-blue-200/80 leading-relaxed">
            Donors, NGOs, and volunteers coordinate in real time — matched by proximity, dispatched instantly, tracked end to end.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-md">
          {cards.map(({ icon: Icon, label, tint }) => (
            <div
              key={label}
              className={`flex flex-col items-start gap-3 rounded-2xl border p-4 backdrop-blur-sm ${tint}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-bold leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: live counter strip */}
      <div className="relative z-10 flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm px-5 py-4">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg shrink-0">
          🍱
        </div>
        <div>
          <span className="text-lg font-extrabold text-white block leading-none">12,482+</span>
          <span className="text-[11px] text-blue-200/70 font-medium">meals rescued from waste and counting</span>
        </div>
      </div>
    </div>
  );
}
