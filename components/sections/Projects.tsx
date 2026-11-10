import { ArrowRight, ArrowUpRight } from "lucide-react";
import { featuredProject, otherProjects } from "@/data/projects";
import { ui } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BrowserFrame, ProjectMedia } from "@/components/projects/ProjectMedia";
import { ScrollScale } from "@/components/projects/ScrollScale";
import { ProjectIndex, type ProjectRow } from "@/components/projects/ProjectIndex";

export function Projects({ lang }: { lang: Locale }) {
  const p = featuredProject;
  const host = p.demoUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const rows: ProjectRow[] = otherProjects.map((op) => ({
    slug: op.slug,
    href: `/${lang}/projects/${op.slug}`,
    title: op.title,
    tagline: t(op.tagline, lang),
    year: op.year,
    stack: op.stack,
    placeholder: op.placeholder,
    media: { image: op.image, visual: op.visual, title: op.title },
  }));

  return (
    <section id="projects" aria-labelledby="projects-title" className="container-x py-24 md:py-32">
      <SectionHeading
        id="projects-title"
        index="03"
        label={t(ui.projects.label, lang)}
        title={t(ui.projects.title, lang)}
        lead={t(ui.projects.lead, lang)}
      />

      {/* Featured — studi kasus */}
      <article aria-labelledby="featured-title" className="mt-14 md:mt-20">
        <Reveal className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase">
          <span className="text-ink">01</span>
          <span className="h-px w-8 bg-line" aria-hidden />
          <span>{t(ui.projects.featured, lang)}</span>
          <span aria-hidden>·</span>
          <span>{p.year}</span>
          {p.demoUrl && (
            <>
              <span aria-hidden>·</span>
              <span className="flex items-center gap-1.5 text-ink">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                {t(ui.projects.live, lang)}
              </span>
            </>
          )}
        </Reveal>

        <ScrollScale>
          <BrowserFrame url={host}>
            <ProjectMedia project={p} priority={false} />
          </BrowserFrame>
        </ScrollScale>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <h3 id="featured-title" className="text-4xl font-semibold tracking-[-0.04em] text-balance md:text-5xl">
              {p.title}
            </h3>
            <p className="mt-4 text-lg text-muted md:text-xl">{t(p.tagline, lang)}</p>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <li key={s} className="rounded-md border border-line px-2 py-1 font-mono text-[0.6875rem] text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <div>
            <Reveal delay={0.08}>
              <p className="leading-relaxed text-pretty">{t(p.description, lang)}</p>
            </Reveal>
            {p.caseStudy?.highlights && (
              <Stagger as="ul" className="mt-8 grid grid-cols-3 divide-x divide-line border-y border-line">
                {p.caseStudy.highlights.map((h) => (
                  <StaggerItem as="li" key={h.label.en} className="px-4 py-5 first:pl-0">
                    <span className="block text-2xl font-semibold tracking-[-0.04em] tabular-nums md:text-3xl">{h.value}</span>
                    <span className="mt-1 block font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                      {t(h.label, lang)}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            )}
            <Reveal delay={0.12} className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/${lang}/projects/${p.slug}`}>
                {t(ui.projects.caseStudy, lang)}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
              </ButtonLink>
              {p.demoUrl && (
                <ButtonLink href={p.demoUrl} variant="outline">
                  {t(ui.projects.visit, lang)}
                  <ArrowUpRight aria-hidden className="size-4" />
                </ButtonLink>
              )}
            </Reveal>
          </div>
        </div>
      </article>

      {/* Index */}
      {rows.length > 0 && (
        <div className="mt-24 md:mt-32">
          <p className="eyebrow mb-6">{t(ui.projects.index, lang)}</p>
          <ProjectIndex rows={rows} sampleLabel={t(ui.projects.example, lang)} />
        </div>
      )}
    </section>
  );
}
