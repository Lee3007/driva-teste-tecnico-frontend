import { useCallback } from "react";
import DeckGL from "@deck.gl/react";
import { Map, NavigationControl } from "react-map-gl/maplibre";
import { FlyToInterpolator } from "@deck.gl/core";
import type { Layer } from "@deck.gl/core";
import "maplibre-gl/dist/maplibre-gl.css";
import { useMapStore } from "../../store/mapStore";
import type { Store, Competitor, DemandData } from "@market/shared";
import { nameToCode, codeToName } from "../../utils/stateMapping";
import { formatCurrency, formatPercent } from "../../utils/format";

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

interface DeckMapProps {
  layers: Layer[];
}

export default function DeckMap({ layers }: DeckMapProps) {
  const viewState = useMapStore((s) => s.viewState);
  const setViewState = useMapStore((s) => s.setViewState);

  const onViewStateChange = useCallback(
    ({ viewState: vs }: any) => {
      setViewState(vs);
    },
    [setViewState]
  );

  const getTooltip = useCallback(({ object, layer }: any) => {
    if (!object) return null;

    if (layer?.id === "stores-layer") {
      const s = object as Store;
      return {
        html: `<div style="padding:4px 0"><strong>${s.name}</strong><br/>${s.city}, ${s.state}<br/>Abertura: ${s.openDate}<br/>Faturamento: ${formatCurrency(s.revenue)}/mês</div>`,
        style: { backgroundColor: "#1a1a2e", color: "#f1f5f9", fontSize: "12px", borderRadius: "6px", padding: "8px 12px" },
      };
    }

    if (layer?.id === "competitors-layer") {
      const c = object as Competitor;
      return {
        html: `<div style="padding:4px 0"><strong>${c.name}</strong><br/>Marca: ${c.brand}<br/>${c.city}, ${c.state}</div>`,
        style: { backgroundColor: "#1a1a2e", color: "#f1f5f9", fontSize: "12px", borderRadius: "6px", padding: "8px 12px" },
      };
    }

    if (layer?.id === "demand-layer") {
      const d = object as DemandData;
      const stateName = codeToName[d.stateCode] || d.stateCode;
      return {
        html: `<div style="padding:4px 0"><strong>${stateName} (${d.stateCode})</strong><br/>Demanda: R$ ${d.estimatedDemand} mi<br/>Crescimento: ${formatPercent(d.growth)}</div>`,
        style: { backgroundColor: "#1a1a2e", color: "#f1f5f9", fontSize: "12px", borderRadius: "6px", padding: "8px 12px" },
      };
    }

    if (layer?.id === "expansion-layer" && object.properties) {
      const name = object.properties.name;
      const code = nameToCode[name] || name;
      return {
        html: `<div style="padding:4px 0"><strong>${name} (${code})</strong><br/>Zona de Expansão</div>`,
        style: { backgroundColor: "#1a1a2e", color: "#f1f5f9", fontSize: "12px", borderRadius: "6px", padding: "8px 12px" },
      };
    }

    if (
      (layer?.id === "states-boundary" || layer?.id === "market-potential-layer") &&
      object.properties
    ) {
      const name = object.properties.name;
      const code = nameToCode[name];
      return {
        html: `<div style="padding:4px 0"><strong>${name}</strong>${code ? ` (${code})` : ""}</div>`,
        style: { backgroundColor: "#1a1a2e", color: "#f1f5f9", fontSize: "12px", borderRadius: "6px", padding: "8px 12px" },
      };
    }

    return null;
  }, []);

  return (
    <div className="flex-1 relative h-full">
      <DeckGL
        viewState={{ ...viewState, transitionInterpolator: viewState.transitionDuration ? new FlyToInterpolator() : undefined }}
        onViewStateChange={onViewStateChange}
        controller={true}
        layers={layers}
        getTooltip={getTooltip}
      >
        <Map mapStyle={MAP_STYLE}>
          <NavigationControl position="top-right" />
        </Map>
      </DeckGL>
    </div>
  );
}
