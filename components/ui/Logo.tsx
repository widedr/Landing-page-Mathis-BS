import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span
        className="flex size-[43px] shrink-0 items-center justify-center rounded-[10px] bg-btn-primary font-display text-xl font-extrabold text-white"
        aria-hidden="true"
      >
        M
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-base font-bold text-ink">Mathis</span>
        <span className="font-ui text-xs text-slate">Bailleur social</span>
      </span>
    </div>
  );
}
