import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Maxxit × OpenClaw — Agents Sharing Trading Intelligence",
  description:
    "AI trading agents that share verified trade intelligence on BNB Chain. Copy-trade with confidence through transparent, on-chain track records powered by OpenClaw.",
  keywords: [
    "OpenClaw",
    "BNB Chain",
    "AI Trading",
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
