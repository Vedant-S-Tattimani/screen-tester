"use client";

import { useEffect, useRef, useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { getDevicePixelRatio } from "@/lib/browserCapabilities";
import { Play, Pause, Activity, Gauge } from "lucide-react";
import { useTranslations } from "next-intl";

interface ScreenTearingPatternProps {
  testId?: string;
}

const SPEED_PRESETS = [
  { label: "60Hz (10px)", value: 10, targetHz: "60Hz" },
  { label: "120Hz (18px)", value: 18, targetHz: "120Hz" },
  { label: "144Hz (25px)", value: 25, targetHz: "144Hz" },
  { label: "240Hz (40px)", value: 40, targetHz: "240Hz" },
];

export function ScreenTearingPattern({ testId }: ScreenTearingPatternProps) {
    const t = useTranslations("Tests.ScreenTearingPattern");
  const { isRunning, isPaused, setIsPaused, registerNavigation } = useTestContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [speed, setSpeed] = useState(18);
  const [fps, setFps] = useState(0);
  const [frameTimeMs, setFrameTimeMs] = useState(0);

  const speedRef = useRef(speed);
  const pausedRef = useRef(isPaused);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    registerNavigation({
      next: () => {
        const nextIdx = (SPEED_PRESETS.findIndex(s => s.value === speedRef.current) + 1) % SPEED_PRESETS.length;
        setSpeed(SPEED_PRESETS[nextIdx].value);
      },
      prev: () => {
        const prevIdx = (SPEED_PRESETS.findIndex(s => s.value === speedRef.current) - 1 + SPEED_PRESETS.length) % SPEED_PRESETS.length;
        setSpeed(SPEED_PRESETS[prevIdx].value);
      },
      reset: () => setSpeed(18),
    });
  }, [registerNavigation]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "1") setSpeed(SPEED_PRESETS[0].value);
      else if (e.key === "2") setSpeed(SPEED_PRESETS[1].value);
      else if (e.key === "3") setSpeed(SPEED_PRESETS[2].value);
      else if (e.key === "4") setSpeed(SPEED_PRESETS[3].value);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isRunning || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let dpr = getDevicePixelRatio();
    let animationId: number;
    let x = 0;
    let direction = 1;

    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const resize = () => {
      dpr = getDevicePixelRatio();
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    };

    window.addEventListener("resize", resize);
    resize();
    setTimeout(resize, 0);

    const draw = (now: number) => {
      animationId = requestAnimationFrame(draw);

      const delta = now - lastTime;
      lastTime = now;
      frameCount++;

      if (now - lastFpsUpdate >= 500) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsUpdate)));
        setFrameTimeMs(Number(delta.toFixed(1)));
        frameCount = 0;
        lastFpsUpdate = now;
      }

      if (pausedRef.current) return;

      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = "#0a0a0c";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#1e1e24";
      const gridSpacing = 60 * dpr;
      for (let y = 0; y < h; y += gridSpacing) {
        ctx.fillRect(0, Math.floor(y), w, Math.max(1, Math.floor(1 * dpr)));
      }

      ctx.fillStyle = "#2a2a35";
      const tickSpacing = 40 * dpr;
      for (let tx = 0; tx < w; tx += tickSpacing) {
        ctx.fillRect(Math.floor(tx), 0, Math.max(1, Math.floor(1 * dpr)), 16 * dpr);
        ctx.fillRect(Math.floor(tx), h - 16 * dpr, Math.max(1, Math.floor(1 * dpr)), 16 * dpr);
      }

      ctx.fillStyle = "#333344";
      ctx.fillRect(0, Math.floor(h / 2), w, Math.max(1, Math.floor(1 * dpr)));

      const barWidth = 48 * dpr;

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(Math.floor(x), 0, barWidth, h);

      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(Math.floor(x + barWidth / 2 - 1 * dpr), 0, Math.max(1, 2 * dpr), h);

      const secBarWidth = 24 * dpr;
      const secX = (w - (x + barWidth));
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(Math.floor(secX), Math.floor(h * 0.35), secBarWidth, Math.floor(h * 0.3));

      const currentSpeed = speedRef.current * dpr;
      x += currentSpeed * direction;

      if (x + barWidth >= w) {
        x = w - barWidth;
        direction = -1;
      } else if (x <= 0) {
        x = 0;
        direction = 1;
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
      <div className="absolute inset-0 bg-[#0a0a0c] overflow-hidden select-none">
        <canvas ref={canvasRef} className="block w-full h-full" />
        
        <div className="absolute top-4 left-4 flex items-center gap-3 bg-black/75 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-xl text-xs font-mono tabular-nums text-white/90 shadow-xl pointer-events-none">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Activity className="w-3.5 h-3.5" />
            <span className="font-semibold">{fps > 0 ? fps : "--"} {t("fpsRaf")}</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="text-white/70">
            <span>{frameTimeMs > 0 ? frameTimeMs : "--"} {t("ms")}</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1 text-blue-400">
            <Gauge className="w-3.5 h-3.5" />
            <span>{speed} {t("pxF")}</span>
          </div>
        </div>

        {/* Floating Technical Honesty Notice */}
        <div className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 text-[11px] text-white/80 font-mono text-right shadow-lg pointer-events-none max-w-sm hidden sm:block">
          {t("visualTearingInspectionRaf")}</div>
      </div>

      <TestControlBar testId={testId} title={t("screenTearingFramePacingTitle")}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 hover:bg-muted dark:hover:bg-white/10 rounded-full transition-colors border border-border/50 text-gray-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
            title={isPaused ? "Resume Sweep (Space)" : "Pause Sweep (Space)"}
            aria-label={isPaused ? "Resume Sweep animation" : "Pause Sweep animation"}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>

          <div 
            role="radiogroup" 
            aria-label={t("sweepSpeedPresetsTitle")} 
            className="flex items-center gap-1 bg-slate-100 dark:bg-white/10 p-1 rounded-lg border border-slate-200 dark:border-border/50"
          >
            {SPEED_PRESETS.map((s, idx) => (
              <button
                key={s.value}
                onClick={() => setSpeed(s.value)}
                role="radio"
                aria-checked={speed === s.value}
                aria-label={`${s.label} preset`}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-hidden cursor-pointer ${
                  speed === s.value 
                    ? "bg-amber-400 text-slate-950 shadow-md font-extrabold ring-2 ring-amber-300" 
                    : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/15 font-semibold"
                }`}
              >
                <span className="font-mono tabular-nums text-amber-600 dark:text-amber-300">{idx + 1}.</span> {s.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-amber-600 dark:text-amber-300 font-bold hidden sm:inline font-mono">
            {t("tearingAmpFrameDelivery")}</span>
        </div>
      </TestControlBar>
    </>
  );
}