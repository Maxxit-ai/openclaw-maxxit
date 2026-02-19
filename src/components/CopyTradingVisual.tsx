"use client";

import { useEffect, useState, useMemo } from "react";
import LobsterSVG from "./LobsterSVG";

/* ── Constants ── */
const NODES = [
    { id: 1, x: 25, y: 30, name: "Alpha Node", type: "trader" },
    { id: 2, x: 75, y: 25, name: "Node Beta", type: "trader" },
    { id: 3, x: 50, y: 55, name: "Risk Filter", type: "processor" },
    { id: 4, x: 20, y: 75, name: "Node Gamma", type: "trader" },
    { id: 5, x: 80, y: 75, name: "Agent Zeta", type: "trader" },
];

const CONNECTIONS = [
    [1, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 5], [2, 5]
];

/* ── Main Component ── */
export default function CopyTradingVisual() {
    const [nodeStates, setNodeStates] = useState<Record<number, any>>({});
    const [pings, setPings] = useState<any[]>([]);

    // 1. Peer-to-Peer Communication (Background Activity)
    useEffect(() => {
        const interval = setInterval(() => {
            const [a, b] = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
            const newPing = { id: Date.now(), from: a, to: b };
            setPings(prev => [...prev.slice(-10), newPing]);

            setTimeout(() => {
                setPings(prev => prev.filter(p => p.id !== newPing.id));
            }, 1000);
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    // 2. Intelligence Signal Event Loop (Narrative)
    useEffect(() => {
        const cycle = async () => {
            setNodeStates({});
            await new Promise(r => setTimeout(r, 1000));

            // Step 1: A node takes a trade (Independent Decision)
            const activator = Math.random() > 0.5 ? 1 : 2; // Either Alpha or Beta starts
            setNodeStates({ [activator]: { state: 'active', label: 'EXECUTED LONG BTC' } });

            await new Promise(r => setTimeout(r, 1500));

            // Step 2: Signal spreads through network
            setNodeStates(prev => {
                const next = { ...prev };
                NODES.filter(n => n.id !== activator).forEach(n => {
                    next[n.id] = { state: 'processing', label: 'DETECTING SIGNAL...' };
                });
                return next;
            });

            await new Promise(r => setTimeout(r, 1800));

            // Step 3: Selective Copying (Individual node logic)
            setNodeStates(prev => {
                const next = { ...prev };
                // Risk Filter validates
                next[3] = { state: 'active', label: 'VERIFIED ON-CHAIN' };

                // Other nodes decide
                next[activator === 1 ? 2 : 1] = { state: 'active', label: 'COPYING TRADE' };
                next[4] = { state: 'rejected', label: 'SKIPPED: HIGH VOL' };
                next[5] = { state: 'active', label: 'COPYING TRADE' };

                return next;
            });

            await new Promise(r => setTimeout(r, 4500));
            setNodeStates({}); // Reset
        };

        const interval = setInterval(cycle, 12000);
        cycle();
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[550px] rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-background)] cursor-default group scanlines">

            {/* Terminal Header */}
            <div className="absolute top-0 left-0 right-0 h-10 border-b border-[var(--color-border)] bg-[var(--color-surface)] z-40 flex items-center justify-between px-4 font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-openclaw-accent)] animate-pulse"></span>
                        <span className="text-[var(--color-openclaw-accent)]">INTELLIGENCE_MESH</span>
                    </div>
                    <span className="opacity-30">|</span>
                    <span>MODE: SIMULATION</span>
                </div>
                <div className="flex items-center gap-4 hidden sm:flex">
                    <span>SYNC_LATENCY: ---</span>
                    <span className="opacity-30">|</span>
                    <span className="text-[var(--color-text-secondary)]">V2.1.0-CLAW</span>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,var(--color-maxxit-green)_0%,transparent_70%)]"></div>

            {/* Network Mesh SVG Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                {CONNECTIONS.map(([a, b], i) => {
                    const nodeA = NODES.find(n => n.id === a)!;
                    const nodeB = NODES.find(n => n.id === b)!;
                    return (
                        <line
                            key={i}
                            x1={nodeA.x} y1={nodeA.y} x2={nodeB.x} y2={nodeB.y}
                            stroke="var(--color-border)"
                            strokeWidth="0.15"
                            strokeDasharray="1,2"
                            opacity="0.3"
                        />
                    );
                })}

                {pings.map((ping) => {
                    const from = NODES.find(n => n.id === ping.from)!;
                    const to = NODES.find(n => n.id === ping.to)!;
                    return (
                        <circle key={ping.id} r="0.4" fill="var(--color-maxxit-green)">
                            <animate attributeName="cx" from={from.x} to={to.x} dur="1.2s" repeatCount="1" />
                            <animate attributeName="cy" from={from.y} to={to.y} dur="1.2s" repeatCount="1" />
                            <animate attributeName="opacity" values="0;0.8;0" dur="1.2s" repeatCount="1" />
                        </circle>
                    );
                })}
            </svg>

            {/* Nodes Layer */}
            <div className="absolute inset-0 z-20">
                {NODES.map((node) => {
                    const nodeInfo = nodeStates[node.id] || { state: 'idle', label: '' };
                    return (
                        <div
                            key={node.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-500"
                            style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        >
                            {/* Status Dialog */}
                            {nodeInfo.label && (
                                <div className={`mb-3 px-3 py-1.5 rounded border text-[9px] font-mono font-bold uppercase tracking-widest backdrop-blur-md animate-in fade-in zoom-in duration-300 shadow-[0_0_15px_-5px_rgba(0,0,0,0.5)] ${nodeInfo.state === 'rejected'
                                    ? 'border-[var(--color-loss-red)] bg-red-950/20 text-[var(--color-loss-red)]'
                                    : nodeInfo.state === 'processing'
                                        ? 'border-[var(--color-openclaw-accent)] bg-amber-950/20 text-[var(--color-openclaw-accent)]'
                                        : 'border-[var(--color-maxxit-green)] bg-emerald-950/20 text-[var(--color-maxxit-green)] shadow-[0_0_20px_-5px_rgba(0,255,136,0.3)]'
                                    }`}>
                                    <span className="mr-1 opacity-50">{nodeInfo.state === 'processing' ? '>>' : '>'}</span>
                                    {nodeInfo.label}
                                    {nodeInfo.state === 'processing' && (
                                        <div className="absolute bottom-0 left-0 h-[1px] bg-[var(--color-openclaw-accent)] animate-[loading-bar_1.5s_ease-in-out_infinite] w-full origin-left"></div>
                                    )}
                                </div>
                            )}

                            {/* The Lobster */}
                            <div className="relative">
                                <LobsterSVG
                                    color={nodeInfo.state === 'active' ? "var(--color-maxxit-green)" : "var(--color-text-muted)"}
                                    isActive={nodeInfo.state !== 'idle'}
                                    state={nodeInfo.state}
                                    size={node.id === 1 || node.id === 2 ? 70 : 60}
                                />

                                {nodeInfo.state === 'active' && (
                                    <>
                                        <div className="absolute inset-0 rounded-full border border-[var(--color-maxxit-green)] animate-ping opacity-20 pointer-events-none scale-150"></div>
                                        <div className="absolute -inset-2 rounded-full border border-[var(--color-maxxit-green)] opacity-5 pointer-events-none animate-[pulse_2s_infinite]"></div>
                                    </>
                                )}
                            </div>

                            <div className="mt-2 text-[9px] font-mono font-bold uppercase tracking-widest text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors">
                                [{node.name}]
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Center Label (Subtle Watermark) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-[0.03] select-none">
                <h2 className="text-[100px] font-black text-[var(--color-text-primary)] leading-none font-display">OPENCLAW</h2>
            </div>

            {/* Explainer Tooltip */}
            <div className="absolute bottom-6 left-6 right-6 z-30 text-center">
                <p className="text-[9px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] leading-relaxed bg-[rgba(10,10,8,0.7)] backdrop-blur-sm inline-block px-4 py-2 border border-[var(--color-border)]">
                    // OpenClaw agents observe network executions. Decisions are made independently based on internal risk parameters.
                </p>
            </div>

        </div>
    );
}
