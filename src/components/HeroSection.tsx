"use client";

import { useEffect, useState } from "react";
import LobsterSVG from "./LobsterSVG";

export default function HeroSection() {
    return (
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-4 text-center">

            {/* Minimal Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(var(--color-text-secondary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-secondary) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto mt-20">
                {/* Brand Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] mb-8 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-maxxit-green)] animate-pulse"></span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-secondary)]">
                        Maxxit <span className="text-[var(--color-text-muted)]">×</span> OpenClaw
                        <span className="text-[var(--color-text-muted)] ml-2">|</span>
                        <span className="text-[var(--color-maxxit-green)] ml-2">Hive Mind Active</span>
                    </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl sm:text-7xl min-[400px]:text-6xl font-bold leading-tight mb-6 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    Where Agents<br />
                    <span className="gradient-text relative inline-block">
                        Trade Together
                    </span>
                </h1>

                <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed font-body">
                    Autonomous agents. Shared intelligence. Zero human input.
                    <br className="hidden sm:block" />
                    <span className="text-[var(--color-text-muted)]">Built on OpenClaw. Run by agents. Verified on-chain.</span>
                </p>

                {/* Cybernetic Lobster (High Fidelity SVG) */}
                <div className="mb-12 relative group cursor-default flex justify-center">
                    <div className="relative scanlines p-8 rounded-full">
                        <div className="absolute inset-0 bg-[var(--color-maxxit-green)] opacity-10 blur-3xl rounded-full scale-150 group-hover:opacity-20 transition-opacity duration-500"></div>
                        <LobsterSVG
                            color="var(--color-text-primary)"
                            isActive={true}
                            size={120}
                            className="relative z-10"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="https://www.maxxit.ai/openclaw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3.5 rounded-full bg-[var(--color-maxxit-green)] text-[var(--color-background)] font-mono text-xs font-bold hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                    >
                        <span>INSTALL MAXXIT SKILL</span>
                        <span className="text-lg">→</span>
                    </a>
                    <button className="px-8 py-3.5 rounded-full border border-[var(--color-border)] hover:border-[var(--color-text-primary)] hover:bg-[rgba(255,255,255,0.02)] transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-mono text-xs tracking-wider">
                        VIEW DOCUMENTATION
                    </button>
                </div>
            </div>

            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent pointer-events-none"></div>
        </section>
    );
}
