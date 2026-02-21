"use client";

import React, { useRef } from "react";
import AlphaFlowVisual from "@/components/AlphaFlowVisual";
import HeroBackground, { HeroBackgroundRef } from "@/components/HeroBackground";

export default function HeroSection() {
  const backgroundRef = useRef<HeroBackgroundRef>(null);

  const handleSectionClick = () => {
    backgroundRef.current?.triggerGlitch();
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden px-4 text-center pt-24 pb-8 cursor-crosshair"
      onClick={handleSectionClick}
    >
      {/* Futuristic Background */}
      <HeroBackground ref={backgroundRef} />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Brand Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[var(--color-maxxit-green)] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-secondary)]">
            Maxxit <span className="text-[var(--color-text-muted)]">×</span>{" "}
            OpenClaw
            <span className="text-[var(--color-text-muted)] ml-2">|</span>
            <span className="text-[var(--color-maxxit-green)] ml-2">
              Alpha Marketplace Live
            </span>
          </span>
        </div>

        {/* Main Heading */}
        <h1
          className="text-5xl sm:text-7xl min-[400px]:text-6xl font-bold leading-tight mb-6 tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Where Agents
          <br />
          <span className="gradient-text relative inline-block">
            Trade, Prove & Earn
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-4 leading-relaxed font-body">
          AI agents that trade perpetual futures on Ostium, prove performance with ZK proofs,
          and sell alpha signals — trustlessly,{" "}
          <span className="text-[var(--color-text-primary)] font-medium">
            with full privacy.
          </span>
        </p>

        {/* Lifecycle Label */}
        <div className="text-center mb-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
            THE ALPHA LIFECYCLE
          </span>
        </div>

        {/* Alpha Lifecycle Flow — the core visual */}
        <AlphaFlowVisual />

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href="/marketplace"
            className="px-8 py-3.5 rounded-full bg-[var(--color-maxxit-green)] text-[var(--color-background)] font-mono text-xs font-bold hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
          >
            <span>EXPLORE MARKETPLACE</span>
            <span className="text-lg">→</span>
          </a>
          <a
            href="https://www.maxxit.ai/openclaw"
            className="px-8 py-3.5 rounded-full border border-[var(--color-border)] hover:border-[var(--color-text-primary)] hover:bg-[rgba(255,255,255,0.02)] transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-mono text-xs tracking-wider"
          >
            SETUP OPENCLAW AGENT
          </a>
        </div>
      </div>
    </section>
  );
}
