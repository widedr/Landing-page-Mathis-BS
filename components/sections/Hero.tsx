import { CircleCheckBig, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ctaLabel, hero } from "@/lib/content";

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
            <CircleCheckBig className="size-[18px] shrink-0 text-primary-ink" aria-hidden="true" />
            <span className="font-ui text-sm text-ink">{hero.trust}</span>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto w-full max-w-[560px]">
          <div className="relative rounded-3xl bg-white p-4 shadow-[0_30px_70px_-30px_rgba(27,27,35,0.28)] ring-1 ring-ink/5">
            <div className="relative h-[260px] overflow-hidden rounded-2xl bg-gradient-to-br from-surface to-[#efeaf7]">
              <svg
                className="absolute inset-0 h-full w-full opacity-40"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M 28 0 L 0 0 0 28" fill="none" stroke="var(--mathis-border)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              <div className="absolute top-[104px] left-1/2 -translate-x-1/2">
                <div className="flex size-13 items-center justify-center rounded-full bg-primary/15">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary text-white shadow-[0_8px_20px_-6px_rgba(249,115,22,0.7)]">
                    <MapPin className="size-[18px]" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
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

            <div className="absolute top-9 -left-7 flex items-center gap-2.5 rounded-2xl border border-border bg-white px-4 py-2.5 shadow-[0_16px_32px_-16px_rgba(27,27,35,0.25)] sm:-left-9">
              <CircleCheckBig className="size-5 shrink-0 text-success" aria-hidden="true" />
              <span className="font-ui text-sm font-medium text-ink whitespace-nowrap">
                {hero.floatingBadge}
              </span>
            </div>
          </div>
          <p className="mt-4 text-center font-ui text-sm text-slate">{hero.visualCaption}</p>
        </Reveal>
      </Container>
    </section>
  );
}
