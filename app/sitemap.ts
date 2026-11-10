import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = locales.map((lang) => ({
    url: `${siteUrl}/${lang}`,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}`])) },
  }));
  const projectPages = projects
    .filter((p) => !p.placeholder)
    .flatMap((p) =>
      locales.map((lang) => ({
        url: `${siteUrl}/${lang}/projects/${p.slug}`,
        changeFrequency: "yearly" as const,
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}/projects/${p.slug}`])),
        },
      }))
    );
  return [...home, ...projectPages];
}
