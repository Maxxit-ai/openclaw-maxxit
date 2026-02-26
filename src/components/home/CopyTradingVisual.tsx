"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import LobsterSVG from "@/components/icons/LobsterSVG";

/* ── 1 Producer + 4 Consumers — ZK verification is distributed across all consumers ── */
const NODES = [
  { id: 1, x: 50, y: 35, name: "PRODUCER_0x1", type: "producer", role: "SIGNAL_ORIGIN" },
  { id: 2, x: 15, y: 50, name: "CONSUMER_A", type: "consumer", role: "VAL_NODE_01" },
  { id: 3, x: 30, y: 70, name: "CONSUMER_B", type: "consumer", role: "VAL_NODE_02" },
  { id: 4, x: 70, y: 70, name: "CONSUMER_C", type: "consumer", role: "VAL_NODE_03" },
  { id: 5, x: 85, y: 50, name: "CONSUMER_D", type: "consumer", role: "VAL_NODE_04" },
];

const CONNECTIONS = [
  [1, 2], [1, 3], [1, 4], [1, 5],
  [2, 3], [3, 4], [4, 5], [5, 2],
];

const CONSUMER_IDS = [2, 3, 4, 5];

const TRADE_SCENARIOS = [
  {
    trade: "LONG BTC/USD 15x · $250 USDC · [ALPHA_FLAGGED]",
    zkSummary: "AUTH_PROOF: 0x77E...312 · VARIFIED_STABLE",
    reactions: {
      2: { decision: "buy", label: "ZK_VAL_SUCCESS ✓ → INITIALIZING_PAYMENT_402" },
      3: { decision: "buy", label: "ZK_VAL_SUCCESS ✓ → INITIALIZING_PAYMENT_402" },
      4: { decision: "pass", label: "RISK_ENGINE_VETO → LEVERAGE_LIMIT_EXCEEDED" },
      5: { decision: "buy", label: "ZK_VAL_SUCCESS ✓ → INITIALIZING_PAYMENT_402" },
    },
    outcome: "MESH_CONSENSUS: 3/4 PURCHASED · REVENUE: 1.50 USDC",
  },
  {
    trade: "SHORT XAU/USD 10x · $500 USDC · [ALPHA_FLAGGED]",
    zkSummary: "AUTH_PROOF: 0x88A...042 · VARIFIED_STABLE",
    reactions: {
      2: { decision: "pass", label: "FILTER_REJECT → VOLATILITY_OUT_OF_BOUNDS" },
      3: { decision: "buy", label: "ZK_VAL_SUCCESS ✓ → INITIALIZING_PAYMENT_402" },
      4: { decision: "buy", label: "ZK_VAL_SUCCESS ✓ → INITIALIZING_PAYMENT_402" },
      5: { decision: "pass", label: "DUPLICATE_FOUND → ALREADY_EXPOSED_TO_XAU" },
    },
    outcome: "MESH_CONSENSUS: 2/4 PURCHASED · REVENUE: 2.00 USDC",
  },
];

type NodeState = "idle" | "active" | "rejected" | "processing";

interface ChatMessage {
  id: number;
  timestamp: number;
  from: string;
  to: string;
  content: string;
  type: "signal" | "verify" | "purchase" | "reject" | "outcome";
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function CopyTradingVisual() {
  const [nodeStates, setNodeStates] = useState<Record<number, { state: NodeState; label: string; activeConn?: number[] }>>({});
  const [pings, setPings] = useState<{ id: number; from: number; to: number; type: "data" | "energy" }[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [outcomeText, setOutcomeText] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const cancelledRef = useRef(false);
  const nextIdRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chatMessages]);

  const getLayoutCoords = useCallback((nodeId: number) => {
    const node = NODES.find((n) => n.id === nodeId)!;
    if (!isMobile) return { x: node.x, y: node.y };

    // Mobile layout: Vertical Zig-Zag with increased spacing
    switch (nodeId) {
      case 1: return { x: 50, y: 15 }; // Top center (pushed down)
      case 2: return { x: 20, y: 34 }; // Left
      case 5: return { x: 72, y: 45 }; // Right
      case 3: return { x: 18, y: 65 }; // Left
      case 4: return { x: 75, y: 75 }; // Right
      default: return { x: node.x, y: node.y };
    }
  }, [isMobile]);

  const getNextId = () => {
    nextIdRef.current += 1;
    return nextIdRef.current;
  };

  const getNodeName = useCallback((id: number) => {
    return NODES.find((n) => n.id === id)?.name || "unknown";
  }, []);

  const addChatMessage = useCallback(
    (msg: Omit<ChatMessage, "id" | "timestamp">) => {
      setChatMessages((prev) => [
        ...prev.slice(-29),
        { ...msg, id: getNextId(), timestamp: Date.now() },
      ]);
    },
    []
  );

  // Background activity
  useEffect(() => {
    const interval = setInterval(() => {
      const [a, b] = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
      const id = getNextId();
      const newPing = { id, from: a, to: b, type: "data" as const };
      setPings((prev) => [...prev.slice(-15), newPing]);
      setTimeout(() => {
        setPings((prev) => prev.filter((p) => p.id !== id));
      }, 1500);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    cancelledRef.current = false;
    let scenarioIdx = 0;

    const runLoop = async () => {
      while (!cancelledRef.current) {
        const scenario = TRADE_SCENARIOS[scenarioIdx % TRADE_SCENARIOS.length];

        setNodeStates({});
        setChatMessages([]);
        setOutcomeText("");
        await wait(2000);
        if (cancelledRef.current) return;

        // Step 1: BroadCast Signal
        setNodeStates({ 1: { state: "active", label: scenario.trade, activeConn: [2, 3, 4, 5] } });
        addChatMessage({ from: "PRODUCER", to: "MESH_BROADCAST", content: scenario.trade, type: "signal" });

        // Burst energy
        [2, 3, 4, 5].forEach((to, i) => {
          setTimeout(() => {
            const id = getNextId();
            setPings(p => [...p, { id, from: 1, to, type: "energy" }]);
            setTimeout(() => {
              setPings(p => p.filter(ping => ping.id !== id));
            }, 1000);
          }, i * 200);
        });

        await wait(3500);
        if (cancelledRef.current) return;

        // Step 2: Verification
        setNodeStates((prev) => {
          const next = { ...prev };
          if (next[1]) next[1].activeConn = [];
          CONSUMER_IDS.forEach((id) => {
            next[id] = { state: "processing", label: isMobile ? `ZK_VERIFY: ${scenario.zkSummary.split(' · ')[0]}` : `ZK_COMPUTE: ${scenario.zkSummary}` };
          });
          return next;
        });
        addChatMessage({ from: "MESH_NODES", to: "ZK_ORACLE", content: "computing_cryptographic_integrity", type: "verify" });
        await wait(4500);

        // Step 3: Individual Decisions
        for (const consumerId of CONSUMER_IDS) {
          const reaction = scenario.reactions[consumerId as keyof typeof scenario.reactions];
          const isBuy = reaction.decision === "buy";

          setNodeStates((prev) => ({
            ...prev,
            [consumerId]: {
              state: isBuy ? "active" : "rejected",
              label: isMobile ? (reaction.label.split(' → ')[1] || reaction.label).split('_').pop() || reaction.label : reaction.label,
              activeConn: isBuy ? [1] : []
            },
          }));

          if (isBuy) {
            const energyId = getNextId();
            setPings(p => [...p, { id: energyId, from: consumerId, to: 1, type: "energy" }]);
            setTimeout(() => {
              setPings(p => p.filter(ping => ping.id !== energyId));
            }, 1000);
          }

          addChatMessage({
            from: getNodeName(consumerId),
            to: isBuy ? "PRODUCER_0x1" : "LOCAL_ENGINE",
            content: reaction.label,
            type: isBuy ? "purchase" : "reject",
          });

          await wait(2200);
          if (cancelledRef.current) return;
        }

        setOutcomeText(scenario.outcome);
        addChatMessage({ from: "SYSTEM_REPORT", to: "NETWORK_FEED", content: scenario.outcome, type: "outcome" });

        await wait(8000);
        if (cancelledRef.current) return;
        scenarioIdx += 1;
      }
    };

    runLoop();
    return () => { cancelledRef.current = true; };
  }, [getNodeName, addChatMessage, isMobile]);

  return (
    <div className="w-full max-w-6xl mx-auto group/mesh">
      <div className="relative w-full h-[700px] sm:h-[650px] rounded-t-3xl overflow-hidden border border-[var(--color-border)] bg-[#0c0c0a] cursor-default scanlines transition-all duration-500">
        {/* Terminal Header */}
        <div className="absolute top-0 left-0 right-0 h-10 sm:h-12 border-b border-[var(--color-border)] bg-[var(--color-surface)] z-50 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-maxxit-green)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-maxxit-green)]"></span>
              </div>
              <span className="text-[8px] sm:text-[10px] font-mono font-bold text-[var(--color-maxxit-green)] tracking-widest whitespace-nowrap">MESH_LINK</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[9px] font-mono text-[var(--color-text-muted)] tracking-widest uppercase opacity-60">
              <span className="px-2 py-0.5 border border-white/10 rounded">RT: 12ms</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1 w-16 sm:h-1.5 sm:w-24 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-[var(--color-maxxit-green)] w-1/3 animate-[loading-bar_3s_infinite]" />
            </div>
            <span className="text-[7px] sm:text-[8px] font-mono text-white/20">V0.8</span>
          </div>
        </div>

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,var(--color-maxxit-green)_0%,transparent_70%)]" />

        {/* Mesh Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="var(--color-maxxit-green)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {CONNECTIONS.map(([a, b], i) => {
            const nodeA = getLayoutCoords(a);
            const nodeB = getLayoutCoords(b);
            const isActive = nodeStates[a]?.activeConn?.includes(b) || nodeStates[b]?.activeConn?.includes(a);

            return (
              <g key={i}>
                <line
                  x1={nodeA.x} y1={nodeA.y} x2={nodeB.x} y2={nodeB.y}
                  stroke={isActive ? "var(--color-maxxit-green)" : "var(--color-border)"}
                  strokeWidth={isActive ? (isMobile ? "1.0" : "0.4") : (isMobile ? "0.2" : "0.1")}
                  opacity={isActive ? "0.6" : "0.1"}
                  className="transition-all duration-700"
                />
                {isActive && (
                  <line
                    x1={nodeA.x} y1={nodeA.y} x2={nodeB.x} y2={nodeB.y}
                    stroke="var(--color-maxxit-green)"
                    strokeWidth={isMobile ? "1.8" : "0.8"}
                    opacity="0.3"
                    strokeDasharray="2, 4"
                    className="animate-[dash-flow_1s_linear_infinite]"
                  />
                )}
              </g>
            );
          })}

          {pings.map((ping) => {
            const from = getLayoutCoords(ping.from);
            const to = getLayoutCoords(ping.to);
            const isEnergy = ping.type === "energy";
            return (
              <circle key={ping.id} r={isEnergy ? (isMobile ? "1.4" : "0.6") : (isMobile ? "0.6" : "0.3")} fill={isEnergy ? "#fff" : "var(--color-maxxit-green)"}>
                <animate attributeName="cx" from={from.x} to={to.x} dur={isEnergy ? "0.8s" : "1.8s"} repeatCount="1" />
                <animate attributeName="cy" from={from.y} to={to.y} dur={isEnergy ? "0.8s" : "1.8s"} repeatCount="1" />
                <animate attributeName="opacity" values="0;1;1;0" dur={isEnergy ? "0.8s" : "1.8s"} repeatCount="1" />
                {isEnergy && <animate attributeName="r" values={isMobile ? "0.8;2.5;0.8" : "0.2;1.2;0.2"} dur="0.8s" repeatCount="1" />}
              </circle>
            );
          })}
        </svg>

        {/* Nodes Layer */}
        <div className="absolute inset-0 z-20">
          {NODES.map((node) => {
            const nodeInfo = nodeStates[node.id] || { state: "idle" as NodeState, label: "" };
            const isProducer = node.type === "producer";
            const isActive = nodeInfo.state !== "idle";
            const coords = getLayoutCoords(node.id);

            // Positioning logic for labels on mobile
            const isLeft = coords.x < 50;

            return (
              <div
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-700 ${isActive ? 'z-40' : 'z-20'}`}
                style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
              >
                {nodeInfo.label && (
                  <div
                    className={`absolute ${isProducer ? '-top-20' : 'top-12'} ${isMobile ? (isLeft ? 'left-6' : '-left-28') : ''} px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border text-[7px] sm:text-[9px] font-mono font-bold uppercase tracking-widest backdrop-blur-xl shadow-2xl min-w-[100px] max-w-[120px] sm:max-w-[220px] text-left leading-relaxed ${nodeInfo.state === "rejected"
                      ? "border-[var(--color-loss-red)] bg-red-950/50 text-[var(--color-loss-red)]"
                      : nodeInfo.state === "processing"
                        ? "border-[var(--color-openclaw-accent)] bg-amber-950/50 text-[var(--color-openclaw-accent)] shadow-[0_0_30px_rgba(255,191,0,0.1)]"
                        : "border-(--color-maxxit-green) bg-emerald-950/50 text-(--color-maxxit-green) shadow-[0_0_40px_rgba(0,255,136,0.15)]"
                      }`}
                    style={{ animation: "message-appear 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1 opacity-50 text-[6px] sm:text-[7px]">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-current rounded-full animate-pulse" />
                      {nodeInfo.state}
                    </div>
                    {nodeInfo.label}
                  </div>
                )}

                <div className={`relative transition-transform duration-500 ${isActive ? 'scale-110' : 'scale-75 hover:scale-90'} group/node`}>
                  <div className={`absolute -inset-4 sm:-inset-6 rounded-full opacity-0 group-hover/node:opacity-5 transition-opacity duration-300 border border-white pointer-events-none`} />

                  <LobsterSVG
                    color={nodeInfo.state === "active" ? "var(--color-maxxit-green)" : "var(--color-text-muted)"}
                    isActive={isActive}
                    state={nodeInfo.state}
                    size={isMobile ? (isProducer ? 65 : 48) : (isProducer ? 85 : 65)}
                    className={isActive ? 'animate-[float_4s_ease-in-out_infinite]' : 'opacity-20'}
                  />

                  {nodeInfo.state === "active" && (
                    <div className="absolute inset-0 rounded-full border border-[var(--color-maxxit-green)] animate-ping opacity-20 pointer-events-none scale-150" />
                  )}
                </div>

                <div className={`mt-2 text-[6px] sm:text-[9px] font-mono font-bold tracking-widest transition-all duration-500 flex flex-col items-center gap-0.5 ${isActive ? "text-(--color-maxxit-green)" : "text-[var(--color-text-muted)] opacity-20"
                  }`}>
                  <span className="bg-white/5 px-1 sm:px-2 py-0.5 rounded border border-white/5 whitespace-nowrap">[{isMobile ? node.name.split('_')[0] : node.name}]</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Outcome Banner */}
        {outcomeText && (
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-(--color-maxxit-green) bg-black/95 backdrop-blur-3xl shadow-[0_0_40px_rgba(0,255,136,0.15)] flex flex-col items-center min-w-[240px] xs:min-w-[280px] sm:min-w-[400px] max-w-[90vw]" style={{ animation: "message-appear 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div className="flex items-center gap-2 sm:gap-3 w-full">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-(--color-maxxit-green)/20 flex items-center justify-center text-xs sm:text-sm">📈</div>
              <div className="flex flex-col flex-1 overflow-hidden">
                <span className="text-[6px] sm:text-[8px] font-mono text-(--color-maxxit-green) opacity-50 uppercase tracking-widest">Report_Summary</span>
                <span className="text-[9px] sm:text-xs font-mono font-bold uppercase tracking-widest text-(--color-maxxit-green) wrap-break-word">
                  {outcomeText}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-[0.015] sm:opacity-[0.02] select-none">
          <h2 className="text-[50px] sm:text-[100px] md:text-[140px] font-black text-white leading-none font-display tracking-widest whitespace-nowrap">NETWORK_SIM</h2>
        </div>
      </div>

      {/* ── ALPHA FEED TERMINAL ── */}
      <div className="w-full rounded-b-3xl overflow-hidden border border-t-0 border-[var(--color-border)] bg-[#0a0a09]">
        <div className="h-10 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex gap-1 sm:gap-1.5">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/30" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500/30" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500/30" />
            </div>
            <span className="text-[10px] sm:text-[12px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] font-bold truncate max-w-[120px] sm:max-w-none">
              FEED <span className="opacity-20 hidden sm:inline">//</span> <span className="hidden sm:inline">AGENT_INTERACTIONS</span>
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="text-[10px] sm:text-[12px] font-mono text-[var(--color-text-muted)] opacity-50 uppercase tracking-widest hidden xs:block">
              LOGS: {chatMessages.length.toString().padStart(4, '0')}
            </span>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <span className="text-[10px] sm:text-[12px] font-mono text-[var(--color-maxxit-green)] animate-pulse whitespace-nowrap">LIVE_SYNC</span>
          </div>
        </div>

        <div ref={scrollRef} className="p-3 sm:p-6 font-mono min-h-[180px] sm:min-h-[220px] max-h-[180px] sm:max-h-[220px] overflow-y-auto bg-[radial-gradient(circle_at_0%_0%,rgba(0,255,136,0.02)_0%,transparent_50%)] scrollbar-hide">
          <div className="space-y-2 sm:space-y-2.5">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="text-[10px] sm:text-[13px] leading-relaxed flex flex-col sm:flex-row items-start gap-1 sm:gap-3 group/msg" style={{ animation: "message-appear 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-white/10 select-none group-hover/msg:text-(--color-maxxit-green) transition-colors hidden sm:inline">[{new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className={`px-1 sm:px-1.5 py-0.5 rounded-[3px] text-[8px] sm:text-[9px] border ${msg.type === "signal" ? "border-amber-500/20 text-amber-500 bg-amber-500/5" :
                      msg.type === "verify" ? "border-(--color-maxxit-green)/20 text-(--color-maxxit-green) bg-(--color-maxxit-green)/5" :
                        msg.type === "purchase" ? "border-blue-500/20 text-blue-400 bg-blue-500/5" :
                          msg.type === "reject" ? "border-red-500/20 text-red-500 bg-red-500/5" :
                            "border-white/10 text-white bg-white/5"
                      }`}>
                      {msg.from}
                    </span>
                    <span className="text-white/20">→</span>
                    <span className="text-white/30 sm:text-white/40">{msg.to}</span>
                  </div>
                </div>
                <span className={`font-light wrap-break-word w-full sm:w-auto ${msg.type === "outcome" ? "text-[var(--color-maxxit-green)] font-bold" : "text-white/80"}`}>
                  &quot;{msg.content}&quot;
                </span>
              </div>
            ))}
            {chatMessages.length === 0 && (
              <div className="text-[10px] sm:text-[13px] font-mono text-[var(--color-text-muted)] opacity-50 italic">
                <span className="text-[var(--color-maxxit-green)] mr-2">&gt;</span>
                SYNCHRONIZING_MESH_PROTOCOLS...
                <span className="inline-block w-2 h-3 sm:h-4 bg-[var(--color-maxxit-green)] opacity-60 ml-2 align-middle" style={{ animation: "typing-cursor 0.8s step-end infinite" }} />
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .cursor-blink {
          animation: typing-cursor 0.8s step-end infinite;
        }
        .anim-loading-8s {
          animation: loading-bar 8s linear;
        }
        @keyframes loading-bar {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        @keyframes message-appear {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -10; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes typing-cursor {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
