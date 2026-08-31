"use client";

import { useId, useState } from "react";
import Image from "next/image";
import {
  Building2,
  ChartNoAxesCombined,
  ClipboardCheck,
  LayoutDashboard,
  Map,
  Receipt,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckItem } from "@/components/ui/CheckItem";
import { Button } from "@/components/ui/Button";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { cn } from "@/lib/utils";
import { platform } from "@/lib/content";

const moduleIcons: Record<string, LucideIcon> = {
  patrimoine: Map,
  fiscalite: Receipt,
  degrevements: ClipboardCheck,
  simulation: ChartNoAxesCombined,
  comptabilite: Building2,
  reporting: LayoutDashboard,
};

// Only the Patrimoine module has a real product screenshot so far — the
// others keep the labelled placeholder until their captures are ready.
const moduleScreenshots: Partial<Record<string, string>> = {
  patrimoine: "/screenshots/patrimoine.jpg",
};

function ModuleVisual({ id, label }: { id: string; label: string }) {
  const Icon = moduleIcons[id];
  const screenshot = moduleScreenshots[id];

  if (screenshot) {
    return (
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-none border border-border shadow-[0_8px_20px_-8px_rgba(27,27,35,0.15)]">
        <Image
          src={screenshot}
          alt={label}
          fill
          sizes="(min-width: 1024px) 528px, 100vw"
          className="object-cover object-[50%_18%]"
        />
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden rounded-none border border-border bg-gradient-to-br from-surface to-white">
      <div
        className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-primary/10 blur-2xl"
        aria-hidden="true"
      />
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-none bg-white text-primary-ink shadow-[0_8px_20px_-8px_rgba(27,27,35,0.15)]">
          <Icon className="size-6" aria-hidden="true" />
        </div>
        <span className="font-ui text-sm text-slate">{label}</span>
      </div>
    </div>
  );
}

export function Platform() {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(0);
  const idBase = useId();
  const active = platform.modules[activeTab];

  return (
    <section id="plateforme" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          align="left"
          eyebrow={platform.eyebrow}
          title={
            <>
              Une <span className="text-primary">plateforme</span> complète, module par
              module
            </>
          }
        />

        {/* Desktop: tabs */}
        <div className="hidden md:block">
          <div
            role="tablist"
            aria-label="Modules de la plateforme Mathis"
            className="mb-10 flex items-center gap-1 border border-border bg-white p-1"
          >
            {platform.modules.map((m, i) => (
              <button
                key={m.id}
                role="tab"
                id={`${idBase}-tab-${i}`}
                aria-selected={activeTab === i}
                aria-controls={`${idBase}-panel-${i}`}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "flex-1 px-3 py-2 font-display text-[15px] font-semibold whitespace-nowrap transition-colors",
                  activeTab === i
                    ? "bg-primary-very-soft text-btn-primary"
                    : "font-medium text-slate hover:text-ink",
                )}
              >
                {m.tab}
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`${idBase}-panel-${activeTab}`}
            aria-labelledby={`${idBase}-tab-${activeTab}`}
            key={active.id}
            className="grid animate-reveal items-center gap-12 border border-border bg-white p-14"
          >
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {active.title}
              </h3>
              <p className="text-base leading-relaxed text-slate">{active.tagline}</p>
              <ul className="flex flex-col gap-3">
                {active.bullets.map((bullet) => (
                  <CheckItem key={bullet}>{bullet}</CheckItem>
                ))}
              </ul>
              <Button href="#cta-final" variant="ghost" arrow className="w-fit px-0">
                {platform.cta}
              </Button>
            </div>
            <ModuleVisual id={active.id} label={active.visualLabel} />
          </div>
        </div>

        {/* Mobile / tablet: accordion (ticket M-01) */}
        <div className="md:hidden">
          {platform.modules.map((m, i) => (
            <AccordionItem
              key={m.id}
              id={`${idBase}-mobile-${i}`}
              title={m.tab}
              isOpen={openAccordion === i}
              onToggle={() => setOpenAccordion((prev) => (prev === i ? -1 : i))}
            >
              <div className="flex flex-col gap-5">
                <p className="font-display text-lg font-semibold text-ink">{m.title}</p>
                <p>{m.tagline}</p>
                <ul className="flex flex-col gap-3">
                  {m.bullets.map((bullet) => (
                    <CheckItem key={bullet}>{bullet}</CheckItem>
                  ))}
                </ul>
                <ModuleVisual id={m.id} label={m.visualLabel} />
                <Button href="#cta-final" variant="ghost" arrow className="w-fit px-0">
                  {platform.cta}
                </Button>
              </div>
            </AccordionItem>
          ))}
        </div>
      </Container>
    </section>
  );
}
