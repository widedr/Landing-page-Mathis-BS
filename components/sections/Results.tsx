"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DatabaseZap, ListChecks, MapPinCheck, WandSparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { results } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  "wand-sparkles": WandSparkles,
  "database-zap": DatabaseZap,
  "list-checks": ListChecks,
  "map-pin-check": MapPinCheck,
};

export function Results() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-primary/[0.04] py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          align="left"
          eyebrow={results.eyebrow}
          title={
            <>
              Des <span className="text-primary">résultats visibles</span> dès les premiers
              mois
            </>
          }
          divider
        />

        <div className="relative">
          <div
            className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-border sm:block"
            aria-hidden="true"
          />
          <div className="grid gap-6 sm:grid-cols-4">
            {results.items.map((item, i) => {
              const Icon = icons[item.icon];
              const isActive = active === i;
              return (
                <Reveal key={item.title} delay={i * 80} className="relative">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className="group flex w-full cursor-pointer flex-col items-center gap-4 rounded-none p-3 text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-ink"
                  >
                    <motion.span
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "relative z-10 flex size-12 items-center justify-center rounded-full border-2 transition-colors",
                        isActive
                          ? "border-primary bg-primary text-white shadow-[0_10px_24px_-10px_rgba(249,115,22,0.6)]"
                          : "border-primary-soft bg-white text-primary-ink group-hover:border-primary",
                      )}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </motion.span>
                    <span
                      className={cn(
                        "font-display text-[15px] leading-snug font-medium transition-colors",
                        isActive ? "text-ink" : "text-ink/80",
                      )}
                    >
                      {item.title}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={300} className="mx-auto w-full max-w-2xl">
          <div className="relative overflow-hidden rounded-none border border-primary-soft bg-white px-8 py-6 text-center shadow-[0_1px_2px_rgba(27,27,35,0.04)]">
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-[15px] leading-relaxed text-slate"
              >
                {results.items[active].detail}
              </motion.p>
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
