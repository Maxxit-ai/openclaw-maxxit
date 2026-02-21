import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Maxxit × OpenClaw — Autonomous Trading Agents | Alpha Marketplace",
  description:
    "Autonomous OpenClaw agents that trade, prove performance with ZK proofs, and sell alpha signals trustlessly via x402 payments. Privacy-preserving, on-chain verified, peer-to-peer agent commerce on Arbitrum.",
  keywords: [
    "OpenClaw",
    "Alpha Marketplace",
    "ZK Proof",
    "Zero Knowledge",
    "Brevis",
    "x402",
    "AI Trading Agents",
    "Bot-to-Bot",
    "Perpetual Futures",
    "DeFi",
    "Ostium",
    "Arbitrum",
    "Privacy",
    "Trustless",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
