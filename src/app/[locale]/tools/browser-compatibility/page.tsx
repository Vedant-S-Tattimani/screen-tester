import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { generateSeoMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BrowserCompatibilityClient } from "./BrowserCompatibilityClient";
import { Cpu } from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BrowserCompatibility" });
  return generateSeoMetadata(
    "/tools/browser-compatibility",
    t("metaTitle"),
    t("metaDescription"), locale);
}

export default async function BrowserCompatibilityPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "BrowserCompatibility" });
  const tBreadcrumbs = await getTranslations({ locale, namespace: "Breadcrumbs" });

  const breadcrumbs = [
    { label: tBreadcrumbs("home"), href: "/" },
    { label: tBreadcrumbs("tools"), href: "/tools" },
    { label: t("header.title"), href: "/tools/browser-compatibility" }
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16 text-slate-900 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-blue-600">
            <Cpu className="w-4 h-4" />
            <span>{t("header.eyebrow")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
            {t("header.title")}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t("header.subtitle")}
          </p>
        </div>

        {/* Client Interactive Matrix & Live Probing */}
        <BrowserCompatibilityClient />

      </div>
    </div>
  );
}
