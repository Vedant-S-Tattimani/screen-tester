"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Grid, 
  Layers, 
  Eye, 
  Camera, 
  Maximize2, 
  Minimize2, 
  RotateCcw,
  Sparkles,
  Info
} from "lucide-react";
import { useTranslations } from 'next-intl';

type DitherPattern = "checker1" | "checker2" | "hlines" | "vlines" | "ditherpatch" | "solidtone";

export function TemporalDitheringPattern({
testId }: { testId: string }) {
  const t = useTranslations('Tests.TemporalDitheringPattern');
  const [pattern, setPattern] = useState<DitherPattern>("checker1");
  const [intermediateLevel, setIntermediateLevel] = useState<number>(127);
  const [invertPhase, setInvertPhase] = useState<boolean>(false);
  const [autoInvert, setAutoInvert] = useState<boolean>(false);
  const [invertSpeedHz, setInvertSpeedHz] = useState<number>(2); // 2Hz to 30Hz
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Render canvas pattern
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const targetW = Math.max(1, Math.floor(rect.width * dpr));
    const targetH = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    const p1 = invertPhase ? 255 : 0;
    const p2 = invertPhase ? 0 : 255;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        let lum = 0;

        if (pattern === "checker1") {
          lum = (x + y) % 2 === 0 ? p1 : p2;
        } else if (pattern === "checker2") {
          lum = (Math.floor(x / 2) + Math.floor(y / 2)) % 2 === 0 ? p1 : p2;
        } else if (pattern === "hlines") {
          lum = y % 2 === 0 ? p1 : p2;
        } else if (pattern === "vlines") {
          lum = x % 2 === 0 ? p1 : p2;
        } else if (pattern === "ditherpatch") {
          // Microscopic 8-bit dither test: alternating between intermediate and intermediate + 1
          const isOffset = (x + y) % 2 === 0;
          lum = isOffset ? intermediateLevel : Math.min(255, intermediateLevel + 1);
        } else if (pattern === "solidtone") {
          lum = intermediateLevel;
        }

        data[idx] = lum;
        data[idx + 1] = lum;
        data[idx + 2] = lum;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, [pattern, intermediateLevel, invertPhase, isFullscreen]);

  // Auto phase inversion cycle
  useEffect(() => {
    if (!autoInvert) return;
    const interval = setInterval(() => {
      setInvertPhase((prev) => !prev);
    }, 1000 / (invertSpeedHz * 2));
    return () => clearInterval(interval);
  }, [autoInvert, invertSpeedHz]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${isFullscreen ? "h-full rounded-none border-none" : "h-[650px] sm:h-[720px] rounded-2xl border border-neutral-800"} overflow-hidden flex flex-col select-none shadow-2xl bg-neutral-950 text-white`}
    >
      {/* Pattern Selector Bar */}
      <div className="z-20 bg-neutral-900/90 backdrop-blur-xl border-b border-neutral-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider mr-1">
            Pattern:
          </span>
          <button
            onClick={() => setPattern("checker1")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              pattern === "checker1" ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            }`}
          >
            1x1 Checker
          </button>
          <button
            onClick={() => setPattern("checker2")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              pattern === "checker2" ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            }`}
          >
            2x2 Grid
          </button>
          <button
            onClick={() => setPattern("hlines")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              pattern === "hlines" ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            }`}
          >
            1px H-Lines
          </button>
          <button
            onClick={() => setPattern("vlines")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              pattern === "vlines" ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            }`}
          >
            1px V-Lines
          </button>
          <button
            onClick={() => setPattern("ditherpatch")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              pattern === "ditherpatch" ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            }`}
          >
            8-Bit FRC Micro-Step
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoInvert((prev) => !prev)}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              autoInvert ? "bg-amber-500 text-black font-bold" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            }`}
          >
            {autoInvert ? "Inverting..." : "Auto Polarity"}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Pattern Viewport */}
      <div className="relative flex-1 overflow-hidden flex items-center justify-center bg-black">
        <canvas
          ref={canvasRef}
          className="w-full h-full block pixelated"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Diagnostic Overlay */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-neutral-800 text-white max-w-xs shadow-xl pointer-events-none">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <Camera className="w-4 h-4" />
            <span>{t("detectionTip")}</span>
          </div>
          <p className="text-[11px] text-neutral-300 leading-snug">
            Point your smartphone camera at close range or record at 120fps/240fps slow-motion. A panel with temporal dithering will show active shimmering or dancing pixel patterns.
          </p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="z-20 bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        {pattern === "ditherpatch" && (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="font-mono text-neutral-400">{t("targetLuminance")}</span>
            <input
              type="range"
              min={0}
              max={254}
              value={intermediateLevel}
              onChange={(e) => setIntermediateLevel(Number(e.target.value))}
              className="accent-blue-500 w-48 h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
            />
            <span className="font-mono font-bold text-white w-12">{intermediateLevel} / 255</span>
          </div>
        )}

        <div className="flex items-center gap-2 font-mono text-neutral-400 text-[11px]">
          <span>{t("patternMode")}</span>
          <span className="text-blue-400 uppercase font-bold">{pattern}</span>
          <span>• 1:1 Pixel Mapping Recommended</span>
        </div>
      </div>
    </div>
  );
}
