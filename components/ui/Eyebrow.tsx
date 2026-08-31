import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  align = "center",
  className,
}: {
  children: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-none border border-primary-soft bg-primary-very-soft px-4 py-1.5",
        align === "center" && "mx-auto",
        className,
      )}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
      <span className="font-ui text-xs font-semibold tracking-[0.14em] text-primary uppercase">
        {children}
      </span>
    </div>
  );
}
