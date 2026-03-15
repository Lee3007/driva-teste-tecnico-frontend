import { useLayerStore } from "@/features/map/store/layerStore";

export default function MapLegend() {
  const layers = useLayerStore((s) => s.layers);

  const hasAny = Object.values(layers).some(Boolean);
  if (!hasAny) return null;

  return (
    <div className="absolute bottom-4 right-4 bg-[#0f0f23]/90 border border-white/10 rounded-lg p-3 z-10 max-w-[200px]">
      <div className="text-xs font-semibold text-[#94a3b8] mb-2">Legenda</div>
      <div className="space-y-2">
        {layers.stores && (
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
            <span className="text-xs text-white/80">Filiais ativas</span>
          </div>
        )}
        {layers.competitors && (
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
            <span className="text-xs text-white/80">Concorrentes</span>
          </div>
        )}
        {layers.demand && (
          <div className="flex items-center gap-2">
            <div className="flex items-end gap-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
              <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
            </div>
            <span className="text-xs text-white/80">Demanda (R$)</span>
          </div>
        )}
        {layers.marketPotential && (
          <div className="flex items-center gap-2">
            <div
              className="w-16 h-2.5 rounded-sm"
              style={{
                background:
                  "linear-gradient(to right, #EF4444, #EAB308, #22C55E)",
              }}
            />
            <div className="flex flex-col">
              <span className="text-[10px] text-white/60">Baixo → Alto</span>
            </div>
          </div>
        )}
        {layers.expansion && (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#EAB308]" />
              <span className="text-xs text-white/80">Alta prioridade</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#F97316]" />
              <span className="text-xs text-white/80">Média prioridade</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#9CA3AF]" />
              <span className="text-xs text-white/80">Baixa prioridade</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
