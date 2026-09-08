"use client";

import { useState, useEffect, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";

interface BrightnessPatternProps {
  testId?: string;
}

type BrightnessMode = "pluge" | "shadow-ramp" | "abl-window" | "ire-scale";

// PLUGE Standard Reference Bars (0-255 RGB values in full-range sRGB / Rec.709)
const PLUGE_BARS = [
  { label: "0% Ref", rgb: 0, percent: 0, tag: "True Black", highlight: false },
  { label: "+1%", rgb: 3, percent: 1, tag: "Sub-Shadow", highlight: false },
  { label: "+2%", rgb: 5, percent: 2, tag: "Target Threshold", highlight: true },
  { label: "+3%", rgb: 8, percent: 3, tag: "Near-Black", highlight: false },
  { label: "+5%", rgb: 13, percent: 5, tag: "Shadow Detail", highlight: false },
  { label: "+10%", rgb: 26, percent: 10, tag: "Low Midtone", highlight: false },
];

// Fine 1% Shadow Ramp (0% to 10% in 1% increments)
const SHADOW_STEPS = Array.from({ length: 11 }, (_, i) => ({
  percent: i,
  rgb: Math.round((i / 100) * 255), // 0, 3, 5, 8, 10, 13, 15, 18, 20, 23, 26
}));

// Peak Luminance / ABL Window Definitions
const ABL_WINDOWS = [
  { id: "100", label: "100% Full Field", widthPct: 100, heightPct: 100, note: "Sustained Full-Screen Luminance" },
  { id: "50", label: "50% Window", widthPct: 70.7, heightPct: 70.7, note: "Half Screen Area" },
  { id: "25", label: "25% Window", widthPct: 50, heightPct: 50, note: "Quarter Screen Area" },
  { id: "10", label: "10% Window ★", widthPct: 31.6, heightPct: 31.6, note: "Industry Standard Peak Nit Window" },
  { id: "5", label: "5% Highlight", widthPct: 22.4, heightPct: 22.4, note: "Small Specular Highlight" },
];

// Full 10-Step IRE Luminance Scale (0 to 100 IRE)
const IRE_STEPS = Array.from({ length: 11 }, (_, i) => {
  const ire = i * 10;
  const rgb = Math.round((i / 10) * 255);
  return { ire, rgb };
});

export function BrightnessPattern({ testId = "brightness-test" }: BrightnessPatternProps) {
  const { registerNavigation } = useTestContext();
  const [mode, setMode] = useState<BrightnessMode>("pluge");
  const [surroundBg, setSurroundBg] = useState<"black" | "dark">("black");
  const [showLabels, setShowLabels] = useState(true);
  const [showRgb, setShowRgb] = useState(true);
  const [selectedAblIndex, setSelectedAblIndex] = useState(3); // Default to 10% window (industry standard)

  const cycleModeNext = useCallback(() => {
    setMode((curr) => {
      if (curr === "pluge") return "shadow-ramp";
      if (curr === "shadow-ramp") return "abl-window";
      if (curr === "abl-window") return "ire-scale";
      return "pluge";
    });
  }, []);

  const cycleModePrev = useCallback(() => {
    setMode((curr) => {
      if (curr === "ire-scale") return "abl-window";
      if (curr === "abl-window") return "shadow-ramp";
      if (curr === "shadow-ramp") return "pluge";
      return "ire-scale";
    });
  }, []);

  const resetAll = useCallback(() => {
    setMode("pluge");
    setSurroundBg("black");
    setShowLabels(true);
    setShowRgb(true);
    setSelectedAblIndex(3);
  }, []);

  useEffect(() => {
    registerNavigation({
      next: cycleModeNext,
      prev: cycleModePrev,
      reset: resetAll,
    });
  }, [registerNavigation, cycleModeNext, cycleModePrev, resetAll]);

  const activeAbl = ABL_WINDOWS[selectedAblIndex];
  const bgClass = surroundBg === "black" ? "bg-black" : "bg-neutral-900";

  return (
    <>
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-6 select-none overflow-hidden transition-colors duration-200 ${bgClass}`}
        tabIndex={0}
      >
        {/* ========================================================= */}
        {/* VIEW 1: PLUGE REFERENCE (INDUSTRY STANDARD CALIBRATION)   */}
        {/* ========================================================= */}
        {mode === "pluge" && (
          <div className="flex flex-col items-center justify-between w-full max-w-4xl h-full max-h-[88%] min-h-0 py-1">
            {/* Top Calibration Objective Banner */}
            <div className="w-full max-w-2xl px-3.5 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-700/60 text-center shadow-sm">
              <span className="text-[11px] sm:text-xs font-semibold text-neutral-200">
                Calibration Target:{" "}
              </span>
              <span className="text-[11px] sm:text-xs text-neutral-300">
                Adjust monitor Brightness until <strong className="text-white underline decoration-blue-400 font-bold">Bar +2% (RGB 5)</strong> is barely discernible from black, while <strong className="text-white">0%</strong> matches the black surround.
              </span>
            </div>

            {/* Main Stage: PLUGE Vertical Bars */}
            <div className="w-full flex-1 min-h-0 flex flex-col items-center justify-center my-3">
              <div className="w-full max-w-2xl h-[52%] min-h-[140px] max-h-[220px] flex items-stretch justify-center rounded-xl overflow-hidden border border-neutral-800 shadow-2xl bg-black p-1.5 sm:p-2 gap-1.5 sm:gap-2">
                {PLUGE_BARS.map((bar, index) => {
                  const color = `rgb(${bar.rgb}, ${bar.rgb}, ${bar.rgb})`;
                  return (
                    <div
                      key={index}
                      className={`flex-1 flex flex-col items-center justify-between py-2 px-1 rounded transition-all relative ${
                        bar.highlight 
                          ? "border-2 border-blue-500/70 shadow-[0_0_12px_rgba(59,130,246,0.25)]" 
                          : "border border-neutral-800/80"
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      {/* Top Label */}
                      <div className="text-center select-none pointer-events-none">
                        {showLabels && (
                          <div className={`text-[10px] sm:text-xs font-bold leading-none ${bar.highlight ? "text-blue-300 font-mono" : "text-neutral-300"}`}>
                            {bar.label}
                          </div>
                        )}
                        {showRgb && (
                          <div className="text-[8px] sm:text-[9px] font-mono text-neutral-400 mt-0.5 leading-none">
                            RGB {bar.rgb}
                          </div>
                        )}
                      </div>

                      {/* Center Target Indicator for +2% */}
                      {bar.highlight && (
                        <div className="px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-blue-600/90 text-white shadow-xs">
                          Target
                        </div>
                      )}

                      {/* Bottom Description */}
                      <div className="text-[8px] sm:text-[9px] text-neutral-400/90 font-mono text-center leading-tight">
                        {bar.tag}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Concentric Target Discriminator */}
              <div className="mt-3 flex items-center justify-center gap-6 sm:gap-10">
                {/* Target Patch 1: Pure Black vs +2% Target */}
                <div className="flex items-center gap-2.5 bg-neutral-950/70 border border-neutral-800/80 rounded-lg px-3 py-1.5">
                  <div className="w-10 h-10 rounded border border-neutral-800 bg-black flex items-center justify-center relative">
                    <div 
                      className="w-5 h-5 rounded-sm flex items-center justify-center" 
                      style={{ backgroundColor: "rgb(5,5,5)" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-medium text-neutral-300">Shadow Disc: +2% (RGB 5)</div>
                    <div className="text-[9px] text-neutral-400 font-mono">Must be faintly visible on black</div>
                  </div>
                </div>

                {/* Target Patch 2: +2% vs +5% Highlight */}
                <div className="flex items-center gap-2.5 bg-neutral-950/70 border border-neutral-800/80 rounded-lg px-3 py-1.5">
                  <div 
                    className="w-10 h-10 rounded border border-neutral-800 flex items-center justify-center relative"
                    style={{ backgroundColor: "rgb(5,5,5)" }}
                  >
                    <div 
                      className="w-5 h-5 rounded-sm flex items-center justify-center" 
                      style={{ backgroundColor: "rgb(13,13,13)" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-400/70" />
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-medium text-neutral-300">Sub-Shadow: +5% (RGB 13)</div>
                    <div className="text-[9px] text-neutral-400 font-mono">Must be clearly distinct from +2%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Reference Box */}
            <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] sm:text-[11px] text-center">
              <div className="px-2.5 py-1.5 rounded-lg bg-red-950/30 border border-red-900/40 text-red-300">
                <strong className="block text-red-200">Blacks Crushed</strong>
                If Bar +2% is invisible, brightness is too low.
              </div>
              <div className="px-2.5 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-900/40 text-emerald-300">
                <strong className="block text-emerald-200">Optimal Calibration</strong>
                +2% barely visible; 0% matches dark surround.
              </div>
              <div className="px-2.5 py-1.5 rounded-lg bg-amber-950/30 border border-amber-900/40 text-amber-300">
                <strong className="block text-amber-200">Blacks Washed Out</strong>
                If 0% glows or looks gray, brightness is too high.
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: 1% SHADOW RAMP (0% TO 10% PRECISION CLIPPING)    */}
        {/* ========================================================= */}
        {mode === "shadow-ramp" && (
          <div className="flex flex-col items-center justify-center w-full max-w-3xl h-full max-h-[85%] min-h-0 space-y-3">
            <div className="text-center max-w-xl">
              <div className="text-xs sm:text-sm font-semibold text-neutral-200">
                1% Shadow Detail Stepping (0% - 10% Near-Black Range)
              </div>
              <div className="text-[10px] sm:text-[11px] text-neutral-400 mt-0.5">
                Identifies your display&apos;s visual black clipping threshold. Quality monitors should distinguish step 2% or 3%.
              </div>
            </div>

            {/* Grid of 11 steps */}
            <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5 sm:gap-2 w-full max-w-3xl p-3 rounded-xl bg-black border border-neutral-800 shadow-xl">
              {SHADOW_STEPS.map((step, idx) => {
                const color = `rgb(${step.rgb}, ${step.rgb}, ${step.rgb})`;
                const isTarget = step.percent === 2;
                return (
                  <div
                    key={idx}
                    className={`h-24 sm:h-32 flex flex-col items-center justify-between py-2 px-1 rounded-md transition-all ${
                      isTarget 
                        ? "border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" 
                        : "border border-neutral-800"
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    <span className={`text-[10px] sm:text-xs font-bold font-mono ${isTarget ? "text-blue-300" : "text-neutral-300"}`}>
                      {step.percent}%
                    </span>
                    {isTarget && (
                      <span className="text-[8px] uppercase tracking-wider font-bold text-blue-400">
                        Target
                      </span>
                    )}
                    <span className="text-[8px] sm:text-[9px] font-mono text-neutral-400">
                      RGB {step.rgb}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-[10px] text-neutral-400 text-center font-mono">
              Note: Human vision requires 30-60 seconds of dark adaptation to discern the 1% and 2% steps.
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: PEAK LUMINANCE & ABL (AUTOMATIC BRIGHTNESS LIMITER) */}
        {/* ========================================================= */}
        {mode === "abl-window" && (
          <div className="flex flex-col items-center justify-between w-full max-w-4xl h-full max-h-[88%] min-h-0 py-2">
            <div className="text-center max-w-xl">
              <div className="text-xs sm:text-sm font-semibold text-neutral-200">
                Peak Luminance & ABL (Automatic Brightness Limiter) Test
              </div>
              <div className="text-[10px] sm:text-[11px] text-neutral-400 mt-0.5">
                Test sustained full-screen white vs windowed peak brightness. Switch window sizes below to check if your display dims.
              </div>
            </div>

            {/* Dynamic ABL Window Box */}
            <div className="w-full flex-1 min-h-[160px] max-h-[300px] my-3 flex items-center justify-center relative bg-black rounded-xl border border-neutral-800 p-2 overflow-hidden shadow-2xl">
              <div
                className="bg-white rounded transition-all duration-300 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] text-black select-none"
                style={{
                  width: `${activeAbl.widthPct}%`,
                  height: `${activeAbl.heightPct}%`,
                }}
              >
                <div className="text-center p-2">
                  <span className="text-xs sm:text-sm font-bold font-mono block">
                    {activeAbl.label}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-neutral-600 block mt-0.5">
                    100% White (RGB 255, 255, 255)
                  </span>
                </div>
              </div>
            </div>

            {/* Window Size Selector Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {ABL_WINDOWS.map((win, idx) => (
                <button
                  key={win.id}
                  onClick={() => setSelectedAblIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedAblIndex === idx
                      ? "bg-white text-black shadow-md font-semibold ring-2 ring-white/50"
                      : "bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800"
                  }`}
                >
                  {win.label}
                </button>
              ))}
            </div>

            <div className="w-full max-w-xl text-center text-[10px] sm:text-[11px] text-neutral-400 bg-neutral-900/60 border border-neutral-800/80 rounded-lg px-3 py-1.5 mt-2">
              💡 <strong>What to observe:</strong> If the 100% Full Field window is visibly dimmer than the 10% Window, your OLED or laptop monitor uses aggressive power throttling / ABL to conserve power or prevent overheating.
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 4: FULL 10-STEP IRE SCALE (0 - 100 IRE LUMINANCE)   */}
        {/* ========================================================= */}
        {mode === "ire-scale" && (
          <div className="flex flex-col items-center justify-center w-full max-w-3xl h-full max-h-[85%] min-h-0 space-y-4">
            <div className="text-center max-w-xl">
              <div className="text-xs sm:text-sm font-semibold text-neutral-200">
                10-Step IRE Luminance Scale (0% - 100% Full Range)
              </div>
              <div className="text-[10px] sm:text-[11px] text-neutral-400 mt-0.5">
                Evaluates linear luminance distribution across the full dynamic range from black (0 IRE) to peak white (100 IRE).
              </div>
            </div>

            {/* 11 Quantized IRE Blocks */}
            <div className="w-full flex h-20 sm:h-28 rounded-xl overflow-hidden border border-neutral-700 shadow-2xl">
              {IRE_STEPS.map((step, idx) => {
                const isDark = step.rgb < 128;
                return (
                  <div
                    key={idx}
                    className="flex-1 h-full flex flex-col items-center justify-between py-2 border-r border-neutral-800 last:border-r-0 transition-colors"
                    style={{ backgroundColor: `rgb(${step.rgb}, ${step.rgb}, ${step.rgb})` }}
                  >
                    <span className={`text-[9px] sm:text-xs font-bold font-mono ${isDark ? "text-white" : "text-black"}`}>
                      {step.ire}
                    </span>
                    <span className={`text-[8px] sm:text-[9px] font-mono opacity-70 ${isDark ? "text-white" : "text-black"}`}>
                      {step.rgb}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Continuous Smooth Gradient */}
            <div className="w-full">
              <div className="flex justify-between text-[10px] font-mono text-neutral-400 mb-1">
                <span>0 IRE (Black)</span>
                <span>50 IRE (Mid-Gray)</span>
                <span>100 IRE (Peak White)</span>
              </div>
              <div
                className="h-10 sm:h-12 w-full rounded-lg border border-neutral-700 relative shadow-inner"
                style={{ background: "linear-gradient(to right, rgb(0,0,0), rgb(255,255,255))" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* TEST CONTROL BAR (DOCKED OUTSIDE & BELOW VIEWPORT)       */}
      {/* ========================================================= */}
      <TestControlBar testId={testId} title="Brightness & Luminance Calibration">
        <div className="flex flex-wrap items-center gap-2">
          {/* Main Mode Switcher */}
          <div className="flex items-center bg-muted/60 p-0.5 rounded-lg border border-border/50 text-xs">
            <button
              onClick={() => setMode("pluge")}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                mode === "pluge" 
                  ? "bg-white text-gray-950 shadow-xs font-bold" 
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
            >
              PLUGE Reference
            </button>
            <button
              onClick={() => setMode("shadow-ramp")}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                mode === "shadow-ramp" 
                  ? "bg-white text-gray-950 shadow-xs font-bold" 
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
            >
              1% Shadow Ramp
            </button>
            <button
              onClick={() => setMode("abl-window")}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                mode === "abl-window" 
                  ? "bg-white text-gray-950 shadow-xs font-bold" 
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
            >
              Peak & ABL Windows
            </button>
            <button
              onClick={() => setMode("ire-scale")}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                mode === "ire-scale" 
                  ? "bg-white text-gray-950 shadow-xs font-bold" 
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
            >
              Full IRE Scale
            </button>
          </div>

          {/* Mode Specific Controls */}
          {mode === "pluge" && (
            <div className="flex items-center gap-1.5 border-l border-border/50 pl-2">
              <button
                onClick={() => setSurroundBg((prev) => (prev === "black" ? "dark" : "black"))}
                className="px-2.5 py-1 rounded-md text-xs font-medium border border-border/50 bg-muted/40 hover:bg-muted text-gray-800 dark:text-slate-200 dark:hover:text-white transition-colors"
                title="Toggle surrounding background between pure black and dark gray"
              >
                Surround: {surroundBg === "black" ? "Black" : "Dark Gray"}
              </button>
              <button
                onClick={() => setShowLabels((p) => !p)}
                className="px-2.5 py-1 rounded-md text-xs font-medium border border-border/50 bg-muted/40 hover:bg-muted text-gray-800 dark:text-slate-200 dark:hover:text-white transition-colors"
              >
                {showLabels ? "Labels: On" : "Labels: Off"}
              </button>
            </div>
          )}

          {mode === "shadow-ramp" && (
            <div className="flex items-center gap-1.5 border-l border-border/50 pl-2">
              <button
                onClick={() => setShowRgb((p) => !p)}
                className="px-2.5 py-1 rounded-md text-xs font-medium border border-border/50 bg-muted/40 hover:bg-muted text-gray-800 dark:text-slate-200 dark:hover:text-white transition-colors"
              >
                {showRgb ? "RGB: On" : "RGB: Off"}
              </button>
            </div>
          )}

          {mode === "abl-window" && (
            <div className="flex items-center gap-1 border-l border-border/50 pl-2 text-xs">
              <span className="text-muted-foreground dark:text-slate-300 font-mono text-[11px] mr-1 hidden sm:inline">Size:</span>
              {ABL_WINDOWS.map((w, idx) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedAblIndex(idx)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    selectedAblIndex === idx
                      ? "bg-white text-gray-950 font-bold shadow-xs"
                      : "bg-muted/40 hover:bg-muted text-gray-700 dark:text-slate-200 dark:hover:text-white"
                  }`}
                >
                  {w.id}%
                </button>
              ))}
            </div>
          )}
        </div>
      </TestControlBar>
    </>
  );
}
