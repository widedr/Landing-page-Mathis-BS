import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonOwnProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  arrow?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

type ButtonProps = ButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps>;

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-ui font-medium transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-ink disabled:pointer-events-none disabled:opacity-50";

const variants = {
  // Dark text on the brand orange keeps the exact Mathis CTA color while
  // reaching a ~6:1 contrast ratio (white-on-orange only reaches ~2.8:1).
  primary:
    "bg-primary text-ink shadow-[0_12px_24px_-10px_rgba(249,115,22,0.55)] hover:bg-primary-hover hover:shadow-[0_16px_28px_-8px_rgba(249,115,22,0.6)] active:bg-primary-active",
  secondary:
    "border border-border bg-white text-ink hover:border-ink/20 hover:bg-surface",
  ghost: "text-ink hover:text-primary-ink",
};

const sizes = {
  sm: "h-9 px-5 text-sm",
  md: "h-[42px] px-6 text-[15px]",
};

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  href,
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
        {arrow && <ArrowRight className="size-4" aria-hidden="true" />}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      {...props}
    >
      {children}
      {arrow && <ArrowRight className="size-4" aria-hidden="true" />}
    </button>
  );
}
