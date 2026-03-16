import axios from "axios";
import type {
  State,
  Store,
  Competitor,
  DemandData,
  ExpansionZone,
  Summary,
} from "@market/shared";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://driva-teste-tecnico-frontend-api.onrender.com/api",
});

export async function getStates(region?: string): Promise<State[]> {
  const params = region ? { region } : {};
  const { data } = await api.get<State[]>("/states", { params });
  return data;
}

export async function getStores(
  region?: string,
  period?: string
): Promise<Store[]> {
  const params: Record<string, string> = {};
  if (region) params.region = region;
  if (period) params.period = period;
  const { data } = await api.get<Store[]>("/stores", { params });
  return data;
}

export async function getCompetitors(
  state?: string,
  region?: string
): Promise<Competitor[]> {
  const params: Record<string, string> = {};
  if (state) params.state = state;
  if (region) params.region = region;
  const { data } = await api.get<Competitor[]>("/competitors", { params });
  return data;
}

export async function getDemand(region?: string): Promise<DemandData[]> {
  const params = region ? { region } : {};
  const { data } = await api.get<DemandData[]>("/demand", { params });
  return data;
}

export async function getExpansionZones(): Promise<ExpansionZone[]> {
  const { data } = await api.get<ExpansionZone[]>("/expansion-zones");
  return data;
}

export async function getSummary(): Promise<Summary> {
  const { data } = await api.get<Summary>("/summary");
  return data;
}
