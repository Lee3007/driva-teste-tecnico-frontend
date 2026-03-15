import type { Store } from "@market/shared";
import { formatCurrency } from "@/shared/utils/format";

interface StoresListProps {
  stores: Store[];
}

export default function StoresList({ stores }: StoresListProps) {
  if (stores.length === 0) return null;

  return (
    <div className="bg-[#1a1a3e] rounded-lg p-3">
      <div className="text-xs text-[#94a3b8] mb-2">
        Lojas ({stores.length})
      </div>
      <div className="space-y-2">
        {stores.slice(0, 5).map((s) => (
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
        {stores.length > 5 && (
          <div className="text-xs text-blue-400">
            +{stores.length - 5} mais
          </div>
        )}
      </div>
    </div>
  );
}
