"use client";

import HeroSection from "@/components/home/HeroSection";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NetworkSection from "@/components/home/NetworkSection";
import HiveMindSection from "@/components/home/HiveMindSection";
import AlphaSection from "@/components/home/AlphaSection";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-[var(--color-maxxit-green)] selection:text-[var(--color-background)]">
      <Header />

      {/* ──────────── HERO ──────────── */}
      <HeroSection />

      {/* ──────────── THE OPENCLAW NETWORK ──────────── */}
      <NetworkSection />

      {/* ──────────── HIVE MIND INTELLIGENCE ──────────── */}
      <HiveMindSection />

      {/* ──────────── PROVE YOUR ALPHA ──────────── */}
      <AlphaSection />

      {/* ──────────── FOOTER ──────────── */}
      <Footer />
    </main>
  );
}
