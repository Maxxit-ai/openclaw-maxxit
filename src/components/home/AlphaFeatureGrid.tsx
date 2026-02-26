"use client";

const FEATURES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 2L3 9v14l13 7 13-7V9L16 2z"
          stroke="var(--color-maxxit-green)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M16 8l-7 4v8l7 4 7-4v-8l-7-4z"
          stroke="var(--color-maxxit-green)"
          strokeWidth="1.5"
          fill="rgba(0,255,136,0.08)"
        />
        <path d="M13 15l2 2 4-4" stroke="var(--color-maxxit-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "ZK-Verified Performance",
    description:
      "On-chain Ostium trades computed into a zero-knowledge proof via Brevis. No self-reported stats. Mathematically verified.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="13" stroke="var(--color-maxxit-green)" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="16" r="6" stroke="var(--color-maxxit-green)" strokeWidth="1.5" fill="rgba(0,255,136,0.08)" />
        <path d="M16 3v4M16 25v4M3 16h4M25 16h4" stroke="var(--color-maxxit-green)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="16" r="2" fill="var(--color-maxxit-green)" />
      </svg>
    ),
    title: "Privacy-Preserving Identity",
    description:
      "Wallet address hidden behind a cryptographic commitment. Buyers see your track record, never your identity.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="20" rx="3" stroke="var(--color-maxxit-green)" strokeWidth="1.5" fill="none" />
        <path d="M4 12h24" stroke="var(--color-maxxit-green)" strokeWidth="1.5" />
        <text x="8" y="10" fontSize="5" fill="var(--color-maxxit-green)" fontFamily="monospace">402</text>
        <circle cx="10" cy="19" r="3" stroke="var(--color-maxxit-green)" strokeWidth="1.5" fill="rgba(0,255,136,0.08)" />
        <path d="M10 17.5v3M8.5 19h3" stroke="var(--color-maxxit-green)" strokeWidth="1" strokeLinecap="round" />
        <path d="M17 18h7M17 21h5" stroke="var(--color-maxxit-green)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    title: "x402 Machine Payments",
    description:
      "Agents pay USDC via the x402 protocol. HTTP 402 flow — no custody, no escrow, pure peer-to-peer machine commerce.",
  },
];

export default function AlphaFeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-1 sm:px-0">
      {FEATURES.map((feature, i) => (
        <div
          key={i}
          className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-[var(--color-border-glow)] transition-all duration-300"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[rgba(0,255,136,0.06)] border border-[rgba(0,255,136,0.12)] flex items-center justify-center mb-5 sm:mb-6 group-hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] transition-shadow">
            {feature.icon}
          </div>
          <h3
            className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-[var(--color-text-primary)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {feature.title}
          </h3>
          <p className="text-[13px] sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {feature.description}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-maxxit-green)] to-transparent opacity-0 group-hover:opacity-30 transition-opacity" />
        </div>
      ))}
    </div>
  );
}
