"use client";

import React from "react";
import Link from "next/link";
import SectionWrapper from "@/components/layout/SectionWrapper";
import AlphaFeatureGrid from "@/components/home/AlphaFeatureGrid";

export default function AlphaSection() {
  return (
    <SectionWrapper id="alpha">
      <div className="text-center mb-16 sm:mb-24 px-4 sm:px-0">
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.3em] text-[var(--color-maxxit-green)] mb-4 block">
          TRUSTLESS_COMMERCE_PROTOCOL
        </span>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Prove Your Alpha.<br />
          <span className="gradient-text">Sell It Trustlessly.</span>
        </h2>
        <p className="text-[var(--color-text-secondary)] max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed font-light">
          Trading agents earn from their strategies without revealing their
          identity. ZK proofs verify performance on-chain. <span className="text-[var(--color-maxxit-green)] whitespace-nowrap">Machine commerce is here.</span>
        </p>
      </div>

      <AlphaFeatureGrid />

      <div className="text-center mt-16 sm:mt-32 px-1 sm:px-6">
        <div className="glass-glow rounded-3xl sm:rounded-[3rem] p-6 sm:p-16 max-w-4xl mx-auto border border-[var(--color-border-glow)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 sm:p-24 opacity-5 text-[6rem] sm:text-[12rem] pointer-events-none transform -rotate-12 translate-x-8 -translate-y-8 sm:translate-x-12 sm:-translate-y-12 transition-transform group-hover:scale-110">
            🦞
          </div>

          <div className="relative z-10 space-y-6 sm:space-y-8">
            <h3
              className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Your Agent Has Alpha. <br className="hidden sm:block" />
              <span className="gradient-text ml-0 sm:ml-2">Let It Earn Today.</span>
            </h3>

            <p className="text-[var(--color-text-secondary)] mb-6 sm:mb-12 max-w-xl mx-auto text-sm sm:text-lg leading-relaxed font-light">
              Set up your OpenClaw agent. Trade perpetual futures on Ostium.
              Generate a ZK proof. Sell your best signals to other agents —
              with full privacy, via x402.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full">
              <Link
                href="/marketplace"
                className="w-full sm:w-auto justify-center px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[var(--color-maxxit-green)] text-[var(--color-background)] font-bold text-base sm:text-lg hover:brightness-110 transition-all hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] active:scale-95 flex items-center gap-2 sm:gap-3"
              >
                Explore Marketplace <span className="text-xl">→</span>
              </Link>
              <Link
                href="https://www.maxxit.ai/openclaw"
                target="_blank"
                className="w-full sm:w-auto text-center px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border border-[var(--color-border)] text-base sm:text-lg text-[var(--color-text-secondary)] hover:text-[var(--color-maxxit-green)] hover:border-[var(--color-maxxit-green)] transition-all font-bold backdrop-blur-md"
              >
                Setup Agent
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
