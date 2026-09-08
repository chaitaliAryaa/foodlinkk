import React from 'react';
import { ArrowLeft, CheckCircle2, Clock, MapPin, Truck, ChevronRight } from 'lucide-react';
import IdTag from '../components/IdTag';

export default function TrackingPage({ donation, onAdvanceStatus, onBack }) {
  if (!donation) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-4">
        <p className="text-sm font-semibold text-slate-500">No donation to track yet.</p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>
      </div>
    );
  }

  const stages = [
    { key: 'AVAILABLE', label: 'AVAILABLE', desc: 'Posted & matched with an NGO' },
    { key: 'CLAIMED', label: 'CLAIMED', desc: `Reserved by ${donation.matchedNgo || 'a nearby NGO'}` },
    { key: 'PICKUP', label: 'PICKUP', desc: 'Volunteer on route' },
    { key: 'DELIVERED', label: 'DELIVERED', desc: 'Meals safely distributed' }
  ];

  const currentIdx = stages.findIndex(s => s.key === donation.status) === -1 ? 0 : stages.findIndex(s => s.key === donation.status);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Feed</span>
        </button>
        <span className="text-xs font-mono font-bold text-slate-400">
          Donation <IdTag id={donation.id} className="text-slate-500" />
        </span>
      </div>

      {/* Main Stepper Card */}
      <div className="bento-card p-6 sm:p-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
              Live Microservices Order Pipeline
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{donation.name}</h2>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
              <span>🍱 {donation.quantity} Meals</span>
              <span>•</span>
              <span>{donation.location}</span>
            </div>
          </div>
          <div className="px-3.5 py-1.5 rounded-2xl bg-blue-50 border border-blue-200 self-start sm:self-auto">
            <span className="text-xs font-bold text-blue-700">Stage: {donation.status}</span>
          </div>
        </div>

        {/* Animated Progress Timeline Line */}
        <div className="relative py-4">
          <div className="hidden sm:block absolute top-1/2 left-4 right-4 h-1 bg-slate-200 -translate-y-1/2 z-0" />
          
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-4 gap-4">
            {stages.map((stage, idx) => {
              const isPast = idx < currentIdx;
              const isCurrent = idx === currentIdx;
              return (
                <div key={stage.key} className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 text-left sm:text-center">
                  
                  {/* Step Bubble */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isPast ? 'bg-emerald-600 text-white shadow-xs' :
                    isCurrent ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse' :
                    'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}>
                    {isPast ? '✓' : isCurrent ? (stage.key === 'PICKUP' ? '🚚' : '●') : (idx + 1)}
                  </div>
                  <div>
                    <h4 className={`text-xs font-extrabold tracking-tight ${isCurrent ? 'text-blue-700' : 'text-slate-800'}`}>
                      {stage.label}
                    </h4>
                    <p className="text-[10px] text-slate-400 hidden sm:block">{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Presentation Stage Advancement Buttons */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[11px] font-bold text-slate-700 block">Demonstration Controller:</span>
            <span className="text-[10px] text-slate-500">Advance status manually to demonstrate event propagation across services</span>
          </div>
          <div className="flex items-center flex-wrap gap-2">
            {stages.map((stage, idx) => (
              <button
                key={stage.key}
                onClick={() => onAdvanceStatus(donation.id, stage.key)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                  donation.status === stage.key 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {stage.key}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
