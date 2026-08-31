"use client";

import { useState } from "react";
import { ArrowRight, CircleCheckBig, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { RadarChart } from "@/components/ui/RadarChart";
import { cn } from "@/lib/utils";
import { problem } from "@/lib/content";

// Illustrative maturity levels (0–1), not a real measurement — see radarCaption.
const BEFORE_LEVEL = [0.25, 0.2, 0.15, 0.2, 0.2];
const AFTER_LEVEL = [0.95, 0.9, 1, 0.9, 0.95];

export function Problem() {
  const [active, setActive] = useState<number | null>(null);

  const axes = problem.rows.map((row, i) => ({
    label: row.axis,
    before: BEFORE_LEVEL[i],
    after: AFTER_LEVEL[i],
  }));

  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          align="left"
          eyebrow={problem.eyebrow}
          title={
            <>
              Votre <span className="text-primary">fiscalité locale</span> ne devrait pas
              tenir dans 15 fichiers Excel.
            </>
          }
          description={problem.intro}
          divider
        />

        <Reveal
          delay={100}
          className="flex items-center gap-2 font-ui text-sm text-slate"
        >
          <span>De la donnée éparpillée</span>
          <ArrowRight className="size-4 text-primary-ink" aria-hidden="true" />
          <span className="font-medium text-ink">à une fiscalité pilotée</span>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[380px_1fr] lg:items-center">
          <Reveal
            delay={150}
            className="flex flex-col items-center gap-3 rounded-none border border-border bg-surface/50 p-8"
          >
            <RadarChart axes={axes} activeIndex={active} onActiveChange={setActive} />
            <p className="max-w-[280px] text-center font-ui text-xs text-slate">
              {problem.radarCaption}
            </p>
          </Reveal>

          <Reveal
            delay={200}
            className="overflow-hidden rounded-none border border-border shadow-[0_1px_2px_rgba(27,27,35,0.04)]"
          >
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

            {problem.rows.map((row, i) => {
              const isActive = active === i;
              return (
                <button
                  key={row.before}
                  type="button"
                  onClick={() => setActive(isActive ? null : i)}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className={cn(
                    "grid w-full grid-cols-1 border-t border-border text-left transition-colors md:grid-cols-2",
                    isActive && "bg-primary/[0.04]",
                  )}
                >
                  <div className="flex items-start gap-3 border-b border-border bg-white px-6 py-5 md:border-r md:border-b-0 md:px-8">
                    <X className="mt-0.5 size-5 shrink-0 text-slate/60 md:hidden" aria-hidden="true" />
                    <span className="text-[15px] leading-snug text-slate">{row.before}</span>
                  </div>
                  <div
                    className={cn(
                      "flex items-start gap-3 px-6 py-5 transition-colors md:px-8",
                      isActive ? "bg-primary/[0.07]" : "bg-primary/[0.03]",
                    )}
                  >
                    <CircleCheckBig
                      className="mt-0.5 size-5 shrink-0 text-primary md:hidden"
                      aria-hidden="true"
                    />
                    <span className="text-[15px] leading-snug font-medium text-ink">
                      {row.after}
                    </span>
                  </div>
                </button>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
