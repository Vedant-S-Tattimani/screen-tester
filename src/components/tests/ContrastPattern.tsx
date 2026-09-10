"use client";

import { useState, useEffect, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { ChevronLeft, ChevronRight, Eye, Info, ShieldAlert, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContrastPatternProps {
  testId?: string;
}

type ContrastMode = "fullRange" | "blackLevel" | "whiteLevel" | "gradientRamp";

interface ModeInfo {
  id: ContrastMode;
  label: string;
  description: string;
}

const CONTRAST_MODES: ModeInfo[] = [
  {
    id: "fullRange",
    label: "Full Range Scale",
    description: "Inspect tonal steps from absolute black (0) to absolute white (255) simultaneously."
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
                Stage {activeModeIndex + 1} of {CONTRAST_MODES.length}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-white/90 leading-normal">
              Look closely at the darkest and brightest patches. You should be able to distinguish near-black from black and near-white from white.
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
                <span>0% Pure Black (RGB 0)</span>
                <span className="hidden sm:inline">50% Midtone (RGB 128)</span>
                <span>100% Pure White (RGB 255)</span>
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
                  <span className="text-xs font-bold text-white font-mono">Shadow Discrimination</span>
                  <span className="text-[10px] font-mono text-emerald-400">Target: Step 2 distinct from 0</span>
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
                  <span className="text-xs font-bold font-mono">Highlight Discrimination</span>
                  <span className="text-[10px] font-mono text-blue-600 font-bold">Target: 253 distinct from 255</span>
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
                Black Level & Shadow Detail Calibration
              </span>
              <span className="text-xs text-amber-300 font-mono font-semibold block">
                Each block is slightly brighter than pure black. Can you distinguish the steps from the black surround?
              </span>
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
                    <span className="text-[10px] font-mono font-bold text-white/90">RGB {step.rgb}</span>
                    {i === 2 && (
                      <span className="text-[8px] uppercase tracking-wider font-bold bg-emerald-600 text-white px-1 py-0.5 rounded">
                        Key Step
                      </span>
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
              If steps 1 through 3 blend completely into the background, your display has <strong>crushed blacks</strong> (contrast too high or gamma too steep).
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 3: WHITE LEVEL (Near-White Highlight Detail)          */}
        {/* ========================================================= */}
        {currentMode.id === "whiteLevel" && (
          <div className="w-full max-w-5xl px-4 sm:px-8 py-16 flex flex-col items-center justify-center gap-6">
            <div className="text-center space-y-1">
              <span className="text-xs sm:text-sm font-semibold text-black block">
                White Level & Highlight Clipping Calibration
              </span>
              <span className="text-[11px] text-black/60 font-mono block">
                Each block is slightly darker than pure white. Can you distinguish the steps from the white surround?
              </span>
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
                      <span className="text-[10px] font-mono font-bold text-black/90">RGB {step.rgb}</span>
                      {isKey && (
                        <span className="text-[8px] uppercase tracking-wider font-bold bg-blue-600 text-white px-1 py-0.5 rounded">
                          Key Step
                        </span>
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
              If steps 252, 253, and 254 look identical to pure white 255, your display has <strong>clipped whites</strong> (monitor contrast or brightness is set too high).
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 4: SMOOTH GRADIENT RAMP (Continuous 0-255)          */}
        {/* ========================================================= */}
        {currentMode.id === "gradientRamp" && (
          <div className="w-full max-w-4xl px-4 sm:px-8 py-16 flex flex-col items-center justify-center gap-6 text-white">
            <div className="text-center space-y-1">
              <span className="text-xs sm:text-sm font-semibold text-white block">
                Continuous 0–255 Grayscale Dynamic Range
              </span>
              <span className="text-[11px] text-white/60 font-mono block">
                Inspect for smooth, seamless transitions. Check for abrupt vertical banding lines or uneven tints.
              </span>
            </div>

            {/* Continuous Smooth Gradient Bar */}
            <div className="w-full space-y-2">
              <div 
                className="w-full h-28 sm:h-36 rounded-2xl border-2 border-white/20 shadow-2xl relative"
                style={{ background: "linear-gradient(to right, rgb(0,0,0), rgb(128,128,128), rgb(255,255,255))" }}
              />
              <div className="flex justify-between text-[10px] sm:text-xs font-mono text-white/60 px-1">
                <span>0 (Pure Black)</span>
                <span>64 (Dark)</span>
                <span>128 (Midtone)</span>
                <span>192 (Light)</span>
                <span>255 (Pure White)</span>
              </div>
            </div>

            {/* 32-step stepped wedge directly below for quantization comparison */}
            <div className="w-full space-y-1.5 mt-4">
              <span className="text-[11px] font-mono text-white/70 block">
                32-Step Quantized Luminance Steps:
              </span>
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
      </div>

      {/* Control Bar Dock */}
      <TestControlBar testId={testId} title="Color Contrast & Range Inspection">
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
              title="Previous mode (Left Arrow)"
              aria-label="Previous mode"
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
              title="Next mode (Right Arrow / Click)"
              aria-label="Next mode"
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
  return (
    <div className="w-full max-w-4xl mx-auto bg-card border border-border/70 rounded-2xl p-5 shadow-xs space-y-4">
      {/* Honesty Banner */}
      <div className="p-4 bg-blue-50 border border-blue-200 dark:bg-blue-950/40 dark:border-blue-800 rounded-xl text-xs text-blue-950 dark:text-blue-100 leading-relaxed space-y-1">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldAlert className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>Visual Inspection Aid (Not a Physical Hardware Light Meter)</span>
        </div>
        <p className="text-blue-900 dark:text-blue-200">
          Standard web browsers render RGB pixel patterns directly to your operating system pipeline. Browsers cannot physically measure native contrast ratios (e.g. 1000:1 or 1,000,000:1) without external hardware photometer sensors. This test provides calibrated visual steps to evaluate shadow detail, white clipping, and gradation smoothness.
        </p>
      </div>

      {/* 3 Clear Inspection Directives */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <Eye className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>1. What You Are Testing</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Checks whether near-black shadow tones and near-white highlight steps remain distinguishable from pure black and pure white without washing out or clipping.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
            <span>2. What To Do</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            View the display perpendicular to your eyes at normal distance. In the Black Level test, check if steps 2 and 3 are visible. In White Level, check if steps 253 and 254 remain distinct.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <Info className="w-4 h-4 text-amber-500 shrink-0" />
            <span>3. What Indicates a Problem</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Crushed blacks:</strong> Dark patches merge into black (raise brightness or adjust gamma). <strong>Clipped whites:</strong> Bright patches blend into white (lower monitor contrast).
          </p>
        </div>
      </div>
    </div>
  );
}
