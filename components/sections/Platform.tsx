"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckItem } from "@/components/ui/CheckItem";
import { Button } from "@/components/ui/Button";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { cn } from "@/lib/utils";
import { platform } from "@/lib/content";

// Vraies captures produit fournies pour chaque module.
const moduleScreenshots: Record<string, string> = {
  patrimoine: "/screenshots/patrimoine.png",
  fiscalite: "/screenshots/fiscalite.png",
  degrevements: "/screenshots/degrevements.png",
  simulation: "/screenshots/simulation.png",
  comptabilite: "/screenshots/comptabilite.png",
  reporting: "/screenshots/reporting.png",
};

function ModuleVisual({
  id,
  label,
  className,
}: {
  id: string;
  label: string;
  className?: string;
}) {
  const screenshot = moduleScreenshots[id];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-none border border-border shadow-[0_8px_20px_-8px_rgba(27,27,35,0.15)]",
        className,
      )}
    >
      <Image
        src={screenshot}
        alt={label}
        fill
        sizes="(min-width: 1024px) 520px, 100vw"
        className="object-contain"
      />
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
                  "flex h-9 flex-1 items-center justify-center px-3 py-2 font-display text-[15px] whitespace-nowrap transition-colors",
                  activeTab === i
                    ? "bg-primary-very-soft font-semibold text-btn-primary shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)]"
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
            className="grid animate-reveal grid-cols-[1fr_1.3fr] items-center gap-12 border border-border bg-white p-14"
          >
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-[30px] leading-9 font-bold text-ink">
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
            <ModuleVisual
              id={active.id}
              label={active.visualLabel}
              className="aspect-[533/357]"
            />
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
                <ModuleVisual
                  id={m.id}
                  label={m.visualLabel}
                  className="aspect-[533/357]"
                />
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
