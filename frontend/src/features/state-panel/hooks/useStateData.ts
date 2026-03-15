import { useMemo } from "react";
import type { State, Store, Competitor, DemandData } from "@market/shared";
import { useMapStore } from "@/features/map/store/mapStore";

export function useStateData(
  states: State[],
  stores: Store[],
  competitors: Competitor[],
  demand: DemandData[]
) {
  const selectedStateCode = useMapStore((s) => s.selectedStateCode);

  const state = useMemo(
    () => states.find((s) => s.code === selectedStateCode),
    [states, selectedStateCode]
  );

  const stateStores = useMemo(
    () => stores.filter((s) => s.state === selectedStateCode),
    [stores, selectedStateCode]
  );

  const stateCompetitors = useMemo(
    () => competitors.filter((c) => c.state === selectedStateCode),
    [competitors, selectedStateCode]
  );

  const stateDemand = useMemo(
    () => demand.find((d) => d.stateCode === selectedStateCode),
    [demand, selectedStateCode]
  );

  const chartData = useMemo(() => {
    if (!state) return [];
    const regionStates = states.filter((s) => s.region === state.region);
    const avgGdp =
      regionStates.reduce((s, st) => s + st.gdpPerCapita, 0) /
      regionStates.length;
    const avgScore =
      regionStates.reduce((s, st) => s + st.marketPotentialScore, 0) /
      regionStates.length;
    const regionDemand = demand.filter((d) =>
      regionStates.some((rs) => rs.code === d.stateCode)
    );
    const avgDemand =
      regionDemand.length > 0
        ? regionDemand.reduce((s, d) => s + d.estimatedDemand, 0) /
          regionDemand.length
        : 0;

    return [
      {
        name: "PIB per capita",
        Estado: Math.round(state.gdpPerCapita / 1000),
        "Média região": Math.round(avgGdp / 1000),
      },
      {
        name: "Score potencial",
        Estado: state.marketPotentialScore,
        "Média região": Math.round(avgScore),
      },
      {
        name: "Demanda (mi)",
        Estado: stateDemand?.estimatedDemand || 0,
        "Média região": Math.round(avgDemand),
      },
    ];
  }, [state, states, demand, stateDemand]);

  return { selectedStateCode, state, stateStores, stateCompetitors, chartData };
}
