import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { testimonial } from "@/lib/content";

export function Testimonial() {
  return (
    <section className="bg-primary py-10">
      <Container>
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
          <span className="font-display text-[60px] leading-[60px] font-extrabold text-white" aria-hidden="true">
            “
          </span>
          <p className="font-ui text-xs font-semibold tracking-[0.14em] text-white uppercase">
            {testimonial.title}
          </p>
          <blockquote>
            <p className="font-display text-2xl leading-snug font-medium text-balance text-white sm:text-[30px] sm:leading-[41px]">
              {testimonial.quote}
            </p>
          </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}
