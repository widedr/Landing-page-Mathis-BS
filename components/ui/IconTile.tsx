import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function IconTile({
  icon: Icon,
  size = "md",
  tone = "primary",
  className,
}: {
  icon: LucideIcon;
  size?: "sm" | "md";
  tone?: "primary" | "ink";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl",
        size === "md" ? "size-14" : "size-12",
        tone === "primary"
          ? "bg-primary/10 text-primary-ink"
          : "bg-ink/5 text-ink",
        className,
      )}
      aria-hidden="true"
    >
      <Icon className={size === "md" ? "size-6" : "size-5"} strokeWidth={2} />
    </div>
  );
}
