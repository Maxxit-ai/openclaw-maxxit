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
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-(--color-maxxit-green)/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-(--color-maxxit-green)/3 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      </div>

      <div className="relative z-10 pt-16">
        <MarketplaceHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          agentCount={agents.length}
          listingCount={listings.length}
        />

        {/* Subheader */}
        <div className="border-b border-border bg-background/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1
              className="text-4xl sm:text-6xl font-bold text-text-primary mb-5 tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {activeTab === "agents" ? (
                <>ZK-Verified <span className="gradient-text">Producers</span></>
              ) : (
                <>Alpha <span className="gradient-text">Signals</span></>
              )}
            </h1>
            <p className="text-sm sm:text-base text-text-muted mt-1 font-mono max-w-2xl mx-auto leading-relaxed border-x border-border/30 px-8">
              {activeTab === "agents"
                ? "Browse AI agents with cryptographically proven trading performance on Ostium perpetuals."
                : commitmentFilter
                  ? `Active signals filtered by agent commitment: ${commitmentFilter.slice(0, 12)}...`
                  : "Real-time trading alpha from verified agents. Secure, trustless, and privacy-preserving."}
            </p>

            <div className="flex items-center justify-center gap-4 mt-10">
              {commitmentFilter && (
                <button
                  onClick={clearFilter}
                  className="text-[10px] font-mono px-4 py-2 rounded-lg border border-border text-text-muted hover:text-text-primary hover:border-(--color-maxxit-green) transition-all bg-surface"
                >
                  CLEAR_FILTER [×]
                </button>
              )}
              <div className="text-[10px] font-mono text-(--color-maxxit-green) bg-(--color-maxxit-green)/5 px-5 py-2.5 rounded-xl border border-(--color-maxxit-green)/10 shadow-[0_0_20px_rgba(0,255,136,0.05)]">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-(--color-maxxit-green) animate-ping" />
                    <span>SYNCHRONIZING_STREAM...</span>
                  </div>
                ) : (
                  <>
                    {activeTab === "agents"
                      ? `${agents.length} VERIFIED AGENTS ON-CHAIN`
                      : `${listings.length} ACTIVE SIGNALS DETECTED`}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="glass rounded-2xl h-80 animate-pulse border border-border"
                />
              ))}
            </div>
          ) : activeTab === "agents" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 card-stagger">
              {agents.map((agent) => (
                <ProducerCard
                  key={agent.commitment}
                  agent={agent}
                  onViewListings={handleViewListings}
                />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 card-stagger">
              {listings.map((listing) => (
                <AlphaListingCard
                  key={listing.listingId}
                  listing={listing}
                  onPurchase={handleListingPurchaseClick}
                />
              ))}
              {listings.length === 0 && (
                <div className="col-span-full text-center py-32 border border-dashed border-border rounded-2xl bg-surface/30">
                  <div className="text-text-muted font-mono text-sm flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center opacity-30">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="tracking-widest">NO_ACTIVE_SIGNALS_IN_STREAM</span>
                    {commitmentFilter && <button onClick={clearFilter} className="text-(--color-maxxit-green) hover:underline underline-offset-4 font-bold">RESET_AGENT_QUERY</button>}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* How It Works Section */}
        <div className="border-t border-border bg-surface relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-background opacity-50" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 mb-4 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-(--color-maxxit-green) animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-(--color-maxxit-green)">SYSTEM_CORE</span>
              </div>
              <h2 className="text-3xl font-bold font-heading text-text-primary mb-4 tracking-tight">
                The Alpha Discovery Pipeline
              </h2>
              <div className="h-0.5 w-12 bg-(--color-maxxit-green) mx-auto opacity-50" />
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "DISCOVER",
                  desc: "Identify ZK-verified agents with proven risk-adjusted returns on Ostium.",
                  icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                },
                {
                  step: "02",
                  title: "EVALUATE",
                  desc: "Review cryptographic proofs for win rate, leverage, and historical drawdown.",
                  icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                },
                {
                  step: "03",
                  title: "PURCHASE",
                  desc: "Execute machine-to-machine payment via x402 in USDC. Trustless & instant.",
                  icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                },
                {
                  step: "04",
                  title: "EXECUTE",
                  desc: "Consume the encrypted signal and mirror the trade on your own perpetual account.",
                  icon: "M13 10V3L4 14h7v7l9-11h-7z"
                },
              ].map((item, i) => (
                <div key={i} className="group p-8 rounded-2xl border border-border bg-background/20 hover:border-(--color-maxxit-green)/30 hover:bg-(--color-maxxit-green)/5 transition-all duration-700 shadow-sm hover:shadow-[0_0_30px_-10px_rgba(0,255,136,0.1)]">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[11px] font-mono font-bold text-(--color-maxxit-green)/40 group-hover:text-(--color-maxxit-green) transition-colors duration-500">
                      {item.step}
                    </span>
                    <div className="h-px grow bg-border group-hover:bg-(--color-maxxit-green)/20 transition-colors duration-500" />
                    <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-border group-hover:border-(--color-maxxit-green)/20 transition-all duration-500 shadow-inner">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-(--color-maxxit-green)">
                        <path d={item.icon} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="text-sm font-bold text-text-primary mb-3 tracking-widest group-hover:text-(--color-maxxit-green) transition-colors duration-500"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </div>
                  <div className="text-[11px] text-text-muted leading-relaxed group-hover:text-text-secondary transition-colors duration-500">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-16 px-4 text-center border-t border-border bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-(--color-maxxit-green) shadow-[0_0_8px_rgba(0,255,136,0.5)]" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-text-primary">
                Maxxit Discovery Network
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-(--color-maxxit-green) shadow-[0_0_8px_rgba(0,255,136,0.5)]" />
            </div>
            <p className="text-[10px] text-text-muted font-mono max-w-2xl mx-auto leading-loose opacity-60">
              DEPLOYED ON ARBITRUM SEPOLIA TESTNET · PROTOCOL v0.4.2-ALPHA ·
              SECURED BY ZERO-KNOWLEDGE PROOFS · PRIVACY-FIRST SIGNAL TRANSMISSION ·
              x402 COMPLIANT PAYMENTS · NON-CUSTODIAL AGENT ARCHITECTURE
            </p>
          </div>
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
    </div>
  );
}
