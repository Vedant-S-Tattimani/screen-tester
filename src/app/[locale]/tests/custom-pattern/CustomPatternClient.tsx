"use client";

import { useState, useRef, useEffect, useCallback, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { TestControlBar } from "@/components/test-runner/TestControlBar";
import { useTestContext } from "@/components/test-runner/TestContext";
import {
  Grid, CheckSquare, Palette, CircleDot, Crosshair,
  AlignJustify, Columns, Type, Sun, Sparkles, Layers,
  ArrowUpDown, SlidersHorizontal, Play, Pause
} from "lucide-react";

export type CustomPatternPreset =
  | "grid"
  | "checkerboard"
  | "horizontal_lines"
  | "vertical_lines"
  | "grayscale"
  | "rgb"
  | "sharpness"
  | "moire"
  | "gradient"
  | "black"
  | "white"
  | "text";

export interface PatternOption {
  id: CustomPatternPreset;
  label: string;
  icon: typeof Grid;
  desc: string;
}

export const ALL_PATTERN_OPTIONS: PatternOption[] = [
  { id: "grid", label: "2D Grid", icon: Grid, desc: "Geometry, pincushion, and alignment verification" },
  { id: "checkerboard", label: "Checkerboard", icon: CheckSquare, desc: "ANSI contrast & local dimming bleed" },
  { id: "horizontal_lines", label: "H-Lines", icon: AlignJustify, desc: "Raster scanlines & clock phase" },
  { id: "vertical_lines", label: "V-Lines", icon: Columns, desc: "Pixel clock tracking & vertical sharpness" },
  { id: "grayscale", label: "Grayscale Ramps", icon: Layers, desc: "Stepped & continuous tone gradation ramps" },
  { id: "rgb", label: "RGB Primaries", icon: Palette, desc: "Subpixel saturation & pure primary color bars" },
  { id: "sharpness", label: "Sharpness", icon: Crosshair, desc: "Optical focus, edge ringing & Siemens star" },
  { id: "moire", label: "Moiré", icon: CircleDot, desc: "Interference rings & spatial aliasing" },
  { id: "gradient", label: "Smooth Gradient", icon: Sparkles, desc: "Linear & radial quantization banding test" },
  { id: "black", label: "Black (0%)", icon: Sun, desc: "Backlight bleed & true black floor" },
  { id: "white", label: "White (100%)", icon: Sun, desc: "Peak luminance & white uniformity" },
  { id: "text", label: "Text Clarity", icon: Type, desc: "Font anti-aliasing & subpixel ClearType rendering" },
];

interface CustomPatternRunnerProps {
  activePreset: CustomPatternPreset;
  setActivePreset: (p: CustomPatternPreset) => void;
  gridSize: number;
  setGridSize: (s: number) => void;
  lineWidth: number;
  setLineWidth: (w: number) => void;
  color1: string;
  setColor1: (c: string) => void;
  color2: string;
  setColor2: (c: string) => void;
  customText: string;
  fontSize: number;
  fontWeight: string;
  gradientType: "horizontal" | "vertical" | "radial";
  setGradientType: (g: "horizontal" | "vertical" | "radial") => void;
}

const AUTO_TEST_INTERVAL = 3; // 3 seconds per pattern

function CustomPatternRunner({
  activePreset,
  setActivePreset,
  gridSize,
  setGridSize,
  lineWidth,
  setLineWidth,
  color1,
  setColor1,
  color2,
  setColor2,
  customText,
  fontSize,
  fontWeight,
  gradientType,
  setGradientType,
}: CustomPatternRunnerProps) {
  const { 
    registerNavigation,
    isAutoTest,
    isAutoTestPaused,
    goNextInWorkflow,
    observation,
    setObservation
  } = useTestContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAutoTesting, setIsAutoTesting] = useState(false);
  const [countdown, setCountdown] = useState(AUTO_TEST_INTERVAL);

  // Invert colors helper
  const invertColors = useCallback(() => {
    const temp = color1;
    setColor1(color2);
    setColor2(temp);
  }, [color1, color2, setColor1, setColor2]);

  // Keyboard navigation through ALL patterns
  useEffect(() => {
    registerNavigation({
      next: () => {
        const idx = ALL_PATTERN_OPTIONS.findIndex((p) => p.id === activePreset);
        const nextIdx = (idx + 1) % ALL_PATTERN_OPTIONS.length;
        setActivePreset(ALL_PATTERN_OPTIONS[nextIdx].id);
        setCountdown(AUTO_TEST_INTERVAL);
      },
      prev: () => {
        const idx = ALL_PATTERN_OPTIONS.findIndex((p) => p.id === activePreset);
        const prevIdx = idx <= 0 ? ALL_PATTERN_OPTIONS.length - 1 : idx - 1;
        setActivePreset(ALL_PATTERN_OPTIONS[prevIdx].id);
        setCountdown(AUTO_TEST_INTERVAL);
      },
      reset: () => {
        setIsAutoTesting(false);
        setActivePreset("grid");
        setGridSize(40);
        setLineWidth(1);
        setColor1("#FFFFFF");
        setColor2("#000000");
      },
    });
  }, [registerNavigation, activePreset, setActivePreset, setGridSize, setLineWidth, setColor1, setColor2]);

  // Guided Auto Test cycling across all 7 precision patterns (2.2s each)
  const activePresetRef = useRef(activePreset);
  useEffect(() => {
    activePresetRef.current = activePreset;
  }, [activePreset]);

  useEffect(() => {
    if (!isAutoTest || isAutoTestPaused) return;

    const timer = setInterval(() => {
      const idx = ALL_PATTERN_OPTIONS.findIndex((p) => p.id === activePresetRef.current);
      if (idx >= ALL_PATTERN_OPTIONS.length - 1) {
        if (!observation) {
          setObservation("PASS");
        }
        goNextInWorkflow();
      } else {
        setActivePreset(ALL_PATTERN_OPTIONS[idx + 1].id);
      }
    }, 2200);

    return () => clearInterval(timer);
  }, [isAutoTest, isAutoTestPaused, observation, setObservation, goNextInWorkflow, setActivePreset]);

  // Standalone local Auto Test automatic cycling timer
  useEffect(() => {
    if (!isAutoTesting) return;

    // Advance to next test pattern every 3 seconds
    const advanceTimer = setInterval(() => {
      const idx = ALL_PATTERN_OPTIONS.findIndex((p) => p.id === activePreset);
      const nextIdx = (idx + 1) % ALL_PATTERN_OPTIONS.length;
      setActivePreset(ALL_PATTERN_OPTIONS[nextIdx].id);
      setCountdown(AUTO_TEST_INTERVAL);
    }, AUTO_TEST_INTERVAL * 1000);

    // 1-second countdown ticker for UI pill
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : AUTO_TEST_INTERVAL));
    }, 1000);

    return () => {
      clearInterval(advanceTimer);
      clearInterval(countdownTimer);
    };
  }, [isAutoTesting, activePreset, setActivePreset]);

  // Toggle Auto Test mode
  const toggleAutoTest = () => {
    setCountdown(AUTO_TEST_INTERVAL);
    setIsAutoTesting((prev) => !prev);
  };

  // Canvas click to advance to next pattern
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-control-bar]")) return;

    const idx = ALL_PATTERN_OPTIONS.findIndex((p) => p.id === activePreset);
    const nextIdx = (idx + 1) % ALL_PATTERN_OPTIONS.length;
    setActivePreset(ALL_PATTERN_OPTIONS[nextIdx].id);
    setCountdown(AUTO_TEST_INTERVAL);
  };

  // Precision Canvas Drawing Routine
  const drawPattern = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    // Background fill
    ctx.fillStyle = color2;
    ctx.fillRect(0, 0, w, h);

    const scaledGrid = Math.max(1, Math.round(gridSize * dpr));
    const scaledLine = Math.max(1, Math.round(lineWidth * dpr));

    switch (activePreset) {
      case "black": {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, w, h);
        break;
      }
      case "white": {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, w, h);
        break;
      }
      case "rgb": {
        const bars = [
          { color: "#FF0000", label: "R" },
          { color: "#00FF00", label: "G" },
          { color: "#0000FF", label: "B" },
          { color: "#00FFFF", label: "C" },
          { color: "#FF00FF", label: "M" },
          { color: "#FFFF00", label: "Y" },
          { color: "#FFFFFF", label: "W" },
          { color: "#808080", label: "50%" },
          { color: "#000000", label: "K" },
        ];
        const barW = w / bars.length;
        bars.forEach((bar, i) => {
          ctx.fillStyle = bar.color;
          ctx.fillRect(Math.floor(i * barW), 0, Math.ceil(barW), h);
        });
        break;
      }
      case "grayscale": {
        // High-precision stepped & continuous Grayscale Ramps
        const topH = Math.floor(h * 0.4);
        const steps16 = 16;
        const stepW16 = w / steps16;
        for (let i = 0; i < steps16; i++) {
          const val = Math.round((i / (steps16 - 1)) * 255);
          ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
          ctx.fillRect(Math.floor(i * stepW16), 0, Math.ceil(stepW16), topH);
        }

        const midH = Math.floor(h * 0.25);
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, "#000000");
        grad.addColorStop(1, "#FFFFFF");
        ctx.fillStyle = grad;
        ctx.fillRect(0, topH, w, midH);

        const botY = topH + midH;
        const botH = h - botY;
        const steps32 = 32;
        const stepW32 = w / steps32;
        for (let i = 0; i < steps32; i++) {
          const val = Math.round((i / (steps32 - 1)) * 255);
          ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
          ctx.fillRect(Math.floor(i * stepW32), botY, Math.ceil(stepW32), botH);
        }
        break;
      }
      case "gradient": {
        let grad: CanvasGradient;
        if (gradientType === "horizontal") {
          grad = ctx.createLinearGradient(0, 0, w, 0);
        } else if (gradientType === "vertical") {
          grad = ctx.createLinearGradient(0, 0, 0, h);
        } else {
          grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 2);
        }
        grad.addColorStop(0, color2);
        grad.addColorStop(1, color1);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
        break;
      }
      case "checkerboard": {
        ctx.fillStyle = color1;
        for (let y = 0; y < h; y += scaledGrid) {
          for (let x = 0; x < w; x += scaledGrid) {
            const row = Math.floor(y / scaledGrid);
            const col = Math.floor(x / scaledGrid);
            if ((row + col) % 2 === 0) {
              ctx.fillRect(x, y, scaledGrid, scaledGrid);
            }
          }
        }
        break;
      }
      case "grid": {
        ctx.fillStyle = color1;
        for (let x = 0; x <= w; x += scaledGrid) {
          ctx.fillRect(x, 0, scaledLine, h);
        }
        for (let y = 0; y <= h; y += scaledGrid) {
          ctx.fillRect(0, y, w, scaledLine);
        }
        break;
      }
      case "horizontal_lines": {
        ctx.fillStyle = color1;
        for (let y = 0; y <= h; y += scaledGrid) {
          ctx.fillRect(0, y, w, scaledLine);
        }
        break;
      }
      case "vertical_lines": {
        ctx.fillStyle = color1;
        for (let x = 0; x <= w; x += scaledGrid) {
          ctx.fillRect(x, 0, scaledLine, h);
        }
        break;
      }
      case "sharpness": {
        ctx.fillStyle = color2;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = color1;
        ctx.strokeStyle = color1;

        const centerThick = Math.max(1, Math.floor(1 * dpr));
        ctx.fillRect(Math.floor(w / 2), 0, centerThick, h);
        ctx.fillRect(0, Math.floor(h / 2), w, centerThick);

        const quadW = Math.floor(w * 0.35);
        const quadH = Math.floor(h * 0.35);

        for (let x = 20 * dpr; x < quadW; x += 2 * dpr) {
          ctx.fillRect(Math.floor(x), Math.floor(20 * dpr), Math.max(1, Math.floor(1 * dpr)), quadH);
        }
        for (let y = 20 * dpr; y < quadH; y += 2 * dpr) {
          ctx.fillRect(Math.floor(w - quadW), Math.floor(y), quadW - 20 * dpr, Math.max(1, Math.floor(1 * dpr)));
        }
        for (let y = h - quadH; y < h - 20 * dpr; y += 2 * dpr) {
          for (let x = 20 * dpr; x < quadW; x += 2 * dpr) {
            ctx.fillRect(Math.floor(x), Math.floor(y), Math.max(1, Math.floor(1 * dpr)), Math.max(1, Math.floor(1 * dpr)));
          }
        }
        const cx = w - quadW / 2;
        const cy = h - quadH / 2;
        ctx.lineWidth = Math.max(1, Math.floor(1 * dpr));
        for (let r = 10 * dpr; r < Math.min(quadW, quadH) / 2; r += 5 * dpr) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        for (let r = 20 * dpr; r < Math.min(w, h) * 0.22; r += 8 * dpr) {
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
          ctx.stroke();
        }
        break;
      }
      case "text": {
        ctx.fillStyle = color1;
        ctx.font = `${fontWeight} ${Math.round(fontSize * dpr)}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace`;
        ctx.textBaseline = "middle";

        const textLines = [
          customText,
          "The quick brown fox jumps over the lazy dog (8px)",
          "Crisp subpixel antialiasing evaluation string: 1234567890!@#$%^&*()",
          "function evaluateSubpixels(dpr) { return dpr >= 2.0 ? 'Retina' : 'Standard'; }",
          "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z",
          "a b c d e f g h i j k l m n o p q r s t u v w x y z",
        ];

        let startY = 50 * dpr;
        const lineHeight = Math.round(fontSize * dpr * 1.6) + 12 * dpr;
        for (const line of textLines) {
          if (startY > h - 30 * dpr) break;
          ctx.fillText(line, 40 * dpr, startY);
          startY += lineHeight;
        }
        break;
      }
      case "moire": {
        const cx = w / 2;
        const cy = h / 2;
        const maxR = Math.hypot(cx, cy);
        const step = Math.max(2, Math.round(gridSize * 0.12 * dpr));

        ctx.strokeStyle = color1;
        ctx.lineWidth = scaledLine;

        for (let r = step; r < maxR; r += step) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        const numSpokes = Math.max(16, Math.round(72 / (gridSize / 20)));
        for (let i = 0; i < numSpokes; i++) {
          const theta = (i * 2 * Math.PI) / numSpokes;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(theta) * maxR, cy + Math.sin(theta) * maxR);
          ctx.stroke();
        }
        break;
      }
    }
  }, [activePreset, gridSize, lineWidth, color1, color2, customText, fontSize, fontWeight, gradientType]);

  useEffect(() => {
    drawPattern();
    window.addEventListener("resize", drawPattern);
    return () => window.removeEventListener("resize", drawPattern);
  }, [drawPattern]);

  return (
    <>
      {/* Viewport Canvas container */}
      <div
        onClick={handleCanvasClick}
        className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden select-none cursor-pointer"
        title="Click to cycle to the next test pattern"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Auto Test Floating Status Pill */}
      {(isAutoTesting || isAutoTest) && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white text-xs font-mono px-4 py-1.5 rounded-full border border-amber-500/40 shadow-xl flex items-center gap-2.5 pointer-events-none z-30 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-gray-300">AUTO TESTING:</span>
          <span className="font-bold text-amber-300">
            {ALL_PATTERN_OPTIONS.find((p) => p.id === activePreset)?.label}
          </span>
          <span className="text-gray-400 text-[11px] bg-white/10 px-1.5 py-0.5 rounded">
            Pattern {ALL_PATTERN_OPTIONS.findIndex((p) => p.id === activePreset) + 1}/{ALL_PATTERN_OPTIONS.length}
          </span>
        </div>
      )}

      {/* Control Bar integrated with TestRunner & Fullscreen */}
      <TestControlBar testId="custom-pattern" title="Precision Test Patterns">
        <div className="flex flex-col gap-2 w-full">
          {/* Main Strip: Direct Option Tabs */}
          <div className="flex items-center gap-2 w-full">
            {/* Direct Option Tab Strip (All options directly in tab strip, no hidden presets) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 bg-black/60 dark:bg-black/80 rounded-xl border border-white/20 text-xs flex-1 max-w-[85vw]">
              {ALL_PATTERN_OPTIONS.map((item) => {
                const Icon = item.icon;
                const isSel = activePreset === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActivePreset(item.id);
                      setCountdown(AUTO_TEST_INTERVAL);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                      isSel
                        ? "bg-amber-400 text-slate-950 font-bold shadow-md ring-2 ring-amber-300"
                        : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 dark:bg-white/15 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/25 shadow-xs font-semibold"
                    }`}
                    title={`${item.label}: ${item.desc}`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSel ? "text-slate-950" : "text-amber-600 dark:text-amber-300"}`} />
                    <span className="text-xs font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Contextual Controls Strip */}
          <div className="flex items-center justify-between gap-3 text-xs pt-1 border-t border-slate-200 dark:border-white/15">
            <div className="flex items-center gap-2">
              {/* Quick Density Steps */}
              {["grid", "checkerboard", "horizontal_lines", "vertical_lines", "moire"].includes(activePreset) && (
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-black/70 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/25">
                  <span className="text-[11px] text-amber-600 dark:text-amber-300 font-bold uppercase font-mono tracking-wider">Density:</span>
                  {[20, 40, 60, 80].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setGridSize(sz)}
                      className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                        gridSize === sz
                          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-extrabold shadow-xs"
                          : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/25 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15"
                      }`}
                    >
                      {sz}px
                    </button>
                  ))}
                </div>
              )}

              {/* Gradient Type Quick Selector */}
              {activePreset === "gradient" && (
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-black/70 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/25">
                  <span className="text-[11px] text-amber-600 dark:text-amber-300 font-bold uppercase font-mono tracking-wider">Style:</span>
                  {(["horizontal", "vertical", "radial"] as const).map((gradDir) => (
                    <button
                      key={gradDir}
                      type="button"
                      onClick={() => setGradientType(gradDir)}
                      className={`px-2.5 py-0.5 rounded text-xs font-bold capitalize transition-all cursor-pointer ${
                        gradientType === gradDir
                          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-extrabold shadow-xs"
                          : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/25 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15"
                      }`}
                    >
                      {gradDir}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Invert Colors Button */}
            <button
              onClick={invertColors}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/25 hover:bg-white/25 bg-white/15 text-amber-200 hover:text-white font-bold transition-all cursor-pointer shrink-0 ml-auto shadow-xs"
              title="Invert Foreground and Background Colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-xs font-bold">Invert</span>
            </button>
          </div>
        </div>
      </TestControlBar>
    </>
  );
}

export function CustomPatternClient() {
  const t = useTranslations("CustomPattern");

  const [activePreset, setActivePreset] = useState<CustomPatternPreset>("grid");
  const [gridSize, setGridSize] = useState<number>(40);
  const [lineWidth, setLineWidth] = useState<number>(1);
  const [color1, setColor1] = useState<string>("#FFFFFF"); // FG
  const [color2, setColor2] = useState<string>("#000000"); // BG
  const [customText, setCustomText] = useState<string>("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG 0123456789");
  const [fontSize, setFontSize] = useState<number>(16);
  const [fontWeight, setFontWeight] = useState<string>("normal");
  const [gradientType, setGradientType] = useState<"horizontal" | "vertical" | "radial">("horizontal");

  const invertColors = () => {
    const temp = color1;
    setColor1(color2);
    setColor2(temp);
  };

  // Extended controls rendered in inline mode below the viewport
  const extendedControls: ReactNode = (
    <div className="space-y-6">
      {/* 12 Presets Selector Grid */}
      <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/80">
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-3">
          {t("selectorTitle")}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {ALL_PATTERN_OPTIONS.map((p) => {
            const Icon = p.icon;
            const isActive = activePreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePreset(p.id)}
                title={p.desc}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-gray-950 text-white shadow-xs"
                    : "bg-white text-gray-700 hover:text-gray-950 border border-gray-200/80 hover:border-gray-300"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Precision Parameters Toolbar */}
      <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/60 flex flex-wrap items-center justify-between gap-5">
        {/* Spacing */}
        {["grid", "checkerboard", "horizontal_lines", "vertical_lines", "moire"].includes(activePreset) && (
          <div className="flex items-center gap-3 text-xs">
            <span className="font-mono text-gray-500 uppercase">{t("controls.spacing", { val: gridSize })}:</span>
            <input
              type="range"
              min="2"
              max="160"
              step="2"
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
              className="w-24 accent-gray-950"
            />
            <span className="font-mono tabular-nums text-gray-900 w-12 font-medium">{gridSize}px</span>
          </div>
        )}

        {/* Line Thickness */}
        {["grid", "horizontal_lines", "vertical_lines", "sharpness", "moire"].includes(activePreset) && (
          <div className="flex items-center gap-3 text-xs">
            <span className="font-mono text-gray-500 uppercase">{t("controls.lineWidth", { val: lineWidth })}:</span>
            <input
              type="range"
              min="1"
              max="12"
              step="1"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-20 accent-gray-950"
            />
            <span className="font-mono tabular-nums text-gray-900 w-8 font-medium">{lineWidth}px</span>
          </div>
        )}

        {/* Gradient Controls */}
        {activePreset === "gradient" && (
          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-gray-500 uppercase">{t("controls.gradientType")}:</span>
            {(["horizontal", "vertical", "radial"] as const).map((gradDir) => (
              <button
                key={gradDir}
                onClick={() => setGradientType(gradDir)}
                className={`px-2.5 py-1 rounded-md capitalize font-medium ${
                  gradientType === gradDir ? "bg-gray-950 text-white" : "bg-white border border-gray-200 text-gray-700"
                }`}
              >
                {gradDir === "horizontal" && t("controls.gradHorizontal")}
                {gradDir === "vertical" && t("controls.gradVertical")}
                {gradDir === "radial" && t("controls.gradRadial")}
              </button>
            ))}
          </div>
        )}

        {/* Text Controls */}
        {activePreset === "text" && (
          <div className="flex flex-wrap items-center gap-4 text-xs w-full lg:w-auto">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <span className="font-mono text-gray-500 uppercase">{t("controls.customText")}:</span>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900 font-mono"
                placeholder={t("controls.textPlaceholder")}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-gray-500 uppercase">{t("controls.fontSize", { val: fontSize })}:</span>
              <input
                type="range"
                min="10"
                max="36"
                step="2"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-20 accent-gray-950"
              />
              <span className="font-mono tabular-nums text-gray-900">{fontSize}px</span>
            </div>
            <div className="flex items-center gap-1">
              {(["normal", "bold"] as const).map((w) => (
                <button
                  key={w}
                  onClick={() => setFontWeight(w)}
                  className={`px-2.5 py-1 rounded-md capitalize text-xs ${
                    fontWeight === w ? "bg-gray-950 text-white font-semibold" : "bg-white border border-gray-200 text-gray-700"
                  }`}
                >
                  {w === "normal" ? t("controls.weightNormal") : t("controls.weightBold")}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FG and BG Color Pickers */}
        {!["black", "white", "rgb", "grayscale"].includes(activePreset) && (
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-mono uppercase">{t("controls.fgColor")}:</span>
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-6 h-6 rounded-md cursor-pointer border border-gray-300"
                title={t("controls.fgColor")}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-mono uppercase">{t("controls.bgColor")}:</span>
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="w-6 h-6 rounded-md cursor-pointer border border-gray-300"
                title={t("controls.bgColor")}
              />
            </div>

            <button
              onClick={invertColors}
              className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 transition-colors"
              title={t("controls.invert")}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Pattern Explanation & Usage Notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50">
          <h3 className="text-xs font-mono uppercase font-bold text-gray-400 mb-2">{t("cards.geometry.title")}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t("cards.geometry.desc")}
          </p>
        </div>
        <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50">
          <h3 className="text-xs font-mono uppercase font-bold text-gray-400 mb-2">{t("cards.sharpness.title")}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t("cards.sharpness.desc")}
          </p>
        </div>
        <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50">
          <h3 className="text-xs font-mono uppercase font-bold text-gray-400 mb-2">{t("cards.moire.title")}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t("cards.moire.desc")}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <TestWrapper
      testId="custom-pattern"
      title={t("title")}
      description={t("subtitle")}
      instructions={
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>2D Alignment Grid:</strong> Inspect for display barrel distortion, pincushioning, curvature warping, and optical convergence across all panel edges.</li>
          <li><strong>Checkerboard Matrix:</strong> Verify ANSI high-contrast square clarity without light blooming, edge fringing, or local dimming halo artifacts.</li>
          <li><strong>Horizontal & Vertical Lines:</strong> Check raster scanning alignment, pixel clock phasing, and single-pixel line sharpness.</li>
          <li><strong>Continuous Workflow:</strong> Use the density buttons to adjust grid spacing or switch to any of the 12 calibration presets as needed.</li>
        </ul>
      }
      extraControls={extendedControls}
    >
      <CustomPatternRunner
        activePreset={activePreset}
        setActivePreset={setActivePreset}
        gridSize={gridSize}
        setGridSize={setGridSize}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        color1={color1}
        setColor1={setColor1}
        color2={color2}
        setColor2={setColor2}
        customText={customText}
        fontSize={fontSize}
        fontWeight={fontWeight}
        gradientType={gradientType}
        setGradientType={setGradientType}
      />
    </TestWrapper>
  );
}
