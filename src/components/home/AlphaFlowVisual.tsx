"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { label: "TRADE ON OSTIUM", detail: "Agent opens LONG BTC 15x", icon: ">" },
  { label: "GENERATE ZK PROOF", detail: "Brevis computes performance proof", icon: "#" },
  { label: "FLAG AS ALPHA", detail: "Position flagged · 25% portfolio · $0.50", icon: "$" },
  { label: "CONSUMER DISCOVERS", detail: "Sees commitment + 77.9% win rate", icon: "?" },
  { label: "PAY VIA x402", detail: "HTTP 402 → USDC payment → content", icon: "!" },
  { label: "EXECUTE TRADE", detail: "Consumer mirrors on their own account", icon: "+" },
];

export default function AlphaFlowVisual() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-background)] shadow-[0_0_40px_-10px_rgba(0,255,136,0.08)]">
        {/* Terminal Header */}
        <div className="h-8 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-loss-red)] opacity-60" />
              <span className="w-2 h-2 rounded-full bg-[var(--color-openclaw-accent)] opacity-60" />
              <span className="w-2 h-2 rounded-full bg-[var(--color-maxxit-green)] opacity-60" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--color-maxxit-green)] animate-pulse" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                ALPHA_LIFECYCLE // producer → consumer
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="text-[8px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-maxxit-green)] transition-colors"
          >
            {isAnimating ? "PAUSE" : "PLAY"}
          </button>
        </div>

        {/* Flow Body */}
        <div className="p-6">
          {/* Progress Bar */}
          <div className="flex items-center gap-1 mb-8">
            {STEPS.map((_, i) => (
              <div key={i} className="flex-1 flex items-center">
                <div
                  className={`h-1 w-full rounded-full transition-all duration-500 ${i <= activeStep
                      ? "bg-[var(--color-maxxit-green)] shadow-[0_0_8px_rgba(0,255,136,0.3)]"
                      : "bg-[var(--color-border)]"
                    }`}
                />
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-1.5 h-1.5 rounded-full shrink-0 mx-0.5 transition-all duration-500 ${i < activeStep
                        ? "bg-[var(--color-maxxit-green)]"
                        : "bg-[var(--color-border)]"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 gap-3">
            {STEPS.map((step, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveStep(i);
                  setIsAnimating(false);
                }}
                className={`text-left p-4 rounded-lg border transition-all duration-300 cursor-pointer ${i === activeStep
                    ? "border-[var(--color-maxxit-green)] bg-[rgba(0,255,136,0.04)] shadow-[0_0_20px_rgba(0,255,136,0.06)]"
                    : i < activeStep
                      ? "border-[rgba(0,255,136,0.2)] bg-[rgba(0,255,136,0.02)]"
                      : "border-[var(--color-border)] bg-transparent hover:border-[rgba(0,255,136,0.15)]"
                  }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`font-mono text-xs font-bold ${i <= activeStep
                        ? "text-[var(--color-maxxit-green)]"
                        : "text-[var(--color-text-muted)]"
                      }`}
                  >
                    {step.icon}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                    STEP {i + 1}
                  </span>
                </div>
                <div
                  className={`text-[11px] sm:text-xs font-bold mb-1 ${i === activeStep
                      ? "text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-secondary)]"
                    }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {step.label}
                </div>
                <div
                  className={`text-[9.5px] sm:text-[10px] font-mono transition-all duration-300 ${i === activeStep
                      ? "text-[var(--color-maxxit-green)] opacity-100"
                      : "text-[var(--color-text-muted)] opacity-60"
                    }`}
                >
                  {step.detail}
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Detail */}
          <div className="mt-6 p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] font-mono">
            <div className="flex items-center gap-2 text-[10px] text-[var(--color-text-muted)] mb-3">
              <span className="w-1 h-1 rounded-full bg-[var(--color-maxxit-green)] animate-pulse" />
              ACTIVE_STEP: {activeStep + 1}/{STEPS.length}
            </div>
            <div className="text-[10px] sm:text-xs text-[var(--color-maxxit-green)] break-words leading-relaxed">
              <span className="text-[var(--color-text-muted)] opacity-40 mr-2">$</span>
              {activeStep === 0 && "your_producer_agent.open_position(BTC, LONG, 15x, 250_USDC)"}
              {activeStep === 1 && "your_producer_agent.generate_proof() → Brevis verifies on-chain"}
              {activeStep === 2 && "your_producer_agent.flag_as_alpha(position_id, 0.50_USDC, conviction: 25%)"}
              {activeStep === 3 && "your_consumer_agent.listings() → picks commitment a7f3... | 77.9% win | 312 trades"}
              {activeStep === 4 && "your_consumer_agent.purchase(listing_id) → 402 → 0.50 USDC → content"}
              {activeStep === 5 && "your_consumer_agent.execute(alpha_content) → LONG BTC 15x on own account"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
