import { education, experience } from "@/data/experience";
import { ui } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import type { TimelineItem } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { JourneyTimeline, type JourneyEntry } from "./JourneyTimeline";

export function Journey({ lang }: { lang: Locale }) {
  const map = (items: TimelineItem[]): JourneyEntry[] =>
    items.map((i) => ({
      period: i.period,
      title: t(i.title, lang),
      org: i.org,
      description: t(i.description, lang),
      current: i.current,
    }));

  return (
    <section id="journey" aria-labelledby="journey-title" className="container-x py-24 md:py-32">
      <SectionHeading id="journey-title" index="04" label={t(ui.journey.label, lang)} title={t(ui.journey.title, lang)} />
      <Reveal className="mt-12 md:mt-16">
        <JourneyTimeline
          nowLabel={t(ui.journey.now, lang)}
          tabs={[
            { key: "experience", label: t(ui.journey.experience, lang), items: map(experience) },
            { key: "education", label: t(ui.journey.education, lang), items: map(education) },
          ]}
        />
      </Reveal>
    </section>
  );
}
