import type { TimelineItem } from "@/lib/types";

/** DUMMY — ganti dengan riwayat asli. Urutkan dari yang terbaru. */
export const education: TimelineItem[] = [
  {
    period: "2024 — 2026",
    title: { id: "S1 Informatika", en: "B.Sc. Informatics" },
    org: "Universitas Akprind Indonesia",
    description: {
      id: "Fokus pada rekayasa perangkat lunak dan pengolahan data. IPK 3.77.",
      en: "Focused on software engineering and data processing. GPA 3.77.",
    },
    current: true,
  },
  {
    period: "2019 — 2021",
    title: { id: "MA — Jurusan IPA", en: "High School — Science" },
    org: "MAN 2  Negeri Tenggarong",
    description: {
      id: "Aktif dalam berogranisasi.",
      en: "Active in student organizations.",
    },
  },
];

export const experience: TimelineItem[] = [
  {
    period: "2025",
    title: { id: "Web Developer (Proyek Desa)", en: "Web Developer (Village Project)" },
    org: "Rumah Data Sendangsari",
    description: {
      id: "Membangun portal data desa terbuka: dashboard kependudukan, profil padukuhan, dan peta wilayah.",
      en: "Built an open village data portal: population dashboard, hamlet profiles, and regional maps.",
    },
    current: true,
  },
  {
    period: "2023",
    title: { id: "Magang", en: "Intern" },
    org: "CV Mitratama Comindo",
    description: {
      id: "Bergerak dibidang Pemasangan CCTV, Fingerprint.",
      en: "Installed CCTV and fingerprint systems.",
    },
  },
  {
    period: "2023 — 2024",
    title: { id: "Asisten Laboratorium", en: "Lab Assistant" },
    org: "Lab Basis Data",
    description: {
      id: "Mendampingi praktikum SQL dan perancangan basis data untuk ±30 mahasiswa.",
      en: "Assisted SQL and database design practicums for ±30 students.",
    },
  },
];
