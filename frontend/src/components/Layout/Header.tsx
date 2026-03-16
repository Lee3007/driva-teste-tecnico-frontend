import { Menu, Map } from "lucide-react";
import { SearchBar } from "@/features/search";
import type { State, Store } from "@market/shared";

interface HeaderProps {
  states: State[];
  stores: Store[];
  onToggleSidebar: () => void;
}

export default function Header({ states, stores, onToggleSidebar }: HeaderProps) {
  return (
    <header className="h-14 bg-[#0f0f23] border-b border-white/10 flex items-center justify-between px-4 z-40 relative">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
        <Map size={22} className="text-blue-400 hidden sm:block" />
        <h1 className="text-base font-bold hidden sm:block">
          Inteligência de Mercado
        </h1>
      </div>
      {/* Mobile: centered title */}
      <div className="sm:hidden absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <Map size={18} className="text-blue-400" />
        <h1 className="text-sm font-bold">Inteligência de Mercado</h1>
      </div>
      <SearchBar states={states} stores={stores} />
    </header>
  );
}
