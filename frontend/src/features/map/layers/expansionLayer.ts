import { GeoJsonLayer } from "@deck.gl/layers";
import type { ExpansionZone } from "@market/shared";
import { nameToCode } from "@/shared/utils/stateMapping";

const FILL_COLORS: Record<string, [number, number, number, number]> = {
  high: [234, 179, 8, 80],
  medium: [249, 115, 22, 60],
  low: [156, 163, 175, 40],
};

const LINE_COLORS: Record<string, [number, number, number, number]> = {
  high: [234, 179, 8, 255],
  medium: [249, 115, 22, 255],
  low: [156, 163, 175, 200],
};

export function createExpansionLayer(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geojson: any,
  expansionZones: ExpansionZone[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (info: any) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onHover?: (info: any) => void
) {
  if (!geojson || expansionZones.length === 0) return null;

  const zoneMap = new Map(expansionZones.map((z) => [z.stateCode, z]));

  const filteredFeatures = {
    type: "FeatureCollection" as const,
    features: geojson.features.filter((f: any) => {
      const code = nameToCode[f.properties.name];
      return zoneMap.has(code);
    }),
  };

  return new GeoJsonLayer({
    id: "expansion-layer",
    data: filteredFeatures,
    pickable: true,
    stroked: true,
    filled: true,
    getFillColor: (f: any) => {
      const code = nameToCode[f.properties.name];
      const zone = zoneMap.get(code);
      return zone ? FILL_COLORS[zone.priority] : [0, 0, 0, 0];
    },
    getLineColor: (f: any) => {
      const code = nameToCode[f.properties.name];
      const zone = zoneMap.get(code);
      return zone ? LINE_COLORS[zone.priority] : [0, 0, 0, 0];
    },
    lineWidthMinPixels: 3,
    onClick,
    onHover,
    updateTriggers: {
      getFillColor: [expansionZones],
      getLineColor: [expansionZones],
    },
  });
}
