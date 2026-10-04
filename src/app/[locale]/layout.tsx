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
      <head>
        <Script
          id="extension-error-handler"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                function isExtensionError(val) {
                  if (!val) return false;
                  var s = '';
                  try {
                    if (typeof val === 'string') {
                      s = val;
                    } else if (val instanceof Error) {
                      s = (val.name || '') + ' ' + (val.message || '') + ' ' + (val.stack || '');
                    } else if (typeof val === 'object') {
                      s = (val.message || '') + ' ' + (val.filename || '') + ' ' + (val.source || '') + ' ' + (val.error && val.error.stack ? val.error.stack : '') + ' ' + JSON.stringify(val);
                    } else {
                      s = String(val);
                    }
                  } catch (e) {
                    s = String(val);
                  }
                  return (
                    s.indexOf('chrome-extension://') !== -1 ||
                    s.indexOf('moz-extension://') !== -1 ||
                    s.indexOf('safari-extension://') !== -1 ||
                    s.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1 ||
                    s.indexOf('M_ID') !== -1 ||
                    s.indexOf('bis_skin_checked') !== -1 ||
                    s.indexOf('bis_register') !== -1 ||
                    s.indexOf('executors/') !== -1 ||
                    s.indexOf('__processed_') !== -1
                  );
                }

                window.addEventListener('error', function (e) {
                  if (isExtensionError(e.filename) || isExtensionError(e.message) || isExtensionError(e.error)) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return true;
                  }
                }, true);

                window.addEventListener('unhandledrejection', function (e) {
                  if (isExtensionError(e.reason)) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return true;
                  }
                }, true);

                var originalAddEventListener = window.addEventListener;
                window.addEventListener = function (type, listener, options) {
                  if ((type === 'error' || type === 'unhandledrejection') && typeof listener === 'function') {
                    var wrapped = function (event) {
                      if (type === 'error' && (isExtensionError(event.filename) || isExtensionError(event.message) || isExtensionError(event.error))) {
                        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                        if (event.preventDefault) event.preventDefault();
                        return;
                      }
                      if (type === 'unhandledrejection' && isExtensionError(event.reason)) {
                        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                        if (event.preventDefault) event.preventDefault();
                        return;
                      }
                      return listener.apply(this, arguments);
                    };
                    return originalAddEventListener.call(this, type, wrapped, options);
                  }
                  return originalAddEventListener.apply(this, arguments);
                };

                var customOnError = null;
                try {
                  Object.defineProperty(window, 'onerror', {
                    configurable: true,
                    enumerable: true,
                    get: function () { return customOnError; },
                    set: function (fn) {
                      customOnError = function (msg, url, line, col, err) {
                        if (isExtensionError(msg) || isExtensionError(url) || isExtensionError(err)) {
                          return true;
                        }
                        if (typeof fn === 'function') {
                          return fn.apply(this, arguments);
                        }
                      };
                    }
                  });
                } catch (err) {
                  window.onerror = function (msg, url, line, col, err) {
                    if (isExtensionError(msg) || isExtensionError(url) || isExtensionError(err)) return true;
                  };
                }

                var originalConsoleError = console.error;
                console.error = function () {
                  for (var i = 0; i < arguments.length; i++) {
                    if (isExtensionError(arguments[i])) return;
                  }
                  return originalConsoleError.apply(console, arguments);
                };

                if (typeof document !== 'undefined' && window.MutationObserver) {
                  var cleanupPortals = function () {
                    var portals = document.querySelectorAll('nextjs-portal');
                    portals.forEach(function (portal) {
                      var text = (portal.textContent || '') + (portal.shadowRoot ? portal.shadowRoot.textContent || '' : '');
                      if (isExtensionError(text)) {
                        portal.remove();
                      }
                    });
                  };
                  var obs = new MutationObserver(cleanupPortals);
                  obs.observe(document.documentElement, { childList: true, subtree: true });
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9129727900183428"
          crossOrigin="anonymous"
          strategy="afterInteractive"
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
