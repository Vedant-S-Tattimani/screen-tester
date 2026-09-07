import { routing } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

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

  const baseUrl = "https://monitortester.com";
  
  const alternates = routing.locales.reduce((acc, loc) => {
    acc[loc] = `${baseUrl}/${loc}${path}`;
    return acc;
  }, {} as Record<string, string>);

  // Add x-default
  alternates["x-default"] = `${baseUrl}/en${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${activeLocale}${path}`,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${activeLocale}${path}`,
      siteName: "Monitor Tester",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    }
  };
}
