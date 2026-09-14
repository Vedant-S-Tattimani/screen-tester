"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  Monitor,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sliders,
  Sun,
  Palette,
  SplitSquareHorizontal,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

type PresetColor = {
  id: string;
  labelKey: string;
  r: number;
  g: number;
  b: number;
};

const PRESETS: PresetColor[] = [
  { id: "d65", labelKey: "presetD65", r: 255, g: 255, b: 255 },
  { id: "gray75", labelKey: "presetGray75", r: 191, g: 191, b: 191 },
  { id: "gray50", labelKey: "presetGray50", r: 128, g: 128, b: 128 },
  { id: "gray18", labelKey: "presetGray18", r: 46, g: 46, b: 46 },
  { id: "warm5000", labelKey: "presetWarm", r: 255, g: 243, b: 228 },
  { id: "cool7500", labelKey: "presetCool", r: 235, g: 242, b: 255 },
  { id: "red", labelKey: "presetRed", r: 255, g: 0, b: 0 },
  { id: "green", labelKey: "presetGreen", r: 0, g: 255, b: 0 },
  { id: "blue", labelKey: "presetBlue", r: 0, g: 0, b: 255 },
];

export default function DualMonitorMatcherPage() {
  const t = useTranslations("Tools.DualMonitorMatcher");

  const [selectedPreset, setSelectedPreset] = useState<PresetColor>(PRESETS[0]);
  
  // Left Screen adjustments (Reference)
  const [leftRed, setLeftRed] = useState(0);
  const [leftGreen, setLeftGreen] = useState(0);
  const [leftBlue, setLeftBlue] = useState(0);
  const [leftBrightness, setLeftBrightness] = useState(100);

  // Right Screen adjustments (Target / Matcher)
  const [rightRed, setRightRed] = useState(0);
  const [rightGreen, setRightGreen] = useState(0);
  const [rightBlue, setRightBlue] = useState(0);
  const [rightBrightness, setRightBrightness] = useState(100);

  // Split position (percentage from left: 50% default)
  const [splitPos, setSplitPos] = useState(50);
  const [isDraggingSplit, setIsDraggingSplit] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const clamp = (val: number, min = 0, max = 255) => Math.min(max, Math.max(min, val));

  const calcColor = (base: PresetColor, rAdj: number, gAdj: number, bAdj: number, bright: number) => {
    const factor = bright / 100;
    const r = clamp(Math.round((base.r + rAdj) * factor));
    const g = clamp(Math.round((base.g + gAdj) * factor));
    const b = clamp(Math.round((base.b + bAdj) * factor));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const leftRgb = calcColor(selectedPreset, leftRed, leftGreen, leftBlue, leftBrightness);
  const rightRgb = calcColor(selectedPreset, rightRed, rightGreen, rightBlue, rightBrightness);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingSplit || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setSplitPos(Math.min(90, Math.max(10, pct)));
  }, [isDraggingSplit]);

  const handleMouseUp = useCallback(() => {
    setIsDraggingSplit(false);
  }, []);

  useEffect(() => {
    if (isDraggingSplit) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDraggingSplit, handleMouseMove, handleMouseUp]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const resetAdjustments = () => {
    setLeftRed(0);
    setLeftGreen(0);
    setLeftBlue(0);
    setLeftBrightness(100);
    setRightRed(0);
    setRightGreen(0);
    setRightBlue(0);
    setRightBrightness(100);
    setSplitPos(50);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 w-full flex flex-col gap-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
          <SplitSquareHorizontal className="w-4 h-4" />
          <span>{t("eyebrow")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 dark:text-white mb-3">
          {t("title")}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl text-sm sm:text-base leading-relaxed">
          {t("description")}
        </p>
      </div>

      {/* Main Dual View Canvas */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400">
          <span>{t("canvasHint")}</span>
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white transition"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFullscreen ? t("exitFullscreen") : t("fullscreenAcross")}</span>
          </button>
        </div>

        <div
          ref={containerRef}
          className={cn(
            "relative w-full rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-800 shadow-xl select-none",
            isFullscreen ? "h-screen w-screen rounded-none border-none" : "h-[450px]"
          )}
        >
          {/* Left / Monitor A Canvas */}
          <div
            className="absolute top-0 bottom-0 left-0 flex flex-col items-center justify-center transition-colors"
            style={{ width: `${splitPos}%`, backgroundColor: leftRgb }}
          >
            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-mono border border-white/20 pointer-events-none">
              {t("monitorA")} ({leftRgb})
            </div>
          </div>

          {/* Right / Monitor B Canvas */}
          <div
            className="absolute top-0 bottom-0 right-0 flex flex-col items-center justify-center transition-colors"
            style={{ width: `${100 - splitPos}%`, backgroundColor: rightRgb }}
          >
            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-mono border border-white/20 pointer-events-none">
              {t("monitorB")} ({rightRgb})
            </div>
          </div>

          {/* Draggable Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-1.5 bg-white/90 shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize flex items-center justify-center z-10 -ml-[3px]"
            style={{ left: `${splitPos}%` }}
            onMouseDown={() => setIsDraggingSplit(true)}
          >
            <div className="w-6 h-8 rounded-full bg-neutral-900/80 border border-white/40 flex items-center justify-center shadow-lg">
              <SplitSquareHorizontal className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Preset Target Selector */}
      <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-neutral-900 dark:text-white">
            <Palette className="w-4 h-4 text-cyan-500" />
            <span>{t("calibrationTarget")}</span>
          </div>
          <button
            onClick={resetAdjustments}
            className="text-xs flex items-center gap-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t("resetAll")}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPreset(p)}
              className={cn(
                "flex flex-col items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition",
                selectedPreset.id === p.id
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
                  : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-600 dark:text-neutral-300"
              )}
            >
              <div
                className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 shadow-inner"
                style={{ backgroundColor: `rgb(${p.r}, ${p.g}, ${p.b})` }}
              />
              <span className="truncate w-full text-center">{t(p.labelKey)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Channel Adjustments Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monitor A Controls */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
              <Monitor className="w-4 h-4 text-blue-500" />
              <span>{t("monitorAControls")}</span>
            </div>
            <button
              onClick={() => {
                setLeftRed(0);
                setLeftGreen(0);
                setLeftBlue(0);
                setLeftBrightness(100);
              }}
              className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              {t("reset")}
            </button>
          </div>

          <div className="space-y-4 text-xs font-medium">
            <div>
              <div className="flex justify-between mb-1.5 text-neutral-700 dark:text-neutral-300">
                <span>{t("redGain")}</span>
                <span className="font-mono">{leftRed > 0 ? `+${leftRed}` : leftRed}</span>
              </div>
              <input
                type="range"
                min={-50}
                max={50}
                value={leftRed}
                onChange={(e) => setLeftRed(Number(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-neutral-700 dark:text-neutral-300">
                <span>{t("greenGain")}</span>
                <span className="font-mono">{leftGreen > 0 ? `+${leftGreen}` : leftGreen}</span>
              </div>
              <input
                type="range"
                min={-50}
                max={50}
                value={leftGreen}
                onChange={(e) => setLeftGreen(Number(e.target.value))}
                className="w-full accent-green-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-neutral-700 dark:text-neutral-300">
                <span>{t("blueGain")}</span>
                <span className="font-mono">{leftBlue > 0 ? `+${leftBlue}` : leftBlue}</span>
              </div>
              <input
                type="range"
                min={-50}
                max={50}
                value={leftBlue}
                onChange={(e) => setLeftBlue(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-neutral-700 dark:text-neutral-300">
                <span>{t("brightnessOffset")}</span>
                <span className="font-mono">{leftBrightness}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                value={leftBrightness}
                onChange={(e) => setLeftBrightness(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Monitor B Controls */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
              <Monitor className="w-4 h-4 text-purple-500" />
              <span>{t("monitorBControls")}</span>
            </div>
            <button
              onClick={() => {
                setRightRed(0);
                setRightGreen(0);
                setRightBlue(0);
                setRightBrightness(100);
              }}
              className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              {t("reset")}
            </button>
          </div>

          <div className="space-y-4 text-xs font-medium">
            <div>
              <div className="flex justify-between mb-1.5 text-neutral-700 dark:text-neutral-300">
                <span>{t("redGain")}</span>
                <span className="font-mono">{rightRed > 0 ? `+${rightRed}` : rightRed}</span>
              </div>
              <input
                type="range"
                min={-50}
                max={50}
                value={rightRed}
                onChange={(e) => setRightRed(Number(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-neutral-700 dark:text-neutral-300">
                <span>{t("greenGain")}</span>
                <span className="font-mono">{rightGreen > 0 ? `+${rightGreen}` : rightGreen}</span>
              </div>
              <input
                type="range"
                min={-50}
                max={50}
                value={rightGreen}
                onChange={(e) => setRightGreen(Number(e.target.value))}
                className="w-full accent-green-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-neutral-700 dark:text-neutral-300">
                <span>{t("blueGain")}</span>
                <span className="font-mono">{rightBlue > 0 ? `+${rightBlue}` : rightBlue}</span>
              </div>
              <input
                type="range"
                min={-50}
                max={50}
                value={rightBlue}
                onChange={(e) => setRightBlue(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-neutral-700 dark:text-neutral-300">
                <span>{t("brightnessOffset")}</span>
                <span className="font-mono">{rightBrightness}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                value={rightBrightness}
                onChange={(e) => setRightBrightness(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* How to use instruction banner */}
      <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-neutral-800 dark:text-neutral-200 flex items-start gap-4">
        <Info className="w-5 h-5 text-cyan-500 mt-0.5 shrink-0" />
        <div className="text-xs sm:text-sm leading-relaxed space-y-1">
          <div className="font-bold text-cyan-900 dark:text-cyan-300">{t("guideTitle")}</div>
          <div>{t("guideStep1")}</div>
          <div>{t("guideStep2")}</div>
          <div>{t("guideStep3")}</div>
        </div>
      </div>
    </div>
  );
}
