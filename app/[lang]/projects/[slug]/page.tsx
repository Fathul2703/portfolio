import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SocialIcon } from "@/components/ui/Icons";
import { getProject, projects } from "@/data/projects";
import { ui } from "@/data/ui";
import { hasLocale, locales, t } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { BrowserFrame, ProjectMedia } from "@/components/projects/ProjectMedia";
import { Contours } from "@/components/ui/Contours";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) return {};
  return {
    title: project.title,
    description: t(project.tagline, lang),
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: { id: `/id/projects/${slug}`, en: `/en/projects/${slug}` },
    },
    openGraph: { title: project.title, description: t(project.tagline, lang), url: `/${lang}/projects/${slug}` },
    robots: project.placeholder ? { index: false } : undefined,
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const host = project.demoUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const cs = project.caseStudy;

  const meta = [
    { label: t(ui.projects.role, lang), value: t(project.role, lang) },
    { label: t(ui.projects.year, lang), value: project.year },
    { label: t(ui.projects.stack, lang), value: project.stack.join(", ") },
  ];

  return (
    <article>
      <header className="relative overflow-hidden pt-36 pb-12 md:pt-44">
        <Contours
          peaks={[{ x: 1300, y: 120, levels: 18, spacing: 26, start: 10 }]}
          seed={idx + 30}
          className="absolute inset-0 size-full"
        />
        <div className="container-x relative">
          <Link
            href={`/${lang}#projects`}
            className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden className="size-3.5" />
            {t(ui.projects.back, lang)}
          </Link>

          <p className="eyebrow mt-10 flex items-center gap-3">
            <span className="text-accent">{String(idx + 1).padStart(2, "0")}</span>
            <span className="h-px w-8 bg-line" aria-hidden />
            {project.year}
            {project.placeholder && (
              <span className="rounded-full border border-dashed border-line px-2 py-0.5">{t(ui.projects.example, lang)}</span>
            )}
          </p>
          <h1 className="mt-5 animate-rise text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-balance">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl animate-rise text-xl text-muted [animation-delay:0.1s] md:text-2xl">
            {t(project.tagline, lang)}
          </p>

          <dl className="mt-12 grid animate-rise gap-6 border-t border-line pt-6 [animation-delay:0.2s] sm:grid-cols-3">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="eyebrow">{m.label}</dt>
                <dd className="mt-2 font-medium">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="container-x">
        <Reveal>
          <BrowserFrame url={host}>
            <ProjectMedia project={project} priority />
          </BrowserFrame>
        </Reveal>

        <div className="grid gap-12 py-20 md:py-28 lg:grid-cols-[14rem_1fr] lg:gap-20">
          <div className="flex flex-wrap gap-3 lg:flex-col lg:items-start">
            {project.demoUrl && (
              <ButtonLink href={project.demoUrl} size="sm">
                {t(ui.projects.visit, lang)}
                <ArrowUpRight aria-hidden className="size-3.5" />
              </ButtonLink>
            )}
            {project.githubUrl && (
              <ButtonLink href={project.githubUrl} size="sm" variant="outline">
                <SocialIcon name="github" className="size-3.5" />
                {t(ui.projects.code, lang)}
              </ButtonLink>
            )}
            {!project.demoUrl && !project.githubUrl && (
              <span className="inline-flex h-9 items-center rounded-full border border-dashed border-line px-4 font-mono text-xs text-muted">
                {t(ui.projects.soon, lang)}
              </span>
            )}
          </div>

          <div className="max-w-2xl">
            <Reveal>
              <h2 className="eyebrow">{t(ui.projects.overview, lang)}</h2>
              <p className="mt-4 text-xl leading-relaxed tracking-[-0.01em] text-pretty md:text-2xl">
                {t(project.description, lang)}
              </p>
            </Reveal>

            {project.placeholder && (
              <p className="mt-8 rounded-xl border border-dashed border-line p-4 font-mono text-xs text-muted">
                {t(ui.projects.sampleNote, lang)}
              </p>
            )}

            {cs?.highlights && (
              <Stagger as="ul" className="mt-12 grid grid-cols-3 divide-x divide-line border-y border-line">
                {cs.highlights.map((h) => (
                  <StaggerItem as="li" key={h.label.en} className="px-4 py-6 first:pl-0">
                    <span className="block text-3xl font-semibold tracking-[-0.04em] tabular-nums">{h.value}</span>
                    <span className="mt-1 block font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                      {t(h.label, lang)}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            )}

            {cs && (
              <div className="mt-14 grid gap-10 md:grid-cols-2">
                <Reveal>
                  <h2 className="eyebrow">{t(ui.projects.problem, lang)}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{t(cs.problem, lang)}</p>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2 className="eyebrow">{t(ui.projects.solution, lang)}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{t(cs.solution, lang)}</p>
                </Reveal>
              </div>
            )}

            {cs && (
              <div className="mt-14">
                <h2 className="eyebrow">{t(ui.projects.features, lang)}</h2>
                <Stagger as="ol" className="mt-4 border-t border-line">
                  {t(cs.features, lang).map((f, i) => (
                    <StaggerItem as="li" key={f} className="flex gap-5 border-b border-line py-4">
                      <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                      <span>{f}</span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            )}
          </div>
        </div>
      </div>

      {next.slug !== project.slug && (
        <Link href={`/${lang}/projects/${next.slug}`} className="group block border-t border-line">
          <div className="container-x flex items-center justify-between gap-6 py-14 md:py-20">
            <div>
              <p className="eyebrow">{t(ui.projects.next, lang)}</p>
              <p className="mt-3 text-4xl font-semibold tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-2 md:text-6xl">
                {next.title}
              </p>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bg md:size-20">
              <ArrowRight aria-hidden className="size-5" />
            </span>
          </div>
        </Link>
      )}
    </article>
  );
}
