import { ScrollText } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { trustBar } from "@/lib/content";

export function TrustBar() {
  return (
    <section aria-label="Expertise Mathis">
      <Reveal className="flex items-center gap-4 border-y border-[#dacffe] bg-[#ede7ff] px-6 py-[18px] shadow-[0_0_10px_rgba(0,0,0,0.1)] sm:gap-6 sm:px-12 lg:px-24">
        <span
          className="flex h-[58px] w-[65px] shrink-0 items-center justify-center bg-[#dacffe] text-[#4932ab]"
          aria-hidden="true"
        >
          <ScrollText className="size-8" strokeWidth={1.75} />
        </span>
        <p className="font-display text-base leading-snug text-[#4932ab] sm:text-lg lg:text-xl">
          {trustBar.fallback}
        </p>
      </Reveal>
    </section>
  );
}
