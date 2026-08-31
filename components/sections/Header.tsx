"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { ctaLabel, nav } from "@/lib/content";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMicroMention, setShowMicroMention] = useState(false);

  useEffect(() => {
    const target = document.getElementById("plateforme");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowMicroMention(entry.boundingClientRect.top < 0),
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-[0_1px_12px_rgba(27,27,35,0.06)] backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link href="#top" aria-label="Mathis, accueil">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-ui text-[15px] text-ink/80 transition-colors hover:text-primary-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span
            className={cn(
              "hidden font-ui text-xs text-slate transition-opacity duration-300 xl:inline",
              showMicroMention ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={!showMicroMention}
          >
            Réponse sous 24h par un expert
          </span>
          <Button href="#cta-final" size="sm" className="hidden sm:inline-flex">
            {ctaLabel}
          </Button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-none text-ink lg:hidden"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div className="border-t border-border bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-none px-3 py-3 font-ui text-base text-ink hover:bg-surface"
              >
                {item.label}
              </a>
            ))}
            <Button href="#cta-final" className="mt-2 w-full" onClick={() => setMenuOpen(false)}>
              {ctaLabel}
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
