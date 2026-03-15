import { GeoJsonLayer } from "@deck.gl/layers";
import type { State, Region } from "@market/shared";
import { nameToCode } from "../utils/stateMapping";

function scoreToColor(score: number, inRegion: boolean): [number, number, number, number] {
  const alpha = inRegion ? 160 : 20;
  if (score <= 30) return [239, 68, 68, alpha];
  if (score <= 50) {
    const t = (score - 30) / 20;
    return [
      Math.round(239 + (249 - 239) * t),
      Math.round(68 + (115 - 68) * t),
      Math.round(68 + (22 - 68) * t),
      alpha,
    ];
  }
  if (score <= 70) {
    const t = (score - 50) / 20;
    return [
      Math.round(249 + (234 - 249) * t),
      Math.round(115 + (179 - 115) * t),
      Math.round(22 + (8 - 22) * t),
      alpha,
    ];
  }
  const t = Math.min((score - 70) / 30, 1);
  return [
    Math.round(234 + (34 - 234) * t),
    Math.round(179 + (197 - 179) * t),
    Math.round(8 + (94 - 8) * t),
    alpha,
  ];
}

export function createMarketPotentialLayer(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geojson: any,
  states: State[],
  selectedRegions: Region[]
) {
  if (!geojson) return null;

  const stateMap = new Map(states.map((s) => [s.code, s]));

  return new GeoJsonLayer({
    id: "market-potential-layer",
    data: geojson,
    pickable: true,
    stroked: true,
    filled: true,
    getFillColor: (f: any) => {
      const code = nameToCode[f.properties.name];
      const state = stateMap.get(code);
      if (!state) return [100, 100, 100, 20];
      const inRegion = selectedRegions.includes(state.region);
      return scoreToColor(state.marketPotentialScore, inRegion);
    },
    getLineColor: [80, 80, 80, 100],
    lineWidthMinPixels: 1,
    updateTriggers: {
      getFillColor: [selectedRegions],
    },
  });
}
