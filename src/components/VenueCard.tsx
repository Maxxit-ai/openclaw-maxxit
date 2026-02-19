"use client";

interface VenueCardProps {
    name: string;
    chain: string;
    chainColor: string;
    description: string;
    symbolFormat: string;
    features: string[];
}

export default function VenueCard({
    name,
    chain,
    chainColor,
    description,
    symbolFormat,
    features,
}: VenueCardProps) {
    return (
        <div className="group border border-[var(--color-border)] rounded-2xl p-6 bg-[var(--color-surface)] hover:border-[var(--color-text-secondary)] transition-all duration-300">

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                        {name}
                    </h3>
                    <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                        style={{
                            borderColor: chainColor,
                            color: chainColor,
                            background: `${chainColor}10`
                        }}
                    >
                        {chain}
                    </span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-text-muted)]">
                    ↗
                </div>
            </div>

            <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                {description}
            </p>

            {/* Symbol Format Code Block */}
            <div className="bg-[var(--color-background)] rounded p-3 mb-6 font-mono text-xs border border-[var(--color-border)] text-[var(--color-text-muted)]">
                <div className="mb-1 text-[10px] uppercase opacity-50">Symbol Format</div>
                <code className="text-[var(--color-maxxit-green)]">{symbolFormat}</code>
            </div>

            <ul className="space-y-2">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-maxxit-green)] mt-0.5" style={{ fontSize: '10px' }}>●</span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
