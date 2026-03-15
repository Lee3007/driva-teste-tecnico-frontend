import { useFilterStore, ALL_REGIONS } from "@/shared/store/filterStore";
import { REGION_COLORS } from "@/shared/utils/constants";
import type { Region, Period } from "@market/shared";

const PERIODS: { value: Period; label: string }[] = [
  { value: "12m", label: "12 meses" },
  { value: "24m", label: "24 meses" },
  { value: "all", label: "Histórico" },
];

export default function Filters() {
  const selectedRegions = useFilterStore((s) => s.selectedRegions);
  const period = useFilterStore((s) => s.period);
  const toggleRegion = useFilterStore((s) => s.toggleRegion);
  const setPeriod = useFilterStore((s) => s.setPeriod);
  const selectAllRegions = useFilterStore((s) => s.selectAllRegions);
  const clearRegions = useFilterStore((s) => s.clearRegions);

  const allSelected = selectedRegions.length === ALL_REGIONS.length;

  return (
    <div className="space-y-4">
      {/* Region filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#94a3b8]">Região</span>
          <button
            onClick={allSelected ? clearRegions : selectAllRegions}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            {allSelected ? "Limpar" : "Todas"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {ALL_REGIONS.map((region) => {
            const active = selectedRegions.includes(region);
            return (
              <button
                key={region}
                onClick={() => toggleRegion(region)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  active
                    ? "text-white"
                    : "text-[#94a3b8] border border-white/20 bg-transparent"
                }`}
                style={
                  active
                    ? { backgroundColor: REGION_COLORS[region] + "33", borderColor: REGION_COLORS[region], border: `1px solid ${REGION_COLORS[region]}`, color: REGION_COLORS[region] }
                    : undefined
                }
              >
                {region}
              </button>
            );
          })}
        </div>
      </div>

      {/* Period filter */}
      <div>
        <span className="text-xs text-[#94a3b8] block mb-2">Período</span>
        <div className="flex gap-2">
          {PERIODS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setPeriod(value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                period === value
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-[#94a3b8] hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
