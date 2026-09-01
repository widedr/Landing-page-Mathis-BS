"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { testimonial } from "@/lib/content";

// Diagonal gradient matching Figma node 11097:72449
// linear-gradient(6.9°, #fb8425 18%, #ea5d09 89%)
const GRADIENT =
  "linear-gradient(6.923deg, rgb(251,132,37) 17.857%, rgb(234,93,9) 89.286%)";

export function Testimonial() {
  return (
    <section
      aria-label="Témoignage client"
      style={{ backgroundImage: GRADIENT }}
      className="relative overflow-hidden py-14 sm:py-20"
    >
      {/* Subtle radial glow — gives depth to the flat gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(255,255,255,0.10) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          {/* Opening guillemet */}
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[60px] leading-[60px] font-extrabold text-white select-none"
            aria-hidden="true"
          >
            "
          </motion.span>

          {/* Eyebrow */}
          <p className="font-ui text-[11px] font-semibold tracking-[0.14em] text-white/80 uppercase">
            {testimonial.title}
          </p>

          {/* Quote */}
          <blockquote>
            <p className="font-display mt-1 text-[26px] leading-snug font-medium text-balance text-white sm:text-[30px] sm:leading-[41px]">
              {testimonial.quote}
            </p>
          </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}
