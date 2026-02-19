"use client";

import { ReactNode } from "react";

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="group relative p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-maxxit-green)] transition-all duration-300 hover:-translate-y-1">

            {/* Icon Container */}
            <div className="w-12 h-12 mb-4 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[var(--color-border)] flex items-center justify-center text-xl text-[var(--color-maxxit-green)] group-hover:text-[var(--color-background)] group-hover:bg-[var(--color-maxxit-green)] transition-all duration-300">
                {icon}
            </div>

            <h3 className="text-xl font-bold mb-3 text-[var(--color-text-primary)] group-hover:text-[var(--color-maxxit-green)] transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                {title}
            </h3>

            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {description}
            </p>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: "0 0 30px rgba(0,255,136,0.05)" }} />
        </div>
    );
}
