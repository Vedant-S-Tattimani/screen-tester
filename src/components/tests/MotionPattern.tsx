"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { getDevicePixelRatio } from "@/lib/browserCapabilities";
import { Info } from "lucide-react";

export type MotionMode = "ghosting" | "overdrive" | "blacksmear";

interface MotionPatternProps {
  testId?: string;
}

const SPEED_PRESETS = [120, 240, 480, 960, 1440, 1920];

export function MotionPattern({ testId = "ghosting-test" }: MotionPatternProps) {
  const { isRunning, isPaused, registerNavigation } = useTestContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [activeMode, setActiveMode] = useState<MotionMode>("ghosting");
  const [speed, setSpeed] = useState(480);
  const [contrast, setContrast] = useState<"high" | "medium" | "low">("high");
  const [showEduInfo, setShowEduInfo] = useState(false);

  const speedRef = useRef(speed);
  const contrastRef = useRef(contrast);
  const modeRef = useRef(activeMode);

  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { contrastRef.current = contrast; }, [contrast]);
  useEffect(() => { modeRef.current = activeMode; }, [activeMode]);

  const cycleSpeed = useCallback(() => {
    setSpeed((curr) => {
      const idx = SPEED_PRESETS.indexOf(curr);
      return SPEED_PRESETS[(idx + 1) % SPEED_PRESETS.length];
    });
  }, []);

  const cycleMode = useCallback(() => {
    setActiveMode((curr) => {
      if (curr === "ghosting") return "overdrive";
      if (curr === "overdrive") return "blacksmear";
      return "ghosting";
    });
  }, []);

  useEffect(() => {
    registerNavigation({
      next: cycleSpeed,
      prev: cycleMode,
      reset: () => {
        setSpeed(480);
        setActiveMode("ghosting");
        setContrast("high");
      },
    });
  }, [registerNavigation, cycleSpeed, cycleMode]);

  useEffect(() => {
    if (!isRunning || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let cachedW = 0;
    let cachedH = 0;

    const resize = () => {
      const dpr = getDevicePixelRatio();
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      cachedW = rect.width || (canvas.width / dpr);
      cachedH = rect.height || (canvas.height / dpr);
      canvas.width = Math.max(1, Math.floor(cachedW * dpr));
      canvas.height = Math.max(1, Math.floor(cachedH * dpr));
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resize);
    resize();
    setTimeout(resize, 0);

    let animationId: number;
    let lastTime = performance.now();
    let x = 0;
    const boxSize = 72;

    const draw = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const currentMode = modeRef.current;
      const currentSpeed = speedRef.current;
      const currentContrast = contrastRef.current;

      const w = cachedW || (canvas.width / getDevicePixelRatio());
      const h = cachedH || (canvas.height / getDevicePixelRatio());

      if (!isPaused) {
        x += currentSpeed * dt;
        if (x > w + boxSize * 2) {
          x = -boxSize * 2;
        }
      }

      // --- RENDERING ACCORDING TO MODE ---
      if (currentMode === "ghosting") {
        // Standard Ghosting / Motion Blur Test
        const bg = currentContrast === "high" ? "#000000" : currentContrast === "medium" ? "#333333" : "#777777";
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);

        const fgColor = currentContrast === "high" ? "#FFFFFF" : currentContrast === "medium" ? "#B0B0B0" : "#D0D0D0";
        const gap = h / 4;

        for (let i = 1; i <= 3; i++) {
          const y = i * gap - boxSize / 2;
          ctx.fillStyle = fgColor;
          ctx.fillRect(Math.round(x), Math.round(y), boxSize, boxSize);

          // Contrast interior window to evaluate inner edge trailing
          ctx.fillStyle = bg;
          ctx.fillRect(Math.round(x + boxSize * 0.25), Math.round(y + boxSize * 0.25), boxSize * 0.5, boxSize * 0.5);
        }
      } else if (currentMode === "overdrive") {
        // Overdrive & Pixel Overshoot (Corona) Diagnostic
        // 50% neutral gray background is ideal for spotting white overshoot halos vs dark ghosting
        ctx.fillStyle = "#808080";
        ctx.fillRect(0, 0, w, h);

        // Thin reference tracking vertical grid lines
        ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
        ctx.lineWidth = 1;
        for (let gx = 0; gx < w; gx += 40) {
          ctx.beginPath();
          ctx.moveTo(gx, 0);
          ctx.lineTo(gx, h);
          ctx.stroke();
        }

        const gap = h / 4;
        
        // Track 1: Dark box (RGB 30) -> Tests Gray-to-Black & Overshoot
        ctx.fillStyle = "#1e1e1e";
        ctx.fillRect(Math.round(x), Math.round(gap - boxSize / 2), boxSize, boxSize);

        // Track 2: Bright box (RGB 230) -> Tests Gray-to-White & Overshoot
        ctx.fillStyle = "#e6e6e6";
        ctx.fillRect(Math.round(x), Math.round(2 * gap - boxSize / 2), boxSize, boxSize);

        // Track 3: High Contrast Dual-Stripe Box
        ctx.fillStyle = "#1e1e1e";
        ctx.fillRect(Math.round(x), Math.round(3 * gap - boxSize / 2), boxSize / 2, boxSize);
        ctx.fillStyle = "#e6e6e6";
        ctx.fillRect(Math.round(x + boxSize / 2), Math.round(3 * gap - boxSize / 2), boxSize / 2, boxSize);

      } else if (currentMode === "blacksmear") {
        // Black Smearing (VA Panel Slow Dark Rise-Time) Diagnostic
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, w, h);

        const gap = h / 5;

        // Near-black levels moving across pure black background
        const levels = [
          { val: 15, label: "6% Dark Gray" },
          { val: 28, label: "11% Dark Gray" },
          { val: 45, label: "18% Dark Gray" },
          { val: 255, label: "100% White Reference" }
        ];

        levels.forEach((lvl, idx) => {
          const y = (idx + 1) * gap - boxSize / 2;
          ctx.fillStyle = `rgb(${lvl.val}, ${lvl.val}, ${lvl.val})`;
          ctx.fillRect(Math.round(x), Math.round(y), boxSize * 1.5, boxSize * 0.7);

          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          ctx.font = "11px monospace";
          ctx.fillText(lvl.label, 20, Math.round(y + boxSize * 0.45));
        });
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [isRunning, isPaused]);

  return (
    <>
      <div className="absolute inset-0 cursor-none overflow-hidden select-none">
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* Educational Disclaimer Dialog */}
        {showEduInfo && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 max-w-xl w-[92%] bg-neutral-950/95 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white shadow-2xl z-40 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 font-semibold text-amber-400">
                <Info className="w-4 h-4" />
                <span>Motion Diagnostics & Response Time Boundaries</span>
              </div>
              <button 
                onClick={() => setShowEduInfo(false)}
                className="text-white/60 hover:text-white px-2 py-0.5 rounded text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>
            <div className="mt-3 space-y-2.5 text-white/80 leading-relaxed">
              <p>
                <strong>What to look for:</strong>
              </p>
              <ul className="list-disc pl-4 space-y-1.5">
                <li>
                  <strong>Ghosting (Trailing blur):</strong> A dark or smeared trail behind moving objects indicates slower liquid crystal transitions (common on VA and older IPS panels).
                </li>
                <li>
                  <strong>Inverse Ghosting (Corona / Overshoot):</strong> A bright white or glowing outline ahead or behind the moving block. This means your monitor&apos;s physical <em>Overdrive / Response Time</em> setting is pushed too high. Lower overdrive one notch (e.g. from &quot;Fastest&quot; to &quot;Fast&quot;).
                </li>
                <li>
                  <strong>Black Smearing:</strong> On VA panels and some OLEDs, transitioning from pure 0% black to 5% dark gray takes several times longer than light-to-light transitions, producing purple or pitch-black smears in dark scenes.
                </li>
              </ul>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70">
                <strong>Measurement Boundary:</strong> This is a visual diagnostic aid. Web browsers cannot provide laboratory-grade millisecond response time (GtG / MPRT) measurements, which require a high-speed photodiode oscilloscope and a pursuit camera rig.
              </div>
            </div>
          </div>
        )}
      </div>

      <TestControlBar testId={testId} title="Motion & Response Time">
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Selector */}
          <div className="flex items-center bg-muted/60 p-0.5 rounded-lg border border-border/60 text-xs">
            <button
              onClick={() => setActiveMode("ghosting")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMode === "ghosting" ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Ghosting
            </button>
            <button
              onClick={() => setActiveMode("overdrive")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMode === "overdrive" ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Overdrive (Overshoot)
            </button>
            <button
              onClick={() => setActiveMode("blacksmear")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMode === "blacksmear" ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Black Smearing
            </button>
          </div>

          {/* Speed Presets */}
          <div className="flex items-center gap-1 bg-muted/40 rounded-lg p-0.5 border border-border/40 text-xs">
            <span className="text-[10px] text-muted-foreground uppercase font-mono px-1">Speed:</span>
            {SPEED_PRESETS.map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  speed === s ? "bg-foreground text-background font-semibold shadow-2xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Contrast Selector for Ghosting Mode */}
          {activeMode === "ghosting" && (
            <div className="flex items-center gap-1 bg-muted/40 rounded-lg p-0.5 border border-border/40 text-xs">
              {(["high", "medium", "low"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setContrast(c)}
                  className={`px-2 py-0.5 rounded text-[11px] capitalize transition-colors ${
                    contrast === c ? "bg-foreground text-background font-semibold shadow-2xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {/* Educational Info Button */}
          <button
            onClick={() => setShowEduInfo(!showEduInfo)}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-colors ${
              showEduInfo ? "bg-amber-500/20 text-amber-500 border-amber-500/40" : "hover:bg-muted text-muted-foreground border-border/50"
            }`}
            title="Read about ghosting, overdrive overshoot, and black smearing"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Guide</span>
          </button>
        </div>
      </TestControlBar>
    </>
  );
}
