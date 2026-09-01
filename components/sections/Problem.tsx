"use client";

import { useState } from "react";
import { AlertTriangle, ArrowRight, CircleCheckBig, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { RadarChart } from "@/components/ui/RadarChart";
import { cn } from "@/lib/utils";
import { problem } from "@/lib/content";

// ─── Data ─────────────────────────────────────────────────────────────────────

// Illustrative maturity levels (0–1) — not real measured values.
const MATURITY_BEFORE = [0.25, 0.2, 0.15, 0.2, 0.2];
const MATURITY_AFTER = [0.95, 0.9, 1, 0.9, 0.95];

type Side = "before" | "after";

// ─── Component ────────────────────────────────────────────────────────────────

export function Problem() {
  const [activeAxis, setActiveAxis] = useState<number | null>(null);
  const [side, setSide] = useState<Side>("after");

  const axes = problem.rows.map((row, i) => ({
    label: row.axis,
    before: MATURITY_BEFORE[i],
    after: MATURITY_AFTER[i],
    tooltip: row.after, // shown in the hover tooltip on the chart
  }));

  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          align="left"
          eyebrow={problem.eyebrow}
          eyebrowIcon={AlertTriangle}
          title={
            <>
              Votre <span className="text-primary">fiscalité locale</span> ne devrait pas
              tenir dans 15 fichiers Excel.
            </>
          }
          description={problem.intro}
          divider
        />

        {/* ── Toggle Avant / Avec + subtitle ── */}
        <Reveal delay={100} className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2 font-ui text-sm text-slate">
            De la donnée éparpillée
            <ArrowRight className="size-4 text-primary-ink" aria-hidden="true" />
            <span className="font-medium text-ink">à une fiscalité pilotée</span>
          </span>

          <SideToggle side={side} onChange={setSide} />
        </Reveal>

        {/* ── Three-column layout: before | radar | after ── */}
        <Reveal
          delay={150}
          className="grid items-center gap-8 lg:grid-cols-[1fr_360px_1fr] lg:gap-6"
        >
          <ComparisonColumn
            heading={problem.columns.before}
            tone="before"
            isActive={side === "before"}
            rows={problem.rows.map((r) => r.before)}
            activeIndex={activeAxis}
            onActiveChange={setActiveAxis}
          />

          <div className="order-first flex flex-col items-center gap-4 lg:order-none">
            <RadarChart
              axes={axes}
              activeIndex={activeAxis}
              onActiveChange={setActiveAxis}
              emphasis={side}
            />
            <p className="max-w-[300px] text-center font-ui text-xs text-slate">
              {problem.radarCaption}
            </p>
          </div>

          <ComparisonColumn
            heading={problem.columns.after}
            tone="after"
            isActive={side === "after"}
            rows={problem.rows.map((r) => r.after)}
            activeIndex={activeAxis}
            onActiveChange={setActiveAxis}
          />
        </Reveal>
      </Container>
    </section>
  );
}

// ─── Side toggle ──────────────────────────────────────────────────────────────

function SideToggle({ side, onChange }: { side: Side; onChange: (s: Side) => void }) {
  return (
    <div
      role="group"
      aria-label="Basculer entre avant et avec Mathis"
      className="ml-auto flex items-center border border-border bg-white p-1"
    >
      <ToggleButton
        label="Avant Mathis"
        isActive={side === "before"}
        dot="before"
        onClick={() => onChange("before")}
      />
      <ToggleButton
        label="Avec Mathis"
        isActive={side === "after"}
        dot="after"
        onClick={() => onChange("after")}
      />
    </div>
  );
}

function ToggleButton({
  label,
  isActive,
  dot,
  onClick,
}: {
  label: string;
  isActive: boolean;
  dot: "before" | "after";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "flex items-center gap-2 px-4 py-2 font-ui text-sm font-medium transition-colors",
        isActive
          ? dot === "after"
            ? "bg-primary/10 text-primary-ink"
            : "bg-slate/10 text-ink"
          : "text-slate hover:text-ink",
      )}
    >
      {dot === "after" ? (
        <span className="size-2.5 rounded-full bg-primary" aria-hidden="true" />
      ) : (
        <span
          className="size-2.5 rounded-full border border-dashed border-slate"
          aria-hidden="true"
        />
      )}
      {label}
    </button>
  );
}

// ─── Comparison column ────────────────────────────────────────────────────────

function ComparisonColumn({
  heading,
  tone,
  isActive,
  rows,
  activeIndex,
  onActiveChange,
}: {
  heading: string;
  tone: "before" | "after";
  isActive: boolean;
  rows: string[];
  activeIndex: number | null;
  onActiveChange: (i: number | null) => void;
}) {
  const isAfter = tone === "after";

  return (
    <div
      className={cn(
        "flex flex-col border border-border bg-white transition-opacity duration-300",
        !isActive && "opacity-60",
        isAfter && "bg-primary/[0.03]",
      )}
    >
      {/* Column header */}
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

      {/* Rows — hover / click syncs with radar */}
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
                <CircleCheckBig
                  className="mt-0.5 size-5 shrink-0 text-success"
                  aria-hidden="true"
                />
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
