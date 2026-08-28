import { Layers, Sparkles, ChartNoAxesCombined, LayoutDashboard, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
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
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={solution.eyebrow} title={solution.title} divider />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {solution.pillars.map((pillar, i) => {
            const Icon = icons[pillar.icon];
            return (
              <Reveal
                key={pillar.number}
                delay={i * 80}
                className="flex flex-col gap-5 rounded-3xl border border-border bg-white p-7"
              >
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary-ink">
                  <Icon className="size-6" strokeWidth={2} aria-hidden="true" />
                </div>
                <span className="font-ui text-sm font-semibold text-primary-ink">
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

        <Reveal delay={320} className="flex flex-col items-center gap-6 text-center">
          <p className="max-w-2xl text-base leading-relaxed text-slate">{solution.credibility}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {solution.badges.map((label) => (
              <Badge key={label} icon={ShieldCheck}>
                {label}
              </Badge>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
