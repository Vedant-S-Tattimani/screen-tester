import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides.pixelDefectsConcept" });
  return generateSeoMetadata(
    "/guides/dead-pixel-vs-stuck-pixel",
    t("metaTitle"),
    t("metaDescription"),
    locale
  );
}

export default async function DeadPixelVsStuckPixelPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides.pixelDefectsConcept" });

  const breadcrumbs = [
    { label: t("breadcrumbsGuides"), href: "/guides" },
    { label: t("breadcrumbsTitle"), href: "/guides/dead-pixel-vs-stuck-pixel" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8 w-full flex-1">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-8 mt-2">
        <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3">
          {t("eyebrow")}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {t("intro")}
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <div className="border border-border/80 rounded-2xl p-6 bg-card">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300 mb-3">
            {t("deadPixel.badge")}
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">{t("deadPixel.title")}</h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {t("deadPixel.desc")}
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span><strong>{t("deadPixel.appearanceLabel")}:</strong> {t("deadPixel.appearance")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span><strong>{t("deadPixel.causeLabel")}:</strong> {t("deadPixel.cause")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span><strong>{t("deadPixel.recoveryLabel")}:</strong> {t("deadPixel.recovery")}</span>
            </li>
          </ul>
        </div>

        <div className="border border-border/80 rounded-2xl p-6 bg-card">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 mb-3">
            {t("stuckPixel.badge")}
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">{t("stuckPixel.title")}</h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {t("stuckPixel.desc")}
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>{t("stuckPixel.appearanceLabel")}:</strong> {t("stuckPixel.appearance")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>{t("stuckPixel.causeLabel")}:</strong> {t("stuckPixel.cause")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>{t("stuckPixel.recoveryLabel")}:</strong> {t("stuckPixel.recovery")}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ISO Standard Info */}
      <div className="border border-border/80 rounded-2xl p-6 sm:p-8 bg-muted/20 my-10 space-y-4">
        <h3 className="text-lg font-bold text-foreground">{t("isoTitle")}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("isoP1")}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("isoP2")}
        </p>
      </div>

      {/* Recommended Diagnostic Tests */}
      <div className="mt-12 pt-8 border-t border-border/60">
        <h3 className="text-base font-semibold text-foreground mb-4">{t("testsTitle")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/tests/dead-pixel-test"
            className="p-4 border border-border/70 rounded-xl hover:border-foreground/30 transition-all flex items-center justify-between group"
          >
            <div>
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {t("deadPixelTestTitle")}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("deadPixelTestDesc")}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/tests/stuck-pixel-test"
            className="p-4 border border-border/70 rounded-xl hover:border-foreground/30 transition-all flex items-center justify-between group"
          >
            <div>
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {t("stuckPixelTestTitle")}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("stuckPixelTestDesc")}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
