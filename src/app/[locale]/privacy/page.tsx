import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { 
  ShieldCheck, 
  Database, 
  Lock, 
  Maximize, 
  ArrowRight,
  Mail
} from "lucide-react";

import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  
  return generateSeoMetadata("/privacy", t("metaTitle"), t("metaDescription"), locale);
}

export default async function PrivacyPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return (
    <div className="flex-1 bg-white text-gray-950">
      <div className="max-w-[900px] mx-auto py-12 sm:py-16 px-6 sm:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-gray-500 select-none">
              {t("eyebrow")}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs font-mono text-gray-400">
              {t("lastUpdated")}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-950 mb-4">
            {t("title")}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
            {t("description")}
          </p>
        </div>

        {/* Section 1: Zero Remote Data Collection */}
        <div className="border border-gray-200/90 rounded-2xl p-6 sm:p-8 bg-white mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-950 mb-2">
                {t("noCollectionTitle")}
              </h2>
              <p className="text-xs sm:text-[14px] text-gray-600 leading-relaxed">
                {t("noCollectionText")}
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Local Storage Usage */}
        <div className="border border-gray-200/90 rounded-2xl p-6 sm:p-8 bg-white mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-950 mb-2">
                {t("localStorageTitle")}
              </h2>
              <p className="text-xs sm:text-[14px] text-gray-600 leading-relaxed mb-4">
                {t("localStorageText")}
              </p>
            </div>
          </div>

          <div className="space-y-3 sm:pl-14">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs sm:text-[13px] text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-950 block mb-1">
                Active Inspection & Observation Data (localStorage)
              </span>
              Stores your self-reported ratings (Pass, Check, Issue), notes, and placed pixel defect pin coordinates so your checklist remains accessible across refreshes.
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs sm:text-[13px] text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-950 block mb-1">
                Workflow Sequence (sessionStorage)
              </span>
              Temporarily tracks your current test index during multi-step inspection workflows. This is purged automatically when you close the tab.
            </div>

            <p className="text-xs text-gray-500 pt-2 leading-relaxed">
              {t("localStorageClear")}
            </p>
          </div>
        </div>

        {/* Section 3: No Cookies */}
        <div className="border border-gray-200/90 rounded-2xl p-6 sm:p-8 bg-white mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-950 mb-2">
                {t("cookiesTitle")}
              </h2>
              <p className="text-xs sm:text-[14px] text-gray-600 leading-relaxed">
                {t("cookiesText")}
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Permissions */}
        <div className="border border-gray-200/90 rounded-2xl p-6 sm:p-8 bg-white mb-12">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center shrink-0 mt-0.5">
              <Maximize className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-950 mb-2">
                {t("permissionsTitle")}
              </h2>
              <p className="text-xs sm:text-[14px] text-gray-600 leading-relaxed">
                {t("permissionsText")}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Questions Card */}
        <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-gray-950">
              Questions About Privacy?
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Contact our open-source maintainers or review the source code directly.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-gray-950 hover:bg-black text-white px-4 py-2 rounded-lg transition-colors shrink-0"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Maintainer</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
