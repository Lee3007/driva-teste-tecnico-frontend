import { MapPin, Layers, Circle, Target, AlertTriangle } from "lucide-react";
import { useLayerStore, type LayerKey } from "../../store/layerStore";

const LAYER_CONFIG: {
  key: LayerKey;
  label: string;
  color: string;
  icon: typeof MapPin;
}[] = [
  { key: "stores", label: "Filiais Ativas", color: "#3B82F6", icon: MapPin },
  { key: "marketPotential", label: "Potencial de Mercado", color: "#22C55E", icon: Layers },
  { key: "demand", label: "Demanda Estimada", color: "#8B5CF6", icon: Circle },
  { key: "expansion", label: "Zonas de Expansão", color: "#EAB308", icon: Target },
  { key: "competitors", label: "Concorrência", color: "#EF4444", icon: AlertTriangle },
];

export default function LayerControls() {
  const layers = useLayerStore((s) => s.layers);
  const toggleLayer = useLayerStore((s) => s.toggleLayer);

  return (
    <div className="space-y-2">
      {LAYER_CONFIG.map(({ key, label, color, icon: Icon }) => (
        <button
          key={key}
          onClick={() => toggleLayer(key)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <div
            className="w-3 h-3 rounded-full shrink-0 transition-opacity"
            style={{
              backgroundColor: color,
              opacity: layers[key] ? 1 : 0.3,
            }}
          />
          <Icon
            size={16}
            style={{ color: layers[key] ? color : "#94a3b8" }}
            className="shrink-0 transition-colors"
          />
          <span
            className={`text-sm transition-colors ${
              layers[key] ? "text-white" : "text-[#94a3b8]"
            }`}
          >
            {label}
          </span>
          <div
            className={`ml-auto w-8 h-4 rounded-full transition-colors relative ${
              layers[key] ? "bg-blue-600" : "bg-white/20"
            }`}
          >
            <div
              className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${
                layers[key] ? "left-4" : "left-0.5"
              }`}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
