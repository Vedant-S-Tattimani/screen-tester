"use client";

import { useEffect, useRef, useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { getDevicePixelRatio } from "@/lib/browserCapabilities";
import { Play, Pause, Activity } from "lucide-react";
import { useTranslations } from "next-intl";

interface RefreshRatePatternProps {
  testId?: string;
}

export function RefreshRatePattern({ testId }: RefreshRatePatternProps) {
    const t = useTranslations("Tests.RefreshRatePattern");
  const { isRunning, isPaused, setIsPaused, registerNavigation } = useTestContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [estimatedFps, setEstimatedFps] = useState<number>(0);
  const [frameTimeMs, setFrameTimeMs] = useState<number>(0);

  useEffect(() => {
    registerNavigation({});
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
    };
    window.addEventListener("resize", resize);
    setTimeout(resize, 0);

    let animationId: number;
    const frameTimes: number[] = [];
    let lastUiUpdate = 0;
    let y = 0;
    let direction = 1;

    const draw = (time: number) => {
      if (!isPaused) {
        frameTimes.push(time);
        
        // Window of 1000ms
        const oneSecondAgo = time - 1000;
        while (frameTimes.length > 0 && frameTimes[0] < oneSecondAgo) {
          frameTimes.shift();
        }

        // Throttle React state updates to approximately once every 500ms
        if (time - lastUiUpdate >= 500) {
          if (frameTimes.length > 2 && (time - frameTimes[0]) >= 900) {
            const fps = frameTimes.length;
            setEstimatedFps(fps);
            if (fps > 0) {
              setFrameTimeMs(Number((1000 / fps).toFixed(2)));
            }
          }
          lastUiUpdate = time;
        }

        // Draw moving vertical scanline bar to enforce V-sync compositing
        ctx.fillStyle = "#0c0c0e";
        const w = canvas.width;
        const h = canvas.height;
        ctx.fillRect(0, 0, w, h);

        // Guide tick lines
        ctx.fillStyle = "#1e1e24";
        for (let gy = 0; gy < h; gy += 40 * dpr) {
          ctx.fillRect(0, Math.floor(gy), w, Math.max(1, Math.floor(1 * dpr)));
        }

        // Moving pulse bar
        ctx.fillStyle = "#2563eb";
        const barHeight = Math.floor(80 * dpr);
        y += 12 * dpr * direction;
        if (y + barHeight > h || y < 0) {
          direction *= -1;
        }
        ctx.fillRect(0, Math.floor(y), w, barHeight);
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
      <div className="absolute inset-0 bg-[#0c0c0e] text-white select-none overflow-hidden flex flex-col items-center justify-center">
        <canvas ref={canvasRef} className="block w-full h-full opacity-60" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4">
          <div className="flex items-baseline gap-3">
            <span className="text-7xl sm:text-8xl md:text-9xl font-black font-mono tracking-tighter tabular-nums text-white drop-shadow-2xl">
              {estimatedFps > 0 ? estimatedFps : "--"}
            </span>
            <span className="text-2xl sm:text-3xl font-mono text-white/50 font-normal uppercase">
              {t("hz")}</span>
          </div>

          <div className="flex items-center gap-3 mt-4 bg-black/70 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-xs font-mono tabular-nums text-white/80 shadow-lg">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Activity className="w-3.5 h-3.5" />
              <span>{t("frameInterval")}{frameTimeMs > 0 ? `${frameTimeMs} ms` : "--"}</span>
            </div>
            <span className="text-white/20">|</span>
            <span className="text-white/60">
              {estimatedFps >= 235 ? "240Hz High Refresh" :
               estimatedFps >= 140 ? "144Hz Gaming Display" :
               estimatedFps >= 115 ? "120Hz Smooth Display" :
               estimatedFps >= 58 ? "60Hz Standard Display" : "Probing..."}
            </span>
          </div>

          <p className="text-xs text-white/40 mt-3 max-w-xs text-center font-mono">
            {t("vSyncLockedHardware")}</p>
        </div>
      </div>

      <TestControlBar testId={testId} title={t("refreshRateHzEstimationTitle")}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 hover:bg-muted rounded-full transition-colors border border-border/50 text-foreground focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
            title={isPaused ? "Resume (Space)" : "Pause (Space)"}
            aria-label={isPaused ? "Resume animation" : "Pause animation"}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
          <span className="text-xs font-mono text-muted-foreground tabular-nums">
            {estimatedFps > 0 ? `Target: ~${estimatedFps} FPS` : "Calibrating..."}
          </span>
        </div>
      </TestControlBar>
    </>
  );
}