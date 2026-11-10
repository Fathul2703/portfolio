import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { SocialIcon } from "@/components/ui/Icons";

export function Footer({ lang }: { lang: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-ink font-mono text-[0.625rem] font-semibold text-bg">
            {profile.initials}
          </span>
          <p className="text-sm text-muted">
            © {year} {profile.name}. {t(ui.footer.rights, lang)}
          </p>
        </div>

        <div className="flex items-center justify-between gap-6 md:justify-end">
          <ul className="flex items-center gap-1">
            {profile.socials.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <SocialIcon name={s.key} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#top"
            className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase transition-colors hover:text-ink"
          >
            {t(ui.footer.top, lang)}
            <ArrowUp aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
