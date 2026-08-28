import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Badge({
  icon: Icon,
  tone = "neutral",
  className,
  children,
}: {
  icon?: LucideIcon;
  tone?: "neutral" | "success";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-ui text-sm font-medium",
        tone === "success"
          ? "border-success/20 bg-success-soft text-success"
          : "border-border bg-surface text-ink",
        className,
      )}
    >
      {Icon && <Icon className="size-4 shrink-0" aria-hidden="true" />}
      {children}
    </span>
  );
}
