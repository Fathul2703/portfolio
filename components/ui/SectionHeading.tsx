import { cn } from "@/lib/cn";
import { ScrambleText } from "./ScrambleText";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  lead?: string;
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

/** Pola heading khas: label mono bernomor → judul besar + caret → deskripsi. */
export function SectionHeading({ index, label, title, lead, id, className, children }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-accent">§ {index}</span>
          <span className="h-px w-8 bg-line" aria-hidden />
          <ScrambleText text={label} />
        </p>
        <Reveal>
          <h2 id={id} className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-balance md:text-6xl">
            {title}
            <span aria-hidden className="ml-1 inline-block h-[0.8em] w-[3px] translate-y-[0.08em] animate-caret bg-accent align-baseline" />
          </h2>
        </Reveal>
        {lead && (
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">{lead}</p>
          </Reveal>
        )}
      </div>
      {children}
    </div>
  );
}
