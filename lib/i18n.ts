export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "id";

export const localeNames: Record<Locale, string> = {
  id: "Bahasa Indonesia",
  en: "English",
};

/** Kode OpenGraph per bahasa */
export const ogLocale: Record<Locale, string> = {
  id: "id_ID",
  en: "en_US",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Ambil teks sesuai bahasa aktif */
export function t<T>(value: Record<Locale, T>, lang: Locale): T {
  return value[lang];
}
