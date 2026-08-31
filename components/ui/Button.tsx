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

// Solid variants match the exact Figma button colors (confirmed with the
// designer): amber primary / violet secondary, both with white text.
const variants = {
  primary:
    "bg-btn-primary text-white uppercase tracking-[0.4px] shadow-[0_12px_24px_-10px_rgba(255,111,0,0.55)] hover:bg-btn-primary-hover hover:shadow-[0_16px_28px_-8px_rgba(255,111,0,0.6)] active:bg-btn-primary-active",
  secondary:
    "bg-secondary text-white uppercase tracking-[0.4px] shadow-[0_12px_24px_-10px_rgba(91,63,214,0.45)] hover:bg-secondary-hover hover:shadow-[0_16px_28px_-8px_rgba(91,63,214,0.5)] active:bg-secondary-active",
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
