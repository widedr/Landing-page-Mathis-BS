import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { trustBar } from "@/lib/content";

export function TrustBar() {
  return (
    <section aria-label="Expertise Mathis">
      <Reveal className="flex items-center gap-4 border-y border-[#dacffe] bg-[#ede7ff] px-6 py-[18px] shadow-[0_0_10px_rgba(0,0,0,0.1)] sm:gap-6 sm:px-12 lg:px-24">
        <span
          className="flex h-[58px] w-[65px] shrink-0 items-center justify-center bg-[#dacffe]"
          aria-hidden="true"
        >
          <Image
            src="/trustbar-illustration.png"
            alt=""
            width={65}
            height={58}
            className="h-[58px] w-[65px]"
          />
        </span>
        <p className="font-display text-base leading-snug text-[#4932ab] sm:text-lg lg:text-xl">
          {trustBar.fallback}
        </p>
      </Reveal>
    </section>
  );
}
