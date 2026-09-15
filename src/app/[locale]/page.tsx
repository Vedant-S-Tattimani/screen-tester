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
import { SmartDeviceDetection } from "@/components/home/SmartDeviceDetection";
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
  const tTools = await getTranslations({ locale, namespace: "Tools" });
  const tCustom = await getTranslations({ locale, namespace: "CustomPattern" });
  const tCompare = await getTranslations({ locale, namespace: "CompareDisplays" });

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
    "microphone-test": "microphoneTest",
    "pixel-inversion-test": "pixelInversionTest",
    "strobe-crosstalk-test": "strobeCrosstalkTest",
    "vrr-flicker-test": "vrrFlickerTest",
    "pursuit-camera-test": "pursuitCameraTest",
    "audio-sync-test": "audioSyncTest",
    "gamepad-test": "gamepadTest",
    "battery-test": "batteryTest",
    "network-speed-test": "networkSpeedTest",
    "color-blindness-test": "colorBlindnessTest",
    "screen-recorder": "screenRecorder",
    "dark-mode-test": "darkModeTest",
    "input-lag-test": "inputLagTest",
    "ambient-light-test": "ambientLightTest",
    "dpi-calculator": "dpiCalculator",
    "subpixel-layout-test": "subpixelLayoutTest",
    "pwm-flicker-test": "pwmFlickerTest",
    "gtg-response-time-test": "gtgResponseTimeTest",
    "mouse-polling-test": "mousePollingTest",
    "gpu-benchmark-test": "gpuBenchmarkTest",
    "motion-blur-test": "motionBlurTest",
    "reaction-time-test": "reactionTimeTest",
    "resolution-checker": "resolution-checker",
    "oled-abl-test": "oledAblTest",
    "color-temperature-test": "colorTemperatureTest",
    "temporal-dithering-test": "temporalDitheringTest",
    "hdr-peak-brightness-test": "hdrPeakBrightnessTest",
    "audio-latency-test": "audioLatencyTest"
  };

  const toolsMap: Record<string, string> = {
    "display-bandwidth-calculator": "displayBandwidthCalculator",
    "viewing-distance-calculator": "viewingDistanceCalculator",
    "dual-monitor-matcher": "dualMonitorMatcher",
    "screen-recorder": "screenRecorder",
    "dpi-calculator": "dpiCalculator",
    "dead-pixel-mapper": "deadPixelMapper",
    "oled-burn-in-calculator": "oledBurnInCalculator",
    "display-certificate": "displayCertificate",
    "osd-calibration-guide": "osdCalibrationGuide",
    "new-monitor-wizard": "newMonitorWizard",
    "eink-refresh-tool": "einkRefreshTool"
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

    if (id === "custom-pattern") {
      try {
        title = tCustom("title");
        description = tCustom("subtitle");
      } catch {}
    }

    if (id === "compare-displays") {
      try {
        title = tCompare("title");
        description = tCompare("subtitle");
      } catch {}
    }

    if ((!title || !description) && toolsMap[id]) {
      try {
        if (!title) title = tTools(`items.${toolsMap[id]}.title`);
        if (!description) description = tTools(`items.${toolsMap[id]}.description`);
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

    const isTool = !!toolsMap[id];
    const href = isTool ? `/tools/${id}` : `/tests/${id}`;

    return {
      id,
      href,
      title: title || id,
      description: description || "",
      category
    };
  };

  const categories: ScreenTestCategory[] = [
    {
      id: "deadPixelsDefects",
      title: t("allTestsCategories.deadPixelsDefects"),
      tests: [
        getTestItem("dead-pixel-test", "deadPixelsDefects"),
        getTestItem("stuck-pixel-test", "deadPixelsDefects"),
        getTestItem("bright-pixel-test", "deadPixelsDefects"),
        getTestItem("stuck-pixel-fixer", "deadPixelsDefects"),
        getTestItem("dead-pixel-mapper", "deadPixelsDefects"),
        getTestItem("burn-in-test", "deadPixelsDefects"),
        getTestItem("oled-burn-in-calculator", "deadPixelsDefects"),
        getTestItem("pixel-inversion-test", "deadPixelsDefects"),
        getTestItem("temporal-dithering-test", "deadPixelsDefects")
      ]
    },
    {
      id: "colorGamut",
      title: t("allTestsCategories.colorGamut"),
      tests: [
        getTestItem("color-test", "colorGamut"),
        getTestItem("solid-color-test", "colorGamut"),
        getTestItem("color-gamut-test", "colorGamut"),
        getTestItem("color-accuracy-test", "colorGamut"),
        getTestItem("color-temperature-test", "colorGamut"),
        getTestItem("saturation-test", "colorGamut"),
        getTestItem("color-banding-test", "colorGamut"),
        getTestItem("gradient-banding-test", "colorGamut"),
        getTestItem("color-blindness-test", "colorGamut")
      ]
    },
    {
      id: "brightnessContrast",
      title: t("allTestsCategories.brightnessContrast"),
      tests: [
        getTestItem("contrast-test", "brightnessContrast"),
        getTestItem("brightness-test", "brightnessContrast"),
        getTestItem("black-level-test", "brightnessContrast"),
        getTestItem("near-black-test", "brightnessContrast"),
        getTestItem("white-level-test", "brightnessContrast"),
        getTestItem("grayscale-test", "brightnessContrast"),
        getTestItem("gamma-test", "brightnessContrast"),
        getTestItem("oled-abl-test", "brightnessContrast"),
        getTestItem("hdr-capability-test", "brightnessContrast"),
        getTestItem("hdr-test", "brightnessContrast"),
        getTestItem("hdr-peak-brightness-test", "brightnessContrast"),
        getTestItem("dark-mode-test", "brightnessContrast")
      ]
    },
    {
      id: "uniformityBacklight",
      title: t("allTestsCategories.uniformityBacklight"),
      tests: [
        getTestItem("uniformity-test", "uniformityBacklight"),
        getTestItem("backlight-bleed-test", "uniformityBacklight"),
        getTestItem("blooming-test", "uniformityBacklight"),
        getTestItem("viewing-angle-test", "uniformityBacklight"),
        getTestItem("screen-flicker-test", "uniformityBacklight"),
        getTestItem("pwm-flicker-test", "uniformityBacklight"),
        getTestItem("vrr-flicker-test", "uniformityBacklight")
      ]
    },
    {
      id: "motionGaming",
      title: t("allTestsCategories.motionGaming"),
      tests: [
        getTestItem("ghosting-test", "motionGaming"),
        getTestItem("motion-blur-test", "motionGaming"),
        getTestItem("refresh-rate-test", "motionGaming"),
        getTestItem("gtg-response-time-test", "motionGaming"),
        getTestItem("input-lag-test", "motionGaming"),
        getTestItem("vrr-test", "motionGaming"),
        getTestItem("screen-tearing-test", "motionGaming"),
        getTestItem("strobe-crosstalk-test", "motionGaming"),
        getTestItem("pursuit-camera-test", "motionGaming"),
        getTestItem("gpu-benchmark-test", "motionGaming")
      ]
    },
    {
      id: "sharpnessSpecs",
      title: t("allTestsCategories.sharpnessSpecs"),
      tests: [
        getTestItem("sharpness-test", "sharpnessSpecs"),
        getTestItem("text-clarity-test", "sharpnessSpecs"),
        getTestItem("subpixel-layout-test", "sharpnessSpecs"),
        getTestItem("scaling-aspect-test", "sharpnessSpecs"),
        getTestItem("tv-overscan-test", "sharpnessSpecs"),
        getTestItem("resolution-checker", "sharpnessSpecs"),
        getTestItem("display-info", "sharpnessSpecs"),
        getTestItem("compare-displays", "sharpnessSpecs"),
        getTestItem("custom-pattern", "sharpnessSpecs")
      ]
    },
    {
      id: "hardwareSensors",
      title: t("allTestsCategories.hardwareSensors"),
      tests: [
        getTestItem("touch-screen-test", "hardwareSensors"),
        getTestItem("multi-touch-test", "hardwareSensors"),
        getTestItem("reaction-time-test", "hardwareSensors"),
        getTestItem("mouse-polling-test", "hardwareSensors"),
        getTestItem("gamepad-test", "hardwareSensors"),
        getTestItem("audio-sync-test", "hardwareSensors"),
        getTestItem("audio-latency-test", "hardwareSensors"),
        getTestItem("speaker-test", "hardwareSensors"),
        getTestItem("microphone-test", "hardwareSensors"),
        getTestItem("webcam-test", "hardwareSensors"),
        getTestItem("accelerometer-test", "hardwareSensors"),
        getTestItem("gyroscope-test", "hardwareSensors"),
        getTestItem("vibration-test", "hardwareSensors"),
        getTestItem("ambient-light-test", "hardwareSensors"),
        getTestItem("battery-test", "hardwareSensors"),
        getTestItem("network-speed-test", "hardwareSensors")
      ]
    },
    {
      id: "toolsCalculators",
      title: t("allTestsCategories.toolsCalculators"),
      tests: [
        getTestItem("new-monitor-wizard", "toolsCalculators"),
        getTestItem("dpi-calculator", "toolsCalculators"),
        getTestItem("display-bandwidth-calculator", "toolsCalculators"),
        getTestItem("viewing-distance-calculator", "toolsCalculators"),
        getTestItem("dual-monitor-matcher", "toolsCalculators"),
        getTestItem("screen-recorder", "toolsCalculators"),
        getTestItem("display-certificate", "toolsCalculators"),
        getTestItem("osd-calibration-guide", "toolsCalculators"),
        getTestItem("eink-refresh-tool", "toolsCalculators")
      ]
    }
  ];

  return (
    <div className="flex-1 bg-white text-gray-950">
      {/* ================================================== */}
      {/* 1. HERO SECTION                                    */}
      {/* ================================================== */}
      <section className="relative overflow-hidden bg-[#f8f8f7] border-b border-gray-200/60">
        {/* Full-bleed fluid artwork — positioned absolutely to bleed to the right viewport edge */}
        <div className="absolute top-0 bottom-0 right-0 w-[70%] sm:w-[68%] md:w-[65%] lg:w-[63%] xl:w-[62%] pointer-events-none select-none z-0">
          <Image
            src="/hero-fluid.webp"
            alt="Screen Tester Abstract Fluid Wave Display Test Visual"
            width={1920}
            height={1080}
            priority
            className="w-full h-full object-cover object-left-top"
          />
          {/* Smooth fade overlays — left, bottom, and corner so artwork dissolves naturally */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8f8f7] via-[#f8f8f7]/40 to-transparent" style={{ width: '45%' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8f8f7] via-transparent to-transparent" style={{ height: '35%', top: 'auto', bottom: 0 }} />
          <div className="absolute bottom-0 left-0 w-[50%] h-[40%] bg-gradient-to-tr from-[#f8f8f7] via-[#f8f8f7]/30 to-transparent" />
        </div>

        {/* Content container */}
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Left Hero Content */}
          <div className="max-w-2xl pt-14 sm:pt-16 md:pt-20 lg:pt-24 pb-14 sm:pb-16 md:pb-20 lg:pb-24">
            {/* Monospace Eyebrow */}
            <div className="text-xs sm:text-[13px] font-mono font-bold uppercase tracking-[0.22em] text-gray-800 mb-4 sm:mb-5 select-none">
              {t("eyebrow")}
            </div>

            {/* Big Bold Headline */}
            <h1 className="text-[32px] sm:text-[40px] md:text-[50px] lg:text-[56px] xl:text-[60px] font-extrabold tracking-[-0.035em] text-gray-950 leading-[1.06] mb-5 sm:mb-6">
              {t("h1")}
            </h1>

            {/* Editorial Supporting Description */}
            <p className="text-sm sm:text-[15px] md:text-base text-gray-600 leading-relaxed max-w-xl font-normal">
              {t("description")}
            </p>
          </div>
        </div>
      </section>
      {/* ================================================== */}
      {/* 1.5 SMART DEVICE DETECTION                         */}
      {/* ================================================== */}
      <SmartDeviceDetection />

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
            target="_blank"
            rel="noopener noreferrer"
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
            target="_blank"
            rel="noopener noreferrer"
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
            target="_blank"
            rel="noopener noreferrer"
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
            target="_blank"
            rel="noopener noreferrer"
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