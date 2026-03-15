import { Store, MapPin, DollarSign, AlertTriangle } from "lucide-react";
import type { Summary } from "@market/shared";
import { formatCompact } from "../../utils/format";

interface SummaryCardsProps {
  summary: Summary | null;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  if (!summary) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#1a1a3e] rounded-lg p-3 animate-pulse h-20"
          />
        ))}
      </div>
    );
  }

  const cards = [
    {
      icon: Store,
      value: String(summary.totalStores),
      label: "Lojas",
      color: "#3B82F6",
    },
    {
      icon: MapPin,
      value: `${summary.statesCovered} / 27`,
      label: "Estados cobertos",
      color: "#22C55E",
    },
    {
      icon: DollarSign,
      value: formatCompact(summary.totalRevenue),
      label: "Faturamento/mês",
      color: "#EAB308",
    },
    {
      icon: AlertTriangle,
      value: String(summary.totalCompetitors),
      label: "Concorrentes",
      color: "#EF4444",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map(({ icon: Icon, value, label, color }) => (
        <div
          key={label}
          className="bg-[#1a1a3e] rounded-lg p-3 hover:scale-[1.02] transition-transform"
        >
          <Icon size={16} style={{ color }} className="mb-1" />
          <div className="text-lg font-bold text-white">{value}</div>
          <div className="text-xs text-[#94a3b8]">{label}</div>
        </div>
      ))}
    </div>
  );
}
