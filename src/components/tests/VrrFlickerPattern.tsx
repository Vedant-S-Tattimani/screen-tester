"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Activity, Play, Pause, AlertTriangle, Sliders } from "lucide-react";
import { TestControlBar } from "../test-runner/TestControlBar";
import { TestInlineControls } from "../test-runner/TestInlineControls";
import { cn } from "@/lib/utils";

interface VrrFlickerPatternProps {
  testId?: string;
}

type LuminanceLevel = "nearBlack" | "darkGrey" | "midGrey";

export function VrrFlickerPattern({ testId = "vrr-flicker-test" }: VrrFlickerPatternProps) {
  const t = useTranslations("Tests.VrrFlickerPattern");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isRunning, setIsRunning] = useState(true);
  const [luminance, setLuminance] = useState<LuminanceLevel>("nearBlack");
  const [oscillationSpeedHz, setOscillationSpeedHz] = useState(1); // 1Hz fluctuation cycle
  const [currentFps, setCurrentFps] = useState(60);

  const animFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const isHighFpsPhaseRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = isRunning;
    
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      const targetW = Math.max(1, Math.floor(rect.width * dpr));
      const targetH = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
    };
    
    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement || canvas);
    
    let lastPhaseSwitch = performance.now();
    const phaseHalfPeriodMs = (1000 / oscillationSpeedHz) / 2;

    const renderLoop = (now: number) => {
      if (!running) return;

      if (!lastTimeRef.current) lastTimeRef.current = now;
      const deltaSec = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (deltaSec > 0 && deltaSec < 0.2) {
        setCurrentFps(Math.round(1 / deltaSec));
      }

      // Check phase flip for framerate oscillation
      if (now - lastPhaseSwitch >= phaseHalfPeriodMs) {
        isHighFpsPhaseRef.current = !isHighFpsPhaseRef.current;
        lastPhaseSwitch = now;
      }

      // Burn CPU cycles during low FPS phase to emulate intensive frame drops (45-55 FPS dip)
      if (!isHighFpsPhaseRef.current) {
        const startBurn = performance.now();
        while (performance.now() - startBurn < 12) {
          // artificial delay
        }
      }

      const w = canvas.width;
      const h = canvas.height;

      // Base background tone where gamma fluctuations on OLED/VA are most visible
      const bgColors = {
        nearBlack: "rgb(15, 17, 23)", // ~6% luminance (prime OLED flicker zone)
        darkGrey: "rgb(30, 35, 45)",  // ~12% luminance
        midGrey: "rgb(55, 62, 77)"    // ~22% luminance
      };
      ctx.fillStyle = bgColors[luminance];
      ctx.fillRect(0, 0, w, h);

      // Central inspection patch with subtle stepped tonal boxes
      const boxSize = Math.min(w, h) * 0.45;
      const cx = w / 2;
      const cy = h / 2;

      // Central reference card
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(cx - boxSize / 2, cy - boxSize / 2, boxSize, boxSize);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1 * dpr;
      ctx.strokeRect(cx - boxSize / 2, cy - boxSize / 2, boxSize, boxSize);

      // Status HUD
      ctx.fillStyle = isHighFpsPhaseRef.current ? "#10b981" : "#f59e0b";
      ctx.font = `bold ${Math.floor(18 * dpr)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText(
        isHighFpsPhaseRef.current ? t("highWorkload") : t("lowWorkload"),
        cx,
        cy - 20 * dpr
      );

      ctx.fillStyle = "#94a3b8";
      ctx.font = `${Math.floor(13 * dpr)}px monospace`;
      ctx.fillText(`${currentFps} FPS`, cx, cy + 15 * dpr);

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      ro.disconnect();
      running = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isRunning, luminance, oscillationSpeedHz, t]);

  return (
    <div className="relative w-full h-full min-h-[550px] flex flex-col items-center justify-center bg-slate-950 select-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Top Guidance Bar */}
      <TestControlBar testId={testId} title={t("title")} />

      {/* Inline Controls */}
      <TestInlineControls>
        <div className="flex flex-wrap items-center gap-3 bg-slate-900/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700/80 shadow-2xl text-xs text-white">
          <button
            onClick={() => setIsRunning((r: boolean) => !r)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors cursor-pointer"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? t("pause") : t("play")}</span>
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

          {/* Background Luminance Zone */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400 text-[11px] mr-1">{t("patchLuminance")}:</span>
            {(["nearBlack", "darkGrey", "midGrey"] as LuminanceLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLuminance(lvl)}
                className={cn(
                  "px-2.5 py-1 rounded text-[11px]",
                  luminance === lvl
                    ? "bg-emerald-500 text-slate-950 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                )}
              >
                {t(`levels.${lvl}`)}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

          {/* Oscillation Speed */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400 text-[11px] mr-1">{t("cycleRate")}:</span>
            {[0.5, 1, 2].map((hz) => (
              <button
                key={hz}
                onClick={() => setOscillationSpeedHz(hz)}
                className={cn(
                  "px-2 py-1 rounded text-[11px] font-mono",
                  oscillationSpeedHz === hz
                    ? "bg-slate-700 text-white font-bold"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                {hz}Hz
              </button>
            ))}
          </div>
        </div>
      </TestInlineControls>
    </div>
  );
}
