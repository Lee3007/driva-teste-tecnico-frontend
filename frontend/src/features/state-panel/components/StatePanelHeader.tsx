import { X } from "lucide-react";
import type { State } from "@market/shared";
import { REGION_COLORS } from "@/shared/utils/constants";

interface StatePanelHeaderProps {
  state: State;
  onClose: () => void;
}

export default function StatePanelHeader({ state, onClose }: StatePanelHeaderProps) {
  return (
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
        onClick={onClose}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
}
