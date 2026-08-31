"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

type ButtonOwnProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  arrow?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

// Drag/animation DOM event handlers conflict with framer-motion's own prop
// types of the same name, so they're excluded — Button never needs them.
type ConflictingHandlers =
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd";

type ButtonProps = ButtonOwnProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonOwnProps | ConflictingHandlers
  >;

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-ui font-medium transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-ink disabled:pointer-events-none disabled:opacity-50";

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

const tap = { scale: 0.96 };
const hover = { scale: 1.02 };

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
  const classes = cn(base, variants[variant], sizes[size], "group", className);

  const arrowIcon = arrow && (
    <motion.span
      className="inline-flex"
      initial={{ x: 0 }}
      whileHover={{ x: 3 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <ArrowRight className="size-4" aria-hidden="true" />
    </motion.span>
  );

  if (href) {
    return (
      <MotionLink
        href={href}
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        whileHover={hover}
        whileTap={tap}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {children}
        {arrowIcon}
      </MotionLink>
    );
  }

  return (
    <motion.button
      className={classes}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      whileHover={props.disabled ? undefined : hover}
      whileTap={props.disabled ? undefined : tap}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
      {arrowIcon}
    </motion.button>
  );
}
