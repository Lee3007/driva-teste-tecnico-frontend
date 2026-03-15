import { ScatterplotLayer } from "@deck.gl/layers";
import type { DemandData } from "@market/shared";
import { capitalCoordinates } from "../utils/capitalCoordinates";

export function createDemandLayer(demand: DemandData[]) {
  if (demand.length === 0) return null;

  const min = Math.min(...demand.map((d) => d.estimatedDemand));
  const max = Math.max(...demand.map((d) => d.estimatedDemand));
  const range = max - min || 1;

  return new ScatterplotLayer<DemandData>({
    id: "demand-layer",
    data: demand,
    getPosition: (d) => {
      const coords = capitalCoordinates[d.stateCode];
      if (!coords) return [0, 0];
      return [coords[1], coords[0]]; // [longitude, latitude]
    },
    getRadius: (d) => {
      const normalized = (d.estimatedDemand - min) / range;
      return 15 + normalized * 65;
    },
    radiusUnits: "pixels",
    radiusMinPixels: 15,
    radiusMaxPixels: 80,
    getFillColor: [139, 92, 246, 100],
    getLineColor: [139, 92, 246, 255],
    lineWidthMinPixels: 1,
    stroked: true,
    pickable: true,
  });
}
