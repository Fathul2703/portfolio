"use client";

import * as m from "motion/react-m";
import { AnimatePresence, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface JourneyEntry {
  period: string;
  title: string;
  org: string;
  description: string;
  current?: boolean;
}

interface JourneyTimelineProps {
  tabs: { key: string; label: string; items: JourneyEntry[] }[];
  nowLabel: string;
}

export function JourneyTimeline({ tabs, nowLabel }: JourneyTimelineProps) {
  const [activeKey, setActiveKey] = useState(tabs[0].key);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const active = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActiveKey(tabs[next].key);
    document.getElementById(`tab-${tabs[next].key}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Journey" className="inline-flex rounded-full border border-line bg-surface p-1">
        {tabs.map((tab, i) => {
          const selected = tab.key === active.key;
          return (
            <button
              key={tab.key}
              id={`tab-${tab.key}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${tab.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveKey(tab.key)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "h-10 rounded-full px-5 text-sm font-medium transition-colors duration-300",
                selected ? "bg-ink text-bg" : "text-muted hover:text-ink"
              )}
            >
              {tab.label}
              <span className={cn("ml-2 font-mono text-[0.6875rem]", selected ? "text-bg/60" : "text-muted")}>
                0{tab.items.length}
              </span>
            </button>
          );
        })}
      </div>

      <div ref={listRef} className="relative mt-12">
        {/* garis timeline */}
        <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line md:left-[calc(11rem+5px)]" />
        <m.span
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-accent md:left-[calc(11rem+5px)]"
        />

        <AnimatePresence mode="wait" initial={false}>
          <m.ol
            key={active.key}
            id={`panel-${active.key}`}
            role="tabpanel"
            aria-labelledby={`tab-${active.key}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.1, 1] }}
            className="flex flex-col gap-12 md:gap-16"
          >
            {active.items.map((item) => (
              <li key={`${item.org}-${item.period}`} className="relative grid gap-2 pl-8 md:grid-cols-[11rem_1fr] md:gap-0 md:pl-0">
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-1.5 left-0 size-[11px] rounded-full border-2 md:left-[11rem]",
                    item.current ? "border-accent bg-accent" : "border-line bg-bg"
                  )}
                />
                <p className="font-mono text-xs tracking-[0.1em] text-muted uppercase md:pt-1 md:pr-8 md:text-right">
                  {item.period}
                  {item.current && <span className="ml-2 text-accent md:hidden">● {nowLabel}</span>}
                </p>
                <div className="md:pl-12">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] md:text-2xl">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-muted">{item.org}</p>
                  <p className="mt-3 max-w-xl leading-relaxed text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </m.ol>
        </AnimatePresence>
      </div>
    </div>
  );
}
