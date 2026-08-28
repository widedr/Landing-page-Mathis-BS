import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { testimonial } from "@/lib/content";

export function Testimonial() {
  return (
    <section className="bg-ink py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <span
            className="font-display text-6xl leading-none font-extrabold text-primary/70"
            aria-hidden="true"
          >
            “
          </span>
          <p className="font-ui text-xs font-semibold tracking-[0.14em] text-white/50 uppercase">
            {testimonial.title}
          </p>
          <blockquote>
            <p className="font-display text-2xl leading-snug font-medium text-balance text-white sm:text-3xl">
              {testimonial.quote}
            </p>
          </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}
