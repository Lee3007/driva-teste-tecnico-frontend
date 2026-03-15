import { useMemo } from "react";
import type {
  State,
  Store,
  Competitor,
  DemandData,
  ExpansionZone,
} from "@market/shared";
import { useFilterStore } from "../store/filterStore";

interface FilteredData {
  states: State[];
  stores: Store[];
  competitors: Competitor[];
  demand: DemandData[];
  expansionZones: ExpansionZone[];
}

export function useFilteredData(
  states: State[],
  stores: Store[],
  competitors: Competitor[],
  demand: DemandData[],
  expansionZones: ExpansionZone[]
): FilteredData {
  const selectedRegions = useFilterStore((s) => s.selectedRegions);
  const period = useFilterStore((s) => s.period);

  return useMemo(() => {
    const regionStateCodes = new Set(
      states.filter((s) => selectedRegions.includes(s.region)).map((s) => s.code)
    );

    const filteredStates = states.filter((s) =>
      selectedRegions.includes(s.region)
    );

    let filteredStores = stores.filter((s) => regionStateCodes.has(s.state));
    if (period !== "all") {
      const now = new Date();
      const months = period === "12m" ? 12 : 24;
      const cutoff = new Date(
        now.getFullYear(),
        now.getMonth() - months,
        now.getDate()
      );
      filteredStores = filteredStores.filter(
        (s) => new Date(s.openDate) >= cutoff
      );
    }

    const filteredCompetitors = competitors.filter((c) =>
      regionStateCodes.has(c.state)
    );

    const filteredDemand = demand.filter((d) =>
      regionStateCodes.has(d.stateCode)
    );

    const filteredExpansion = expansionZones.filter((z) =>
      regionStateCodes.has(z.stateCode)
    );

    return {
      states: filteredStates,
      stores: filteredStores,
      competitors: filteredCompetitors,
      demand: filteredDemand,
      expansionZones: filteredExpansion,
    };
  }, [states, stores, competitors, demand, expansionZones, selectedRegions, period]);
}
