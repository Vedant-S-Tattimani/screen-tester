import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { 
  Bug, 
  GitPullRequest, 
  Mail, 
  HelpCircle, 
  ExternalLink,
  ArrowRight
} from "lucide-react";

import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  
  return generateSeoMetadata("/contact", t("metaTitle"), t("metaDescription"), locale);
}

export default async function ContactPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <div className="flex-1 bg-white text-gray-950">
      <div className="max-w-[900px] mx-auto py-12 sm:py-16 px-6 sm:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-gray-500 mb-3 select-none">
            {t("eyebrow")}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-950 mb-4">
            {t("title")}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
            {t("description")}
          </p>
        </div>

        {/* Contact / Resource Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          
          {/* FAQ */}
          <Link
            href="/faq"
            className="sm:col-span-2 p-6 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-400 hover:shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-950 mb-1">
                  {t("faqTitle")}
                </h2>
                <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed max-w-xl">
                  {t("faqDesc")}
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-gray-950 shrink-0 inline-flex items-center gap-1 group-hover:underline">
              <span>{t("faqAction")}</span>
            </span>
          </Link>
        </div>

        {/* Channel 4: Direct Project Email */}
        <div className="p-6 sm:p-7 border border-gray-200/90 rounded-2xl bg-gray-50/60 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-950 mb-1">
                {t("emailTitle")}
              </h2>
              <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed mb-3 max-w-lg">
                {t("emailDesc")}
              </p>
              <a
                href="mailto:vedantst6@gmail.com"
                className="font-mono text-sm font-bold text-gray-950 hover:underline inline-flex items-center gap-1.5"
              >
                <span>vedantst6@gmail.com</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
