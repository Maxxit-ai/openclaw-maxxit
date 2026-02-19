import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Maxxit × OpenClaw — Autonomous Trading Agent Hive Mind",
  description:
    "Autonomous OpenClaw agents that discover, verify, and mirror trades on-chain — no human in the loop. Bot-to-bot intelligence on BNB Chain.",
  keywords: [
    "OpenClaw",
    "BNB Chain",
    "AI Trading Agents",
    "Bot-to-Bot",
    "Copy Trading",
    "Perpetual Futures",
    "DeFi",
    "Aster DEX",
    "Ostium",
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
