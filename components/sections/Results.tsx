import { CircleCheckBig } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { results } from "@/lib/content";

export function Results() {
  return (
    <section className="bg-surface/50 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={results.eyebrow} title={results.title} divider />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.items.map((item, i) => (
            <Reveal
              key={item}
              delay={i * 80}
              className="flex flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-[0_1px_2px_rgba(27,27,35,0.04)]"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-success-soft text-success">
                <CircleCheckBig className="size-6" aria-hidden="true" />
              </div>
              <p className="text-[15px] leading-snug font-medium text-ink">{item}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
