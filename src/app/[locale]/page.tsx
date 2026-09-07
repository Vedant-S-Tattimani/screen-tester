import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { 
  CheckCircle2, 
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
  BookOpen 
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
      <section className="pt-8 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center">
            {/* Small Eyebrow */}
            <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 sm:mb-4 select-none">
              {t("eyebrow")}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold tracking-[-0.035em] text-gray-950 leading-[1.08] mb-5">
              {t("headline_pt1")}<br />
              {t("headline_pt2")}
            </h1>

            {/* Supporting Copy */}
            <p className="text-[15px] sm:text-[16px] text-gray-600 leading-relaxed max-w-xl mb-8 font-normal">
              {t("description")}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <Link 
                href="/tests/dead-pixel-test"
                className="inline-flex items-center justify-center gap-2.5 bg-gray-950 text-white hover:bg-black font-medium text-sm sm:text-[15px] px-6 sm:px-7 py-3.5 rounded-full transition-all shadow-xs hover:shadow-sm focus-visible:ring-2 focus-visible:ring-gray-900"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>{t("startTesting")}</span>
              </Link>
              <Link 
                href="/tests"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50/80 text-gray-800 font-medium text-sm sm:text-[15px] px-6 sm:px-7 py-3.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-gray-900"
              >
                <span>{t("browseTests")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust / Product Attributes */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-[13px] text-gray-600 select-none">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gray-900 stroke-[2]" />
                <span>{t("trustFree")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gray-900 stroke-[2]" />
                <span>{t("trustNoInstall")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gray-900 stroke-[2]" />
                <span>{t("trustBrowser")}</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column — Large Realistic Desktop Monitor Visual */}
          <div className="lg:col-span-5 xl:col-span-6 flex flex-col items-center lg:items-end justify-center relative select-none">
            <div className="w-full max-w-[620px] relative">
              <Image
                src="/hero-monitor.jpg"
                alt="Widescreen desktop monitor displaying precision test pattern"
                width={1200}
                height={896}
                priority
                className="w-full h-auto object-contain select-none pointer-events-none"
              />

              {/* Vertical Split Line on Monitor Screen */}
              <div 
                className="absolute top-[3%] bottom-[13%] left-[50%] w-[1.5px] bg-white/70 pointer-events-none shadow-xs" 
                aria-hidden="true" 
              />

              {/* Top-Left Screen Label */}
              <div className="absolute top-[8%] left-[7%] pointer-events-none">
                <span className="text-white/95 text-[10px] sm:text-xs font-normal drop-shadow-sm tracking-wide">
                  See the difference.
                </span>
              </div>

              {/* Bottom-Right Screen Technical Specs Stack */}
              <div className="absolute bottom-[16%] right-[8%] text-right pointer-events-none">
                <div className="font-mono text-[8px] sm:text-[9.5px] tracking-[0.16em] text-white/90 leading-tight drop-shadow-sm uppercase">
                  <div>PIXELS</div>
                  <div>COLORS</div>
                  <div>CONTRAST</div>
                  <div>MOTION</div>
                  <div>AND MORE</div>
                </div>
              </div>

              {/* Handwritten-Style Editorial Script Beneath Monitor */}
              <div className="mt-2 text-right pr-2">
                <span className="font-serif italic text-xs sm:text-[13px] text-gray-400 select-none">
                  {t("heroScript")}
                </span>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* 1. Dead Pixels */}
          <Link 
            href="/tests/dead-pixel-test"
            className="bg-white border border-gray-200/90 hover:border-gray-300 rounded-xl px-4 py-3 flex items-center gap-3 group transition-all hover:shadow-xs focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0 text-gray-800 group-hover:text-gray-950 transition-colors">
              <Monitor className="w-4 h-4 stroke-[1.8]" />
            </div>
            <span className="text-xs sm:text-[13px] font-medium text-gray-900 group-hover:text-gray-950 truncate">
              {t("quickDeadPixels")}
            </span>
          </Link>

          {/* 2. Color Test */}
          <Link 
            href="/tests/color-test"
            className="bg-white border border-gray-200/90 hover:border-gray-300 rounded-xl px-4 py-3 flex items-center gap-3 group transition-all hover:shadow-xs focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div 
              className="w-4 h-4 rounded-full p-[2.5px] shrink-0" 
              style={{ background: 'conic-gradient(#ef4444 0deg, #f97316 45deg, #eab308 90deg, #22c55e 135deg, #06b6d4 180deg, #3b82f6 225deg, #8b5cf6 270deg, #ec4899 315deg, #ef4444 360deg)' }}
            >
              <div className="w-full h-full rounded-full bg-white" />
            </div>
            <span className="text-xs sm:text-[13px] font-medium text-gray-900 group-hover:text-gray-950 truncate">
              {t("quickColorTest")}
            </span>
          </Link>

          {/* 3. Brightness */}
          <Link 
            href="/tests/brightness-test"
            className="bg-white border border-gray-200/90 hover:border-gray-300 rounded-xl px-4 py-3 flex items-center gap-3 group transition-all hover:shadow-xs focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0 text-amber-500">
              <Sun className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-xs sm:text-[13px] font-medium text-gray-900 group-hover:text-gray-950 truncate">
              {t("quickBrightness")}
            </span>
          </Link>

          {/* 4. Contrast */}
          <Link 
            href="/tests/contrast-test"
            className="bg-white border border-gray-200/90 hover:border-gray-300 rounded-xl px-4 py-3 flex items-center gap-3 group transition-all hover:shadow-xs focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div className="w-4 h-4 rounded-full border border-gray-900 overflow-hidden shrink-0 flex">
              <div className="w-1/2 h-full bg-gray-900" />
              <div className="w-1/2 h-full bg-white" />
            </div>
            <span className="text-xs sm:text-[13px] font-medium text-gray-900 group-hover:text-gray-950 truncate">
              {t("quickContrast")}
            </span>
          </Link>

          {/* 5. Ghosting */}
          <Link 
            href="/tests/ghosting-test"
            className="bg-white border border-gray-200/90 hover:border-gray-300 rounded-xl px-4 py-3 flex items-center gap-3 group transition-all hover:shadow-xs focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0 text-gray-800">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="17" cy="4" r="2"/>
                <path d="m15 8-5 3-4-2"/>
                <path d="m13 13 3 5 4-1"/>
                <path d="M10 11v6l-4 3"/>
              </svg>
            </div>
            <span className="text-xs sm:text-[13px] font-medium text-gray-900 group-hover:text-gray-950 truncate">
              {t("quickGhosting")}
            </span>
          </Link>

          {/* 6. Refresh Rate */}
          <Link 
            href="/tests/refresh-rate-test"
            className="bg-white border border-gray-200/90 hover:border-gray-300 rounded-xl px-4 py-3 flex items-center gap-3 group transition-all hover:shadow-xs focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0 text-blue-600">
              <Activity className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-xs sm:text-[13px] font-medium text-gray-900 group-hover:text-gray-950 truncate">
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

        {/* Exactly 5 Workflow Cards (NO "New Monitor") */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* 1. Used monitor */}
          <Link 
            href="/monitor-inspection/used"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-4 transition-all flex flex-col justify-between group min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-6 h-6 flex items-center text-gray-800 mb-2.5">
                <RotateCcw className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-[13px] text-gray-950 mb-0.5">
                {t("wfUsedTitle")}
              </h3>
              <p className="text-[11px] text-gray-500 leading-snug">
                {t("wfUsedDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-2" />
          </Link>

          {/* 2. Gaming display */}
          <Link 
            href="/monitor-inspection/gaming"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-4 transition-all flex flex-col justify-between group min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-6 h-6 flex items-center text-gray-800 mb-2.5">
                <Gamepad2 className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-[13px] text-gray-950 mb-0.5">
                {t("wfGamingTitle")}
              </h3>
              <p className="text-[11px] text-gray-500 leading-snug">
                {t("wfGamingDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-2" />
          </Link>

          {/* 3. OLED display */}
          <Link 
            href="/monitor-inspection/oled"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-4 transition-all flex flex-col justify-between group min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-6 h-6 flex items-center text-gray-800 mb-2.5">
                <Monitor className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-[13px] text-gray-950 mb-0.5">
                {t("wfOledTitle")}
              </h3>
              <p className="text-[11px] text-gray-500 leading-snug">
                {t("wfOledDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-2" />
          </Link>

          {/* 4. Laptop display */}
          <Link 
            href="/monitor-inspection/laptop"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-4 transition-all flex flex-col justify-between group min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-6 h-6 flex items-center text-gray-800 mb-2.5">
                <Laptop className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-[13px] text-gray-950 mb-0.5">
                {t("wfLaptopTitle")}
              </h3>
              <p className="text-[11px] text-gray-500 leading-snug">
                {t("wfLaptopDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-2" />
          </Link>

          {/* 5. TV or large display */}
          <Link 
            href="/monitor-inspection/tv"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-4 transition-all flex flex-col justify-between group min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-6 h-6 flex items-center text-gray-800 mb-2.5">
                <Tv className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-[13px] text-gray-950 mb-0.5">
                {t("wfTvTitle")}
              </h3>
              <p className="text-[11px] text-gray-500 leading-snug">
                {t("wfTvDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-2" />
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
            href="/tests"
            className="text-xs sm:text-[13px] font-medium text-gray-600 hover:text-gray-950 flex items-center gap-1 group transition-colors focus-visible:ring-2 focus-visible:ring-gray-900 rounded p-1"
          >
            <span>{t("viewAllTools")}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 5 Compact Utility Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* 1. Monitor Inspection */}
          <Link 
            href="/monitor-inspection"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-4 transition-all flex flex-col justify-between group min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-6 h-6 flex items-center text-gray-800 mb-2.5">
                <ClipboardCheck className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-[13px] text-gray-950 mb-0.5">
                {t("toolInspectionTitle")}
              </h3>
              <p className="text-[11px] text-gray-500 leading-snug">
                {t("toolInspectionDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-2" />
          </Link>

          {/* 2. Compare Displays */}
          <Link 
            href="/tests/compare-displays"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-4 transition-all flex flex-col justify-between group min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-6 h-6 flex items-center text-gray-800 mb-2.5">
                <Sliders className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-[13px] text-gray-950 mb-0.5">
                {t("toolCompareTitle")}
              </h3>
              <p className="text-[11px] text-gray-500 leading-snug">
                {t("toolCompareDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-2" />
          </Link>

          {/* 3. PPI & Viewing Distance */}
          <Link 
            href="/tests/resolution-checker"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-4 transition-all flex flex-col justify-between group min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-6 h-6 flex items-center text-gray-800 mb-2.5">
                <Ruler className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-[13px] text-gray-950 mb-0.5">
                {t("toolPpiTitle")}
              </h3>
              <p className="text-[11px] text-gray-500 leading-snug">
                {t("toolPpiDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-2" />
          </Link>

          {/* 4. Custom Test Pattern */}
          <Link 
            href="/tests/custom-pattern"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-4 transition-all flex flex-col justify-between group min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-6 h-6 flex items-center text-gray-800 mb-2.5">
                <Grid className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-[13px] text-gray-950 mb-0.5">
                {t("toolPatternTitle")}
              </h3>
              <p className="text-[11px] text-gray-500 leading-snug">
                {t("toolPatternDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-2" />
          </Link>

          {/* 5. Display Information */}
          <Link 
            href="/tests/resolution-checker"
            className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-4 transition-all flex flex-col justify-between group min-h-[120px] focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            <div>
              <div className="w-6 h-6 flex items-center text-gray-800 mb-2.5">
                <Settings className="w-4 h-4 stroke-[1.8]" />
              </div>
              <h3 className="font-semibold text-[13px] text-gray-950 mb-0.5">
                {t("toolInfoTitle")}
              </h3>
              <p className="text-[11px] text-gray-500 leading-snug">
                {t("toolInfoDesc")}
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 group-hover:translate-x-0.5 transition-all self-end mt-2" />
          </Link>
        </div>
      </section>

      {/* ================================================== */}
      {/* 5. BENEFITS / TRUST STRIP                          */}
      {/* ================================================== */}
      <section className="border-t border-gray-200/80 bg-gray-50/40 py-8 sm:py-10">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200/80">
            {/* 1. Test visually */}
            <div className="flex items-start gap-3.5 py-4 md:py-0 md:px-6 first:pl-0">
              <div className="w-8 h-8 rounded-lg bg-white border border-gray-200/80 flex items-center justify-center shrink-0 text-gray-900 shadow-2xs">
                <Eye className="w-4 h-4 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-[13px] font-semibold text-gray-950">
                  {t("benefit1Title")}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-snug">
                  {t("benefit1Desc")}
                </p>
              </div>
            </div>

            {/* 2. Tools for every display */}
            <div className="flex items-start gap-3.5 py-4 md:py-0 md:px-6">
              <div className="w-8 h-8 rounded-lg bg-white border border-gray-200/80 flex items-center justify-center shrink-0 text-gray-900 shadow-2xs">
                <Monitor className="w-4 h-4 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-[13px] font-semibold text-gray-950">
                  {t("benefit2Title")}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-snug">
                  {t("benefit2Desc")}
                </p>
              </div>
            </div>

            {/* 3. Clear guidance */}
            <div className="flex items-start gap-3.5 py-4 md:py-0 md:px-6 last:pr-0">
              <div className="w-8 h-8 rounded-lg bg-white border border-gray-200/80 flex items-center justify-center shrink-0 text-gray-900 shadow-2xs">
                <BookOpen className="w-4 h-4 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-[13px] font-semibold text-gray-950">
                  {t("benefit3Title")}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-snug">
                  {t("benefit3Desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}