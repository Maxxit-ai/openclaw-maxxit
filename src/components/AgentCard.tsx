"use client";

import { useEffect, useState } from "react";

interface AgentCardProps {
    name: string;
    wallet: string;
    winRate: number;
    pnl: string;
    trades: number;
    impactFactor: number;
    venue: "OSTIUM" | "ASTER";
    status: "ACTIVE" | "IDLE";
    isHighlighted?: boolean;
}

export default function AgentCard({
    name,
    wallet,
    winRate,
    pnl,
    trades,
    impactFactor,
    venue,
    status,
    isHighlighted = false,
}: AgentCardProps) {
    const [isCopied, setIsCopied] = useState(false);
    const isProfitable = !pnl.startsWith("-");

    const copyToClipboard = () => {
        navigator.clipboard.writeText(wallet);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div
            className={`relative rounded-xl overflow-hidden border transition-all duration-300 group hover:-translate-y-1 ${isHighlighted
                ? "bg-[rgba(251,191,36,0.03)] border-ascii shadow-[0_0_30px_-10px_rgba(251,191,36,0.2)]"
                : "glass border-[var(--color-border)] hover:border-[var(--color-text-secondary)]"
                }`}
        >
            {isHighlighted && (
                <>
                    <div className="bg-[var(--color-openclaw-accent)] h-6 flex items-center justify-between px-3 text-[9px] font-mono font-bold text-[var(--color-background)] uppercase tracking-widest">
                        <span>NODE_ID: {wallet.slice(0, 4)}</span>
                        <span>V2.1-CLAW</span>
                    </div>
                    <span className="corner-bl" />
                    <span className="corner-br" />
                </>
            )}

            <div className={`p-5 ${isHighlighted ? 'scanlines' : ''}`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-lg ${isHighlighted
                                ? "bg-[rgba(251,191,36,0.1)] text-[var(--color-openclaw-accent)] border border-[var(--color-openclaw-accent)]"
                                : "bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                                }`}
                        >
                            {name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-[var(--color-text-primary)] leading-tight">
                                {name}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-mono">
                                    {venue}
                                </span>
                                <span className="w-0.5 h-0.5 rounded-full bg-[var(--color-text-muted)]" />
                                <button
                                    onClick={copyToClipboard}
                                    className="text-[10px] text-[var(--color-text-secondary)] hover:text-[var(--color-maxxit-green)] transition-colors flex items-center gap-1 font-mono"
                                    title="Copy Address"
                                >
                                    {wallet.slice(0, 6)}...{wallet.slice(-4)}
                                    {isCopied ? (
                                        <span className="text-[var(--color-maxxit-green)]">✓</span>
                                    ) : (
                                        <span className="opacity-50 text-[8px]">📋</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider ${status === "ACTIVE"
                            ? "bg-[rgba(0,255,136,0.1)] text-[var(--color-maxxit-green)] border border-[rgba(0,255,136,0.2)]"
                            : "bg-[var(--color-surface-2)] text-[var(--color-text-muted)]"
                            }`}
                    >
                        {status === "ACTIVE" ? "VERIFIED" : status}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-[var(--color-surface)] rounded-lg p-3 border border-[var(--color-border)]">
                        <div className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-widest mb-1 font-mono">
                            SUCCESS RATE
                        </div>
                        <div className={`text-lg font-bold font-mono ${winRate >= 60 ? "text-[var(--color-maxxit-green)]" : "text-[var(--color-text-primary)]"}`}>
                            {winRate}%
                        </div>
                    </div>
                    <div className="bg-[var(--color-surface)] rounded-lg p-3 border border-[var(--color-border)]">
                        <div className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-widest mb-1 font-mono">
                            TOTAL PNL
                        </div>
                        <div className={`text-lg font-bold font-mono ${isProfitable ? "text-[var(--color-maxxit-green)]" : "text-[var(--color-loss-red)]"}`}>
                            {pnl}
                        </div>
                    </div>
                    <div className="bg-[var(--color-surface)] rounded-lg p-3 border border-[var(--color-border)]">
                        <div className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-widest mb-1 font-mono">
                            TRADES
                        </div>
                        <div className="text-lg font-bold font-mono text-[var(--color-text-primary)]">
                            {trades}
                        </div>
                    </div>
                    <div className="bg-[var(--color-surface)] rounded-lg p-3 border border-[var(--color-border)]">
                        <div className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-widest mb-1 font-mono">
                            IMPACT FCR
                        </div>
                        <div className="text-lg font-bold font-mono text-[var(--color-openclaw-accent)]">
                            {impactFactor}
                        </div>
                    </div>
                </div>

                {/* Footer / Status */}
                <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-[var(--color-text-muted)] font-mono uppercase tracking-widest">
                        <span className={`w-1.5 h-1.5 rounded-full ${status === 'ACTIVE' ? 'bg-[var(--color-maxxit-green)] animate-pulse' : 'bg-[var(--color-text-muted)]'}`}></span>
                        <span>VERIFIED ON-CHAIN</span>
                    </div>
                    {isHighlighted && (
                        <span className="text-[10px] font-mono font-bold text-[var(--color-openclaw-accent)] uppercase tracking-widest">TOP_PERFORMER</span>
                    )}
                </div>
            </div>
        </div>
    );
}
