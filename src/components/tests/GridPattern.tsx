"use client";

import { useState, useEffect } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { useTranslations } from "next-intl";

interface GridPatternProps {
  type: "brightness" | "contrast";
  testId?: string;
}

type CalibrationMode = "uniform" | "near-black" | "near-white" | "gradient";

// 25 Uniform Steps from 0% to 100%
const UNIFORM_STEPS = Array.from({ length: 25 }, (_, i) => {
  const percent = Math.round((i / 24) * 100);
  const rgb = Math.round((i / 24) * 255);
  return { percent, rgb };
});

// Fine-tuning Near-Black steps (for Brightness / Black Level calibration)
const NEAR_BLACK_STEPS = [
  { percent: 0, rgb: 0 },
  { percent: 1, rgb: 3 },
  { percent: 2, rgb: 5 },
  { percent: 3, rgb: 8 },
  { percent: 4, rgb: 10 },
  { percent: 5, rgb: 13 },
  { percent: 6, rgb: 15 },
  { percent: 7, rgb: 18 },
  { percent: 8, rgb: 20 },
  { percent: 10, rgb: 26 },
  { percent: 12, rgb: 31 },
  { percent: 15, rgb: 38 },
  { percent: 18, rgb: 46 },
  { percent: 20, rgb: 51 },
  { percent: 25, rgb: 64 },
];

// Fine-tuning Near-White steps (for Contrast / White Level calibration)
const NEAR_WHITE_STEPS = [
  { percent: 100, rgb: 255 },
  { percent: 99, rgb: 252 },
  { percent: 98, rgb: 250 },
  { percent: 97, rgb: 247 },
  { percent: 96, rgb: 245 },
  { percent: 95, rgb: 242 },
  { percent: 94, rgb: 240 },
  { percent: 93, rgb: 237 },
  { percent: 92, rgb: 235 },
  { percent: 90, rgb: 230 },
  { percent: 88, rgb: 224 },
  { percent: 85, rgb: 217 },
  { percent: 82, rgb: 209 },
  { percent: 80, rgb: 204 },
  { percent: 75, rgb: 191 },
];

export function GridPattern({ type, testId }: GridPatternProps) {
    const t = useTranslations("Tests.GridPattern");
  const { registerNavigation } = useTestContext();
  const [mode, setMode] = useState<CalibrationMode>(type === "brightness" ? "uniform" : "uniform");
  const [showLabels, setShowLabels] = useState(true);
  const [showRgb, setShowRgb] = useState(false);

  useEffect(() => {
    registerNavigation({
      next: () => setMode((m) => {
        if (m === "uniform") return "near-black";
        if (m === "near-black") return "near-white";
        if (m === "near-white") return "gradient";
        return "uniform";
      }),
      prev: () => setMode((m) => {
        if (m === "gradient") return "near-white";
        if (m === "near-white") return "near-black";
        if (m === "near-black") return "uniform";
        return "gradient";
      }),
      reset: () => {
        setMode("uniform");
        setShowLabels(true);
      },
    });
  }, [registerNavigation]);

  return (
    <>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black p-3 sm:p-5 select-none overflow-hidden">
        
        {/* Top Target Calibration Hint */}
        <div className="mb-2 px-4 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-[11px] sm:text-xs text-neutral-300 text-center max-w-2xl">
          {type === "brightness" 
            ? "Calibration Goal: Adjust monitor Brightness until step 2% is barely distinguishable from 0%."
            : "Calibration Goal: Adjust monitor Contrast until step 98% (RGB 250) is clearly distinguishable from 100% white without clipping."}
        </div>

        {/* VIEW 1: UNIFORM 25-STEP MATRIX (0% - 100%) */}
        {mode === "uniform" && (
          <div className="grid grid-cols-5 grid-rows-5 gap-1.5 sm:gap-2.5 w-full max-w-3xl h-full max-h-[82%] min-h-0">
            {UNIFORM_STEPS.map((step, index) => {
              const bgRgb = type === "contrast" ? 255 - step.rgb : step.rgb;
              const displayPercent = type === "contrast" ? 100 - step.percent : step.percent;
              const color = `rgb(${bgRgb}, ${bgRgb}, ${bgRgb})`;
              const isDark = bgRgb < 128;
              const textColor = isDark ? "text-white" : "text-black";
              const borderColor = isDark ? "border-white/15" : "border-black/15";

              return (
                <div 
                  key={index}
                  className={`min-h-0 min-w-0 flex flex-col items-center justify-center relative rounded-md border ${borderColor} shadow-xs transition-all`}
                  style={{ backgroundColor: color }}
                >
                  {showLabels && (
                    <span className={`text-[10px] sm:text-xs font-semibold tracking-tight ${textColor} drop-shadow-xs`}>
                      {displayPercent}%
                    </span>
                  )}
                  {showLabels && showRgb && (
                    <span className={`text-[8px] sm:text-[9px] font-mono opacity-60 ${textColor}`}>
                      {bgRgb}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW 2: NEAR-BLACK TUNING (0% - 25%) */}
        {mode === "near-black" && (
          <div className="flex flex-col items-center justify-center w-full max-w-3xl h-full max-h-[82%] min-h-0 space-y-3">
            <div className="text-xs text-neutral-300 font-medium">
              {t("nearBlackShadowCalibration")}</div>
            <div className="grid grid-cols-5 grid-rows-3 gap-2 sm:gap-3 w-full h-full min-h-0">
              {NEAR_BLACK_STEPS.map((step, index) => {
                const color = `rgb(${step.rgb}, ${step.rgb}, ${step.rgb})`;
                return (
                  <div
                    key={index}
                    className="min-h-0 min-w-0 flex flex-col items-center justify-center relative rounded-md border border-neutral-700/60 shadow-xs"
                    style={{ backgroundColor: color }}
                  >
                    <span className="text-[11px] sm:text-xs font-semibold text-white/90">
                      {step.percent}%
                    </span>
                    <span className="text-[9px] font-mono text-white/50">
                      {t("rgb")}{step.rgb}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 3: NEAR-WHITE TUNING (75% - 100%) */}
        {mode === "near-white" && (
          <div className="flex flex-col items-center justify-center w-full max-w-3xl h-full max-h-[82%] min-h-0 space-y-3">
            <div className="text-xs text-neutral-300 font-medium">
              {t("nearWhiteHighlightCalibration")}</div>
            <div className="grid grid-cols-5 grid-rows-3 gap-2 sm:gap-3 w-full h-full min-h-0">
              {NEAR_WHITE_STEPS.map((step, index) => {
                const color = `rgb(${step.rgb}, ${step.rgb}, ${step.rgb})`;
                return (
                  <div
                    key={index}
                    className="min-h-0 min-w-0 flex flex-col items-center justify-center relative rounded-md border border-neutral-400/40 shadow-xs"
                    style={{ backgroundColor: color }}
                  >
                    <span className="text-[11px] sm:text-xs font-semibold text-black/90">
                      {step.percent}%
                    </span>
                    <span className="text-[9px] font-mono text-black/50">
                      {t("rgb")}{step.rgb}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 4: STEP WEDGE & CONTINUOUS GRADIENT */}
        {mode === "gradient" && (
          <div className="flex flex-col justify-center w-full max-w-3xl h-full max-h-[82%] min-h-0 space-y-4 px-2">
            <div>
              <div className="text-xs text-neutral-400 mb-1 font-mono">{t("16StepQuantizedGrayscale")}</div>
              <div className="flex h-14 sm:h-20 w-full rounded-md overflow-hidden border border-neutral-700">
                {Array.from({ length: 16 }, (_, i) => {
                  const val = Math.round((i / 15) * 255);
                  const pct = Math.round((i / 15) * 100);
                  const isDark = val < 128;
                  return (
                    <div 
                      key={i} 
                      className="flex-1 h-full flex flex-col items-center justify-center border-r border-neutral-800 last:border-r-0"
                      style={{ backgroundColor: `rgb(${val}, ${val}, ${val})` }}
                    >
                      <span className={`text-[9px] font-semibold ${isDark ? "text-white" : "text-black"}`}>
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-xs text-neutral-400 mb-1 font-mono">{t("continuous8BitGradient")}</div>
              <div 
                className="h-14 sm:h-20 w-full rounded-md border border-neutral-700 relative"
                style={{ background: "linear-gradient(to right, rgb(0,0,0), rgb(255,255,255))" }}
              >
                <div className="absolute inset-0 flex justify-between items-center px-3 text-[10px] font-mono font-bold select-none pointer-events-none">
                  <span className="text-white">0% (0)</span>
                  <span className="text-neutral-400">50% (128)</span>
                  <span className="text-black">100% (255)</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <TestControlBar 
        testId={testId} 
        title={type === "brightness" ? "Brightness Calibration" : "Contrast Calibration"}
      >
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Selector */}
          <div className="flex items-center bg-muted/60 p-0.5 rounded-lg border border-border/50 text-xs">
            <button
              onClick={() => setMode("uniform")}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                mode === "uniform" 
                  ? "bg-white text-gray-950 font-bold shadow-xs" 
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
            >
              {t("25Steps")}</button>
            <button
              onClick={() => setMode("near-black")}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                mode === "near-black" 
                  ? "bg-white text-gray-950 font-bold shadow-xs" 
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
            >
              {t("nearBlack")}</button>
            <button
              onClick={() => setMode("near-white")}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                mode === "near-white" 
                  ? "bg-white text-gray-950 font-bold shadow-xs" 
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
            >
              {t("nearWhite")}</button>
            <button
              onClick={() => setMode("gradient")}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                mode === "gradient" 
                  ? "bg-white text-gray-950 font-bold shadow-xs" 
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
            >
              {t("ramp")}</button>
          </div>

          {/* Label toggles (for 25 Steps mode) */}
          {mode === "uniform" && (
            <div className="flex items-center gap-1.5 border-l border-border/50 pl-2">
              <button
                onClick={() => setShowLabels((p) => !p)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                  showLabels 
                    ? "bg-white text-gray-950 font-bold shadow-xs" 
                    : "border-border/50 text-gray-700 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-muted dark:hover:bg-white/10"
                }`}
              >
                {showLabels ? "Hide %" : "Show %"}
              </button>
              {showLabels && (
                <button
                  onClick={() => setShowRgb((p) => !p)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                    showRgb 
                      ? "bg-white text-gray-950 font-bold shadow-xs" 
                      : "border-border/50 text-gray-700 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-muted dark:hover:bg-white/10"
                  }`}
                >
                  {showRgb ? "RGB: On" : "RGB: Off"}
                </button>
              )}
            </div>
          )}
        </div>
      </TestControlBar>
    </>
  );
}