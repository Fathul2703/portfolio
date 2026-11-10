import type { Capability, Skill } from "@/lib/types";

/**
 * Daftar teknologi. `icon` = nama ikon simple-icons tanpa prefix "si"
 * (cek di https://simpleicons.org). Kosongkan jika ikon tidak tersedia.
 */
export const skillGroups: { title: { id: string; en: string }; items: Skill[] }[] = [
  {
    title: { id: "Web", en: "Web" },
    items: [
      { name: "Laravel", icon: "Laravel" },
      { name: "PHP", icon: "Php" },
      { name: "JavaScript", icon: "Javascript" },
      { name: "TypeScript", icon: "Typescript" },
      { name: "React", icon: "React" },
      { name: "Next.js", icon: "Nextdotjs" },
    ],
  },
  {
    title: { id: "Data & GIS", en: "Data & GIS" },
    items: [
      { name: "Python", icon: "Python" },
      { name: "SQL", icon: "Mysql" },
      { name: "QGIS", icon: "Qgis" },
      { name: "Machine Learning", icon: "Scikitlearn" },
    ],
  },
  {
    title: { id: "Tools", en: "Tools" },
    items: [
      { name: "Git", icon: "Git" },
      { name: "Tailwind CSS", icon: "Tailwindcss" },
    ],
  },
];

/** Kartu kapabilitas bernomor. `size: "wide"` = kartu lebih lebar. */
export const capabilities: Capability[] = [
  {
    id: "01",
    size: "wide",
    title: { id: "Web Development", en: "Web Development" },
    description: {
      id: "Membangun aplikasi web berbasis database — dari perancangan skema, backend Laravel, hingga antarmuka React yang responsif.",
      en: "Building database-driven web apps — from schema design and Laravel backends to responsive React interfaces.",
    },
    tags: ["Laravel", "PHP", "React", "Next.js", "TypeScript", "REST API", "MySQL"],
  },
  {
    id: "02",
    size: "normal",
    title: { id: "Data & GIS", en: "Data & GIS" },
    description: {
      id: "Mengolah data mentah menjadi dashboard dan peta yang bisa dibaca.",
      en: "Turning raw data into readable dashboards and maps.",
    },
    tags: ["Python", "SQL", "QGIS", "WebGIS", "Visualisasi"],
  },
  {
    id: "03",
    size: "normal",
    title: { id: "Machine Learning", en: "Machine Learning" },
    description: {
      id: "Eksperimen model prediksi & klasifikasi untuk masalah sehari-hari.",
      en: "Experimenting with prediction & classification models for everyday problems.",
    },
    tags: ["scikit-learn", "Pandas", "Jupyter"],
  },
];
