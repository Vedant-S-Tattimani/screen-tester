"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { getArticleByTestId } from "@/data/knowledgeBase";
import { BookOpen, ArrowRight } from "lucide-react";

export function KnowledgeBaseCallout({ testId, className = "" }: { testId: string; className?: string }) {
  const t = useTranslations("TestWrapper");
  const locale = useLocale();
  const kbArticle = getArticleByTestId(testId, locale);

  if (!kbArticle) return null;

  return (
    <div className={`w-full p-4 bg-blue-50/50 border border-blue-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs ${className}`}>
      <div className="flex items-center gap-2.5 text-blue-950">
        <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
        <span>
          {t("kbCalloutPrefix")} <strong>{kbArticle.title}</strong>
        </span>
      </div>
      <Link
        href={`/knowledge-base/${kbArticle.slug}`}
        className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-900 hover:underline shrink-0"
      >
        <span>{t("kbCalloutAction")}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
