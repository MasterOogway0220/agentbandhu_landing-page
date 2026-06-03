'use client';

import { useEffect, useState, type RefObject } from 'react';

type Options = {
  threshold?: number;
  rootMargin?: string;
  /** Defaults to true: once visible, stay true so reveals don't re-trigger. */
  once?: boolean;
};

/**
 * Returns whether the referenced element is intersecting the viewport.
 * Reduced-motion clients get `true` immediately so content is never hidden.
 */
export function useInView<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: Options = {},
): boolean {
  const { threshold = 0.15, rootMargin = '0px', once = true } = options;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, once]);

  return inView;
}
