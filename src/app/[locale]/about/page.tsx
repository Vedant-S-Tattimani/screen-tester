import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { 
  Monitor, 
  Palette, 
  Sun, 
  Activity, 
  Sliders, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  GitBranch,
  HelpCircle
} from "lucide-react";

import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  
  return generateSeoMetadata("/about", t("metaTitle"), t("metaDescription"), locale);
}

export default async function AboutPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "About" });

  const categories = [
    {
      icon: Monitor,
      title: t("pixelsCategory"),
      desc: t("pixelsDesc"),
      href: "/tests/dead-pixel-test",
      badge: "PIXELS"
    },
    {
      icon: Palette,
      title: t("colorCategory"),
      desc: t("colorDesc"),
      href: "/tests/color-test",
      badge: "COLOR"
    },
    {
      icon: Sun,
      title: t("luminanceCategory"),
      desc: t("luminanceDesc"),
      href: "/tests/brightness-test",
      badge: "LUM"
    },
    {
      icon: Activity,
      title: t("motionCategory"),
      desc: t("motionDesc"),
      href: "/tests/ghosting-test",
      badge: "MOTION"
    },
    {
      icon: Sliders,
      title: t("toolsCategory"),
      desc: t("toolsDesc"),
      href: "/tools",
      badge: "TOOLS"
    }
  ];

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

        {/* Two Highlights: Why It Exists & How It Works */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          <div className="border border-gray-200/90 rounded-2xl p-6 bg-gray-50/50">
            <div className="w-9 h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center mb-4 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-950 mb-2">
              {t("missionTitle")}
            </h2>
            <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed">
              {t("missionText")}
            </p>
          </div>

          <div className="border border-gray-200/90 rounded-2xl p-6 bg-gray-50/50">
            <div className="w-9 h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center mb-4 shadow-2xs">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-950 mb-2">
              {t("howItWorksTitle")}
            </h2>
            <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed">
              {t("howItWorksText")}
            </p>
          </div>
        </div>

        {/* Section: What You Can Test */}
        <div className="mb-12">
          <h2 className="text-xs font-mono uppercase font-bold tracking-wider text-gray-500 mb-5">
            {t("testTypesTitle")}
          </h2>

          <div className="space-y-3">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={idx}
                  href={cat.href}
                  className="p-4 sm:p-5 border border-gray-200/90 rounded-xl bg-white hover:border-gray-300 hover:bg-gray-50/60 transition-all flex items-start justify-between gap-4 group"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 shrink-0 mt-0.5 group-hover:bg-gray-200 transition-colors">
                      <Icon className="w-4 h-4 stroke-[1.8]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-xs sm:text-sm text-gray-950">
                          {cat.title}
                        </span>
                        <span className="text-[9.5px] font-mono font-medium uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                          {cat.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-950 shrink-0 mt-2 transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Open Source Notice */}
        <div className="p-6 border border-gray-200/90 rounded-2xl bg-white mb-12">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-900 shrink-0 mt-0.5">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-950 mb-1">
                {t("openSourceTitle")}
              </h2>
              <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed mb-4">
                {t("openSourceText")}
              </p>
              <a
                href="https://github.com/Vedant-S-Tattimani/screen-tester"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-950 hover:underline"
              >
                <span>View project on GitHub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Footer Links */}
        <div className="pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-600">
          <Link href="/faq" className="hover:text-gray-950 flex items-center gap-1.5 transition-colors">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </Link>
          <Link href="/tests" className="hover:text-gray-950 flex items-center gap-1.5 transition-colors">
            <span>Browse Full Test Suite</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
