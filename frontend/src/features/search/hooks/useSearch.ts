import { useState, useRef, useEffect, useCallback } from "react";
import type { State, Store } from "@market/shared";
import { useMapStore } from "@/features/map/store/mapStore";
import { capitalCoordinates } from "@/shared/utils/capitalCoordinates";

export interface Suggestion {
  type: "state" | "city";
  label: string;
  sublabel: string;
  stateCode: string;
  lat: number;
  lng: number;
}

export function useSearch(states: State[], stores: Store[]) {
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

  return {
    query,
    setQuery,
    suggestions,
    showDropdown,
    setShowDropdown,
    selectedIndex,
    setSelectedIndex,
    selectSuggestion,
    onKeyDown,
    inputRef,
    dropdownRef,
  };
}
