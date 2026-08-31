import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  divider = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  divider?: boolean;
  className?: string;
}) {
  const isCenter = align === "center";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        isCenter ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && <Eyebrow align={align}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "font-display max-w-3xl text-3xl leading-[1.15] font-extrabold text-balance text-ink sm:text-4xl lg:text-[2.75rem]",
          isCenter && "mx-auto",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-pretty text-slate sm:text-lg",
            isCenter && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
      {divider && (
        <span
          className="mt-1 h-[3px] w-[72px] rounded-full bg-gradient-to-r from-primary to-primary/20"
          aria-hidden="true"
        />
      )}
    </Reveal>
  );
}
