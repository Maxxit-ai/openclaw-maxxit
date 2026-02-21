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
    <div className="glass rounded-xl overflow-hidden group hover:border-[var(--color-border-glow)] transition-all duration-300 relative">
      {/* Conviction Indicator */}
      {isHighConviction && (
        <div className="absolute top-3 right-3 z-10">
          <span className="text-[8px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.2)] text-[var(--color-maxxit-green)]">
            HIGH CONVICTION
          </span>
        </div>
      )}

      {/* Header */}
      <div className="p-4 pb-3 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
              isLong
                ? "bg-[rgba(0,255,136,0.1)] text-[var(--color-maxxit-green)]"
                : "bg-[rgba(255,68,68,0.1)] text-[var(--color-loss-red)]"
            }`}>
              {listing.side}
            </span>
            <span className="text-sm font-bold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
              {revealed ? listing.token : "???"}
            </span>
          </div>
          <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
            {listing.leverage}x
          </span>
        </div>
        <div className="text-[10px] font-mono text-[var(--color-text-muted)] truncate">
          agent: {listing.commitment.slice(0, 8)}...{listing.commitment.slice(-6)}
        </div>
      </div>

      {/* Metrics */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">WIN RATE</div>
            <div className={`text-sm font-bold font-mono ${
              listing.agentMetrics.winRate >= 70
                ? "text-[var(--color-maxxit-green)]"
                : "text-[var(--color-text-primary)]"
            }`}>
              {listing.agentMetrics.winRate}%
            </div>
          </div>
          <div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">TRADES</div>
            <div className="text-sm font-bold font-mono text-[var(--color-text-primary)]">
              {listing.agentMetrics.tradeCount}
            </div>
          </div>
          <div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">CONVICTION</div>
            <div className="text-sm font-bold font-mono text-[var(--color-text-primary)]">
              {convictionPct}%
            </div>
          </div>
          <div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">TOTAL PNL</div>
            <div className="text-sm font-bold font-mono text-[var(--color-maxxit-green)]">
              +${Number(listing.agentMetrics.totalPnl).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Price + Action */}
        <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
          <div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-muted)]">PRICE</div>
            <div className="text-lg font-bold text-[var(--color-text-primary)] font-mono">
              ${listing.priceUsdc} <span className="text-[10px] text-[var(--color-text-muted)] font-normal">USDC</span>
            </div>
          </div>
          {onPurchase && !revealed && (
            <button
              onClick={() => onPurchase(listing.listingId)}
              className="px-4 py-2 rounded-lg bg-[var(--color-maxxit-green)] text-[var(--color-background)] text-[11px] font-mono font-bold hover:shadow-[0_0_16px_rgba(0,255,136,0.3)] transition-all"
            >
              BUY ALPHA
            </button>
          )}
          {revealed && (
            <span className="text-[10px] font-mono text-[var(--color-maxxit-green)] flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 6l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              PURCHASED
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
