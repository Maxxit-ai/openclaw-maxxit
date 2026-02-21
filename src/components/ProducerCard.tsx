"use client";

import type { AlphaAgent } from "@/lib/mockData";

interface ProducerCardProps {
  agent: AlphaAgent;
  onViewListings?: (commitment: string) => void;
}

export default function ProducerCard({ agent, onViewListings }: ProducerCardProps) {
  const isProfitable = parseFloat(agent.totalPnl) > 0;
  const timeAgo = getTimeAgo(agent.proofTimestamp);

  return (
    <div className="glass rounded-2xl overflow-hidden group hover:border-border/60 transition-all duration-500 bg-surface/40 flex flex-col h-full">
      {/* Header with ZK Badge */}
      <div className="p-5 pb-4 border-b border-border relative overflow-hidden">
        {/* Subtle grid background for header */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(var(--color-maxxit-green) 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }} />

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-(--color-maxxit-green)/10 border border-(--color-maxxit-green)/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L2 4.5v7L8 15l6-3.5v-7L8 1z" stroke="var(--color-maxxit-green)" strokeWidth="1" fill="rgba(0,255,136,0.1)" />
                <path d="M6 8l1.5 1.5L10 7" stroke="var(--color-maxxit-green)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-mono font-bold text-text-primary flex items-center gap-2">
                {agent.commitment.slice(0, 6)}...{agent.commitment.slice(-4)}
                <div className="w-1 h-1 rounded-full bg-(--color-maxxit-green) animate-pulse" />
              </div>
              <div className="text-[10px] font-mono text-text-muted tracking-widest uppercase opacity-70">
                PRODUCER_{agent.commitment.slice(0, 4)}
              </div>
            </div>
          </div>
          <div className="zk-badge text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-(--color-maxxit-green)/10 border border-(--color-maxxit-green)/30 text-(--color-maxxit-green)">
            ZK_PROOF_VALID
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-5 space-y-5 grow relative z-10">
        <div className="grid grid-cols-2 gap-5">
          <div className="group/stat">
            <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1.5 group-hover/stat:text-text-secondary transition-colors">WIN RATE</div>
            <div className={`text-2xl font-bold font-mono tracking-tight ${agent.winRate >= 70 ? "text-(--color-maxxit-green)" : "text-text-primary"
              }`}>
              {agent.winRate}%
            </div>
            <div className="h-0.5 w-full bg-border mt-2 rounded-full overflow-hidden">
              <div className="h-full bg-(--color-maxxit-green) opacity-50 transition-all duration-1000" style={{ width: `${agent.winRate}%` }} />
            </div>
          </div>
          <div className="group/stat">
            <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1.5 group-hover/stat:text-text-secondary transition-colors">TOTAL PNL</div>
            <div className={`text-2xl font-bold font-mono tracking-tight ${isProfitable ? "text-(--color-maxxit-green)" : "text-loss-red"}`}>
              {isProfitable ? "+" : ""}${Number(agent.totalPnl).toLocaleString()}
            </div>
            <div className="text-[9px] font-mono text-text-muted mt-2 opacity-60 italic">
              *verified on-chain
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 px-4 bg-background/30 rounded-xl border border-border/50 shadow-inner">
          <div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-text-muted mb-1">TOTAL TRADES</div>
            <div className="text-base font-bold font-mono text-text-primary">
              {agent.tradeCount}
              <span className="text-text-muted font-normal ml-1.5 text-[11px]">
                ({agent.winCount}W)
              </span>
            </div>
          </div>
          <div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-text-muted mb-1">LIVE SIGNALS</div>
            <div className="text-base font-bold font-mono text-text-primary flex items-center gap-2">
              {agent.activeAlphaCount}
              <span className="px-1.5 py-0.5 rounded-md bg-(--color-maxxit-green)/10 text-(--color-maxxit-green) text-[9px]">
                ${agent.defaultAlphaPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted opacity-50">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span className="text-[10px] font-mono text-text-muted">
              LATEST PROOF: {timeAgo.toUpperCase()}
            </span>
          </div>
          {onViewListings && (
            <button
              onClick={() => onViewListings(agent.commitment)}
              className="px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold text-(--color-maxxit-green) border border-(--color-maxxit-green)/20 hover:bg-(--color-maxxit-green)/10 hover:border-(--color-maxxit-green)/40 transition-all cursor-pointer group/btn"
            >
              SIGNALS <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
