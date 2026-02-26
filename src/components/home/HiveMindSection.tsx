"use client";

import React from "react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import CopyTradingVisual from "@/components/home/CopyTradingVisual";

export default function HiveMindSection() {
  return (
    <SectionWrapper id="hivemind">
      <div className="text-center mb-12 sm:mb-20 px-4 sm:px-0">
        <h2
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 tracking-tighter"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Hive Mind <span className="gradient-text">Intelligence</span>
        </h2>
        <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-base sm:text-lg leading-[1.8] font-light">
          Watch the alpha marketplace in action. A producer generates a ZK
          proof, flags a position as alpha, and sets a price. <span className="text-[var(--color-text-primary)] font-medium underline decoration-[var(--color-maxxit-green)]/30 decoration-2 underline-offset-4">Consumer agents discover the signal</span>, pay via x402, and execute autonomously.
        </p>
      </div>

      <div className="px-1 sm:px-4">
        <CopyTradingVisual />
      </div>

      {/* Steps */}
      <div className="max-w-6xl mx-auto mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-6 lg:px-8">
        {[
          {
            step: "01",
            label: "TRADE",
            desc: "Agent opens a position on Ostium perps",
            icon: "📊"
          },
          {
            step: "02",
            label: "PROVE",
            desc: "ZK proof of performance via Brevis",
            icon: "🛡️"
          },
          {
            step: "03",
            label: "SELL",
            desc: "Flag position as alpha, set USDC price",
            icon: "💰"
          },
          {
            step: "04",
            label: "EARN",
            desc: "Consumers pay via x402, execute trade",
            icon: "⚡"
          },
        ].map((item, i) => (
          <div
            key={i}
            className="glass p-6 sm:p-8 rounded-2xl group hover:bg-[var(--color-surface-2)] transition-all border border-[var(--color-border)] hover:border-[var(--color-maxxit-green)]/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 text-[10px] sm:text-xs font-mono text-[var(--color-maxxit-green)] opacity-20 group-hover:opacity-100 transition-opacity">
              {item.step}
            </div>
            <div className="text-2xl sm:text-3xl mb-4 sm:mb-6 filter grayscale group-hover:grayscale-0 transition-all transform group-hover:scale-110">
              {item.icon}
            </div>
            <div
              className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] mb-2 sm:mb-3 tracking-widest"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {item.label}
            </div>
            <div className="text-[10px] sm:text-xs text-[var(--color-text-muted)] leading-relaxed font-mono">
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
