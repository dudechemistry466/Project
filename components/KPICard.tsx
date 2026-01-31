
import React from 'react';
import { COLORS } from '../constants';

interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  color?: string;
}

const KPICard: React.FC<KPICardProps> = ({ label, value, unit, color = COLORS.SURGICAL_BLUE }) => {
  return (
    <div className="border border-zinc-800 bg-[#0f0f0f] p-4 flex flex-col justify-between h-32 relative overflow-hidden group">
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-zinc-700 pointer-events-none group-hover:border-[#00f2ff] transition-colors"></div>
      
      <span className="text-xs font-bold text-zinc-500 tracking-widest uppercase">
        {label}
      </span>
      
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold tracking-tighter" style={{ color }}>
          {value}
        </span>
        {unit && <span className="text-sm text-zinc-600 font-bold">{unit}</span>}
      </div>

      <div className="mt-2 h-1 bg-zinc-900 overflow-hidden">
        <div 
          className="h-full transition-all duration-1000" 
          style={{ width: typeof value === 'number' ? `${Math.min(value, 100)}%` : '40%', backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default KPICard;
