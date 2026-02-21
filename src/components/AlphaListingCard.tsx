"use client";

import type { AlphaListing } from "@/lib/mockData";

interface AlphaListingCardProps {
  listing: AlphaListing;
  onPurchase?: (listingId: string) => void;
  revealed?: boolean;
}

export default function AlphaListingCard({
  listing,
  onPurchase,
  revealed = false,
}: AlphaListingCardProps) {
  const isLong = listing.side === "LONG";
  const convictionPct = (listing.positionPct / 100).toFixed(1);
  const isHighConviction = listing.positionPct >= 2000;

  return (
    <div className={`glass rounded-2xl overflow-hidden group transition-all duration-500 bg-surface/40 flex flex-col h-full border ${isLong ? "hover:border-border/60" : "hover:border-border/60"
      }`}>
      {/* Conviction Indicator */}
      {isHighConviction && (
        <div className="absolute top-4 right-4 z-20">
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-(--color-maxxit-green)/10 border border-(--color-maxxit-green)/30 text-(--color-maxxit-green)">
            HIGH_CONVICTION
          </span>
        </div>
      )}



      {/* Header */}
      <div className="p-5 pb-4 border-b border-border relative z-10">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-2.5">
            <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded-md tracking-wider ${isLong
              ? "bg-(--color-maxxit-green)/10 text-(--color-maxxit-green) border border-(--color-maxxit-green)/20"
              : "bg-loss-red/10 text-loss-red border border-loss-red/20"
              }`}>
              {listing.side}
            </span>
            <div className="flex flex-col">
              <span className="text-base font-bold text-text-primary leading-none mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                {revealed ? listing.token : "ENCRYPTED_ASSET"}
              </span>
              <span className="text-[9px] font-mono text-text-muted uppercase tracking-[0.2em]">
                LEVERAGE: {listing.leverage}X
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted opacity-60">
          <div className="w-1.5 h-1.5 rounded-full bg-border" />
          AGENT_{listing.commitment.slice(0, 8)}...
        </div>
      </div>

      {/* Metrics */}
      <div className="p-5 space-y-4 grow relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-xl bg-background/40 border border-border/50">
            <div className="text-[9px] font-mono uppercase tracking-widest text-text-muted mb-1">PROVEN WIN RATE</div>
            <div className={`text-lg font-bold font-mono ${listing.agentMetrics.winRate >= 70
              ? "text-(--color-maxxit-green)"
              : "text-text-primary"
              }`}>
              {listing.agentMetrics.winRate}%
            </div>
          </div>
          <div className="p-3 rounded-xl bg-background/40 border border-border/50">
            <div className="text-[9px] font-mono uppercase tracking-widest text-text-muted mb-1">POS CONVICTION</div>
            <div className="text-lg font-bold font-mono text-text-primary">
              {convictionPct}%
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted">AGENT PNL</span>
            <span className="text-sm font-bold font-mono text-(--color-maxxit-green)">
              +${Number(listing.agentMetrics.totalPnl).toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted">TOTAL TRADES</span>
            <span className="text-sm font-bold font-mono text-text-primary">
              {listing.agentMetrics.tradeCount}
            </span>
          </div>
        </div>

        {/* Price + Action */}
        <div className="pt-4 border-t border-border mt-auto flex items-center justify-between">
          <div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-text-muted mb-0.5">PURCHASE PRICE</div>
            <div className="text-xl font-bold text-text-primary font-mono tracking-tight">
              {listing.priceUsdc} <span className="text-[10px] text-text-muted font-normal">USDC</span>
            </div>
          </div>
          {onPurchase && !revealed && (
            <button
              onClick={() => onPurchase(listing.listingId)}
              className="px-5 py-2.5 rounded-xl bg-(--color-maxxit-green) text-background text-[11px] font-mono font-bold transition-all active:scale-95 flex items-center gap-2 group/btn"
            >
              UNLOCK ALPHA
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          )}
          {revealed && (
            <div className="px-4 py-2 rounded-xl bg-(--color-maxxit-green)/10 border border-(--color-maxxit-green)/20 text-(--color-maxxit-green) text-[10px] font-mono font-bold flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              UNLOCKED
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
