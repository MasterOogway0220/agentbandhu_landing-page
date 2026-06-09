import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/app/utils";

type PhoneFrameProps =
  | {
      video: string;
      poster?: string;
      className?: string;
      alt?: string;
    }
  | {
      img: string;
      className?: string;
      alt?: string;
    }
  | {
      children: ReactNode;
      className?: string;
      alt?: string;
    };

/**
 * Renders an iPhone-shaped frame with rounded corners and a dark wine border.
 * Aspect ratio matches the original phone-mask SVG (~850x1290 → 0.659).
 * Accepts a video, an image, or arbitrary `children` (an HTML/CSS mockup screen).
 */
export function PhoneFrame(props: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative aspect-[850/1290] w-full overflow-hidden rounded-[14%/9%] bg-[var(--pom-wine)] shadow-[0_24px_60px_-20px_color-mix(in_srgb,var(--pom-wine)_45%,transparent)]",
        "border-[6px] border-[var(--pom-wine)]",
        "ring-[3px] ring-[var(--pom-wine)]/30",
        "className" in props && props.className
      )}
    >
      <div className="absolute inset-0 rounded-[10%/7%] overflow-hidden">
        {"video" in props ? (
          <video
            src={props.video}
            poster={props.poster}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            aria-label={props.alt}
          />
        ) : "img" in props ? (
          <Image
            src={props.img}
            alt={props.alt ?? ""}
            fill
            sizes="(max-width: 768px) 60vw, 30vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="pom-screen-host" role="img" aria-label={props.alt}>
            {props.children}
          </div>
        )}
      </div>

      {/* Notch */}
      <div className="absolute top-[1.5%] left-1/2 -translate-x-1/2 h-[3%] w-[34%] rounded-full bg-[var(--pom-wine)] z-10" />
    </div>
  );
}
