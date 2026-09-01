"use client";

import { motion } from "framer-motion";
import { CircleCheckBig, DatabaseZap, ListChecks, MapPinCheck, TrendingUp, WandSparkles } from "lucide-react";
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
          eyebrowIcon={TrendingUp}
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
          {results.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <RevealItem key={item.title}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative flex h-full flex-col gap-4 overflow-hidden border border-border bg-white p-6 shadow-[0_10px_30px_-18px_rgba(249,97,0,0.35)] transition-[box-shadow,border-color] duration-300 hover:border-primary/40 hover:shadow-[0_22px_48px_-18px_rgba(249,97,0,0.5)]"
                >
                  {/* reflet orange (dégradé en haut de la carte) */}
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-primary/12 via-primary/[0.04] to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  {/* liseré orange supérieur */}
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                    aria-hidden="true"
                  />

                  <div className="relative flex items-center gap-3">
                    <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-ink">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="font-ui text-xs font-semibold tracking-[0.12em] text-primary-ink uppercase">
                      {item.phase}
                    </span>
                  </div>

                  <h3 className="relative font-display text-lg leading-snug font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="relative text-[15px] leading-relaxed text-slate">
                    {item.detail}
                  </p>

                  <ul className="relative mt-auto flex flex-col gap-2 border-t border-border pt-4">
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
