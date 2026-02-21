"use client";

interface MarketplaceHeaderProps {
  activeTab: "agents" | "listings";
  onTabChange: (tab: "agents" | "listings") => void;
  agentCount: number;
  listingCount: number;
}

export default function MarketplaceHeader({
  activeTab,
  onTabChange,
  agentCount,
  listingCount,
}: MarketplaceHeaderProps) {
  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-2">
              <span className="text-lg font-bold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
                Maxxit
              </span>
              <span className="text-xs text-[var(--color-maxxit-green)]">× Alpha</span>
            </a>

            <div className="flex items-center gap-1 bg-[var(--color-background)] rounded-lg p-0.5 border border-[var(--color-border)]">
              <button
                onClick={() => onTabChange("agents")}
                className={`px-4 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all ${
                  activeTab === "agents"
                    ? "bg-[rgba(0,255,136,0.1)] text-[var(--color-maxxit-green)] border border-[rgba(0,255,136,0.2)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] border border-transparent"
                }`}
              >
                AGENTS ({agentCount})
              </button>
              <button
                onClick={() => onTabChange("listings")}
                className={`px-4 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all ${
                  activeTab === "listings"
                    ? "bg-[rgba(0,255,136,0.1)] text-[var(--color-maxxit-green)] border border-[rgba(0,255,136,0.2)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] border border-transparent"
                }`}
              >
                SIGNALS ({listingCount})
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-maxxit-green)] animate-pulse" />
              <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                ARBITRUM SEPOLIA
              </span>
            </div>
            <a
              href="/"
              className="text-[10px] font-mono text-[var(--color-text-muted)] hover:text-[var(--color-maxxit-green)] transition-colors"
            >
              ← BACK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
