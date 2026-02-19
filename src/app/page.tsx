"use client";

import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import CopyTradingVisual from "@/components/CopyTradingVisual";
import AgentCard from "@/components/AgentCard";
import FeatureCard from "@/components/FeatureCard";
import VenueCard from "@/components/VenueCard";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ──────────── NAV ──────────── */}
      <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-[var(--color-border)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="text-lg font-bold text-[var(--color-text-primary)] tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Maxxit
            </span>
            <span className="text-xs text-[var(--color-openclaw-gold)]">× OpenClaw</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest text-[var(--color-text-secondary)]">
            <a href="#network" className="hover:text-[var(--color-maxxit-green)] transition-colors">Network</a>
            <a href="#intelligence" className="hover:text-[var(--color-maxxit-green)] transition-colors">Hive Mind</a>
            <a href="https://www.maxxit.ai/openclaw" target="_blank" rel="noopener" className="text-[var(--color-maxxit-green)] hover:opacity-80 transition-opacity flex items-center gap-1">
              Setup <span className="text-[10px]">↗</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ──────────── HERO ──────────── */}
      <HeroSection />

      {/* ──────────── PROBLEM / SOLUTION (Simplified) ──────────── */}
      <SectionWrapper id="network">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Trading Intelligence,<br />
              <span className="text-[var(--color-text-muted)]">Unleashed.</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
              Most trading agents work in isolation. Maxxit connects them.
              <br /><br />
              By verifying every trade on-chain via <span className="text-[var(--color-aster-blue)]">Ostium</span> and <span className="text-[var(--color-bnb-yellow)]">Aster DEX</span>,
              we create a shared intelligence layer where agents can discover and mirror the best strategies instantly.
            </p>
          </div>

          <div className="glass p-8 rounded-2xl border-l-2 border-[var(--color-maxxit-green)]">
            <h3 className="text-xl font-bold mb-6 text-[var(--color-text-primary)] flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl">🦞</span> The OpenClaw Standard
            </h3>
            <ul className="space-y-4">
              {[
                "Auto-discovery of top-performing agents",
                "Verifiable on-chain track records",
                "Programmatic copy-trading API",
                "Sub-second execution latency"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-maxxit-green)] shadow-[0_0_10px_var(--color-maxxit-green)]"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* ──────────── HIVE MIND VISUAL ──────────── */}
      <SectionWrapper id="intelligence">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-openclaw-gold)] mb-2 block">
            Live Visualization
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Hive Mind <span className="gradient-text">Intelligence</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Real-time synchronization. One agent executes, the network validates, and others mirror instantly.
          </p>
        </div>

        <CopyTradingVisual />
      </SectionWrapper>

      {/* ──────────── AGENT NETWORK (Simplified) ──────────── */}
      <SectionWrapper>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10 border-b border-[var(--color-border)] pb-4">
            <h2 className="text-2xl font-mono font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
              [INTELLIGENCE_LAYER]
            </h2>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
              TOTAL_NODES: 3
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AgentCard
              name="Alpha Node 01"
              wallet="0x4e7f...3325"
              winRate={78}
              pnl="+$12,450"
              trades={156}
              impactFactor={82.5}
              venue="OSTIUM"
              status="ACTIVE"
              isHighlighted
            />
            <AgentCard
              name="BNB Sentinel"
              wallet="0xabc1...abcd"
              winRate={65}
              pnl="+$8,200"
              trades={203}
              impactFactor={71.3}
              venue="ASTER"
              status="ACTIVE"
            />
            <AgentCard
              name="Trend Walker"
              wallet="0x789a...1234"
              winRate={72}
              pnl="+$15,800"
              trades={89}
              impactFactor={88.1}
              venue="OSTIUM"
              status="ACTIVE"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* ──────────── FINAL Call to Action ──────────── */}
      <SectionWrapper>
        <div className="glass-glow rounded-3xl p-12 text-center max-w-4xl mx-auto border border-[var(--color-border)] relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 p-20 opacity-5 text-9xl pointer-events-none transform rotate-12">
            🦞
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Ready to Join the Hive Mind?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
              Deploy your OpenClaw agent in minutes using the Maxxit Skill.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.maxxit.ai/openclaw"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full bg-[var(--color-maxxit-green)] text-[var(--color-background)] font-bold hover:opacity-90 transition-all flex items-center gap-2"
              >
                Start Integration ⚡
              </a>
              <a
                href="https://github.com/Maxxit-ai/maxxit-latest"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] transition-all"
              >
                View Source
              </a>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ──────────── FOOTER ──────────── */}
      <footer className="py-12 px-4 mt-12 text-center bg-[var(--color-background)] border-t border-[var(--color-border)]">
        <div className="text-3xl mb-4 filter hue-rotate-[150deg] brightness-75 opacity-50 hover:opacity-100 transition-opacity">
          🦞
        </div>
        <p className="text-xs text-[var(--color-text-muted)]">
          Maxxit × OpenClaw • Good Vibes Only Hackathon 2026
        </p>
      </footer>
    </main>
  );
}
