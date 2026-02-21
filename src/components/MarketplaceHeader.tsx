"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MarketplaceHeaderProps {
  activeTab?: "agents" | "listings";
  onTabChange?: (tab: "agents" | "listings") => void;
  agentCount?: number;
  listingCount?: number;
}

export default function MarketplaceHeader({
  activeTab,
  onTabChange,
  agentCount = 0,
  listingCount = 0,
}: MarketplaceHeaderProps) {
  const pathname = usePathname();
  const isMarketplace = pathname === "/marketplace";

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xl font-bold text-text-primary tracking-tighter group-hover:text-(--color-maxxit-green) transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    MAXXIT
                  </span>
                  <div className="h-4 w-px bg-border group-hover:bg-(--color-maxxit-green)/30 transition-colors" />
                  <span className="text-[10px] font-mono font-bold text-(--color-maxxit-green) tracking-widest uppercase opacity-80">
                    OpenClaw
                  </span>
                </div>
                {isMarketplace && (
                  <span className="text-[8px] font-mono text-text-muted tracking-[0.3em] uppercase -mt-0.5 opacity-60">
                    Marketplace Terminal
                  </span>
                )}
              </div>
            </Link>

            {/* Marketplace Tabs */}
            {isMarketplace && onTabChange && (
              <div className="hidden md:flex items-center gap-1 bg-background/50 rounded-xl p-1 border border-border shadow-inner ml-4">
                <button
                  onClick={() => onTabChange("agents")}
                  className={`px-5 py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 relative overflow-hidden ${activeTab === "agents"
                    ? "text-(--color-maxxit-green) bg-(--color-maxxit-green)/10 shadow-[0_0_20px_rgba(0,255,136,0.1)]"
                    : "text-text-muted hover:text-text-secondary hover:bg-surface"
                    }`}
                >
                  {activeTab === "agents" && (
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shine" />
                  )}
                  AGENTS [{agentCount}]
                </button>
                <button
                  onClick={() => onTabChange("listings")}
                  className={`px-5 py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 relative overflow-hidden ${activeTab === "listings"
                    ? "text-(--color-maxxit-green) bg-(--color-maxxit-green)/10 shadow-[0_0_20px_rgba(0,255,136,0.1)]"
                    : "text-text-muted hover:text-text-secondary hover:bg-surface"
                    }`}
                >
                  {activeTab === "listings" && (
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shine" />
                  )}
                  SIGNALS [{listingCount}]
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-10">
            {isMarketplace ? (
              <div className="flex items-center gap-6">
                <div className="hidden sm:flex flex-col items-end">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--color-maxxit-green) animate-pulse shadow-[0_0_8px_rgba(0,255,136,0.5)]" />
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-text-muted">
                      ARBITRUM_SEPOLIA_NODE
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-text-muted/60">
                    LATENCY: 24MS · BLOCK: 84192
                  </span>
                </div>
                <Link
                  href="/"
                  className="group flex items-center gap-3 px-4 py-2 rounded-lg border border-border hover:border-text-muted transition-all text-[10px] font-mono text-text-muted hover:text-text-primary"
                >
                  <span className="transition-transform group-hover:-translate-x-1">←</span> EXIT_MARKET
                </Link>
              </div>
            ) : (
              <>
                <div className="hidden md:flex items-center gap-10 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-muted">
                  <a href="#network" className="hover:text-(--color-maxxit-green) transition-colors relative group">
                    [ Network ]
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-(--color-maxxit-green) transition-all group-hover:w-full" />
                  </a>
                  <a href="#hivemind" className="hover:text-(--color-maxxit-green) transition-colors relative group">
                    [ Hive Mind ]
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-(--color-maxxit-green) transition-all group-hover:w-full" />
                  </a>
                  <Link href="/marketplace" className="hover:text-(--color-maxxit-green) transition-colors relative group">
                    [ Marketplace ]
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-(--color-maxxit-green) transition-all group-hover:w-full" />
                  </Link>
                </div>
                <a
                  href="https://www.maxxit.ai/openclaw"
                  className="px-5 py-2 rounded-sm border border-(--color-maxxit-green) text-(--color-maxxit-green) hover:bg-(--color-maxxit-green) hover:text-background transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,136,0.1)] active:scale-95 text-[10px] font-mono font-bold"
                >
                  INITIALIZE AGENT
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
