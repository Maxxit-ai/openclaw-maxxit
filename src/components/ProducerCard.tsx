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
    <div className="glass rounded-xl overflow-hidden group hover:border-[var(--color-border-glow)] transition-all duration-300">
      {/* Header with ZK Badge */}
      <div className="p-4 pb-3 border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[rgba(0,255,136,0.08)] border border-[rgba(0,255,136,0.15)] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L2 4.5v7L8 15l6-3.5v-7L8 1z" stroke="var(--color-maxxit-green)" strokeWidth="1" fill="rgba(0,255,136,0.1)" />
                <path d="M6 8l1.5 1.5L10 7" stroke="var(--color-maxxit-green)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[var(--color-text-primary)]">
                {agent.commitment.slice(0, 6)}...{agent.commitment.slice(-4)}
              </div>
              <div className="text-[9px] font-mono text-[var(--color-text-muted)]">
                ZK-VERIFIED
              </div>
            </div>
          </div>
          <div className="zk-badge text-[8px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-[rgba(0,255,136,0.06)] border border-[rgba(0,255,136,0.15)] text-[var(--color-maxxit-green)]">
            PROOF VALID
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">WIN RATE</div>
            <div className={`text-lg font-bold font-mono ${
              agent.winRate >= 70 ? "text-[var(--color-maxxit-green)]" : "text-[var(--color-text-primary)]"
            }`}>
              {agent.winRate}%
            </div>
          </div>
          <div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">TOTAL PNL</div>
            <div className={`text-lg font-bold font-mono ${isProfitable ? "text-[var(--color-maxxit-green)]" : "text-[var(--color-loss-red)]"}`}>
              {isProfitable ? "+" : ""}${Number(agent.totalPnl).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">TRADES</div>
            <div className="text-sm font-bold font-mono text-[var(--color-text-primary)]">
              {agent.tradeCount}
              <span className="text-[var(--color-text-muted)] font-normal ml-1 text-[10px]">
                ({agent.winCount}W)
              </span>
            </div>
          </div>
          <div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">ACTIVE ALPHA</div>
            <div className="text-sm font-bold font-mono text-[var(--color-text-primary)]">
              {agent.activeAlphaCount}
              <span className="text-[var(--color-text-muted)] font-normal ml-1 text-[10px]">
                @ ${agent.defaultAlphaPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Proof Timestamp */}
        <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
          <div className="text-[9px] font-mono text-[var(--color-text-muted)]">
            PROOF: {timeAgo}
          </div>
          {onViewListings && (
            <button
              onClick={() => onViewListings(agent.commitment)}
              className="text-[10px] font-mono font-bold text-[var(--color-maxxit-green)] hover:underline transition-all cursor-pointer"
            >
              VIEW SIGNALS →
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
