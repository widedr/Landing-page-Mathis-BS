"use client";

import { useState } from "react";
import { ArrowRight, CircleCheckBig, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { RadarChart } from "@/components/ui/RadarChart";
import { cn } from "@/lib/utils";
import { problem } from "@/lib/content";

// Niveaux de maturité illustratifs (0–1) — pas une mesure réelle (cf. radarCaption)
const BEFORE_LEVEL = [0.25, 0.2, 0.15, 0.2, 0.2];
const AFTER_LEVEL = [0.95, 0.9, 1, 0.9, 0.95];

type Side = "before" | "after";

export function Problem() {
  const [active, setActive] = useState<number | null>(null);
  const [side, setSide] = useState<Side>("after");

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

        <Reveal delay={100} className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2 font-ui text-sm text-slate">
            De la donnée éparpillée
            <ArrowRight className="size-4 text-primary-ink" aria-hidden="true" />
            <span className="font-medium text-ink">à une fiscalité pilotée</span>
          </span>

          {/* Bascule Avant / Avec — points gris & orange */}
          <div
            role="group"
            aria-label="Basculer entre avant et avec Mathis"
            className="ml-auto flex items-center border border-border bg-white p-1"
          >
            <button
              type="button"
              onClick={() => setSide("before")}
              aria-pressed={side === "before"}
              className={cn(
                "flex items-center gap-2 px-4 py-2 font-ui text-sm font-medium transition-colors",
                side === "before" ? "bg-slate/10 text-ink" : "text-slate hover:text-ink",
              )}
            >
              <span className="size-2.5 rounded-full border border-dashed border-slate" aria-hidden="true" />
              Avant Mathis
            </button>
            <button
              type="button"
              onClick={() => setSide("after")}
              aria-pressed={side === "after"}
              className={cn(
                "flex items-center gap-2 px-4 py-2 font-ui text-sm font-medium transition-colors",
                side === "after" ? "bg-primary/10 text-primary-ink" : "text-slate hover:text-ink",
              )}
            >
              <span className="size-2.5 rounded-full bg-primary" aria-hidden="true" />
              Avec Mathis
            </button>
          </div>
        </Reveal>

        <Reveal
          delay={150}
          className="grid items-center gap-8 lg:grid-cols-[1fr_360px_1fr] lg:gap-6"
        >
          {/* Avant Mathis — à gauche */}
          <ComparisonColumn
            heading={problem.columns.before}
            tone="before"
            active={side === "before"}
            rows={problem.rows.map((r) => r.before)}
            activeIndex={active}
            onActiveChange={setActive}
          />

          {/* Schéma au milieu */}
          <div className="order-first flex flex-col items-center gap-4 lg:order-none">
            <RadarChart
              axes={axes}
              activeIndex={active}
              onActiveChange={setActive}
              emphasis={side}
            />
            <p className="max-w-[300px] text-center font-ui text-xs text-slate">
              {problem.radarCaption}
            </p>
          </div>

          {/* Avec Mathis — à droite */}
          <ComparisonColumn
            heading={problem.columns.after}
            tone="after"
            active={side === "after"}
            rows={problem.rows.map((r) => r.after)}
            activeIndex={active}
            onActiveChange={setActive}
          />
        </Reveal>
      </Container>
    </section>
  );
}

function ComparisonColumn({
  heading,
  tone,
  active,
  rows,
  activeIndex,
  onActiveChange,
}: {
  heading: string;
  tone: "before" | "after";
  active: boolean;
  rows: string[];
  activeIndex: number | null;
  onActiveChange: (i: number | null) => void;
}) {
  const isAfter = tone === "after";
  return (
    <div
      className={cn(
        "flex flex-col border border-border bg-white transition-opacity duration-300",
        !active && "opacity-60",
        isAfter && "bg-primary/[0.03]",
      )}
    >
      <div className={cn("border-b border-border px-6 py-4", isAfter && "bg-primary/[0.06]")}>
        <span
          className={cn(
            "font-display text-lg font-bold",
            isAfter ? "text-primary-ink" : "text-slate",
          )}
        >
          {heading}
        </span>
      </div>
      <ul>
        {rows.map((text, i) => (
          <li key={text}>
            <button
              type="button"
              onMouseEnter={() => onActiveChange(i)}
              onMouseLeave={() => onActiveChange(null)}
              onClick={() => onActiveChange(activeIndex === i ? null : i)}
              className={cn(
                "flex w-full items-start gap-3 border-t border-border px-6 py-4 text-left transition-colors first:border-t-0",
                activeIndex === i && (isAfter ? "bg-primary/[0.06]" : "bg-slate/5"),
              )}
            >
              {isAfter ? (
                <CircleCheckBig className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
              ) : (
                <X className="mt-0.5 size-5 shrink-0 text-slate/60" aria-hidden="true" />
              )}
              <span
                className={cn(
                  "text-[15px] leading-snug",
                  isAfter ? "font-medium text-ink" : "text-slate",
                )}
              >
                {text}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
