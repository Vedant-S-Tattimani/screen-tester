"use client";

import { useState, useEffect, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { useTranslations } from "next-intl";

interface ContrastPatternProps {
  testId?: string;
}

type PatternId =
  | "grayscaleRamp"
  | "steppedGrayscale"
  | "shadowDetail"
  | "highlightDetail"
  | "checkerboard"
  | "colorBlocks"
  | "colorPairs"
  | "textContrast";

const PATTERN_IDS: PatternId[] = [
  "grayscaleRamp",
  "steppedGrayscale",
  "shadowDetail",
  "highlightDetail",
  "checkerboard",
  "colorBlocks",
  "colorPairs",
  "textContrast"
];

// Similar tone color pairs for color contrast discrimination
const SIMILAR_COLOR_PAIRS = [
  { label: "Dark Blue vs Dark Navy", colorA: "#0a192f", colorB: "#0f2347" },
  { label: "Deep Red vs Burgundy", colorA: "#800020", colorB: "#990026" },
  { label: "Forest Green vs Dark Olive", colorA: "#1e3f20", colorB: "#2d4f2a" },
  { label: "Warm Gold vs Light Ochre", colorA: "#d4af37", colorB: "#c5a028" },
  { label: "Slate Gray vs Steel Gray", colorA: "#4a5568", colorB: "#5a6578" },
  { label: "Purple vs Indigo", colorA: "#4b0082", colorB: "#5c069e" },
];

export function ContrastPattern({ testId = "contrast-test" }: ContrastPatternProps) {
  const t = useTranslations("ContrastTest");
  const { 
    registerNavigation,
    setObservation
  } = useTestContext();

  const [patternIndex, setPatternIndex] = useState(0);
  const [userRatedContrast, setUserRatedContrast] = useState("");
  const [showRatedModal, setShowRatedModal] = useState(false);

  // 5 observation dimensions
  const [blackDetailObs, setBlackDetailObs] = useState<string | null>(null);
  const [whiteDetailObs, setWhiteDetailObs] = useState<string | null>(null);
  const [grayscaleObs, setGrayscaleObs] = useState<string | null>(null);
  const [colorSepObs, setColorSepObs] = useState<string | null>(null);
  const [textContrastObs, setTextContrastObs] = useState<string | null>(null);

  const currentPattern = PATTERN_IDS[patternIndex];

  const nextPattern = useCallback(() => {
    setPatternIndex((idx) => (idx + 1) % PATTERN_IDS.length);
  }, []);

  const prevPattern = useCallback(() => {
    setPatternIndex((idx) => (idx - 1 + PATTERN_IDS.length) % PATTERN_IDS.length);
  }, []);

  const resetAll = useCallback(() => {
    setPatternIndex(0);
    setBlackDetailObs(null);
    setWhiteDetailObs(null);
    setGrayscaleObs(null);
    setColorSepObs(null);
    setTextContrastObs(null);
  }, []);

  useEffect(() => {
    registerNavigation({
      next: nextPattern,
      prev: prevPattern,
      reset: resetAll,
    });
  }, [registerNavigation, nextPattern, prevPattern, resetAll]);

  // Aggregate user observation to update TestWrapper status
  const updateAggregateStatus = (
    bd: string | null,
    wd: string | null,
    gs: string | null,
    cs: string | null,
    tc: string | null
  ) => {
    if (bd === "lost" || bd === "raised" || wd === "clipped" || gs === "banding" || cs === "shift" || tc === "hard") {
      setObservation("ISSUE");
    } else if (bd === "good" && wd === "good" && gs === "smooth" && cs === "clear" && tc === "clear") {
      setObservation("PASS");
    } else if (bd || wd || gs || cs || tc) {
      setObservation("CHECK");
    }
  };

  return (
    <>
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center bg-black select-none overflow-hidden"
        tabIndex={0}
      >
        {/* Top Information & Pattern Count Banner */}
        <div className="absolute top-3 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-white shadow-xl pointer-events-auto max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
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
        {/* PATTERN 1: SMOOTH CONTINUOUS GRAYSCALE RAMP               */}
        {/* ========================================================= */}
        {currentPattern === "grayscaleRamp" && (
          <div className="w-full max-w-4xl h-[75%] flex flex-col items-center justify-center p-6 gap-6">
            <div className="w-full text-center">
              <span className="text-xs sm:text-sm font-semibold text-white block">
                {t("patterns.grayscaleRamp")}
              </span>
              <span className="text-[11px] text-white/60 font-mono mt-0.5 block">
                Evaluates tonal gradation smoothness. Inspect for vertical banding lines or discoloration.
              </span>
            </div>

            <div className="w-full">
              <div 
                className="w-full h-28 sm:h-36 rounded-2xl border-2 border-white/20 shadow-2xl relative"
                style={{ background: "linear-gradient(to right, rgb(0,0,0), rgb(128,128,128), rgb(255,255,255))" }}
              />
              <div className="flex justify-between text-[11px] font-mono text-white/60 mt-2 px-2">
                <span>0% Black (0)</span>
                <span>25% Dark Gray (64)</span>
                <span>50% Midtone (128)</span>
                <span>75% Light Gray (192)</span>
                <span>100% White (255)</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 2: 16-STEP QUANTIZED GRAYSCALE WEDGE              */}
        {/* ========================================================= */}
        {currentPattern === "steppedGrayscale" && (
          <div className="w-full max-w-4xl h-[75%] flex flex-col items-center justify-center p-6 gap-6">
            <div className="w-full text-center">
              <span className="text-xs sm:text-sm font-semibold text-white block">
                {t("patterns.steppedGrayscale")}
              </span>
              <span className="text-[11px] text-white/60 font-mono mt-0.5 block">
                Each step should be visually distinct from its immediate neighbors.
              </span>
            </div>

            <div className="w-full flex h-28 sm:h-36 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
              {Array.from({ length: 16 }, (_, i) => {
                const val = Math.round((i / 15) * 255);
                const pct = Math.round((i / 15) * 100);
                const isDark = val < 128;
                return (
                  <div
                    key={i}
                    className="flex-1 h-full flex flex-col items-center justify-between py-2 border-r border-white/10 last:border-r-0"
                    style={{ backgroundColor: `rgb(${val}, ${val}, ${val})` }}
                  >
                    <span className={`text-[10px] font-mono font-bold ${isDark ? "text-white/70" : "text-black/70"}`}>
                      {pct}%
                    </span>
                    <span className={`text-[8px] font-mono ${isDark ? "text-white/50" : "text-black/50"}`}>
                      {val}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 3: DARK SHADOW DETAIL (NEAR-BLACK DISCRIMINATION)  */}
        {/* ========================================================= */}
        {currentPattern === "shadowDetail" && (
          <div className="w-full max-w-4xl h-[75%] flex flex-col items-center justify-center p-6 gap-6">
            <div className="w-full text-center">
              <span className="text-xs sm:text-sm font-semibold text-white block">
                {t("patterns.shadowDetail")}
              </span>
              <span className="text-[11px] text-white/60 font-mono mt-0.5 block">
                Inspect near-black blocks against true reference black (0%).
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 w-full max-w-3xl p-4 bg-black rounded-2xl border border-white/20 shadow-2xl">
              {[
                { label: "0% Ref", rgb: 0, pct: "0%" },
                { label: "1% Step", rgb: 3, pct: "1%" },
                { label: "2% Target", rgb: 5, pct: "2%" },
                { label: "3% Near-Black", rgb: 8, pct: "3%" },
                { label: "5% Shadow", rgb: 13, pct: "5%" },
                { label: "8% Shadow", rgb: 20, pct: "8%" },
                { label: "10% Low-Mid", rgb: 26, pct: "10%" },
                { label: "12% Midtone", rgb: 31, pct: "12%" },
                { label: "15% Midtone", rgb: 38, pct: "15%" },
                { label: "20% Quarter", rgb: 51, pct: "20%" },
              ].map((b, idx) => (
                <div
                  key={idx}
                  className={`h-24 rounded-xl flex flex-col items-center justify-between p-2 border ${
                    b.pct === "2%" ? "border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" : "border-white/10"
                  }`}
                  style={{ backgroundColor: `rgb(${b.rgb}, ${b.rgb}, ${b.rgb})` }}
                >
                  <span className="text-[10px] font-mono font-bold text-white/70">{b.pct}</span>
                  <span className="text-[8px] font-mono text-white/50">RGB {b.rgb}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 4: BRIGHT HIGHLIGHT DETAIL                         */}
        {/* ========================================================= */}
        {currentPattern === "highlightDetail" && (
          <div className="w-full max-w-4xl h-[75%] flex flex-col items-center justify-center p-6 gap-6">
            <div className="w-full text-center">
              <span className="text-xs sm:text-sm font-semibold text-white block">
                {t("patterns.highlightDetail")}
              </span>
              <span className="text-[11px] text-white/60 font-mono mt-0.5 block">
                Inspect near-white blocks against peak reference white (100%).
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 w-full max-w-3xl p-4 bg-white rounded-2xl border border-neutral-300 shadow-2xl">
              {[
                { label: "80%", rgb: 204 },
                { label: "85%", rgb: 217 },
                { label: "88%", rgb: 224 },
                { label: "90%", rgb: 230 },
                { label: "92%", rgb: 235 },
                { label: "94%", rgb: 240 },
                { label: "96%", rgb: 245 },
                { label: "98%", rgb: 250 },
                { label: "99%", rgb: 252 },
                { label: "100%", rgb: 255 },
              ].map((w, idx) => (
                <div
                  key={idx}
                  className={`h-24 rounded-xl flex flex-col items-center justify-between p-2 border ${
                    w.label === "98%" ? "border-blue-500 shadow-xs" : "border-black/10"
                  }`}
                  style={{ backgroundColor: `rgb(${w.rgb}, ${w.rgb}, ${w.rgb})` }}
                >
                  <span className="text-[10px] font-mono font-bold text-black/70">{w.label}</span>
                  <span className="text-[8px] font-mono text-black/50">RGB {w.rgb}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 5: HIGH-FREQUENCY CHECKERBOARD                    */}
        {/* ========================================================= */}
        {currentPattern === "checkerboard" && (
          <div className="w-full max-w-2xl aspect-square grid grid-cols-8 grid-rows-8 p-3 bg-neutral-900 rounded-2xl border border-white/20 shadow-2xl">
            {Array.from({ length: 64 }, (_, i) => {
              const row = Math.floor(i / 8);
              const col = i % 8;
              const isWhite = (row + col) % 2 === 0;
              return (
                <div
                  key={i}
                  className={`rounded-sm transition-colors ${
                    isWhite ? "bg-white" : "bg-black"
                  }`}
                />
              );
            })}
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 6: SATURATED RGB COLOR BLOCKS                     */}
        {/* ========================================================= */}
        {currentPattern === "colorBlocks" && (
          <div className="w-full max-w-4xl h-[75%] grid grid-cols-3 grid-rows-2 gap-3 p-4">
            <div className="bg-[#FF0000] rounded-2xl flex flex-col items-center justify-center p-4 border border-white/20 shadow-xl">
              <span className="px-3 py-1 rounded bg-black/60 font-mono font-bold text-white text-xs">Pure Red</span>
            </div>
            <div className="bg-[#00FF00] rounded-2xl flex flex-col items-center justify-center p-4 border border-white/20 shadow-xl">
              <span className="px-3 py-1 rounded bg-black/60 font-mono font-bold text-white text-xs">Pure Green</span>
            </div>
            <div className="bg-[#0000FF] rounded-2xl flex flex-col items-center justify-center p-4 border border-white/20 shadow-xl">
              <span className="px-3 py-1 rounded bg-black/60 font-mono font-bold text-white text-xs">Pure Blue</span>
            </div>
            <div className="bg-[#FFFF00] rounded-2xl flex flex-col items-center justify-center p-4 border border-white/20 shadow-xl">
              <span className="px-3 py-1 rounded bg-black/60 font-mono font-bold text-white text-xs">Yellow</span>
            </div>
            <div className="bg-[#00FFFF] rounded-2xl flex flex-col items-center justify-center p-4 border border-white/20 shadow-xl">
              <span className="px-3 py-1 rounded bg-black/60 font-mono font-bold text-white text-xs">Cyan</span>
            </div>
            <div className="bg-[#FF00FF] rounded-2xl flex flex-col items-center justify-center p-4 border border-white/20 shadow-xl">
              <span className="px-3 py-1 rounded bg-black/60 font-mono font-bold text-white text-xs">Magenta</span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 7: SIMILAR-TONE COLOR PAIRS                       */}
        {/* ========================================================= */}
        {currentPattern === "colorPairs" && (
          <div className="w-full max-w-4xl h-[75%] grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
            {SIMILAR_COLOR_PAIRS.map((pair, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/20 p-3 bg-neutral-900 flex flex-col justify-between shadow-xl"
              >
                <span className="text-[11px] font-mono text-white/80 mb-2 font-semibold">
                  {pair.label}
                </span>
                <div className="flex-1 flex rounded-xl overflow-hidden border border-white/10">
                  <div className="flex-1" style={{ backgroundColor: pair.colorA }} />
                  <div className="flex-1" style={{ backgroundColor: pair.colorB }} />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-white/50 mt-2">
                  <span>{pair.colorA}</span>
                  <span>{pair.colorB}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 8: TEXT CONTRAST ON CONTRASTING BACKGROUNDS       */}
        {/* ========================================================= */}
        {currentPattern === "textContrast" && (
          <div className="w-full max-w-4xl h-[75%] grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            {/* Box 1: Pure Black with White Text */}
            <div className="bg-black text-white p-6 rounded-2xl border border-white/20 flex flex-col justify-between shadow-xl">
              <span className="text-xs font-mono text-white/50 uppercase">Max Contrast (21:1)</span>
              <p className="text-sm font-medium leading-relaxed">
                The quick brown fox jumps over the lazy dog. 1234567890. Crisp edge definition on pure black.
              </p>
              <span className="text-[10px] font-mono text-white/60">White #FFFFFF on Black #000000</span>
            </div>

            {/* Box 2: Pure White with Black Text */}
            <div className="bg-white text-black p-6 rounded-2xl border border-neutral-300 flex flex-col justify-between shadow-xl">
              <span className="text-xs font-mono text-black/50 uppercase">Max Inverted (21:1)</span>
              <p className="text-sm font-medium leading-relaxed">
                The quick brown fox jumps over the lazy dog. 1234567890. Zero subpixel color fringing or bleeding.
              </p>
              <span className="text-[10px] font-mono text-black/60">Black #000000 on White #FFFFFF</span>
            </div>

            {/* Box 3: Dark Gray with Light Gray Text (Medium Contrast) */}
            <div className="bg-[#222222] text-[#cccccc] p-6 rounded-2xl border border-white/15 flex flex-col justify-between shadow-xl">
              <span className="text-xs font-mono text-white/50 uppercase">Medium Contrast (~7:1)</span>
              <p className="text-sm font-medium leading-relaxed">
                Comfortable UI contrast. Text should remain sharp and easily readable without eye fatigue.
              </p>
              <span className="text-[10px] font-mono text-white/50">#CCCCCC on #222222</span>
            </div>

            {/* Box 4: Low Contrast Threshold Test */}
            <div className="bg-[#333333] text-[#777777] p-6 rounded-2xl border border-white/15 flex flex-col justify-between shadow-xl">
              <span className="text-xs font-mono text-white/50 uppercase">Low Contrast (~2.5:1)</span>
              <p className="text-sm font-medium leading-relaxed">
                Subtle contrast threshold. Displays with poor contrast or washed-out gamma will make this difficult to resolve.
              </p>
              <span className="text-[10px] font-mono text-white/50">#777777 on #333333</span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* TEST CONTROL BAR WITH 5 OBSERVATION CONTROLS              */}
      {/* ========================================================= */}
      <TestControlBar testId={testId} title={t("title")}>
        <div className="flex flex-wrap items-center gap-2">
          {/* Pattern Selector */}
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

          {/* Black Detail */}
          <div className="flex items-center gap-1 border-l border-gray-200 pl-2 text-xs">
            <span className="text-[10px] font-mono text-gray-500 hidden xl:inline">
              Blacks:
            </span>
            <button
              type="button"
              onClick={() => {
                const next = blackDetailObs === "good" ? null : "good";
                setBlackDetailObs(next);
                updateAggregateStatus(next, whiteDetailObs, grayscaleObs, colorSepObs, textContrastObs);
              }}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                blackDetailObs === "good"
                  ? "bg-emerald-600 text-white font-semibold shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              ✓ {t("obsBlackGood")}
            </button>
            <button
              type="button"
              onClick={() => {
                const next = blackDetailObs === "lost" ? null : "lost";
                setBlackDetailObs(next);
                updateAggregateStatus(next, whiteDetailObs, grayscaleObs, colorSepObs, textContrastObs);
              }}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                blackDetailObs === "lost"
                  ? "bg-amber-600 text-white font-semibold shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {t("obsBlackLost")}
            </button>
          </div>

          {/* Grayscale Banding */}
          <div className="flex items-center gap-1 border-l border-gray-200 pl-2 text-xs">
            <span className="text-[10px] font-mono text-gray-500 hidden xl:inline">
              Ramp:
            </span>
            <button
              type="button"
              onClick={() => {
                const next = grayscaleObs === "smooth" ? null : "smooth";
                setGrayscaleObs(next);
                updateAggregateStatus(blackDetailObs, whiteDetailObs, next, colorSepObs, textContrastObs);
              }}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                grayscaleObs === "smooth"
                  ? "bg-emerald-600 text-white font-semibold shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              ✓ {t("obsGraySmooth")}
            </button>
            <button
              type="button"
              onClick={() => {
                const next = grayscaleObs === "banding" ? null : "banding";
                setGrayscaleObs(next);
                updateAggregateStatus(blackDetailObs, whiteDetailObs, next, colorSepObs, textContrastObs);
              }}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                grayscaleObs === "banding"
                  ? "bg-amber-600 text-white font-semibold shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {t("obsGrayBanding")}
            </button>
          </div>

          {/* Text Contrast */}
          <div className="flex items-center gap-1 border-l border-gray-200 pl-2 text-xs">
            <span className="text-[10px] font-mono text-gray-500 hidden xl:inline">
              Text:
            </span>
            <button
              type="button"
              onClick={() => {
                const next = textContrastObs === "clear" ? null : "clear";
                setTextContrastObs(next);
                updateAggregateStatus(blackDetailObs, whiteDetailObs, grayscaleObs, colorSepObs, next);
              }}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                textContrastObs === "clear"
                  ? "bg-emerald-600 text-white font-semibold shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              ✓ {t("obsTextClear")}
            </button>
          </div>

          {/* Optional User-Provided Contrast Ratio */}
          <div className="border-l border-gray-200 pl-2">
            <button
              type="button"
              onClick={() => setShowRatedModal(!showRatedModal)}
              className="text-[11px] font-medium px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Add optional manufacturer-rated contrast ratio specification"
            >
              {userRatedContrast ? `Rated: ${userRatedContrast}` : "+ Rated Contrast"}
            </button>
          </div>
        </div>
      </TestControlBar>

      {/* Modal for entering user-provided manufacturer rated contrast ratio */}
      {showRatedModal && (
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
                value={userRatedContrast}
                onChange={(e) => setUserRatedContrast(e.target.value)}
                placeholder={t("userProvidedPlaceholder")}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowRatedModal(false)}
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
