import React, { useState } from 'react';
import { X, Check, Sparkles, MapPin, Clock, ChefHat, ArrowRight } from 'lucide-react';

export default function DonateModal({ onClose, onCreateDonation, currentUser, servicesHealth, onNavigateToTracking }) {
  // Form State
  const [foodName, setFoodName] = useState('Vegetable Biryani');
  const [quantity, setQuantity] = useState(35);
  const [foodType, setFoodType] = useState('Vegetarian');
  const [availableUntil, setAvailableUntil] = useState('08:30 PM');
  const [location, setLocation] = useState('Central Community Banquet Hall');
  const [description, setDescription] = useState('Freshly prepared gourmet meals, kept in temperature-controlled chafing dishes.');

  // Animation Sequence Stage: 'form' -> 'submitting' -> 'matching' -> 'matched'
  const [stage, setStage] = useState('form');
  const [createdDonationId, setCreatedDonationId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStage('submitting');
    const newId = `FL${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedDonationId(newId);

    // Step 1: Simulate saving via Food Service
    setTimeout(() => {
      setStage('matching');
      // Step 2: Simulate Matching Service algorithm
      setTimeout(() => {
        setStage('matched');
        // Commit to state
        onCreateDonation({
          id: newId,
          name: foodName,
          quantity: Number(quantity),
          foodType,
          location,
          distanceKm: 2.4,
          availableUntil,
          status: 'AVAILABLE',
          donorName: currentUser?.name || 'A donor',
          claimedBy: null,
          matchedNgo: 'Hope Foundation',
          matchedKm: 2.4,
          createdAt: 'Just now',
        });
      }, 1400);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <h3 className="text-sm font-bold text-slate-900">
              {stage === 'form' ? 'Step 1 • Create a Food Donation' : 'Microservices Matching'}
            </h3>
          </div>
          {stage === 'form' && (
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Stage: Form */}
        {stage === 'form' && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Food Name</label>
              <input
                type="text"
                required
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="e.g. Vegetable Biryani & Raita"
                className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Quantity (Meals)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Food Type</label>
                <div className="flex rounded-xl border border-slate-200 p-0.5 bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setFoodType('Vegetarian')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      foodType === 'Vegetarian' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Veg 🌱
                  </button>
                  <button
                    type="button"
                    onClick={() => setFoodType('Non-Vegetarian')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      foodType === 'Non-Vegetarian' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Non-Veg 🍗
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Available Until</label>
                <input
                  type="text"
                  value={availableUntil}
                  onChange={(e) => setAvailableUntil(e.target.value)}
                  placeholder="08:30 PM"
                  className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Pickup Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="📍 Select pickup address"
                  className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Freshly prepared food details..."
                className="w-full text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-3 rounded-2xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Create Donation →</span>
              </button>
            </div>
          </form>
        )}

        {/* Stage: Submitting / Finding Nearby Organizations Animation */}
        {(stage === 'submitting' || stage === 'matching') && (
          <div className="p-10 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 animate-pulse">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-black text-slate-900">
                {stage === 'submitting' ? 'Food Service Saving...' : 'Matching Service Running...'}
              </h4>
              <p className="text-xs text-slate-500">
                Finding nearby NGOs within 5 km radius...
              </p>
            </div>
            {/* Pulsing Dots */}
            <div className="flex items-center justify-center gap-2 py-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}

        {/* Stage: Matched! Presentation Money Moment */}
        {stage === 'matched' && (
          <div className="p-8 text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold shadow-inner">
              ✓
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-black text-slate-900">Donation Created!</h4>
              <p className="text-xs text-slate-600 font-medium">
                <span className="font-bold text-blue-600">{quantity} meals</span> are now available in the network.
              </p>
            </div>

            {/* Matched NGO Card */}
            <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">
                  MATCH FOUND 🎉
                </span>
                <span className="text-xs font-extrabold text-slate-900">2.4 km away</span>
              </div>
              <h5 className="text-sm font-bold text-slate-900">Hope Foundation</h5>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Volunteers ready for dispatch • Vehicle capacity: 50 meals
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToTracking(createdDonationId);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-3 rounded-2xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>View Match & Track →</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
