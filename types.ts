
export interface Shipment {
  id: string;
  destination: string;
  eta: string;
  integrityScore: number;
  temperature: number;
  baseTemp: number; // Used for calculation
  sector: string;
}

export interface SystemMetrics {
  activePayloads: number;
  criticalAlerts: number;
  fleetBattery: number;
}
