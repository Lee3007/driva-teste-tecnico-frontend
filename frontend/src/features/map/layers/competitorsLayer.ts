import { ScatterplotLayer } from "@deck.gl/layers";
import type { Competitor } from "@market/shared";

export function createCompetitorsLayer(competitors: Competitor[]) {
  return new ScatterplotLayer<Competitor>({
    id: "competitors-layer",
    data: competitors,
    getPosition: (d) => [d.longitude, d.latitude],
    getFillColor: [239, 68, 68, 200],
    getRadius: 5,
    radiusUnits: "pixels",
    radiusMinPixels: 3,
    radiusMaxPixels: 8,
    pickable: true,
  });
}
