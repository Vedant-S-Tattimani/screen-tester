import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { 
  FileText, 
  AlertTriangle, 
  HelpCircle, 
  Cpu, 
  ShieldAlert, 
  Code,
  ArrowRight
} from "lucide-react";

import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });
  
  return generateSeoMetadata("/terms", t("metaTitle"), t("metaDescription"), locale);
}

export default async function TermsPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Terms" });

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

        {/* Terms Sections List */}
        <div className="space-y-6 mb-12">
          
          {/* 1. Acceptance */}
          <section className="border border-gray-200/90 rounded-2xl p-6 sm:p-7 bg-white">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 shrink-0 mt-0.5">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-950 mb-2">
                  1. {t("acceptanceTitle")}
                </h2>
                <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed">
                  {t("acceptanceText")}
                </p>
              </div>
            </div>
          </section>

          {/* 2. Visual Scope */}
          <section className="border border-gray-200/90 rounded-2xl p-6 sm:p-7 bg-white">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 shrink-0 mt-0.5">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-950 mb-2">
                  2. {t("natureOfServiceTitle")}
                </h2>
                <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed">
                  {t("natureOfServiceText")}
                </p>
              </div>
            </div>
          </section>

          {/* 3. Hardware Limitation */}
          <section className="border border-gray-200/90 rounded-2xl p-6 sm:p-7 bg-white">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-950 mb-2">
                  3. {t("noCalibrationTitle")}
                </h2>
                <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed">
                  {t("noCalibrationText")}
                </p>
              </div>
            </div>
          </section>

          {/* 4. Disclaimer of Warranties */}
          <section className="border border-gray-200/90 rounded-2xl p-6 sm:p-7 bg-white">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 shrink-0 mt-0.5">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-950 mb-2">
                  4. {t("disclaimerTitle")}
                </h2>
                <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed">
                  {t("disclaimerText")}
                </p>
              </div>
            </div>
          </section>

          {/* 5. Manufacturer Policies */}
          <section className="border border-gray-200/90 rounded-2xl p-6 sm:p-7 bg-white">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 shrink-0 mt-0.5">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-950 mb-2">
                  5. {t("manufacturerTitle")}
                </h2>
                <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed">
                  {t("manufacturerText")}
                </p>
              </div>
            </div>
          </section>

          {/* 6. Open Source License */}
          <section className="border border-gray-200/90 rounded-2xl p-6 sm:p-7 bg-white">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 shrink-0 mt-0.5">
                <Code className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-950 mb-2">
                  6. {t("openSourceTitle")}
                </h2>
                <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed mb-3">
                  {t("openSourceText")}
                </p>
                <a
                  href="https://github.com/Vedant-S-Tattimani/screen-tester"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-gray-950 hover:underline inline-flex items-center gap-1"
                >
                  <span>View Repository & MIT License</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
