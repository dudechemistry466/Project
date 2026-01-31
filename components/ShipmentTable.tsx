
import React from 'react';
import { Shipment } from '../types';
import { COLORS } from '../constants';

interface ShipmentTableProps {
  shipments: Shipment[];
}

const ShipmentTable: React.FC<ShipmentTableProps> = ({ shipments }) => {
  return (
    <div className="w-full overflow-hidden border-2 border-zinc-800 bg-[#0c0c0c] shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-zinc-900/50 border-b-2 border-zinc-800 text-[10px] text-zinc-500 uppercase tracking-[0.25em] font-bold">
              <th className="p-5 border-r border-zinc-800">Unit ID</th>
              <th className="p-5 border-r border-zinc-800">Destination Vector</th>
              <th className="p-5 border-r border-zinc-800 text-center">Arrival ETA</th>
              <th className="p-5 border-r border-zinc-800">Structural Integrity</th>
              <th className="p-5 bg-black/20">Thermal Status</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {shipments.map((shipment) => {
              const isCritical = shipment.temperature > 8.0;
              const tempColor = isCritical ? COLORS.DANGER_RED : COLORS.SURGICAL_BLUE;

              return (
                <tr 
                  key={shipment.id} 
                  className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-all duration-150 group"
                >
                  <td className="p-5 border-r border-zinc-800 font-bold group-hover:text-[#00f2ff] tracking-widest">
                    {shipment.id}
                  </td>
                  <td className="p-5 border-r border-zinc-800 text-zinc-400 font-bold">
                    {shipment.destination}
                  </td>
                  <td className="p-5 border-r border-zinc-800 font-mono text-center tracking-widest text-[#e5e5e5]">
                    {shipment.eta}
                  </td>
                  <td className="p-5 border-r border-zinc-800">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-[10px] text-zinc-600 font-bold">
                        <span>LGO-STABLE</span>
                        <span>{shipment.integrityScore.toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-1 bg-zinc-900">
                        <div 
                          className="h-full transition-all duration-700" 
                          style={{ 
                            width: `${shipment.integrityScore}%`, 
                            backgroundColor: shipment.integrityScore > 90 ? COLORS.SURGICAL_BLUE : COLORS.EMERGENCY_AMBER 
                          }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className={`p-5 relative ${isCritical ? 'bg-red-950/10' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span 
                          className={`font-bold text-xl tracking-tighter ${isCritical ? 'animate-pulse-red' : 'glow-blue'}`}
                          style={{ color: tempColor }}
                        >
                          {shipment.temperature.toFixed(2)}°C
                        </span>
                      </div>
                      {isCritical && (
                        <div className="flex flex-col items-end">
                           <span className="text-[9px] bg-red-600 text-black px-1.5 py-0.5 font-black tracking-widest">
                            THERMAL BREACH
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentTable;
