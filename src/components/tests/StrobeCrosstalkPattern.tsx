"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Play, Pause, Zap, Eye, Sliders } from "lucide-react";
import { TestControlBar } from "../test-runner/TestControlBar";
import { TestInlineControls } from "../test-runner/TestInlineControls";
import { cn } from "@/lib/utils";

interface StrobeCrosstalkPatternProps {
  testId?: string;
}

export function StrobeCrosstalkPattern({ testId = "strobe-crosstalk-test" }: StrobeCrosstalkPatternProps) {
  const t = useTranslations("Tests.StrobeCrosstalkPattern");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [speedPxSec, setSpeedPxSec] = useState(960);
  const [barWidth, setBarWidth] = useState(16);
  const [fps, setFps] = useState(60);

  const posRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = isPlaying;
    
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

    const renderLoop = (time: number) => {
      if (!running) return;

      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaSec = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (deltaSec > 0 && deltaSec < 0.1) {
        setFps(Math.round(1 / deltaSec));
      }

      const dpr = window.devicePixelRatio || 1;

      const w = canvas.width;
      const h = canvas.height;

      // Update moving bar position
      posRef.current = (posRef.current + speedPxSec * dpr * deltaSec) % w;

      // Clear background
      ctx.fillStyle = "#0a0e17";
      ctx.fillRect(0, 0, w, h);

      // Define 3 Vertical Zones: Top (Early), Middle (Sweet Spot), Bottom (Late)
      const zoneH = h / 3;
      const zones = [
        { label: t("topZone"), sub: t("topZoneSub"), y: 0 },
        { label: t("middleZone"), sub: t("middleZoneSub"), y: zoneH },
        { label: t("bottomZone"), sub: t("bottomZoneSub"), y: zoneH * 2 }
      ];

      // Draw Zone Dividers
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 2 * dpr;
      ctx.beginPath();
      ctx.moveTo(0, zoneH);
      ctx.lineTo(w, zoneH);
      ctx.moveTo(0, zoneH * 2);
      ctx.lineTo(w, zoneH * 2);
      ctx.stroke();

      // Draw Moving Test Bars across each zone with high contrast
      const bW = barWidth * dpr;
      const barSpacing = Math.max(300 * dpr, w / 4);

      zones.forEach((z) => {
        // Zone Background Tint
        ctx.fillStyle = z.y === zoneH ? "rgba(16, 185, 129, 0.03)" : "transparent";
        ctx.fillRect(0, z.y, w, zoneH);

        // Zone Label
        ctx.fillStyle = z.y === zoneH ? "#10b981" : "#64748b";
        ctx.font = `bold ${Math.floor(13 * dpr)}px monospace`;
        ctx.textAlign = "left";
        ctx.fillText(z.label.toUpperCase(), 24 * dpr, z.y + 32 * dpr);

        ctx.fillStyle = "#475569";
        ctx.font = `${Math.floor(11 * dpr)}px sans-serif`;
        ctx.fillText(z.sub, 24 * dpr, z.y + 50 * dpr);

        // Multiple evenly-spaced bars traversing the zone
        for (let bx = posRef.current % barSpacing; bx < w; bx += barSpacing) {
          // Sharp main bar
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(bx - bW / 2, z.y + 60 * dpr, bW, zoneH - 75 * dpr);

          // Contrast borders (exposes trailing and leading double-images)
          ctx.fillStyle = "#ef4444";
          ctx.fillRect(bx - bW / 2 - 2 * dpr, z.y + 60 * dpr, 2 * dpr, zoneH - 75 * dpr);
          ctx.fillStyle = "#38bdf8";
          ctx.fillRect(bx + bW / 2, z.y + 60 * dpr, 2 * dpr, zoneH - 75 * dpr);
        }
      });

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      ro.disconnect();
      running = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlaying, speedPxSec, barWidth, t]);

  return (
    <div className="relative w-full h-full min-h-[550px] flex flex-col items-center justify-center bg-[#0a0e17] select-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Top Bar Guidance */}
      <TestControlBar testId={testId} title={t("title")} />

      {/* Inline Controls */}
      <TestInlineControls>
        <div className="flex flex-wrap items-center gap-3 bg-slate-900/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700/80 shadow-2xl text-xs text-white">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? t("pause") : t("play")}</span>
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

          {/* Speed Presets */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400 text-[11px] mr-1">{t("speed")}:</span>
            {[480, 960, 1440, 2400].map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeedPxSec(spd)}
                className={cn(
                  "px-2.5 py-1 rounded text-[11px] font-mono",
                  speedPxSec === spd
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                )}
              >
                {spd}px
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

          {/* Bar Width */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400 text-[11px] mr-1">{t("width")}:</span>
            {[8, 16, 32].map((w) => (
              <button
                key={w}
                onClick={() => setBarWidth(w)}
                className={cn(
                  "px-2 py-1 rounded text-[11px] font-mono",
                  barWidth === w
                    ? "bg-slate-700 text-white font-bold"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                {w}px
              </button>
            ))}
          </div>
        </div>
      </TestInlineControls>
    </div>
  );
}
