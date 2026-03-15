import { create } from "zustand";

export type LayerKey =
  | "stores"
  | "marketPotential"
  | "demand"
  | "expansion"
  | "competitors";

interface LayerState {
  layers: Record<LayerKey, boolean>;
  toggleLayer: (key: LayerKey) => void;
}

export const useLayerStore = create<LayerState>((set) => ({
  layers: {
    stores: true,
    marketPotential: true,
    demand: true,
    expansion: true,
    competitors: false,
  },
  toggleLayer: (key) =>
    set((state) => ({
      layers: { ...state.layers, [key]: !state.layers[key] },
    })),
}));
