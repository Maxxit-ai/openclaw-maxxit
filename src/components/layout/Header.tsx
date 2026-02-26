"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xl font-bold text-text-primary tracking-tighter group-hover:text-(--color-maxxit-green) transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    MAXXIT
                  </span>
                  <div className="h-4 w-px bg-border group-hover:bg-(--color-maxxit-green)/30 transition-colors" />
                  <span className="text-[10px] font-mono font-bold text-(--color-maxxit-green) tracking-widest uppercase opacity-80">
                    OpenClaw
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-6 md:gap-10">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-muted">
              <Link href="/#network" className="hover:text-(--color-maxxit-green) transition-colors relative group">
                [ Network ]
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-(--color-maxxit-green) transition-all group-hover:w-full" />
              </Link>
              <Link href="/#hivemind" className="hover:text-(--color-maxxit-green) transition-colors relative group">
                [ Hive Mind ]
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-(--color-maxxit-green) transition-all group-hover:w-full" />
              </Link>
              <Link href="/marketplace" className={`transition-colors relative group ${pathname === '/marketplace' ? 'text-(--color-maxxit-green)' : 'hover:text-(--color-maxxit-green)'}`}>
                [ Marketplace ]
                <span className={`absolute -bottom-1 left-0 h-px bg-(--color-maxxit-green) transition-all group-hover:w-full ${pathname === '/marketplace' ? 'w-full' : 'w-0'}`} />
              </Link>
            </div>

            {/* Desktop CTA Button */}
            <a
              href="https://www.maxxit.ai/openclaw"
              className="hidden md:flex px-5 py-2 rounded-sm border border-(--color-maxxit-green) text-(--color-maxxit-green) hover:bg-(--color-maxxit-green) hover:text-background transition-all items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,136,0.1)] active:scale-95 text-[10px] font-mono font-bold"
            >
              INITIALIZE AGENT
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5 focus:outline-none relative z-50 text-text-primary"
              aria-label="Toggle menu"
            >
              <div className={`w-5 h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
              <div className={`w-5 h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <div className={`w-5 h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full overflow-hidden transition-all duration-300 ease-in-out border-border bg-background/95 backdrop-blur-xl ${isMobileMenuOpen ? "max-h-[400px] border-b opacity-100" : "max-h-0 opacity-0 border-transparent"
          }`}
      >
        <div className="flex flex-col p-6 gap-6">
          <Link
            href="/#network"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-text-muted hover:text-(--color-maxxit-green) transition-colors"
          >
            [ Network ]
          </Link>
          <Link
            href="/#hivemind"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-text-muted hover:text-(--color-maxxit-green) transition-colors"
          >
            [ Hive Mind ]
          </Link>
          <Link
            href="/marketplace"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-xs font-mono font-bold uppercase tracking-[0.2em] transition-colors ${pathname === '/marketplace' ? 'text-(--color-maxxit-green)' : 'text-text-muted hover:text-(--color-maxxit-green)'}`}
          >
            [ Marketplace ]
          </Link>

          <div className="h-px bg-border my-2 w-full opacity-50" />

          <a
            href="https://www.maxxit.ai/openclaw"
            className="flex justify-center w-full px-5 py-4 rounded-sm border border-(--color-maxxit-green) text-(--color-maxxit-green) bg-(--color-maxxit-green)/5 hover:bg-(--color-maxxit-green) hover:text-background transition-all items-center gap-2 shadow-[0_0_15px_rgba(0,255,136,0.1)] active:scale-95 text-[10px] font-mono font-bold"
          >
            INITIALIZE AGENT
          </a>
        </div>
      </div>
    </div>
  );
}
