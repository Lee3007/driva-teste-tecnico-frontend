import { useMemo } from "react";
import type { Layer } from "@deck.gl/core";
import type {
  State,
  Store,
  Competitor,
  DemandData,
  ExpansionZone,
  Region,
} from "@market/shared";
import { useLayerStore } from "@/features/map/store/layerStore";
import { useMapStore } from "@/features/map/store/mapStore";
import { useFilterStore } from "@/shared/store/filterStore";
import { nameToCode } from "@/shared/utils/stateMapping";
import { capitalCoordinates } from "@/shared/utils/capitalCoordinates";
import { createStateBoundariesLayer } from "../layers/stateBoundariesLayer";
import { createStoresLayer } from "../layers/storesLayer";
import { createMarketPotentialLayer } from "../layers/marketPotentialLayer";
import { createDemandLayer } from "../layers/demandLayer";
import { createExpansionLayer } from "../layers/expansionLayer";
import { createCompetitorsLayer } from "../layers/competitorsLayer";

interface UseLayersProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geojson: any;
  states: State[];
  stores: Store[];
  competitors: Competitor[];
  demand: DemandData[];
  expansionZones: ExpansionZone[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClickState: (info: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onHoverState: (info: any) => void;
}

export function useLayers({
  geojson,
  states,
  stores,
  competitors,
  demand,
  expansionZones,
  onClickState,
  onHoverState,
}: UseLayersProps): Layer[] {
  const layers = useLayerStore((s) => s.layers);
  const selectedStateCode = useMapStore((s) => s.selectedStateCode);
  const selectedRegions = useFilterStore((s) => s.selectedRegions);

  return useMemo(() => {
    const result: (Layer | null)[] = [];

    const statesByCode = new Map(states.map((s) => [s.code, s]));

    // Base boundary layer (always on)
    result.push(
      createStateBoundariesLayer({
        geojson,
        selectedStateCode,
        selectedRegions,
        statesByCode,
        onClick: onClickState,
        onHover: onHoverState,
      })
    );

    // Market potential heatmap
    if (layers.marketPotential) {
      result.push(
        createMarketPotentialLayer(geojson, states, selectedRegions)
      );
    }

    // Expansion zones
    if (layers.expansion) {
      result.push(createExpansionLayer(geojson, expansionZones));
    }

    // Demand bubbles
    if (layers.demand) {
      result.push(createDemandLayer(demand));
    }

    // Stores
    if (layers.stores) {
      result.push(createStoresLayer(stores));
    }

    // Competitors
    if (layers.competitors) {
      result.push(createCompetitorsLayer(competitors));
    }

    return result.filter(Boolean) as Layer[];
  }, [
    geojson,
    states,
    stores,
    competitors,
    demand,
    expansionZones,
    layers,
    selectedStateCode,
    selectedRegions,
    onClickState,
    onHoverState,
  ]);
}
