"use client";

import { useEffect, useState, useCallback } from "react";
import MarketplaceHeader from "@/components/MarketplaceHeader";
import ProducerCard from "@/components/ProducerCard";
import AlphaListingCard from "@/components/AlphaListingCard";
import ListingDetailModal from "@/components/ListingDetailModal";
import { fetchAgents, fetchListings, purchaseAlpha } from "@/lib/api";
import type { AlphaAgent, AlphaListing, AlphaContent } from "@/lib/mockData";

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<"agents" | "listings">("agents");
  const [agents, setAgents] = useState<AlphaAgent[]>([]);
  const [listings, setListings] = useState<AlphaListing[]>([]);
  const [selectedListing, setSelectedListing] = useState<AlphaListing | null>(null);
  const [commitmentFilter, setCommitmentFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [agentsData, listingsData] = await Promise.all([
        fetchAgents(),
        fetchListings(commitmentFilter ? { commitment: commitmentFilter } : undefined),
      ]);
      setAgents(agentsData);
      setListings(listingsData);
      setLoading(false);
    };
    load();
  }, [commitmentFilter]);

  const handleViewListings = useCallback((commitment: string) => {
    setCommitmentFilter(commitment);
    setActiveTab("listings");
  }, []);

  const handlePurchase = useCallback(
    async (listingId: string): Promise<AlphaContent | null> => {
      const result = await purchaseAlpha(listingId);
      return result.alpha || null;
    },
    []
  );

  const handleListingPurchaseClick = useCallback(
    (listingId: string) => {
      const listing = listings.find((l) => l.listingId === listingId);
      if (listing) setSelectedListing(listing);
    },
    [listings]
  );

  const clearFilter = useCallback(() => {
    setCommitmentFilter(null);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <MarketplaceHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        agentCount={agents.length}
        listingCount={listings.length}
      />

      {/* Subheader */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-2xl font-bold text-[var(--color-text-primary)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {activeTab === "agents"
                  ? "ZK-Verified Producers"
                  : "Alpha Signals"}
              </h1>
              <p className="text-sm text-[var(--color-text-muted)] mt-1 font-mono">
                {activeTab === "agents"
                  ? "Agents with cryptographically proven trading performance"
                  : commitmentFilter
                  ? `Filtered by agent ${commitmentFilter.slice(0, 8)}...`
                  : "Live trading signals from verified agents"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {commitmentFilter && (
                <button
                  onClick={clearFilter}
                  className="text-[10px] font-mono px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] transition-all"
                >
                  CLEAR FILTER ×
                </button>
              )}
              <div className="text-[9px] font-mono text-[var(--color-text-muted)] bg-[var(--color-surface)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
                {loading ? (
                  <span className="animate-pulse">LOADING...</span>
                ) : (
                  <>
                    {activeTab === "agents"
                      ? `${agents.length} VERIFIED AGENTS`
                      : `${listings.length} ACTIVE SIGNALS`}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="glass rounded-xl h-64 animate-pulse"
              />
            ))}
          </div>
        ) : activeTab === "agents" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 card-stagger">
            {agents.map((agent) => (
              <ProducerCard
                key={agent.commitment}
                agent={agent}
                onViewListings={handleViewListings}
              />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 card-stagger">
            {listings.map((listing) => (
              <AlphaListingCard
                key={listing.listingId}
                listing={listing}
                onPurchase={handleListingPurchaseClick}
              />
            ))}
            {listings.length === 0 && (
              <div className="col-span-full text-center py-20">
                <div className="text-[var(--color-text-muted)] font-mono text-sm">
                  No active signals found
                  {commitmentFilter && " for this agent"}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* How It Works Banner */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              {
                step: "01",
                title: "Discover",
                desc: "Browse ZK-verified agents and their proven track records",
              },
              {
                step: "02",
                title: "Evaluate",
                desc: "Check conviction: portfolio %, leverage, win rate — all ZK-proven",
              },
              {
                step: "03",
                title: "Purchase",
                desc: "Pay via x402 in USDC. No intermediary. Trustless machine payment",
              },
              {
                step: "04",
                title: "Execute",
                desc: "Receive the full signal and execute on your own Ostium account",
              },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="text-[10px] font-mono text-[var(--color-maxxit-green)]">
                  STEP {item.step}
                </div>
                <div
                  className="text-sm font-bold text-[var(--color-text-primary)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.title}
                </div>
                <div className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-[var(--color-border)]">
        <p className="text-[10px] text-[var(--color-text-muted)] font-mono">
          ALPHA MARKETPLACE · ARBITRUM SEPOLIA TESTNET · ZK-VERIFIED · x402
          PAYMENTS · PRIVACY-PRESERVING
        </p>
      </footer>

      {/* Modal */}
      {selectedListing && (
        <ListingDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onPurchase={handlePurchase}
        />
      )}
    </div>
  );
}
