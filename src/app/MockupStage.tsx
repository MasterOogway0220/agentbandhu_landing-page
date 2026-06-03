'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/app/utils';
import { useInView } from '@/app/use-in-view';

/**
 * Wraps a feature-art mockup so its bespoke "scene" (defined as CSS keyframes
 * in globals.css under `.pom-fa.is-in …`) plays ONCE when it scrolls into view.
 *
 * Two-class handshake keeps it safe everywhere:
 *  • `is-armed` is added only after mount (client-side), so the no-JS / SSR
 *    markup is the fully-visible static mockup — nothing is ever hidden behind
 *    an animation that might not run.
 *  • `is-in` is added the first time the panel intersects the viewport, which
 *    is what actually triggers the keyframes.
 *
 * Reduced-motion is handled globally (globals.css collapses every animation to
 * ~0ms), so those users simply land on each scene's final frame.
 */
export function MockupStage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { threshold: 0.3, once: true });
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    setArmed(true);
  }, []);

  return (
    <div
      ref={ref}
      className={cn('pom-fa', armed && 'is-armed', inView && 'is-in', className)}
      aria-hidden
    >
      {children}
    </div>
  );
}
