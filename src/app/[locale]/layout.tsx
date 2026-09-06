import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: {
      template: `%s | ${t('title')}`,
      default: t('title'),
    },
    description: t('description'),
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

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof window==='undefined')return;try{var c=console.error;Object.defineProperty(console,'error',{configurable:true,enumerable:true,get:function(){return function(){var a=Array.prototype.slice.call(arguments);var s='';for(var i=0;i<a.length;i++){try{s+=' '+(typeof a[i]==='object'&&a[i]!==null?JSON.stringify(a[i]):String(a[i]))}catch(e){s+=' '+String(a[i])}}if(s.indexOf('bis_skin_checked')!==-1||s.indexOf('bis_register')!==-1||s.indexOf('__processed_')!==-1){return}return c.apply(console,a)}},set:function(f){c=f}})}catch(e){}try{var o=new MutationObserver(function(m){for(var i=0;i<m.length;i++){if(m[i].type==='attributes'&&(m[i].attributeName==='bis_skin_checked'||m[i].attributeName==='bis_register')){m[i].target.removeAttribute(m[i].attributeName)}}});if(document.documentElement){o.observe(document.documentElement,{attributes:true,subtree:true,attributeFilter:['bis_skin_checked','bis_register']})}}catch(e){}})();`
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
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
