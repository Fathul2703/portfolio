import type { Profile } from "@/lib/types";

/**
 * DATA PROFIL — ganti isi di sini, komponen akan ikut berubah.
 * Semua data di bawah masih DUMMY kecuali disebut lain.
 */
export const profile: Profile = {
  name: "Muhammad Fathul Kohir",
  shortName: "Fathul",
  initials: "MFK",
  role: {
  id: "Informatics Graduate · Web & Data Developer",
  en: "Informatics Graduate · Web & Data Developer",
  },
  status: {
    id: "Terbuka untuk peluang kerja & proyek",
    en: "Open to job opportunities & projects",
  },
  intro: {
    id: "Saya membangun sistem web yang membuat data mudah dibaca — dari dashboard kependudukan sampai peta wilayah.",
    en: "I build web systems that make data easy to read — from population dashboards to regional maps.",
  },
  aboutHeadline: {
    id: "Problem solver. Mengubah data menjadi solusi.",
    en: "Problem solver. Turning data into solutions.",
  },
  aboutStory: {
    id: [
      "Saya lulusan Informatika di Universitas AKPRIND Indonesia. Ketertarikan saya ada di persimpangan web development, dan pengolahan data.",
      "Saya senang mengubah masalah nyata — seperti data desa yang tersebar di banyak spreadsheet — menjadi sistem yang rapi, terbuka, dan mudah dipakai siapa pun.",
    ],
    en: [
      "I'm an Informatics graduate from University AKPRIND Indonesia, working where web development, data, and mapping meet.",
      "I enjoy turning real problems — like village data scattered across spreadsheets — into systems that are tidy, open, and easy for anyone to use.",
    ],
  },
  location: "Indonesia",
  coordinates: { lat: -7.7956, lon: 110.3695 },
  availableForWork: true,
  email: "muhammadfathulkohir@gmail.com",
  // resumeUrl: "/resume.pdf",
  photo: "/images/profile.jpg",
  stats: [
    { value: "5+", label: { id: "Project dibangun", en: "Projects built" } },
    { value: "4", label: { id: "Tahun belajar", en: "Years learning" } },
    { value: "11K+", label: { id: "Data warga diolah", en: "Resident records" } },
  ],
  traits: [
    { id: "Problem Solver", en: "Problem Solver" },
    { id: "Detail-oriented", en: "Detail-oriented" },
    { id: "Cepat belajar", en: "Fast learner" },
    { id: "Berpikir lewat data", en: "Data-minded" },
  ],
  currently: [
    {
      title: { id: "Membangun", en: "Building" },
      detail: { id: "Sistem data desa", en: "Village data systems" },
    },
    {
      title: { id: "Eksplorasi", en: "Exploring" },
      detail: { id: "WebGIS & analisis spasial", en: "WebGIS & spatial analysis" },
    },
    {
      title: { id: "Belajar", en: "Learning" },
      detail: { id: "Machine learning terapan", en: "Applied machine learning" },
    },
  ],
  socials: [
    {
      key: "email",
      label: "Email",
      handle: "muhammadfathulkohir@gmail.com",
      href: "mailto:muhammadfathulkohir@gmail.com",
    },
    {
      key: "github",
      label: "GitHub",
      handle: "github.com/Fathul2703",
      href: "https://github.com/Fathul2703",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      handle: "linkedin.com/in/muhammad-fathul-kohir-061a7a438",
      href: "https://www.linkedin.com/in/muhammad-fathul-kohir-061a7a438",
    },
    {
      key: "instagram",
      label: "Instagram",
      handle: "@fathullkhr",
      href: "https://www.instagram.com/fathullkhr",
    },
  ],
};





