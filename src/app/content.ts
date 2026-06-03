export type BlockFeatureLayout = "text-media" | "media-text";

export interface BlockFeatureContent {
  layout: BlockFeatureLayout;
  tag: string;
  heading: string;
  paragraph: string;
  riveSrc: string;
  riveStateMachine?: string;
}

export interface HeroContent {
  iconAlt: string;
  tag: string;
  heading: string;
  paragraph: string;
}

export interface FooterContent {
  heading: string;
  paragraph: string;
  cta: { label: string; href: string };
  links: { label: string; href: string }[];
}
