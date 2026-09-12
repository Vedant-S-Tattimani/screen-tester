import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { 
  ArrowRight, 
  Sliders, 
  Ruler, 
  Grid, 
  Settings, 
  Eye, 
  Maximize2,
  Keyboard,
  Monitor,
  ShieldCheck,
  Cpu
} from "lucide-react";

import { AllScreenTests, type ScreenTestCategory, type ScreenTestItem } from "@/components/home/AllScreenTests";
import { StartTestingCTA } from "@/components/home/StartTestingCTA";
import { getBaseUrl } from "@/lib/seo";

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Home" });
  const tLib = await getTranslations({ locale, namespace: "TestLibrary" });
  const tTests = await getTranslations({ locale, namespace: "Tests" });
  const tPages = await getTranslations({ locale, namespace: "TestPages" });
  const tFixer = await getTranslations({ locale, namespace: "StuckPixelFixerTest" });

  const libMap: Record<string, string> = {
    "dead-pixel-test": "deadPixel",
    "stuck-pixel-test": "stuckPixel",
    "bright-pixel-test": "brightPixel",
    "color-test": "colorTest",
    "color-banding-test": "gradientTest",
    "brightness-test": "brightnessTest",
    "uniformity-test": "uniformityTest",
    "backlight-bleed-test": "backlightBleed",
    "ghosting-test": "ghostingTest",
    "refresh-rate-test": "refreshRate",
    "grayscale-test": "grayscaleTest",
    "saturation-test": "saturationTest",
    "black-level-test": "blackLevelTest",
    "white-level-test": "whiteLevelTest",
    "gamma-test": "gammaTest",
    "contrast-test": "contrastTest",
    "hdr-capability-test": "hdrCapabilityTest"
  };

  const testsMap: Record<string, string> = {
    "burn-in-test": "burnIn",
    "color-gamut-test": "colorGamut",
    "color-accuracy-test": "colorAccuracy",
    "solid-color-test": "solidColor",
    "viewing-angle-test": "viewingAngle",
    "blooming-test": "blooming",
    "screen-tearing-test": "screenTearing",
    "screen-flicker-test": "flicker",
    "touch-screen-test": "touchScreen",
    "sharpness-test": "sharpness",
    "vrr-test": "vrrTest",
    "hdr-test": "hdrVisualTest",
    "near-black-test": "nearBlackTest",
    "gradient-banding-test": "gradientBandingTest",
    "text-clarity-test": "textClarityTest",
    "tv-overscan-test": "tvOverscanTest",
    "scaling-aspect-test": "scalingAspectTest",
    "multi-touch-test": "multiTouchTest",
    "accelerometer-test": "accelerometerTest",
    "gyroscope-test": "gyroscopeTest",
    "vibration-test": "vibrationTest",
    "webcam-test": "webcamTest",
    "speaker-test": "speakerTest",
    "microphone-test": "microphoneTest"
  };

  const getTestItem = (id: string, category: string): ScreenTestItem => {
    let title = "";
    let description = "";

    if (id === "stuck-pixel-fixer") {
      try {
        title = tFixer("title");
        description = tFixer("disclaimer");
      } catch {}
    }

    if ((!title || !description) && libMap[id]) {
      try {
        title = tLib(`tests.${libMap[id]}.title`);
        description = tLib(`tests.${libMap[id]}.description`);
      } catch {}
    }

    if ((!title || !description) && testsMap[id]) {
      try {
        if (!title) title = tTests(`${testsMap[id]}.title`);
        if (!description) description = tTests(`${testsMap[id]}.description`);
      } catch {}
    }

    if (!title || !description) {
      try {
        if (!title) title = tPages(`${id}.title`);
        if (!description) description = tPages(`${id}.metaDescription`);
      } catch {}
    }

    return {
      id,
      href: `/tests/${id}`,
      title: title || id,
      description: description || "",
      category
    };
  };

  const categories: ScreenTestCategory[] = [
    {
      id: "colorPixels",
      title: t("allTestsCategories.colorPixels"),
      tests: [
        getTestItem("dead-pixel-test", "colorPixels"),
        getTestItem("stuck-pixel-test", "colorPixels"),
        getTestItem("bright-pixel-test", "colorPixels"),
        getTestItem("stuck-pixel-fixer", "colorPixels"),
        getTestItem("burn-in-test", "colorPixels"),
        getTestItem("color-test", "colorPixels"),
        getTestItem("color-gamut-test", "colorPixels"),
        getTestItem("color-accuracy-test", "colorPixels"),
        getTestItem("saturation-test", "colorPixels")
      ]
    },
    {
      id: "gradientContrast",
      title: t("allTestsCategories.gradientContrast"),
      tests: [
        getTestItem("contrast-test", "gradientContrast"),
        getTestItem("brightness-test", "gradientContrast"),
        getTestItem("black-level-test", "gradientContrast"),
        getTestItem("near-black-test", "gradientContrast"),
        getTestItem("white-level-test", "gradientContrast"),
        getTestItem("gamma-test", "gradientContrast"),
        getTestItem("color-banding-test", "gradientContrast"),
        getTestItem("gradient-banding-test", "gradientContrast"),
        getTestItem("grayscale-test", "gradientContrast")
      ]
    },
    {
      id: "uniformityPanel",
      title: t("allTestsCategories.uniformityPanel"),
      tests: [
        getTestItem("uniformity-test", "uniformityPanel"),
        getTestItem("backlight-bleed-test", "uniformityPanel"),
        getTestItem("blooming-test", "uniformityPanel"),
        getTestItem("solid-color-test", "uniformityPanel"),
        getTestItem("viewing-angle-test", "uniformityPanel")
      ]
    },
    {
      id: "motionPerformance",
      title: t("allTestsCategories.motionPerformance"),
      tests: [
        getTestItem("ghosting-test", "motionPerformance"),
        getTestItem("motion-blur-test", "motionPerformance"),
        getTestItem("refresh-rate-test", "motionPerformance"),
        getTestItem("vrr-test", "motionPerformance"),
        getTestItem("screen-tearing-test", "motionPerformance"),
        getTestItem("screen-flicker-test", "motionPerformance")
      ]
    },
    {
      id: "sharpnessCapabilities",
      title: t("allTestsCategories.sharpnessCapabilities"),
      tests: [
        getTestItem("sharpness-test", "sharpnessCapabilities"),
        getTestItem("text-clarity-test", "sharpnessCapabilities"),
        getTestItem("hdr-capability-test", "sharpnessCapabilities"),
        getTestItem("hdr-test", "sharpnessCapabilities"),
        getTestItem("tv-overscan-test", "sharpnessCapabilities"),
        getTestItem("scaling-aspect-test", "sharpnessCapabilities"),
        getTestItem("touch-screen-test", "sharpnessCapabilities")
      ]
    },
    {
      id: "deviceInput",
      title: t("allTestsCategories.deviceInput"),
      tests: [
        getTestItem("multi-touch-test", "deviceInput"),
        getTestItem("accelerometer-test", "deviceInput"),
        getTestItem("gyroscope-test", "deviceInput"),
        getTestItem("vibration-test", "deviceInput"),
        getTestItem("webcam-test", "deviceInput"),
        getTestItem("speaker-test", "deviceInput"),
        getTestItem("microphone-test", "deviceInput")
      ]
    }
  ];

  return (
    <div className="flex-1 bg-white text-gray-950">
      {/* ================================================== */}
      {/* 1. HERO SECTION                                    */}
      {/* ================================================== */}
      <section className="pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-6 sm:pb-8 md:pb-12 max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 xl:gap-6 items-center">
          
          {/* Left Hero Column */}
          <div className="md:col-span-7 flex flex-col justify-center">
            {/* Small Eyebrow */}
            <div className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-[0.22em] text-gray-400 mb-3 sm:mb-3.5 select-none">
              {t("eyebrow")}
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[50px] xl:text-[56px] font-extrabold tracking-[-0.035em] text-gray-950 leading-[1.08] sm:leading-[1.06] mb-3 sm:mb-4 lg:mb-5">
              {t("h1")}
            </h1>

            {/* Supporting Copy */}
            <p className="text-[14px] sm:text-[15px] lg:text-[15.5px] text-gray-600 leading-relaxed max-w-xl mb-5 sm:mb-6 font-normal">
              {t("description")}
            </p>

            {/* CTA Button */}
            <div className="flex items-center">
              <StartTestingCTA label={t("startTesting")} />
            </div>
          </div>

          {/* Right Hero Column — Generic Brand-Neutral Desktop & Smartphone Visual */}
          <div className="hidden md:flex md:col-span-5 flex-col items-center md:items-end justify-center relative select-none">
            <div className="w-full max-w-[540px] relative flex items-center">
              <div className="w-full relative">
                <Image
                  src="/hero-devices.webp"
                  alt="Generic brand-neutral desktop monitor and smartphone displaying screen diagnostic calibration and test patterns"
                  width={1200}
                  height={896}
                  priority
                  sizes="(max-width: 768px) 0px, (max-width: 1200px) 45vw, 540px"
                  className="w-full h-auto object-contain select-none pointer-events-none"
                />
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* ================================================== */}
      {/* 2. ALL SCREEN TESTS SECTION                        */}
      {/* ================================================== */}
      <AllScreenTests
        categories={categories}
        sectionTitle={t("allTestsTitle")}
        sectionSubtitle={t("allTestsSubtitle")}
        searchPlaceholder={t("allTestsSearchPlaceholder")}
        filterAllText={t("allTestsFilterAll")}
        noResultsText={t("allTestsNoResults")}
      />

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

      {/* ================================================== */}
      {/* 6. ABOUT SCREEN TESTER (AUTHORITY & BIO)           */}
      {/* ================================================== */}
      <section className="border-t border-gray-200/80 bg-white py-12 sm:py-16">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="mb-6 sm:mb-8 max-w-3xl">
            <div className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-[0.22em] text-gray-400 mb-2 select-none">
              {t("aboutEyebrow")}
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-950">
              {t("aboutTitle")}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2.5 leading-relaxed">
              {t("aboutLead")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
              <p>{t("aboutP1")}</p>
              <p>{t("aboutP2")}</p>
              
              {/* Feature Badges */}
              <div className="pt-3 flex flex-wrap gap-2.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200/80 text-xs font-medium text-gray-800">
                  <Monitor className="w-3.5 h-3.5 text-gray-600" />
                  <span>{t("badgeBrowser")}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200/80 text-xs font-medium text-gray-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-gray-600" />
                  <span>{t("badgePrivacy")}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200/80 text-xs font-medium text-gray-800">
                  <Cpu className="w-3.5 h-3.5 text-gray-600" />
                  <span>{t("badgeNoInstall")}</span>
                </div>
              </div>
            </div>

            {/* Right Limitations & Calibration Note Card */}
            <div className="lg:col-span-5 bg-gray-50/70 border border-gray-200/90 rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2.5 text-gray-900 font-semibold text-xs sm:text-sm mb-2.5">
                <div className="w-7 h-7 rounded-lg bg-gray-200/80 flex items-center justify-center text-gray-800 shrink-0">
                  <Sliders className="w-3.5 h-3.5 stroke-[2]" />
                </div>
                <span>{t("aboutLimitationsTitle")}</span>
              </div>
              <p className="text-[11.5px] sm:text-xs text-gray-500 leading-relaxed">
                {t("aboutLimitationsDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 7. MORE FREE TESTING TOOLS SECTION                 */}
      {/* ================================================== */}
      <section className="border-t border-gray-200/80 bg-white py-10 sm:py-12">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="mb-5 sm:mb-6">
            <h2 className="text-sm sm:text-base font-bold tracking-tight text-gray-950 uppercase">
              {t("moreFreeTestingToolsTitle")}
            </h2>
          </div>

          {/* Tool Card */}
          <div className="bg-gray-50/50 hover:bg-gray-50/90 border border-gray-200/90 hover:border-gray-300 rounded-xl p-4 sm:p-5 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-2xl">
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gray-100 border border-gray-200/60 flex items-center justify-center text-gray-800 shrink-0 mt-0.5">
                <Keyboard className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="font-semibold text-xs sm:text-[14px] text-gray-950 mb-0.5 leading-snug">
                  {t("keyboardTesterTitle")}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed max-w-md">
                  {t("keyboardTesterDesc")}
                </p>
              </div>
            </div>
            <a
              href="https://keyboardtester1.com/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-[13px] font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-gray-900 outline-none"
            >
              <span>{t("testYourKeyboard")}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Structured Data: WebApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Screen Tester",
            "url": `${getBaseUrl()}/${locale}`,
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "All",
            "browserRequirements": "Requires HTML5 Canvas and WebGL support",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": t("description")
          })
        }}
      />

    </div>
  );
}