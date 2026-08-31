import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className="flex size-[43px] shrink-0 items-center justify-center bg-btn-primary"
        aria-hidden="true"
      >
        <svg viewBox="0 0 43 43" className="size-full" role="img" aria-label="Mathis">
          {/* Marque Mathis — deux pics blancs sur carré orange (angles à 0) */}
          <path d="M3.5 29.5 L12.6 13 L21 29.5 L16.6 29.5 L12.6 21.8 L8.4 29.5 Z" fill="#ffffff" />
          <path d="M22 29.5 L31.1 13 L39.5 29.5 L35.1 29.5 L31.1 21.8 L26.9 29.5 Z" fill="#ffffff" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-xl font-bold text-ink">Mathis</span>
        <span className="font-ui text-sm text-slate">Bailleur social</span>
      </span>
    </div>
  );
}
