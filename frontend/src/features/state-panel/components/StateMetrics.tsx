import type { State } from "@market/shared";
import { formatCurrency, formatPopulation } from "@/shared/utils/format";

interface StateMetricsProps {
  state: State;
}

export default function StateMetrics({ state }: StateMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-[#1a1a3e] rounded-lg p-3">
        <div className="text-xs text-[#94a3b8]">População</div>
        <div className="text-lg font-bold">
          {formatPopulation(state.population)}
        </div>
      </div>
      <div className="bg-[#1a1a3e] rounded-lg p-3">
        <div className="text-xs text-[#94a3b8]">PIB per capita</div>
        <div className="text-lg font-bold">
          {formatCurrency(state.gdpPerCapita)}
        </div>
      </div>
      <div className="bg-[#1a1a3e] rounded-lg p-3">
        <div className="text-xs text-[#94a3b8]">Renda média</div>
        <div className="text-lg font-bold">
          {formatCurrency(state.averageIncome)}
        </div>
      </div>
      <div className="bg-[#1a1a3e] rounded-lg p-3">
        <div className="text-xs text-[#94a3b8]">Score potencial</div>
        <div className="text-lg font-bold">
          {state.marketPotentialScore}
        </div>
        <div className="mt-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${state.marketPotentialScore}%`,
              backgroundColor:
                state.marketPotentialScore > 70
                  ? "#22C55E"
                  : state.marketPotentialScore > 40
                  ? "#EAB308"
                  : "#EF4444",
            }}
          />
        </div>
      </div>
    </div>
  );
}
