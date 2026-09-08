"use client";

import { useState, useRef, useEffect, useCallback, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { TestWrapper } from "@/components/test-runner/TestWrapper";
import { TestControlBar } from "@/components/test-runner/TestControlBar";
import { useTestContext } from "@/components/test-runner/TestContext";
import {
  Grid, CheckSquare, Palette, CircleDot, Crosshair,
  AlignJustify, Columns, Type, Sun, Sparkles, Layers,
  ArrowUpDown, SlidersHorizontal
} from "lucide-react";

export type CustomPatternPreset =
  | "black"
  | "white"
  | "rgb"
  | "grayscale"
  | "gradient"
  | "checkerboard"
  | "grid"
  | "horizontal_lines"
  | "vertical_lines"
  | "sharpness"
  | "text"
  | "moire";

const PRESET_DEFINITIONS: { id: CustomPatternPreset; icon: typeof Grid }[] = [
  { id: "grid", icon: Grid },
  { id: "checkerboard", icon: CheckSquare },
  { id: "horizontal_lines", icon: AlignJustify },
  { id: "vertical_lines", icon: Columns },
  { id: "black", icon: Sun },
  { id: "white", icon: Sun },
  { id: "rgb", icon: Palette },
  { id: "grayscale", icon: Layers },
  { id: "gradient", icon: Sparkles },
  { id: "sharpness", icon: Crosshair },
  { id: "text", icon: Type },
  { id: "moire", icon: CircleDot },
];

const PRIMARY_ALIGNMENT_PRESETS: CustomPatternPreset[] = [
  "grid",
  "checkerboard",
  "horizontal_lines",
  "vertical_lines",
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
}

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
}: CustomPatternRunnerProps) {
  const { registerNavigation } = useTestContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showAllPresetsMenu, setShowAllPresetsMenu] = useState(false);

  // Invert colors helper
  const invertColors = useCallback(() => {
    const temp = color1;
    setColor1(color2);
    setColor2(temp);
  }, [color1, color2, setColor1, setColor2]);

  // Keyboard navigation through unrepeated alignment features
  useEffect(() => {
    registerNavigation({
      next: () => {
        setActivePreset(
          (() => {
            const idx = PRIMARY_ALIGNMENT_PRESETS.indexOf(activePreset);
            if (idx === -1 || idx === PRIMARY_ALIGNMENT_PRESETS.length - 1) {
              return PRIMARY_ALIGNMENT_PRESETS[0];
            }
            return PRIMARY_ALIGNMENT_PRESETS[idx + 1];
          })()
        );
      },
      prev: () => {
        setActivePreset(
          (() => {
            const idx = PRIMARY_ALIGNMENT_PRESETS.indexOf(activePreset);
            if (idx <= 0) {
              return PRIMARY_ALIGNMENT_PRESETS[PRIMARY_ALIGNMENT_PRESETS.length - 1];
            }
            return PRIMARY_ALIGNMENT_PRESETS[idx - 1];
          })()
        );
      },
      reset: () => {
        setActivePreset("grid");
        setGridSize(40);
        setLineWidth(1);
        setColor1("#FFFFFF");
        setColor2("#000000");
      },
    });
  }, [registerNavigation, activePreset, setActivePreset, setGridSize, setLineWidth, setColor1, setColor2]);

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
        const barW = w / 3;
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0, 0, Math.ceil(barW), h);
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(Math.floor(barW), 0, Math.ceil(barW), h);
        ctx.fillStyle = "#0000FF";
        ctx.fillRect(Math.floor(barW * 2), 0, Math.ceil(barW), h);
        break;
      }
      case "grayscale": {
        const steps = 16;
        const stepW = w / steps;
        for (let i = 0; i < steps; i++) {
          const val = Math.round((i / (steps - 1)) * 255);
          ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
          ctx.fillRect(Math.floor(i * stepW), 0, Math.ceil(stepW), Math.floor(h * 0.5));
        }
        const vSteps = 8;
        const vStepH = (h * 0.5) / vSteps;
        for (let i = 0; i < vSteps; i++) {
          const val = Math.round((i / (vSteps - 1)) * 255);
          ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
          ctx.fillRect(0, Math.floor(h * 0.5 + i * vStepH), w, Math.ceil(vStepH));
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
        ctx.fillStyle = color1;
        ctx.fillRect(Math.floor(w / 2), 0, Math.max(1, Math.floor(1 * dpr)), h);
        ctx.fillRect(0, Math.floor(h / 2), w, Math.max(1, Math.floor(1 * dpr)));

        const quadW = Math.floor(w * 0.4);
        const quadH = Math.floor(h * 0.4);
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
        ctx.strokeStyle = color1;
        ctx.lineWidth = Math.max(1, Math.floor(1 * dpr));
        for (let r = 10 * dpr; r < Math.min(quadW, quadH) / 2; r += 6 * dpr) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
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
        const step = Math.max(2, Math.round(gridSize * 0.15 * dpr));

        ctx.strokeStyle = color1;
        ctx.lineWidth = scaledLine;

        for (let r = step; r < maxR; r += step) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        const numSpokes = Math.max(12, Math.round(64 / (gridSize / 20)));
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
      <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden select-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Control Bar integrated with TestRunner & Fullscreen */}
      <TestControlBar testId="custom-pattern" title="Precision Test Patterns">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Primary Alignment Presets (Unrepeated from prior tests in Basic Check) */}
          <div className="flex items-center bg-muted/60 p-0.5 rounded-lg border border-border/60 text-xs">
            <button
              onClick={() => setActivePreset("grid")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                activePreset === "grid"
                  ? "bg-white text-gray-950 font-bold shadow-xs"
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
              title="2D Grid: Calibration & Alignment"
            >
              <Grid className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">2D Grid</span>
            </button>

            <button
              onClick={() => setActivePreset("checkerboard")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                activePreset === "checkerboard"
                  ? "bg-white text-gray-950 font-bold shadow-xs"
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
              title="Checkerboard: Geometry & ANSI Contrast"
            >
              <CheckSquare className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Checkerboard</span>
            </button>

            <button
              onClick={() => setActivePreset("horizontal_lines")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                activePreset === "horizontal_lines"
                  ? "bg-white text-gray-950 font-bold shadow-xs"
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
              title="Horizontal Lines: Raster Scan & Phase"
            >
              <AlignJustify className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">H-Lines</span>
            </button>

            <button
              onClick={() => setActivePreset("vertical_lines")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                activePreset === "vertical_lines"
                  ? "bg-white text-gray-950 font-bold shadow-xs"
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
              title="Vertical Lines: Clock Timing & Sharpness"
            >
              <Columns className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">V-Lines</span>
            </button>
          </div>

          {/* Quick Density Steps */}
          {["grid", "checkerboard", "horizontal_lines", "vertical_lines"].includes(activePreset) && (
            <div className="flex items-center gap-1.5 text-xs bg-muted/40 px-2 py-0.5 rounded-lg border border-border/40">
              <span className="text-[10px] text-muted-foreground dark:text-slate-300 uppercase font-mono">Density:</span>
              {[20, 40, 60, 80].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setGridSize(sz)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-medium transition-colors ${
                    gridSize === sz
                      ? "bg-white text-gray-950 font-bold shadow-xs"
                      : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
                  }`}
                >
                  {sz}px
                </button>
              ))}
            </div>
          )}

          {/* Invert Colors Button */}
          <button
            onClick={invertColors}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border border-border/50 hover:bg-muted dark:hover:bg-white/10 text-gray-700 dark:text-slate-200 dark:hover:text-white transition-colors"
            title="Invert Colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Invert</span>
          </button>

          {/* Toggle All 12 Presets Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowAllPresetsMenu(!showAllPresetsMenu)}
              className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                showAllPresetsMenu
                  ? "bg-white text-gray-950 font-bold shadow-xs border-border"
                  : "border-border/50 hover:bg-muted dark:hover:bg-white/10 text-gray-700 dark:text-slate-200"
              }`}
              title="Select from all 12 calibration presets"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">All Presets</span>
            </button>

            {showAllPresetsMenu && (
              <div className="absolute bottom-full mb-2 right-0 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-2xl p-2 z-50 w-56 grid grid-cols-2 gap-1 text-xs">
                {PRESET_DEFINITIONS.map((p) => {
                  const Icon = p.icon;
                  const isSel = activePreset === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActivePreset(p.id);
                        setShowAllPresetsMenu(false);
                      }}
                      className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left transition-colors ${
                        isSel
                          ? "bg-gray-900 text-white font-medium"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <Icon className="w-3 h-3 shrink-0" />
                      <span className="truncate capitalize">{p.id.replace("_", " ")}</span>
                    </button>
                  );
                })}
              </div>
            )}
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
          {PRESET_DEFINITIONS.map((p) => {
            const Icon = p.icon;
            const isActive = activePreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePreset(p.id)}
                title={t(`presets.${p.id}.desc` as "presets.grid.desc")}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-gray-950 text-white shadow-xs"
                    : "bg-white text-gray-700 hover:text-gray-950 border border-gray-200/80 hover:border-gray-300"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{t(`presets.${p.id}.label` as "presets.grid.label")}</span>
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
      />
    </TestWrapper>
  );
}
