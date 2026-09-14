"use client";

import { useEffect, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface ViewingAnglePatternProps {
  testId?: string;
}

type PatternMode = 
  | "edgeCenter"
  | "neutralGray"
  | "colorBlocks"
  | "skinTones"
  | "grayscaleRamp"
  | "shadowDetail"
  | "blackField"
  | "whiteField";

type ObservationChoice = "PASS" | "CHECK" | "ISSUE" | "UNSURE" | null;

const PATTERNS: PatternMode[] = [
  "edgeCenter",
  "neutralGray",
  "colorBlocks",
  "skinTones",
  "grayscaleRamp",
  "shadowDetail",
  "blackField",
  "whiteField"
];

// Standard Macbeth Skin Tone & Reference Swatches
const REFERENCE_SWATCHES = [
  { name: "Light Skin", hex: "#c29682", rgb: "194, 150, 130" },
  { name: "Dark Skin", hex: "#735244", rgb: "115, 82, 68" },
  { name: "Blue Sky", hex: "#627a9d", rgb: "98, 122, 157" },
  { name: "Foliage", hex: "#576c43", rgb: "87, 108, 67" },
  { name: "Orange", hex: "#d67e2c", rgb: "214, 126, 44" },
  { name: "Neutral Gray", hex: "#7a7a7a", rgb: "122, 122, 122" }
];

export function ViewingAnglePattern({ testId = "viewing-angle-test" }: ViewingAnglePatternProps) {
  const t = useTranslations("ViewingAngleTest");
  const { 
    registerNavigation, 
    observation,
    setObservation
  } = useTestContext();

  const [patternIndex, setPatternIndex] = useState(0);
  const [axis, setAxis] = useState<"horizontal" | "vertical">("horizontal");

  const currentMode = PATTERNS[patternIndex];

  const nextPattern = useCallback(() => {
    setPatternIndex((idx) => (idx + 1) % PATTERNS.length);
  }, []);

  const prevPattern = useCallback(() => {
    setPatternIndex((idx) => (idx - 1 + PATTERNS.length) % PATTERNS.length);
  }, []);

  const resetAll = useCallback(() => {
    setPatternIndex(0);
    setAxis("horizontal");
  }, []);

  useEffect(() => {
    registerNavigation({
      next: nextPattern,
      prev: prevPattern,
      reset: resetAll,
    });
  }, [registerNavigation, nextPattern, prevPattern, resetAll]);

  // Map observation selection to context
  const handleSelectObservation = (val: ObservationChoice) => {
    setObservation(val);
  };

  return (
    <>
      <div 
        className="absolute inset-0 bg-black flex flex-col items-center justify-center p-3 sm:p-6 select-none overflow-hidden"
        tabIndex={0}
      >
        {/* ========================================================= */}
        {/* TOP NOTICE: BROWSER LIMITATION & INSTRUCTION BANNER      */}
        {/* ========================================================= */}
        <div className="absolute top-3 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-white shadow-xl pointer-events-auto max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 shrink-0">
              {t("resultBadge")}
            </span>
            <span className="text-white/80 line-clamp-1 hidden sm:inline">
              {t("instructions")}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono text-white/60 hidden md:inline">
              {t("axis.label")}:
            </span>
            <div className="flex bg-white/10 rounded-lg p-0.5 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setAxis("horizontal")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  axis === "horizontal" 
                    ? "bg-white text-black font-semibold shadow-xs" 
                    : "text-white/70 hover:text-white"
                }`}
              >
                {t("axis.horizontal")}
              </button>
              <button
                type="button"
                onClick={() => setAxis("vertical")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  axis === "vertical" 
                    ? "bg-white text-black font-semibold shadow-xs" 
                    : "text-white/70 hover:text-white"
                }`}
              >
                {t("axis.vertical")}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PATTERN 1: EDGE VS CENTER REFERENCE TARGETS              */}
        {/* ========================================================= */}
        {currentMode === "edgeCenter" && (
          <div className="w-full h-full relative flex items-center justify-center p-6">
            {/* Guide arrow hints for axis */}
            <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-40">
              <span className="text-3xl font-mono">◂</span>
              <span className="text-3xl font-mono">▸</span>
            </div>

            {/* Corner Patches */}
            <div className="absolute top-14 sm:top-16 left-4 sm:left-10 flex flex-col items-center">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-[#808080] border-3 sm:border-4 border-white/25 shadow-2xl flex items-center justify-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600 shadow-md" />
              </div>
              <span className="text-[10px] font-mono text-white/50 mt-1">{t("cornerLabel")}</span>
            </div>

            <div className="absolute top-14 sm:top-16 right-4 sm:right-10 flex flex-col items-center">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-[#808080] border-3 sm:border-4 border-white/25 shadow-2xl flex items-center justify-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-600 shadow-md" />
              </div>
              <span className="text-[10px] font-mono text-white/50 mt-1">{t("cornerLabel")}</span>
            </div>

            <div className="absolute bottom-24 sm:bottom-28 left-4 sm:left-10 flex flex-col items-center">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-[#808080] border-3 sm:border-4 border-white/25 shadow-2xl flex items-center justify-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 shadow-md" />
              </div>
              <span className="text-[10px] font-mono text-white/50 mt-1">{t("cornerLabel")}</span>
            </div>

            <div className="absolute bottom-24 sm:bottom-28 right-4 sm:right-10 flex flex-col items-center">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-[#808080] border-3 sm:border-4 border-white/25 shadow-2xl flex items-center justify-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500 shadow-md" />
              </div>
              <span className="text-[10px] font-mono text-white/50 mt-1">{t("cornerLabel")}</span>
            </div>

            {/* Direct Normal Center Reference Target */}
            <div className="flex flex-col items-center z-10">
              <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-3xl bg-[#808080] border-4 border-white/40 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-red-600 shadow-sm" />
                  <div className="w-7 h-7 rounded-full bg-emerald-600 shadow-sm" />
                  <div className="w-7 h-7 rounded-full bg-blue-600 shadow-sm" />
                  <div className="w-7 h-7 rounded-full bg-amber-500 shadow-sm" />
                </div>
                <div className="w-14 h-14 rounded-full bg-neutral-900 border-2 border-white/30 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-white mt-2 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                {t("centerLabel")}
              </span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 2: NEUTRAL GRAY FULL FIELD (50% LUMINANCE)        */}
        {/* ========================================================= */}
        {currentMode === "neutralGray" && (
          <div className="w-full h-full bg-[#808080] flex flex-col items-center justify-center relative">
            <div className="max-w-md px-4 py-3 rounded-2xl bg-black/75 backdrop-blur-md text-white text-center border border-white/20 shadow-2xl">
              <span className="text-xs font-mono font-bold block mb-1">{t("50NeutralGrayField")}</span>
              <span className="text-[11px] text-white/80 leading-relaxed block">
                {t("observeWhetherTheEdges")}</span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 3: PRIMARY & SECONDARY RGB BLOCKS                 */}
        {/* ========================================================= */}
        {currentMode === "colorBlocks" && (
          <div className="w-full max-w-5xl h-[75%] grid grid-cols-3 grid-rows-2 gap-3 p-2">
            <div className="bg-[#FF0000] rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
              <span className="px-3 py-1 rounded-lg bg-black/60 font-mono font-bold text-white text-xs">{t("redRgb2550")}</span>
            </div>
            <div className="bg-[#00FF00] rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
              <span className="px-3 py-1 rounded-lg bg-black/60 font-mono font-bold text-white text-xs">{t("greenRgb0255")}</span>
            </div>
            <div className="bg-[#0000FF] rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
              <span className="px-3 py-1 rounded-lg bg-black/60 font-mono font-bold text-white text-xs">{t("blueRgb00")}</span>
            </div>
            <div className="bg-[#FFFF00] rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
              <span className="px-3 py-1 rounded-lg bg-black/60 font-mono font-bold text-white text-xs">{t("yellowRG")}</span>
            </div>
            <div className="bg-[#00FFFF] rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
              <span className="px-3 py-1 rounded-lg bg-black/60 font-mono font-bold text-white text-xs">{t("cyanGB")}</span>
            </div>
            <div className="bg-[#FF00FF] rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
              <span className="px-3 py-1 rounded-lg bg-black/60 font-mono font-bold text-white text-xs">{t("magentaRB")}</span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 4: MACBETH REFERENCE SKIN TONES & NATURAL SWATCHES */}
        {/* ========================================================= */}
        {currentMode === "skinTones" && (
          <div className="w-full max-w-4xl h-[75%] flex flex-col items-center justify-center gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full h-full">
              {REFERENCE_SWATCHES.map((swatch, i) => (
                <div 
                  key={i}
                  className="rounded-2xl flex flex-col justify-between p-4 shadow-xl border border-white/20 transition-transform"
                  style={{ backgroundColor: swatch.hex }}
                >
                  <span className="px-2 py-0.5 rounded bg-black/70 text-white font-mono text-xs w-fit">
                    {swatch.name}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/70 text-white/80 font-mono text-[10px] w-fit">
                    {t("rgb")}{swatch.rgb}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-xs text-white/70 bg-black/60 px-4 py-1.5 rounded-full border border-white/10 font-mono text-center">
              {t("skinTonesAreSensitive")}</span>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 5: SMOOTH & STEPPED GRAYSCALE RAMP                 */}
        {/* ========================================================= */}
        {currentMode === "grayscaleRamp" && (
          <div className="w-full max-w-4xl h-[75%] flex flex-col items-center justify-center gap-6 px-4">
            {/* Stepped Wedge */}
            <div className="w-full flex h-24 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
              {Array.from({ length: 16 }, (_, i) => {
                const val = Math.round((i / 15) * 255);
                const isDark = val < 128;
                return (
                  <div
                    key={i}
                    className="flex-1 h-full flex items-end justify-center pb-2 border-r border-white/10 last:border-r-0"
                    style={{ backgroundColor: `rgb(${val}, ${val}, ${val})` }}
                  >
                    <span className={`text-[10px] font-mono font-bold ${isDark ? "text-white/70" : "text-black/70"}`}>
                      {Math.round((i / 15) * 100)}%
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Continuous Gradient */}
            <div className="w-full">
              <div 
                className="w-full h-20 rounded-2xl border-2 border-white/20 shadow-2xl relative"
                style={{ background: "linear-gradient(to right, rgb(0,0,0), rgb(128,128,128), rgb(255,255,255))" }}
              />
              <div className="flex justify-between text-[11px] font-mono text-white/60 mt-1.5 px-2">
                <span>{t("0Black0")}</span>
                <span>{t("50Midtone128")}</span>
                <span>{t("100White255")}</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 6: SHADOW & HIGHLIGHT DETAIL DISCRIMINATOR        */}
        {/* ========================================================= */}
        {currentMode === "shadowDetail" && (
          <div className="w-full max-w-4xl h-[75%] grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
            {/* Dark Low-Key Box */}
            <div className="bg-black rounded-2xl border border-white/20 p-6 flex flex-col items-center justify-between shadow-2xl">
              <span className="text-xs font-mono text-white/70 font-semibold uppercase tracking-wider">
                {t("lowKeyShadowDetail")}</span>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-black border border-white/10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded bg-[#080808]" />
                </div>
                <div className="w-16 h-16 rounded-xl bg-black border border-white/10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded bg-[#101010]" />
                </div>
                <div className="w-16 h-16 rounded-xl bg-black border border-white/10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded bg-[#181818]" />
                </div>
              </div>
              <span className="text-[10px] font-mono text-white/50 text-center">
                {t("onVaPanelsNear")}</span>
            </div>

            {/* Bright High-Key Box */}
            <div className="bg-white rounded-2xl border border-white/20 p-6 flex flex-col items-center justify-between shadow-2xl text-black">
              <span className="text-xs font-mono text-black/70 font-semibold uppercase tracking-wider">
                {t("highKeyHighlightDetail")}</span>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-white border border-black/10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded bg-[#f7f7f7]" />
                </div>
                <div className="w-16 h-16 rounded-xl bg-white border border-black/10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded bg-[#efefef]" />
                </div>
                <div className="w-16 h-16 rounded-xl bg-white border border-black/10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded bg-[#e5e5e5]" />
                </div>
              </div>
              <span className="text-[10px] font-mono text-black/60 text-center">
                {t("highlightsShouldRemainDiscernible")}</span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 7: FULL BLACK FIELD (0%)                           */}
        {/* ========================================================= */}
        {currentMode === "blackField" && (
          <div className="w-full h-full bg-black flex flex-col items-center justify-center relative">
            <div className="max-w-md px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md text-white text-center border border-white/15 shadow-2xl">
              <span className="text-xs font-mono font-bold block mb-1">{t("fullBlackField0")}</span>
              <span className="text-[11px] text-white/80 leading-relaxed block">
                {t("lookDiagonallyAtThe")}</span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PATTERN 8: FULL WHITE FIELD (100%)                         */}
        {/* ========================================================= */}
        {currentMode === "whiteField" && (
          <div className="w-full h-full bg-white flex flex-col items-center justify-center relative text-black">
            <div className="max-w-md px-4 py-3 rounded-2xl bg-black/75 backdrop-blur-md text-white text-center border border-white/20 shadow-2xl">
              <span className="text-xs font-mono font-bold block mb-1">{t("fullWhiteField100")}</span>
              <span className="text-[11px] text-white/80 leading-relaxed block">
                {t("inspectWhitePointUniformity")}</span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* TEST CONTROL BAR */}
      <TestControlBar testId={testId} title={t("title")}>
        <div className="flex flex-wrap items-center gap-2">
          {/* Pattern Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-black/60 p-1 rounded-xl border border-slate-200 dark:border-white/20 text-xs">
            <button
              type="button"
              onClick={prevPattern}
              className="px-2.5 py-1 text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white font-mono cursor-pointer"
              title={t("previousPatternTitle")}
            >
              ◂
            </button>
            <span className="px-2.5 py-1 text-xs font-bold text-slate-900 dark:text-amber-300 border-x border-slate-200 dark:border-white/20">
              {t(`modes.${currentMode}`)} ({patternIndex + 1}/{PATTERNS.length})
            </span>
            <button
              type="button"
              onClick={nextPattern}
              className="px-2.5 py-1 text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white font-mono cursor-pointer"
              title={t("nextPatternTitle")}
            >
              ▸
            </button>
          </div>

          {/* Guide Backlink */}
          <Link
            href="/guides/monitor-viewing-angles-explained"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline px-2 hidden sm:inline"
          >
            {t("backToGuide")} →
          </Link>
        </div>
      </TestControlBar>
    </>
  );
}
