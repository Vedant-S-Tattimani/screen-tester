import { routing } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export const OG_LOCALES: Record<string, string> = {
  en: "en_US",
  hi: "hi_IN",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
  pt: "pt_BR",
  ja: "ja_JP",
  ko: "ko_KR",
};

export function getBaseUrl(): string {
  // 1. Explicit environment variable configured (e.g. production NEXT_PUBLIC_APP_URL=https://screen-tester.com)
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/+$/, '');
  }

  // 2. Fallback production domain (intended Cloudflare deployment domain)
  // Ensures canonical, hreflang, Open Graph, sitemap, and robots URLs always
  // use the valid canonical production domain instead of localhost or old domains.
  return 'https://screen-tester.com';
}

export const BASE_URL = getBaseUrl();

export async function generateSeoMetadata(
  path: string,
  title: string,
  description: string,
  locale?: string
) {
  let activeLocale = locale;
  if (!activeLocale) {
    try {
      activeLocale = await getLocale();
    } catch {
      activeLocale = "en";
    }
  }

  if (!routing.locales.includes(activeLocale as (typeof routing.locales)[number])) {
    activeLocale = "en";
  }

  const baseUrl = getBaseUrl();
  const cleanPath = path ? path.replace(/^\/+/, '').replace(/\/+$/, '') : '';
  const pathSuffix = cleanPath ? `/${cleanPath}` : '';

  const alternates = routing.locales.reduce((acc, loc) => {
    acc[loc] = `${baseUrl}/${loc}${pathSuffix}`;
    return acc;
  }, {} as Record<string, string>);

  // Add x-default pointing to default locale (en)
  alternates["x-default"] = `${baseUrl}/en${pathSuffix}`;

  const canonicalUrl = `${baseUrl}/${activeLocale}${pathSuffix}`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Screen Tester",
      locale: OG_LOCALES[activeLocale] || activeLocale,
      alternateLocale: routing.locales
        .filter((loc) => loc !== activeLocale)
        .map((loc) => OG_LOCALES[loc] || loc),
      type: "website" as const,
      images: [
        {
          url: "/logo.png",
          width: 1024,
          height: 1024,
          alt: "Screen Tester Logo",
        },
      ],
    },
    twitter: {
      card: "summary" as const,
      title,
      description,
      images: ["/logo.png"],
    }
  };
}
