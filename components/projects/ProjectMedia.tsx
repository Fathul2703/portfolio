import Image from "next/image";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/cn";
import { ProjectVisual } from "./ProjectVisual";

/** Screenshot project (jika ada) atau ilustrasi pengganti. */
export function ProjectMedia({
  project,
  className,
  priority,
  sizes = "(min-width: 1024px) 1100px, 100vw",
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`Screenshot ${project.title}`}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover object-top", className)}
      />
    );
  }
  return <ProjectVisual kind={project.visual} className={cn("absolute inset-0 size-full", className)} />;
}

/** Bingkai browser minimal untuk screenshot. */
export function BrowserFrame({
  url,
  children,
  className,
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-line bg-surface-2", className)}>
      <div className="flex h-9 items-center gap-3 border-b border-line px-4">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
        </span>
        {url && (
          <span className="mx-auto max-w-[60%] truncate rounded-md bg-bg px-3 py-0.5 font-mono text-[0.625rem] text-muted">
            {url}
          </span>
        )}
        <span className="w-10" aria-hidden />
      </div>
      <div className="relative aspect-[16/10]">{children}</div>
    </div>
  );
}
