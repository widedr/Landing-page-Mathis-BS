import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ctaLabel, footer } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white py-16">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2">
            <Link href="#top" className="flex items-center gap-2 font-display text-xl font-extrabold text-ink">
              <span className="size-2.5 rounded-sm bg-primary" aria-hidden="true" />
              Mathis
            </Link>
            <p className="font-ui text-sm text-slate">{footer.baseline}</p>
          </div>
          <Button href="#cta-final" size="sm">
            {ctaLabel}
          </Button>
        </div>

        <div className="h-px w-full bg-border" aria-hidden="true" />

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {footer.columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h3 className="font-ui text-sm font-semibold text-ink">{column.title}</h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href={
                        link === "FAQ" ? "#faq" : link === "Patrimoine" ? "#plateforme" : "#top"
                      }
                      className="font-ui text-sm text-slate transition-colors hover:text-primary-ink"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="font-ui text-sm text-slate">
            © {new Date().getFullYear()} Mathis. Tous droits réservés.
          </p>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Mathis sur LinkedIn"
            className="flex size-9 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-primary-ink/30 hover:text-primary-ink"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4 fill-current"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
            </svg>
          </a>
        </div>
      </Container>
    </footer>
  );
}
