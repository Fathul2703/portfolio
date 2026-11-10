import type { Project } from "@/lib/types";

/**
 * DATA PROJECT
 * - Project dengan `featured: true` tampil besar sebagai studi kasus.
 * - Project lain tampil di daftar bernomor.
 * - Setiap project otomatis punya halaman detail: /id/projects/<slug>
 * - `placeholder: true` = project contoh (diberi label "Contoh"). Hapus/ganti.
 */
export const projects: Project[] = [
  {
    slug: "rumah-data-sendangsari",
    title: "Rumah Data Sendangsari",
    featured: true,
    year: "2025",
    // TODO: sesuaikan peran & stack dengan yang sebenarnya
    role: { id: "Fullstack Developer", en: "Fullstack Developer" },
    stack: ["Laravel", "MySQL", "JavaScript", "QGIS"],
    tagline: {
      id: "Portal data desa yang terbuka dan mudah dibaca.",
      en: "An open, easy-to-read village data portal.",
    },
    description: {
      id: "Portal data Kalurahan Sendangsari, Kulon Progo: dashboard kependudukan 11.030 warga di 10 padukuhan dan 47 RT, piramida usia, statistik pekerjaan, peta batas wilayah & mitigasi bencana, serta layanan administrasi online.",
      en: "A data portal for Sendangsari village, Kulon Progo: a population dashboard for 11,030 residents across 10 hamlets and 47 neighbourhood units, age pyramids, occupation stats, boundary & disaster-mitigation maps, and online admin services.",
    },
    // image: "/projects/rumah-data-sendangsari.webp",
    visual: "dashboard",
    demoUrl: "https://rumahdatasendangsari.id",
    caseStudy: {
      problem: {
        id: "Data warga, kesehatan, pendidikan, dan ekonomi desa tersebar dan sulit dibaca oleh perangkat desa maupun warga.",
        en: "Resident, health, education, and economic data was scattered and hard to read for both village officials and residents.",
      },
      solution: {
        id: "Satu portal terpusat yang menyajikan data agregat dalam dashboard, grafik, dan peta interaktif — terbuka untuk publik, dengan panel admin untuk pengelola.",
        en: "A single portal presenting aggregated data through dashboards, charts, and interactive maps — open to the public, with an admin panel for staff.",
      },
      features: {
        id: [
          "Dashboard kependudukan dengan piramida usia & statistik pekerjaan",
          "Profil data untuk setiap padukuhan",
          "Peta batas wilayah dan zona mitigasi bencana",
          "Layanan administrasi online (akta, pindah domisili)",
          "Berita, agenda, dan galeri kegiatan",
        ],
        en: [
          "Population dashboard with age pyramid & occupation stats",
          "Data profile for every hamlet",
          "Boundary and disaster-mitigation maps",
          "Online administrative services (certificates, relocation)",
          "News, events, and activity gallery",
        ],
      },
      highlights: [
        { value: "11.030", label: { id: "Warga terdata", en: "Residents recorded" } },
        { value: "10", label: { id: "Padukuhan", en: "Hamlets" } },
        { value: "47", label: { id: "RT", en: "Neighbourhood units" } },
      ],
    },
  },
  // {
  //   slug: "sigap-banjir",
  //   title: "SIGAP Banjir",
  //   placeholder: true,
  //   year: "2025",
  //   role: { id: "GIS Analyst", en: "GIS Analyst" },
  //   stack: ["QGIS", "Python", "Leaflet"],
  //   tagline: {
  //     id: "Peta kerawanan banjir berbasis data curah hujan.",
  //     en: "Flood-risk map driven by rainfall data.",
  //   },
  //   description: {
  //     id: "Analisis spasial untuk memetakan area rawan banjir dan menyajikannya sebagai WebGIS sederhana.",
  //     en: "Spatial analysis that maps flood-prone areas and presents them as a lightweight WebGIS.",
  //   },
  //   visual: "map",
  // },
  // {
  //   slug: "kasirku",
  //   title: "Kasirku",
  //   placeholder: true,
  //   year: "2024",
  //   role: { id: "Backend Developer", en: "Backend Developer" },
  //   stack: ["Laravel", "MySQL", "Tailwind CSS"],
  //   tagline: {
  //     id: "Aplikasi kasir & stok untuk warung.",
  //     en: "Point-of-sale & stock app for small shops.",
  //   },
  //   description: {
  //     id: "Sistem POS ringan dengan manajemen stok, laporan harian, dan cetak struk.",
  //     en: "A lightweight POS with stock management, daily reports, and receipt printing.",
  //   },
  //   visual: "pos",
  // },
  // {
  //   slug: "prediksi-harga-cabai",
  //   title: "Prediksi Harga Cabai",
  //   placeholder: true,
  //   year: "2024",
  //   role: { id: "ML Engineer", en: "ML Engineer" },
  //   stack: ["Python", "scikit-learn", "Pandas"],
  //   tagline: {
  //     id: "Model regresi untuk memprediksi harga komoditas.",
  //     en: "Regression model forecasting commodity prices.",
  //   },
  //   description: {
  //     id: "Eksperimen model time-series untuk memperkirakan harga cabai mingguan di pasar lokal.",
  //     en: "Time-series experiments forecasting weekly chili prices in local markets.",
  //   },
  //   visual: "chart",
  // },
  // {
  //   slug: "presensi-qr",
  //   title: "Presensi QR",
  //   placeholder: true,
  //   year: "2023",
  //   role: { id: "Fullstack Developer", en: "Fullstack Developer" },
  //   stack: ["Next.js", "TypeScript", "PostgreSQL"],
  //   tagline: {
  //     id: "Presensi kelas berbasis kode QR dinamis.",
  //     en: "Class attendance with rotating QR codes.",
  //   },
  //   description: {
  //     id: "Aplikasi presensi dengan QR yang berganti tiap 30 detik untuk mencegah titip absen.",
  //     en: "An attendance app with QR codes that rotate every 30 seconds to prevent proxy check-ins.",
  //   },
  //   visual: "mobile",
  // },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];
export const otherProjects = projects.filter((p) => p.slug !== featuredProject.slug);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
