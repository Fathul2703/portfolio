"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { RotateCw } from "lucide-react";

interface TraitDeckProps {
  traits: string[];
  label: string;
  nextLabel: string;
}

/** Tumpukan kartu karakter: klik untuk berganti, berputar otomatis pelan. */
export function TraitDeck({ traits, label, nextLabel }: TraitDeckProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % traits.length), 3200);
    return () => window.clearInterval(id);
  }, [reduce, paused, traits.length]);

  return (
    <div
      className="relative h-44 w-full max-w-[19rem]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {traits.map((trait, i) => {
        const depth = (i - index + traits.length) % traits.length;
        const isTop = depth === 0;
        return (
          <m.div
            key={trait}
            aria-hidden={!isTop}
            className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 shadow-[0_1px_0_0_var(--line)]"
            style={{ zIndex: traits.length - depth, transformOrigin: "50% 100%" }}
            animate={{
              y: depth * -10,
              scale: 1 - depth * 0.05,
              rotate: depth === 0 ? -2 : depth * 2.5,
              opacity: depth > 2 ? 0 : 1,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <span className="eyebrow">{label} — 0{i + 1}</span>
            <span className="text-2xl font-semibold tracking-[-0.03em]">{trait}</span>
          </m.div>
        );
      })}
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % traits.length)}
        aria-label={nextLabel}
        className="absolute -right-3 -bottom-3 z-20 grid size-10 place-items-center rounded-full bg-ink text-bg transition-transform hover:rotate-90"
      >
        <RotateCw aria-hidden className="size-4" />
      </button>
      <p className="sr-only" aria-live="polite">
        {traits[index]}
      </p>
    </div>
  );
}
