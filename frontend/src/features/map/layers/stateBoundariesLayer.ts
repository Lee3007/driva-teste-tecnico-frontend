import { GeoJsonLayer } from "@deck.gl/layers";
import { nameToCode } from "@/shared/utils/stateMapping";
import type { Region } from "@market/shared";

interface BoundaryOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geojson: any;
  selectedStateCode: string | null;
  selectedRegions: Region[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  statesByCode: Map<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (info: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onHover?: (info: any) => void;
}

export function createStateBoundariesLayer({
  geojson,
  selectedStateCode,
  selectedRegions,
  statesByCode,
  onClick,
  onHover,
}: BoundaryOptions) {
  if (!geojson) return null;

  return new GeoJsonLayer({
    id: "states-boundary",
    data: geojson,
    pickable: true,
    stroked: true,
    filled: true,
    getFillColor: (f: any) => {
      const code = nameToCode[f.properties.name];
      const state = statesByCode.get(code);
      const inRegion = state && selectedRegions.includes(state.region);

      if (selectedStateCode) {
        if (code === selectedStateCode) return [255, 255, 255, 50];
        return [240, 240, 240, 10];
      }
      if (!inRegion) return [240, 240, 240, 10];
      return [240, 240, 240, 30];
    },
    getLineColor: (f: any) => {
      const code = nameToCode[f.properties.name];
      if (code === selectedStateCode) return [255, 255, 255, 255];
      return [100, 100, 100, 200];
    },
    getLineWidth: (f: any) => {
      const code = nameToCode[f.properties.name];
      return code === selectedStateCode ? 3 : 1;
    },
    lineWidthMinPixels: 1,
    autoHighlight: true,
    highlightColor: [255, 255, 255, 60],
    onClick,
    onHover,
    updateTriggers: {
      getFillColor: [selectedStateCode, selectedRegions],
      getLineColor: [selectedStateCode],
      getLineWidth: [selectedStateCode],
    },
  });
}
