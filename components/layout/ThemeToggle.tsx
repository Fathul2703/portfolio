"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/** Ikon ditukar lewat CSS (kelas .dark) sehingga tidak ada hydration mismatch. */
export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
    >
      <Sun aria-hidden className="size-4 dark:hidden" strokeWidth={1.75} />
      <Moon aria-hidden className="hidden size-4 dark:block" strokeWidth={1.75} />
    </button>
  );
}
