import React from 'react';
import { Tag } from 'lucide-react';

// Consistent "ID badge" used instead of raw "#FL1024" strings across the app.
export default function IdTag({ id, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400 ${className}`}>
      <Tag className="w-2.5 h-2.5" />
      {id}
    </span>
  );
}
