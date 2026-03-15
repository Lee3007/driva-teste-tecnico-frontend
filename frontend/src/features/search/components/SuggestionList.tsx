import { MapPin, Building2 } from "lucide-react";
import type { Suggestion } from "../hooks/useSearch";

interface SuggestionListProps {
  suggestions: Suggestion[];
  selectedIndex: number;
  onSelect: (s: Suggestion) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

export default function SuggestionList({
  suggestions,
  selectedIndex,
  onSelect,
  dropdownRef,
}: SuggestionListProps) {
  if (suggestions.length === 0) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full mt-1 right-0 w-72 bg-[#1a1a3e] border border-white/10 rounded-lg shadow-lg overflow-hidden z-50"
    >
      {suggestions.map((s, i) => (
        <button
          key={`${s.type}-${s.label}-${s.sublabel}`}
          onClick={() => onSelect(s)}
          className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-white/10 transition-colors ${
            i === selectedIndex ? "bg-white/10" : ""
          }`}
        >
          {s.type === "state" ? (
            <MapPin size={14} className="text-blue-400 shrink-0" />
          ) : (
            <Building2 size={14} className="text-green-400 shrink-0" />
          )}
          <span className="text-white">{s.label}</span>
          <span className="text-[#94a3b8] ml-auto">{s.sublabel}</span>
        </button>
      ))}
    </div>
  );
}
