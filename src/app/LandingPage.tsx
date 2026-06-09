import { FloatingHeader } from "@/app/FloatingHeader";
import { HeroSection } from "@/app/HeroSection";
import { BlockFeature } from "@/app/BlockFeature";
import { MultipleLayersBlock } from "@/app/MultipleLayersBlock";
import { FooterCTA } from "@/app/FooterCTA";
import { ThemeSwitcher } from "@/app/ThemeSwitcher";
import { cn } from "@/app/utils";
import {
  BirthdayArt,
  LapsedArt,
  UnreadInboxArt,
  InboxThreadArt,
  CascadeArt,
} from "@/app/FeatureArt";

/**
 * The shared landing page. Every route (`/`, `/template-one`, `/template-two`)
 * renders this exact tree — only `themeClass` differs, which swaps the
 * `--pom-*` design tokens for the whole subtree via a scoped class in
 * globals.css. No `themeClass` → the original Pomegranate `:root` tokens.
 */
export function LandingPage({ themeClass }: { themeClass?: string }) {
  return (
    <main
      className={cn(
        "template-home relative min-h-screen bg-[var(--pom-bg)] overflow-x-hidden",
        themeClass
      )}
    >
      <FloatingHeader />

      <article className="pb-12">
        <HeroSection />

        <BlockFeature
          layout="text-media"
          tag="What slips through"
          heading="The birthday you forgot."
          paragraph="A wish at 9 AM is the cheapest piece of trust you will ever buy. Forget it, and you become every other agent. AgentBandhu sends it automatically, every time."
          media={<BirthdayArt />}
        />

        <BlockFeature
          layout="media-text"
          tag="What slips through"
          heading="The renewal that lapsed."
          paragraph="It is rarely the customer who chose to leave. It is the reminder that never arrived on day 30, then day 15, then day 7. The cascade makes sure it always does."
          media={<LapsedArt />}
        />

        <BlockFeature
          layout="text-media"
          tag="What slips through"
          heading="The reply still sitting unread."
          paragraph="Three customers wrote in last night — one about a claim, one about a top-up, one asking when you'd be free. Every reply lands in one inbox, not a personal chat thread."
          media={<UnreadInboxArt />}
        />

        <MultipleLayersBlock />

        <BlockFeature
          layout="text-media"
          tag="How it works"
          heading="One inbox. Every customer reply."
          paragraph="Every WhatsApp message from every customer lands in one queue. Reply from your laptop or your phone. Nothing gets lost in a personal thread anymore."
          media={<InboxThreadArt />}
        />

        <BlockFeature
          layout="media-text"
          tag="How it works"
          heading="The renewal cascade: 30, 15, 7, 3, 1."
          paragraph="Five touches, five chances to be remembered. The cascade stops the moment they pay, and the policy flips to green on your board."
          media={<CascadeArt />}
        />
      </article>

      <FooterCTA />

      <ThemeSwitcher />
    </main>
  );
}
