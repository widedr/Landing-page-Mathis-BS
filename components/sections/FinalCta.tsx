"use client";

import { useState } from "react";
import { CircleCheckBig, LoaderCircle, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MuiField } from "@/components/ui/MuiField";
import { Reveal } from "@/components/ui/Reveal";
import { ctaLabel, hero, finalCta } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export function FinalCta() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      organization: String(form.get("organization") ?? ""),
      phone: String(form.get("phone") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="cta-final" className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="pointer-events-none absolute top-0 right-0 size-[510px] rounded-full bg-primary/[0.07] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal className="flex flex-col items-start gap-8">
          <h2 className="font-display max-w-xl text-3xl leading-[1.15] font-extrabold text-balance text-ink sm:text-4xl lg:text-[2.75rem]">
            Prêt à reprendre la main sur votre{" "}
            <span className="text-primary">fiscalité locale</span> ?
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-slate">{finalCta.subtitle}</p>
          <Button href="#plateforme" variant="secondary" arrow>
            {hero.secondaryCta}
          </Button>
        </Reveal>

        {/* Carte formulaire avec cadre orange décalé (Figma) */}
        <Reveal delay={120} id="cta-form" className="relative w-full scroll-mt-24">
          <span
            className="pointer-events-none absolute -top-3 -right-3 hidden h-full w-full border-2 border-btn-primary sm:block"
            aria-hidden="true"
          />
          <div className="relative border border-border bg-white p-8 shadow-[0_1px_2px_rgba(27,27,35,0.04),0_24px_48px_-24px_rgba(27,27,35,0.15)] sm:p-10">
            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-success-soft text-success">
                  <CircleCheckBig className="size-7" aria-hidden="true" />
                </div>
                <p className="font-display text-xl font-bold text-ink">Merci !</p>
                <p className="max-w-sm text-[15px] leading-relaxed text-slate">
                  {finalCta.confirmation}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <MuiField label="Nom" name="name" autoComplete="name" required />
                <MuiField
                  label="Email professionnel"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
                <MuiField label="Organisme" name="organization" autoComplete="organization" required />
                <MuiField label="Téléphone" name="phone" type="tel" autoComplete="tel" />

                {status === "error" && (
                  <p className="text-sm text-error" role="alert">
                    Une erreur est survenue. Merci de réessayer, ou de nous contacter directement.
                  </p>
                )}

                <Button type="submit" disabled={status === "submitting"} className="w-fit">
                  {status === "submitting" ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                      Envoi en cours…
                    </>
                  ) : (
                    ctaLabel
                  )}
                </Button>

                <div className="flex items-start gap-2.5 text-left">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-slate" aria-hidden="true" />
                  <p className="font-ui text-sm text-slate">{finalCta.reassurance}</p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
