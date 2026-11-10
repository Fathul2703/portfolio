import Image from "next/image";
import { Compass, Download, Hammer, MapPin, Sprout } from "lucide-react";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { TraitDeck } from "./TraitDeck";

const currentlyIcons = [Hammer, Compass, Sprout];

export function About({ lang }: { lang: Locale }) {
  const [first, ...rest] = t(profile.aboutStory, lang);
  return (
    <section id="about" aria-labelledby="about-title" className="container-x py-24 md:py-32">
      <SectionHeading id="about-title" index="01" label={t(ui.about.label, lang)} title={t(profile.aboutHeadline, lang)} />

      <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-20">
        <div>
          <Reveal className="flex items-center gap-4">
            <div>
              <p className="font-semibold tracking-[-0.01em] uppercase">{profile.name}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                <MapPin aria-hidden className="size-3.5" />
                {t(ui.about.based, lang)} {profile.location}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-8 text-xl leading-relaxed tracking-[-0.01em] text-pretty md:text-2xl">{first}</p>
          </Reveal>
          {rest.map((p) => (
            <Reveal key={p} delay={0.1}>
              <p className="mt-5 max-w-xl leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}

          {profile.resumeUrl && (
            <Reveal delay={0.15}>
              <a
                href={profile.resumeUrl}
                className="mt-8 inline-flex items-center gap-2 border-b border-ink pb-0.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <Download aria-hidden className="size-4" />
                {t(ui.about.resume, lang)}
              </a>
            </Reveal>
          )}

          {profile.photo && (
            <div className="mt-12">
            <Stagger as="ul" className="grid grid-cols-3 divide-x divide-line border-y border-line">
              {profile.stats.map((s) => (
                <StaggerItem as="li" key={s.label.en} className="px-4 py-6 first:pl-0">
                  <span className="block text-3xl font-semibold tracking-[-0.04em] tabular-nums md:text-4xl">{s.value}</span>
                  <span className="mt-2 block font-mono text-[0.625rem] leading-4 tracking-[0.14em] text-muted uppercase">
                    {t(s.label, lang)}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
            </div>
          )}

          <div className="mt-12">
            <p className="eyebrow">{t(ui.about.currently, lang)}</p>
            <Stagger as="ul" className="mt-5 grid gap-4 sm:grid-cols-3">
              {profile.currently.map((c, i) => {
                const Icon = currentlyIcons[i % currentlyIcons.length];
                return (
                  <StaggerItem as="li" key={c.title.en} className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line">
                      <Icon aria-hidden className="size-4" strokeWidth={1.6} />
                    </span>
                    <span>
                      <span className="block text-sm font-medium">{t(c.title, lang)}</span>
                      <span className="block text-sm text-muted">{t(c.detail, lang)}</span>
                    </span>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>

        {profile.photo ? (
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <Reveal>
              <figure className="portrait">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface-2">
                  <Image
                    src={profile.photo}
                    alt={profile.name}
                    fill
                    sizes="(min-width: 1024px) 460px, (min-width: 640px) 448px, 90vw"
                    className="portrait-img object-cover"
                  />
                  {/* sudut bingkai ala peta */}
                  <span aria-hidden className="absolute top-3 left-3 size-4 border-t border-l border-white/70" />
                  <span aria-hidden className="absolute top-3 right-3 size-4 border-t border-r border-white/70" />
                  <span aria-hidden className="absolute bottom-3 left-3 size-4 border-b border-l border-white/70" />
                  <span aria-hidden className="absolute right-3 bottom-3 size-4 border-r border-b border-white/70" />
                </div>
                <figcaption className="mt-3 flex justify-between gap-4 font-mono text-[0.625rem] tracking-[0.14em] text-muted uppercase">
                  <span>Fig. 01 — {profile.shortName}</span>
                  <span className="tabular-nums">
                    {Math.abs(profile.coordinates.lat).toFixed(2)}° {profile.coordinates.lat < 0 ? "S" : "N"} ·{" "}
                    {Math.abs(profile.coordinates.lon).toFixed(2)}° {profile.coordinates.lon < 0 ? "W" : "E"}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.15} className="mt-12 flex justify-center lg:absolute lg:bottom-20 lg:-left-14 lg:mt-0 lg:block lg:w-[17rem]">
              <TraitDeck
                traits={profile.traits.map((tr) => t(tr, lang))}
                label={t(ui.about.trait, lang)}
                nextLabel={t(ui.about.nextTrait, lang)}
              />
            </Reveal>
          </div>
        ) : (
          <div className="flex flex-col gap-14">
          <Stagger as="ul" className="grid grid-cols-3 divide-x divide-line border-y border-line">
            {profile.stats.map((s) => (
              <StaggerItem as="li" key={s.label.en} className="px-4 py-6 first:pl-0">
                <span className="block text-3xl font-semibold tracking-[-0.04em] tabular-nums md:text-4xl">{s.value}</span>
                <span className="mt-2 block font-mono text-[0.625rem] leading-4 tracking-[0.14em] text-muted uppercase">
                  {t(s.label, lang)}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="flex justify-center pt-4 lg:justify-start">
            <TraitDeck
              traits={profile.traits.map((tr) => t(tr, lang))}
              label={t(ui.about.trait, lang)}
              nextLabel={t(ui.about.nextTrait, lang)}
            />
          </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
