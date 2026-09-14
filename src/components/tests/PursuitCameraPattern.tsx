"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Play, Pause, Camera, Sliders, ArrowRightLeft } from "lucide-react";
import { TestControlBar } from "../test-runner/TestControlBar";
import { TestInlineControls } from "../test-runner/TestInlineControls";
import { cn } from "@/lib/utils";

interface PursuitCameraPatternProps {
  testId?: string;
}

export function PursuitCameraPattern({ testId = "pursuit-camera-test" }: PursuitCameraPatternProps) {
  const t = useTranslations("Tests.PursuitCameraPattern");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isRunning, setIsRunning] = useState(true);
  const [speedPxSec, setSpeedPxSec] = useState(960); // 960 px/sec is standard Blur Busters pursuit track speed
  const [direction, setDirection] = useState<1 | -1>(1);
  const [fps, setFps] = useState(60);

  const posRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = isRunning;

    const renderLoop = (time: number) => {
      if (!running) return;

      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaSec = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (deltaSec > 0 && deltaSec < 0.1) {
        setFps(Math.round(1 / deltaSec));
      }

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      const w = canvas.width;
      const h = canvas.height;

      // Update position
      posRef.current += speedPxSec * dpr * deltaSec * direction;
      const wrapWidth = w + 400 * dpr;
      if (posRef.current > wrapWidth) posRef.current -= wrapWidth;
      if (posRef.current < -400 * dpr) posRef.current += wrapWidth;

      // Background: clean neutral dark grey
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, w, h);

      // Draw static pursuit guide lines (helps user align camera pan horizontally)
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1 * dpr;
      for (let y = 100 * dpr; y < h; y += 120 * dpr) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Moving target tracks (3 vertical zones)
      const trackHeights = [h * 0.25, h * 0.5, h * 0.75];

      trackHeights.forEach((trackY, idx) => {
        const x = ((posRef.current + idx * 350 * dpr) % wrapWidth) - 200 * dpr;

        // 1. Moving White Box Target
        const boxW = 80 * dpr;
        const boxH = 50 * dpr;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x, trackY - boxH / 2, boxW, boxH);

        // Center line inside target
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(x + boxW / 2 - 2 * dpr, trackY - boxH / 2, 4 * dpr, boxH);

        // 2. Pursuit Camera Sync Temporal Marks (Ladder Ticks)
        // If smartphone tracking camera tracks smoothly, these vertical ticks will align straight without skew
        const ladderH = 30 * dpr;
        const ladderY = trackY + boxH / 2 + 10 * dpr;
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2 * dpr;

        // Ladder horizontal baseline
        ctx.beginPath();
        ctx.moveTo(x - 40 * dpr, ladderY + ladderH / 2);
        ctx.lineTo(x + boxW + 40 * dpr, ladderY + ladderH / 2);
        ctx.stroke();

        // Ladder vertical rungs (16px spacing)
        for (let rx = x - 40 * dpr; rx <= x + boxW + 40 * dpr; rx += 16 * dpr) {
          ctx.beginPath();
          ctx.moveTo(rx, ladderY);
          ctx.lineTo(rx, ladderY + ladderH);
          ctx.stroke();
        }

        // Speed label on track
        ctx.fillStyle = "#94a3b8";
        ctx.font = `${Math.floor(11 * dpr)}px monospace`;
        ctx.textAlign = "left";
        ctx.fillText(`${speedPxSec} px/sec · Track ${idx + 1}`, x, trackY - boxH / 2 - 8 * dpr);
      });

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      running = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isRunning, speedPxSec, direction]);

  return (
    <div className="relative w-full h-full min-h-[550px] flex flex-col items-center justify-center bg-slate-900 select-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Synchronized top guidance bar */}
      <TestControlBar testId={testId} title={t("title")} />

      {/* Top Left Info Box */}
      <div className="absolute top-16 left-4 z-20 bg-slate-900/90 text-white backdrop-blur-md px-4 py-3 rounded-xl border border-slate-700/60 shadow-xl max-w-sm pointer-events-none">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-1">
          <Camera className="w-3.5 h-3.5" />
          <span>{t("cameraGuide")}</span>
        </div>
        <div className="text-xs text-slate-300 leading-relaxed">
          {t("cameraInstructions")}
        </div>
        <div className="mt-2 text-[11px] font-mono text-emerald-400 font-semibold">
          {fps} FPS · {speedPxSec} px/sec
        </div>
      </div>

      {/* Inline Controls */}
      <TestInlineControls>
        <div className="flex flex-wrap items-center gap-3 bg-slate-900/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700/80 shadow-2xl text-xs text-white">
          <button
            onClick={() => setIsRunning((r) => !r)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? t("pause") : t("resume")}</span>
          </button>

          <button
            onClick={() => setDirection((d) => (d === 1 ? -1 : 1))}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-700 hover:bg-slate-800 rounded-lg font-medium transition-colors"
            title={t("invertDirection")}
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-slate-300" />
            <span>{direction === 1 ? t("leftToRight") : t("rightToLeft")}</span>
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

          {/* Speed presets */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400 text-[11px] mr-1">{t("speed")}:</span>
            {[480, 960, 1440, 1920].map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeedPxSec(spd)}
                className={cn(
                  "px-2.5 py-1 rounded text-[11px] font-mono",
                  speedPxSec === spd
                    ? "bg-sky-500 text-slate-950 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                )}
              >
                {spd}px
              </button>
            ))}
          </div>
        </div>
      </TestInlineControls>
    </div>
  );
}
