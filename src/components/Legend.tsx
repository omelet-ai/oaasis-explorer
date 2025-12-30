export function Legend() {
  return (
    <div className="absolute bottom-6 left-6 z-50 bg-[#2a2640]/95 border border-[#3d3755] rounded-2xl p-4 max-w-[180px] shadow-lg">
      <h3 className="text-white font-medium text-xs mb-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#2DD4BF]" />
        Architecture
      </h3>

      <div className="space-y-2 text-[11px]">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#A78BFA]" />
          <span className="text-gray-300">Core & Solvers</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#2DD4BF]" />
          <span className="text-gray-300">MCP & Apps</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-[#3d3755]">
        <div className="space-y-1.5 text-[10px] text-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
            <span>Has link</span>
          </div>
        </div>
      </div>
    </div>
  );
}
