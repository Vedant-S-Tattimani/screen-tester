"use client";

import { useState, useEffect, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { ChevronLeft, ChevronRight, Eye, Info, ShieldAlert, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrightnessPatternProps {
  testId?: string;
}

type BrightnessStage =
  | "nearBlackSteps"
  | "blackScreen"
  | "midGray"
  | "nearWhiteSteps"
  | "whiteScreen";

interface StageInfo {
  id: BrightnessStage;
  label: string;
  shortTitle: string;
  instruction: string;
  adjustmentTip: string;
}

const BRIGHTNESS_STAGES: StageInfo[] = [
  {
    id: "nearBlackSteps",
    label: "Stage 1: Near-Black Steps (0%–8%)",
    shortTitle: "Near-Black Steps",
    instruction: "Look closely at the dark patches. You should be able to distinguish step 2% and 3% from pure black 0%.",
    adjustmentTip: "Lower or raise your monitor brightness until the darkest steps are distinguishable without making black look gray."
  },
  {
    id: "blackScreen",
    label: "Stage 2: Full Black Screen (0%)",
    shortTitle: "Black Screen (0%)",
    instruction: "Inspect the screen in a dimly lit room to see if black looks truly black or visibly glowing.",
    adjustmentTip: "If black looks milky gray or has aggressive edge glow, lower your monitor brightness."
  },
  {
    id: "midGray",
    label: "Stage 3: Neutral Mid-Gray (50%)",
    shortTitle: "Mid-Gray (50%)",
    instruction: "Evaluate overall luminance comfort. The 50% neutral gray field should look natural without causing eye strain.",
    adjustmentTip: "Adjust brightness until text and documents look comfortable to read in your ambient room lighting."
  },
  {
    id: "nearWhiteSteps",
    label: "Stage 4: Near-White Steps (92%–100%)",
    shortTitle: "Near-White Steps",
    instruction: "Look closely at the bright highlight steps. Can you distinguish steps 98% and 99% from 100% pure white?",
    adjustmentTip: "If the highest white patches blend into white, lower your monitor contrast or brightness to recover highlight detail."
  },
  {
    id: "whiteScreen",
    label: "Stage 5: Full White Screen (100%)",
    shortTitle: "White Screen (100%)",
    instruction: "Check if the peak white screen looks excessively dim or uncomfortably glaring, and check overall luminance uniformity.",
    adjustmentTip: "If the screen causes squinting, reduce monitor brightness."
  }
];

// Calibrated near-black luminance steps
const SHADOW_STEPS = [
  { label: "0% (Pure Black)", rgb: 0, percent: "0.0%" },
  { label: "1%", rgb: 3, percent: "1.2%" },
  { label: "2% (Target)", rgb: 5, percent: "2.0%" },
  { label: "3%", rgb: 8, percent: "3.1%" },
  { label: "4%", rgb: 10, percent: "3.9%" },
  { label: "6%", rgb: 15, percent: "5.9%" },
  { label: "8%", rgb: 20, percent: "7.8%" }
];

// Calibrated near-white luminance steps
const HIGHLIGHT_STEPS = [
  { label: "92%", rgb: 235, percent: "92.2%" },
  { label: "94%", rgb: 240, percent: "94.1%" },
  { label: "96%", rgb: 245, percent: "96.1%" },
  { label: "98% (Target)", rgb: 250, percent: "98.0%" },
  { label: "99%", rgb: 252, percent: "98.8%" },
  { label: "100% (Pure White)", rgb: 255, percent: "100%" }
];

export function BrightnessPattern({ testId = "brightness-test" }: BrightnessPatternProps) {
  const { registerNavigation } = useTestContext();
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const currentStage = BRIGHTNESS_STAGES[activeStageIndex];

  const nextStage = useCallback(() => {
    setActiveStageIndex((prev) => (prev + 1) % BRIGHTNESS_STAGES.length);
  }, []);

  const prevStage = useCallback(() => {
    setActiveStageIndex((prev) => (prev - 1 + BRIGHTNESS_STAGES.length) % BRIGHTNESS_STAGES.length);
  }, []);

  useEffect(() => {
    registerNavigation({
      next: nextStage,
      prev: prevStage,
      reset: () => setActiveStageIndex(0),
    });
  }, [registerNavigation, nextStage, prevStage]);

  return (
    <>
      {/* Viewport Test Area */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center select-none overflow-hidden transition-colors duration-200 cursor-pointer"
        onClick={nextStage}
        tabIndex={0}
        aria-label={`Brightness test: ${currentStage.label}. Click or use arrow keys to advance.`}
        style={{
          backgroundColor:
            currentStage.id === "blackScreen"
              ? "#000000"
              : currentStage.id === "whiteScreen"
              ? "#FFFFFF"
              : currentStage.id === "midGray"
              ? "#808080"
              : currentStage.id === "nearWhiteSteps"
              ? "#FFFFFF"
              : "#0a0a0a"
        }}
      >
        {/* Concise On-Screen Instruction Floating Banner (Click-through) */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-center pointer-events-none">
          <div className="bg-black/85 dark:bg-black/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 text-white shadow-xl max-w-2xl text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-400">
              <Eye className="w-3.5 h-3.5" />
              <span>{currentStage.shortTitle}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60 font-mono text-[11px]">
                Stage {activeStageIndex + 1} of {BRIGHTNESS_STAGES.length}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-white/90 leading-normal">
              {currentStage.instruction}
            </p>
            <p className="text-[10px] text-amber-300/80 font-mono">
              💡 {currentStage.adjustmentTip}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* STAGE 1: NEAR-BLACK SHADOW STEPS (0%–8%)                  */}
        {/* ========================================================= */}
        {currentStage.id === "nearBlackSteps" && (
          <div className="w-full max-w-5xl px-4 sm:px-8 py-16 flex flex-col items-center justify-center gap-6 text-white">
            <div className="text-center space-y-1">
              <span className="text-xs sm:text-sm font-semibold text-white block">
                Near-Black Luminance Discrimination
              </span>
              <span className="text-[11px] text-white/60 font-mono block">
                Target: Step 2% (RGB 5) should be barely distinguishable from pure black 0% (RGB 0).
              </span>
            </div>

            {/* Stepped shadow patches */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 w-full p-4 rounded-2xl bg-black border border-white/20 shadow-2xl">
              {SHADOW_STEPS.map((step, idx) => {
                const isTarget = idx === 2;
                return (
                  <div
                    key={step.rgb}
                    className={cn(
                      "h-32 sm:h-36 rounded-xl flex flex-col items-center justify-between p-3 border transition-all relative group",
                      idx === 0 
                        ? "border-white/40 ring-1 ring-white/20" 
                        : isTarget 
                        ? "border-emerald-400 ring-2 ring-emerald-400/60 shadow-[0_0_15px_rgba(52,211,153,0.3)]" 
                        : "border-white/10 hover:border-white/30"
                    )}
                    style={{ backgroundColor: `rgb(${step.rgb}, ${step.rgb}, ${step.rgb})` }}
                  >
                    <div className="flex flex-col items-center w-full">
                      <span className="text-xs font-mono font-bold text-white/90">
                        {step.label.split(" (")[0]}
                      </span>
                      {isTarget && (
                        <span className="text-[8px] uppercase tracking-wider font-bold bg-emerald-600 text-white px-1.5 py-0.2 rounded mt-0.5">
                          Calibration Target
                        </span>
                      )}
                    </div>

                    {/* Inner comparison dot */}
                    <div
                      className="w-10 h-10 rounded-md border border-white/15 flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: `rgb(${step.rgb + 4}, ${step.rgb + 4}, ${step.rgb + 4})` }}
                    >
                      <span className="text-[8px] font-mono text-white/40 font-bold">+4</span>
                    </div>

                    <span className="text-xs font-mono font-bold text-amber-300">
                      RGB {step.rgb}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-xs font-mono text-amber-200 text-center max-w-xl font-semibold bg-black/70 px-4 py-2 rounded-xl border border-white/20">
              If steps 1% and 2% are invisible, raise your monitor brightness. If 0% looks gray, lower your monitor brightness.
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STAGE 2: FULL BLACK SCREEN (0%)                           */}
        {/* ========================================================= */}
        {currentStage.id === "blackScreen" && (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-white">
            <div className="max-w-md p-5 rounded-2xl bg-neutral-950/95 backdrop-blur-md border border-white/25 text-center shadow-2xl space-y-2 pointer-events-none">
              <span className="text-xs font-mono uppercase font-bold text-amber-400 tracking-wider block">
                Pure Black Field RGB (0, 0, 0)
              </span>
              <p className="text-xs text-white font-medium leading-relaxed">
                Check whether black appears deeply black or visibly glowing / milky in your environment.
              </p>
              <span className="text-xs font-mono text-cyan-300 font-bold block">
                Click anywhere or press Right Arrow to advance to Mid-Gray
              </span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STAGE 3: NEUTRAL MID-GRAY FIELD (50%)                     */}
        {/* ========================================================= */}
        {currentStage.id === "midGray" && (
          <div className="w-full max-w-4xl px-4 py-16 flex flex-col items-center justify-center gap-6 text-black">
            <div className="max-w-md p-5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 text-center text-white shadow-2xl space-y-2 pointer-events-none">
              <span className="text-xs font-mono uppercase font-bold text-blue-400 tracking-wider block">
                50% Neutral Midtone RGB (128, 128, 128)
              </span>
              <p className="text-xs text-white/80 leading-relaxed">
                Assess overall brightness comfort. The gray field should feel balanced in your ambient room lighting without causing eye strain.
              </p>
            </div>

            {/* Reference steps (25%, 50%, 75%) for contextual comparison */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-lg p-3 bg-black/60 rounded-2xl border border-white/20 shadow-xl">
              <div className="h-20 rounded-xl bg-[#404040] flex flex-col items-center justify-center text-white font-mono text-xs">
                <span>25% Gray</span>
                <span className="text-[10px] opacity-60">RGB 64</span>
              </div>
              <div className="h-20 rounded-xl bg-[#808080] border-2 border-blue-400 flex flex-col items-center justify-center text-white font-mono text-xs shadow-md">
                <span className="font-bold">50% Midtone</span>
                <span className="text-[10px] opacity-70">RGB 128</span>
              </div>
              <div className="h-20 rounded-xl bg-[#BFBFBF] flex flex-col items-center justify-center text-black font-mono text-xs">
                <span>75% Gray</span>
                <span className="text-[10px] opacity-60">RGB 192</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STAGE 4: NEAR-WHITE HIGHLIGHT STEPS (92%–100%)            */}
        {/* ========================================================= */}
        {currentStage.id === "nearWhiteSteps" && (
          <div className="w-full max-w-5xl px-4 sm:px-8 py-16 flex flex-col items-center justify-center gap-6 text-black">
            <div className="text-center space-y-1">
              <span className="text-xs sm:text-sm font-semibold text-black block">
                Near-White Highlight Detail & Clipping
              </span>
              <span className="text-[11px] text-black/60 font-mono block">
                Target: Step 98% (RGB 250) and 99% (RGB 252) should be distinguishable from 100% (RGB 255).
              </span>
            </div>

            {/* Stepped highlight patches */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 w-full p-4 rounded-2xl bg-white border border-black/20 shadow-2xl">
              {HIGHLIGHT_STEPS.map((step, idx) => {
                const isTarget = idx === 3;
                return (
                  <div
                    key={step.rgb}
                    className={cn(
                      "h-32 sm:h-36 rounded-xl flex flex-col items-center justify-between p-3 border transition-all relative",
                      step.rgb === 255 
                        ? "border-black/50 ring-1 ring-black/30" 
                        : isTarget 
                        ? "border-blue-600 ring-2 ring-blue-600/60 shadow-[0_0_15px_rgba(37,99,235,0.3)]" 
                        : "border-black/10 hover:border-black/30"
                    )}
                    style={{ backgroundColor: `rgb(${step.rgb}, ${step.rgb}, ${step.rgb})` }}
                  >
                    <div className="flex flex-col items-center w-full">
                      <span className="text-xs font-mono font-bold text-black/90">
                        {step.label.split(" (")[0]}
                      </span>
                      {isTarget && (
                        <span className="text-[8px] uppercase tracking-wider font-bold bg-blue-600 text-white px-1.5 py-0.2 rounded mt-0.5">
                          Calibration Target
                        </span>
                      )}
                    </div>

                    {/* Inner darker comparison dot */}
                    <div
                      className="w-10 h-10 rounded-md border border-black/15 flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: `rgb(${step.rgb - 4}, ${step.rgb - 4}, ${step.rgb - 4})` }}
                    >
                      <span className="text-[8px] font-mono text-black/40 font-bold">-4</span>
                    </div>

                    <span className="text-[10px] font-mono text-black/60">
                      RGB {step.rgb}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-[11px] font-mono text-black/60 text-center max-w-xl">
              If steps 98% and 99% merge seamlessly into 100% white, bright details are <strong>clipped</strong> (contrast or brightness is set too high).
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STAGE 5: FULL WHITE SCREEN (100%)                         */}
        {/* ========================================================= */}
        {currentStage.id === "whiteScreen" && (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-black">
            <div className="max-w-md p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-black/20 text-center shadow-2xl space-y-2 pointer-events-none">
              <span className="text-xs font-mono uppercase font-bold text-blue-600 tracking-wider block">
                Pure White Field RGB (255, 255, 255)
              </span>
              <p className="text-xs text-black/80 leading-relaxed">
                Check whether peak brightness looks comfortably readable or uncomfortably harsh, and verify that corners and edges have uniform brightness.
              </p>
              <span className="text-[10px] font-mono text-black/50 block">
                Click anywhere or press Right Arrow to cycle back to Stage 1
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Control Bar Dock */}
      <TestControlBar testId={testId} title="Brightness & Luminance Test">
        <div className="flex flex-wrap items-center gap-2">
          {/* Stage Switcher Strip */}
          <div className="flex items-center gap-1 bg-muted/60 dark:bg-white/10 p-1 rounded-lg border border-border/50">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevStage();
              }}
              className="p-1.5 hover:bg-white/20 rounded transition-colors text-amber-300 cursor-pointer"
              title="Previous stage (Left Arrow)"
              aria-label="Previous stage"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {BRIGHTNESS_STAGES.map((stg, idx) => (
                <button
                  key={stg.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveStageIndex(idx);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                    idx === activeStageIndex
                      ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300"
                      : "text-cyan-100 hover:text-white hover:bg-white/25 bg-white/15 border border-white/20 font-semibold"
                  )}
                >
                  {stg.shortTitle}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextStage();
              }}
              className="p-1.5 hover:bg-white/20 rounded transition-colors text-amber-300 cursor-pointer"
              title="Next stage (Right Arrow / Click)"
              aria-label="Next stage"
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
 * Educational Guidance & Honest Calibration Guide
 * Rendered below viewport via extraControls in TestWrapper
 */
export function BrightnessGuidance() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-card border border-border/70 rounded-2xl p-5 shadow-xs space-y-4">
      {/* Honesty Banner */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-950 dark:text-blue-200 leading-relaxed space-y-1">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldAlert className="w-4 h-4 text-blue-500 shrink-0" />
          <span>Visual Calibration Aid (Physical Luminance in cd/m² Requires Hardware)</span>
        </div>
        <p>
          A standard web browser cannot measure true physical screen brightness (cd/m² or nits) because web APIs do not have access to photometer sensor hardware. This test provides controlled visual targets so you can adjust your monitor&apos;s physical brightness and contrast controls to achieve optimal shadow and highlight distinction.
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
            Evaluates shadow detail visibility and highlight retention across dark, midtone, and bright test fields.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
            <span>2. What To Do</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Open your monitor&apos;s On-Screen Display (OSD). In Stage 1, adjust brightness until step 2% is barely visible. In Stage 4, ensure step 98% doesn&apos;t wash out into 100% white.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <Info className="w-4 h-4 text-amber-500 shrink-0" />
            <span>3. What Indicates a Problem</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Crushed darks:</strong> Dark steps merge into 0% black. <strong>Blown-out highlights:</strong> Bright steps merge into 100% white. <strong>Excessive glow:</strong> Pure black looks visibly glowing gray.
          </p>
        </div>
      </div>
    </div>
  );
}
