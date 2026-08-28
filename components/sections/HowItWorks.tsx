import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { howItWorks } from "@/lib/content";

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-16">
        <SectionHeading eyebrow={howItWorks.eyebrow} title={howItWorks.title} divider />

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative grid grid-cols-4 gap-6">
            <div
              className="absolute top-7 right-[12.5%] left-[12.5%] h-px bg-border"
              aria-hidden="true"
            />
            {howItWorks.steps.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 100}
                className="relative flex flex-col items-center gap-5 text-center"
              >
                <span className="relative z-10 flex size-14 items-center justify-center rounded-full bg-white text-lg font-bold text-primary-ink ring-4 ring-primary/10 outline-2 outline-primary/20">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-2">
                  <span className="font-ui text-xs font-semibold tracking-[0.14em] text-primary-ink uppercase">
                    {step.delay}
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed text-slate">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="flex flex-col md:hidden">
          {howItWorks.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 100} className="relative flex gap-5 pb-10 last:pb-0">
              {i < howItWorks.steps.length - 1 && (
                <span
                  className="absolute top-12 left-6 h-[calc(100%-2.5rem)] w-px bg-border"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-base font-bold text-primary-ink ring-4 ring-primary/10 outline-2 outline-primary/20">
                {i + 1}
              </span>
              <div className="flex flex-col gap-1.5 pt-1">
                <span className="font-ui text-xs font-semibold tracking-[0.14em] text-primary-ink uppercase">
                  {step.delay}
                </span>
                <h3 className="font-display text-lg font-bold text-ink">{step.title}</h3>
                <p className="text-[15px] leading-relaxed text-slate">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
