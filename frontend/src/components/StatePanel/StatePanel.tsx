import { useMemo } from "react";
import { X } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { State, Store, Competitor, DemandData } from "@market/shared";
import { useMapStore } from "../../store/mapStore";
import { formatCurrency, formatPopulation } from "../../utils/format";

interface StatePanelProps {
  states: State[];
  stores: Store[];
  competitors: Competitor[];
  demand: DemandData[];
}

const REGION_COLORS: Record<string, string> = {
  Norte: "#22C55E",
  Nordeste: "#EAB308",
  "Centro-Oeste": "#F97316",
  Sudeste: "#3B82F6",
  Sul: "#8B5CF6",
};

export default function StatePanel({
  states,
  stores,
  competitors,
  demand,
}: StatePanelProps) {
  const selectedStateCode = useMapStore((s) => s.selectedStateCode);
  const setSelectedState = useMapStore((s) => s.setSelectedState);
  const resetView = useMapStore((s) => s.resetView);

  const state = useMemo(
    () => states.find((s) => s.code === selectedStateCode),
    [states, selectedStateCode]
  );

  const stateStores = useMemo(
    () => stores.filter((s) => s.state === selectedStateCode),
    [stores, selectedStateCode]
  );

  const stateCompetitors = useMemo(
    () => competitors.filter((c) => c.state === selectedStateCode),
    [competitors, selectedStateCode]
  );

  const stateDemand = useMemo(
    () => demand.find((d) => d.stateCode === selectedStateCode),
    [demand, selectedStateCode]
  );

  const chartData = useMemo(() => {
    if (!state) return [];
    const regionStates = states.filter((s) => s.region === state.region);
    const avgGdp =
      regionStates.reduce((s, st) => s + st.gdpPerCapita, 0) /
      regionStates.length;
    const avgScore =
      regionStates.reduce((s, st) => s + st.marketPotentialScore, 0) /
      regionStates.length;
    const regionDemand = demand.filter((d) =>
      regionStates.some((rs) => rs.code === d.stateCode)
    );
    const avgDemand =
      regionDemand.length > 0
        ? regionDemand.reduce((s, d) => s + d.estimatedDemand, 0) /
          regionDemand.length
        : 0;

    return [
      {
        name: "PIB per capita",
        Estado: Math.round(state.gdpPerCapita / 1000),
        "Média região": Math.round(avgGdp / 1000),
      },
      {
        name: "Score potencial",
        Estado: state.marketPotentialScore,
        "Média região": Math.round(avgScore),
      },
      {
        name: "Demanda (mi)",
        Estado: stateDemand?.estimatedDemand || 0,
        "Média região": Math.round(avgDemand),
      },
    ];
  }, [state, states, demand, stateDemand]);

  const handleClose = () => {
    setSelectedState(null);
    resetView();
  };

  if (!selectedStateCode || !state) return null;

  return (
    <div className="fixed top-14 right-0 h-[calc(100%-3.5rem)] w-96 max-w-full bg-[#13132b] border-l border-white/10 z-30 overflow-y-auto transition-transform duration-300 ease-in-out">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div>
          <h2 className="text-lg font-bold">
            {state.name}{" "}
            <span className="text-[#94a3b8]">({state.code})</span>
          </h2>
          <span
            className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: (REGION_COLORS[state.region] || "#666") + "33",
              color: REGION_COLORS[state.region] || "#666",
            }}
          >
            {state.region}
          </span>
        </div>
        <button
          onClick={handleClose}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Metrics */}
      <div className="p-4 space-y-4">
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

        {/* Presence */}
        <div className="bg-[#1a1a3e] rounded-lg p-3">
          <div className="text-xs text-[#94a3b8] mb-2">Presença</div>
          <div className="flex items-center gap-4">
            <div>
              <span className="text-lg font-bold text-blue-400">
                {stateStores.length}
              </span>
              <span className="text-xs text-[#94a3b8] ml-1">lojas</span>
            </div>
            <div>
              <span className="text-lg font-bold text-red-400">
                {stateCompetitors.length}
              </span>
              <span className="text-xs text-[#94a3b8] ml-1">concorrentes</span>
            </div>
          </div>
          {stateStores.length === 0 && (
            <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs bg-red-500/20 text-red-400">
              Sem presença
            </span>
          )}
        </div>

        {/* Chart */}
        <div className="bg-[#1a1a3e] rounded-lg p-3">
          <div className="text-xs text-[#94a3b8] mb-3">
            Estado vs Média da Região
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} layout="vertical" barSize={12}>
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis
                type="category"
                dataKey="name"
                width={100}
                tick={{ fill: "#94a3b8", fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f0f23",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px" }}
                iconType="circle"
                iconSize={8}
              />
              <Bar dataKey="Estado" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              <Bar
                dataKey="Média região"
                fill="#64748B"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stores list */}
        {stateStores.length > 0 && (
          <div className="bg-[#1a1a3e] rounded-lg p-3">
            <div className="text-xs text-[#94a3b8] mb-2">
              Lojas ({stateStores.length})
            </div>
            <div className="space-y-2">
              {stateStores.slice(0, 5).map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <div className="text-white">{s.name}</div>
                    <div className="text-xs text-[#94a3b8]">
                      {s.city} - {s.openDate}
                    </div>
                  </div>
                  <span className="text-xs text-green-400">
                    {formatCurrency(s.revenue)}
                  </span>
                </div>
              ))}
              {stateStores.length > 5 && (
                <div className="text-xs text-blue-400">
                  +{stateStores.length - 5} mais
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
