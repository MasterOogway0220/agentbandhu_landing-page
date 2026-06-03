import type { ReactNode } from "react";
import { Reveal } from "@/app/Reveal";
import { cn } from "@/app/utils";

type BlockFeatureProps = {
  layout: "text-media" | "media-text";
  tag: string;
  heading: string;
  paragraph: string;
  /** The illustration panel rendered in the media slot (a CSS/SVG mockup). */
  media: ReactNode;
  mediaAspect?: string;
};

export function BlockFeature({
  layout,
  tag,
  heading,
  paragraph,
  media,
  mediaAspect = "594/458",
}: BlockFeatureProps) {
  const textFromDir = layout === "text-media" ? "right" : "left";
  const mediaFromDir = layout === "text-media" ? "left" : "right";

  return (
    <section
      className={cn(
        "pom-container",
        "pom-feature",
        layout === "media-text" && "pom-feature--media-text"
      )}
    >
      <Reveal from={textFromDir} amount={32} duration={800}>
        <div className="max-w-[594px] mx-auto md:mx-0">
          <Reveal delay={100} from="up" amount={14}>
            <span className="pom-tag pom-tag--soft">{tag}</span>
          </Reveal>
          <Reveal delay={200} from="up" amount={20}>
            <h2 className="pom-display-lg mt-5 text-balance">{heading}</h2>
          </Reveal>
          <Reveal delay={320} from="up" amount={16}>
            <p className="pom-lead mt-5 text-pretty">{paragraph}</p>
          </Reveal>
        </div>
      </Reveal>

      <Reveal from={mediaFromDir} amount={40} duration={900} delay={120}>
        <div className="w-full max-w-[600px] mx-auto md:mx-0" style={{ aspectRatio: mediaAspect }}>
          {media}
        </div>
      </Reveal>
    </section>
  );
}
