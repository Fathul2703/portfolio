import { generateContours, type Peak } from "@/lib/contours";
import { cn } from "@/lib/cn";

interface ContoursProps {
  peaks: Peak[];
  seed?: number;
  width?: number;
  height?: number;
  className?: string;
}

/** SVG kontur topografi statis (server component, tanpa JS di browser). */
export function Contours({ peaks, seed, width = 1600, height = 1000, className }: ContoursProps) {
  const lines = generateContours(peaks, seed);
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none text-contour", className)}
      fill="none"
    >
      {lines.map((l, i) => (
        <path
          key={i}
          d={l.d}
          stroke="currentColor"
          strokeWidth={l.index ? 1.4 : 0.8}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
