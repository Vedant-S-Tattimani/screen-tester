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
  const t = await getTranslations({ locale, namespace: "Guides.ghostingConcept" });
  return generateSeoMetadata(
    "/guides/how-to-check-monitor-ghosting",
    t("metaTitle"),
    t("metaDescription"),
    locale
  );
}

export default async function MonitorGhostingGuidePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides.ghostingConcept" });

  const breadcrumbs = [
    { label: t("breadcrumbsGuides"), href: "/guides" },
    { label: t("breadcrumbsTitle"), href: "/guides/how-to-check-monitor-ghosting" },
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
          <h2 className="text-xl font-bold text-foreground mb-2">
            {t("standardGhosting.title")}
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {t("standardGhosting.desc")}
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span><strong>{t("standardGhosting.causeLabel")}:</strong> {t("standardGhosting.cause")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span><strong>{t("standardGhosting.solutionLabel")}:</strong> {t("standardGhosting.solution")}</span>
            </li>
          </ul>
        </div>

        <div className="border border-border/80 rounded-2xl p-6 bg-card">
          <h2 className="text-xl font-bold text-foreground mb-2">
            {t("inverseGhosting.title")}
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {t("inverseGhosting.desc")}
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span><strong>{t("inverseGhosting.causeLabel")}:</strong> {t("inverseGhosting.cause")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span><strong>{t("inverseGhosting.solutionLabel")}:</strong> {t("inverseGhosting.solution")}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border border-border/80 rounded-2xl p-6 sm:p-8 bg-muted/20 my-10 space-y-4">
        <h3 className="text-lg font-bold text-foreground">
          {t("howToTestTitle")}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("howToTestP1")}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("howToTestP2")}
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-border/60">
        <h3 className="text-base font-semibold text-foreground mb-4">
          {t("testsTitle")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/tests/ghosting-test"
            className="p-4 border border-border/70 rounded-xl hover:border-foreground/30 transition-all flex items-center justify-between group"
          >
            <div>
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {t("ghostingTestTitle")}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("ghostingTestDesc")}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/tests/refresh-rate-test"
            className="p-4 border border-border/70 rounded-xl hover:border-foreground/30 transition-all flex items-center justify-between group"
          >
            <div>
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {t("refreshRateTestTitle")}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("refreshRateTestDesc")}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
