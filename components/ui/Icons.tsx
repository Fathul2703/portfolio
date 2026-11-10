import * as icons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { Mail } from "lucide-react";
import type { SocialKey } from "@/lib/types";

/** Ikon brand dari simple-icons, berdasarkan nama tanpa prefix "si". */
export function BrandIcon({ name, className, title }: { name: string; className?: string; title?: string }) {
  const icon = (icons as unknown as Record<string, SimpleIcon | undefined>)[`si${name}`];
  if (!icon) return null;
  return (
    <svg role={title ? "img" : undefined} aria-hidden={title ? undefined : true} viewBox="0 0 24 24" className={className} fill="currentColor">
      {title && <title>{title}</title>}
      <path d={icon.path} />
    </svg>
  );
}

export function brandHex(name: string): string | undefined {
  const icon = (icons as unknown as Record<string, SimpleIcon | undefined>)[`si${name}`];
  return icon ? `#${icon.hex}` : undefined;
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function SocialIcon({ name, className }: { name: SocialKey; className?: string }) {
  switch (name) {
    case "email":
      return <Mail aria-hidden className={className} strokeWidth={1.6} />;
    case "github":
      return <BrandIcon name="Github" className={className} />;
    case "instagram":
      return <BrandIcon name="Instagram" className={className} />;
    case "linkedin":
      return <LinkedInIcon className={className} />;
  }
}
