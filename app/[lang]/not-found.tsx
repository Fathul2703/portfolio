import Link from "next/link";
import { ui } from "@/data/ui";

// not-found tidak menerima params; tampilkan dua bahasa sekaligus.
export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pt-32 pb-20">
      <p className="eyebrow text-accent">404 — 0.0000° N · 0.0000° E</p>
      <h1 className="mt-5 text-5xl font-semibold tracking-[-0.045em] md:text-7xl">{ui.notFound.title.id}</h1>
      <p className="mt-2 text-2xl text-muted">{ui.notFound.title.en}</p>
      <p className="mt-6 text-muted">{ui.notFound.body.id} / {ui.notFound.body.en}</p>
      <div className="mt-10 flex gap-3">
        <Link href="/id" className="inline-flex h-12 items-center rounded-full bg-ink px-6 font-medium text-bg">
          {ui.notFound.home.id}
        </Link>
        <Link href="/en" className="inline-flex h-12 items-center rounded-full border border-ink/25 px-6 font-medium">
          {ui.notFound.home.en}
        </Link>
      </div>
    </section>
  );
}
