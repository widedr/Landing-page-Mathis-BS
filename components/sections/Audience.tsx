import { Building2, ChartNoAxesCombined, CircleUserRound, Receipt } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { audience } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  user: CircleUserRound,
  chart: ChartNoAxesCombined,
  receipt: Receipt,
  building: Building2,
};

export function Audience() {
  return (
    <section id="pour-qui" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={audience.eyebrow} title={audience.title} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audience.personas.map((persona, i) => {
            const Icon = icons[persona.icon];
            return (
              <Reveal
                key={persona.title}
                delay={i * 80}
                hoverLift
                className="group flex cursor-default flex-col gap-4 rounded-3xl border border-border p-7 transition-colors duration-300 hover:border-primary/30 hover:bg-primary/[0.02] hover:shadow-[0_20px_40px_-24px_rgba(27,27,35,0.15)]"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-ink transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink">{persona.title}</h3>
                <p className="text-[15px] leading-relaxed text-slate">{persona.description}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={320} className="flex flex-col items-center gap-2 text-center">
          <p className="font-ui text-[15px] text-slate">{audience.fallback}</p>
          <Button href="#top" variant="ghost" arrow>
            {audience.fallbackCta}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
