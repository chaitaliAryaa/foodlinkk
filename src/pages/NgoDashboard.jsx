import React from 'react';
import { MapPin, Clock, CheckCircle2, ChevronRight, Truck } from 'lucide-react';
import IdTag from '../components/IdTag';

export default function NgoDashboard({ donations, onClaimFood, onTrackDonation }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">NGO & Volunteer Dispatch</span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Available Near You</h1>
        <p className="text-xs text-slate-500 mt-1">
          Pick up surplus meals from local donors. Claim to reserve food and generate a pickup token.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((item) => (
          <div 
            key={item.id} 
            className="bento-card p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🍛</span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">{item.name}</h3>
                    <IdTag id={item.id} />
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  item.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700' :
                  item.status === 'CLAIMED' ? 'bg-blue-100 text-blue-700' :
                  item.status === 'PICKUP' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {item.status}
                </span>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-2xl space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>🍱 {item.quantity} meals</span>
                  <span className="text-emerald-700 font-semibold">{item.foodType}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>📍 {item.distanceKm} km away ({item.location})</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>⏰ Available until {item.availableUntil}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              {item.status === 'AVAILABLE' ? (
                <button
                  onClick={() => onClaimFood(item.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2.5 rounded-xl text-xs font-bold shadow-sm shadow-blue-500/20 transition-all"
                >
                  [ Claim Food ]
                </button>
              ) : (
                <button
                  onClick={() => onTrackDonation(item.id)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
                >
                  <span>Track Status ({item.status})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
