import { Search } from "lucide-react";
import type { State, Store } from "@market/shared";
import { useSearch } from "../hooks/useSearch";
import SuggestionList from "./SuggestionList";

interface SearchBarProps {
  states: State[];
  stores: Store[];
}

export default function SearchBar({ states, stores }: SearchBarProps) {
  const {
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
  } = useSearch(states, stores);

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
      {showDropdown && (
        <SuggestionList
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          onSelect={selectSuggestion}
          dropdownRef={dropdownRef}
        />
      )}
    </div>
  );
}
