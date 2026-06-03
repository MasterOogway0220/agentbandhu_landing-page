"use client";

import { useEffect, useRef, useState } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { cn } from "@/app/utils";

type RiveCanvasProps = {
  src: string;
  className?: string;
  ariaLabel?: string;
};

/**
 * Renders a Rive (.riv) file with its continuous looping animations playing.
 *
 * pomegranate.health's Rive files each contain one state machine with 0
 * inputs (so a state machine playback alone sits in its static initial state)
 * plus a set of timeline animations such as `active`, `floatA`, `floatB`,
 * `floating`, `idleA`, `heart`, etc. We play those directly, skipping
 * `hover*` and `hidden` which are reserved for interactive triggers.
 *
 * IntersectionObserver pauses playback while the section is off-screen.
 */
export function RiveCanvas({ src, className, ariaLabel }: RiveCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tokens, setTokens] = useState<string[]>([]);

  const { rive, RiveComponent } = useRive({
    src,
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });

  // Once loaded, select looping animations and start them
  useEffect(() => {
    if (!rive) return;
    const animations: string[] = rive.animationNames ?? [];
    const sm: string[] = rive.stateMachineNames ?? [];
    const loopable = animations.filter(
      (n) => !/hover/i.test(n) && n.toLowerCase() !== "hidden"
    );
    const chosen = loopable.length > 0 ? loopable : sm;
    if (chosen.length > 0) {
      setTokens(chosen);
      try {
        rive.play(chosen);
      } catch {
        /* noop */
      }
    }
  }, [rive]);

  // Pause when offscreen to save CPU
  useEffect(() => {
    if (!rive || !wrapperRef.current || tokens.length === 0) return;
    const el = wrapperRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          try {
            if (e.isIntersecting) rive.play(tokens);
            else rive.pause(tokens);
          } catch {
            /* noop */
          }
        }
      },
      { rootMargin: "-5% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rive, tokens]);

  return (
    <div
      ref={wrapperRef}
      className={cn("w-full h-full", className)}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      <RiveComponent style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
