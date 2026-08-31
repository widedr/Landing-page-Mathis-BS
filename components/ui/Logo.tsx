import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/mathis-logo.png"
      alt="Mathis — Bailleur social"
      width={152}
      height={43}
      priority
      className={cn("h-[43px] w-auto", className)}
    />
  );
}
