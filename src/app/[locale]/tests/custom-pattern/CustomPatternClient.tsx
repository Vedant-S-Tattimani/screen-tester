"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Maximize2, Minimize2, Grid, CheckSquare, Palette, CircleDot, Crosshair } from "lucide-react";

type PatternType = "grid" | "checkerboard" | "solid" | "dots" | "crosshair";

export function CustomPatternClient() {
  const [pattern, setPattern] = useState<PatternType>("grid");
  const [gridSize, setGridSize] = useState<number>(40);
  const [lineWidth, setLineWidth] = useState<number>(1);
  const [color1, setColor1] = useState<string>("#ffffff");
  const [color2, setColor2] = useState<string>("#000000");
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

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen().catch(err => console.error(err));
    }
  };

  // Draw pattern on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // Clear
    ctx.fillStyle = color2;
    ctx.fillRect(0, 0, w, h);

    if (pattern === "solid") {
      ctx.fillStyle = color1;
      ctx.fillRect(0, 0, w, h);
    } else if (pattern === "grid") {
      ctx.strokeStyle = color1;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      for (let x = 0; x <= w; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    } else if (pattern === "checkerboard") {
      ctx.fillStyle = color1;
      for (let y = 0; y < h; y += gridSize) {
        for (let x = 0; x < w; x += gridSize) {
          const row = Math.floor(y / gridSize);
          const col = Math.floor(x / gridSize);
          if ((row + col) % 2 === 0) {
            ctx.fillRect(x, y, gridSize, gridSize);
          }
        }
      }
    } else if (pattern === "dots") {
      ctx.fillStyle = color1;
      const radius = Math.max(1, lineWidth);
      for (let y = gridSize / 2; y < h; y += gridSize) {
        for (let x = gridSize / 2; x < w; x += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (pattern === "crosshair") {
      ctx.strokeStyle = color1;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      // Center lines
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      // Diagonals
      ctx.moveTo(0, 0);
      ctx.lineTo(w, h);
      ctx.moveTo(w, 0);
      ctx.lineTo(0, h);
      // Concentric circles at center
      const maxR = Math.min(w, h) / 2;
      for (let r = 50; r < maxR; r += 50) {
        ctx.moveTo(w / 2 + r, h / 2);
        ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
      }
      ctx.stroke();
    }
  }, [pattern, gridSize, lineWidth, color1, color2, isFullscreen]);

  return (
    <div className="bg-white min-h-screen py-10 sm:py-14 text-gray-900">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 mb-6">
          <Link href="/tests" className="hover:text-gray-900 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL TESTS</span>
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">CUSTOM TEST PATTERN</span>
        </div>

        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-gray-400 mb-2">
              PRECISION TEST GENERATOR
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950">
              Custom Test Pattern
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1 leading-relaxed">
              Create and calibrate custom grids, checkerboards, solid fields, or alignment crosshairs with full-screen support.
            </p>
          </div>
          <button
            onClick={toggleFullscreen}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-950 text-white text-sm font-medium hover:bg-black transition-colors focus-visible:ring-2 focus-visible:ring-gray-950"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}</span>
          </button>
        </div>

        {/* Controls Bar */}
        <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/70 mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* Pattern Types */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-gray-200 rounded-xl">
            <button
              onClick={() => setPattern("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pattern === "grid" ? "bg-gray-950 text-white" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setPattern("checkerboard")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pattern === "checkerboard" ? "bg-gray-950 text-white" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Checker</span>
            </button>
            <button
              onClick={() => setPattern("solid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pattern === "solid" ? "bg-gray-950 text-white" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Solid</span>
            </button>
            <button
              onClick={() => setPattern("dots")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pattern === "dots" ? "bg-gray-950 text-white" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              <CircleDot className="w-3.5 h-3.5" />
              <span>Dots</span>
            </button>
            <button
              onClick={() => setPattern("crosshair")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pattern === "crosshair" ? "bg-gray-950 text-white" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>Reticle</span>
            </button>
          </div>

          {/* Size & Line width sliders (for grid/checkerboard/dots) */}
          {pattern !== "solid" && (
            <div className="flex items-center gap-6 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-mono">Spacing:</span>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={gridSize}
                  onChange={(e) => setGridSize(Number(e.target.value))}
                  className="w-24 accent-gray-950"
                />
                <span className="font-mono w-8">{gridSize}px</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-mono">Weight:</span>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={lineWidth}
                  onChange={(e) => setLineWidth(Number(e.target.value))}
                  className="w-20 accent-gray-950"
                />
                <span className="font-mono w-6">{lineWidth}px</span>
              </div>
            </div>
          )}

          {/* Color pickers */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 font-mono">FG:</span>
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border border-gray-300"
              />
            </div>
            {pattern !== "solid" && (
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500 font-mono">BG:</span>
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer border border-gray-300"
                />
              </div>
            )}
          </div>
        </div>

        {/* Canvas Display Viewport */}
        <div
          ref={containerRef}
          className={`border border-gray-200 rounded-2xl overflow-hidden bg-black relative flex items-center justify-center ${
            isFullscreen ? "fixed inset-0 z-50 border-0 rounded-none w-screen h-screen" : "h-[500px] sm:h-[600px] w-full"
          }`}
        >
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Fullscreen Floating Controls */}
          {isFullscreen && (
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs flex items-center gap-3">
              <span>Press ESC to exit</span>
              <button
                onClick={toggleFullscreen}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
