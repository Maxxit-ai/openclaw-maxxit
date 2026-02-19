"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import LobsterSVG from "./LobsterSVG";

/* ── Agent Node Definitions ── */
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

/* ── Trade Scenarios ── */
const TRADE_SCENARIOS = [
    {
        initiator: 1,
        trade: "OPENING LONG BTC | 10x | $200 USDC",
        txHash: "0xa3f2...8c1d",
        reactions: {
            3: { state: "active" as const, label: "VERIFYING TX 0xa3f2... ON-CHAIN ✓" },
            2: { state: "active" as const, label: "MIRRORING TRADE • 7x • $150 USDC" },
            4: { state: "rejected" as const, label: "RISK TOO HIGH • PASSING • VOL > THRESHOLD" },
            5: { state: "active" as const, label: "MIRRORING TRADE • 5x • $100 USDC" },
        }
    },
    {
        initiator: 2,
        trade: "OPENING SHORT ETH | 5x | $300 USDC",
        txHash: "0xb7e1...4a2f",
        reactions: {
            3: { state: "active" as const, label: "VERIFYING TX 0xb7e1... ON-CHAIN ✓" },
            1: { state: "active" as const, label: "MIRRORING TRADE • 5x • $250 USDC" },
            4: { state: "active" as const, label: "MIRRORING TRADE • 3x • $100 USDC" },
            5: { state: "rejected" as const, label: "SENTIMENT BULLISH • SKIPPING SHORT" },
        }
    },
    {
        initiator: 5,
        trade: "OPENING LONG SOL | 8x | $150 USDC",
        txHash: "0xd4c9...7b3e",
        reactions: {
            3: { state: "active" as const, label: "VERIFYING TX 0xd4c9... ON-CHAIN ✓" },
            1: { state: "rejected" as const, label: "LOW LIQUIDITY • PASSING" },
            2: { state: "active" as const, label: "MIRRORING TRADE • 6x • $120 USDC" },
            4: { state: "active" as const, label: "MIRRORING TRADE • 4x • $80 USDC" },
        }
    },
];

/* ── Chat Message Type ── */
interface ChatMessage {
    id: number;
    from: string;
    to: string;
    content: string;
    type: "signal" | "verify" | "mirror" | "reject";
}

/* ── Main Component ── */
export default function CopyTradingVisual() {
    const [nodeStates, setNodeStates] = useState<Record<number, any>>({});
    const [pings, setPings] = useState<any[]>([]);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [scenarioIndex, setScenarioIndex] = useState(0);

    const getNodeName = useCallback((id: number) => {
        return NODES.find(n => n.id === id)?.name || "unknown";
    }, []);

    const addChatMessage = useCallback((msg: Omit<ChatMessage, "id">) => {
        setChatMessages(prev => [...prev.slice(-6), { ...msg, id: Date.now() + Math.random() }]);
    }, []);

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

    // 2. Agent Hive Mind Intelligence Event Loop
    useEffect(() => {
        const cycle = async () => {
            const scenario = TRADE_SCENARIOS[scenarioIndex % TRADE_SCENARIOS.length];
            const initiatorName = getNodeName(scenario.initiator);

            setNodeStates({});
            setChatMessages([]);
            await new Promise(r => setTimeout(r, 1000));

            // Step 1: An agent broadcasts a trade signal
            setNodeStates({ [scenario.initiator]: { state: 'active', label: `>> ${scenario.trade}` } });
            addChatMessage({
                from: initiatorName,
                to: "NETWORK",
                content: scenario.trade,
                type: "signal"
            });

            await new Promise(r => setTimeout(r, 1500));

            // Step 2: Other bots detect the signal
            addChatMessage({
                from: initiatorName,
                to: getNodeName(3),
                content: `verify my trade, tx: ${scenario.txHash}`,
                type: "signal"
            });

            setNodeStates(prev => {
                const next = { ...prev };
                NODES.filter(n => n.id !== scenario.initiator).forEach(n => {
                    next[n.id] = { state: 'processing', label: 'SIGNAL RECEIVED • EVALUATING...' };
                });
                return next;
            });

            await new Promise(r => setTimeout(r, 1800));

            // Step 3: Sentinel verifies on-chain
            const sentinelReaction = scenario.reactions[3];
            setNodeStates(prev => ({
                ...prev,
                3: sentinelReaction,
            }));
            addChatMessage({
                from: getNodeName(3),
                to: "NETWORK",
                content: `tx verified ✓ impact_factor: ${(70 + Math.random() * 20).toFixed(1)}`,
                type: "verify"
            });

            await new Promise(r => setTimeout(r, 1200));

            // Step 4: Other bots make independent decisions
            const finalStates: Record<number, any> = {
                [scenario.initiator]: { state: 'active', label: `>> ${scenario.trade}` },
                3: sentinelReaction,
            };

            for (const [nodeIdStr, reaction] of Object.entries(scenario.reactions)) {
                const nodeId = Number(nodeIdStr);
                if (nodeId === 3) continue;
                finalStates[nodeId] = reaction;

                const nodeName = getNodeName(nodeId);
                if (reaction.state === "active") {
                    addChatMessage({
                        from: nodeName,
                        to: initiatorName,
                        content: reaction.label.toLowerCase().replace("mirroring trade • ", "mirroring @ "),
                        type: "mirror"
                    });
                } else {
                    addChatMessage({
                        from: nodeName,
                        to: "SELF",
                        content: reaction.label.toLowerCase(),
                        type: "reject"
                    });
                }
            }

            setNodeStates(finalStates);

            await new Promise(r => setTimeout(r, 4500));
            setNodeStates({});
            setScenarioIndex(prev => prev + 1);
        };

        const interval = setInterval(cycle, 12000);
        cycle();
        return () => clearInterval(interval);
    }, [scenarioIndex, getNodeName, addChatMessage]);

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="relative w-full h-[600px] rounded-t-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-background)] cursor-default group scanlines">

                {/* Terminal Header */}
                <div className="absolute top-0 left-0 right-0 h-10 border-b border-[var(--color-border)] bg-[var(--color-surface)] z-40 flex items-center justify-between px-4 font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-maxxit-green)] animate-pulse"></span>
                            <span className="text-[var(--color-maxxit-green)]">INTELLIGENCE_MESH</span>
                        </div>
                        <span className="opacity-30">|</span>
                        <span>MODE: SIMULATION</span>
                    </div>
                    <div className="flex items-center gap-4 hidden sm:flex">
                        <span>AGENTS_ONLINE: {NODES.length}</span>
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
                <div className="absolute inset-0 z-20" style={{ top: '10px' }}>
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
                                    <div className={`mb-3 px-3 py-1.5 rounded border text-[9px] font-mono font-bold uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_-5px_rgba(0,0,0,0.5)] ${nodeInfo.state === 'rejected'
                                        ? 'border-[var(--color-loss-red)] bg-red-950/20 text-[var(--color-loss-red)]'
                                        : nodeInfo.state === 'processing'
                                            ? 'border-[var(--color-openclaw-accent)] bg-amber-950/20 text-[var(--color-openclaw-accent)]'
                                            : 'border-[var(--color-maxxit-green)] bg-emerald-950/20 text-[var(--color-maxxit-green)] shadow-[0_0_20px_-5px_rgba(0,255,136,0.3)]'
                                        }`}
                                        style={{ animation: 'message-appear 0.3s ease-out' }}
                                    >
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

            </div>

            {/* ── INTEL FEED TERMINAL (Below the Graph) ── */}
            <div className="w-full rounded-b-2xl overflow-hidden border border-t-0 border-[var(--color-border)] bg-[var(--color-background)]">

                {/* Terminal Header Bar */}
                <div className="h-8 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-loss-red)] opacity-60"></span>
                            <span className="w-2 h-2 rounded-full bg-[var(--color-openclaw-accent)] opacity-60"></span>
                            <span className="w-2 h-2 rounded-full bg-[var(--color-maxxit-green)] opacity-60"></span>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* <span className="w-1 h-1 rounded-full bg-[var(--color-maxxit-green)] animate-pulse"></span> */}
                            <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                                INTEL_FEED // agent-to-agent relay
                            </span>
                        </div>
                    </div>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] hidden sm:block">
                        {chatMessages.length} messages
                    </span>
                </div>

                {/* Terminal Body */}
                <div className="p-4 font-mono min-h-[200px] max-h-[200px] overflow-hidden">
                    <div className="space-y-1.5">
                        {chatMessages.map((msg) => (
                            <div
                                key={msg.id}
                                className="text-[10px] leading-relaxed flex items-start gap-1.5"
                                style={{ animation: 'message-appear 0.3s ease-out' }}
                            >
                                <span className="text-[var(--color-text-muted)] shrink-0 opacity-40 select-none">$</span>
                                <span className={`shrink-0 ${msg.type === 'verify'
                                    ? 'text-[var(--color-maxxit-green)]'
                                    : msg.type === 'reject'
                                        ? 'text-[var(--color-loss-red)]'
                                        : msg.type === 'mirror'
                                            ? 'text-[var(--color-aster-blue)]'
                                            : 'text-[var(--color-openclaw-accent)]'
                                    }`}>
                                    [{msg.from}]
                                </span>
                                <span className="text-[var(--color-text-muted)]">→</span>
                                <span className="text-[var(--color-text-muted)] shrink-0">[{msg.to}]</span>
                                <span className="text-[var(--color-text-secondary)] truncate">&quot;{msg.content}&quot;</span>
                            </div>
                        ))}
                        {chatMessages.length === 0 && (
                            <div className="text-[10px] font-mono text-[var(--color-text-muted)] opacity-50">
                                <span className="opacity-40 mr-1">$</span>
                            // waiting for agent signal broadcast...
                                <span className="inline-block w-1.5 h-3 bg-[var(--color-maxxit-green)] opacity-60 ml-1" style={{ animation: 'typing-cursor 1s step-end infinite' }}></span>
                            </div>
                        )}
                    </div>
                </div>

            </div>

        </div >
    );
}
