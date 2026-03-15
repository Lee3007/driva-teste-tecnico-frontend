import { create } from "zustand";

interface MapState {
  selectedStateCode: string | null;
  hoveredStateCode: string | null;
  viewState: {
    latitude: number;
    longitude: number;
    zoom: number;
    pitch: number;
    bearing: number;
    transitionDuration?: number;
  };
  setSelectedState: (code: string | null) => void;
  setHoveredState: (code: string | null) => void;
  setViewState: (vs: Partial<MapState["viewState"]>) => void;
  flyTo: (lat: number, lng: number, zoom: number) => void;
  resetView: () => void;
}

const INITIAL_VIEW = {
  latitude: -14.235,
  longitude: -51.9253,
  zoom: 4,
  pitch: 0,
  bearing: 0,
};

export const useMapStore = create<MapState>((set) => ({
  selectedStateCode: null,
  hoveredStateCode: null,
  viewState: { ...INITIAL_VIEW },
  setSelectedState: (code) => set({ selectedStateCode: code }),
  setHoveredState: (code) => set({ hoveredStateCode: code }),
  setViewState: (vs) =>
    set((state) => ({ viewState: { ...state.viewState, ...vs } })),
  flyTo: (latitude, longitude, zoom) =>
    set((state) => ({
      viewState: {
        ...state.viewState,
        latitude,
        longitude,
        zoom,
        transitionDuration: 800,
      },
    })),
  resetView: () => set({ viewState: { ...INITIAL_VIEW, transitionDuration: 800 } }),
}));
