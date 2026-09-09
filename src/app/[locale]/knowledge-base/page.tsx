import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { generateSeoMetadata, getBaseUrl } from "@/lib/seo";
import { KnowledgeBaseIndexClient } from "@/components/knowledge-base/KnowledgeBaseIndexClient";
import { KNOWLEDGE_ARTICLES } from "@/data/knowledgeBase";
import { Wrench, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "KnowledgeBase" });

  return generateSeoMetadata(
    "/knowledge-base",
    t("metaTitle"),
    t("metaDescription"),
    locale
  );
}

export default async function KnowledgeBasePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "KnowledgeBase" });
  const baseUrl = getBaseUrl();

  const breadcrumbs = [
    { label: t("header.title"), href: "/knowledge-base" }
  ];

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("header.title"),
    description: t("header.subtitle"),
    url: `${baseUrl}/${locale}/knowledge-base`,
    hasPart: KNOWLEDGE_ARTICLES.map((article) => ({
      "@type": "Article",
      name: article.title,
      description: article.description,
      url: `${baseUrl}/${locale}/knowledge-base/${article.slug}`
    }))
  };

  return (
    <div className="flex-1 bg-white text-gray-950 font-sans">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <div className="max-w-[1360px] mx-auto py-10 sm:py-16 px-6 sm:px-10 lg:px-12 space-y-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-blue-600 select-none">
            {t("header.eyebrow")}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-950">
            {t("header.title")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
            {t("header.subtitle")}
          </p>
        </div>

        {/* Quick Diagnostic / System Hub Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-200/90 rounded-2xl p-4 sm:p-5 bg-gray-50/60">
          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-gray-200/70">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-gray-950 mb-1">
                {t("hub.troubleshootingTitle")}
              </h2>
              <p className="text-[11.5px] text-gray-500 leading-relaxed mb-2">
                {t("hub.troubleshootingDesc")}
              </p>
              <Link 
                href="/knowledge-base/troubleshooting"
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>{t("hub.troubleshootingAction")}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-gray-200/70">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-gray-950 mb-1">
                {t("hub.testsTitle")}
              </h2>
              <p className="text-[11.5px] text-gray-500 leading-relaxed mb-2">
                {t("hub.testsDesc")}
              </p>
              <Link 
                href="/tests"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <span>{t("hub.testsAction")}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-gray-200/70">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-gray-950 mb-1">
                {t("hub.compatibilityTitle")}
              </h2>
              <p className="text-[11.5px] text-gray-500 leading-relaxed mb-2">
                {t("hub.compatibilityDesc")}
              </p>
              <Link 
                href="/tools/browser-compatibility"
                className="text-xs font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1"
              >
                <span>{t("hub.compatibilityAction")}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Interactive Search & Filterable Articles */}
        <KnowledgeBaseIndexClient
          translations={{
            searchPlaceholder: t("index.searchPlaceholder"),
            filterAll: t("index.filterAll"),
            noResultsTitle: t("index.noResultsTitle"),
            noResultsSubtitle: t("index.noResultsSubtitle"),
            readArticle: t("index.readArticle"),
            minRead: t("index.minRead")
          }}
        />

      </div>
    </div>
  );
}
