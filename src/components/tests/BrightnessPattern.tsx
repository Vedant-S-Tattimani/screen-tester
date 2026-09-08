"use client";

import { useState, useEffect, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { useTranslations } from "next-intl";
interface BrightnessPatternProps {
  testId?: string;
}

type PatternId =
  | "blackField"
  | "shadowRamp"
  | "midGray"
  | "whiteField"
  | "highlightRamp"
  | "shadowDetail"
  | "highlightDetail"
  | "checkerboard";

const PATTERN_IDS: PatternId[] = [
  "blackField",
  "shadowRamp",
  "midGray",
  "whiteField",
  "highlightRamp",
  "shadowDetail",
  "highlightDetail",
  "checkerboard"
];

// Near-black 1% increments (0% to 10%)
const SHADOW_STEPS = Array.from({ length: 11 }, (_, i) => ({
  percent: i,
  rgb: Math.round((i / 100) * 255),
}));

// Near-white 1% increments (90% to 100%)
const HIGHLIGHT_STEPS = Array.from({ length: 11 }, (_, i) => {
  const pct = 90 + i;
  return {
    percent: pct,
    rgb: Math.round((pct / 100) * 255),
  };
});

export function BrightnessPattern({ testId = "brightness-test" }: BrightnessPatternProps) {
  const t = useTranslations("BrightnessTest");
  const { 
    registerNavigation,
    setObservation
  } = useTestContext();

  const [patternIndex, setPatternIndex] = useState(0);
  const [userRatedLuminance, setUserRatedLuminance] = useState("");
  const [blackObs, setBlackObs] = useState<string | null>(null);
  const [whiteObs, setWhiteObs] = useState<string | null>(null);
  const [overallObs, setOverallObs] = useState<string | null>(null);
  const [showUserProvidedModal, setShowUserProvidedModal] = useState(false);

  const currentPattern = PATTERN_IDS[patternIndex];

  const nextPattern = useCallback(() => {
    setPatternIndex((idx) => (idx + 1) % PATTERN_IDS.length);
  }, []);

  const prevPattern = useCallback(() => {
    setPatternIndex((idx) => (idx - 1 + PATTERN_IDS.length) % PATTERN_IDS.length);
  }, []);

  const resetAll = useCallback(() => {
    setPatternIndex(0);
    setBlackObs(null);
    setWhiteObs(null);
    setOverallObs(null);
  }, []);

  useEffect(() => {
    registerNavigation({
      next: nextPattern,
      prev: prevPattern,
      reset: resetAll,
    });
  }, [registerNavigation, nextPattern, prevPattern, resetAll]);

  // Update TestWrapper observation status when user observations change
  const updateAggregateObservation = (b: string | null, w: string | null, o: string | null) => {
    if (b === "crushed" || b === "lifted" || w === "clipped" || o === "tooDim" || o === "tooBright" || o === "uneven") {
      setObservation("ISSUE");
    } else if (b === "visible" && w === "visible" && o === "appropriate") {
      setObservation("PASS");
    } else if (b || w || o) {
      setObservation("CHECK");
    }
  };

  const handleBlackObs = (val: string) => {
    const nextVal = blackObs === val ? null : val;
    setBlackObs(nextVal);
    updateAggregateObservation(nextVal, whiteObs, overallObs);
  };

  const handleWhiteObs = (val: string) => {
    const nextVal = whiteObs === val ? null : val;
    setWhiteObs(nextVal);
    updateAggregateObservation(blackObs, nextVal, overallObs);
  };

  const handleOverallObs = (val: string) => {
    const nextVal = overallObs === val ? null : val;
    setOverallObs(nextVal);
    updateAggregateObservation(blackObs, whiteObs, nextVal);
  };

  return (
    <>
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center select-none overflow-hidden transition-colors duration-200"
        tabIndex={0}
      >
        {/* ========================================================= */}
        {/* TOP NOTICE: BROWSER LIMITATION & BANNER                  */}
        {/* ========================================================= */}
        <div className="absolute top-3 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-white shadow-xl pointer-events-auto max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
              {t("resultBadge")}
            </span>
            <span className="text-white/80 line-clamp-1 text-[11px] sm:text-xs">
              {t("prepNotice")}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono text-white/70 bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10">
              {t("patternCount", { current: patternIndex + 1, total: PATTERN_IDS.length })}
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PATTERN 1: FULL BLACK FIELD (0%)                          */}
        {/* ========================================================= */}
        {currentPattern === "blackField" && (
          <div className="w-full h-full bg-black flex items-center justify-center p-6">
            <div className="max-w-md p-4 rounded-2xl bg-neutral-900/80 backdrop-blur-md border border-white/15 text-center text-white shadow-2xl">
              <span className="text-xs font-mono font-bold block mb-1">
                {t("patterns.blackField")}
              </span>
              <span className="text-[11px] text-white/70 block leading-relaxed">
                RGB (0, 0, 0) reference black. If the screen glows noticeably or appears washed out in a dark room, monitor brightness is set too high.
              </span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 2: NEAR-BLACK SHADOW RAMP (0% TO 10%)             */}
        {/* ========================================================= */}
        {currentPattern === "shadowRamp" && (
          <div className="w-full h-full bg-black flex flex-col items-center justify-center p-4 sm:p-8 space-y-4">
            <div className="max-w-xl text-center">
              <span className="text-xs sm:text-sm font-semibold text-white block">
                {t("patterns.shadowRamp")}
              </span>
              <span className="text-[11px] text-white/60 font-mono mt-0.5 block">
                Target: Step +2% (RGB 5) should be barely discernible from true black (0%).
              </span>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5 sm:gap-2 w-full max-w-4xl p-3 rounded-2xl bg-black border border-white/15 shadow-2xl">
              {SHADOW_STEPS.map((step) => {
                const color = `rgb(${step.rgb}, ${step.rgb}, ${step.rgb})`;
                const isTarget = step.percent === 2;
                return (
                  <div
                    key={step.percent}
                    className={`h-24 sm:h-32 flex flex-col items-center justify-between py-2 px-1 rounded-xl transition-all ${
                      isTarget 
                        ? "border-2 border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.4)]" 
                        : "border border-white/10"
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    <span className={`text-[10px] sm:text-xs font-bold font-mono ${isTarget ? "text-blue-300" : "text-white/70"}`}>
                      {step.percent}%
                    </span>
                    {isTarget && (
                      <span className="text-[8px] uppercase tracking-wider font-bold bg-blue-600/90 text-white px-1 py-0.2 rounded">
                        Target
                      </span>
                    )}
                    <span className="text-[8px] sm:text-[9px] font-mono text-white/50">
                      RGB {step.rgb}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 3: MID-GRAY FIELD (50%)                           */}
        {/* ========================================================= */}
        {currentPattern === "midGray" && (
          <div className="w-full h-full bg-[#808080] flex items-center justify-center p-6">
            <div className="max-w-md p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/20 text-center text-white shadow-2xl">
              <span className="text-xs font-mono font-bold block mb-1">
                {t("patterns.midGray")}
              </span>
              <span className="text-[11px] text-white/80 block leading-relaxed">
                RGB (128, 128, 128) neutral midtone field. Evaluates overall display luminance comfort without glare or clipping.
              </span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 4: FULL WHITE FIELD (100%)                        */}
        {/* ========================================================= */}
        {currentPattern === "whiteField" && (
          <div className="w-full h-full bg-white flex items-center justify-center p-6 text-black">
            <div className="max-w-md p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/20 text-center text-white shadow-2xl">
              <span className="text-xs font-mono font-bold block mb-1">
                {t("patterns.whiteField")}
              </span>
              <span className="text-[11px] text-white/80 block leading-relaxed">
                RGB (255, 255, 255) peak white field. Checks whether the display is too harsh or causes aggressive power throttling (ABL dimming).
              </span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 5: NEAR-WHITE HIGHLIGHT RAMP (90% TO 100%)        */}
        {/* ========================================================= */}
        {currentPattern === "highlightRamp" && (
          <div className="w-full h-full bg-black flex flex-col items-center justify-center p-4 sm:p-8 space-y-4">
            <div className="max-w-xl text-center">
              <span className="text-xs sm:text-sm font-semibold text-white block">
                {t("patterns.highlightRamp")}
              </span>
              <span className="text-[11px] text-white/60 font-mono mt-0.5 block">
                Target: Steps 98% and 99% should remain distinguishable from 100% pure white.
              </span>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5 sm:gap-2 w-full max-w-4xl p-3 rounded-2xl bg-neutral-900 border border-white/15 shadow-2xl">
              {HIGHLIGHT_STEPS.map((step) => {
                const color = `rgb(${step.rgb}, ${step.rgb}, ${step.rgb})`;
                const isTarget = step.percent === 98;
                return (
                  <div
                    key={step.percent}
                    className={`h-24 sm:h-32 flex flex-col items-center justify-between py-2 px-1 rounded-xl transition-all ${
                      isTarget 
                        ? "border-2 border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.4)]" 
                        : "border border-neutral-700"
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    <span className={`text-[10px] sm:text-xs font-bold font-mono ${isTarget ? "text-blue-900" : "text-black/80"}`}>
                      {step.percent}%
                    </span>
                    {isTarget && (
                      <span className="text-[8px] uppercase tracking-wider font-bold bg-blue-600 text-white px-1 py-0.2 rounded">
                        Target
                      </span>
                    )}
                    <span className="text-[8px] sm:text-[9px] font-mono text-black/60">
                      RGB {step.rgb}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 6: SHADOW DETAIL DISCRIMINATOR                    */}
        {/* ========================================================= */}
        {currentPattern === "shadowDetail" && (
          <div className="w-full h-full bg-black flex flex-col items-center justify-center p-6 gap-6">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
              <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl bg-black border border-white/20 flex items-center justify-center shadow-2xl">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#050505] flex items-center justify-center border border-white/10">
                    <span className="text-[10px] font-mono text-white/50">+2%</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-white/70">Sub-Shadow (+2% RGB 5)</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl bg-[#050505] border border-white/20 flex items-center justify-center shadow-2xl">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0d0d0d] flex items-center justify-center border border-white/10">
                    <span className="text-[10px] font-mono text-white/50">+5%</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-white/70">Near-Black (+5% RGB 13)</span>
              </div>
            </div>

            <span className="text-xs text-white/60 font-mono text-center max-w-md bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              Both inner squares must be distinguishable from their respective surrounding boxes.
            </span>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 7: HIGHLIGHT DETAIL DISCRIMINATOR                 */}
        {/* ========================================================= */}
        {currentPattern === "highlightDetail" && (
          <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-6 gap-6">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
              <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl bg-white border border-neutral-300 flex items-center justify-center shadow-2xl">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#fafafa] flex items-center justify-center border border-neutral-200">
                    <span className="text-[10px] font-mono text-black/50">98%</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-white/70">Specular (98% RGB 250)</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl bg-[#f2f2f2] border border-neutral-300 flex items-center justify-center shadow-2xl">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#e5e5e5] flex items-center justify-center border border-neutral-200">
                    <span className="text-[10px] font-mono text-black/50">90%</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-white/70">High-Key (90% RGB 230)</span>
              </div>
            </div>

            <span className="text-xs text-white/60 font-mono text-center max-w-md bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              Inner squares must not blend into the outer white frames.
            </span>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 8: CONTRAST REFERENCE CHECKERBOARD               */}
        {/* ========================================================= */}
        {currentPattern === "checkerboard" && (
          <div className="w-full max-w-2xl aspect-square grid grid-cols-4 grid-rows-4 p-2 bg-neutral-950 rounded-2xl border border-white/20 shadow-2xl">
            {Array.from({ length: 16 }, (_, i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              const isWhite = (row + col) % 2 === 0;
              return (
                <div
                  key={i}
                  className={`flex items-center justify-center rounded-lg font-mono text-[11px] font-bold ${
                    isWhite ? "bg-white text-black" : "bg-black text-white"
                  }`}
                >
                  {isWhite ? "100%" : "0%"}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* TEST CONTROL BAR WITH USER OBSERVATION CONTROLS           */}
      {/* ========================================================= */}
      <TestControlBar testId={testId} title={t("title")}>
        <div className="flex flex-wrap items-center gap-2">
          {/* Pattern Cycle Buttons */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs">
            <button
              type="button"
              onClick={prevPattern}
              className="px-2 py-1 text-gray-700 hover:text-black font-mono"
              title="Previous pattern"
            >
              ◂
            </button>
            <span className="px-2 py-1 text-[11px] font-semibold text-gray-900 border-x border-gray-200">
              {patternIndex + 1}/{PATTERN_IDS.length}
            </span>
            <button
              type="button"
              onClick={nextPattern}
              className="px-2 py-1 text-gray-700 hover:text-black font-mono"
              title="Next pattern"
            >
              ▸
            </button>
          </div>

          {/* Black Level Observation */}
          <div className="flex items-center gap-1 border-l border-gray-200 pl-2 text-xs">
            <span className="text-[10px] font-mono text-gray-500 hidden xl:inline">
              Black:
            </span>
            <button
              type="button"
              onClick={() => handleBlackObs("visible")}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                blackObs === "visible"
                  ? "bg-emerald-600 text-white font-semibold shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              title={t("obsBlackDetailVisible")}
            >
              ✓ Visible
            </button>
            <button
              type="button"
              onClick={() => handleBlackObs("crushed")}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                blackObs === "crushed"
                  ? "bg-red-600 text-white font-semibold shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              title={t("obsBlackCrushed")}
            >
              Crushed
            </button>
            <button
              type="button"
              onClick={() => handleBlackObs("lifted")}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                blackObs === "lifted"
                  ? "bg-amber-600 text-white font-semibold shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              title={t("obsBlackLifted")}
            >
              Lifted
            </button>
          </div>

          {/* White Level Observation */}
          <div className="flex items-center gap-1 border-l border-gray-200 pl-2 text-xs">
            <span className="text-[10px] font-mono text-gray-500 hidden xl:inline">
              White:
            </span>
            <button
              type="button"
              onClick={() => handleWhiteObs("visible")}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                whiteObs === "visible"
                  ? "bg-emerald-600 text-white font-semibold shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              title={t("obsWhiteDetailVisible")}
            >
              ✓ Visible
            </button>
            <button
              type="button"
              onClick={() => handleWhiteObs("clipped")}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                whiteObs === "clipped"
                  ? "bg-red-600 text-white font-semibold shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              title={t("obsWhiteClipped")}
            >
              Clipped
            </button>
          </div>

          {/* Overall Brightness */}
          <div className="flex items-center gap-1 border-l border-gray-200 pl-2 text-xs">
            <span className="text-[10px] font-mono text-gray-500 hidden xl:inline">
              Overall:
            </span>
            <button
              type="button"
              onClick={() => handleOverallObs("appropriate")}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                overallObs === "appropriate"
                  ? "bg-emerald-600 text-white font-semibold shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              Appropriate
            </button>
            <button
              type="button"
              onClick={() => handleOverallObs("tooDim")}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                overallObs === "tooDim"
                  ? "bg-amber-600 text-white font-semibold shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              Too Dim
            </button>
            <button
              type="button"
              onClick={() => handleOverallObs("tooBright")}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                overallObs === "tooBright"
                  ? "bg-amber-600 text-white font-semibold shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              Too Bright
            </button>
          </div>

          {/* Optional User-Provided Rated cd/m² modal toggle */}
          <div className="border-l border-gray-200 pl-2">
            <button
              type="button"
              onClick={() => setShowUserProvidedModal(!showUserProvidedModal)}
              className="text-[11px] font-medium px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Add optional manufacturer-rated brightness specification"
            >
              {userRatedLuminance ? `Rated: ${userRatedLuminance} cd/m²` : "+ Rated cd/m²"}
            </button>
          </div>
        </div>
      </TestControlBar>

      {/* Modal for entering user-provided manufacturer rated brightness */}
      {showUserProvidedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-200 text-slate-900 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900">{t("userProvidedTitle")}</h3>
              <p className="text-xs text-gray-500 mt-1">{t("userProvidedDisclaimer")}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                {t("userProvidedInputLabel")}
              </label>
              <input
                type="text"
                value={userRatedLuminance}
                onChange={(e) => setUserRatedLuminance(e.target.value)}
                placeholder={t("userProvidedPlaceholder")}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowUserProvidedModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-900 text-white hover:bg-black"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
