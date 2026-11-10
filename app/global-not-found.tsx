import type { Metadata } from "next";
import { fontMono, fontSans } from "@/lib/fonts";
import "./globals.css";
import Link from "next/link";
import { ui } from "@/data/ui";

export const metadata: Metadata = {
  title: "404",
  description: ui.notFound.body.en,
};

// Menerapkan tema gelap mengikuti preferensi sistem (tanpa next-themes)
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function GlobalNotFound() {
  return (
    <html lang="id" suppressHydrationWarning className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <main className="container-x flex min-h-svh flex-col justify-center py-20">
          <p className="eyebrow text-accent">404 — 0.0000° N · 0.0000° E</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.045em] md:text-7xl">{ui.notFound.title.id}</h1>
          <p className="mt-2 text-2xl text-muted">{ui.notFound.title.en}</p>
          <div className="mt-10 flex gap-3">
            <Link href="/id" className="inline-flex h-12 items-center rounded-full bg-ink px-6 font-medium text-bg">
              {ui.notFound.home.id}
            </Link>
            <Link href="/en" className="inline-flex h-12 items-center rounded-full border border-ink/25 px-6 font-medium">
              {ui.notFound.home.en}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
