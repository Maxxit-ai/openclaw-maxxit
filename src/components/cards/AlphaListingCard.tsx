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
    <div className={`glass group relative overflow-hidden rounded-2xl border-border/40 bg-surface/30 backdrop-blur-xl transition-all duration-700 hover:border-${isLong ? '(--color-maxxit-green)/40' : 'loss-red/40'} hover:bg-surface/50 hover:shadow-[0_0_40px_-10px_rgba(${isLong ? '0,255,136' : '255,68,68'},0.15)] flex flex-col h-full`}>

      {/* High Conviction Badge */}
      {isHighConviction && (
        <div className="absolute top-0 right-0 z-20 overflow-hidden rounded-bl-xl">
          <div className="bg-(--color-maxxit-green) text-background text-[clamp(0.5rem,1.2vw,0.625rem)] font-mono font-bold px-3 py-1 uppercase tracking-tighter shadow-lg rotate-0">
            HIGH_CONVICTION
          </div>
        </div>
      )}

      {/* Header section with Asset Info */}
      <div className="relative z-10 p-4 sm:p-5 border-b border-border/30 bg-background/20">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-background/50 border border-border/50 flex items-center justify-center shrink-0 ${isLong ? 'group-hover:border-(--color-maxxit-green)/30' : 'group-hover:border-loss-red/30'} transition-all duration-500 overflow-hidden`}>
              {revealed ? (
                <span className="text-[clamp(1rem,2.5vw,1.125rem)] font-bold text-text-primary capitalize">{listing.token.slice(0, 1)}</span>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-text-muted opacity-40">
                  <path d="M12 11V17M12 11V11.01M12 11C10.3431 11 9 12.3431 9 14C9 15.6569 10.3431 17 12 17C13.6569 17 15 15.6569 15 14C15 12.3431 13.6569 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[clamp(0.5rem,1.2vw,0.5625rem)] font-mono font-bold px-1.5 py-0.5 rounded border ${isLong ? 'bg-(--color-maxxit-green)/10 text-(--color-maxxit-green) border-(--color-maxxit-green)/20' : 'bg-loss-red/10 text-loss-red border-loss-red/20'}`}>
                  {listing.side}
                </span>
                <span className="text-[clamp(0.5rem,1.2vw,0.5625rem)] font-mono text-text-muted uppercase tracking-[0.2em] opacity-40">
                  LEV_{listing.leverage}X
                </span>
              </div>
              <h3 className="text-[clamp(0.875rem,2.5vw,1rem)] font-bold text-text-primary font-heading tracking-tight">
                {revealed ? listing.token : "ENCRYPTED_ALPHA"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="relative z-10 p-5 space-y-5 grow">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-background/20 rounded-xl border border-border/10">
            <div className="text-[clamp(0.5rem,1.2vw,0.5625rem)] font-mono text-text-muted uppercase tracking-widest mb-1 opacity-60">WIN_RATE</div>
            <div className={`text-[clamp(1.125rem,3vw,1.25rem)] font-bold font-mono ${listing.agentMetrics.winRate >= 70 ? 'text-(--color-maxxit-green)' : 'text-text-primary'}`}>
              {listing.agentMetrics.winRate}<span className="text-[clamp(0.5625rem,1.2vw,0.625rem)] font-normal opacity-50">%</span>
            </div>
          </div>
          <div className="p-3 bg-background/20 rounded-xl border border-border/10">
            <div className="text-[clamp(0.5rem,1.2vw,0.5625rem)] font-mono text-text-muted uppercase tracking-widest mb-1 opacity-60">CONVICTION</div>
            <div className="text-[clamp(1.125rem,3vw,1.25rem)] font-bold font-mono text-text-primary">
              {convictionPct}<span className="text-[clamp(0.5625rem,1.2vw,0.625rem)] font-normal opacity-50">%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-1 py-1">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-text-muted uppercase tracking-widest opacity-60">AGENT_PNL</span>
            <span className="text-sm font-bold font-mono text-(--color-maxxit-green)">
              +${Number(listing.agentMetrics.totalPnl).toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[clamp(0.5rem,1.2vw,0.5625rem)] font-mono text-text-muted uppercase tracking-widest opacity-60">ID_REF</span>
            <span className="text-[clamp(0.5625rem,1.5vw,0.625rem)] font-mono text-text-primary uppercase">
              STR_{listing.listingId.slice(0, 8)}
            </span>
          </div>
        </div>

        {/* Footer info within body */}
        <div className="flex items-center gap-2 border-t border-border/20 pt-4 mt-auto">
          <div className="w-4 h-4 rounded-full bg-background/40 border border-border/30 flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="text-text-muted">
              <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[clamp(0.5rem,1.5vw,0.5625rem)] font-mono text-text-muted uppercase tracking-widest">
            PUBLISHED BY PRODUCER_{listing.commitment.slice(0, 4)}
          </span>
        </div>
      </div>

      {/* Action / Price Footer */}
      <div className="relative z-10 p-4 sm:p-5 pt-0">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-background/30 p-3 sm:p-4 rounded-xl border border-border/40 backdrop-blur-md">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-text-muted uppercase tracking-widest opacity-60">SIGNAL_FEE</span>
            <div className="text-lg sm:text-xl font-bold text-text-primary font-mono tracking-tighter">
              {listing.priceUsdc} <span className="text-[10px] font-normal text-text-muted">USDC</span>
            </div>
          </div>

          {onPurchase && !revealed ? (
            <button
              onClick={() => onPurchase(listing.listingId)}
              className="cursor-pointer px-6 py-2.5 rounded-lg text-[clamp(0.5625rem,1.5vw,0.625rem)] font-mono font-bold text-background bg-(--color-maxxit-green) hover:bg-(--color-maxxit-green)/90 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(0,255,136,0.15)] flex items-center justify-center gap-2 group/btn"
            >
              UNLOCK_ALPHA
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          ) : (
            <div className="px-6 py-2.5 rounded-lg text-[10px] font-mono font-bold text-(--color-maxxit-green) border border-(--color-maxxit-green)/20 bg-(--color-maxxit-green)/5 flex items-center justify-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              ALREADY_UNLOCKED
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
