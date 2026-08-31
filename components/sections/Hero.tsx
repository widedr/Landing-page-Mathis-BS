"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CircleCheckBig } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ctaLabel, hero } from "@/lib/content";

const barHeights = [10, 16, 24, 32, 44, 34];

export function Hero() {
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
            <div className="relative h-[260px] overflow-hidden rounded-none border border-border">
              <Image
                src="/screenshots/patrimoine.png"
                alt="Aperçu du module Patrimoine de Mathis : carte du patrimoine et indicateurs fiscaux"
                fill
                priority
                sizes="(min-width: 1024px) 528px, 100vw"
                className="object-cover object-[36%_55%]"
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
              <div className="flex h-11 items-end gap-1">
                {barHeights.map((h, i) => (
                  <motion.span
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: h }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.4, ease: "easeOut" }}
                    className="w-1.5 rounded-none bg-primary"
                  />
                ))}
              </div>
              <div>
                <p className="font-ui text-[10px] text-slate">Montant dégrevé</p>
                <p className="font-display text-xs font-semibold text-ink">6,5 M€</p>
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
