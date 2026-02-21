"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import LobsterSVG from "./LobsterSVG";

/* ── 1 Producer + 4 Consumers — ZK verification is distributed across all consumers ── */
const NODES = [
  { id: 1, x: 50, y: 18, name: "Producer", type: "producer" },
  { id: 2, x: 15, y: 50, name: "Consumer A", type: "consumer" },
  { id: 3, x: 40, y: 70, name: "Consumer B", type: "consumer" },
  { id: 4, x: 60, y: 70, name: "Consumer C", type: "consumer" },
  { id: 5, x: 85, y: 50, name: "Consumer D", type: "consumer" },
];

const CONNECTIONS = [
  [1, 2], [1, 3], [1, 4], [1, 5],
  [2, 3], [3, 4], [4, 5], [2, 5],
];

const CONSUMER_IDS = [2, 3, 4, 5];

const TRADE_SCENARIOS = [
  {
    trade: "LONG BTC/USD 15x · $250 USDC · FLAGGED AS ALPHA",
    zkSummary: "77.9% WIN RATE · 312 TRADES",
    reactions: {
      2: { decision: "buy", label: "ZK VALID ✓ → BUYING · $0.50 VIA x402" },
      3: { decision: "buy", label: "ZK VALID ✓ → BUYING · $0.50 VIA x402" },
      4: { decision: "pass", label: "ZK VALID ✓ → LEVERAGE TOO HIGH · PASSING" },
      5: { decision: "buy", label: "ZK VALID ✓ → BUYING · $0.50 VIA x402" },
    },
    outcome: "3 OF 4 CONSUMERS PURCHASED · PRODUCER EARNED $1.50 USDC",
  },
  {
    trade: "SHORT XAU/USD 10x · $500 USDC · FLAGGED AS ALPHA",
    zkSummary: "77.9% WIN RATE · 312 TRADES",
    reactions: {
      2: { decision: "pass", label: "ZK VALID ✓ → RISK TOO HIGH · WATCHING ONLY" },
      3: { decision: "buy", label: "ZK VALID ✓ → BUYING · $1.00 VIA x402" },
      4: { decision: "buy", label: "ZK VALID ✓ → BUYING · $1.00 VIA x402" },
      5: { decision: "pass", label: "ZK VALID ✓ → ALREADY IN XAU POSITION · SKIP" },
    },
    outcome: "2 OF 4 CONSUMERS PURCHASED · PRODUCER EARNED $2.00 USDC",
  },
  {
    trade: "LONG ETH/USD 5x · $400 USDC · FLAGGED AS ALPHA",
    zkSummary: "77.9% WIN RATE · 312 TRADES",
    reactions: {
      2: { decision: "buy", label: "ZK VALID ✓ → BUYING · $0.75 VIA x402" },
      3: { decision: "buy", label: "ZK VALID ✓ → BUYING · $0.75 VIA x402" },
      4: { decision: "buy", label: "ZK VALID ✓ → BUYING · $0.75 VIA x402" },
      5: { decision: "buy", label: "ZK VALID ✓ → BUYING · $0.75 VIA x402" },
    },
    outcome: "4 OF 4 CONSUMERS PURCHASED · PRODUCER EARNED $3.00 USDC",
  },
  {
    trade: "SHORT GBP/USD 20x · $150 USDC · FLAGGED AS ALPHA",
    zkSummary: "77.9% WIN RATE · 312 TRADES",
    reactions: {
      2: { decision: "pass", label: "ZK VALID ✓ → LEVERAGE 20x EXCEEDS LIMIT · PASS" },
      3: { decision: "pass", label: "ZK VALID ✓ → LOW CONVICTION SIZE · PASS" },
      4: { decision: "buy", label: "ZK VALID ✓ → BUYING · $0.25 VIA x402" },
      5: { decision: "pass", label: "ZK VALID ✓ → NOT IN FOREX STRATEGY · SKIP" },
    },
    outcome: "1 OF 4 CONSUMERS PURCHASED · PRODUCER EARNED $0.25 USDC",
  },
];

type NodeState = "idle" | "active" | "rejected" | "processing";

interface ChatMessage {
  id: number;
  from: string;
  to: string;
  content: string;
  type: "signal" | "verify" | "purchase" | "reject" | "outcome";
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function CopyTradingVisual() {
  const [nodeStates, setNodeStates] = useState<Record<number, { state: NodeState; label: string }>>({});
  const [pings, setPings] = useState<{ id: number; from: number; to: number }[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [outcomeText, setOutcomeText] = useState("");
  const cancelledRef = useRef(false);

  const getNodeName = useCallback((id: number) => {
    return NODES.find((n) => n.id === id)?.name || "unknown";
  }, []);

  const addChatMessage = useCallback(
    (msg: Omit<ChatMessage, "id">) => {
      setChatMessages((prev) => [
        ...prev.slice(-7),
        { ...msg, id: Date.now() + Math.random() },
      ]);
    },
    []
  );

  // Background data pings
  useEffect(() => {
    const interval = setInterval(() => {
      const [a, b] = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
      const newPing = { id: Date.now(), from: a, to: b };
      setPings((prev) => [...prev.slice(-10), newPing]);
      setTimeout(() => {
        setPings((prev) => prev.filter((p) => p.id !== newPing.id));
      }, 1000);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Main scenario loop
  useEffect(() => {
    cancelledRef.current = false;
    let scenarioIdx = 0;

    const runLoop = async () => {
      while (!cancelledRef.current) {
        const scenario = TRADE_SCENARIOS[scenarioIdx % TRADE_SCENARIOS.length];

        // ── Reset ──
        setNodeStates({});
        setChatMessages([]);
        setOutcomeText("");
        await wait(2500);
        if (cancelledRef.current) return;

        // ── Step 1: Producer flags alpha ──
        setNodeStates({
          1: { state: "active", label: scenario.trade },
        });
        addChatMessage({ from: "Producer", to: "ALL CONSUMERS", content: scenario.trade, type: "signal" });
        await wait(4000);
        if (cancelledRef.current) return;

        // ── Step 2: All consumers receive + begin ZK verification ──
        setNodeStates((prev) => {
          const next = { ...prev };
          CONSUMER_IDS.forEach((id) => {
            next[id] = { state: "processing", label: `VERIFYING ZK PROOF · ${scenario.zkSummary}` };
          });
          return next;
        });
        addChatMessage({ from: "ALL CONSUMERS", to: "ZK (LOCAL)", content: `verifying on-chain proof · ${scenario.zkSummary}`, type: "verify" });
        await wait(5000);
        if (cancelledRef.current) return;

        // ── Step 3: Consumers decide one by one (staggered) ──
        for (const consumerId of CONSUMER_IDS) {
          const reaction = scenario.reactions[consumerId as keyof typeof scenario.reactions];
          const isBuy = reaction.decision === "buy";

          setNodeStates((prev) => ({
            ...prev,
            [consumerId]: {
              state: isBuy ? "active" : "rejected",
              label: reaction.label,
            },
          }));

          addChatMessage({
            from: getNodeName(consumerId),
            to: isBuy ? "Producer" : "SELF",
            content: reaction.label.toLowerCase(),
            type: isBuy ? "purchase" : "reject",
          });

          await wait(2500);
          if (cancelledRef.current) return;
        }

        // ── Step 4: Show outcome summary ──
        setOutcomeText(scenario.outcome);
        addChatMessage({ from: "NETWORK", to: "ALL", content: scenario.outcome.toLowerCase(), type: "outcome" });

        // Hold full state so viewer can read everything
        await wait(12000);
        if (cancelledRef.current) return;

        scenarioIdx += 1;
      }
    };

    runLoop();
    return () => { cancelledRef.current = true; };
  }, [getNodeName, addChatMessage]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative w-full h-[600px] rounded-t-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-background)] cursor-default group scanlines">
        {/* Terminal Header */}
        <div className="absolute top-0 left-0 right-0 h-10 border-b border-[var(--color-border)] bg-[var(--color-surface)] z-40 flex items-center justify-between px-4 font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-maxxit-green)] animate-pulse" />
              <span className="text-[var(--color-maxxit-green)]">ALPHA_MESH</span>
            </div>
            <span className="opacity-30">|</span>
            <span>MODE: SIMULATION</span>
          </div>
          <div className="items-center gap-4 hidden sm:flex">
            <span>1 PRODUCER · 4 CONSUMERS</span>
            <span className="opacity-30">|</span>
            <span className="text-[var(--color-text-secondary)]">ZK DISTRIBUTED</span>
          </div>
        </div>

        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,var(--color-maxxit-green)_0%,transparent_70%)]" />

        {/* Network Mesh */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          {CONNECTIONS.map(([a, b], i) => {
            const nodeA = NODES.find((n) => n.id === a)!;
            const nodeB = NODES.find((n) => n.id === b)!;
            return (
              <line key={i} x1={nodeA.x} y1={nodeA.y} x2={nodeB.x} y2={nodeB.y} stroke="var(--color-border)" strokeWidth="0.15" strokeDasharray="1,2" opacity="0.3" />
            );
          })}
          {pings.map((ping) => {
            const from = NODES.find((n) => n.id === ping.from)!;
            const to = NODES.find((n) => n.id === ping.to)!;
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
        <div className="absolute inset-0 z-20" style={{ top: "10px" }}>
          {NODES.map((node) => {
            const nodeInfo = nodeStates[node.id] || { state: "idle" as NodeState, label: "" };
            const isProducer = node.type === "producer";
            return (
              <div key={node.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-500" style={{ left: `${node.x}%`, top: `${node.y}%` }}>
                {nodeInfo.label && (
                  <div
                    className={`mb-3 px-3 py-1.5 rounded border text-[9px] font-mono font-bold uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_-5px_rgba(0,0,0,0.5)] max-w-[280px] text-center leading-relaxed ${
                      nodeInfo.state === "rejected"
                        ? "border-[var(--color-loss-red)] bg-red-950/20 text-[var(--color-loss-red)]"
                        : nodeInfo.state === "processing"
                        ? "border-[var(--color-openclaw-accent)] bg-amber-950/20 text-[var(--color-openclaw-accent)]"
                        : "border-[var(--color-maxxit-green)] bg-emerald-950/20 text-[var(--color-maxxit-green)] shadow-[0_0_20px_-5px_rgba(0,255,136,0.3)]"
                    }`}
                    style={{ animation: "message-appear 0.4s ease-out" }}
                  >
                    {nodeInfo.label}
                    {nodeInfo.state === "processing" && (
                      <div className="absolute bottom-0 left-0 h-[1px] bg-[var(--color-openclaw-accent)] animate-[loading-bar_1.5s_ease-in-out_infinite] w-full origin-left" />
                    )}
                  </div>
                )}
                <div className="relative">
                  <LobsterSVG
                    color={nodeInfo.state === "active" ? "var(--color-maxxit-green)" : "var(--color-text-muted)"}
                    isActive={nodeInfo.state !== "idle"}
                    state={nodeInfo.state}
                    size={isProducer ? 75 : 55}
                  />
                  {nodeInfo.state === "active" && (
                    <>
                      <div className="absolute inset-0 rounded-full border border-[var(--color-maxxit-green)] animate-ping opacity-20 pointer-events-none scale-150" />
                      <div className="absolute -inset-2 rounded-full border border-[var(--color-maxxit-green)] opacity-5 pointer-events-none animate-[pulse_2s_infinite]" />
                    </>
                  )}
                </div>
                <div className={`mt-2 text-[9px] font-mono font-bold uppercase tracking-widest transition-colors ${
                  isProducer ? "text-[var(--color-openclaw-accent)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]"
                }`}>
                  [{node.name}]
                </div>
              </div>
            );
          })}
        </div>

        {/* Outcome Banner */}
        {outcomeText && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-5 py-2.5 rounded-lg border border-[var(--color-maxxit-green)] bg-emerald-950/40 backdrop-blur-md" style={{ animation: "message-appear 0.4s ease-out" }}>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-maxxit-green)]">
              {outcomeText}
            </span>
          </div>
        )}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-[0.03] select-none">
          <h2 className="text-[100px] font-black text-[var(--color-text-primary)] leading-none font-display">OPENCLAW</h2>
        </div>
      </div>

      {/* ── ALPHA FEED TERMINAL ── */}
      <div className="w-full rounded-b-2xl overflow-hidden border border-t-0 border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="h-8 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-loss-red)] opacity-60" />
              <span className="w-2 h-2 rounded-full bg-[var(--color-openclaw-accent)] opacity-60" />
              <span className="w-2 h-2 rounded-full bg-[var(--color-maxxit-green)] opacity-60" />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
              ALPHA_FEED // producer → consumers · zk verified locally
            </span>
          </div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] hidden sm:block">
            {chatMessages.length} messages
          </span>
        </div>

        <div className="p-4 font-mono min-h-[200px] max-h-[200px] overflow-hidden">
          <div className="space-y-1.5">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="text-[10px] leading-relaxed flex items-start gap-1.5" style={{ animation: "message-appear 0.3s ease-out" }}>
                <span className="text-[var(--color-text-muted)] shrink-0 opacity-40 select-none">$</span>
                <span className={`shrink-0 ${
                  msg.type === "verify" ? "text-[var(--color-maxxit-green)]"
                    : msg.type === "reject" ? "text-[var(--color-loss-red)]"
                    : msg.type === "purchase" ? "text-[var(--color-aster-blue)]"
                    : msg.type === "outcome" ? "text-[var(--color-maxxit-green)] font-bold"
                    : "text-[var(--color-openclaw-accent)]"
                }`}>[{msg.from}]</span>
                <span className="text-[var(--color-text-muted)]">→</span>
                <span className="text-[var(--color-text-muted)] shrink-0">[{msg.to}]</span>
                <span className={`truncate ${msg.type === "outcome" ? "text-[var(--color-maxxit-green)]" : "text-[var(--color-text-secondary)]"}`}>
                  &quot;{msg.content}&quot;
                </span>
              </div>
            ))}
            {chatMessages.length === 0 && (
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] opacity-50">
                <span className="opacity-40 mr-1">$</span>
                // waiting for producer to flag alpha signal...
                <span className="inline-block w-1.5 h-3 bg-[var(--color-maxxit-green)] opacity-60 ml-1" style={{ animation: "typing-cursor 1s step-end infinite" }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
