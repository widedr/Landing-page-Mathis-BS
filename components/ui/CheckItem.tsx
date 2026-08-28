import { CircleCheckBig } from "lucide-react";
import { cn } from "@/lib/utils";

export function CheckItem({
  children,
  className,
  tone = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "primary" | "success";
}) {
  return (
    <li className={cn("flex items-start gap-3", className)}>
      <CircleCheckBig
        className={cn(
          "mt-0.5 size-5 shrink-0",
          tone === "success" ? "text-success" : "text-primary-ink",
        )}
        aria-hidden="true"
      />
      <span className="text-[15px] leading-snug text-ink">{children}</span>
    </li>
  );
}
