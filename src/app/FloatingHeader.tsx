"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "@/app/icons";
import { MegaMenu } from "@/app/MegaMenu";

const MENU_ID = "learn-more-menu";

export function FloatingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 pt-6 md:pt-10 animate-in fade-in slide-in-from-top-4 duration-700 ease-out">
        <div className="mx-auto max-w-[1316px] px-4 md:px-8 lg:px-[62px]">
          <div className="relative flex items-center justify-between gap-3">
            {/* LEARN MORE — opens the mega-menu */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="pom-pill pom-pill--white h-12 md:h-14 px-4 md:px-6 text-xs md:text-sm"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
            >
              <MenuIcon className="w-4 h-3" />
              <span className="hidden sm:inline">LEARN MORE</span>
            </button>

            {/* Wordmark / logo — pinned to the true horizontal center, 3D pillow style */}
            <Link
              href="/"
              className="pom-wordmark-3d pom-wordmark-3d--sm absolute left-1/2 -translate-x-1/2 text-[clamp(1.75rem,3.4vw,2.75rem)] select-none transition-transform duration-200 hover:scale-[1.03]"
            >
              agentbandhu
            </Link>

            {/* START FREE */}
            <Link
              href="#start"
              className="pom-pill pom-pill--dark h-12 md:h-14 px-4 md:px-6 text-xs md:text-sm"
            >
              <span className="hidden sm:inline">START FREE</span>
              <span className="sm:hidden">START</span>
            </Link>
          </div>
        </div>
      </header>

      <MegaMenu id={MENU_ID} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
