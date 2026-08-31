import { CircleCheckBig } from "lucide-react";
import { cn } from "@/lib/utils";

export function CheckItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li className={cn("flex items-start gap-3", className)}>
      {/* Check mark en vert 700 (design system Mathis) */}
      <CircleCheckBig
        className="mt-0.5 size-5 shrink-0 text-success"
        aria-hidden="true"
      />
      <span className="text-[15px] leading-snug text-ink">{children}</span>
    </li>
  );
}
