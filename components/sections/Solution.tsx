import { Layers, Lightbulb, Sparkles, ChartNoAxesCombined, LayoutDashboard, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { solution } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  layers: Layers,
  sparkles: Sparkles,
  chart: ChartNoAxesCombined,
  dashboard: LayoutDashboard,
};

export function Solution() {
  return (
    <section id="solution" className="bg-surface/50 py-20 sm:py-28">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          align="left"
          eyebrow={solution.eyebrow}
          eyebrowIcon={Lightbulb}
          title={
            <>
              Une <span className="text-primary">méthode</span> en 4 temps pour reprendre
              la main sur votre <span className="text-primary">fiscalité</span>
            </>
          }
          divider
        />

        <Reveal delay={100} className="flex flex-col items-start gap-5">
          <p className="max-w-2xl text-base leading-relaxed text-slate">{solution.credibility}</p>
          <span className="inline-flex items-center gap-2 rounded-none border border-secondary-light bg-secondary-very-light px-4 py-2 font-ui text-sm font-medium text-secondary">
            <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
            {solution.badges[0]}
          </span>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {solution.pillars.map((pillar, i) => {
            const Icon = icons[pillar.icon];
            return (
              <Reveal
                key={pillar.number}
                delay={200 + i * 80}
                hoverLift
                className="group flex cursor-default flex-col gap-5 rounded-none border border-border bg-white p-7 transition-shadow duration-300 hover:shadow-[0_20px_40px_-24px_rgba(27,27,35,0.2)]"
              >
                <div className="flex size-14 items-center justify-center rounded-[30px] bg-secondary-very-light text-secondary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-6" strokeWidth={2} aria-hidden="true" />
                </div>
                <span className="font-ui text-sm font-semibold text-secondary">
                  {pillar.number}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-xl font-bold text-ink">{pillar.title}</h3>
                  <p className="text-[15px] leading-relaxed text-slate">{pillar.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
