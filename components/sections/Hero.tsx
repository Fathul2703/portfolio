import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Contours } from "@/components/ui/Contours";
import { HeroMap } from "./HeroMap";

const peaks = [
  { x: 1180, y: 330, levels: 22, spacing: 26, start: 10 },
  { x: 260, y: 820, levels: 16, spacing: 30, start: 20 },
  { x: 720, y: 60, levels: 8, spacing: 34, start: 30 },
];

export function Hero({ lang }: { lang: Locale }) {
  const marquee = `${profile.name} — `;
  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Peta kontur */}
      <div className="absolute inset-0 animate-fade">
        <HeroMap lat={profile.coordinates.lat} lon={profile.coordinates.lon}>
          <Contours peaks={peaks} seed={11} className="size-full" />
          {/* Pin lokasi */}
          <div className="absolute top-[36%] left-[72%] hidden md:block" aria-hidden>
            <span className="relative block size-3">
              <span className="absolute inset-0 animate-ping-slow rounded-full bg-accent" />
              <span className="absolute inset-0 rounded-full border-2 border-bg bg-accent" />
            </span>
            <span className="absolute top-1/2 left-6 -translate-y-1/2 font-mono text-[0.625rem] tracking-[0.18em] whitespace-nowrap text-muted uppercase">
              Base — {profile.location.split(",")[0]}
            </span>
          </div>
        </HeroMap>
      </div>

      {/* Nama outline berjalan */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[22%] overflow-hidden select-none md:top-[18%]"
      >
        <div className="flex w-max animate-marquee">
          {[0, 1].map((k) => (
            <span
              key={k}
              className="text-outline pr-[0.2em] text-[26vw] leading-none font-bold tracking-[-0.04em] whitespace-nowrap uppercase md:text-[17vw]"
            >
              {marquee}
              {marquee}
            </span>
          ))}
        </div>
      </div>

      {/* Konten */}
      <div className="container-x relative z-10 mt-auto pt-40 pb-14 md:pb-16">
        <p className="eyebrow flex animate-rise items-center gap-2.5 [animation-delay:0.1s]">
          {profile.availableForWork && (
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping-slow rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
          )}
          {t(profile.status, lang)}
        </p>

        <h1
          id="hero-title"
          className="mt-5 animate-rise text-[clamp(3.25rem,11vw,8.5rem)] leading-[0.9] font-semibold tracking-[-0.055em] [animation-delay:0.2s]"
        >
          {profile.name}
          <span className="text-accent">.</span>
        </h1>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-xl animate-rise [animation-delay:0.35s]">
            <p className="font-mono text-xs tracking-[0.12em] text-muted uppercase">{t(profile.role, lang)}</p>
            <p className="mt-3 text-lg leading-relaxed text-pretty md:text-xl">{t(profile.intro, lang)}</p>
          </div>
          <div className="flex animate-rise flex-wrap gap-3 [animation-delay:0.5s] md:mb-12">
            <ButtonLink href={`/${lang}#projects`}>
              {t(ui.hero.viewWork, lang)}
              <ArrowDown aria-hidden className="size-4 transition-transform group-hover/btn:translate-y-0.5" />
            </ButtonLink>
            <ButtonLink href={`/${lang}#contact`} variant="outline">
              {t(ui.hero.contact, lang)}
              <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Indikator scroll */}
      <div aria-hidden className="absolute top-1/2 right-8 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        <span className="h-12 w-px overflow-hidden bg-line">
          <span className="block h-1/2 w-px animate-[scrollline_2s_ease-in-out_infinite] bg-ink" />
        </span>
        <span className="font-mono text-[0.625rem] tracking-[0.3em] text-muted uppercase [writing-mode:vertical-rl]">
          {t(ui.hero.scroll, lang)}
        </span>
      </div>
    </section>
  );
}
