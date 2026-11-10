import type { ProjectVisualKind } from "@/lib/types";
import { generateContours } from "@/lib/contours";

/**
 * Ilustrasi UI abstrak sebagai pengganti screenshot.
 * Mengikuti token warna sehingga cocok di light & dark mode.
 * Ganti dengan screenshot asli lewat field `image` di data/projects.ts.
 */
export function ProjectVisual({ kind, className }: { kind: ProjectVisualKind; className?: string }) {
  return (
    <svg viewBox="0 0 800 500" className={className} aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="500" className="fill-surface" />
      {kind === "dashboard" && <Dashboard />}
      {kind === "map" && <MapView />}
      {kind === "pos" && <Pos />}
      {kind === "chart" && <Chart />}
      {kind === "mobile" && <Mobile />}
    </svg>
  );
}

const pyramid = [18, 26, 34, 40, 44, 47, 45, 41, 36, 30, 22, 14, 8];

function Dashboard() {
  const contours = generateContours([{ x: 150, y: 110, levels: 7, spacing: 11, start: 6 }], 5);
  return (
    <g>
      {/* sidebar */}
      <rect x="0" y="0" width="150" height="500" className="fill-surface-2" />
      <rect x="24" y="28" width="28" height="28" rx="8" className="fill-ink" />
      <rect x="60" y="36" width="62" height="10" rx="5" className="fill-muted" opacity=".5" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x="24" y={96 + i * 34} width={i === 0 ? 102 : 80 - (i % 3) * 12} height="10" rx="5" className={i === 0 ? "fill-accent" : "fill-muted"} opacity={i === 0 ? 1 : 0.3} />
      ))}

      {/* stat cards */}
      {["11.030", "10", "47"].map((v, i) => (
        <g key={v} transform={`translate(${178 + i * 204} 28)`}>
          <rect width="188" height="92" rx="14" className="fill-bg stroke-line" />
          <rect x="18" y="20" width="60" height="8" rx="4" className="fill-muted" opacity=".45" />
          <text x="18" y="70" className="fill-ink" fontSize="30" fontWeight="600" fontFamily="var(--font-geist-sans)" letterSpacing="-1">
            {v}
          </text>
        </g>
      ))}

      {/* piramida penduduk */}
      <g transform="translate(178 140)">
        <rect width="290" height="332" rx="14" className="fill-bg stroke-line" />
        <rect x="18" y="20" width="96" height="8" rx="4" className="fill-muted" opacity=".45" />
        {pyramid.map((w, i) => (
          <g key={i} transform={`translate(145 ${52 + i * 21})`}>
            <rect x={-w * 2.4} width={w * 2.4} height="14" rx="3" className="fill-ink" opacity=".85" />
            <rect x="3" width={w * 2.2} height="14" rx="3" className="fill-accent" />
          </g>
        ))}
      </g>

      {/* peta mini */}
      <g transform="translate(484 140)">
        <rect width="290" height="200" rx="14" className="fill-bg stroke-line" />
        <svg width="290" height="200" viewBox="0 0 290 200" fill="none">
          {contours.map((c, i) => (
            <path key={i} d={c.d} className="stroke-muted" strokeOpacity=".35" strokeWidth={c.index ? 1.4 : 0.8} />
          ))}
          <path d="M40 150 L90 70 L170 60 L230 110 L200 170 L110 180 Z" className="fill-accent stroke-accent" fillOpacity=".12" strokeWidth="1.5" strokeDasharray="5 4" />
        </svg>
        <circle cx="150" cy="118" r="6" className="fill-accent" />
      </g>

      {/* bar pekerjaan */}
      <g transform="translate(484 356)">
        <rect width="290" height="116" rx="14" className="fill-bg stroke-line" />
        {[62, 44, 80, 36, 54, 70, 28, 48].map((h, i) => (
          <rect key={i} x={24 + i * 32} y={96 - h} width="18" height={h} rx="3" className={i === 2 ? "fill-accent" : "fill-ink"} opacity={i === 2 ? 1 : 0.75} />
        ))}
      </g>
    </g>
  );
}

function MapView() {
  const contours = generateContours(
    [
      { x: 520, y: 220, levels: 16, spacing: 22, start: 8 },
      { x: 150, y: 420, levels: 10, spacing: 26, start: 10 },
    ],
    9
  );
  return (
    <g>
      <g fill="none">
        {contours.map((c, i) => (
          <path key={i} d={c.d} className="stroke-muted" strokeOpacity=".4" strokeWidth={c.index ? 1.6 : 0.9} />
        ))}
      </g>
      <path d="M90 330 C 200 300, 260 360, 360 330 S 520 260, 620 300 S 760 340, 800 320" className="stroke-ink" strokeWidth="3" fill="none" opacity=".6" />
      <path d="M300 200 L420 150 L520 190 L500 290 L380 310 Z" className="fill-accent stroke-accent" fillOpacity=".22" strokeWidth="1.5" />
      <path d="M520 190 L640 170 L680 260 L600 320 L500 290 Z" className="fill-accent stroke-accent" fillOpacity=".45" strokeWidth="1.5" />
      <g transform="translate(596 380)">
        <rect width="180" height="96" rx="12" className="fill-bg stroke-line" />
        {[0.45, 0.22, 0.08].map((o, i) => (
          <g key={i} transform={`translate(16 ${20 + i * 24})`}>
            <rect width="14" height="14" rx="3" className="fill-accent" fillOpacity={o * 2} />
            <rect x="24" y="3" width={80 - i * 14} height="8" rx="4" className="fill-muted" opacity=".5" />
          </g>
        ))}
      </g>
    </g>
  );
}

function Pos() {
  return (
    <g>
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 32 + (i % 3) * 164;
        const y = 32 + Math.floor(i / 3) * 150;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <rect width="148" height="134" rx="14" className="fill-bg stroke-line" />
            <rect x="14" y="14" width="120" height="66" rx="8" className={i === 4 ? "fill-accent" : "fill-surface-2"} opacity={i === 4 ? 0.9 : 1} />
            <rect x="14" y="92" width="78" height="8" rx="4" className="fill-ink" opacity=".7" />
            <rect x="14" y="108" width="44" height="8" rx="4" className="fill-muted" opacity=".5" />
          </g>
        );
      })}
      <g transform="translate(540 32)">
        <rect width="228" height="436" rx="16" className="fill-bg stroke-line" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(20 ${28 + i * 40})`}>
            <rect width="104" height="8" rx="4" className="fill-ink" opacity=".6" />
            <rect x="148" width="40" height="8" rx="4" className="fill-muted" opacity=".6" />
          </g>
        ))}
        <line x1="20" x2="208" y1="250" y2="250" className="stroke-line" strokeDasharray="4 4" />
        <rect x="20" y="272" width="60" height="10" rx="5" className="fill-muted" opacity=".6" />
        <rect x="128" y="268" width="80" height="18" rx="5" className="fill-ink" />
        <rect x="20" y="372" width="188" height="44" rx="22" className="fill-accent" />
      </g>
    </g>
  );
}

function Chart() {
  const pts = [300, 280, 310, 260, 270, 220, 240, 190, 210, 170, 150];
  const d = pts.map((y, i) => `${i === 0 ? "M" : "L"}${60 + i * 50} ${y}`).join(" ");
  const forecast = [150, 165, 130, 140, 110];
  const fd = forecast.map((y, i) => `${i === 0 ? "M" : "L"}${560 + i * 50} ${y}`).join(" ");
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="60" x2="760" y1={100 + i * 70} y2={100 + i * 70} className="stroke-line" />
      ))}
      <path d={`${d} L560 380 L60 380 Z`} className="fill-ink" opacity=".06" />
      <path d={d} className="stroke-ink" strokeWidth="3" fill="none" />
      <path d={`${fd} L760 380 L560 380 Z`} className="fill-accent" opacity=".12" />
      <path d={fd} className="stroke-accent" strokeWidth="3" fill="none" strokeDasharray="8 7" />
      <circle cx="560" cy="150" r="7" className="fill-accent stroke-bg" strokeWidth="3" />
      <g transform="translate(60 28)">
        <rect width="120" height="10" rx="5" className="fill-ink" opacity=".7" />
        <rect y="20" width="70" height="8" rx="4" className="fill-muted" opacity=".5" />
      </g>
      <line x1="560" x2="560" y1="90" y2="380" className="stroke-accent" strokeDasharray="3 5" />
    </g>
  );
}

function Mobile() {
  const cells: [number, number][] = [];
  for (let y = 0; y < 11; y++)
    for (let x = 0; x < 11; x++) if ((x * 7 + y * 13 + x * y) % 3 === 0) cells.push([x, y]);
  const finder = (x: number, y: number) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="30" height="30" rx="4" className="fill-ink" />
      <rect x="5" y="5" width="20" height="20" rx="2" className="fill-bg" />
      <rect x="10" y="10" width="10" height="10" rx="1" className="fill-ink" />
    </g>
  );
  return (
    <g>
      <g transform="translate(290 24)">
        <rect width="220" height="452" rx="34" className="fill-ink" />
        <rect x="10" y="10" width="200" height="432" rx="26" className="fill-bg" />
        <rect x="80" y="22" width="60" height="8" rx="4" className="fill-ink" />
        <g transform="translate(40 110)">
          <rect width="140" height="140" rx="12" className="fill-surface stroke-line" />
          <g transform="translate(15 15)">
            {cells.map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x * 10} y={y * 10} width="9" height="9" rx="1.5" className="fill-ink" />
            ))}
            {finder(0, 0)}
            {finder(80, 0)}
            {finder(0, 80)}
          </g>
        </g>
        <rect x="40" y="276" width="140" height="10" rx="5" className="fill-ink" opacity=".7" />
        <rect x="64" y="296" width="92" height="8" rx="4" className="fill-muted" opacity=".5" />
        <rect x="30" y="370" width="160" height="40" rx="20" className="fill-accent" />
        <circle cx="110" cy="80" r="16" fill="none" className="stroke-accent" strokeWidth="3" strokeDasharray="70 31" />
      </g>
      <g opacity=".5">
        <rect x="70" y="140" width="150" height="10" rx="5" className="fill-muted" />
        <rect x="90" y="164" width="130" height="10" rx="5" className="fill-muted" opacity=".6" />
        <rect x="580" y="320" width="150" height="10" rx="5" className="fill-muted" />
        <rect x="580" y="344" width="110" height="10" rx="5" className="fill-muted" opacity=".6" />
      </g>
    </g>
  );
}
