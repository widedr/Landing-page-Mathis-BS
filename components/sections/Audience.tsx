import { Building2, Calculator, ChartNoAxesCombined, UserRoundCog } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { audience } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  "user-round-cog": UserRoundCog,
  chart: ChartNoAxesCombined,
  calculator: Calculator,
  building: Building2,
};

export function Audience() {
  return (
    <section id="pour-qui" className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="pointer-events-none absolute top-5 right-0 size-[464px] rounded-full bg-secondary/[0.08] blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-24">
        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
          {audience.personas.map((persona, i) => {
            const Icon = icons[persona.icon];
            return (
              <Reveal
                key={persona.title}
                delay={i * 80}
                hoverLift
                className="group flex cursor-default flex-col gap-4 border border-secondary/30 p-7 transition-colors duration-300 hover:bg-secondary-very-light/40"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-secondary-very-light text-secondary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink">{persona.title}</h3>
                <p className="text-[15px] leading-relaxed text-slate">{persona.description}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200} className="flex flex-1 flex-col items-start gap-5">
          <Eyebrow align="left">{audience.eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl leading-[1.15] font-extrabold text-ink sm:text-4xl lg:text-[2.75rem]">
            {audience.title}
          </h2>
          <p className="text-lg leading-relaxed text-slate">{audience.intro}</p>
          <p className="font-ui text-[15px] text-slate">{audience.fallback}</p>
          <Button href="#top" variant="secondary" arrow>
            {audience.fallbackCta}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
