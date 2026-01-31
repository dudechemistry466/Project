
import React, { useState, useEffect, useCallback } from 'react';
import DashboardHeader from './components/DashboardHeader';
import KPICard from './components/KPICard';
import ShipmentTable from './components/ShipmentTable';
import { INITIAL_SHIPMENTS, COLORS } from './constants';
import { Shipment } from './types';

const App: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [utcTime, setUtcTime] = useState<string>('');
  const [tick, setTick] = useState(0);

  // Update Clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setUtcTime(now.toUTCString().split(' ')[4] + ' UTC');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update Temperatures (Simulation logic)
  useEffect(() => {
    const tempInterval = setInterval(() => {
      setShipments(prev => prev.map(s => {
        // Create a smooth fluctuation using sin wave + small random jitter
        const jitter = (Math.random() - 0.5) * 0.2;
        const drift = Math.sin(Date.now() / 2000) * 0.5;
        
        // Ensure some shipments naturally stay near the 8 degree mark to show transitions
        let newTemp = s.temperature + jitter + drift * 0.1;
        
        // Clamp between 0 and 20 as requested
        newTemp = Math.max(0, Math.min(20, newTemp));

        return {
          ...s,
          temperature: newTemp
        };
      }));
      setTick(t => t + 1);
    }, 500);

    return () => clearInterval(tempInterval);
  }, []);

  const criticalCount = shipments.filter(s => s.temperature > 8.0).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] flex flex-col p-4 md:p-8 relative overflow-hidden">
      {/* Decorative background scanline */}
      <div className="scanline" />

      {/* Top Header */}
      <header className="mb-8 border-b border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-[0.2em] text-[#e5e5e5] uppercase flex items-center gap-3">
            <span className="w-2 h-8 bg-[#00f2ff]"></span>
            CRYO-ARGO: GLOBAL COMMAND CENTER
          </h1>
          <p className="text-zinc-500 mt-2 text-xs font-bold tracking-widest uppercase opacity-60">
            System Protocol: ALPHA-V2 | Monitoring Active Global Payloads
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#00f2ff] tabular-nums tracking-widest glow-blue">
            {utcTime || 'INITIALIZING...'}
          </div>
          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter">
            Synchronized with Atomic Clock (LGO-1)
          </p>
        </div>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <KPICard 
          label="Total Payloads Active" 
          value={shipments.length} 
          unit="UNITS"
        />
        <KPICard 
          label="Critical Temperature Alerts" 
          value={criticalCount} 
          color={criticalCount > 0 ? COLORS.DANGER_RED : COLORS.SURGICAL_BLUE}
          unit="ACTIVE"
        />
        <KPICard 
          label="Fleet Battery Efficiency" 
          value={94.2} 
          unit="%"
          color={COLORS.EMERGENCY_AMBER}
        />
      </div>

      {/* Main Table Content */}
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold tracking-widest text-zinc-400 uppercase flex items-center gap-2">
            <span className="w-1 h-4 bg-[#ff8c00]"></span>
            Active Cancer Vaccine Shipments (LIVE)
          </h2>
          <div className="flex gap-4">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-[#00f2ff] animate-pulse"></div>
               <span className="text-[10px] text-zinc-600 font-bold">NETWORK STABLE</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
               <span className="text-[10px] text-zinc-600 font-bold">ENCRYPTED STREAM</span>
             </div>
          </div>
        </div>
        
        <ShipmentTable shipments={shipments} />
      </div>

      {/* Footer Branding */}
      <footer className="mt-8 pt-4 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-700 font-bold tracking-widest uppercase">
        <div>&copy; 2024 CRYO-ARGO LOGISTICS CORP.</div>
        <div className="flex gap-4">
          <span>SECURE ACCESS ONLY</span>
          <span className="text-zinc-800">|</span>
          <span>PROTOCOL 88-X-OMEGA</span>
        </div>
      </footer>

      {/* Decorative Frame Elements */}
      <div className="fixed bottom-0 left-0 w-32 h-1 bg-[#00f2ff] opacity-20"></div>
      <div className="fixed top-0 right-0 w-1 h-32 bg-[#ff8c00] opacity-10"></div>
    </div>
  );
};

export default App;
