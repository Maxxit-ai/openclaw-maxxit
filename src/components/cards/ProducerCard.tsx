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
    <div className="glass group relative overflow-hidden rounded-2xl border-border/40 bg-surface/30 backdrop-blur-xl transition-all duration-700 hover:border-(--color-maxxit-green)/40 hover:bg-surface/50 hover:shadow-[0_0_40px_-10px_rgba(0,255,136,0.15)] flex flex-col h-full">

      {/* Header section */}
      <div className="relative z-10 p-4 sm:p-5 border-b border-border/30 bg-background/20">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-background/50 border border-border/50 flex items-center justify-center group-hover:border-(--color-maxxit-green)/30 transition-all duration-500 overflow-hidden shadow-inner">
                {/* Agent Avatar / Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-(--color-maxxit-green) opacity-80 group-hover:scale-110 transition-transform duration-500">
                  <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 7l-9 5-9-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Subtle scanning line within avatar */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-(--color-maxxit-green)/10 to-transparent h-1/2 w-full animate-scan" style={{ top: '-100%' }} />
              </div>
              {/* Online status indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-(--color-maxxit-green) border-2 border-background shadow-[0_0_8px_rgba(0,255,136,0.5)]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[clamp(0.875rem,2.5vw,1rem)] font-bold text-text-primary font-heading tracking-tight">
                  AGENT_{agent.commitment.slice(0, 4)}
                </span>
              </div>
              <span className="text-[clamp(0.5rem,1.5vw,0.625rem)] font-mono text-text-muted uppercase tracking-widest opacity-60">
                ZK_ID: {agent.commitment.slice(0, 8)}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <div className="zk-badge text-[clamp(0.5rem,1.2vw,0.5625rem)] font-mono font-bold uppercase tracking-wider px-2 sm:px-2.5 py-1 rounded-md bg-(--color-maxxit-green)/10 border border-(--color-maxxit-green)/20 text-(--color-maxxit-green) shadow-[0_0_15px_rgba(0,255,136,0.1)]">
              ZK_PROVEN
            </div>
          </div>
        </div>
      </div>

      {/* Stats body */}
      <div className="relative z-10 p-5 space-y-6 grow">
        <div className="grid grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[clamp(0.5rem,1.5vw,0.625rem)] font-mono uppercase tracking-[0.15em] text-text-muted">WIN_RATE</span>
              <span className="text-[clamp(0.5rem,1.5vw,0.625rem)] font-mono text-(--color-maxxit-green)/80">PASS</span>
            </div>
            <div className="relative">
              <div className="text-[clamp(1.5rem,5vw,1.875rem)] font-bold font-mono tracking-tighter text-text-primary">
                {agent.winRate}<span className="text-[clamp(0.625rem,1.5vw,0.75rem)] text-text-muted font-normal ml-0.5">%</span>
              </div>
              {/* Visual meter */}
              <div className="h-1 w-full bg-border/20 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-(--color-maxxit-green)/30 to-(--color-maxxit-green) shadow-[0_0_10px_rgba(0,255,136,0.3)] transition-all duration-1000 ease-out"
                  style={{ width: `${agent.winRate}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[clamp(0.5rem,1.5vw,0.625rem)] font-mono uppercase tracking-[0.15em] text-text-muted">TOTAL_PNL</span>
              <span className={`w-1.5 h-1.5 rounded-full ${isProfitable ? "bg-(--color-maxxit-green)" : "bg-loss-red"} animate-pulse`} />
            </div>
            <div className={`text-[clamp(1.5rem,5vw,1.875rem)] font-bold font-mono tracking-tighter ${isProfitable ? "text-(--color-maxxit-green)" : "text-loss-red"}`}>
              {isProfitable ? "+" : ""}{Number(agent.totalPnl).toLocaleString()}
              <span className="text-[clamp(0.5rem,1.5vw,0.625rem)] text-text-muted ml-0.5">USD</span>
            </div>
          </div>
        </div>

        {/* Trade Details Grid */}
        <div className="grid grid-cols-2 gap-px bg-border/20 border border-border/20 rounded-xl overflow-hidden backdrop-blur-sm">
          <div className="p-3 bg-background/20 group-hover:bg-background/40 transition-colors">
            <div className="text-[clamp(0.5rem,1.5vw,0.5625rem)] font-mono text-text-muted mb-1 uppercase opacity-60">TRADE_COUNT</div>
            <div className="text-[clamp(0.875rem,2.5vw,1rem)] font-bold font-mono text-text-primary">
              {agent.tradeCount}
              <span className="text-[clamp(0.5625rem,1.5vw,0.625rem)] text-text-muted font-normal ml-2 opacity-50">#T</span>
            </div>
          </div>
          <div className="p-3 bg-background/20 group-hover:bg-background/40 transition-colors">
            <div className="text-[clamp(0.5rem,1.5vw,0.5625rem)] font-mono text-text-muted mb-1 uppercase opacity-60">ALPHA_STREAM</div>
            <div className="text-[clamp(0.875rem,2.5vw,1rem)] font-bold font-mono text-(--color-maxxit-green) flex items-center justify-between">
              {agent.activeAlphaCount}
              <span className="text-[clamp(0.5rem,1.2vw,0.625rem)] bg-(--color-maxxit-green)/10 px-1.5 py-0.5 rounded border border-(--color-maxxit-green)/20">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="relative z-10 p-4 sm:p-5 pt-0 mt-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/20 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full border border-(--color-maxxit-green)/30 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-(--color-maxxit-green) animate-pulse" />
            </div>
            <span className="text-[clamp(0.5rem,1.5vw,0.625rem)] font-mono text-text-muted">
              SYNC_STATUS: <span className="text-text-secondary">OPERATIONAL</span>
            </span>
          </div>

          <button
            onClick={() => onViewListings?.(agent.commitment)}
            className="cursor-pointer w-full sm:w-auto px-6 py-2.5 rounded-lg text-[10px] sm:text-xs font-mono font-bold text-background bg-(--color-maxxit-green) hover:bg-(--color-maxxit-green)/90 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(0,255,136,0.15)] hover:shadow-[0_0_30px_rgba(0,255,136,0.25)] flex items-center justify-center gap-2 group/btn"
          >
            VIEW SIGNALS
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
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
