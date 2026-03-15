import { useState, useCallback } from "react";
import Header from "@/components/Layout/Header";
import { Sidebar } from "@/features/sidebar";
import { DeckMap, MapLegend, useLayers, useGeoJSON, useMapStore } from "@/features/map";
import { StatePanel } from "@/features/state-panel";
import { useApiData } from "@/shared/hooks/useApiData";
import { useFilteredData } from "@/shared/hooks/useFilteredData";
import { nameToCode } from "@/shared/utils/stateMapping";
import { capitalCoordinates } from "@/shared/utils/capitalCoordinates";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const apiData = useApiData();
  const { geojson } = useGeoJSON();
  const setSelectedState = useMapStore((s) => s.setSelectedState);
  const flyTo = useMapStore((s) => s.flyTo);

  const filtered = useFilteredData(
    apiData.states,
    apiData.stores,
    apiData.competitors,
    apiData.demand,
    apiData.expansionZones
  );

  const onClickState = useCallback(
    (info: any) => {
      if (info.object?.properties?.name) {
        const code = nameToCode[info.object.properties.name];
        if (code) {
          setSelectedState(code);
          const coords = capitalCoordinates[code];
          if (coords) flyTo(coords[0], coords[1], 6);
        }
      } else {
        setSelectedState(null);
      }
    },
    [setSelectedState, flyTo]
  );

  const onHoverState = useCallback(
    (info: any) => {
      if (info.object?.properties?.name) {
        const code = nameToCode[info.object.properties.name];
        useMapStore.getState().setHoveredState(code || null);
      } else {
        useMapStore.getState().setHoveredState(null);
      }
    },
    []
  );

  const layers = useLayers({
    geojson,
    states: apiData.states,
    stores: filtered.stores,
    competitors: filtered.competitors,
    demand: filtered.demand,
    expansionZones: filtered.expansionZones,
    onClickState,
    onHoverState,
  });

  if (apiData.loading) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0f0f23]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="text-[#94a3b8]">Carregando dados...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <Header
        states={apiData.states}
        stores={apiData.stores}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          summary={apiData.summary}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex-1 relative md:ml-80">
          <DeckMap layers={layers} />
          <MapLegend />
        </div>
        <StatePanel
          states={apiData.states}
          stores={apiData.stores}
          competitors={apiData.competitors}
          demand={apiData.demand}
        />
      </div>
    </div>
  );
}
