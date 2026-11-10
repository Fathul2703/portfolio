/**
 * Generator garis kontur topografi (deterministik, dijalankan di server).
 * Menghasilkan path SVG tertutup yang mengelilingi beberapa "puncak".
 */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = [number, number];

/** Catmull-Rom tertutup → cubic bezier */
function closedPath(points: Pt[]): string {
  const n = points.length;
  const f = (v: number) => v.toFixed(1);
  let d = `M${f(points[0][0])},${f(points[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
  }
  return `${d}Z`;
}

export interface Peak {
  x: number;
  y: number;
  levels: number;
  spacing: number;
  start?: number;
}

export interface ContourLine {
  d: string;
  /** Garis indeks (lebih tebal), setiap 5 level */
  index: boolean;
}

export function generateContours(peaks: Peak[], seed = 7): ContourLine[] {
  const rand = mulberry32(seed);
  const lines: ContourLine[] = [];

  for (const peak of peaks) {
    const harmonics = [
      { k: 2, a: 0.1 + rand() * 0.08, p: rand() * Math.PI * 2 },
      { k: 3, a: 0.06 + rand() * 0.06, p: rand() * Math.PI * 2 },
      { k: 5, a: 0.02 + rand() * 0.03, p: rand() * Math.PI * 2 },
    ];
    const stretch = 0.75 + rand() * 0.5;
    const rot = rand() * Math.PI;

    for (let level = 0; level < peak.levels; level++) {
      const r = (peak.start ?? 14) + level * peak.spacing;
      const pts: Pt[] = [];
      const steps = 36;
      // distorsi sedikit berubah per level agar tidak seragam
      const drift = level * 0.07;
      for (let s = 0; s < steps; s++) {
        const th = (s / steps) * Math.PI * 2;
        let m = 1;
        for (const h of harmonics) m += h.a * Math.sin(h.k * th + h.p + drift);
        const rx = r * m;
        const ry = r * m * stretch;
        const x = rx * Math.cos(th);
        const y = ry * Math.sin(th);
        pts.push([
          peak.x + x * Math.cos(rot) - y * Math.sin(rot),
          peak.y + x * Math.sin(rot) + y * Math.cos(rot),
        ]);
      }
      lines.push({ d: closedPath(pts), index: level % 5 === 4 });
    }
  }
  return lines;
}
