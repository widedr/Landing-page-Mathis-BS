import type { Metadata } from "next";
import { Outfit, Roboto } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const siteUrl = "https://mathis-bs.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mathis — La plateforme fiscale des bailleurs sociaux",
    template: "%s · Mathis",
  },
  description:
    "Mathis centralise vos données fiscales et patrimoniales, automatise vos obligations déclaratives et identifie les dégrèvements auxquels votre patrimoine est éligible.",
  keywords: [
    "fiscalité bailleurs sociaux",
    "logement social",
    "taxe foncière",
    "dégrèvement fiscal",
    "TFPB",
    "gestion patrimoniale",
    "plateforme fiscale SaaS",
  ],
  authors: [{ name: "Mathis" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Mathis",
    title: "Mathis — La plateforme fiscale des bailleurs sociaux",
    description:
      "Pilotez toute la fiscalité de votre patrimoine social depuis une seule plateforme.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mathis — La plateforme fiscale des bailleurs sociaux",
    description:
      "Pilotez toute la fiscalité de votre patrimoine social depuis une seule plateforme.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mathis",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Mathis centralise les données fiscales et patrimoniales des bailleurs sociaux, automatise les obligations déclaratives et identifie les dégrèvements.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
  },
  provider: {
    "@type": "Organization",
    name: "Mathis",
    url: siteUrl,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a
          href="#contenu-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Aller au contenu principal
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
