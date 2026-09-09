"use client";

import { useState, useRef, useEffect } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { ShieldAlert, Info, Maximize } from "lucide-react";

interface GradientBandingPatternProps {
  testId?: string;
}

type GradientMode = "gray-horizontal" | "gray-vertical" | "rgb-horizontal" | "dark-shadow" | "dither-compare";

export function GradientBandingPattern({ testId = "gradient-banding-test" }: GradientBandingPatternProps) {
  const { toggleFullscreen } = useTestContext();
  const [mode, setMode] = useState<GradientMode>("gray-horizontal");
  const [quantizeSteps, setQuantizeSteps] = useState<number | null>(null); // null = smooth, 64 = 6-bit sim, 256 = 8-bit sim
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);

    const w = canvas.width;
    const h = canvas.height;

    // Draw gradient
    if (mode === "gray-horizontal") {
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "#000000");
      grad.addColorStop(1, "#FFFFFF");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    } else if (mode === "gray-vertical") {
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#FFFFFF");
      grad.addColorStop(1, "#000000");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    } else if (mode === "rgb-horizontal") {
      const sectionH = h / 3;
      // Red
      const rGrad = ctx.createLinearGradient(0, 0, w, 0);
      rGrad.addColorStop(0, "#000000");
      rGrad.addColorStop(1, "#FF0000");
      ctx.fillStyle = rGrad;
      ctx.fillRect(0, 0, w, sectionH);

      // Green
      const gGrad = ctx.createLinearGradient(0, 0, w, 0);
      gGrad.addColorStop(0, "#000000");
      gGrad.addColorStop(1, "#00FF00");
      ctx.fillStyle = gGrad;
      ctx.fillRect(0, sectionH, w, sectionH);

      // Blue
      const bGrad = ctx.createLinearGradient(0, 0, w, 0);
      bGrad.addColorStop(0, "#000000");
      bGrad.addColorStop(1, "#0000FF");
      ctx.fillStyle = bGrad;
      ctx.fillRect(0, sectionH * 2, w, sectionH);
    } else if (mode === "dark-shadow") {
      // Dark grayscale 0% to 25% (RGB 0 to 64)
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "rgb(0,0,0)");
      grad.addColorStop(1, "rgb(64,64,64)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    } else if (mode === "dither-compare") {
      // Split: top half smooth, bottom half stepped/quantized
      const halfH = h / 2;
      const smoothGrad = ctx.createLinearGradient(0, 0, w, 0);
      smoothGrad.addColorStop(0, "#000000");
      smoothGrad.addColorStop(1, "#FFFFFF");
      ctx.fillStyle = smoothGrad;
      ctx.fillRect(0, 0, w, halfH);

      // Bottom half simulated 64-step quantization
      const steps = 64;
      const stepW = w / steps;
      for (let i = 0; i < steps; i++) {
        const val = Math.round((i / (steps - 1)) * 255);
        ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
        ctx.fillRect(i * stepW, halfH, stepW + 1, halfH);
      }

      // Divider line
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2 * dpr;
      ctx.beginPath();
      ctx.moveTo(0, halfH);
      ctx.lineTo(w, halfH);
      ctx.stroke();

      // Labels
      ctx.fillStyle = "#ffffff";
      ctx.font = `${Math.max(12, 14 * dpr)}px monospace`;
      ctx.fillText("Upper: Browser Linear Gradient (Native Render)", 20 * dpr, 30 * dpr);
      ctx.fillStyle = "#f87171";
      ctx.fillText("Lower: Simulated 6-Bit Quantization Stepping (64 Bands)", 20 * dpr, halfH + 30 * dpr);
    }

    // Optional manual step quantization filter if enabled
    if (quantizeSteps !== null && mode !== "dither-compare") {
      const stepW = w / quantizeSteps;
      for (let i = 0; i < quantizeSteps; i++) {
        const val = Math.round((i / (quantizeSteps - 1)) * 255);
        ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
        ctx.fillRect(i * stepW, 0, stepW + 1, h);
      }
    }
  }, [mode, quantizeSteps]);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Canvas Viewport */}
      <div className="relative w-full aspect-video min-h-[440px] max-h-[75vh] bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Control Strip */}
      <div className="mt-6 w-full max-w-4xl bg-card border border-border/70 rounded-2xl p-5 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "gray-horizontal", label: "Horizontal Grayscale" },
              { id: "gray-vertical", label: "Vertical Grayscale" },
              { id: "rgb-horizontal", label: "RGB Primaries" },
              { id: "dark-shadow", label: "Dark Range (0%–25%)" },
              { id: "dither-compare", label: "Stepping Comparison" }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => {
                  setMode(btn.id as GradientMode);
                  setQuantizeSteps(null);
                }}
                className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all ${
                  mode === btn.id && quantizeSteps === null
                    ? "bg-foreground text-background shadow-xs"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <button
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-muted/80 text-foreground text-xs font-medium rounded-xl transition-colors"
          >
            <Maximize className="w-3.5 h-3.5" />
            Fullscreen
          </button>
        </div>

        {/* Technical Honesty Disclaimer Banner */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Hardware Boundary Notice</span>
          </div>
          <p>
            A web browser canvas <strong>cannot verify the physical bit depth (6-bit + FRC, true 8-bit, or true 10-bit) of your display panel</strong>. Browser rasterizers apply internal dithering and GPU compositing. If you observe distinct vertical bands, they may stem from OS display color depth settings, GPU limited RGB range, or monitor picture mode, rather than physical panel limitations.
          </p>
        </div>

        {/* Diagnostic Guidance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-muted-foreground">
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">1. Check Dark Gradients:</strong> Switch to the &apos;Dark Range (0%–25%)&apos; pattern. Shadow transitions should roll off smoothly without abrupt stair-stepping.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">2. RGB Dynamic Range:</strong> In your graphics control panel, confirm your monitor is set to <strong>Output Dynamic Range: Full (0–255)</strong>. Limited (16–235) causes severe banding.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">3. Monitor Picture Modes:</strong> Avoid aggressive dynamic contrast presets or &quot;FPS / Game&quot; modes that manipulate gamma curves and introduce artificial posterization.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">4. FRC & Dithering:</strong> Many affordable monitors use 6-bit + FRC (Frame Rate Control). Subtle microscopic noise is normal and prevents macro banding.
            </div>
          </div>
        </div>
      </div>

      <TestControlBar testId={testId} title="Gradient & Banding Test" />
    </div>
  );
}
