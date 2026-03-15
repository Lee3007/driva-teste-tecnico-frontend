import { create } from "zustand";
import type { Region, Period } from "@market/shared";

const ALL_REGIONS: Region[] = [
  "Norte",
  "Nordeste",
  "Centro-Oeste",
  "Sudeste",
  "Sul",
];

interface FilterState {
  selectedRegions: Region[];
  period: Period;
  searchQuery: string;
  toggleRegion: (region: Region) => void;
  setPeriod: (period: Period) => void;
  setSearchQuery: (query: string) => void;
  selectAllRegions: () => void;
  clearRegions: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedRegions: [...ALL_REGIONS],
  period: "all",
  searchQuery: "",
  toggleRegion: (region) =>
    set((state) => {
      const has = state.selectedRegions.includes(region);
      return {
        selectedRegions: has
          ? state.selectedRegions.filter((r) => r !== region)
          : [...state.selectedRegions, region],
      };
    }),
  setPeriod: (period) => set({ period }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  selectAllRegions: () => set({ selectedRegions: [...ALL_REGIONS] }),
  clearRegions: () => set({ selectedRegions: [] }),
}));

export { ALL_REGIONS };
