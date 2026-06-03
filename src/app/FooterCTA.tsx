import Link from "next/link";
import { PhoneFrame } from "@/app/PhoneFrame";
import { Reveal } from "@/app/Reveal";

export function FooterCTA() {
  return (
    <footer
      id="start"
      className="relative overflow-hidden bg-[var(--pom-red)] text-[var(--pom-wine)]"
    >
      <div className="pom-container pt-24 md:pt-32 pb-12 text-center">
        <Reveal from="up" amount={28} duration={900}>
          <span className="pom-wordmark-3d inline-block text-[clamp(2.5rem,8vw,7rem)] select-none">
            agentbandhu
          </span>
        </Reveal>

        <Reveal delay={180} from="up" amount={22}>
          <h2 className="pom-display-lg mt-10 md:mt-14 text-[var(--pom-cream)]">
            Try it for thirty days.
          </h2>
        </Reveal>
        <Reveal delay={320} from="up" amount={16}>
          <p className="pom-lead mt-5 max-w-[640px] mx-auto text-[var(--pom-wine)]">
            See if you&apos;d ever go back. Start free — no card, no setup fee
            for the trial, cancel any time.
          </p>
        </Reveal>

        <Reveal delay={460} from="up" amount={20}>
          <div className="mt-10">
            <Link
              href="#start"
              className="pom-pill pom-pill--yellow h-14 px-8 text-sm"
            >
              START FREE FOR 30 DAYS
            </Link>
          </div>
        </Reveal>

        {/* Phone trio with floating motion */}
        <Reveal delay={620} from="up" amount={60} duration={1000}>
          <div className="relative mt-16 md:mt-20 flex justify-center items-end gap-4 md:gap-6 -mb-24 md:-mb-32">
            <div className="hidden sm:block w-[22%] translate-y-20 rotate-[-6deg] z-0">
              <div className="pom-float pom-float--delay-1">
                <PhoneFrame img="/images/phone-pink.webp" alt="" />
              </div>
            </div>
            <div className="w-[60%] sm:w-[28%] z-20">
              <div className="pom-float">
                <PhoneFrame video="/videos/phone-1.mp4" alt="" />
              </div>
            </div>
            <div className="hidden sm:block w-[22%] translate-y-20 rotate-[6deg] z-0">
              <div className="pom-float pom-float--delay-2">
                <PhoneFrame img="/images/phone-3.webp" alt="" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-32 md:mt-44 bg-[var(--pom-wine)] text-[var(--pom-cream)]/85 text-[11px] md:text-xs">
        <div className="pom-container py-4 flex flex-col md:flex-row items-center justify-between gap-2 uppercase tracking-wider">
          <Link href="/privacy" className="hover:text-[var(--pom-cream)] transition-colors">
            Privacy Policy
          </Link>
          <span>© 2026 Kaizen Infotech Solutions Pvt. Ltd., Mumbai.</span>
          <Link href="/terms" className="hover:text-[var(--pom-cream)] transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
