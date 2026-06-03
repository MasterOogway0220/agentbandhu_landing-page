"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/app/utils";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  from?: Direction;
  amount?: number; // px or scale delta
  className?: string;
  as?: ElementType;
  once?: boolean;
  threshold?: string; // rootMargin
};

const transformFor = (from: Direction, amount: number) => {
  switch (from) {
    case "up": return `translateY(${amount}px)`;
    case "down": return `translateY(-${amount}px)`;
    case "left": return `translateX(${amount}px)`;
    case "right": return `translateX(-${amount}px)`;
    case "scale": return `scale(${1 - amount / 100})`;
    case "none": return "none";
  }
};

export function Reveal({
  children,
  delay = 0,
  duration = 700,
  from = "up",
  amount = 24,
  className,
  as: Tag = "div",
  once = true,
  threshold = "-8% 0px",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { rootMargin: threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, threshold]);

  return (
    <Tag
      ref={ref}
      className={cn("will-change-[transform,opacity]", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0) scale(1)" : transformFor(from, amount),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
