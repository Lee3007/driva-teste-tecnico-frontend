import LayerControls from "./LayerControls";
import Filters from "./Filters";
import SummaryCards from "./SummaryCards";
import type { Summary } from "@market/shared";

interface SidebarProps {
  summary: Summary | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ summary, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-14 left-0 h-[calc(100%-3.5rem)] w-80 bg-[#13132b] border-r border-white/10 overflow-y-auto z-30 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4 space-y-6">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-3">
              Camadas
            </h2>
            <LayerControls />
          </section>

          <div className="border-t border-white/10" />

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-3">
              Filtros
            </h2>
            <Filters />
          </section>

          <div className="border-t border-white/10" />

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-3">
              Resumo
            </h2>
            <SummaryCards summary={summary} />
          </section>
        </div>
      </aside>
    </>
  );
}
