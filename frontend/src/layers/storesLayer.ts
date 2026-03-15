import { ScatterplotLayer } from "@deck.gl/layers";
import type { Store } from "@market/shared";

export function createStoresLayer(stores: Store[]) {
  return new ScatterplotLayer<Store>({
    id: "stores-layer",
    data: stores,
    getPosition: (d) => [d.longitude, d.latitude],
    getFillColor: [59, 130, 246, 220],
    getRadius: 6,
    radiusUnits: "pixels",
    radiusMinPixels: 4,
    radiusMaxPixels: 10,
    pickable: true,
  });
}
