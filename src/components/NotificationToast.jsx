import React, { useEffect } from 'react';
import { Bell, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function NotificationToast({ notification, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    info: <Bell className="w-5 h-5 text-blue-500" />,
    status: <Info className="w-5 h-5 text-indigo-500" />
  };

  return (
    <div className="fixed top-16 sm:top-20 inset-x-4 sm:inset-x-auto sm:right-6 z-50 animate-bounce-short">
      <div className="flex items-start gap-3 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/10 w-full sm:max-w-sm sm:w-auto">
        <div className="p-2 bg-slate-50 rounded-xl">
          {icons[notification.type] || icons.info}
        </div>
        <div className="flex-1 pr-2">
          <h4 className="text-xs font-bold text-slate-900">{notification.title}</h4>
          <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{notification.message}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
