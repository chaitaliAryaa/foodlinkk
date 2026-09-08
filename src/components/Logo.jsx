import React from 'react';

export default function Logo({ size = 42, showText = true, textVariant = 'dark', className = '' }) {
  return (
    <div className={`flex items-center gap-3 select-none cursor-pointer ${className}`}>
      {/* Hand-Drawn Platter with Heart Icon */}
      <div 
        style={{ width: size, height: size }} 
        className="relative flex items-center justify-center p-1 bg-blue-50 rounded-2xl border border-blue-200/80 shadow-sm shadow-blue-500/10 group-hover:scale-105 transition-transform"
      >
        <svg
          viewBox="0 0 200 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-blue-600 drop-shadow-sm"
        >
          {/* Suited Sleeve */}
          <path
            d="M 60 170 L 108 178 L 88 226 L 40 218 Z"
            fill="#1D4ED8"
            stroke="#1E40AF"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* White Shirt Cuff */}
          <path
            d="M 72 165 L 112 172 L 105 184 L 65 177 Z"
            fill="#F8FAFC"
            stroke="#1E40AF"
            strokeWidth="4"
          />
          {/* Cufflink */}
          <circle cx="88" cy="177" r="3.5" fill="#1E40AF" />
          {/* Palm & Fingers reaching up to support the tray */}
          <path
            d="M 82 165 C 75 140, 72 125, 70 115 
               C 70 110, 80 110, 82 118 
               C 88 108, 98 108, 100 118 
               C 106 110, 116 112, 116 122 
               C 122 116, 132 120, 128 132
               C 120 148, 105 156, 100 168 Z"
            fill="#EFF6FF"
            stroke="#1D4ED8"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Outer Platter Ellipse */}
          <ellipse
            cx="100"
            cy="90"
            rx="58"
            ry="24"
            fill="#DBEAFE"
            stroke="#1D4ED8"
            strokeWidth="6"
          />
          {/* Inner Platter Rim / Food Dome Contour */}
          <ellipse
            cx="100"
            cy="90"
            rx="36"
            ry="13"
            fill="#BFDBFE"
            stroke="#1E40AF"
            strokeWidth="4.5"
          />
          {/* The Heart on top of the plate */}
          <path
            d="M 100 86 
               C 98 84, 82 66, 82 52 
               C 82 40, 92 32, 100 42 
               C 108 32, 118 40, 118 52 
               C 118 66, 102 84, 100 86 Z"
            fill="#1D4ED8"
            stroke="#1E3A8A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Heart Accent Shimmer */}
          <path
            d="M 89 44 C 85 46, 85 52, 88 56"
            stroke="#93C5FD"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span className={`text-xl font-black tracking-tight ${textVariant === 'light' ? 'text-white' : 'text-slate-900'}`}>
              Food<span className="text-blue-600">Link</span>
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-blue-100 text-blue-700 rounded-full border border-blue-200">
              Cloud
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 tracking-tight">
            Microservices Food Rescue
          </span>
        </div>
      )}
    </div>
  );
}
