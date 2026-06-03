import { RiveCanvas } from "@/app/RiveCanvas";
import { Reveal } from "@/app/Reveal";

export function MultipleLayersBlock() {
  return (
    <section className="pom-card pom-hero-bg mx-2 md:mx-6 my-10 md:my-16 relative">
      <div aria-hidden className="absolute -top-6 left-0 right-0 h-12 rounded-t-[2rem] bg-[var(--pom-red)] -z-10" />
      <div aria-hidden className="absolute -top-3 left-0 right-0 h-8 rounded-t-[2rem] bg-[var(--pom-red-deep)] -z-10" />

      <div className="pt-12 md:pt-20 pb-8 md:pb-12 ">
        <div className="pom-container text-center">
          <Reveal from="up" amount={14}>
            <span className="pom-tag pom-tag--soft">Your morning queue</span>
          </Reveal>
          <Reveal delay={120} from="up" amount={28}>
            <h1 className="pom-display-xl mt-6 max-w-[1120px] mx-auto text-balance">
              This is what 9am looks like.
            </h1>
          </Reveal>
          <Reveal delay={260} from="up" amount={18}>
            <p className="pom-lead mt-6 max-w-[920px] mx-auto text-pretty">
              Subah ki shubhkamna. One screen, one verb. The queue is already in
              the order you should send it — birthdays, renewals, anniversaries,
              ranked by urgency.
            </p>
          </Reveal>
        </div>

        <Reveal delay={420} duration={900} from="scale" amount={6}>
          <div
            className="mt-8 md:mt-12 w-full"
            style={{ aspectRatio: "1440/600", maxHeight: 640 }}
          >
            <RiveCanvas src="/rive/feature-4.riv" ariaLabel="Dashboard of health metrics" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
