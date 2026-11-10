/**
 * URL situs untuk metadata, sitemap, dan Open Graph.
 * - Isi NEXT_PUBLIC_SITE_URL jika memakai domain sendiri.
 * - Di Vercel, URL production terdeteksi otomatis.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
