"use client";

import Link from "next/link";
import * as m from "motion/react-m";
import { AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { ProjectMedia } from "./ProjectMedia";

export interface ProjectRow {
  slug: string;
  href: string;
  title: string;
  tagline: string;
  year: string;
  stack: string[];
  placeholder?: boolean;
  media: Pick<Project, "image" | "visual" | "title">;
}

/** Daftar project bernomor; di desktop, preview mengikuti kursor saat hover. */
export function ProjectIndex({ rows, sampleLabel }: { rows: ProjectRow[]; sampleLabel: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const active = rows.find((r) => r.slug === hovered);

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <ul className="border-t border-line">
        {rows.map((row, i) => (
          <li key={row.slug} className="border-b border-line">
            <Link
              href={row.href}
              onPointerEnter={() => setHovered(row.slug)}
              onFocus={() => setHovered(null)}
              className="group grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 gap-y-4 py-6 md:grid-cols-[3rem_1.2fr_1fr_4rem_2.5rem] md:py-8"
            >
              <span className="self-start pt-1.5 font-mono text-xs text-muted md:self-center md:pt-0">
                {String(i + 2).padStart(2, "0")}
              </span>

              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-2xl font-semibold tracking-[-0.03em] transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:translate-x-2 md:text-3xl">
                    {row.title}
                  </span>
                  {row.placeholder && (
                    <span className="rounded-full border border-dashed border-line px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                      {sampleLabel}
                    </span>
                  )}
                </span>
                <span className="mt-1.5 block text-sm text-muted md:transition-transform md:duration-500 md:group-hover:translate-x-2">
                  {row.tagline}
                </span>
              </span>

              {/* Thumbnail di mobile/tablet */}
              <span className="relative col-span-3 col-start-1 block aspect-[16/9] overflow-hidden rounded-xl border border-line md:hidden">
                <ProjectMedia project={row.media as Project} sizes="100vw" />
              </span>

              <span className="col-span-2 col-start-2 flex flex-wrap gap-1.5 md:col-span-1 md:col-start-auto">
                {row.stack.map((s) => (
                  <span key={s} className="rounded-md border border-line px-2 py-0.5 font-mono text-[0.6875rem] text-muted">
                    {s}
                  </span>
                ))}
              </span>

              <span className="hidden font-mono text-xs text-muted md:block">{row.year}</span>

              <span className="row-start-1 col-start-3 grid size-10 place-items-center self-start rounded-full border border-line transition-all duration-300 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-bg md:col-start-auto md:row-start-auto md:self-center">
                <ArrowUpRight aria-hidden className="size-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Preview mengikuti kursor */}
      {canHover && (
        <AnimatePresence>
          {active && (
            <m.div
              key="preview"
              aria-hidden
              className="pointer-events-none fixed top-0 left-0 z-40 w-[22rem]"
              style={{ x: sx, y: sy, translateX: "-50%", translateY: "-115%" }}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.1, 1] }}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/20">
                <ProjectMedia key={active.slug} project={active.media as Project} sizes="352px" />
              </div>
            </m.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
