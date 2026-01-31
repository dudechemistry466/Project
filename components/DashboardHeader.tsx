
import React from 'react';

interface DashboardHeaderProps {
  utcTime: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ utcTime }) => {
  return (
    <header className="mb-8 border-b-2 border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-3 h-12 bg-[#00f2ff] shadow-[0_0_15px_rgba(0,242,255,0.5)]"></div>
        <div>
          <h1 className="text-4xl font-bold tracking-[0.25em] text-[#e5e5e5] uppercase leading-none">
            CRYO-ARGO
          </h1>
          <div className="text-xs font-bold tracking-[0.4em] text-zinc-500 mt-1 uppercase">
            Global Command Center
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end">
        <div className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-1">
          System Time (Synchronized)
        </div>
        <div className="text-3xl font-bold text-[#00f2ff] tabular-nums tracking-widest glow-blue font-mono">
          {utcTime || '00:00:00 UTC'}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
