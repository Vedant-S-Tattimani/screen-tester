"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

export type BandingMode = "smooth" | "bitdepth" | "cmyk" | "dither";

interface GradientPreset {
  id: string;
  label: string;
  channel: string;
  css: string;
  type: "gray" | "rgb" | "cmy";
}

const GRADIENT_PRESETS: GradientPreset[] = [
  { id: "gray-h", label: "Grayscale (Horizontal)", channel: "Luminance", css: "linear-gradient(to right, #000000, #FFFFFF)", type: "gray" },
  { id: "gray-v", label: "Grayscale (Vertical)", channel: "Luminance", css: "linear-gradient(to bottom, #000000, #FFFFFF)", type: "gray" },
  { id: "red", label: "Red Channel (R)", channel: "Primary", css: "linear-gradient(to right, #000000, #FF0000)", type: "rgb" },
  { id: "green", label: "Green Channel (G)", channel: "Primary", css: "linear-gradient(to right, #000000, #00FF00)", type: "rgb" },
  { id: "blue", label: "Blue Channel (B)", channel: "Primary", css: "linear-gradient(to right, #000000, #0000FF)", type: "rgb" },
  { id: "cyan", label: "Cyan Channel (C = G+B)", channel: "Secondary", css: "linear-gradient(to right, #000000, #00FFFF)", type: "cmy" },
  { id: "magenta", label: "Magenta Channel (M = R+B)", channel: "Secondary", css: "linear-gradient(to right, #000000, #FF00FF)", type: "cmy" },
  { id: "yellow", label: "Yellow Channel (Y = R+G)", channel: "Secondary", css: "linear-gradient(to right, #000000, #FFFF00)", type: "cmy" },
];

interface ColorBandingPatternProps {
  testId?: string;
}

export function ColorBandingPattern({ testId = "color-banding-test" }: ColorBandingPatternProps) {
  const { registerNavigation } = useTestContext();
  const [activeMode, setActiveMode] = useState<BandingMode>("smooth");
  const [presetIndex, setPresetIndex] = useState(0);
  const [bitDepthStep, setBitDepthStep] = useState<6 | 8 | 10>(8);
  const [showEduInfo, setShowEduInfo] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keyboard controls
  const nextPreset = useCallback(() => {
    setPresetIndex((i) => (i + 1) % GRADIENT_PRESETS.length);
  }, []);

  const prevPreset = useCallback(() => {
    setPresetIndex((i) => (i - 1 + GRADIENT_PRESETS.length) % GRADIENT_PRESETS.length);
  }, []);

  useEffect(() => {
    registerNavigation({
      next: nextPreset,
      prev: prevPreset,
      reset: () => {
        setPresetIndex(0);
        setActiveMode("smooth");
        setBitDepthStep(8);
      },
    });
  }, [registerNavigation, nextPreset, prevPreset]);

  // Render Canvas for Quantized Bit-Depth and Dithering Modes
  useEffect(() => {
    if (activeMode !== "bitdepth" && activeMode !== "dither") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;

    if (activeMode === "bitdepth") {
      // Draw simulated quantized steps across the width
      const numSteps = bitDepthStep === 6 ? 64 : bitDepthStep === 8 ? 256 : 1024;
      const stepWidth = w / numSteps;

      for (let i = 0; i < numSteps; i++) {
        const norm = i / (numSteps - 1);
        const val = Math.round(norm * 255);
        ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
        ctx.fillRect(Math.floor(i * stepWidth), 0, Math.ceil(stepWidth) + 1, h);
      }
    } else if (activeMode === "dither") {
      // Spatial Bayer 2x2 Dither pattern generator
      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;
      const bayer = [
        [0, 2],
        [3, 1]
      ];

      for (let y = 0; y < h; y++) {
        const rowOffset = y * w * 4;
        const bRow = bayer[y % 2];
        for (let x = 0; x < w; x++) {
          const norm = x / w;
          const rawVal = norm * 255;
          const base = Math.floor(rawVal);
          const frac = (rawVal - base) * 4;
          const threshold = bRow[x % 2];
          const pixelVal = frac > threshold ? Math.min(255, base + 1) : base;

          const idx = rowOffset + x * 4;
          data[idx] = pixelVal;
          data[idx + 1] = pixelVal;
          data[idx + 2] = pixelVal;
          data[idx + 3] = 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }
  }, [activeMode, bitDepthStep]);

  const currentPreset = GRADIENT_PRESETS[presetIndex];

  return (
    <>
      <div 
        className="absolute inset-0 select-none overflow-hidden"
        onClick={activeMode === "smooth" ? nextPreset : undefined}
      >
        {activeMode === "smooth" && (
          <div 
            className="w-full h-full transition-all duration-150"
            style={{ background: currentPreset.css }}
          />
        )}

        {(activeMode === "bitdepth" || activeMode === "dither") && (
          <canvas ref={canvasRef} className="block w-full h-full" />
        )}

        {/* Educational Info Modal / Popover */}
        {showEduInfo && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 max-w-xl w-[92%] bg-neutral-950/95 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white shadow-2xl z-40 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 font-semibold text-amber-400">
                <Info className="w-4 h-4" />
                <span>Visual Diagnostic vs. Colorimeter Calibration</span>
              </div>
              <button 
                onClick={() => setShowEduInfo(false)}
                className="text-white/60 hover:text-white px-2 py-0.5 rounded text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>
            <div className="mt-3 space-y-2 text-white/80 leading-relaxed">
              <p>
                <strong>What causes visible banding?</strong> Banding appears as stepped horizontal or vertical lines where smooth color transitions should exist. Common root causes:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Panel Bit Depth:</strong> 6-bit panels (common in budget high-refresh monitors) use Frame Rate Control (FRC) dithering and exhibit noticeable stepping. True 8-bit and 10-bit panels render significantly smoother steps.</li>
                <li><strong>GPU Dynamic Range:</strong> Ensure your graphics control panel (NVIDIA/AMD/Intel) is set to <em>Full Dynamic Range (0–255)</em> rather than <em>Limited (16–235)</em>.</li>
                <li><strong>Color Profiles:</strong> Highly aggressive ICC color profiles or software gamma corrections force quantization rounding errors.</li>
              </ul>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70 mt-3">
                <strong>Measurement Boundary:</strong> This is a subjective human-eye test. True color volume, Delta E accuracy, and gamma compliance require hardware spectrophotometers (e.g. Calibrite / Datacolor / Klein).
              </div>
            </div>
          </div>
        )}
      </div>

      <TestControlBar testId={testId} title="Color Banding & Bit Depth">
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Tabs */}
          <div className="flex items-center bg-muted/60 p-0.5 rounded-lg border border-border/60 text-xs">
            <button
              onClick={() => setActiveMode("smooth")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMode === "smooth" 
                  ? "bg-white text-gray-950 font-bold shadow-xs" 
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
            >
              Smooth Gradients
            </button>
            <button
              onClick={() => setActiveMode("bitdepth")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMode === "bitdepth" 
                  ? "bg-white text-gray-950 font-bold shadow-xs" 
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
            >
              Bit-Depth Steps
            </button>
            <button
              onClick={() => setActiveMode("dither")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMode === "dither" 
                  ? "bg-white text-gray-950 font-bold shadow-xs" 
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
            >
              Dither / FRC
            </button>
          </div>

          {/* Smooth Mode Controls */}
          {activeMode === "smooth" && (
            <div className="flex items-center gap-1 bg-muted/40 rounded-lg p-0.5 border border-border/40">
              <button 
                onClick={prevPreset}
                className="p-1 hover:bg-muted dark:hover:bg-white/10 rounded text-gray-900 dark:text-white transition-colors"
                title="Previous gradient (Left Arrow)"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-medium px-2 min-w-[140px] text-center text-gray-900 dark:text-white font-mono">
                {currentPreset.label}
              </span>
              <button 
                onClick={nextPreset}
                className="p-1 hover:bg-muted dark:hover:bg-white/10 rounded text-gray-900 dark:text-white transition-colors"
                title="Next gradient (Right Arrow)"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Bit-Depth Stepping Controls */}
          {activeMode === "bitdepth" && (
            <div className="flex items-center gap-1 bg-muted/40 rounded-lg p-0.5 border border-border/40 text-xs">
              <button
                onClick={() => setBitDepthStep(6)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium ${bitDepthStep === 6 ? "bg-amber-500/30 text-amber-300 font-bold border border-amber-500/50" : "text-gray-600 dark:text-slate-300 hover:text-white"}`}
              >
                6-bit (64 steps)
              </button>
              <button
                onClick={() => setBitDepthStep(8)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium ${bitDepthStep === 8 ? "bg-blue-500/30 text-blue-300 font-bold border border-blue-500/50" : "text-gray-600 dark:text-slate-300 hover:text-white"}`}
              >
                8-bit (256 steps)
              </button>
              <button
                onClick={() => setBitDepthStep(10)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium ${bitDepthStep === 10 ? "bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500/50" : "text-gray-600 dark:text-slate-300 hover:text-white"}`}
              >
                10-bit (Simulated)
              </button>
            </div>
          )}

          {/* Education / Info Button */}
          <button
            onClick={() => setShowEduInfo(!showEduInfo)}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-colors ${
              showEduInfo ? "bg-amber-500/20 text-amber-500 border-amber-500/40" : "hover:bg-muted dark:hover:bg-white/10 text-gray-700 dark:text-slate-200 dark:hover:text-white border-border/50"
            }`}
            title="Read about visual banding vs colorimeter calibration"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Explanation</span>
          </button>
        </div>
      </TestControlBar>
    </>
  );
}
