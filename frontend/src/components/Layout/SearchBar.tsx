import { useState, useRef, useEffect, useCallback } from "react";
import { Search, MapPin, Building2 } from "lucide-react";
import type { State, Store } from "@market/shared";
import { useMapStore } from "../../store/mapStore";
import { capitalCoordinates } from "../../utils/capitalCoordinates";

interface SearchBarProps {
  states: State[];
  stores: Store[];
}

interface Suggestion {
  type: "state" | "city";
  label: string;
  sublabel: string;
  stateCode: string;
  lat: number;
  lng: number;
}

export default function SearchBar({ states, stores }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const setSelectedState = useMapStore((s) => s.setSelectedState);
  const flyTo = useMapStore((s) => s.flyTo);

  const search = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setSuggestions([]);
        return;
      }
      const lower = q.toLowerCase();
      const results: Suggestion[] = [];

      for (const s of states) {
        if (
          s.name.toLowerCase().includes(lower) ||
          s.code.toLowerCase().includes(lower)
        ) {
          const coords = capitalCoordinates[s.code];
          if (coords) {
            results.push({
              type: "state",
              label: s.name,
              sublabel: s.code,
              stateCode: s.code,
              lat: coords[0],
              lng: coords[1],
            });
          }
        }
      }

      const cities = new Map<string, Store>();
      for (const st of stores) {
        if (st.city.toLowerCase().includes(lower)) {
          const key = `${st.city}-${st.state}`;
          if (!cities.has(key)) cities.set(key, st);
        }
      }
      for (const st of cities.values()) {
        results.push({
          type: "city",
          label: st.city,
          sublabel: st.state,
          stateCode: st.state,
          lat: st.latitude,
          lng: st.longitude,
        });
      }

      setSuggestions(results.slice(0, 8));
    },
    [states, stores]
  );

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectSuggestion = (s: Suggestion) => {
    if (s.type === "state") {
      setSelectedState(s.stateCode);
      flyTo(s.lat, s.lng, 6);
    } else {
      flyTo(s.lat, s.lng, 10);
    }
    setQuery("");
    setShowDropdown(false);
    setSuggestions([]);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowDropdown(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      selectSuggestion(suggestions[selectedIndex]);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 focus-within:border-blue-500 transition-colors w-48 sm:w-72">
        <Search size={16} className="text-[#94a3b8] mr-2 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => query && setShowDropdown(true)}
          onKeyDown={onKeyDown}
          placeholder="Buscar estado ou cidade..."
          className="bg-transparent text-white placeholder-[#94a3b8] text-sm outline-none w-full"
        />
      </div>
      {showDropdown && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-1 right-0 w-72 bg-[#1a1a3e] border border-white/10 rounded-lg shadow-lg overflow-hidden z-50"
        >
          {suggestions.map((s, i) => (
            <button
              key={`${s.type}-${s.label}-${s.sublabel}`}
              onClick={() => selectSuggestion(s)}
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
      )}
    </div>
  );
}
