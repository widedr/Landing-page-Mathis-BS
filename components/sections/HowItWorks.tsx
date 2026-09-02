"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Lock, MapPinCheck, Milestone, ShieldCheck, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps = [
  {
    n: "1",
    title: "Diagnostic",
    description:
      "Un expert Mathis analyse votre patrimoine et vos enjeux fiscaux actuels.",
  },
  {
    n: "2",
    title: "Connexion des données",
    description: "Import de votre matrice cadastrale, avis, données ERP sans double saisie.",
  },
  {
    n: "3",
    title: "Prise en main",
    description: "Formation de vos équipes, premiers tableaux de bord actifs.",
  },
  {
    n: "4",
    title: "Accompagnement expert",
    description:
      "Suivi des dégrèvements, veille réglementaire, support réactif.",
  },
];

const trustItems = [
  { Icon: MapPinCheck, label: "Données hébergées en France" },
  { Icon: Lock, label: "Conforme RGPD" },
  { Icon: ShieldCheck, label: "Accès par rôle" },
  { Icon: Users, label: "Accompagnement expert dédié" },
];

// Child variant — circle springs in after the parent RevealItem fades up
const circleVariants: Variants = {
  hidden: { scale: 0.35, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 280, damping: 18, delay: 0.12 },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* ── Steps section ─────────────────────────────────────────────────── */}
      <section id="comment-ca-marche" className="relative overflow-hidden bg-white py-16 sm:py-24">
        {/* Ambient orange blur — bottom-left, matching Figma */}
        <div
          className="pointer-events-none absolute -bottom-28 -left-28 size-[552px] rounded-full bg-primary/[0.05] blur-[87px]"
          aria-hidden="true"
        />

        <Container className="relative flex flex-col gap-12">
          {/* Heading */}
          <Reveal className="flex flex-col items-start gap-5">
            <Eyebrow align="left" icon={Milestone}>Comment ça marche</Eyebrow>
            <h2 className="font-display max-w-2xl text-3xl font-extrabold leading-[1.15] text-ink sm:text-4xl lg:text-[2.75rem]">
              De la démo à vos premiers{" "}
              <span className="text-primary">dégrèvements</span>
            </h2>
            {/* Orange gradient divider */}
            <span
              className="h-[3px] w-[72px] rounded-full bg-gradient-to-r from-primary to-primary/20"
              aria-hidden="true"
            />
          </Reveal>

          {/* Steps grid */}
          <div className="relative">
            {/* Connector line — draws left-to-right when in view, desktop only */}
            <motion.div
              className="absolute top-7 hidden h-[2px] origin-left bg-primary/25 md:block"
              style={{
                left: "calc(12.5% + 28px)",
                right: "calc(12.5% + 28px)",
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }
              }
              aria-hidden="true"
            />

            <RevealGroup
              className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4"
              stagger={0.12}
            >
              {steps.map((step) => (
                <RevealItem
                  key={step.n}
                  className="flex flex-col items-center gap-5 text-center"
                >
                  {/* Numbered circle — springs in as a child variant */}
                  <motion.div
                    variants={reduceMotion ? {} : circleVariants}
                    className="relative flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-primary/20 bg-primary-very-soft"
                    style={{ boxShadow: "0 0 0 4px rgba(249,115,22,0.10)" }}
                  >
                    <span className="font-display text-lg font-bold text-primary">
                      {step.n}
                    </span>
                  </motion.div>

                  {/* Title + description */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-[18px] font-bold leading-[28px] text-ink">
                      {step.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-slate">
                      {step.description}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* ── Reassurance bar ───────────────────────────────────────────────── */}
      <div className="border-y border-border bg-secondary-very-light py-8">
        <Container>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustItems.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <Icon className="size-5 shrink-0 text-secondary" aria-hidden="true" />
                <span className="font-ui text-sm text-ink">{label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}
