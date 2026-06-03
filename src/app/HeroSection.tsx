import Link from "next/link";
import { PomegranateMark, ArrowRightIcon } from "@/app/icons";
import { PhoneFrame } from "@/app/PhoneFrame";
import { Reveal } from "@/app/Reveal";
import { QueueMockup, ChatMockup, RenewalMockup } from "@/app/HeroMockups";

export function HeroSection() {
  return (
    <section className="relative mt-0 md:mt-4 mx-2 md:mx-6 pt-[84px] md:pt-[92px]">
      {/* Stacked deck — three aligned strips (pink dominant, then red, then
          deep-red) peeking above the cream card, header overlapping the pink
          band. Same width + vertical-only offset keeps them cleanly stacked. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto max-w-[1510px]"
      >
        <div className="absolute inset-x-0 top-0 h-44 rounded-t-[2rem] bg-[var(--pom-pink-deep)]" />
        <div className="absolute inset-x-0 top-[60px] md:top-[68px] h-44 rounded-t-[2rem] bg-[var(--pom-red)]" />
        <div className="absolute inset-x-0 top-[72px] md:top-[80px] h-44 rounded-t-[2rem] bg-[var(--pom-red-deep)]" />
      </div>

      <div className="pom-card pom-hero-bg relative z-10 overflow-hidden">
        <div className="pt-[112px] md:pt-[132px] lg:pt-[152px] pb-0">
          <div className="pom-container text-center relative z-30">
          <div className="flex justify-center text-[var(--pom-red)] pom-pulse-in">
            <PomegranateMark width={56} height={63} />
          </div>

          <Reveal delay={120} from="up" amount={16} className="mt-5">
            <span className="pom-tag pom-tag--dark">WhatsApp CRM for India&apos;s insurance agents</span>
          </Reveal>

          <Reveal delay={220} from="up" amount={28}>
            <h1 className="pom-display-xl mt-6 max-w-[1080px] mx-auto text-balance">
              Never miss a
              <br className="hidden sm:inline" /> renewal again.
            </h1>
          </Reveal>

          <Reveal delay={380} from="up" amount={20}>
            <p className="pom-lead mt-6 max-w-[890px] mx-auto text-balance">
              Send today&apos;s greetings, set tomorrow&apos;s reminders, catch
              every reply — from one screen. Built for India&apos;s insurance
              agents.
            </p>
          </Reveal>

          <Reveal delay={500} from="up" amount={18}>
            <div className="mt-9 flex flex-col items-center gap-4">
              <Link href="#start" className="pom-pill pom-pill--dark h-14 px-8 text-sm">
                START FREE FOR 30 DAYS
                <ArrowRightIcon className="pom-cta-arrow w-4 h-4" />
              </Link>
              <p className="text-sm md:text-base text-[var(--pom-wine)]/70">
                No card. Cancel any time. ₹1 sends one message.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Phone trio */}
        <Reveal delay={520} duration={900} from="up" amount={60}>
          {/* Phone trio sits at the bottom of the hero card and is clipped by it,
              matching the original banner. Negative bottom margin pulls the card
              edge up over the phones so their lower third is cut off. */}
          <div className="relative z-0 mt-12 md:mt-16 flex justify-center items-end gap-0 pom-container -mb-10 sm:-mb-14 md:-mb-20 lg:-mb-24">
            <div className="hidden md:block w-[27%] -mr-[5%] translate-y-20 rotate-[-6deg] z-0">
              <div className="pom-float pom-float--delay-1">
                <PhoneFrame alt="AgentBandhu WhatsApp birthday greeting thread">
                  <ChatMockup />
                </PhoneFrame>
              </div>
            </div>
            <div className="w-[62%] sm:w-[46%] md:w-[32%] translate-y-12 md:translate-y-16 z-20">
              <div className="pom-float">
                <PhoneFrame alt="AgentBandhu morning queue dashboard">
                  <QueueMockup />
                </PhoneFrame>
              </div>
            </div>
            <div className="hidden md:block w-[27%] -ml-[5%] translate-y-20 rotate-[6deg] z-0">
              <div className="pom-float pom-float--delay-2">
                <PhoneFrame alt="AgentBandhu renewal cascade card">
                  <RenewalMockup />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
