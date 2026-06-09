"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/utils";

const THEMES = [
  { href: "/", label: "Original" },
  { href: "/template-one", label: "Sunrise" },
  { href: "/template-two", label: "Oceanic" },
] as const;

/**
 * Small fixed widget to hop between the three theme routes. It lives inside
 * the themed <main>, so it picks up each theme's --pom-* tokens and restyles
 * itself per page. Removing it is a one-line delete in LandingPage.
 */
export function ThemeSwitcher() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Theme switcher"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full border-2 border-[var(--pom-wine)] bg-[var(--pom-cream)] p-1 shadow-[0_4px_0_-1px_var(--pom-wine)]"
    >
      {THEMES.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
              active
                ? "bg-[var(--pom-yellow)] text-[var(--pom-wine)]"
                : "text-[var(--pom-wine)] opacity-60 hover:opacity-100 hover:bg-[var(--pom-white)]"
            )}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
