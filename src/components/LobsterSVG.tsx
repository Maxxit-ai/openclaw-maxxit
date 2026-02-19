"use client";

interface LobsterSVGProps {
    color: string;
    isActive: boolean;
    size?: number;
    className?: string;
    state?: "idle" | "active" | "rejected" | "processing";
}

export default function LobsterSVG({ color, isActive, size = 60, className = "", state = "idle" }: LobsterSVGProps) {
    // Dynamic color based on state if isActive is true
    const activeColor = state === "rejected" ? "var(--color-loss-red)" : color;
    const accentColor = state === "processing" ? "var(--color-openclaw-gold)" : "var(--color-maxxit-green)";

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            className={`transition-all duration-500 drop-shadow-[0_0_12px_rgba(0,0,0,0.5)] ${isActive ? 'scale-110' : 'scale-100'} ${className}`}
        >
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g style={{ color: isActive ? activeColor : "var(--color-text-muted)" }}>
                {/* 1. Bio-mechanical Leg Fins (Tail Fan) */}
                <path d="M50 95 L 30 85 Q 50 82, 70 85 Z" fill="currentColor" opacity="0.6" />
                <path d="M50 92 L 35 88 Q 50 86, 65 88 Z" fill="currentColor" />

                {/* 2. Abdomen Segments (The "Tail" part) */}
                <path d="M40 85 Q 50 82, 60 85 L 62 75 Q 50 72, 38 75 Z" fill="currentColor" opacity="0.7" />
                <path d="M42 75 Q 50 72, 58 75 L 60 65 Q 50 62, 40 65 Z" fill="currentColor" opacity="0.8" />
                <path d="M40 65 Q 50 62, 60 65 L 62 55 Q 50 52, 38 55 Z" fill="currentColor" />

                {/* 3. Main Carapace (Thorax) */}
                <path d="M35 55 Q 50 50, 65 55 L 68 30 Q 50 15, 32 30 Z" fill="currentColor" />

                {/* 4. Technical Joint Lines */}
                <g stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" fill="none">
                    <path d="M40 70 Q 50 68, 60 70" />
                    <path d="M38 60 Q 50 58, 62 60" />
                    <path d="M35 45 Q 50 42, 65 45" />
                </g>

                {/* 5. Cybernetic Eyes */}
                <circle cx="44" cy="28" r="2.5" fill={isActive ? accentColor : "#333"} filter={isActive ? "url(#glow)" : ""} />
                <circle cx="56" cy="28" r="2.5" fill={isActive ? accentColor : "#333"} filter={isActive ? "url(#glow)" : ""} />

                {/* 6. Iconic Heavy Claws (The branding piece) */}
                <g className={`transition-transform duration-700 origin-[50%_45%] ${isActive ? 'rotate-3' : '-rotate-1'}`}>
                    {/* Left Heavy Claw */}
                    <path d="M35 45 Q 15 50, 5 35 Q 0 15, 15 18 Q 30 22, 35 45" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path d="M5 35 Q -2 22, 10 12 L 18 18 Q 12 22, 5 35" fill="currentColor" /> {/* Main pincer */}
                    <path d="M8 28 L 15 25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                    {/* Right Heavy Claw */}
                    <path d="M65 45 Q 85 50, 95 35 Q 100 15, 85 18 Q 70 22, 65 45" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path d="M95 35 Q 102 22, 90 12 L 82 18 Q 88 22, 95 35" fill="currentColor" /> {/* Main pincer */}
                    <path d="M92 28 L 85 25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                </g>

                {/* 7. Neural Antennae (The OpenClaw look) */}
                <g stroke="var(--color-openclaw-gold)" strokeWidth="1.2" fill="none" opacity={isActive ? 1 : 0.4}>
                    <path d="M48 22 Q 40 5, 10 10" className={isActive ? "animate-wiggle" : ""} />
                    <path d="M52 22 Q 60 5, 90 10" className={isActive ? "animate-wiggle" : ""} />
                </g>

                {/* 8. Walking Legs (Functional tech look) */}
                <g opacity="0.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round">
                    <path d="M30 60 L 15 65 L 10 75" />
                    <path d="M30 50 L 12 48 L 5 55" />
                    <path d="M70 60 L 85 65 L 90 75" />
                    <path d="M70 50 L 88 48 L 95 55" />
                </g>
            </g>

            {isActive && state !== "idle" && (
                <circle cx="50" cy="50" r="45" fill="none" stroke={accentColor} strokeWidth="0.5" strokeDasharray="4 8" className="animate-spin-slow opacity-30" />
            )}

            <style jsx>{`
                @keyframes wiggle {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(2deg); }
                }
                .animate-wiggle {
                    animation: wiggle 3s ease-in-out infinite;
                    transform-origin: 50% 25%;
                }
                .animate-spin-slow {
                    animation: spin 12s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </svg>
    );
}
