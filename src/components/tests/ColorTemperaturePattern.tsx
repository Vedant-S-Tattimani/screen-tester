"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Sun, 
  Sliders, 
  Eye, 
  Maximize2, 
  Minimize2, 
  RotateCcw,
  Sparkles,
  Info
} from "lucide-react";

interface Illuminant {
  id: string;
  name: string;
  tempK: number;
  chromaticity: { x: number; y: number };
  rgbApprox: string;
  description: string;
}

const ILLUMINANTS: Illuminant[] = [
  {
    id: "d50",
    name: "5000K (D50)",
    tempK: 5000,
    chromaticity: { x: 0.3457, y: 0.3585 },
    rgbApprox: "rgb(255, 237, 217)",
    description: "Graphic arts, print evaluation, warm paper horizon daylight."
  },
  {
    id: "d55",
    name: "5500K (D55)",
    tempK: 5500,
    chromaticity: { x: 0.3324, y: 0.3474 },
    rgbApprox: "rgb(255, 245, 234)",
    description: "Mid-morning sunlight, photography standard."
  },
  {
    id: "d65",
    name: "6500K (D65)",
    tempK: 6500,
    chromaticity: { x: 0.3127, y: 0.3290 },
    rgbApprox: "rgb(255, 255, 255)",
    description: "Global standard reference for sRGB, Rec.709, DCI-P3, and web content."
  },
  {
    id: "d75",
    name: "7500K (D75)",
    tempK: 7500,
    chromaticity: { x: 0.2990, y: 0.3149 },
    rgbApprox: "rgb(240, 246, 255)",
    description: "Cool daylight, overcast north sky illumination."
  },
  {
    id: "9300k",
    name: "9300K (Cool)",
    tempK: 9300,
    chromaticity: { x: 0.2848, y: 0.2932 },
    rgbApprox: "rgb(226, 238, 255)",
    description: "Legacy Asian broadcast default, high blue peak, common 'Cool' OSD preset."
  }
];

export function ColorTemperaturePattern({ testId }: { testId: string }) {
  const [selectedIlluminant, setSelectedIlluminant] = useState<string>("d65");
  const [viewMode, setViewMode] = useState<"split" | "multi" | "fullscreen">("split");
  const [tintOffset, setTintOffset] = useState<number>(0); // -10 (Green) to +10 (Magenta)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showRamp, setShowRamp] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const activeTarget = ILLUMINANTS.find((i) => i.id === selectedIlluminant) || ILLUMINANTS[2];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Convert Kelvin to RGB approximation
  const getSimulatedColor = (tempK: number, tint: number) => {
    // Basic approximation with tint shift
    const base = ILLUMINANTS.find((i) => i.tempK === tempK)?.rgbApprox || "rgb(255,255,255)";
    if (tint === 0) return base;
    // Apply tint offset
    return tint > 0
      ? `color-mix(in srgb, ${base} ${100 - tint * 4}%, #f43f5e ${tint * 4}%)`
      : `color-mix(in srgb, ${base} ${100 + tint * 4}%, #22c55e ${-tint * 4}%)`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[650px] sm:h-[720px] rounded-2xl overflow-hidden flex flex-col select-none border border-neutral-800 shadow-2xl bg-neutral-950 text-white"
    >
      {/* Top Header & Presets */}
      <div className="z-20 bg-neutral-900/90 backdrop-blur-xl border-b border-neutral-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            White Point Target:
          </span>
          {ILLUMINANTS.map((ill) => (
            <button
              key={ill.id}
              onClick={() => setSelectedIlluminant(ill.id)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedIlluminant === ill.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              {ill.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-neutral-800 rounded-lg p-0.5 border border-neutral-700 text-xs font-mono">
            <button
              onClick={() => setViewMode("split")}
              className={`px-2.5 py-1 rounded-md transition-all ${viewMode === "split" ? "bg-blue-600 text-white" : "text-neutral-400 hover:text-white"}`}
            >
              Split D65
            </button>
            <button
              onClick={() => setViewMode("multi")}
              className={`px-2.5 py-1 rounded-md transition-all ${viewMode === "multi" ? "bg-blue-600 text-white" : "text-neutral-400 hover:text-white"}`}
            >
              All 5
            </button>
            <button
              onClick={() => setViewMode("fullscreen")}
              className={`px-2.5 py-1 rounded-md transition-all ${viewMode === "fullscreen" ? "bg-blue-600 text-white" : "text-neutral-400 hover:text-white"}`}
            >
              Solid
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Comparative Viewport */}
      <div className="relative flex-1 flex flex-col overflow-hidden">
        {/* Split Mode: Compare Selected against D65 Neutral */}
        {viewMode === "split" && (
          <div className="w-full h-full flex flex-col md:flex-row">
            {/* Left: D65 Neutral Reference */}
            <div 
              className="flex-1 flex flex-col items-center justify-center p-6 transition-colors duration-300 relative border-b md:border-b-0 md:border-r border-neutral-800"
              style={{ backgroundColor: ILLUMINANTS[2].rgbApprox }}
            >
              <div className="bg-black/75 backdrop-blur-md px-4 py-2 rounded-xl text-center border border-neutral-700 text-white shadow-xl">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                  Neutral Standard
                </span>
                <span className="font-mono font-bold text-sm">D65 (6500K)</span>
                <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">x: 0.3127, y: 0.3290</span>
              </div>
            </div>

            {/* Right: Selected Target */}
            <div 
              className="flex-1 flex flex-col items-center justify-center p-6 transition-colors duration-300 relative"
              style={{ backgroundColor: getSimulatedColor(activeTarget.tempK, tintOffset) }}
            >
              <div className="bg-black/75 backdrop-blur-md px-4 py-2 rounded-xl text-center border border-neutral-700 text-white shadow-xl">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                  Simulated Target
                </span>
                <span className="font-mono font-bold text-sm">{activeTarget.name}</span>
                <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                  x: {activeTarget.chromaticity.x}, y: {activeTarget.chromaticity.y}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Multi Mode: Show All 5 Side-by-Side */}
        {viewMode === "multi" && (
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-5">
            {ILLUMINANTS.map((ill) => (
              <div
                key={ill.id}
                onClick={() => setSelectedIlluminant(ill.id)}
                className={`flex flex-col items-center justify-end p-4 transition-all cursor-pointer border-r border-neutral-900 ${
                  selectedIlluminant === ill.id ? "ring-2 ring-blue-500 z-10" : "opacity-90 hover:opacity-100"
                }`}
                style={{ backgroundColor: ill.rgbApprox }}
              >
                <div className="bg-black/80 backdrop-blur-md p-2 rounded-lg text-center text-white w-full border border-neutral-700">
                  <div className="font-bold text-xs font-mono">{ill.name}</div>
                  <div className="text-[10px] text-neutral-400">{ill.tempK}K</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fullscreen Solid Mode */}
        {viewMode === "fullscreen" && (
          <div 
            className="w-full h-full flex items-center justify-center transition-colors duration-300"
            style={{ backgroundColor: getSimulatedColor(activeTarget.tempK, tintOffset) }}
          >
            <div className="bg-black/75 backdrop-blur-md px-5 py-2.5 rounded-xl text-white text-center border border-neutral-700">
              <span className="font-mono font-bold text-sm">{activeTarget.name} Target</span>
              <p className="text-xs text-neutral-300">{activeTarget.description}</p>
            </div>
          </div>
        )}

        {/* Grayscale Step Ramp Overlay */}
        {showRamp && (
          <div className="absolute bottom-0 inset-x-0 bg-neutral-950/80 backdrop-blur-md border-t border-neutral-800 p-2 flex items-center justify-center gap-1 z-10">
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((step) => {
              const val = Math.round((step / 100) * 255);
              return (
                <div
                  key={step}
                  className="flex-1 h-6 rounded-sm border border-neutral-800 flex items-center justify-center text-[9px] font-mono font-bold"
                  style={{ 
                    backgroundColor: `rgb(${val}, ${val}, ${val})`,
                    color: step > 50 ? "#000" : "#fff"
                  }}
                >
                  {step}%
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Controls & Diagnostics Bar */}
      <div className="z-20 bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-800 px-4 sm:px-6 py-3 grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs">
        {/* Tint Compensation Slider */}
        <div className="md:col-span-6 flex items-center gap-3">
          <span className="font-mono text-emerald-400">Green</span>
          <input
            type="range"
            min={-10}
            max={10}
            value={tintOffset}
            onChange={(e) => setTintOffset(Number(e.target.value))}
            className="w-full accent-blue-500 h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
          />
          <span className="font-mono text-rose-400">Magenta</span>
          <button
            onClick={() => setTintOffset(0)}
            className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white"
            title="Reset Tint"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Ramp Toggle */}
        <div className="md:col-span-3 flex items-center gap-2">
          <button
            onClick={() => setShowRamp((prev) => !prev)}
            className={`px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
              showRamp ? "bg-neutral-800 text-white border-neutral-600" : "text-neutral-500 border-neutral-800"
            }`}
          >
            {showRamp ? "Hide Grayscale Steps" : "Show Grayscale Steps"}
          </button>
        </div>

        {/* Description */}
        <div className="md:col-span-3 text-right text-neutral-400 font-mono text-[11px] truncate">
          {activeTarget.description}
        </div>
      </div>
    </div>
  );
}
