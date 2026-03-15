import { useState, useEffect } from "react";
import type {
  State,
  Store,
  Competitor,
  DemandData,
  ExpansionZone,
  Summary,
} from "@market/shared";
import * as api from "../services/api";

interface ApiData {
  states: State[];
  stores: Store[];
  competitors: Competitor[];
  demand: DemandData[];
  expansionZones: ExpansionZone[];
  summary: Summary | null;
  loading: boolean;
}

export function useApiData(): ApiData {
  const [states, setStates] = useState<State[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [demand, setDemand] = useState<DemandData[]>([]);
  const [expansionZones, setExpansionZones] = useState<ExpansionZone[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [st, sto, comp, dem, exp, sum] = await Promise.all([
          api.getStates(),
          api.getStores(),
          api.getCompetitors(),
          api.getDemand(),
          api.getExpansionZones(),
          api.getSummary(),
        ]);
        setStates(st);
        setStores(sto);
        setCompetitors(comp);
        setDemand(dem);
        setExpansionZones(exp);
        setSummary(sum);
      } catch (err) {
        console.error("Failed to fetch API data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return { states, stores, competitors, demand, expansionZones, summary, loading };
}
