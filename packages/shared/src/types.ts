export type Region = "Norte" | "Nordeste" | "Centro-Oeste" | "Sudeste" | "Sul";

export interface State {
  code: string;
  name: string;
  region: Region;
  capital: string;
  population: number;
  gdpPerCapita: number;
  averageIncome: number;
  marketPotentialScore: number;
  area: number;
}

export interface Store {
  id: string;
  name: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  openDate: string;
  status: "active";
  revenue: number;
}

export interface Competitor {
  id: string;
  name: string;
  brand: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface DemandData {
  stateCode: string;
  estimatedDemand: number;
  growth: number;
}

export interface ExpansionZone {
  stateCode: string;
  priority: "high" | "medium" | "low";
  reason: string;
  potentialRevenue: number;
}

export interface Summary {
  totalStores: number;
  statesCovered: number;
  statesUncovered: number;
  totalRevenue: number;
  totalCompetitors: number;
}

export type Period = "12m" | "24m" | "all";
