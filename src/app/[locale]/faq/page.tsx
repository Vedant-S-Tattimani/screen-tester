import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { FaqClient } from "./FaqClient";
import { Link } from "@/i18n/routing";
import { ArrowRight, HelpCircle } from "lucide-react";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Faq" });
  return generateSeoMetadata("/faq", t("metaTitle"), t("metaDescription"), locale);
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Faq" });

  return (
    <div className="flex-1 bg-white text-gray-950">
      <div className="max-w-[900px] mx-auto py-16 sm:py-20 px-6 sm:px-10">
        
        {/* Header */}
        <div className="mb-12 text-center sm:text-left">
          <div className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-gray-500 mb-3 select-none">
            {t("eyebrow")}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 mb-4">
            {t("title")}
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Interactive Accordion */}
        <FaqClient />

        {/* Footer Navigation Back to Tests & Knowledge Base */}
        <div className="mt-16 pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-600">
          <Link href="/knowledge-base" className="hover:text-gray-950 flex items-center gap-1.5 transition-colors">
            <HelpCircle className="w-4 h-4" />
            <span>{t("links.knowledgeBase")}</span>
          </Link>
          <Link href="/tests" className="hover:text-gray-950 flex items-center gap-1.5 transition-colors">
            <span>{t("links.testLibrary")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
