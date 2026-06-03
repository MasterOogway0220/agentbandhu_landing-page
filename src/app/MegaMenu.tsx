"use client";

import { useEffect, useRef } from "react";
import type { ComponentType, SVGProps } from "react";
import {
  ActionSparkIcon,
  ActionUserIcon,
  ActionTeamIcon,
  ActionHealthIcon,
  ActionMoneyIcon,
  ActionInfoIcon,
  CloseIcon,
} from "@/app/icons";

type MenuItem = {
  text: string;
  desc: string;
  path: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Large double-height tile on desktop (first + last item). */
  large?: boolean;
  /** Reordered after the large tiles in the desktop grid (items 4 & 5). */
  reorder?: boolean;
};

// AgentBandhu landing-page navigation (visual-only mega-menu)
const MENU_ITEMS: MenuItem[] = [
  {
    text: "How it works",
    desc: "One inbox, automations, the renewal cascade",
    path: "#how-it-works",
    Icon: ActionSparkIcon,
    large: true,
  },
  {
    text: "Two-way inbox",
    desc: "Every customer reply in one place",
    path: "#inbox",
    Icon: ActionUserIcon,
  },
  {
    text: "Automations",
    desc: "Greetings and reminders that run themselves",
    path: "#automations",
    Icon: ActionTeamIcon,
  },
  {
    text: "Renewal cascade",
    desc: "30 · 15 · 7 · 3 · 1 — five chances to be remembered",
    path: "#cascade",
    Icon: ActionHealthIcon,
    reorder: true,
  },
  {
    text: "Pricing",
    desc: "From ₹1,999 a month",
    path: "#pricing",
    Icon: ActionMoneyIcon,
    reorder: true,
  },
  {
    text: "Why AgentBandhu",
    desc: "Bharosa banta hai.",
    path: "#why",
    Icon: ActionInfoIcon,
    large: true,
  },
];

type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
  /** id used by the toggle button's aria-controls */
  id?: string;
};

export function MegaMenu({ open, onClose, id = "learn-more-menu" }: MegaMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Escape to close + lock body scroll while open; move focus into the panel.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <div
      id={id}
      className="pom-menu"
      data-open={open}
      role="dialog"
      aria-modal="true"
      aria-label="Learn more"
      aria-hidden={!open}
    >
      {/* Top bar: wordmark + close, mirroring the floating header */}
      <div className="mx-auto max-w-[1316px] px-4 md:px-8 lg:px-[62px] pt-6 md:pt-10">
        <div className="flex items-center justify-between">
          <span className="pom-wordmark-3d pom-wordmark-3d--sm text-[clamp(1.75rem,3.4vw,2.75rem)] select-none">
            agentbandhu
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="pom-pill pom-pill--white h-12 w-12 md:h-14 md:w-14 !px-0"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable tile grid */}
      <div className="pom-menu-scroll mx-auto max-w-[1316px] px-4 md:px-8 lg:px-[62px] pb-16 pt-6 md:pt-10">
        <ul className="pom-menu-grid">
          {MENU_ITEMS.map((item) => (
            <li
              key={item.text}
              className={[
                item.large ? "lg:row-span-2" : "",
                item.reorder ? "lg:order-1" : "",
              ].join(" ")}
            >
              {/* Visual-only: clicking a tile simply closes the menu */}
              <button
                type="button"
                onClick={onClose}
                aria-label={`${item.text} — ${item.desc}`}
                className={[
                  "pom-menu-tile",
                  item.large ? "pom-menu-tile--large" : "",
                ].join(" ")}
              >
                <span className="pom-menu-tile__icon" aria-hidden="true">
                  <item.Icon className={item.large ? "w-8 h-8" : "w-6 h-6"} />
                </span>
                <span className="pom-menu-tile__body">
                  <span className="pom-menu-tile__title">{item.text}</span>
                  <span className="pom-menu-tile__desc">{item.desc}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
