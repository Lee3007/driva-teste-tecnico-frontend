interface PresenceCardProps {
  storeCount: number;
  competitorCount: number;
}

export default function PresenceCard({ storeCount, competitorCount }: PresenceCardProps) {
  return (
    <div className="bg-[#1a1a3e] rounded-lg p-3">
      <div className="text-xs text-[#94a3b8] mb-2">Presença</div>
      <div className="flex items-center gap-4">
        <div>
          <span className="text-lg font-bold text-blue-400">
            {storeCount}
          </span>
          <span className="text-xs text-[#94a3b8] ml-1">lojas</span>
        </div>
        <div>
          <span className="text-lg font-bold text-red-400">
            {competitorCount}
          </span>
          <span className="text-xs text-[#94a3b8] ml-1">concorrentes</span>
        </div>
      </div>
      {storeCount === 0 && (
        <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs bg-red-500/20 text-red-400">
          Sem presença
        </span>
      )}
    </div>
  );
}
