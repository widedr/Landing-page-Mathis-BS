"use client";

import { motion } from "framer-motion";
import { CircleCheckBig, DatabaseZap, ListChecks, MapPinCheck, WandSparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { results } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  "wand-sparkles": WandSparkles,
  "database-zap": DatabaseZap,
  "list-checks": ListChecks,
  "map-pin-check": MapPinCheck,
};

export function Results() {
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
          description={results.intro}
          divider
        />

        <RevealGroup className="relative grid gap-6 md:grid-cols-4">
          {/* ligne horizontale du timeline (desktop) */}
          <div
            className="absolute top-[27px] right-[12.5%] left-[12.5%] hidden h-px bg-primary/25 md:block"
            aria-hidden="true"
          />

          {results.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <RevealItem key={item.title}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="flex h-full flex-col gap-4 border border-border bg-white p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-white text-primary-ink">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="font-ui text-xs font-semibold tracking-[0.12em] text-primary-ink uppercase">
                      {item.phase}
                    </span>
                  </div>

                  <h3 className="font-display text-lg leading-snug font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-slate">{item.detail}</p>

                  <ul className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <CircleCheckBig
                          className="mt-0.5 size-4 shrink-0 text-success"
                          aria-hidden="true"
                        />
                        <span className="font-ui text-sm text-ink">{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
