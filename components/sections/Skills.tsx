import { capabilities, skillGroups } from "@/data/skills";
import { ui } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { BrandIcon, brandHex } from "@/components/ui/Icons";
import { Contours } from "@/components/ui/Contours";
import type { Capability } from "@/lib/types";

function readableBrand(name?: string) {
  if (!name) return undefined;
  const hex = brandHex(name);
  // brand berwarna sangat gelap (mis. Next.js) tidak terlihat di dark mode
  if (!hex || /^#(0{6}|1[0-9a-f]{5})$/i.test(hex)) return undefined;
  return hex;
}

function CapabilityCard({ cap, lang, className }: { cap: Capability; lang: Locale; className?: string }) {
  const wide = cap.size === "wide";
  return (
    <StaggerItem
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-ink/30 md:p-8",
        className
      )}
    >
      {wide && (
        <>
          <Contours
            peaks={[
              { x: 470, y: 130, levels: 16, spacing: 20, start: 6 },
              { x: 60, y: 420, levels: 8, spacing: 24, start: 10 },
            ]}
            seed={3}
            width={640}
            height={480}
            className="absolute inset-0 size-full transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
          />
          <span aria-hidden className="absolute top-[27%] right-[26%] hidden size-2.5 rounded-full bg-accent md:block" />
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-surface via-surface/90 to-transparent" />
        </>
      )}
      <div className="relative flex items-start justify-between gap-4">
        <span className="font-mono text-5xl font-light tracking-[-0.04em] text-muted transition-colors duration-500 group-hover:text-accent">
          {cap.id}
        </span>
      </div>
      <h3 className={cn("relative mt-auto pt-12 font-semibold tracking-[-0.03em]", wide ? "text-3xl md:text-4xl" : "text-2xl")}>
        {t(cap.title, lang)}
      </h3>
      <p className={cn("relative mt-3 leading-relaxed text-muted", wide && "max-w-md")}>{t(cap.description, lang)}</p>
      <ul className="relative mt-6 flex flex-wrap gap-1.5">
        {cap.tags.map((tag) => (
          <li key={tag} className="rounded-md border border-line bg-bg/60 px-2 py-1 font-mono text-[0.6875rem] text-muted">
            {tag}
          </li>
        ))}
      </ul>
    </StaggerItem>
  );
}

export function Skills({ lang }: { lang: Locale }) {
  const [wide, ...others] = capabilities;
  return (
    <section id="skills" aria-labelledby="skills-title" className="container-x py-24 md:py-32">
      <SectionHeading
        id="skills-title"
        index="02"
        label={t(ui.skills.label, lang)}
        title={t(ui.skills.title, lang)}
        lead={t(ui.skills.lead, lang)}
      />

      <Stagger className="mt-14 grid gap-4 md:mt-20 md:grid-cols-12" gap={0.08}>
        <CapabilityCard cap={wide} lang={lang} className="min-h-[22rem] md:col-span-7 md:row-span-2" />
        {others.map((cap) => (
          <CapabilityCard key={cap.id} cap={cap} lang={lang} className="md:col-span-5" />
        ))}

        {/* Tech stack */}
        <StaggerItem className="rounded-2xl border border-line p-6 md:col-span-12 md:p-8">
          <div className="grid gap-8 md:grid-cols-[10rem_1fr]">
            <p className="eyebrow">{t(ui.skills.stack, lang)}</p>
            <div className="grid gap-8 lg:grid-cols-3">
              {skillGroups.map((group) => (
                <div key={group.title.en}>
                  <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">{t(group.title, lang)}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((skill) => {
                      const brand = readableBrand(skill.icon);
                      return (
                        <li
                          key={skill.name}
                          style={brand ? ({ "--brand": brand } as React.CSSProperties) : undefined}
                          className="group/skill flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-sm transition-colors duration-300 hover:border-ink/30"
                        >
                          {skill.icon && (
                            <BrandIcon
                              name={skill.icon}
                              className="size-4 text-muted transition-colors duration-300 group-hover/skill:text-[var(--brand,var(--ink))]"
                            />
                          )}
                          {skill.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
