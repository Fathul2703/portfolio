"use client";

import { useEffect, useRef } from "react";

interface HeroMapProps {
  children: React.ReactNode;
  lat: number;
  lon: number;
}

/**
 * Lapisan kontur yang bergeser halus mengikuti kursor + readout koordinat.
 * Update langsung ke DOM (tanpa re-render React) agar ringan.
 */
export function HeroMap({ children, lat, lon }: HeroMapProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const latRef = useRef<HTMLSpanElement>(null);
  const lonRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      tx = nx * -28;
      ty = ny * -18;
      if (latRef.current) latRef.current.textContent = formatLat(lat - ny * 0.02);
      if (lonRef.current) lonRef.current.textContent = formatLon(lon + nx * 0.03);
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      if (layerRef.current) layerRef.current.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(loop) : 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [lat, lon]);

  return (
    <>
      <div ref={layerRef} className="absolute -inset-10 will-change-transform">
        {children}
      </div>
      <p
        className="pointer-events-none absolute right-5 bottom-6 z-10 hidden text-right font-mono text-[0.6875rem] leading-5 tracking-[0.14em] text-muted uppercase md:right-8 md:block"
        aria-hidden
      >
        <span className="block">
          LAT <span ref={latRef} className="text-ink tabular-nums">{formatLat(lat)}</span>
        </span>
        <span className="block">
          LON <span ref={lonRef} className="text-ink tabular-nums">{formatLon(lon)}</span>
        </span>
      </p>
    </>
  );
}

function formatLat(v: number) {
  return `${Math.abs(v).toFixed(4)}° ${v < 0 ? "S" : "N"}`;
}
function formatLon(v: number) {
  return `${Math.abs(v).toFixed(4)}° ${v < 0 ? "W" : "E"}`;
}
