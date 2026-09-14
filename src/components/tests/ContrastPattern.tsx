"use client";

import { useState, useEffect, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { ChevronLeft, ChevronRight, Eye, Info, ShieldAlert, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ContrastPatternProps {
  testId?: string;
}

type ContrastMode = "fullRange" | "blackLevel" | "whiteLevel" | "gradientRamp" | "colorContrast";

interface ModeInfo {
  id: ContrastMode;
  label: string;
  description: string;
}

const CONTRAST_MODES: ModeInfo[] = [
  {
    id: "fullRange",
    label: "Grayscale Step / Tone Ramp",
    description: "Inspect tonal steps from absolute black (0) to absolute white (255) simultaneously. Verify all steps are distinct."
  },
  {
    id: "blackLevel",
    label: "Black Level (Shadows)",
    description: "Check if near-black details are distinct or crushed into pure black."
  },
  {
    id: "whiteLevel",
    label: "White Level (Highlights)",
    description: "Check if bright highlights are distinct or clipped into pure white."
  },
  {
    id: "gradientRamp",
    label: "Smooth Gradient Ramp",
    description: "Inspect continuous tonal gradation for banding lines or posterization."
  },
  {
    id: "colorContrast",
    label: "Colour Contrast Separation",
    description: "Check if primary and contrasting colors remain visually distinct without unexpected merging or clipping."
  }
];

// Near-black discrete RGB values for shadow detail inspection (0 to 18)
const NEAR_BLACK_STEPS = [
  { label: "0 (Pure Black)", rgb: 0, percent: "0.0%" },
  { label: "1", rgb: 2, percent: "0.8%" },
  { label: "2", rgb: 4, percent: "1.6%" },
  { label: "3", rgb: 7, percent: "2.7%" },
  { label: "4", rgb: 10, percent: "3.9%" },
  { label: "5", rgb: 13, percent: "5.1%" },
  { label: "6", rgb: 16, percent: "6.3%" },
  { label: "7", rgb: 20, percent: "7.8%" },
  { label: "8", rgb: 25, percent: "9.8%" },
  { label: "9", rgb: 30, percent: "11.8%" }
];

// Near-white discrete RGB values for highlight detail inspection (235 to 255)
const NEAR_WHITE_STEPS = [
  { label: "235", rgb: 235, percent: "92.2%" },
  { label: "240", rgb: 240, percent: "94.1%" },
  { label: "245", rgb: 245, percent: "96.1%" },
  { label: "248", rgb: 248, percent: "97.3%" },
  { label: "250", rgb: 250, percent: "98.0%" },
  { label: "252", rgb: 252, percent: "98.8%" },
  { label: "253", rgb: 253, percent: "99.2%" },
  { label: "254", rgb: 254, percent: "99.6%" },
  { label: "255 (Pure White)", rgb: 255, percent: "100%" }
];

// Full range 16-step grayscale distribution
const FULL_RANGE_STEPS = Array.from({ length: 16 }, (_, i) => {
  const rgb = Math.round((i / 15) * 255);
  const pct = Math.round((i / 15) * 100);
  return { rgb, pct };
});

export function ContrastPattern({ testId = "contrast-test" }: ContrastPatternProps) {
    const t = useTranslations("Tests.ContrastPattern");
  const { registerNavigation } = useTestContext();
  const [activeModeIndex, setActiveModeIndex] = useState(0);

  const currentMode = CONTRAST_MODES[activeModeIndex];

  const nextMode = useCallback(() => {
    setActiveModeIndex((prev) => (prev + 1) % CONTRAST_MODES.length);
  }, []);

  const prevMode = useCallback(() => {
    setActiveModeIndex((prev) => (prev - 1 + CONTRAST_MODES.length) % CONTRAST_MODES.length);
  }, []);

  useEffect(() => {
    registerNavigation({
      next: nextMode,
      prev: prevMode,
      reset: () => setActiveModeIndex(0),
    });
  }, [registerNavigation, nextMode, prevMode]);

  return (
    <>
      {/* Viewport Test Area */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center select-none overflow-hidden transition-colors duration-200 cursor-pointer"
        onClick={nextMode}
        tabIndex={0}
        aria-label={`Contrast test: ${currentMode.label}. Click or use arrow keys to change mode.`}
        style={{
          backgroundColor:
            currentMode.id === "blackLevel"
              ? "#000000"
              : currentMode.id === "whiteLevel"
              ? "#FFFFFF"
              : "#111111"
        }}
      >
        {/* Concise On-Screen Inspection Instruction Badge (Click-through) */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-center pointer-events-none">
          <div className="bg-black/80 dark:bg-black/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 text-white shadow-xl max-w-2xl text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-400">
              <Eye className="w-3.5 h-3.5" />
              <span>{currentMode.label}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60 font-mono text-[11px]">
                {t("stage")}{activeModeIndex + 1} {t("of")}{CONTRAST_MODES.length}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-white/90 leading-normal">
              {currentMode.description}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MODE 1: FULL RANGE SCALE (All levels from Black to White)  */}
        {/* ========================================================= */}
        {currentMode.id === "fullRange" && (
          <div className="w-full max-w-5xl px-4 sm:px-8 py-16 flex flex-col items-center justify-center gap-6 text-white">
            {/* 16-step discrete tonal ramp */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-white/70 px-1">
                <span>{t("0PureBlackRgb")}</span>
                <span className="hidden sm:inline">{t("50MidtoneRgb128")}</span>
                <span>{t("100PureWhiteRgb")}</span>
              </div>
              <div className="grid grid-cols-8 sm:grid-cols-16 gap-1 w-full p-2 bg-black/60 rounded-2xl border border-white/15 shadow-2xl">
                {FULL_RANGE_STEPS.map((step, idx) => (
                  <div
                    key={idx}
                    className="h-20 sm:h-28 rounded-lg flex flex-col justify-between p-1.5 transition-transform hover:scale-105"
                    style={{ backgroundColor: `rgb(${step.rgb}, ${step.rgb}, ${step.rgb})` }}
                  >
                    <span
                      className="text-[9px] font-mono font-bold"
                      style={{ color: step.rgb > 128 ? "#000000" : "#FFFFFF" }}
                    >
                      {step.pct}%
                    </span>
                    <span
                      className="text-[8px] font-mono opacity-60 hidden md:block"
                      style={{ color: step.rgb > 128 ? "#000000" : "#FFFFFF" }}
                    >
                      {step.rgb}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Side-by-side Dark vs Bright Discrimination Patches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Near-Black Reference Zone */}
              <div className="p-4 rounded-2xl bg-black border border-white/20 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono">{t("shadowDiscrimination")}</span>
                  <span className="text-[10px] font-mono text-emerald-400">{t("targetStep2Distinct")}</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {NEAR_BLACK_STEPS.slice(0, 5).map((step, i) => (
                    <div
                      key={step.rgb}
                      className={cn(
                        "h-16 rounded-lg flex flex-col items-center justify-between p-1.5 border transition-all",
                        i === 0 ? "border-white/30" : i === 2 ? "border-blue-500 ring-1 ring-blue-500" : "border-white/10"
                      )}
                      style={{ backgroundColor: `rgb(${step.rgb}, ${step.rgb}, ${step.rgb})` }}
                    >
                      <span className="text-[10px] font-mono font-bold text-white/90">{step.rgb}</span>
                      <span className="text-[8px] font-mono text-white/50">{step.percent}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Near-White Reference Zone */}
              <div className="p-4 rounded-2xl bg-white text-black border border-black/20 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono">{t("highlightDiscrimination")}</span>
                  <span className="text-[10px] font-mono text-blue-600 font-bold">{t("target253DistinctFrom")}</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {NEAR_WHITE_STEPS.slice(4).map((step, i) => (
                    <div
                      key={step.rgb}
                      className={cn(
                        "h-16 rounded-lg flex flex-col items-center justify-between p-1.5 border transition-all",
                        step.rgb === 255 ? "border-black/40" : step.rgb === 253 ? "border-blue-600 ring-1 ring-blue-600" : "border-black/10"
                      )}
                      style={{ backgroundColor: `rgb(${step.rgb}, ${step.rgb}, ${step.rgb})` }}
                    >
                      <span className="text-[10px] font-mono font-bold text-black/90">{step.rgb}</span>
                      <span className="text-[8px] font-mono text-black/60">{step.percent}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 2: BLACK LEVEL (Near-Black Shadow Detail)            */}
        {/* ========================================================= */}
        {currentMode.id === "blackLevel" && (
          <div className="w-full max-w-5xl px-4 sm:px-8 py-16 flex flex-col items-center justify-center gap-6">
            <div className="text-center space-y-1">
              <span className="text-xs sm:text-sm font-semibold text-white block">
                {t("blackLevelShadowDetail")}</span>
              <span className="text-xs text-amber-300 font-mono font-semibold block">
                {t("eachBlockIsSlightly")}</span>
            </div>

            {/* Stepped shadow patches with embedded inner squares */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full p-4 rounded-2xl bg-black border border-white/20 shadow-2xl">
              {NEAR_BLACK_STEPS.map((step, i) => (
                <div
                  key={step.rgb}
                  className={cn(
                    "h-28 sm:h-32 rounded-xl flex flex-col items-center justify-between p-2.5 border transition-all relative group",
                    i === 0 
                      ? "border-white/40 ring-1 ring-white/20" 
                      : i === 2 
                      ? "border-emerald-400 ring-1 ring-emerald-400/60" 
                      : "border-white/10 hover:border-white/30"
                  )}
                  style={{ backgroundColor: `rgb(${step.rgb}, ${step.rgb}, ${step.rgb})` }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-bold text-white/90">{t("rgb")}{step.rgb}</span>
                    {i === 2 && (
                      <span className="text-[8px] uppercase tracking-wider font-bold bg-emerald-600 text-white px-1 py-0.5 rounded">
                        {t("keyStep")}</span>
                    )}
                  </div>

                  {/* Inner subtle square patch for visibility discrimination */}
                  <div
                    className="w-10 h-10 rounded-md border border-white/10 flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: `rgb(${Math.min(255, step.rgb + 4)}, ${Math.min(255, step.rgb + 4)}, ${Math.min(255, step.rgb + 4)})` }}
                  >
                    <span className="text-[8px] font-mono text-white/40 font-bold">+4</span>
                  </div>

                  <span className="text-xs font-mono font-bold text-amber-300">{step.percent}</span>
                </div>
              ))}
            </div>

            <div className="text-xs font-mono text-amber-200 text-center max-w-xl font-semibold bg-black/70 px-4 py-2 rounded-xl border border-white/20">
              {t("ifSteps1Through")}<strong>{t("crushedBlacks")}</strong> {t("contrastTooHighOr")}</div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 3: WHITE LEVEL (Near-White Highlight Detail)          */}
        {/* ========================================================= */}
        {currentMode.id === "whiteLevel" && (
          <div className="w-full max-w-5xl px-4 sm:px-8 py-16 flex flex-col items-center justify-center gap-6">
            <div className="text-center space-y-1">
              <span className="text-xs sm:text-sm font-semibold text-black block">
                {t("whiteLevelHighlightClipping")}</span>
              <span className="text-[11px] text-black/60 font-mono block">
                {t("eachBlockIsSlightly_1")}</span>
            </div>

            {/* Stepped highlight patches with embedded inner squares */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 w-full p-4 rounded-2xl bg-white border border-black/20 shadow-2xl">
              {NEAR_WHITE_STEPS.map((step) => {
                const isKey = step.rgb === 253 || step.rgb === 254;
                return (
                  <div
                    key={step.rgb}
                    className={cn(
                      "h-28 sm:h-32 rounded-xl flex flex-col items-center justify-between p-2.5 border transition-all relative",
                      step.rgb === 255 
                        ? "border-black/50 ring-1 ring-black/30" 
                        : isKey 
                        ? "border-blue-600 ring-1 ring-blue-600/50" 
                        : "border-black/10 hover:border-black/30"
                    )}
                    style={{ backgroundColor: `rgb(${step.rgb}, ${step.rgb}, ${step.rgb})` }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-mono font-bold text-black/90">{t("rgb")}{step.rgb}</span>
                      {isKey && (
                        <span className="text-[8px] uppercase tracking-wider font-bold bg-blue-600 text-white px-1 py-0.5 rounded">
                          {t("keyStep")}</span>
                      )}
                    </div>

                    {/* Inner subtle darker patch */}
                    <div
                      className="w-10 h-10 rounded-md border border-black/10 flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: `rgb(${Math.max(0, step.rgb - 4)}, ${Math.max(0, step.rgb - 4)}, ${Math.max(0, step.rgb - 4)})` }}
                    >
                      <span className="text-[8px] font-mono text-black/40 font-bold">-4</span>
                    </div>

                    <span className="text-[9px] font-mono text-black/60">{step.percent}</span>
                  </div>
                );
              })}
            </div>

            <div className="text-[11px] font-mono text-black/60 text-center max-w-xl">
              {t("ifSteps252253")}<strong>{t("clippedWhites")}</strong> {t("monitorContrastOrBrightness")}</div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 4: SMOOTH GRADIENT RAMP (Continuous 0-255)          */}
        {/* ========================================================= */}
        {currentMode.id === "gradientRamp" && (
          <div className="w-full max-w-4xl px-4 sm:px-8 py-16 flex flex-col items-center justify-center gap-6 text-white">
            <div className="text-center space-y-1">
              <span className="text-xs sm:text-sm font-semibold text-white block">
                {t("continuous0255Grayscale")}</span>
              <span className="text-[11px] text-white/60 font-mono block">
                {t("inspectForSmoothSeamless")}</span>
            </div>

            {/* Continuous Smooth Gradient Bar */}
            <div className="w-full space-y-2">
              <div 
                className="w-full h-28 sm:h-36 rounded-2xl border-2 border-white/20 shadow-2xl relative"
                style={{ background: "linear-gradient(to right, rgb(0,0,0), rgb(128,128,128), rgb(255,255,255))" }}
              />
              <div className="flex justify-between text-[10px] sm:text-xs font-mono text-white/60 px-1">
                <span>{t("0PureBlack")}</span>
                <span>{t("64Dark")}</span>
                <span>{t("128Midtone")}</span>
                <span>{t("192Light")}</span>
                <span>{t("255PureWhite")}</span>
              </div>
            </div>

            {/* 32-step stepped wedge directly below for quantization comparison */}
            <div className="w-full space-y-1.5 mt-4">
              <span className="text-[11px] font-mono text-white/70 block">
                {t("32StepQuantizedLuminance")}</span>
              <div className="grid grid-cols-16 sm:grid-cols-32 gap-0.5 w-full h-12 rounded-xl overflow-hidden border border-white/20">
                {Array.from({ length: 32 }, (_, i) => {
                  const val = Math.round((i / 31) * 255);
                  return (
                    <div
                      key={i}
                      className="h-full transition-opacity hover:opacity-80"
                      style={{ backgroundColor: `rgb(${val}, ${val}, ${val})` }}
                      title={`Step ${i + 1}/32: RGB ${val}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 5: COLOUR CONTRAST SEPARATION                        */}
        {/* ========================================================= */}
        {currentMode.id === "colorContrast" && (
          <div className="w-full max-w-5xl px-4 sm:px-8 py-16 flex flex-col items-center justify-center gap-6">
            <div className="text-center space-y-1">
              <span className="text-xs sm:text-sm font-semibold text-white block">
                {t("chromaticColourContrastInspection")}</span>
              <span className="text-[11px] text-white/60 font-mono block">
                {t("verifyThatDistinctColors")}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Primary Channel Separation */}
              <div className="p-4 rounded-2xl bg-black border border-white/20 shadow-xl space-y-3">
                <span className="text-xs font-bold text-white font-mono block">{t("primaryChannelSeparation")}</span>
                <div className="grid grid-cols-3 gap-2 h-24">
                  <div className="bg-[#FF0000] rounded-lg flex items-center justify-center border border-white/10"><span className="text-[10px] font-mono font-bold text-white mix-blend-difference">{t("pureRed")}</span></div>
                  <div className="bg-[#00FF00] rounded-lg flex items-center justify-center border border-white/10"><span className="text-[10px] font-mono font-bold text-black mix-blend-difference">{t("pureGreen")}</span></div>
                  <div className="bg-[#0000FF] rounded-lg flex items-center justify-center border border-white/10"><span className="text-[10px] font-mono font-bold text-white mix-blend-difference">{t("pureBlue")}</span></div>
                </div>
              </div>

              {/* Contrasting Pairs */}
              <div className="p-4 rounded-2xl bg-black border border-white/20 shadow-xl space-y-3">
                <span className="text-xs font-bold text-white font-mono block">{t("contrastingPairsClippingCheck")}</span>
                <div className="grid grid-cols-2 gap-2 h-24">
                  {/* Pair 1 */}
                  <div className="rounded-lg flex overflow-hidden border border-white/10 relative">
                    <div className="w-1/2 bg-[#FF0000]"></div>
                    <div className="w-1/2 bg-[#00FFFF]"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-white mix-blend-difference pointer-events-none">{t("redVsCyan")}</span>
                  </div>
                  {/* Pair 2 */}
                  <div className="rounded-lg flex overflow-hidden border border-white/10 relative">
                    <div className="w-1/2 bg-[#0000FF]"></div>
                    <div className="w-1/2 bg-[#FFFF00]"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-white mix-blend-difference pointer-events-none">{t("blueVsYellow")}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Embedded Detail Check */}
            <div className="p-4 w-full rounded-2xl bg-[#7F7F7F] border border-black/20 shadow-xl space-y-3">
              <span className="text-xs font-bold text-black font-mono block">{t("saturatedDetailVsNeutral")}</span>
              <div className="flex flex-col sm:flex-row gap-2 h-24">
                <div className="flex-1 bg-[#FF0000] rounded-lg flex items-center justify-center border border-black/10 relative">
                  <div className="w-12 h-12 bg-[#E60000] rounded-md shadow-inner flex items-center justify-center"><span className="text-[9px] font-bold text-white opacity-50">-10%</span></div>
                </div>
                <div className="flex-1 bg-[#00FF00] rounded-lg flex items-center justify-center border border-black/10 relative">
                  <div className="w-12 h-12 bg-[#00E600] rounded-md shadow-inner flex items-center justify-center"><span className="text-[9px] font-bold text-black opacity-50">-10%</span></div>
                </div>
                <div className="flex-1 bg-[#0000FF] rounded-lg flex items-center justify-center border border-black/10 relative">
                  <div className="w-12 h-12 bg-[#0000E6] rounded-md shadow-inner flex items-center justify-center"><span className="text-[9px] font-bold text-white opacity-50">-10%</span></div>
                </div>
              </div>
              <p className="text-[11px] font-mono text-black/70 mt-2 text-center">
                {t("youShouldBeAble")}</p>
            </div>
          </div>
        )}
      </div>

      {/* Control Bar Dock */}
      <TestControlBar testId={testId} title={t("colorContrastRangeInspectionTitle")}>
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/10 p-1 rounded-lg border border-slate-200 dark:border-border/50">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevMode();
              }}
              className="p-1.5 hover:bg-slate-200 dark:hover:bg-white/20 rounded transition-colors text-amber-600 dark:text-amber-300 cursor-pointer"
              title={t("previousModeLeftArrowTitle")}
              aria-label={t("previousModeTitle")}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {CONTRAST_MODES.map((mode, idx) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModeIndex(idx);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                    idx === activeModeIndex
                      ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300 font-extrabold"
                      : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 dark:bg-white/15 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/20 font-semibold"
                  )}
                >
                  {mode.label.split(" (")[0]}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextMode();
              }}
              className="p-1.5 hover:bg-slate-200 dark:hover:bg-white/20 rounded transition-colors text-amber-600 dark:text-amber-300 cursor-pointer"
              title={t("nextModeRightArrowTitle")}
              aria-label={t("nextModeTitle")}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </TestControlBar>
    </>
  );
}

/**
 * Educational & Calibration Guidance
 * Rendered cleanly below the viewport via extraControls in TestWrapper
 */
export function ContrastGuidance() {
    const t = useTranslations("Tests.ContrastPattern");
  return (
    <div className="w-full max-w-4xl mx-auto bg-card border border-border/70 rounded-2xl p-5 shadow-xs space-y-4">
      {/* Honesty Banner */}
      <div className="p-4 bg-blue-50 border border-blue-200 dark:bg-blue-950/40 dark:border-blue-800 rounded-xl text-xs text-blue-950 dark:text-blue-100 leading-relaxed space-y-1">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldAlert className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>{t("visualInspectionAidNot")}</span>
        </div>
        <p className="text-blue-900 dark:text-blue-200">
          {t("standardWebBrowsersRender")}</p>
      </div>

      {/* 3 Clear Inspection Directives */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <Eye className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t("1WhatYouAre")}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {t("checksWhetherNearBlack")}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
            <span>{t("2WhatToDo")}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {t("viewTheDisplayPerpendicular")}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <Info className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{t("3WhatIndicatesA")}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            <strong>{t("crushedBlacks_1")}</strong> {t("darkPatchesMergeInto")}<strong>{t("clippedWhites_1")}</strong> {t("brightPatchesBlendInto")}</p>
        </div>
      </div>
    </div>
  );
}
