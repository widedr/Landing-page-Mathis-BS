"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// Mathis logo mark: orange square 40×40, white mountain-peak silhouette.
// Three peaks — left small, centre tallest, right medium — matching the logo geometry.
const MARK_PATH = "M0 40 L0 27 L10 16 L16 23 L22 10 L28 19 L36 15 L40 19 L40 40 Z";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const ms = reduceMotion ? 0 : 2000;
    const id = setTimeout(() => setVisible(false), ms);
    return () => clearTimeout(id);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5 bg-white"
          exit={{
            y: "-100%",
            transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Logo lockup */}
          <div className="flex items-center gap-3">
            {/* Mark — orange square springs in, peaks draw in */}
            <motion.svg
              viewBox="0 0 40 40"
              className="size-11 shrink-0"
              aria-hidden="true"
              initial={reduceMotion ? false : { scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <rect width="40" height="40" fill="#f97316" />
              <motion.path
                d={MARK_PATH}
                fill="white"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray={1}
                initial={reduceMotion ? false : { strokeDashoffset: 1, fillOpacity: 0 }}
                animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
                transition={{
                  strokeDashoffset: {
                    duration: 0.65,
                    delay: 0.52,
                    ease: [0.37, 0, 0.63, 1],
                  },
                  fillOpacity: { duration: 0.2, delay: 1.08 },
                }}
              />
            </motion.svg>

            {/* Wordmark */}
            <motion.span
              className="font-display text-[27px] font-extrabold leading-none tracking-tight text-ink"
              initial={reduceMotion ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            >
              mathis
            </motion.span>
          </div>

          {/* Progress bar */}
          <motion.div
            className="h-[2px] w-16 overflow-hidden rounded-full bg-primary/15"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.15 }}
          >
            <motion.div
              className="h-full origin-left bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 1.15, ease: [0.37, 0, 0.63, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
