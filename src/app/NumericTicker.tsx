'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/app/use-in-view';

type Props = {
  to: number;
  duration?: number;
  isCurrency?: boolean;
  className?: string;
  /** ARIA live region (defaults to "polite"). */
  ariaLive?: 'off' | 'polite' | 'assertive';
};

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

function formatRupeesOnly(value: number): string {
  return inrFormatter.format(Math.round(value));
}

function formatCount(value: number): string {
  return Math.round(value).toLocaleString('en-IN');
}

/**
 * Counts up from 0 to `to` over `duration` ms once it enters the viewport.
 * Reduced-motion: snaps to the final value immediately.
 */
export function NumericTicker({
  to,
  duration = 1400,
  isCurrency = false,
  className = '',
  ariaLive = 'polite',
}: Props) {
  const hostRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(hostRef, { threshold: 0.4, once: true });
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setValue(to);
      return;
    }

    let rafId = 0;
    const start = performance.now();
    const tick = (now: number): void => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // ease-out-quart: 1 - (1 - t)^4
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(to * eased);
      if (t < 1) rafId = requestAnimationFrame(tick);
      else setValue(to);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, to, duration]);

  const formatted = isCurrency ? formatRupeesOnly(value) : formatCount(value);

  return (
    <span ref={hostRef} className={`numeric ${className}`.trim()} aria-live={ariaLive}>
      {formatted}
    </span>
  );
}
