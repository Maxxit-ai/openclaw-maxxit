"use client";

import { useState } from "react";
import type { AlphaListing, AlphaContent } from "@/lib/mockData";

interface ListingDetailModalProps {
  listing: AlphaListing;
  onClose: () => void;
  onPurchase: (listingId: string) => Promise<AlphaContent | null>;
}

export default function ListingDetailModal({
  listing,
  onClose,
  onPurchase,
}: ListingDetailModalProps) {
  const [state, setState] = useState<"preview" | "purchasing" | "revealed">("preview");
  const [alpha, setAlpha] = useState<AlphaContent | null>(null);
  const [verified, setVerified] = useState<boolean | null>(null);

  const handlePurchase = async () => {
    setState("purchasing");
    const content = await onPurchase(listing.listingId);
    if (content) {
      setAlpha(content);
      setState("revealed");
    } else {
      setState("preview");
    }
  };

  const handleVerify = () => {
    setVerified(true);
  };

  const isLong = listing.side === "LONG";
  const convictionPct = (listing.positionPct / 100).toFixed(1);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] shadow-[0_0_60px_-10px_rgba(0,255,136,0.12)] overflow-hidden">
        {/* Header */}
        <div className="h-10 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-loss-red)] opacity-60" />
              <span className="w-2 h-2 rounded-full bg-[var(--color-openclaw-accent)] opacity-60" />
              <span className="w-2 h-2 rounded-full bg-[var(--color-maxxit-green)] opacity-60" />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
              ALPHA_DETAIL // {listing.listingId.slice(0, 12)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-mono"
          >
            [ESC]
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Agent Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[rgba(0,255,136,0.08)] border border-[rgba(0,255,136,0.15)] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L2 4.5v7L8 15l6-3.5v-7L8 1z" stroke="var(--color-maxxit-green)" strokeWidth="1" fill="rgba(0,255,136,0.1)" />
                  <path d="M6 8l1.5 1.5L10 7" stroke="var(--color-maxxit-green)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-mono font-bold text-[var(--color-text-primary)]">
                  {listing.commitment.slice(0, 8)}...{listing.commitment.slice(-6)}
                </div>
                <div className="text-[9px] font-mono text-[var(--color-maxxit-green)]">ZK-VERIFIED PRODUCER</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold font-mono text-[var(--color-text-primary)]">
                ${listing.priceUsdc}
              </div>
              <div className="text-[9px] font-mono text-[var(--color-text-muted)]">USDC VIA x402</div>
            </div>
          </div>

          {/* Signal Preview */}
          <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-4">
            <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
              SIGNAL PREVIEW
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="text-[9px] font-mono text-[var(--color-text-muted)]">DIRECTION</div>
                <span className={`text-sm font-mono font-bold ${isLong ? "text-[var(--color-maxxit-green)]" : "text-[var(--color-loss-red)]"}`}>
                  {listing.side}
                </span>
              </div>
              <div>
                <div className="text-[9px] font-mono text-[var(--color-text-muted)]">LEVERAGE</div>
                <div className="text-sm font-mono font-bold text-[var(--color-text-primary)]">{listing.leverage}x</div>
              </div>
              <div>
                <div className="text-[9px] font-mono text-[var(--color-text-muted)]">CONVICTION</div>
                <div className="text-sm font-mono font-bold text-[var(--color-text-primary)]">{convictionPct}%</div>
              </div>
              <div>
                <div className="text-[9px] font-mono text-[var(--color-text-muted)]">TOKEN</div>
                <div className="text-sm font-mono font-bold text-[var(--color-text-primary)]">
                  {state === "revealed" && alpha ? alpha.token : "???"}
                </div>
              </div>
              <div>
                <div className="text-[9px] font-mono text-[var(--color-text-muted)]">ENTRY PRICE</div>
                <div className="text-sm font-mono font-bold text-[var(--color-text-primary)]">
                  {state === "revealed" && alpha ? `$${alpha.entryPrice.toLocaleString()}` : "???"}
                </div>
              </div>
              <div>
                <div className="text-[9px] font-mono text-[var(--color-text-muted)]">COLLATERAL</div>
                <div className="text-sm font-mono font-bold text-[var(--color-text-primary)]">
                  {state === "revealed" && alpha ? `$${alpha.collateralUsdc}` : "???"}
                </div>
              </div>
            </div>
          </div>

          {/* Agent Metrics */}
          <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-4">
            <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
              AGENT PERFORMANCE (ZK-PROVEN)
            </div>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div>
                <div className="text-lg font-bold font-mono text-[var(--color-maxxit-green)]">
                  {listing.agentMetrics.winRate}%
                </div>
                <div className="text-[8px] font-mono text-[var(--color-text-muted)]">WIN RATE</div>
              </div>
              <div>
                <div className="text-lg font-bold font-mono text-[var(--color-text-primary)]">
                  {listing.agentMetrics.tradeCount}
                </div>
                <div className="text-[8px] font-mono text-[var(--color-text-muted)]">TRADES</div>
              </div>
              <div>
                <div className="text-lg font-bold font-mono text-[var(--color-maxxit-green)]">
                  +${(Number(listing.agentMetrics.totalPnl) / 1000).toFixed(0)}k
                </div>
                <div className="text-[8px] font-mono text-[var(--color-text-muted)]">PNL</div>
              </div>
              <div>
                <div className="text-lg font-bold font-mono text-[var(--color-text-primary)]">
                  ${(Number(listing.agentMetrics.totalCollateral) / 1000).toFixed(0)}k
                </div>
                <div className="text-[8px] font-mono text-[var(--color-text-muted)]">COLLATERAL</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {state === "preview" && (
              <button
                onClick={handlePurchase}
                className="flex-1 py-3 rounded-lg bg-[var(--color-maxxit-green)] text-[var(--color-background)] font-mono text-xs font-bold hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all"
              >
                PURCHASE ALPHA — ${listing.priceUsdc} USDC
              </button>
            )}
            {state === "purchasing" && (
              <div className="flex-1 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-center font-mono text-xs text-[var(--color-maxxit-green)]">
                <span className="animate-pulse">PROCESSING x402 PAYMENT...</span>
              </div>
            )}
            {state === "revealed" && (
              <>
                <button
                  onClick={handleVerify}
                  className={`flex-1 py-3 rounded-lg border font-mono text-xs font-bold transition-all ${
                    verified
                      ? "border-[var(--color-maxxit-green)] text-[var(--color-maxxit-green)] bg-[rgba(0,255,136,0.06)]"
                      : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-maxxit-green)]"
                  }`}
                >
                  {verified ? "VERIFIED ✓" : "VERIFY CONTENT"}
                </button>
                <button className="flex-1 py-3 rounded-lg bg-[var(--color-maxxit-green)] text-[var(--color-background)] font-mono text-xs font-bold hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all">
                  EXECUTE TRADE
                </button>
              </>
            )}
          </div>

          {/* x402 Info */}
          <div className="text-[9px] font-mono text-[var(--color-text-muted)] text-center leading-relaxed">
            Payment via x402 protocol on Arbitrum Sepolia · USDC · Trustless · No intermediary
          </div>
        </div>
      </div>
    </div>
  );
}
