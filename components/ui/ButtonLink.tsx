import Link from "next/link";
import { cn } from "@/lib/cn";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md";
  className?: string;
  external?: boolean;
}

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,color,border-color,transform] duration-300 active:scale-[0.97]";

const variants = {
  solid: "bg-ink text-bg hover:bg-accent hover:text-accent-ink",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bg",
  ghost: "text-ink hover:text-accent",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
};

export function ButtonLink({ href, children, variant = "solid", size = "md", className, external }: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (external || /^(https?:|mailto:)/.test(href)) {
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
