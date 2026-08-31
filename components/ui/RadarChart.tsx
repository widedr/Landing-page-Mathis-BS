"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type RadarAxis = {
  label: string;
  before: number;
  after: number;
};

const SIZE = 320;
const CENTER = SIZE / 2;
const MAX_RADIUS = 112;
const RINGS = [0.25, 0.5, 0.75, 1];

function pointFor(index: number, total: number, value: number) {
  const angle = -Math.PI / 2 + (index * (2 * Math.PI)) / total;
  const radius = value * MAX_RADIUS;
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  };
}

function polygonPoints(values: number[]) {
  return values.map((v, i) => pointFor(i, values.length, v)).map((p) => `${p.x},${p.y}`).join(" ");
}

export function RadarChart({
  axes,
  activeIndex,
  onActiveChange,
  className,
}: {
  axes: RadarAxis[];
  activeIndex: number | null;
  onActiveChange: (index: number | null) => void;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const total = axes.length;
  const beforePoints = polygonPoints(axes.map((a) => a.before));
  const afterPoints = polygonPoints(axes.map((a) => a.after));

  return (
    <div className={cn("relative mx-auto w-full max-w-[380px]", className)}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full overflow-visible"
        role="img"
        aria-label="Comparaison illustrative entre la situation avant Mathis et avec Mathis, sur cinq dimensions."
      >
        {/* grid rings */}
        {RINGS.map((r) => (
          <polygon
            key={r}
            points={polygonPoints(axes.map(() => r))}
            fill="none"
            stroke="var(--mathis-border)"
            strokeWidth={1}
          />
        ))}

        {/* spokes */}
        {axes.map((_, i) => {
          const p = pointFor(i, total, 1);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke="var(--mathis-border)"
              strokeWidth={1}
            />
          );
        })}

        {/* "avant" shape */}
        <motion.polygon
          points={beforePoints}
          fill="rgba(91,100,114,0.12)"
          stroke="#9aa1ac"
          strokeWidth={1.5}
          strokeDasharray="4 3"
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          initial={{ scale: reduceMotion ? 1 : 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* "avec Mathis" shape */}
        <motion.polygon
          points={afterPoints}
          fill="rgba(249,115,22,0.16)"
          stroke="var(--mathis-primary)"
          strokeWidth={2}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          initial={{ scale: reduceMotion ? 1 : 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* interactive vertices + labels */}
        {axes.map((axis, i) => {
          const outer = pointFor(i, total, 1.16);
          const dot = pointFor(i, total, axis.after);
          const isActive = activeIndex === i;

          let anchor: "start" | "middle" | "end" = "middle";
          if (outer.x > CENTER + 4) anchor = "start";
          else if (outer.x < CENTER - 4) anchor = "end";

          return (
            <g key={axis.label}>
              <motion.circle
                cx={dot.x}
                cy={dot.y}
                r={isActive ? 7 : 5}
                fill="var(--mathis-primary)"
                stroke="white"
                strokeWidth={2}
                className="cursor-pointer"
                onClick={() => onActiveChange(isActive ? null : i)}
                onMouseEnter={() => onActiveChange(i)}
                onMouseLeave={() => onActiveChange(null)}
                whileHover={{ scale: 1.2 }}
                aria-hidden="true"
              />
              <text
                x={outer.x}
                y={outer.y}
                textAnchor={anchor}
                dominantBaseline="middle"
                onClick={() => onActiveChange(isActive ? null : i)}
                onMouseEnter={() => onActiveChange(i)}
                onMouseLeave={() => onActiveChange(null)}
                className={cn(
                  "cursor-pointer font-ui text-[10.5px] font-medium uppercase tracking-wide transition-colors",
                  isActive ? "fill-primary-ink font-semibold" : "fill-slate",
                )}
              >
                {axis.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-4 flex items-center justify-center gap-6">
        <span className="flex items-center gap-2 font-ui text-xs text-slate">
          <span className="size-2.5 rounded-full border border-dashed border-[#9aa1ac]" aria-hidden="true" />
          Avant Mathis
        </span>
        <span className="flex items-center gap-2 font-ui text-xs font-medium text-ink">
          <span className="size-2.5 rounded-full bg-primary" aria-hidden="true" />
          Avec Mathis
        </span>
      </div>
    </div>
  );
}
