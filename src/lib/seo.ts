import { routing } from "@/i18n/routing";

export function generateSeoMetadata(
  path: string,
  title: string,
  description: string
) {
  const baseUrl = "https://monitortester.com";
  
  const alternates = routing.locales.reduce((acc, locale) => {
    acc[locale] = `${baseUrl}/${locale}${path}`;
    return acc;
  }, {} as Record<string, string>);

  // Add x-default
  alternates["x-default"] = `${baseUrl}/en${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/en${path}`, // We use English as canonical for the general path or we could use the localized path
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/en${path}`,
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
