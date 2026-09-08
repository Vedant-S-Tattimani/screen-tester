"use client";

import { useEffect, useRef, useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { getDevicePixelRatio } from "@/lib/browserCapabilities";
import { Sliders, Eye, RotateCcw } from "lucide-react";

interface GammaPatternProps {
  testId?: string;
}

const PRESET_GAMMAS = [
  { label: "1.8 (Mac Legacy)", value: 1.8 },
  { label: "2.2 (sRGB Standard)", value: 2.2 },
  { label: "2.4 (Cinema / Dark Room)", value: 2.4 },
];

export function GammaPattern({ testId }: GammaPatternProps) {
  const { isRunning, registerNavigation } = useTestContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedGamma, setSelectedGamma] = useState<number>(2.2);
  const [channel] = useState<"all" | "red" | "green" | "blue">("all");

  useEffect(() => {
    registerNavigation({
      reset: () => setSelectedGamma(2.2),
    });
  }, [registerNavigation]);

  useEffect(() => {
    if (!isRunning || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = getDevicePixelRatio();

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      draw();
    };

    const draw = () => {
      // True black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const targetWidth = Math.min(canvas.width * 0.85, 720 * dpr);
      const halfHeight = Math.min(canvas.height * 0.22, 110 * dpr);
      const startX = Math.floor((canvas.width - targetWidth) / 2);
      const startY = Math.floor((canvas.height / 2) - halfHeight);

      // 1. TOP HALF: Alternating 1-physical-pixel black and white lines (50% luminance optical average)
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(startX, startY, targetWidth, halfHeight);

      ctx.fillStyle = "#000000";
      // Snap strictly to integer physical pixels to avoid sub-pixel anti-aliasing Moire fringes
      const step = Math.max(2, Math.floor(2 * dpr));
      const lineThickness = Math.max(1, Math.floor(1 * dpr));
      for (let y = startY; y < startY + halfHeight; y += step) {
        ctx.fillRect(startX, Math.floor(y), targetWidth, lineThickness);
      }

      // 2. BOTTOM HALF: Solid patch rendered at calculated gamma target luminance
      // Formula: 0.5 ^ (1 / gamma) * 255
      const grayValue = Math.round(Math.pow(0.5, 1 / selectedGamma) * 255);

      if (channel === "red") {
        ctx.fillStyle = `rgb(${grayValue}, 0, 0)`;
      } else if (channel === "green") {
        ctx.fillStyle = `rgb(0, ${grayValue}, 0)`;
      } else if (channel === "blue") {
        ctx.fillStyle = `rgb(0, 0, ${grayValue})`;
      } else {
        ctx.fillStyle = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
      }

      ctx.fillRect(startX, startY + halfHeight, targetWidth, halfHeight);

      // Subtle border framing the target test zone
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = Math.max(1, Math.floor(1 * dpr));
      ctx.strokeRect(startX, startY, targetWidth, halfHeight * 2);

      // Divider line between pattern and solid
      ctx.fillStyle = "#222222";
      ctx.fillRect(startX, startY + halfHeight - 1, targetWidth, 2);
    };

    window.addEventListener("resize", resize);
    setTimeout(resize, 0);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [isRunning, selectedGamma, channel]);

  return (
    <>
      <div className="absolute inset-0 bg-black text-white select-none overflow-hidden flex flex-col items-center justify-center">
        <canvas ref={canvasRef} className="block w-full h-full cursor-crosshair" />

        {/* Squint / Distance Guidance Floating Banner */}
        <div className="absolute top-4 mx-auto max-w-md bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl text-center shadow-xl pointer-events-none">
          <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400 font-semibold mb-0.5">
            <Eye className="w-3.5 h-3.5" />
            <span>Calibration Instruction</span>
          </div>
          <p className="text-[11px] text-white/70 leading-normal">
            Step back 2-3 meters or squint until the top striped pattern merges into a solid gray. Adjust the slider until top and bottom halves match seamlessly.
          </p>
        </div>
      </div>

      <TestControlBar testId={testId} title="Gamma Calibration">
        <div className="flex flex-wrap items-center gap-3">
          {/* Preset Buttons */}
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/50">
            {PRESET_GAMMAS.map(p => (
              <button
                key={p.value}
                onClick={() => setSelectedGamma(p.value)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                  selectedGamma === p.value 
                    ? "bg-white text-gray-950 shadow-xs font-bold" 
                    : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Continuous Gamma Slider */}
          <div className="flex items-center gap-2 bg-muted/40 px-3 py-1.5 rounded-lg border border-border/50">
            <Sliders className="w-3.5 h-3.5 text-gray-500 dark:text-slate-300" />
            <input
              type="range"
              min="1.6"
              max="2.6"
              step="0.05"
              value={selectedGamma}
              onChange={(e) => setSelectedGamma(parseFloat(e.target.value))}
              aria-label="Gamma calibration value"
              aria-valuemin={1.6}
              aria-valuemax={2.6}
              aria-valuenow={selectedGamma}
              className="w-24 sm:w-32 accent-blue-500 cursor-pointer"
            />
            <span className="font-mono text-xs font-bold tabular-nums w-12 text-right text-gray-900 dark:text-white">
              {selectedGamma.toFixed(2)}
            </span>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => setSelectedGamma(2.2)}
            className="p-1.5 hover:bg-muted dark:hover:bg-white/10 rounded-lg transition-colors border border-border/50 text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
            title="Reset to 2.2 Standard"
            aria-label="Reset Gamma to 2.2 Standard"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </TestControlBar>
    </>
  );
}