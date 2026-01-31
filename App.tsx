
import React, { useState, useEffect } from 'react';
import DashboardHeader from './components/DashboardHeader';
import KPICard from './components/KPICard';
import ShipmentTable from './components/ShipmentTable';
import { INITIAL_SHIPMENTS, COLORS } from './constants';
import { Shipment } from './types';

const App: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [utcTime, setUtcTime] = useState<string>('');

  // Digital Clock Logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setUtcTime(now.toUTCString().split(' ')[4] + ' UTC');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Industrial Sensor Simulation: Smooth Temperature Fluctuation
  useEffect(() => {
    const tempInterval = setInterval(() => {
      setShipments(prev => prev.map(s => {
        // Deterministic drift combined with minor random jitter for realism
        const drift = Math.sin(Date.now() / 3000) * 0.4;
        const jitter = (Math.random() - 0.5) * 0.15;
        
        let newTemp = s.temperature + drift + jitter;
        
        // Strict enforcement of the 0°C to 20°C operational range
        newTemp = Math.max(0, Math.min(20, newTemp));

        return {
          ...s,
          temperature: newTemp
        };
      }));
    }, 400);

    return () => clearInterval(tempInterval);
  }, []);

  const criticalCount = shipments.filter(s => s.temperature > 8.0).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] flex flex-col p-6 md:p-10 relative overflow-hidden font-mono selection:bg-[#00f2ff] selection:text-black">
      {/* Visual Scanning Effect Overlay */}
      <div className="scanline" />

      {/* Primary Navigation / Branding */}
      <DashboardHeader utcTime={utcTime} />

      {/* Fleet Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <KPICard 
          label="Active Payload Units" 
          value={shipments.length} 
          unit="FLEET"
        />
        <KPICard 
          label="Thermal Breach Alerts" 
          value={criticalCount} 
          color={criticalCount > 0 ? COLORS.DANGER_RED : COLORS.SURGICAL_BLUE}
          unit="CRITICAL"
        />
        <KPICard 
          label="Cryo-Battery Capacity" 
          value={98.7} 
          unit="%"
          color={COLORS.EMERGENCY_AMBER}
        />
      </div>

      {/* Real-time Logistics Stream */}
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-6 border-l-4 border-[#ff8c00] pl-4">
          <div className="flex flex-col">
            <h2 className="text-sm font-bold tracking-[0.3em] text-zinc-300 uppercase">
              Vaccine Transit Matrix
            </h2>
            <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1">
              Active Oncology Shipments (ISO-9001 Protocol)
            </span>
          </div>
          
          <div className="hidden md:flex gap-6 items-center">
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-[#00f2ff] animate-pulse"></div>
               <span className="text-[10px] text-zinc-500 font-bold tracking-widest">ENCRYPTED UP-LINK</span>
             </div>
             <div className="w-[1px] h-4 bg-zinc-800"></div>
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-zinc-700"></div>
               <span className="text-[10px] text-zinc-500 font-bold tracking-widest">SENSORS NOMINAL</span>
             </div>
          </div>
        </div>
        
        <ShipmentTable shipments={shipments} />
      </div>

      {/* System Authorization Footer */}
      <footer className="mt-12 pt-6 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-700 font-bold tracking-[0.2em] uppercase">
        <div>
          SECURITY LEVEL: <span className="text-zinc-500">OMEGA-4</span> | AUTHORIZATION: <span className="text-zinc-500">REQUIRED</span>
        </div>
        <div className="flex items-center gap-6">
          <span>&copy; 2024 CRYO-ARGO SYSTEMICS</span>
          <div className="w-1 h-1 bg-zinc-800 rounded-full"></div>
          <span className="text-[#00f2ff] opacity-50">V. 4.92.1-BETA</span>
        </div>
      </footer>

      {/* Decorative Structural Borders */}
      <div className="fixed top-0 left-0 w-1 h-full bg-zinc-900/30 border-r border-zinc-800/10 pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-1 h-full bg-zinc-900/30 border-l border-zinc-800/10 pointer-events-none"></div>
    </div>
  );
};

export default App;
