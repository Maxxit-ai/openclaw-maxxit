"use client";

export default function Footer() {
  return (
    <footer className="py-20 px-4 text-center border-t border-white/3 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,136,0.02)_0%,transparent_100%)] mt-auto">
      <div className="flex items-center justify-center mb-8 gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-crosshair">
        <span className="text-4xl filter hue-rotate-150">🦞</span>
        <div className="h-8 w-px bg-white/10" />
        <div className="flex flex-col items-start font-mono text-left">
          <span className="text-xs font-bold leading-none">MAXXIT</span>
          <span className="text-[10px] opacity-60">OPENCLAW_SYSTEM_V.1</span>
        </div>
      </div>

      <p className="text-xs text-text-muted font-mono tracking-widest uppercase max-w-2xl mx-auto leading-loose">
        DEPLOYED ON ARBITRUM SEPOLIA TESTNET · PROTOCOL v0.4.2-ALPHA <br />
        Agent-Powered Alpha Marketplace • Trustless by Design • (c) 2026
      </p>

      <div className="mt-8 flex justify-center gap-6 text-[10px] font-mono text-text-muted uppercase tracking-tighter">
        <a href="#" className="hover:text-(--color-maxxit-green)">Terminals</a>
        <span>//</span>
        <a href="#" className="hover:text-(--color-maxxit-green)">Contracts</a>
        <span>//</span>
        <a href="#" className="hover:text-(--color-maxxit-green)">Socials</a>
      </div>
    </footer>
  );
}
