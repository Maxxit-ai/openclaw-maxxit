"use client";

import React from "react";
import SectionWrapper from "@/components/layout/SectionWrapper";

const ZG_FEATURES = [
  {
    label: "STORAGE",
    title: "Decentralized Alpha Vault",
    description:
      "Every signal is uploaded to 0G's storage network. The root hash and content sha256 are pinned on-chain — buyers re-download and verify the payload independently.",
    chips: ["ROOT_HASH ✓ ON-CHAIN", "CONTENT_HASH ✓ SHA-256", "NON-BLOCKING"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 3L4 8v8c0 6 5 11 12 13 7-2 12-7 12-13V8L16 3z"
          stroke="var(--color-maxxit-green)"
          strokeWidth="1.5"
          fill="rgba(0,255,136,0.06)"
          strokeLinejoin="round"
        />
        <path
          d="M11 16l3.5 3.5L22 12"
          stroke="var(--color-maxxit-green)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "COMPUTE",
    title: "Verified Inference",
    description:
      "Trade decisions route through 0G's serving broker. Every LLM response returns a verified flag, proving the inference came from an acknowledged provider — no silent prompt manipulation.",
    chips: ["MODEL qwen-2.5-7b", "VERIFIED ✓ FLAG", "WALLET-AUTH"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect
          x="7"
          y="7"
          width="18"
          height="18"
          rx="2"
          stroke="var(--color-maxxit-green)"
          strokeWidth="1.5"
          fill="rgba(0,255,136,0.06)"
        />
        <rect
          x="12"
          y="12"
          width="8"
          height="8"
          rx="1"
          stroke="var(--color-maxxit-green)"
          strokeWidth="1.5"
        />
        <path
          d="M12 3v4M20 3v4M12 25v4M20 25v4M3 12h4M3 20h4M25 12h4M25 20h4"
          stroke="var(--color-maxxit-green)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const FLOW_STEPS = [
  "PRODUCER_PUBLISHES",
  "0G_STORAGE_UPLOAD",
  "ROOT_HASH_PINNED",
  "BUYER_VERIFIES",
];

export default function ZeroGSection() {
  return (
    <SectionWrapper id="zero-g">
      <div className="text-center mb-14 sm:mb-20 px-4 sm:px-0">
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.3em] text-[var(--color-maxxit-green)] mb-4 block">
          DECENTRALIZED_INFRASTRUCTURE
        </span>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Powered by <span className="gradient-text">0G</span>.<br />
          <span className="text-[var(--color-text-primary)]">
            Compute & Storage,{" "}
          </span>
          <span className="gradient-text">Trustless.</span>
        </h2>
        <p className="text-[var(--color-text-secondary)] max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed font-light">
          Alpha signals live on 0G&apos;s decentralized storage. Trade
          decisions route through verified 0G compute providers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-1 sm:px-0 mb-12 sm:mb-16">
        {ZG_FEATURES.map((feature) => (
          <div
            key={feature.label}
            className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-[var(--color-border-glow)] transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-5 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[rgba(0,255,136,0.06)] border border-[rgba(0,255,136,0.12)] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] transition-shadow">
                {feature.icon}
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-[var(--color-maxxit-green)]">
                {feature.label}
              </span>
            </div>
            <h3
              className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[var(--color-text-primary)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {feature.title}
            </h3>
            <p className="text-[13px] sm:text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5">
              {feature.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--color-border)]/60">
              {feature.chips.map((chip) => (
                <span
                  key={chip}
                  className="text-[9px] sm:text-[10px] font-mono px-2 py-1 rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)] bg-[var(--color-surface)]/40"
                >
                  {chip}
                </span>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-maxxit-green)] to-transparent opacity-0 group-hover:opacity-30 transition-opacity" />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-5xl mx-auto px-2">
        {FLOW_STEPS.map((step, i) => (
          <React.Fragment key={step}>
            <span className="text-[9px] sm:text-[10px] font-mono px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/40 text-[var(--color-text-muted)] hover:text-[var(--color-maxxit-green)] hover:border-[var(--color-maxxit-green)]/40 transition-colors">
              {step}
            </span>
            {i < FLOW_STEPS.length - 1 && (
              <span className="text-[var(--color-maxxit-green)]/40 font-mono text-xs">
                →
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </SectionWrapper>
  );
}
