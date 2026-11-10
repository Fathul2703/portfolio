import type { Metadata, Viewport } from "next";
import { fontMono, fontSans } from "@/lib/fonts";
import { notFound } from "next/navigation";
import "../globals.css";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { hasLocale, locales, ogLocale, t } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ededea" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0f12" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const title = `${profile.name} — ${t(profile.role, lang)}`;
  const description = t(profile.intro, lang);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s — ${profile.name}` },
    description,
    applicationName: profile.name,
    authors: [{ name: profile.name }],
    keywords: ["portfolio", "web developer", "Laravel", "Next.js", "GIS", "QGIS", "data", profile.name],
    alternates: {
      canonical: `/${lang}`,
      languages: { id: "/id", en: "/en", "x-default": "/id" },
    },
    openGraph: {
      type: "website",
      siteName: profile.name,
      title,
      description,
      url: `/${lang}`,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const navItems = (["about", "skills", "projects", "journey", "contact"] as const).map((id) => ({
    id,
    label: t(ui.nav[id], lang),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: t(profile.role, lang),
    email: `mailto:${profile.email}`,
    url: `${siteUrl}/${lang}`,
    address: { "@type": "PostalAddress", addressLocality: profile.location },
    sameAs: profile.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
  };

  return (
    <html lang={lang} suppressHydrationWarning className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
      <body className="min-h-screen overflow-x-clip">
        <Providers>
          <a
            href="#main"
            className="sr-only rounded-full bg-ink px-4 py-2 text-sm text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
          >
            {t(ui.nav.skip, lang)}
          </a>
          <div id="top" />
          <Navbar
            lang={lang}
            name={profile.shortName}
            initials={profile.initials}
            items={navItems}
            labels={{
              hire: t(ui.nav.hire, lang),
              menu: t(ui.nav.menu, lang),
              close: t(ui.nav.close, lang),
              theme: t(ui.nav.theme, lang),
              language: t(ui.nav.language, lang),
            }}
          />
          <main id="main">{children}</main>
          <Footer lang={lang} />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
