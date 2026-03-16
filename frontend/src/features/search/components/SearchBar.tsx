import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import type { State, Store } from "@market/shared";
import { useSearch } from "../hooks/useSearch";
import SuggestionList from "./SuggestionList";

interface SearchBarProps {
  states: State[];
  stores: Store[];
}

export default function SearchBar({ states, stores }: SearchBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleSelectMobile = (s: any) => {
    selectSuggestion(s);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen, inputRef]);

  return (
    <>
      {/* Desktop: inline search */}
      <div className="relative hidden md:block">
        <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 focus-within:border-blue-500 transition-colors w-72">
          <Search size={16} className="text-[#94a3b8] mr-2 shrink-0" />
          <input
            ref={!isModalOpen ? inputRef : undefined}
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

      {/* Mobile: search icon button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
      >
        <Search size={20} />
      </button>

      {/* Mobile: fullscreen search modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0f0f23] z-50 flex flex-col md:hidden">
          <div className="flex items-center gap-3 px-4 h-14 border-b border-white/10">
            <Search size={18} className="text-[#94a3b8] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
                setSelectedIndex(-1);
              }}
              onKeyDown={onKeyDown}
              placeholder="Buscar estado ou cidade..."
              className="bg-transparent text-white placeholder-[#94a3b8] text-sm outline-none flex-1"
              autoFocus
            />
            <button
              onClick={() => {
                setIsModalOpen(false);
                setQuery("");
                setShowDropdown(false);
              }}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {suggestions.map((s, i) => (
              <button
                key={`${s.type}-${s.label}-${s.sublabel}`}
                onClick={() => handleSelectMobile(s)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-white/10 transition-colors border-b border-white/5 ${
                  i === selectedIndex ? "bg-white/10" : ""
                }`}
              >
                <Search size={14} className="text-[#94a3b8] shrink-0" />
                <div>
                  <span className="text-white">{s.label}</span>
                  <span className="text-[#94a3b8] ml-2">{s.sublabel}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
