"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { Play, Pause, Info, Zap } from "lucide-react";

export type FlickerMode = "uniform" | "inversion" | "strobe_wave";

interface FlickerPatternProps {
  testId?: string;
}

const SPEEDS = [
  { label: "1F (Fast)", value: 1 },
  { label: "2F", value: 2 },
  { label: "4F", value: 4 },
  { label: "8F (Slow)", value: 8 },
];

export function FlickerPattern({ testId = "screen-flicker-test" }: FlickerPatternProps) {
  const { isRunning, isPaused, setIsPaused, registerNavigation } = useTestContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeMode, setActiveMode] = useState<FlickerMode>("uniform");
  const [speed, setSpeed] = useState(2);
  const [showEduInfo, setShowEduInfo] = useState(false);

  const speedRef = useRef(speed);
  const pausedRef = useRef(isPaused);
  const modeRef = useRef(activeMode);

  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { pausedRef.current = isPaused; }, [isPaused]);
  useEffect(() => { modeRef.current = activeMode; }, [activeMode]);

  // Keyboard navigation
  const cycleSpeed = useCallback(() => {
    setSpeed((curr) => {
      const idx = SPEEDS.findIndex((s) => s.value === curr);
      return SPEEDS[(idx + 1) % SPEEDS.length].value;
    });
  }, []);

  const cycleMode = useCallback(() => {
    setActiveMode((curr) => {
      if (curr === "uniform") return "inversion";
      if (curr === "inversion") return "strobe_wave";
      return "uniform";
    });
  }, []);

  useEffect(() => {
    registerNavigation({
      next: cycleSpeed,
      prev: cycleMode,
      reset: () => {
        setSpeed(2);
        setActiveMode("uniform");
      },
    });
  }, [registerNavigation, cycleSpeed, cycleMode]);

  // Canvas loop
  useEffect(() => {
    if (!isRunning || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationId: number;
    let frameCount = 0;
    let toggleState = false;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width));
      canvas.height = Math.max(1, Math.floor(rect.height));
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      animationId = requestAnimationFrame(draw);

      if (pausedRef.current) return;

      const currentMode = modeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      if (currentMode === "uniform") {
        frameCount++;
        if (frameCount >= speedRef.current) {
          frameCount = 0;
          toggleState = !toggleState;
          ctx.fillStyle = toggleState ? "#FFFFFF" : "#000000";
          ctx.fillRect(0, 0, w, h);
        }
      } else if (currentMode === "inversion") {
        // Dot / Column Inversion Test Pattern (Vcom flicker detection)
        frameCount++;
        if (frameCount >= speedRef.current) {
          frameCount = 0;
          toggleState = !toggleState;

          const dotSize = 2;
          ctx.fillStyle = toggleState ? "#000000" : "#808080";
          ctx.fillRect(0, 0, w, h);

          ctx.fillStyle = toggleState ? "#FFFFFF" : "#000000";
          for (let y = 0; y < h; y += dotSize * 2) {
            for (let x = (y % (dotSize * 4) === 0 ? 0 : dotSize); x < w; x += dotSize * 2) {
              ctx.fillRect(x, y, dotSize, dotSize);
            }
          }
        }
      } else if (currentMode === "strobe_wave") {
        // Uniform solid field optimized for optical finger / pen wave observation
        ctx.fillStyle = "#666666";
        ctx.fillRect(0, 0, w, h);
      }
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [isRunning]);

  return (
    <>
      <div className="absolute inset-0 bg-black overflow-hidden select-none">
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* Optical Finger/Pen Wave Instruction Overlay for strobe_wave mode */}
        {activeMode === "strobe_wave" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
            <div className="max-w-md bg-neutral-950/85 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-white shadow-2xl space-y-3 pointer-events-auto">
              <div className="flex items-center justify-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider font-mono">
                <Zap className="w-4 h-4" />
                <span>Optical Stroboscopic Pen / Hand Test</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Wave a pen or spread your fingers rapidly back and forth in front of this solid gray screen:
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-left">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="font-semibold text-emerald-400 block mb-1">Smooth Blur:</span>
                  If motion looks continuous and smooth, the display uses <strong>DC dimming (Flicker-Free)</strong>.
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="font-semibold text-amber-400 block mb-1">Stroboscopic Steps:</span>
                  If you see distinct stepped silhouettes (phantom array), your monitor uses <strong>PWM backlight cycling</strong>.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Educational Info Modal */}
        {showEduInfo && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 max-w-xl w-[92%] bg-neutral-950/95 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white shadow-2xl z-40 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 font-semibold text-amber-400">
                <Info className="w-4 h-4" />
                <span>Visual Flicker vs. Hardware PWM Measurement</span>
              </div>
              <button 
                onClick={() => setShowEduInfo(false)}
                className="text-white/60 hover:text-white px-2 py-0.5 rounded text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>
            <div className="mt-3 space-y-2.5 text-white/80 leading-relaxed">
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
                <strong>Important Technical Disclosure:</strong> A web browser cannot measure or claim: <em>&quot;PWM frequency = X Hz&quot;</em>. Software frame rendering is locked to your display refresh rate (e.g. 60Hz or 144Hz) and cannot monitor internal LED driver switching (which typically operates between 240Hz and 25,000Hz+).
              </div>
              <p>
                <strong>What this test evaluates:</strong>
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Perceptual Flicker Sensitivity:</strong> Determines your personal eye comfort threshold for low-frequency brightness fluctuations.</li>
                <li><strong>Dot & Column Inversion (Vcom Bias):</strong> Checks for liquid crystal voltage drift that can cause subtle crawling artifacts in fine patterns.</li>
                <li><strong>Stroboscopic Hand Test:</strong> Uses the optical persistence of vision phenomenon to determine whether your backlight utilizes true continuous DC dimming or pulse-width modulation.</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <TestControlBar testId={testId} title="Visual Flicker & Inversion Sensitivity">
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Selector */}
          <div className="flex items-center bg-muted/60 p-0.5 rounded-lg border border-border/60 text-xs">
            <button
              onClick={() => setActiveMode("uniform")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMode === "uniform" ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Uniform Alternation
            </button>
            <button
              onClick={() => setActiveMode("inversion")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMode === "inversion" ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dot Inversion (Vcom)
            </button>
            <button
              onClick={() => setActiveMode("strobe_wave")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeMode === "strobe_wave" ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Hand / Pen Test
            </button>
          </div>

          {/* Speed & Pause for Animated Modes */}
          {activeMode !== "strobe_wave" && (
            <>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-1 hover:bg-muted rounded-full transition-colors border border-border/50 text-foreground"
                title={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>

              <div className="flex items-center gap-1 bg-muted/40 rounded-lg p-0.5 border border-border/40 text-xs">
                {SPEEDS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSpeed(s.value)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                      speed === s.value ? "bg-foreground text-background font-semibold shadow-2xs" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Educational Info Button */}
          <button
            onClick={() => setShowEduInfo(!showEduInfo)}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-colors ${
              showEduInfo ? "bg-amber-500/20 text-amber-500 border-amber-500/40" : "hover:bg-muted text-muted-foreground border-border/50"
            }`}
            title="Read about visual flicker and hardware PWM limitations"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Limitations</span>
          </button>
        </div>
      </TestControlBar>
    </>
  );
}
