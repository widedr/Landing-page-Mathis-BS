import { Reveal } from "@/components/ui/Reveal";
import { trustBar } from "@/lib/content";

/**
 * Illustration « document fiscal » du Figma (node 11097:72830) recréée en SVG :
 * document blanc, marque Mathis en haut à gauche, onglets d'état colorés
 * (vert / jaune / orange / rouge) à droite et pastille avatar en bas à gauche.
 */
function DocumentMark() {
  return (
    <svg
      viewBox="0 0 65 58"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      {/* corps du document */}
      <rect x="7" y="5" width="44" height="48" fill="#ffffff" />
      {/* onglets d'état, du plus favorable au plus critique */}
      <rect x="47" y="11" width="10" height="5" fill="#16a34a" />
      <rect x="47" y="18" width="10" height="5" fill="#eab308" />
      <rect x="47" y="25" width="10" height="5" fill="#f97316" />
      <rect x="47" y="32" width="10" height="5" fill="#ef4444" />
      {/* marque Mathis (deux pics) */}
      <path d="M12 16 L17.5 8.5 L23 16 Z" fill="#f97316" />
      <path d="M20 16 L24.5 10.5 L29 16 Z" fill="#ef4444" />
      {/* pastille avatar */}
      <circle cx="18" cy="42" r="7" fill="#c4b5fd" />
    </svg>
  );
}

export function TrustBar() {
  return (
    <section aria-label="Expertise Mathis">
      <Reveal className="flex items-center gap-4 border-y border-[#dacffe] bg-[#ede7ff] px-6 py-[18px] shadow-[0_0_10px_rgba(0,0,0,0.1)] sm:gap-6 sm:px-12 lg:px-24">
        <span
          className="flex h-[58px] w-[65px] shrink-0 items-center justify-center bg-[#dacffe]"
          aria-hidden="true"
        >
          <DocumentMark />
        </span>
        <p className="font-display text-base leading-snug text-[#4932ab] sm:text-lg lg:text-xl">
          {trustBar.fallback}
        </p>
      </Reveal>
    </section>
  );
}
