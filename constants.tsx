
import { Shipment } from './types';

export const INITIAL_SHIPMENTS: Shipment[] = [
  { id: "CA-8892-X", destination: "GENEVA HUB - SECTOR 7", eta: "04:22 UTC", integrityScore: 99.4, temperature: 4.2, baseTemp: 4.2, sector: "ALPHA" },
  { id: "CA-4410-Q", destination: "REYKJAVIK COLD STORAGE", eta: "09:15 UTC", integrityScore: 98.1, temperature: 3.8, baseTemp: 3.8, sector: "BETA" },
  { id: "CA-1102-M", destination: "SINGAPORE BIOPORT", eta: "14:50 UTC", integrityScore: 92.5, temperature: 7.9, baseTemp: 7.5, sector: "GAMMA" },
  { id: "CA-9983-L", destination: "MUMBAI MEDICAL CTR", eta: "01:12 UTC", integrityScore: 74.2, temperature: 14.5, baseTemp: 14.5, sector: "DELTA" },
  { id: "CA-5561-B", destination: "SYDNEY QUARANTINE", eta: "11:30 UTC", integrityScore: 99.9, temperature: 2.1, baseTemp: 2.1, sector: "ALPHA" },
  { id: "CA-2234-Z", destination: "CAPE TOWN CLINIC", eta: "22:05 UTC", integrityScore: 88.7, temperature: 8.2, baseTemp: 7.8, sector: "EPSILON" },
  { id: "CA-7712-W", destination: "TOKYO RESEARCH LAB", eta: "03:45 UTC", integrityScore: 96.3, temperature: 5.4, baseTemp: 5.4, sector: "ZETA" },
  { id: "CA-0019-V", destination: "OSLO TERMINAL 4", eta: "07:18 UTC", integrityScore: 100.0, temperature: -1.2, baseTemp: -1.2, sector: "ALPHA" }
];

export const COLORS = {
  ONYX: "#0a0a0a",
  CHARCOAL: "#1a1a1a",
  SURGICAL_BLUE: "#00f2ff",
  EMERGENCY_AMBER: "#ff8c00",
  DANGER_RED: "#ff2e2e",
  STABLE_WHITE: "#e5e5e5"
};
