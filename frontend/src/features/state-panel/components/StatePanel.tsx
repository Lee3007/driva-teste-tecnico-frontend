import type { State, Store, Competitor, DemandData } from "@market/shared";
import { useMapStore } from "@/features/map/store/mapStore";
import { useStateData } from "../hooks/useStateData";
import StatePanelHeader from "./StatePanelHeader";
import StateMetrics from "./StateMetrics";
import PresenceCard from "./PresenceCard";
import ComparisonChart from "./ComparisonChart";
import StoresList from "./StoresList";

interface StatePanelProps {
  states: State[];
  stores: Store[];
  competitors: Competitor[];
  demand: DemandData[];
}

export default function StatePanel({
  states,
  stores,
  competitors,
  demand,
}: StatePanelProps) {
  const setSelectedState = useMapStore((s) => s.setSelectedState);
  const resetView = useMapStore((s) => s.resetView);
  const { selectedStateCode, state, stateStores, stateCompetitors, chartData } =
    useStateData(states, stores, competitors, demand);

  const handleClose = () => {
    setSelectedState(null);
    resetView();
  };

  if (!selectedStateCode || !state) return null;

  return (
    <div className="fixed top-14 right-0 h-[calc(100%-3.5rem)] w-full md:w-96 bg-[#13132b] border-l border-white/10 z-30 overflow-y-auto transition-transform duration-300 ease-in-out">
      <StatePanelHeader state={state} onClose={handleClose} />
      <div className="p-4 space-y-4">
        <StateMetrics state={state} />
        <PresenceCard
          storeCount={stateStores.length}
          competitorCount={stateCompetitors.length}
        />
        <ComparisonChart data={chartData} />
        <StoresList stores={stateStores} />
      </div>
    </div>
  );
}
