import { ArrowRight, CircleCheckBig, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { problem } from "@/lib/content";

export function Problem() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow={problem.eyebrow}
          title={problem.title}
          description={problem.intro}
        />

        <Reveal delay={100} className="overflow-hidden rounded-3xl border border-border shadow-[0_1px_2px_rgba(27,27,35,0.04)]">
          <div className="hidden grid-cols-2 md:grid">
            <div className="border-r border-border bg-surface px-8 py-5">
              <span className="font-display text-lg font-bold text-slate">
                {problem.columns.before}
              </span>
            </div>
            <div className="bg-primary/[0.06] px-8 py-5">
              <span className="font-display text-lg font-bold text-primary-ink">
                {problem.columns.after}
              </span>
            </div>
          </div>

          {problem.rows.map((row, i) => (
            <div
              key={row.before}
              className="grid grid-cols-1 border-t border-border md:grid-cols-2"
            >
              <div className="flex items-start gap-3 border-b border-border bg-white px-6 py-5 md:border-r md:border-b-0 md:px-8">
                <X className="mt-0.5 size-5 shrink-0 text-slate/60 md:hidden" aria-hidden="true" />
                <span className="text-[15px] leading-snug text-slate">{row.before}</span>
              </div>
              <div className="flex items-start gap-3 bg-primary/[0.03] px-6 py-5 md:px-8">
                <CircleCheckBig
                  className="mt-0.5 size-5 shrink-0 text-primary md:hidden"
                  aria-hidden="true"
                />
                <span className="text-[15px] leading-snug font-medium text-ink">{row.after}</span>
              </div>
              {i === 0 && (
                <span className="sr-only">Transformation Mathis, ligne {i + 1}</span>
              )}
            </div>
          ))}
        </Reveal>

        <Reveal delay={200} className="flex items-center justify-center gap-2 font-ui text-sm text-slate">
          <span>De la donnée éparpillée</span>
          <ArrowRight className="size-4 text-primary-ink" aria-hidden="true" />
          <span className="font-medium text-ink">à une fiscalité pilotée</span>
        </Reveal>
      </Container>
    </section>
  );
}
