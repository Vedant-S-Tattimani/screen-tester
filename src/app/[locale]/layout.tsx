import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ExtensionCleanup } from "@/components/ExtensionCleanup";
import { getBaseUrl, OG_LOCALES } from "@/lib/seo";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = getBaseUrl();

  const languages: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    languages[loc] = `${baseUrl}/${loc}`;
  });
  languages['x-default'] = `${baseUrl}/en`;

  const canonicalUrl = `${baseUrl}/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s | Screen Tester',
      default: t('title'),
    },
    description: t('description'),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonicalUrl,
      siteName: 'Screen Tester',
      locale: OG_LOCALES[locale] || locale,
      alternateLocale: routing.locales
        .filter((loc) => loc !== locale)
        .map((loc) => OG_LOCALES[loc] || loc),
      type: 'website',
      images: [
        {
          url: '/logo.png',
          width: 1024,
          height: 1024,
          alt: 'Screen Tester Logo',
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: t('title'),
      description: t('description'),
      images: ['/logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <Script
          id="extension-guard"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function isExt(s) {
                  return typeof s === 'string' && (
                    s.indexOf('chrome-extension://') !== -1 ||
                    s.indexOf('moz-extension://') !== -1 ||
                    s.indexOf('safari-extension://') !== -1 ||
                    s.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1 ||
                    s.indexOf('M_ID') !== -1
                  );
                }
                window.addEventListener('error', function(e) {
                  if (isExt(e.filename) || isExt(e.message) || (e.error && isExt(e.error.stack))) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                }, true);
                window.addEventListener('unhandledrejection', function(e) {
                  var r = e.reason;
                  if (r && (isExt(r.message) || isExt(r.stack) || isExt(String(r)))) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                }, true);
              })();
            `
          }}
        />
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-DHGBWM8X0R"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DHGBWM8X0R');
            `,
          }}
        />
        <ExtensionCleanup />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
