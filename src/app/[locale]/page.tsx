import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { 
  ArrowRight, 
  Monitor, 
  Sun, 
  Activity, 
  RotateCcw, 
  Gamepad2, 
  Laptop, 
  Tv, 
  ClipboardCheck, 
  Sliders, 
  Ruler, 
  Grid, 
  Settings, 
  Eye, 
  ShieldCheck,
  Globe,
  AlertCircle,
  Maximize2
} from "lucide-react";

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Home" });

  return (
    <div className="flex-1 bg-white text-gray-950">
      {/* ================================================== */}
      {/* 1. HERO SECTION                                    */}
      {/* ================================================== */}
      <section className="pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-12 max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 xl:gap-6 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            {/* Small Eyebrow */}
            <div className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-[0.22em] text-gray-400 mb-3 sm:mb-3.5 select-none">
              {t("eyebrow")}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[50px] xl:text-[56px] font-extrabold tracking-[-0.035em] text-gray-950 leading-[1.06] mb-4 sm:mb-5">
              {t("headline_pt1")}<br />
              {t("headline_pt2")}
            </h1>

            {/* Supporting Copy */}
            <p className="text-[14.5px] sm:text-[15.5px] text-gray-600 leading-relaxed max-w-xl mb-6 font-normal">
              {t("description")}
            </p>

            {/* Compact CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-8 sm:mb-9">
              <Link 
                href="/tests/dead-pixel-test"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-950 hover:bg-black text-white font-medium text-xs sm:text-[13.5px] px-5 py-2.5 rounded-lg transition-all shadow-2xs hover:shadow-xs focus-visible:ring-2 focus-visible:ring-gray-900"
              >
                <span>{t("startTesting")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link 
                href="/monitor-inspection/diagnostic"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-50/80 hover:bg-gray-100 text-gray-800 border border-gray-300 hover:border-gray-400 font-medium text-xs sm:text-[13.5px] px-5 py-2.5 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-gray-900"
              >
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>{t("diagnoseProblem")}</span>
              </Link>
            </div>

            {/* Four Capability Points */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-3 xl:gap-5 select-none">
              {/* 1. Works in your browser */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 flex items-center justify-center shrink-0 text-gray-900 mt-0.5">
                  <Monitor className="w-4 h-4 stroke-[1.8]" />
                </div>
                <div>
                  <div className="text-xs sm:text-[12.5px] font-semibold text-gray-950 leading-tight">
                    {t("cap1Title")}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 leading-tight">
                    {t("cap1Desc")}
                  </div>
                </div>
              </div>

              {/* 2. Private and secure */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 flex items-center justify-center shrink-0 text-gray-900 mt-0.5">
                  <ShieldCheck className="w-4 h-4 stroke-[1.8]" />
                </div>
                <div>
                  <div className="text-xs sm:text-[12.5px] font-semibold text-gray-950 leading-tight">
                    {t("cap2Title")}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 leading-tight">
                    {t("cap2Desc")}
                  </div>
                </div>
              </div>

              {/* 3. Works on any device */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 flex items-center justify-center shrink-0 text-gray-900 mt-0.5">
                  <Laptop className="w-4 h-4 stroke-[1.8]" />
                </div>
                <div>
                  <div className="text-xs sm:text-[12.5px] font-semibold text-gray-950 leading-tight">
                    {t("cap3Title")}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 leading-tight">
                    {t("cap3Desc")}
                  </div>
                </div>
              </div>

              {/* 4. Multi-language */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 flex items-center justify-center shrink-0 text-gray-900 mt-0.5">
                  <Globe className="w-4 h-4 stroke-[1.8]" />
                </div>
                <div>
                  <div className="text-xs sm:text-[12.5px] font-semibold text-gray-950 leading-tight">
                    {t("cap4Title")}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 leading-tight">
                    {t("cap4Desc")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Column — Realistic Dell Monitor Visual */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center lg:items-end justify-center relative select-none">
            <div className="w-full max-w-[560px] relative flex items-center">
              <div className="w-full relative">
                <Image
                  src="/hero-monitor.jpg"
                  alt="Desktop monitor displaying calibration grid and grayscale diagnostic test pattern"
                  width={1200}
                  height={896}
                  priority
                  className="w-full h-auto object-contain select-none pointer-events-none"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* 2. QUICK TESTS SECTION                            */}
      {/* ================================================== */}
      <section className="pt-2 pb-10 sm:pb-12 max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-4 sm:mb-5">
          <div>
            <h2 className="text-sm sm:text-base font-bold tracking-tight text-gray-950 uppercase">
              {t("quickTestsTitle")}
            </h2>
            <p className="text-xs sm:text-[13px] text-gray-500 mt-0.5">
              {t("quickTestsDesc")}
            </p>
          </div>
          <Link 
            href="/tests"
            className="text-xs sm:text-[13px] font-medium text-gray-600 hover:text-gray-950 flex items-center gap-1 group transition-colors focus-visible:ring-2 focus-visible:ring-gray-900 rounded p-1"
          >
            <span>{t("viewAllTests")}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 6 Compact Horizontal Shortcut Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3">
          {/* 1. Dead Pixels */}
          <Link 
            href="/tests/dead-pixel-test"
            className="bg-white border border-gray-200/90 hover:border-gray-300 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2.5 sm:gap-3 group transition-all hover:shadow-xs focus-visible:ring-2 focus-visible:ring-gray-900 min-h-[50px] sm:min-h-[54px]"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0 text-gray-800 group-hover:text-gray-950 transition-colors">
              <Monitor className="w-4 h-4 stroke-[1.8]" />
            </div>
            <span className="text-xs sm:text-[13px] font-medium text-gray-900 group-hover:text-gray-950 leading-tight">
              {t("quickDeadPixels")}
            </span>
          </Link>

          {/* 2. Color Test */}
          <Link 
            href="/tests/color-test"
            className="bg-white border border-gray-200/90 hover:border-gray-300 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2.5 sm:gap-3 group transition-all hover:shadow-xs focus-visible:ring-2 focus-visible:ring-gray-900 min-h-[50px] sm:min-h-[54px]"
          >
            <div 
              className="w-4 h-4 rounded-full p-[2.5px] shrink-0" 
              style={{ background: 'conic-gradient(#ef4444 0deg, #f97316 45deg, #eab308 90deg, #22c55e 135deg, #06b6d4 180deg, #3b82f6 225deg, #8b5cf6 270deg, #ec4899 315deg, #ef4444 360deg)' }}
            >
              <div className="w-full h-full rounded-full bg-white" />
            </div>
            <span className="text-xs sm:text-[13px] font-medium text-gray-900 group-hover:text-gray-950 leading-tight">
              {t("quickColorTest")}
            </span>
          </Link>

          {/* 3. Brightness */}
          <Link 
            href="/tests/brightness-test"
            className="bg-white border border-gray-200/90 hover:border-gray-300 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2.5 sm:gap-3 group transition-all hover:shadow-xs focus-visible:ring-2 focus-visible:ring-gray-900 min-h-[50px] sm:min-h-[54px]"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0 text-amber-500">
              <Sun className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-xs sm:text-[13px] font-medium text-gray-900 group-hover:text-gray-950 leading-tight">
              {t("quickBrightness")}
            </span>
          </Link>

          {/* 4. Contrast */}
          <Link 
            href="/tests/contrast-test"
            className="bg-white border border-gray-200/90 hover:border-gray-300 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2.5 sm:gap-3 group transition-all hover:shadow-xs focus-visible:ring-2 focus-visible:ring-gray-900 min-h-[50px] sm:min-h-[54px]"
          >
            <div className="w-4 h-4 rounded-full border border-gray-900 overflow-hidden shrink-0 flex">
              <div className="w-1/2 h-full bg-gray-900" />
              <div className="w-1/2 h-full bg-white" />
            </div>
            <span className="text-xs sm:text-[13px] font-medium text-gray-900 group-hover:text-gray-950 leading-tight">
              {t("quickContrast")}
            </span>
          </Link>

          {/* 5. Ghosting */}
          <Link 
            href="/tests/ghosting-test"
            className="bg-white border border-gray-200/90 hover:border-gray-300 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2.5 sm:gap-3 group transition-all hover:shadow-xs focus-visible:ring-2 focus-visible:ring-gray-900 min-h-[50px] sm:min-h-[54px]"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0 text-gray-800">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="17" cy="4" r="2"/>
                <path d="m15 8-5 3-4-2"/>
                <path d="m13 13 3 5 4-1"/>
                <path d="M10 11v6l-4 3"/>
              </svg>
            </div>
            <span className="text-xs sm:text-[13px] font-medium text-gray-900 group-hover:text-gray-950 leading-tight">
              {t("quickGhosting")}
            </span>
          </Link>

          {/* 6. Refresh Rate */}
          <Link 
            href="/tests/refresh-rate-test"
            className="bg-white border border-gray-200/90 hover:border-gray-300 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2.5 sm:gap-3 group transition-all hover:shadow-xs focus-visible:ring-2 focus-visible:ring-gray-900 min-h-[50px] sm:min-h-[54px]"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0 text-blue-600">
              <Activity className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-xs sm:text-[13px] font-medium text-gray-900 group-hover:text-gray-950 leading-tight">
              {t("quickRefreshRate")}
            </span>
          </Link>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. WHAT ARE YOU CHECKING? (INSPECTION WORKFLOWS)   */}
      {/* ================================================== */}
      <section className="pt-2 pb-10 sm:pb-12 max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-4 sm:mb-5">
          <div>
            <h2 className="text-sm sm:text-base font-bold tracking-tight text-gray-950 uppercase">
              {t("workflowsTitle")}
            </h2>
            <p className="text-xs sm:text-[13px] text-gray-500 mt-0.5">
              {t("workflowsDesc")}
            </p>
          </div>
          <Link 
            href="/monitor-inspection"
            className="text-xs sm:text-[13px] font-medium text-gray-600 hover:text-gray-950 flex items-center gap-1 group transition-colors focus-visible:ring-2 focus-visible:ring-gray-900 rounded p-1"
          >
            <span>{t("viewAllWorkflows")}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 6 Workflow Cards (General Checkup + 5 Specialized Workflows) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
          {/* 1. General checkup */}
          <Link 
            href="/monitor-inspection/general"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-3 sm:p-4 transition-all flex flex-col justify-between group min-h-[110px] sm:min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center text-gray-800 mb-2 sm:mb-2.5">
                <ClipboardCheck className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-xs sm:text-[13px] text-gray-950 mb-0.5 leading-snug">
                {t("wfGeneralTitle")}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] text-gray-500 leading-snug line-clamp-2">
                {t("wfGeneralDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-1.5 sm:mt-2 shrink-0" />
          </Link>

          {/* 2. Used monitor */}
          <Link 
            href="/monitor-inspection/used"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-3 sm:p-4 transition-all flex flex-col justify-between group min-h-[110px] sm:min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center text-gray-800 mb-2 sm:mb-2.5">
                <RotateCcw className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-xs sm:text-[13px] text-gray-950 mb-0.5 leading-snug">
                {t("wfUsedTitle")}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] text-gray-500 leading-snug line-clamp-2">
                {t("wfUsedDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-1.5 sm:mt-2 shrink-0" />
          </Link>

          {/* 2. Gaming display */}
          <Link 
            href="/monitor-inspection/gaming"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-3 sm:p-4 transition-all flex flex-col justify-between group min-h-[110px] sm:min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center text-gray-800 mb-2 sm:mb-2.5">
                <Gamepad2 className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-xs sm:text-[13px] text-gray-950 mb-0.5 leading-snug">
                {t("wfGamingTitle")}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] text-gray-500 leading-snug line-clamp-2">
                {t("wfGamingDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-1.5 sm:mt-2 shrink-0" />
          </Link>

          {/* 3. OLED display */}
          <Link 
            href="/monitor-inspection/oled"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-3 sm:p-4 transition-all flex flex-col justify-between group min-h-[110px] sm:min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center text-gray-800 mb-2 sm:mb-2.5">
                <Monitor className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-xs sm:text-[13px] text-gray-950 mb-0.5 leading-snug">
                {t("wfOledTitle")}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] text-gray-500 leading-snug line-clamp-2">
                {t("wfOledDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-1.5 sm:mt-2 shrink-0" />
          </Link>

          {/* 4. Laptop display */}
          <Link 
            href="/monitor-inspection/laptop"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-3 sm:p-4 transition-all flex flex-col justify-between group min-h-[110px] sm:min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center text-gray-800 mb-2 sm:mb-2.5">
                <Laptop className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-xs sm:text-[13px] text-gray-950 mb-0.5 leading-snug">
                {t("wfLaptopTitle")}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] text-gray-500 leading-snug line-clamp-2">
                {t("wfLaptopDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-1.5 sm:mt-2 shrink-0" />
          </Link>

          {/* 5. TV or large display */}
          <Link 
            href="/monitor-inspection/tv"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-3 sm:p-4 transition-all flex flex-col justify-between group min-h-[110px] sm:min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center text-gray-800 mb-2 sm:mb-2.5">
                <Tv className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-xs sm:text-[13px] text-gray-950 mb-0.5 leading-snug">
                {t("wfTvTitle")}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] text-gray-500 leading-snug line-clamp-2">
                {t("wfTvDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-1.5 sm:mt-2 shrink-0" />
          </Link>
        </div>
      </section>

      {/* ================================================== */}
      {/* 4. MORE TOOLS SECTION                             */}
      {/* ================================================== */}
      <section className="pt-2 pb-14 sm:pb-16 max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-4 sm:mb-5">
          <div>
            <h2 className="text-sm sm:text-base font-bold tracking-tight text-gray-950 uppercase">
              {t("moreToolsTitle")}
            </h2>
            <p className="text-xs sm:text-[13px] text-gray-500 mt-0.5">
              {t("moreToolsDesc")}
            </p>
          </div>
          <Link 
            href="/tools"
            className="text-xs sm:text-[13px] font-medium text-gray-600 hover:text-gray-950 flex items-center gap-1 group transition-colors focus-visible:ring-2 focus-visible:ring-gray-900 rounded p-1"
          >
            <span>{t("viewAllTools")}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4 Compact Utility Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
          {/* 1. Compare Displays */}
          <Link 
            href="/tests/compare-displays"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-3 sm:p-4 transition-all flex flex-col justify-between group min-h-[110px] sm:min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center text-gray-800 mb-2 sm:mb-2.5">
                <Sliders className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-xs sm:text-[13px] text-gray-950 mb-0.5 leading-snug">
                {t("toolCompareTitle")}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] text-gray-500 leading-snug line-clamp-2">
                {t("toolCompareDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-1.5 sm:mt-2 shrink-0" />
          </Link>

          {/* 3. PPI & Viewing Distance */}
          <Link 
            href="/tests/resolution-checker"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-3 sm:p-4 transition-all flex flex-col justify-between group min-h-[110px] sm:min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center text-gray-800 mb-2 sm:mb-2.5">
                <Ruler className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-xs sm:text-[13px] text-gray-950 mb-0.5 leading-snug">
                {t("toolPpiTitle")}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] text-gray-500 leading-snug line-clamp-2">
                {t("toolPpiDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-1.5 sm:mt-2 shrink-0" />
          </Link>

          {/* 4. Custom Test Pattern */}
          <Link 
            href="/tests/custom-pattern"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-3 sm:p-4 transition-all flex flex-col justify-between group min-h-[110px] sm:min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center text-gray-800 mb-2 sm:mb-2.5">
                <Grid className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-xs sm:text-[13px] text-gray-950 mb-0.5 leading-snug">
                {t("toolPatternTitle")}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] text-gray-500 leading-snug line-clamp-2">
                {t("toolPatternDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-1.5 sm:mt-2 shrink-0" />
          </Link>

          {/* 5. Display Information */}
          <Link 
            href="/tests/display-info"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-3 sm:p-4 transition-all flex flex-col justify-between group min-h-[110px] sm:min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center text-gray-800 mb-2 sm:mb-2.5">
                <Settings className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-xs sm:text-[13px] text-gray-950 mb-0.5 leading-snug">
                {t("toolInfoTitle")}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] text-gray-500 leading-snug line-clamp-2">
                {t("toolInfoDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-1.5 sm:mt-2 shrink-0" />
          </Link>
        </div>
      </section>

      {/* ================================================== */}
      {/* 5. HOW TESTING WORKS (PRACTICAL ONBOARDING)       */}
      {/* ================================================== */}
      <section className="border-t border-gray-200/80 bg-gray-50/40 py-10 sm:py-12">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="mb-6 sm:mb-8">
            <div className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-[0.22em] text-gray-400 mb-1.5 select-none">
              {t("howItWorksEyebrow")}
            </div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-gray-950 uppercase">
              {t("howItWorksTitle")}
            </h2>
            <p className="text-xs sm:text-[13px] text-gray-500 mt-1 max-w-2xl">
              {t("howItWorksSubtitle")}
            </p>
          </div>

          {/* 3 Step Sequence Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5">
            {/* Step 01: Prepare Your Display */}
            <div className="bg-white border border-gray-200/90 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-gray-400 tracking-wider select-none">01</span>
                  <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
                    <Sliders className="w-3.5 h-3.5 stroke-[2]" />
                  </div>
                </div>
                <h3 className="font-semibold text-xs sm:text-[13.5px] text-gray-950 mb-1 leading-snug">
                  {t("step1Title")}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                  {t("step1Desc")}
                </p>
              </div>
            </div>

            {/* Step 02: Go Fullscreen */}
            <div className="bg-white border border-gray-200/90 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-gray-400 tracking-wider select-none">02</span>
                  <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
                    <Maximize2 className="w-3.5 h-3.5 stroke-[2]" />
                  </div>
                </div>
                <h3 className="font-semibold text-xs sm:text-[13.5px] text-gray-950 mb-1 leading-snug">
                  {t("step2Title")}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                  {t("step2Desc")}
                </p>
              </div>
            </div>

            {/* Step 03: Inspect Under Controlled Light */}
            <div className="bg-white border border-gray-200/90 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-gray-400 tracking-wider select-none">03</span>
                  <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
                    <Eye className="w-3.5 h-3.5 stroke-[2]" />
                  </div>
                </div>
                <h3 className="font-semibold text-xs sm:text-[13.5px] text-gray-950 mb-1 leading-snug">
                  {t("step3Title")}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                  {t("step3Desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}