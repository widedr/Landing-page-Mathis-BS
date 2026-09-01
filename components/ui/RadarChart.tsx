"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RadarAxis = {
  label: string;
  before: number;  // 0–1 normalised
  after: number;   // 0–1 normalised
  tooltip?: string; // short description shown on hover
};

// ─── Geometry ─────────────────────────────────────────────────────────────────

const SIZE = 320;
const CENTER = SIZE / 2;
const MAX_RADIUS = 94;
const SPOKE_LEN = MAX_RADIUS;
const RINGS = [0.25, 0.5, 0.75, 1];
const PAD_X = 58;  // horizontal room for long labels (e.g. AUTOMATISATION)
const PAD_Y = 10;

function polar(index: number, total: number, value: number) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
  return {
    x: CENTER + value * MAX_RADIUS * Math.cos(angle),
    y: CENTER + value * MAX_RADIUS * Math.sin(angle),
  };
}

function toPoints(values: number[]) {
  const n = values.length;
  return values
    .map((v, i) => polar(i, n, v))
    .map(({ x, y }) => `${x},${y}`)
    .join(" ");
}

function labelAnchor(x: number): "start" | "middle" | "end" {
  if (x > CENTER + 4) return "start";
  if (x < CENTER - 4) return "end";
  return "middle";
}

// ─── Tooltip positioning ──────────────────────────────────────────────────────

const TT_W = 142;
const TT_H_LABEL_ONLY = 24;
const TT_H_WITH_TEXT = 47;
const TT_OFFSET = 14;

function tooltipPos(dotX: number, dotY: number, hasText: boolean) {
  const H = hasText ? TT_H_WITH_TEXT : TT_H_LABEL_ONLY;

  // Horizontal: push toward center so the card stays inside the viewbox
  let tx: number;
  if (dotX > CENTER + 20) tx = dotX - TT_W - TT_OFFSET;
  else if (dotX < CENTER - 20) tx = dotX + TT_OFFSET;
  else tx = dotX - TT_W / 2;

  // Vertical: below dot in top half, above dot in bottom half
  const ty = dotY < CENTER ? dotY + 12 : dotY - H - 8;

  return { tx, ty, H };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Expanding ripple ring that plays on repeat around an active dot. */
function PulseRing({ cx, cy }: { cx: number; cy: number }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      fill="none"
      stroke="var(--mathis-primary)"
      strokeWidth={1.5}
      initial={{ r: 8, opacity: 0.65 }}
      animate={{ r: 22, opacity: 0 }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

/** Small card that appears near the hovered/active dot. */
function DotTooltip({
  dotX,
  dotY,
  label,
  text,
}: {
  dotX: number;
  dotY: number;
  label: string;
  text?: string;
}) {
  const hasText = !!text;
  const { tx, ty, H } = tooltipPos(dotX, dotY, hasText);
  const font = "system-ui, -apple-system, sans-serif";
  const truncated = text && text.length > 32 ? text.slice(0, 30) + "…" : text;

  return (
    <motion.g
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.16 }}
      style={{ pointerEvents: "none" }}
    >
      <rect
        x={tx}
        y={ty}
        width={TT_W}
        height={H}
        rx={3}
        fill="white"
        stroke="var(--mathis-border)"
        strokeWidth={0.75}
        filter="url(#tt-drop)"
      />
      <text
        x={tx + 9}
        y={ty + 13}
        dominantBaseline="middle"
        style={{
          fontSize: 7.5,
          fontFamily: font,
          fontWeight: 700,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          fill: "var(--mathis-primary)",
        }}
      >
        {label}
      </text>
      {hasText && (
        <text
          x={tx + 9}
          y={ty + 33}
          dominantBaseline="middle"
          style={{ fontSize: 8.5, fontFamily: font, fill: "#3d3d4a" }}
        >
          {truncated}
        </text>
      )}
    </motion.g>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

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

  const beforePts = toPoints(axes.map((a) => a.before));
  const afterPts = toPoints(axes.map((a) => a.after));
  const beforeActive = emphasis === "before";
  const afterActive = emphasis === "after";

  // Entrance animation config — skipped entirely when user prefers reduced motion
  function enterFrom(delay: number, extra?: object) {
    if (reduceMotion) return {};
    return {
      initial: { scale: 0, opacity: 0 },
      whileInView: { scale: 1, opacity: 1 },
      viewport: { once: true, amount: 0.4 as const },
      transition: { delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] as const, ...extra },
    };
  }

  return (
    <div className={cn("relative mx-auto w-full max-w-[360px]", className)}>
      <svg
        viewBox={`${-PAD_X} ${-PAD_Y} ${SIZE + 2 * PAD_X} ${SIZE + 2 * PAD_Y}`}
        className="w-full overflow-visible"
        role="img"
        aria-label="Comparaison illustrative entre la situation avant Mathis et avec Mathis, sur cinq dimensions."
      >
        <defs>
          <filter id="tt-drop" x="-20%" y="-40%" width="140%" height="180%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(27,27,35,0.14)" />
          </filter>
        </defs>

        {/* ── Grid rings — scale in from center, staggered ── */}
        {RINGS.map((r, ri) => (
          <motion.polygon
            key={r}
            points={toPoints(axes.map(() => r))}
            fill="none"
            stroke="var(--mathis-border)"
            strokeWidth={1}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
            {...enterFrom(ri * 0.07)}
          />
        ))}

        {/* ── Spokes — draw outward from center ── */}
        {axes.map((_, i) => {
          const p = polar(i, total, 1);
          return (
            <motion.line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke="var(--mathis-border)"
              strokeWidth={1}
              strokeDasharray={SPOKE_LEN}
              initial={reduceMotion ? false : { strokeDashoffset: SPOKE_LEN }}
              whileInView={{ strokeDashoffset: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.28 + i * 0.06, duration: 0.45 }}
            />
          );
        })}

        {/* ── Active spoke highlight — draws in when an axis is hovered ── */}
        <AnimatePresence>
          {activeIndex !== null && (() => {
            const p = polar(activeIndex, total, 1);
            return (
              <motion.line
                key={`hl-${activeIndex}`}
                x1={CENTER}
                y1={CENTER}
                x2={p.x}
                y2={p.y}
                stroke="var(--mathis-primary)"
                strokeWidth={1.5}
                strokeDasharray={SPOKE_LEN}
                initial={{ strokeDashoffset: SPOKE_LEN, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 0.55 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
              />
            );
          })()}
        </AnimatePresence>

        {/* ── "Avant" polygon ── */}
        <motion.polygon
          points={beforePts}
          fill={beforeActive ? "rgba(107,114,128,0.18)" : "rgba(107,114,128,0.08)"}
          stroke="#6b7280"
          strokeWidth={beforeActive ? 2 : 1.25}
          strokeDasharray="4 3"
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          {...(reduceMotion
            ? {}
            : {
                initial: { scale: 0, opacity: 0 },
                whileInView: { scale: 1, opacity: beforeActive ? 1 : 0.55 },
                viewport: { once: true, amount: 0.4 },
              })}
          animate={{ opacity: beforeActive ? 1 : 0.55 }}
          transition={{ delay: 0.45, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* ── "Avec Mathis" polygon — spring entrance ── */}
        <motion.polygon
          points={afterPts}
          fill={afterActive ? "rgba(249,115,22,0.18)" : "rgba(249,115,22,0.07)"}
          stroke="var(--mathis-primary)"
          strokeWidth={afterActive ? 2.5 : 1.25}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          {...(reduceMotion
            ? {}
            : {
                initial: { scale: 0, opacity: 0 },
                whileInView: { scale: 1, opacity: afterActive ? 1 : 0.5 },
                viewport: { once: true, amount: 0.4 },
              })}
          animate={{ opacity: afterActive ? 1 : 0.5 }}
          transition={{
            delay: 0.58,
            type: "spring",
            stiffness: 260,
            damping: 28,
          }}
        />

        {/* ── "Avant" dots — staggered entrance ── */}
        {axes.map((axis, i) => {
          const p = polar(i, total, axis.before);
          return (
            <motion.circle
              key={`b-${axis.label}`}
              cx={p.x}
              cy={p.y}
              r={beforeActive ? 4.5 : 3}
              fill={beforeActive ? "#6b7280" : "#ffffff"}
              stroke="#6b7280"
              strokeWidth={1.5}
              aria-hidden="true"
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              {...enterFrom(0.6 + i * 0.06, { duration: 0.3 })}
            />
          );
        })}

        {/* ── "Avec" dots + axis labels + interactive effects ── */}
        {axes.map((axis, i) => {
          const dot = polar(i, total, axis.after);
          const outer = polar(i, total, 1.16);
          const isActive = activeIndex === i;

          return (
            <g key={axis.label}>
              {/* Ripple ring on active */}
              <AnimatePresence>
                {isActive && <PulseRing key="pulse" cx={dot.x} cy={dot.y} />}
              </AnimatePresence>

              {/* Dot */}
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
                style={{ transformOrigin: `${dot.x}px ${dot.y}px` }}
                {...enterFrom(0.62 + i * 0.06, { duration: 0.3 })}
              />

              {/* Axis label */}
              <text
                x={outer.x}
                y={outer.y}
                textAnchor={labelAnchor(outer.x)}
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

        {/* ── Tooltip — rendered last so it's on top of everything ── */}
        <AnimatePresence>
          {activeIndex !== null && (() => {
            const axis = axes[activeIndex];
            const dot = polar(activeIndex, total, axis.after);
            return (
              <DotTooltip
                key={`tt-${activeIndex}`}
                dotX={dot.x}
                dotY={dot.y}
                label={axis.label}
                text={axis.tooltip}
              />
            );
          })()}
        </AnimatePresence>
      </svg>
    </div>
  );
}
