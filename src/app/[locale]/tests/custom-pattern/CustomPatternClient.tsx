"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  ArrowLeft, Maximize2, Minimize2, Grid, CheckSquare, Palette,
  CircleDot, Crosshair, AlignJustify, Columns, Type,
  Sun, Sparkles, Layers, ArrowUpDown
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
  { id: "black", icon: Sun },
  { id: "white", icon: Sun },
  { id: "rgb", icon: Palette },
  { id: "grayscale", icon: Layers },
  { id: "gradient", icon: Sparkles },
  { id: "checkerboard", icon: CheckSquare },
  { id: "grid", icon: Grid },
  { id: "horizontal_lines", icon: AlignJustify },
  { id: "vertical_lines", icon: Columns },
  { id: "sharpness", icon: Crosshair },
  { id: "text", icon: Type },
  { id: "moire", icon: CircleDot },
];

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
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fullscreen listener
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }
  }, []);

  // Keyboard shortcut (F for fullscreen, Esc handled by browser)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleFullscreen]);

  const invertColors = () => {
    const temp = color1;
    setColor1(color2);
    setColor2(temp);
  };

  // Canvas Drawing Routine (Strictly preserving pattern mathematics and rendering)
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
        // Vertical step ramp on lower half
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
        // High frequency 1px calibration blocks
        ctx.fillStyle = color1;
        // Center crosshair
        ctx.fillRect(Math.floor(w / 2), 0, Math.max(1, Math.floor(1 * dpr)), h);
        ctx.fillRect(0, Math.floor(h / 2), w, Math.max(1, Math.floor(1 * dpr)));

        // 1px alternating vertical stripes in top-left quadrant
        const quadW = Math.floor(w * 0.4);
        const quadH = Math.floor(h * 0.4);
        for (let x = 20 * dpr; x < quadW; x += 2 * dpr) {
          ctx.fillRect(Math.floor(x), Math.floor(20 * dpr), Math.max(1, Math.floor(1 * dpr)), quadH);
        }

        // 1px alternating horizontal stripes in top-right quadrant
        for (let y = 20 * dpr; y < quadH; y += 2 * dpr) {
          ctx.fillRect(Math.floor(w - quadW), Math.floor(y), quadW - 20 * dpr, Math.max(1, Math.floor(1 * dpr)));
        }

        // 1px checkerboard in bottom-left quadrant
        for (let y = h - quadH; y < h - 20 * dpr; y += 2 * dpr) {
          for (let x = 20 * dpr; x < quadW; x += 2 * dpr) {
            ctx.fillRect(Math.floor(x), Math.floor(y), Math.max(1, Math.floor(1 * dpr)), Math.max(1, Math.floor(1 * dpr)));
          }
        }

        // Concentric target in bottom-right quadrant
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

        // Concentric rings
        for (let r = step; r < maxR; r += step) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Radial Siemens Star spokes
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
    <div className="bg-white min-h-screen py-10 sm:py-14 text-gray-900">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 mb-6">
          <Link href="/tests" className="hover:text-gray-900 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t("breadcrumbAll")}</span>
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{t("breadcrumbTitle")}</span>
        </div>

        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-gray-400 mb-2">
              {t("eyebrow")}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950">
              {t("title")}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1.5 leading-relaxed max-w-2xl">
              {t("subtitle")}
            </p>
          </div>

          <button
            onClick={toggleFullscreen}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-950 text-white text-xs sm:text-sm font-medium hover:bg-black transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullscreen ? t("exitFullscreen") : t("enterFullscreen")}</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* PATTERN PRESET SELECTOR (12 PRESETS)                      */}
        {/* ========================================================= */}
        <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/80 mb-6">
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

        {/* ========================================================= */}
        {/* CUSTOM PARAMETERS TOOLBAR                                 */}
        {/* ========================================================= */}
        <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/60 mb-6 flex flex-wrap items-center justify-between gap-5">
          {/* Spacing / Grid Size */}
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

          {/* Line Weight / Thickness */}
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

          {/* Gradient Orientation */}
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

          {/* Color Palettes (FG and BG) */}
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

        {/* ========================================================= */}
        {/* INTERACTIVE CANVAS VIEWPORT                               */}
        {/* ========================================================= */}
        <div
          ref={containerRef}
          className={`border border-gray-200 rounded-2xl overflow-hidden bg-black relative flex items-center justify-center ${
            isFullscreen ? "fixed inset-0 z-50 border-0 rounded-none w-screen h-screen" : "h-[500px] sm:h-[650px] w-full shadow-inner"
          }`}
        >
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Fullscreen Floating Controls */}
          {isFullscreen && (
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs flex items-center gap-3 border border-white/10 shadow-xl">
              <span className="font-mono">{t("fullscreenHint")}</span>
              <button
                onClick={toggleFullscreen}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Pattern Explanation & Usage Notes */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  );
}
