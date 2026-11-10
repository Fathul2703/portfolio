import { ArrowUpRight, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SocialIcon } from "@/components/ui/Icons";
import { Contours } from "@/components/ui/Contours";
import { CopyEmail } from "./CopyEmail";

export function Contact({ lang }: { lang: Locale }) {
  const lines = ui.contact.headline[lang];
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <Contours
        peaks={[{ x: 1350, y: 900, levels: 24, spacing: 28, start: 10 }]}
        seed={21}
        className="absolute inset-0 size-full"
      />
      <div className="container-x relative">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-accent">§ 05</span>
          <span className="h-px w-8 bg-line" aria-hidden />
          <ScrambleText text={t(ui.contact.label, lang)} />
        </p>

        <h2
          id="contact-title"
          className="mt-8 text-[clamp(2.75rem,10vw,9rem)] leading-[0.88] font-extrabold tracking-[-0.055em] uppercase"
        >
          {lines.map((line, i) => (
            <Reveal key={line} as="span" delay={i * 0.08} className="block">
              {i === lines.length - 1 ? (
                <>
                  {line.replace(/\.$/, "")}
                  <span className="text-accent">.</span>
                </>
              ) : (
                line
              )}
            </Reveal>
          ))}
        </h2>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
          <div>
            <Reveal delay={0.25}>
              <p className="max-w-md text-lg leading-relaxed text-muted">{t(ui.contact.lead, lang)}</p>
            </Reveal>
            <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${profile.email}`}>
                {t(ui.contact.write, lang)}
                <Send aria-hidden className="size-4" />
              </ButtonLink>
              <CopyEmail email={profile.email} label={t(ui.contact.copy, lang)} copiedLabel={t(ui.contact.copied, lang)} />
            </Reveal>
          </div>

          <Stagger as="ul" className="border-t border-line">
            {profile.socials.map((s, i) => (
              <StaggerItem as="li" key={s.key} className="border-b border-line">
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-5"
                >
                  <span className="font-mono text-[0.6875rem] text-muted">0{i + 1}</span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bg">
                    <SocialIcon name={s.key} className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase">{s.label}</span>
                    <span className="block truncate font-medium transition-transform duration-500 group-hover:translate-x-1">
                      {s.handle}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
