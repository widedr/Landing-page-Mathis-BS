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
const MAX_RADIUS = 94;
const RINGS = [0.25, 0.5, 0.75, 1];
// Marge horizontale pour laisser respirer les libellés longs (ex. AUTOMATISATION)
// sans qu'ils débordent sur la colonne voisine.
const PAD_X = 58;
const PAD_Y = 10;

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
  emphasis = "after",
  className,
}: {
  axes: RadarAxis[];
  activeIndex: number | null;
  onActiveChange: (index: number | null) => void;
  emphasis?: "before" | "after";
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const total = axes.length;
  const beforePoints = polygonPoints(axes.map((a) => a.before));
  const afterPoints = polygonPoints(axes.map((a) => a.after));

  const beforeActive = emphasis === "before";
  const afterActive = emphasis === "after";

  return (
    <div className={cn("relative mx-auto w-full max-w-[360px]", className)}>
      <svg
        viewBox={`${-PAD_X} ${-PAD_Y} ${SIZE + 2 * PAD_X} ${SIZE + 2 * PAD_Y}`}
        className="w-full"
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

        {/* "avant" shape — gris */}
        <motion.polygon
          points={beforePoints}
          fill={beforeActive ? "rgba(107,114,128,0.18)" : "rgba(107,114,128,0.08)"}
          stroke="#6b7280"
          strokeWidth={beforeActive ? 2 : 1.25}
          strokeDasharray="4 3"
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          initial={{ scale: reduceMotion ? 1 : 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: beforeActive ? 1 : 0.55 }}
          animate={{ opacity: beforeActive ? 1 : 0.55 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* "avec Mathis" shape — orange */}
        <motion.polygon
          points={afterPoints}
          fill={afterActive ? "rgba(249,115,22,0.18)" : "rgba(249,115,22,0.07)"}
          stroke="var(--mathis-primary)"
          strokeWidth={afterActive ? 2.5 : 1.25}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          initial={{ scale: reduceMotion ? 1 : 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: afterActive ? 1 : 0.5 }}
          animate={{ opacity: afterActive ? 1 : 0.5 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* dots gris (avant) */}
        {axes.map((axis, i) => {
          const p = pointFor(i, total, axis.before);
          return (
            <circle
              key={`b-${axis.label}`}
              cx={p.x}
              cy={p.y}
              r={beforeActive ? 4.5 : 3}
              fill={beforeActive ? "#6b7280" : "#ffffff"}
              stroke="#6b7280"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          );
        })}

        {/* dots orange (avec) + labels cliquables */}
        {axes.map((axis, i) => {
          const dot = pointFor(i, total, axis.after);
          const outer = pointFor(i, total, 1.16);
          const isActive = activeIndex === i;

          let anchor: "start" | "middle" | "end" = "middle";
          if (outer.x > CENTER + 4) anchor = "start";
          else if (outer.x < CENTER - 4) anchor = "end";

          return (
            <g key={axis.label}>
              <motion.circle
                cx={dot.x}
                cy={dot.y}
                r={isActive ? 7 : afterActive ? 5 : 3.5}
                fill={afterActive || isActive ? "var(--mathis-primary)" : "#ffffff"}
                stroke="var(--mathis-primary)"
                strokeWidth={1.75}
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
                  "cursor-pointer font-ui text-[9.5px] font-medium tracking-wide uppercase transition-colors",
                  isActive ? "fill-primary-ink font-semibold" : "fill-slate",
                )}
              >
                {axis.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
