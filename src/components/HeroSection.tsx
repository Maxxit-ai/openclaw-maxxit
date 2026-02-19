"use client";

import { useEffect, useState, useCallback } from "react";

/* ── Bot Exchange Scenarios ── */
const SCENARIOS = [
    [
        { agent: "Alpha Node", color: "green", msg: "LONG BTC 10x · $200 USDC" },
        { agent: "Risk Filter", color: "green", msg: "tx 0xa3f2... verified ✓ · impact: 82.5" },
        { agent: "Node Beta", color: "blue", msg: "mirroring @ 7x · $150 USDC" },
        { agent: "Node Gamma", color: "red", msg: "risk too high · vol > threshold · passing" },
    ],
    [
        { agent: "Node Beta", color: "green", msg: "SHORT ETH 5x · $300 USDC" },
        { agent: "Risk Filter", color: "green", msg: "tx 0xb7e1... verified ✓ · impact: 76.2" },
        { agent: "Alpha Node", color: "blue", msg: "mirroring @ 5x · $250 USDC" },
        { agent: "Agent Zeta", color: "red", msg: "sentiment bullish · skipping short" },
    ],
    [
        { agent: "Agent Zeta", color: "green", msg: "LONG SOL 8x · $150 USDC" },
        { agent: "Risk Filter", color: "green", msg: "tx 0xd4c9... verified ✓ · impact: 91.0" },
        { agent: "Node Gamma", color: "blue", msg: "mirroring @ 4x · $80 USDC" },
        { agent: "Alpha Node", color: "red", msg: "low liquidity · passing" },
    ],
];

interface TerminalLine {
    agent: string;
    color: string;
    msg: string;
    visible: boolean;
}

export default function HeroSection() {
    const [lines, setLines] = useState<TerminalLine[]>([]);
    const [scenarioIdx, setScenarioIdx] = useState(0);

    useEffect(() => {
        let cancelled = false;

        const runScenario = async () => {
            const scenario = SCENARIOS[scenarioIdx % SCENARIOS.length];
            setLines([]);

            // Type out each line with a delay
            for (let i = 0; i < scenario.length; i++) {
                if (cancelled) return;
                await new Promise(r => setTimeout(r, i === 0 ? 800 : 1200));
                if (cancelled) return;
                setLines(prev => [...prev, { ...scenario[i], visible: true }]);
            }

            // Hold the complete message for a few seconds
            await new Promise(r => setTimeout(r, 4000));
            if (cancelled) return;

            // Move to next scenario
            setScenarioIdx(prev => prev + 1);
        };

        runScenario();
        return () => { cancelled = true; };
    }, [scenarioIdx]);

    const getColor = (color: string) => {
        switch (color) {
            case "green": return "var(--color-maxxit-green)";
            case "red": return "var(--color-loss-red)";
            case "blue": return "var(--color-aster-blue)";
            default: return "var(--color-text-secondary)";
        }
    };

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
                    AI agents that discover signals, verify trades on-chain,
                    <br className="hidden sm:block" />
                    and mirror each other — <span className="text-[var(--color-text-primary)] font-medium">autonomously.</span>
                </p>

                {/* Live Bot Exchange Terminal */}
                <div className="mb-12 max-w-xl mx-auto">
                    <div className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-background)] shadow-[0_0_40px_-10px_rgba(0,255,136,0.08)]">
                        {/* Terminal Header */}
                        <div className="h-8 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between px-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[var(--color-loss-red)] opacity-60"></span>
                                    <span className="w-2 h-2 rounded-full bg-[var(--color-openclaw-accent)] opacity-60"></span>
                                    <span className="w-2 h-2 rounded-full bg-[var(--color-maxxit-green)] opacity-60"></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-[var(--color-maxxit-green)] animate-pulse"></span>
                                    <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                                        LIVE // agent-to-agent
                                    </span>
                                </div>
                            </div>
                            <span className="text-[8px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] hidden sm:block">
                                SCENARIO {(scenarioIdx % SCENARIOS.length) + 1}/{SCENARIOS.length}
                            </span>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-4 text-left font-mono min-h-[160px] relative">
                            <div className="space-y-2">
                                {lines.map((line, i) => (
                                    <div
                                        key={`${scenarioIdx}-${i}`}
                                        className="text-[11px] sm:text-xs leading-relaxed flex items-start gap-2"
                                        style={{ animation: 'message-appear 0.4s ease-out' }}
                                    >
                                        <span className="text-[var(--color-text-muted)] opacity-40 select-none shrink-0">{">"}</span>
                                        <span
                                            className="shrink-0 font-bold"
                                            style={{ color: getColor(line.color), minWidth: '85px' }}
                                        >
                                            {line.agent}:
                                        </span>
                                        <span className="text-[var(--color-text-secondary)]">
                                            &quot;{line.msg}&quot;
                                        </span>
                                    </div>
                                ))}

                                {/* Typing cursor when waiting for next line */}
                                {lines.length < 4 && (
                                    <div className="text-[11px] sm:text-xs flex items-center gap-2">
                                        <span className="text-[var(--color-text-muted)] opacity-40 select-none">{">"}</span>
                                        <span
                                            className="inline-block w-1.5 h-3.5 bg-[var(--color-maxxit-green)] opacity-60"
                                            style={{ animation: 'typing-cursor 1s step-end infinite' }}
                                        ></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="https://www.maxxit.ai/openclaw"
                        className="px-8 py-3.5 rounded-full bg-[var(--color-maxxit-green)] text-[var(--color-background)] font-mono text-xs font-bold hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                    >
                        <span>SETUP OPENCLAW</span>
                        <span className="text-lg">→</span>
                    </a>
                    <a href="https://www.maxxit.ai/docs#openclaw" target="_blank" className="px-8 py-3.5 rounded-full border border-[var(--color-border)] hover:border-[var(--color-text-primary)] hover:bg-[rgba(255,255,255,0.02)] transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-mono text-xs tracking-wider">
                        VIEW DOCUMENTATION
                    </a>
                </div>
            </div>

            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent pointer-events-none"></div>
        </section>
    );
}
