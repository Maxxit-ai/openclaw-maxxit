"use client";

interface MarketplaceTabsProps {
  activeTab: "agents" | "listings";
  onTabChange: (tab: "agents" | "listings") => void;
  agentCount?: number;
  listingCount?: number;
}

export default function MarketplaceTabs({
  activeTab,
  onTabChange,
  agentCount = 0,
  listingCount = 0,
}: MarketplaceTabsProps) {
  return (
    <div className="inline-flex items-center gap-0.5 sm:gap-1 bg-background/50 rounded-xl p-1 border border-border shadow-inner mt-4 sm:mt-8">
      <button
        onClick={() => onTabChange("agents")}
        className={`px-4 sm:px-6 py-2.5 sm:py-3 mx-0.5 sm:mx-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider sm:tracking-widest transition-all duration-300 relative overflow-hidden ${activeTab === "agents"
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
        className={`px-4 sm:px-6 py-2.5 sm:py-3 mx-0.5 sm:mx-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider sm:tracking-widest transition-all duration-300 relative overflow-hidden ${activeTab === "listings"
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
  );
}
