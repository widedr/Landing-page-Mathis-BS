"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccordionItem({
  id,
  title,
  isOpen,
  onToggle,
  children,
  className,
  titleClassName,
}: {
  id: string;
  title: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  const panelId = `${id}-panel`;
  const buttonId = `${id}-trigger`;

  return (
    <div className={cn("border-b border-border", className)}>
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-ink"
        >
          <span className={cn("font-display text-base font-semibold text-ink sm:text-lg", titleClassName)}>
            {title}
          </span>
          <ChevronDown
            className={cn(
              "size-5 shrink-0 text-slate transition-transform duration-300",
              isOpen && "rotate-180 text-primary-ink",
            )}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-5 text-[15px] leading-relaxed text-slate">{children}</div>
        </div>
      </div>
    </div>
  );
}
