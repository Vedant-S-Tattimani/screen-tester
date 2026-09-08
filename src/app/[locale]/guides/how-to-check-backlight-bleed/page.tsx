import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { ArrowRight, Moon } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides.backlightBleedConcept" });
  return generateSeoMetadata(
    "/guides/how-to-check-backlight-bleed",
    t("metaTitle"),
    t("metaDescription"),
    locale
  );
}

export default async function BacklightBleedGuidePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides.backlightBleedConcept" });

  const breadcrumbs = [
    { label: t("breadcrumbsGuides"), href: "/guides" },
    { label: t("breadcrumbsTitle"), href: "/guides/how-to-check-backlight-bleed" },
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <div className="border border-border/80 rounded-2xl p-6 bg-card">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 mb-3">
            {t("backlightBleed.badge")}
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            {t("backlightBleed.title")}
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {t("backlightBleed.desc")}
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>{t("backlightBleed.behaviorLabel")}:</strong> {t("backlightBleed.behavior")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>{t("backlightBleed.appearanceLabel")}:</strong> {t("backlightBleed.appearance")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>{t("backlightBleed.actionLabel")}:</strong> {t("backlightBleed.action")}</span>
            </li>
          </ul>
        </div>

        <div className="border border-border/80 rounded-2xl p-6 bg-card">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 mb-3">
            {t("ipsGlow.badge")}
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            {t("ipsGlow.title")}
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {t("ipsGlow.desc")}
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>{t("ipsGlow.behaviorLabel")}:</strong> {t("ipsGlow.behavior")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>{t("ipsGlow.appearanceLabel")}:</strong> {t("ipsGlow.appearance")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>{t("ipsGlow.actionLabel")}:</strong> {t("ipsGlow.action")}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border border-border/80 rounded-2xl p-6 sm:p-8 bg-muted/20 my-10 space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Moon className="w-5 h-5 text-indigo-500" />
          {t("isolationMethodTitle")}
        </h3>
        <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal pl-5">
          {t.raw("isolationSteps").map((step: string, index: number) => (
            <li key={index}>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12 pt-8 border-t border-border/60">
        <h3 className="text-base font-semibold text-foreground mb-4">
          {t("testsTitle")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/tests/backlight-bleed-test"
            className="p-4 border border-border/70 rounded-xl hover:border-foreground/30 transition-all flex items-center justify-between group"
          >
            <div>
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {t("backlightBleedTestTitle")}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("backlightBleedTestDesc")}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/tests/uniformity-test"
            className="p-4 border border-border/70 rounded-xl hover:border-foreground/30 transition-all flex items-center justify-between group"
          >
            <div>
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {t("uniformityTestTitle")}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("uniformityTestDesc")}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
