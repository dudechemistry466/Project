
import React from 'react';
import { Shipment } from '../types';
import { COLORS } from '../constants';

interface ShipmentTableProps {
  shipments: Shipment[];
}

const ShipmentTable: React.FC<ShipmentTableProps> = ({ shipments }) => {
  return (
    <div className="w-full overflow-x-auto border border-zinc-800 bg-[#0a0a0a]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#111] border-b border-zinc-800 text-xs text-zinc-500 uppercase tracking-widest">
            <th className="p-4 border-r border-zinc-800">Shipment ID</th>
            <th className="p-4 border-r border-zinc-800">Destination</th>
            <th className="p-4 border-r border-zinc-800">ETA</th>
            <th className="p-4 border-r border-zinc-800">Integrity</th>
            <th className="p-4">Live Temperature</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {shipments.map((shipment) => {
            const isCritical = shipment.temperature > 8.0;
            const tempColor = isCritical ? COLORS.DANGER_RED : COLORS.SURGICAL_BLUE;

            return (
              <tr 
                key={shipment.id} 
                className="border-b border-zinc-900 hover:bg-[#1a1a1a] transition-colors group"
              >
                <td className="p-4 border-r border-zinc-800 font-bold group-hover:text-[#00f2ff]">
                  {shipment.id}
                </td>
                <td className="p-4 border-r border-zinc-800 text-zinc-400">
                  {shipment.destination}
                </td>
                <td className="p-4 border-r border-zinc-800 font-mono">
                  {shipment.eta}
                </td>
                <td className="p-4 border-r border-zinc-800">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1 bg-zinc-800">
                      <div 
                        className="h-full transition-all duration-500" 
                        style={{ 
                          width: `${shipment.integrityScore}%`, 
                          backgroundColor: shipment.integrityScore > 90 ? COLORS.SURGICAL_BLUE : COLORS.EMERGENCY_AMBER 
                        }} 
                      />
                    </div>
                    <span className={shipment.integrityScore < 90 ? 'text-[#ff8c00]' : 'text-zinc-500'}>
                      {shipment.integrityScore.toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="p-4 relative">
                  <div className="flex items-center justify-between">
                    <span 
                      className={`font-bold text-lg tracking-wider ${isCritical ? 'animate-pulse-red' : 'glow-blue'}`}
                      style={{ color: tempColor }}
                    >
                      {shipment.temperature.toFixed(2)}°C
                    </span>
                    {isCritical && (
                      <span className="text-[10px] bg-[#ff2e2e33] text-[#ff2e2e] px-1 font-bold border border-[#ff2e2e55]">
                        THRESHOLD EXCEEDED
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentTable;
