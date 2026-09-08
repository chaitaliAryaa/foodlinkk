import React, { useState } from 'react';
import { PlusCircle, Clock, ArrowUpRight, Trash2 } from 'lucide-react';
import MealSymbol from '../components/MealSymbol';
import IdTag from '../components/IdTag';

export default function DonorDashboard({ currentUser, donations, onOpenDonate, onDeleteDonation, onTrackDonation }) {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const donorDonations = donations;

  const mealsRescued = donorDonations
    .filter(d => d.status === 'DELIVERED')
    .reduce((sum, d) => sum + d.quantity, 0);
  const activeInFlight = donorDonations.filter(d => d.status === 'CLAIMED' || d.status === 'PICKUP').length;

  return (
    <div className="space-y-6">

      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Donor Control Center</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Good afternoon, {currentUser.name} 👋
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Your surplus food feeds families. Real-time microservices dispatch matched NGOs instantly.
          </p>
        </div>
        <button
          onClick={onOpenDonate}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-sm shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Donate Food</span>
        </button>
      </div>

      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bento-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Donations</span>
            <span className="text-lg">📦</span>
          </div>
          <p className="text-3xl font-black text-slate-900 mt-2">{donorDonations.length}</p>
          <span className="text-[11px] font-medium text-emerald-600 mt-1 block">Currently listed by you</span>
        </div>
        <div className="bento-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Meals Rescued</span>
            <span className="text-lg">🍱</span>
          </div>
          <p className="text-3xl font-black text-blue-600 mt-2">{mealsRescued}</p>
          <span className="text-[11px] font-medium text-slate-500 mt-1 block">Direct to verified shelters</span>
        </div>
        <div className="bento-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active In-Flight</span>
            <span className="text-lg">🚚</span>
          </div>
          <p className="text-3xl font-black text-amber-500 mt-2">{activeInFlight}</p>
          <span className="text-[11px] font-medium text-amber-600 mt-1 block">Live pickup & matching</span>
        </div>
      </div>

      {/* Recent Donations List Section */}
      <div className="bento-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">Recent Donations</h3>
          <span className="text-xs text-slate-400 font-medium">Auto-synced with Food Service :8002</span>
        </div>

        {donorDonations.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm font-semibold text-slate-500">No active donations yet.</p>
            <button onClick={onOpenDonate} className="mt-3 text-xs font-bold text-blue-600 hover:underline">
              Post your first donation →
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {donorDonations.map((item) => (
              <div
                key={item.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 px-2 rounded-2xl transition-colors"
              >
                <div className="flex items-start gap-3">
                  <MealSymbol name={item.name} foodType={item.foodType} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{item.name}</span>
                      <IdTag id={item.id} />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="font-semibold text-blue-700">🍱 {item.quantity} meals</span>
                      <span>•</span>
                      <span>{item.foodType}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Until {item.availableUntil}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                    item.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                    item.status === 'CLAIMED' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                    item.status === 'PICKUP' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {item.status}
                  </span>
                  <button
                    onClick={() => onTrackDonation(item.id)}
                    className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 transition-colors"
                  >
                    <span>Track</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>

                  {confirmDeleteId === item.id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => { onDeleteDonation(item.id); setConfirmDeleteId(null); }}
                        className="text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-2.5 py-1.5 rounded-xl transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2 py-1.5"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(item.id)}
                      title="Delete donation"
                      className="flex items-center justify-center w-8 h-8 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
