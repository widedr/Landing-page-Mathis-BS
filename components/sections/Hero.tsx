"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CircleCheckBig } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { ctaLabel, hero } from "@/lib/content";

// Progression du montant dégrevé — mini graphique interactif du Hero.
const degrevementChart = [
  { month: "Janv.", value: "1,2 M€", h: 12 },
  { month: "Févr.", value: "2,1 M€", h: 19 },
  { month: "Mars", value: "3,4 M€", h: 26 },
  { month: "Avr.", value: "4,3 M€", h: 32 },
  { month: "Mai", value: "5,6 M€", h: 39 },
  { month: "Juin", value: "6,5 M€", h: 44 },
];

export function Hero() {
  const [activeBar, setActiveBar] = useState(degrevementChart.length - 1);
  const activePoint = degrevementChart[activeBar];

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-56 right-[-140px] size-[680px] rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-64 right-40 size-[420px] rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid gap-16 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <Reveal className="flex flex-col gap-7">
          <Eyebrow align="left">{hero.eyebrow}</Eyebrow>
          <h1 className="font-display max-w-xl text-4xl leading-[1.1] font-extrabold text-balance text-ink sm:text-5xl lg:text-[3.25rem]">
            {hero.title}
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-pretty text-slate">
            {hero.subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="#cta-final">{ctaLabel}</Button>
            <Button href="#plateforme" variant="secondary" arrow>
              {hero.secondaryCta}
            </Button>
          </div>
          <div className="flex items-center gap-2.5">
            <CircleCheckBig className="size-[18px] shrink-0 text-success" aria-hidden="true" />
            <span className="font-ui text-sm text-ink">{hero.trust}</span>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto w-full max-w-[560px]">
          <div className="relative mb-8 rounded-none bg-white p-4 shadow-[0_30px_70px_-30px_rgba(27,27,35,0.28)] ring-1 ring-ink/5 sm:mb-10">
            <div className="relative aspect-[533/357]">
              <Image
                src="/screenshots/patrimoine.png"
                alt="Aperçu du module Patrimoine de Mathis : carte du patrimoine et indicateurs fiscaux"
                fill
                priority
                sizes="(min-width: 1024px) 528px, 100vw"
                className="object-contain"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 px-2 py-5">
              {hero.kpis.map((kpi) => (
                <div key={kpi.label}>
                  <p className="font-display text-xl font-bold text-ink sm:text-2xl">
                    {kpi.value}
                  </p>
                  <p className="mt-1 font-ui text-sm text-slate">{kpi.label}</p>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ y: -2 }}
              className="absolute top-9 -left-7 flex items-center gap-2.5 rounded-none border border-border bg-white px-4 py-2.5 shadow-[0_16px_32px_-16px_rgba(27,27,35,0.25)] sm:-left-9"
            >
              <CircleCheckBig className="size-5 shrink-0 text-success" aria-hidden="true" />
              <span className="font-ui text-sm font-medium text-ink whitespace-nowrap">
                {hero.floatingBadge}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5 }}
              whileHover={{ y: -2 }}
              className="absolute -top-6 right-2 flex flex-col gap-2 rounded-none border border-border bg-white p-3 shadow-[0_16px_32px_-16px_rgba(27,27,35,0.25)] sm:right-4"
            >
              <div
                className="flex items-end gap-1"
                role="group"
                aria-label="Montant dégrevé cumulé, mois par mois"
              >
                {degrevementChart.map((point, i) => {
                  const isActive = i === activeBar;
                  return (
                    <button
                      key={point.month}
                      type="button"
                      onMouseEnter={() => setActiveBar(i)}
                      onFocus={() => setActiveBar(i)}
                      onClick={() => setActiveBar(i)}
                      aria-pressed={isActive}
                      aria-label={`${point.month} : ${point.value}`}
                      className="flex h-11 items-end rounded-none outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    >
                      <motion.span
                        initial={{ height: 0 }}
                        whileInView={{ height: point.h }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.4, ease: "easeOut" }}
                        className={cn(
                          "w-2 rounded-none transition-colors",
                          isActive ? "bg-primary" : "bg-primary/35",
                        )}
                      />
                    </button>
                  );
                })}
              </div>
              <div>
                <p className="font-ui text-[10px] text-slate">
                  Montant dégrevé · {activePoint.month}
                </p>
                <p className="font-display text-xs font-semibold text-ink">
                  {activePoint.value}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.5 }}
              whileHover={{ y: -2 }}
              className="absolute -right-4 -bottom-6 hidden items-center gap-2.5 rounded-none border border-border bg-white px-4 py-2.5 shadow-[0_16px_32px_-16px_rgba(27,27,35,0.25)] sm:-right-8 sm:-bottom-8 sm:flex"
            >
              <CircleCheckBig className="size-5 shrink-0 text-success" aria-hidden="true" />
              <span className="font-ui text-sm font-medium text-ink whitespace-nowrap">
                Collecte des données
              </span>
            </motion.div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
