# Portfolio — konsep "Cartographic"

Portfolio pribadi berbasis **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, dua bahasa (ID/EN), tema terang/gelap, sepenuhnya statis dan siap di-deploy ke Vercel.

---

## 1. Struktur folder

```
portfolio/
├── app/
│   ├── [lang]/                     # semua halaman ada di bawah /id dan /en
│   │   ├── layout.tsx              # <html>, font, metadata SEO, navbar, footer
│   │   ├── page.tsx                # halaman utama (menyusun semua section)
│   │   ├── not-found.tsx           # 404 di dalam situs
│   │   ├── opengraph-image.tsx     # gambar preview saat link dibagikan
│   │   └── projects/[slug]/page.tsx# halaman detail/studi kasus project
│   ├── global-not-found.tsx        # 404 untuk URL yang tidak dikenal
│   ├── globals.css                 # ← WARNA & token desain
│   ├── icon.svg                    # ← favicon
│   ├── sitemap.ts · robots.ts      # SEO
├── components/
│   ├── layout/                     # Navbar, Footer, ThemeToggle
│   ├── sections/                   # Hero, About, Skills, Projects, Journey, Contact (+ bagian interaktifnya)
│   ├── projects/                   # ProjectIndex, ProjectMedia, ProjectVisual, ScrollScale
│   ├── providers/                  # next-themes + Motion
│   └── ui/                         # SectionHeading, Reveal, ScrambleText, Contours, ButtonLink, Icons
├── data/                           # ← SEMUA ISI WEBSITE ADA DI SINI
│   ├── profile.ts                  # nama, intro, about, statistik, sosial media
│   ├── skills.ts                   # kartu kapabilitas & tech stack
│   ├── projects.ts                 # daftar project
│   ├── experience.ts               # pendidikan & pengalaman
│   └── ui.ts                       # teks tombol/label/judul section (ID & EN)
├── lib/                            # tipe, i18n, font, util, generator kontur
├── public/                         # gambar statis (screenshot, foto, CV)
└── next.config.ts                  # redirect "/" → "/id"
```

## 2. File penting

| File | Fungsi |
|---|---|
| `data/*.ts` | Isi konten. Ubah di sini, bukan di komponen. |
| `lib/types.ts` | Bentuk data (TypeScript akan memberi tahu jika ada field yang salah). |
| `lib/i18n.ts` | Daftar bahasa (`id`, `en`) dan helper `t()`. |
| `app/globals.css` | Token warna light/dark, animasi. |
| `lib/fonts.ts` | Font (Geist, di-host sendiri). |
| `lib/site.ts` | URL situs untuk SEO (otomatis di Vercel). |

## 3. Menjalankan secara lokal

Butuh **Node.js 20.9+**.

```bash
npm install
npm run dev
```
Buka http://localhost:3000 (otomatis diarahkan ke `/id`).

## 4. Build

```bash
npm run lint     # cek kualitas kode
npm run build    # build produksi
npm run start    # menjalankan hasil build secara lokal
```

## 5. Deploy ke Vercel

1. Push project ke GitHub:
   ```bash
   git init
   git add -A && git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
2. Buka https://vercel.com/new → **Import** repository tersebut.
3. Framework otomatis terdeteksi sebagai **Next.js**. Tidak perlu mengubah pengaturan apa pun → **Deploy**.
4. (Opsional) Jika memakai domain sendiri, tambahkan environment variable
   `NEXT_PUBLIC_SITE_URL=https://domainanda.com` di *Project Settings → Environment Variables*, lalu redeploy.
   Tanpa ini, URL produksi Vercel dipakai otomatis untuk sitemap & Open Graph.

## 6. Mengganti data portfolio

Semua teks ada di folder `data/`. Teks dua bahasa ditulis seperti ini:

```ts
intro: {
  id: "Teks Bahasa Indonesia",
  en: "English text",
},
```

- **Nama, status, intro, cerita, statistik, email, sosial media** → `data/profile.ts`
- **Kartu kapabilitas & tech stack** → `data/skills.ts`
  Ikon teknologi memakai nama dari [simpleicons.org](https://simpleicons.org) tanpa prefix `si`, dengan huruf pertama kapital (mis. `"Laravel"`, `"Nextdotjs"`, `"Postgresql"`).
- **Pendidikan & pengalaman** → `data/experience.ts`
- **Label tombol, judul section, teks kontak** → `data/ui.ts`
- **CV:** taruh file di `public/resume.pdf`, lalu aktifkan `resumeUrl: "/resume.pdf"` di `data/profile.ts`.

## 7. Mengganti gambar

- **Screenshot project:** simpan di `public/projects/`, mis. `public/projects/rumah-data-sendangsari.webp` (disarankan 1600×1000, format `.webp`), lalu isi di `data/projects.ts`:
  ```ts
  image: "/projects/rumah-data-sendangsari.webp",
  ```
  Selama `image` kosong, ilustrasi otomatis (sesuai `visual`: `dashboard`, `map`, `pos`, `chart`, `mobile`) yang tampil.
- **Foto profil:** simpan di `public/images/profile.jpg`, lalu isi `photo: "/images/profile.jpg"` di `data/profile.ts`. Foto akan muncul di section About.
- **Favicon:** ganti `app/icon.svg` (atau hapus dan taruh `app/icon.png`).
- **Gambar preview link (Open Graph):** diatur di `app/[lang]/opengraph-image.tsx`.

Semua gambar otomatis dioptimasi oleh `next/image` (AVIF/WebP, lazy loading).

## 8. Mengganti warna / font

**Warna** — `app/globals.css`, bagian paling atas:

```css
:root { --bg: #ededea; --ink: #111214; --accent: #ff5a1f; ... }  /* light */
.dark { --bg: #0e0f12; --ink: #ededea; --accent: #ff6b33; ... }  /* dark  */
```
Ganti `--accent` untuk mengubah warna aksen di seluruh situs (kursor heading, titik status, pin peta, timeline).
Jangan lupa menyamakan warna di `viewport.themeColor` pada `app/[lang]/layout.tsx` jika mengubah `--bg`.

**Font** — `lib/fonts.ts`. Contoh memakai Google Font lain:
```ts
import { Inter, JetBrains_Mono } from "next/font/google";
export const fontSans = Inter({ variable: "--font-geist-sans", subsets: ["latin"] });
export const fontMono = JetBrains_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
```
(Nama variabel CSS dibiarkan sama agar tidak perlu mengubah file lain.)

## 9. Menambahkan project baru

Tambahkan objek baru ke array `projects` di `data/projects.ts`:

```ts
{
  slug: "nama-project",            // dipakai di URL: /id/projects/nama-project
  title: "Nama Project",
  year: "2026",
  role: { id: "Fullstack Developer", en: "Fullstack Developer" },
  stack: ["Laravel", "MySQL"],
  tagline: { id: "Satu kalimat singkat.", en: "One short sentence." },
  description: { id: "Deskripsi 2–3 kalimat.", en: "2–3 sentence description." },
  image: "/projects/nama-project.webp",   // opsional
  visual: "dashboard",                     // ilustrasi jika image kosong
  demoUrl: "https://...",                  // opsional
  githubUrl: "https://github.com/...",     // opsional
  // featured: true,   → jadikan project unggulan (hanya satu)
  // caseStudy: {...}, → isi masalah/solusi/fitur untuk halaman detail
},
```

Halaman detail, sitemap, dan daftar project akan terbarui otomatis. Hapus project contoh (yang memiliki `placeholder: true`) jika sudah tidak diperlukan.

---

### Catatan teknis

- **Aksesibilitas:** skip link, fokus terlihat, tab yang bisa dikendalikan keyboard, `aria-*` pada menu & toggle, animasi mati otomatis jika pengguna mengaktifkan *reduce motion*.
- **Performa:** semua halaman di-render statis (SSG); konten utama adalah Server Components; animasi hanya memakai `transform`/`opacity`; Motion dimuat dengan `LazyMotion`.
- **Bahasa default** diatur di `next.config.ts` (redirect `/` → `/id`).
