import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { generateSeoMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedTests } from "@/components/layout/RelatedTests";
import { ArrowRight, Eye, ShieldAlert, CheckCircle2, AlertTriangle, Layers } from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Guides.viewingAngles" });
  return generateSeoMetadata(
    "/guides/monitor-viewing-angles-explained",
    t("metaTitle"),
    t("metaDescription"), locale);
}

export default async function ViewingAnglesGuidePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Guides.viewingAngles" });

  const breadcrumbs = [
    { label: t("breadcrumbsGuides"), href: "/guides" },
    { label: t("breadcrumbsViewingAngles"), href: "/guides/monitor-viewing-angles-explained" }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8 w-full flex-1">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header & Intro */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-[0.15em] bg-blue-50 text-blue-700 border border-blue-200/60 mb-4">
          <Eye className="w-3.5 h-3.5" />
          <span>{t("badge")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {t("intro")}
        </p>
      </div>

      {/* Technical Honesty Banner */}
      <div className="my-8 rounded-2xl p-5 sm:p-6 bg-slate-50 border border-slate-200/80 text-slate-800 flex items-start gap-4">
        <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm leading-relaxed">
          <strong className="font-semibold block text-slate-900 mb-1">
            {t("noticeTitle")}
          </strong>
          <span>{t("keyTakeaway")}</span>
        </div>
      </div>

      {/* Panel Technologies Comparison */}
      <div className="my-12">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {t("panelsTitle")}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t("panelsSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* IPS */}
          <div className="border border-border/80 rounded-2xl p-6 bg-card flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
                {t("ipsTag")}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{t("ipsTitle")}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("ipsDesc")}
              </p>
            </div>
          </div>

          {/* VA */}
          <div className="border border-border/80 rounded-2xl p-6 bg-card flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 mb-3">
                {t("vaTag")}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{t("vaTitle")}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("vaDesc")}
              </p>
            </div>
          </div>

          {/* TN */}
          <div className="border border-border/80 rounded-2xl p-6 bg-card flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 mb-3">
                {t("tnTag")}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{t("tnTitle")}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("tnDesc")}
              </p>
            </div>
          </div>

          {/* OLED */}
          <div className="border border-border/80 rounded-2xl p-6 bg-card flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-900 mb-3">
                {t("oledTag")}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{t("oledTitle")}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("oledDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What to Look For Off-Axis */}
      <div className="my-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
          {t("effectsTitle")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-border/70 bg-card">
            <h3 className="font-semibold text-sm text-foreground mb-2">
              {t("effects.colorShiftTitle")}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("effects.colorShiftDesc")}
            </p>
          </div>
          <div className="p-5 rounded-xl border border-border/70 bg-card">
            <h3 className="font-semibold text-sm text-foreground mb-2">
              {t("effects.gammaShiftTitle")}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("effects.gammaShiftDesc")}
            </p>
          </div>
          <div className="p-5 rounded-xl border border-border/70 bg-card">
            <h3 className="font-semibold text-sm text-foreground mb-2">
              {t("effects.blackLevelTitle")}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("effects.blackLevelDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* How to Perform Inspection */}
      <div className="my-12 p-6 sm:p-8 rounded-2xl border border-border/80 bg-muted/20">
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          <span>{t("howToTestTitle")}</span>
        </h2>
        <ol className="space-y-3 text-xs sm:text-sm text-foreground/90 list-decimal pl-5">
          {t.raw("howToTestSteps").map((step: string, idx: number) => (
            <li key={idx} className="leading-relaxed">
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Browser Capabilities vs Hardware Reality */}
      <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 rounded-xl border border-emerald-200/80 bg-emerald-50/40">
          <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t("browserCanDoTitle")}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {t("browserCanDo")}
          </p>
        </div>
        <div className="p-5 rounded-xl border border-amber-200/80 bg-amber-50/40">
          <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs uppercase tracking-wider mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{t("browserCannotDoTitle")}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {t("browserCannotDo")}
          </p>
        </div>
      </div>

      {/* Direct Interactive Test CTA */}
      <div className="my-12 p-8 rounded-2xl bg-gray-950 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-gray-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
            {t("ctaTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed">
            {t("ctaSubtitle")}
          </p>
        </div>
        <Link
          href="/tests/viewing-angle-test"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-950 font-semibold text-sm hover:bg-gray-100 transition-all shrink-0 shadow-sm"
        >
          <span>{t("ctaButton")}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Related Tests */}
      <RelatedTests testId="viewing-angle-test" />
    </div>
  );
}
