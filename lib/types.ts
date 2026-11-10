import type { Locale } from "./i18n";

/** Teks dalam dua bahasa. Isi `id` (Indonesia) dan `en` (English). */
export type Localized<T = string> = Record<Locale, T>;

export type SocialKey = "email" | "github" | "linkedin" | "instagram";

export interface SocialLink {
  key: SocialKey;
  label: string;
  /** Teks yang ditampilkan, mis. "github.com/username" */
  handle: string;
  href: string;
}

export interface Stat {
  value: string;
  label: Localized;
}

export interface Profile {
  name: string;
  /** Nama pendek untuk navbar & monogram */
  shortName: string;
  initials: string;
  role: Localized;
  status: Localized;
  /** Tampil di hero, maksimal ±2 baris */
  intro: Localized;
  aboutHeadline: Localized;
  aboutStory: Localized<string[]>;
  location: string;
  /** Koordinat dekoratif yang tampil di hero */
  coordinates: { lat: number; lon: number };
  availableForWork: boolean;
  email: string;
  /** Opsional: taruh file di /public lalu isi path-nya, mis. "/resume.pdf" */
  resumeUrl?: string;
  /** Opsional: foto profil di /public, mis. "/images/profile.jpg" */
  photo?: string;
  stats: Stat[];
  traits: Localized[];
  currently: { title: Localized; detail: Localized }[];
  socials: SocialLink[];
}

export interface Skill {
  name: string;
  /** Nama ikon dari simple-icons (tanpa prefix "si"), mis. "Laravel" */
  icon?: string;
}

export interface Capability {
  id: string;
  title: Localized;
  description: Localized;
  tags: string[];
  /** Lebar kartu pada desktop */
  size: "wide" | "normal";
}

export type ProjectVisualKind = "dashboard" | "map" | "pos" | "chart" | "mobile";

export interface Project {
  slug: string;
  title: string;
  tagline: Localized;
  description: Localized;
  year: string;
  role: Localized;
  stack: string[];
  /** Screenshot di /public, mis. "/projects/nama.webp". Jika kosong, ilustrasi otomatis dipakai. */
  image?: string;
  /** Ilustrasi pengganti saat `image` belum ada */
  visual: ProjectVisualKind;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  /** Tandai true untuk project contoh — akan diberi label "Contoh" */
  placeholder?: boolean;
  caseStudy?: {
    problem: Localized;
    solution: Localized;
    features: Localized<string[]>;
    highlights?: { value: string; label: Localized }[];
  };
}

export interface TimelineItem {
  period: string;
  title: Localized;
  org: string;
  description: Localized;
  current?: boolean;
}
