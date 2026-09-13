import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { generateSeoMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TroubleshootingClient } from "./TroubleshootingClient";
import { getTroubleshootingTopics } from "@/data/troubleshooting";
import { Wrench } from "lucide-react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Troubleshooting" });
  return generateSeoMetadata(
    "/knowledge-base/troubleshooting",
    t("metaTitle"),
    t("metaDescription"),
    locale
  );
}

export default async function TroubleshootingPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Troubleshooting" });
  const tBreadcrumbs = await getTranslations({ locale, namespace: "Breadcrumbs" });
  const topics = getTroubleshootingTopics(locale);

  const breadcrumbs = [
    { label: tBreadcrumbs("home"), href: "/" },
    { label: tBreadcrumbs("knowledgeBase"), href: "/knowledge-base" },
    { label: t("header.title"), href: "/knowledge-base/troubleshooting" }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: topics.map((topic) => ({
      "@type": "Question",
      name: topic.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${topic.symptom} Possible causes: ${topic.possibleCauses.slice(0, 3).join("; ")}. Recommended checks: ${topic.checks.slice(0, 2).join("; ")}.`
      }
    }))
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16 text-slate-900 font-sans">
      {/* Schema.org FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-blue-600">
            <Wrench className="w-4 h-4" />
            <span>{t("header.eyebrow")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
            {t("header.title")}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t("header.subtitle")}
          </p>
        </div>

        {/* Client Interactive Troubleshooting Guide */}
        <TroubleshootingClient topics={topics} />

      </div>
    </div>
  );
}
