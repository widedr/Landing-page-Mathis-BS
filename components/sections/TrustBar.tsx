import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { trustBar } from "@/lib/content";

export function TrustBar() {
  return (
    <section className="border-y border-border bg-surface/60 py-10">
      <Container>
        <Reveal>
          <p className="mx-auto max-w-3xl text-center font-ui text-base text-ink sm:text-lg">
            {trustBar.fallback}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
