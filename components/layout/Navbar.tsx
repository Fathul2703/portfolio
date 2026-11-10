"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
  id: string;
  label: string;
}

interface NavbarProps {
  lang: Locale;
  name: string;
  initials: string;
  items: NavItem[];
  labels: { hire: string; menu: string; close: string; theme: string; language: string };
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Navbar({ lang, name, initials, items, labels }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === `/${lang}`;
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  const otherLang: Locale = lang === "id" ? "en" : "id";
  const switchHref = pathname.replace(/^\/(id|en)(?=\/|$)/, `/${otherLang}`);

  // Scroll-spy: tandai section yang sedang terlihat
  useEffect(() => {
    if (!isHome) return;
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.4) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome, items]);

  // Posisi indikator aktif yang meluncur
  const measure = useCallback(() => {
    const el = active ? linkRefs.current[active] : null;
    setIndicator(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [active]);

  useIsoLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Menu mobile: kunci scroll, Escape untuk menutup, kelola fokus
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstMobileLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <nav
        aria-label="Main"
        className="relative z-10 mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 rounded-full border border-line bg-surface/85 pr-2 pl-2 backdrop-blur-md md:h-[3.75rem] md:pl-2.5"
      >
        <Link href={`/${lang}`} className="flex items-center gap-3 rounded-full pr-2" onClick={() => setOpen(false)}>
          <span className="grid size-10 place-items-center rounded-full bg-ink font-mono text-xs font-semibold tracking-wider text-bg">
            {initials}
          </span>
          <span className="font-mono text-xs font-medium tracking-[0.2em] uppercase">{name}</span>
        </Link>

        <ul className="relative hidden items-center lg:flex">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                ref={(el) => {
                  linkRefs.current[item.id] = el;
                }}
                href={`/${lang}#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "block px-3.5 py-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors duration-300",
                  active === item.id ? "text-ink" : "text-muted hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <span
            aria-hidden
            className="absolute -bottom-0.5 h-px bg-accent transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)]"
            style={{
              left: (indicator?.left ?? 0) + 14,
              width: indicator ? indicator.width - 28 : 0,
              opacity: indicator ? 1 : 0,
            }}
          />
        </ul>

        <div className="flex items-center gap-1.5">
          <Link
            href={switchHref}
            hrefLang={otherLang}
            aria-label={labels.language}
            className="grid h-10 min-w-10 place-items-center rounded-full px-2 font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <span>
              <span className="text-ink">{lang}</span>
              <span className="mx-1 text-line">/</span>
              {otherLang}
            </span>
          </Link>
          <ThemeToggle label={labels.theme} />
          <Link
            href={`/${lang}#contact`}
            className="ml-1 hidden h-10 items-center gap-1.5 rounded-full border border-ink/25 px-4 text-sm font-medium transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-bg sm:inline-flex"
          >
            {labels.hire}
            <ArrowUpRight aria-hidden className="size-3.5" />
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.close : labels.menu}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full bg-ink text-bg lg:hidden"
          >
            {open ? <X aria-hidden className="size-4" /> : <Menu aria-hidden className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Menu mobile layar penuh */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 bg-bg px-5 pt-28 pb-10 lg:hidden"
      >
        <ul className="flex flex-col">
          {items.map((item, i) => (
            <li key={item.id} className="border-b border-line" style={{ animation: `rise 0.6s cubic-bezier(0.2,0.7,0.1,1) ${i * 0.05}s both` }}>
              <Link
                ref={i === 0 ? firstMobileLinkRef : undefined}
                href={`/${lang}#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-5"
              >
                <span className="text-4xl font-semibold tracking-[-0.03em]">{item.label}</span>
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={`/${lang}#contact`}
          onClick={() => setOpen(false)}
          className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-bg"
        >
          {labels.hire}
          <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </div>
    </header>
  );
}
