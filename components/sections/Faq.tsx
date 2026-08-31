"use client";

import { useId, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { Reveal } from "@/components/ui/Reveal";
import { faq } from "@/lib/content";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const idBase = useId();

  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading align="left" eyebrow="FAQ" title="Questions fréquentes" divider />

        <Reveal delay={100} className="w-full">
          {faq.map((item, i) => (
            <AccordionItem
              key={item.question}
              id={`${idBase}-faq-${i}`}
              title={item.question}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
            >
              {item.answer}
            </AccordionItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
