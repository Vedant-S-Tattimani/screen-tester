"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Volume2, VolumeX, Play, Pause, RotateCcw, Activity } from "lucide-react";
import { TestControlBar } from "../test-runner/TestControlBar";
import { TestInlineControls } from "../test-runner/TestInlineControls";
import { cn } from "@/lib/utils";

interface AudioSyncPatternProps {
  testId?: string;
}

export function AudioSyncPattern({ testId = "audio-sync-test" }: AudioSyncPatternProps) {
  const t = useTranslations("Tests.AudioSyncPattern");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [manualOffsetMs, setManualOffsetMs] = useState(0); // user calibration offset
  const [bpm, setBpm] = useState(60); // 1 sweep per second

  const lastBeepTimeRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Play a short 1kHz sync beep
  const playSyncBeep = useCallback(() => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1000, ctx.currentTime);

      // Clean, click-free 40ms impulse beep
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.6, ctx.currentTime + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.045);
    } catch {
      // Audio autoplay policy fallback
    }
  }, [isMuted]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = isPlaying;
    const periodMs = (60 / bpm) * 1000;
    
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

      // Resize is handled by ResizeObserver

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(cx, cy) * 0.75;

      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, w, h);

      // Current cycle progress (0 to 1)
      const adjustedTime = time + manualOffsetMs;
      const cycleTime = adjustedTime % periodMs;
      const progress = cycleTime / periodMs;
      const currentAngle = progress * 2 * Math.PI - Math.PI / 2; // start at 12 o'clock

      // Check if we hit the top 0ms mark (within 25ms threshold)
      const isAtZero = cycleTime < 30;
      if (isAtZero && time - lastBeepTimeRef.current > periodMs * 0.7) {
        lastBeepTimeRef.current = time;
        playSyncBeep();
      }

      // Outer Dial Track
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.lineWidth = 12 * dpr;
      ctx.strokeStyle = "#1e293b";
      ctx.stroke();

      // Millisecond graduation ticks (-250ms to +250ms around 12 o'clock)
      const tickStepMs = 25;
      const maxTicks = 10; // +/- 250ms
      for (let i = -maxTicks; i <= maxTicks; i++) {
        const tickMs = i * tickStepMs;
        const tickAngle = (tickMs / periodMs) * 2 * Math.PI - Math.PI / 2;
        const isMajor = i % 2 === 0;
        const tickLen = (isMajor ? 20 : 10) * dpr;

        const x1 = cx + (radius - tickLen) * Math.cos(tickAngle);
        const y1 = cy + (radius - tickLen) * Math.sin(tickAngle);
        const x2 = cx + (radius + tickLen * 0.5) * Math.cos(tickAngle);
        const y2 = cy + (radius + tickLen * 0.5) * Math.sin(tickAngle);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = (isMajor ? 3 : 1.5) * dpr;
        ctx.strokeStyle = i === 0 ? "#10b981" : isMajor ? "#64748b" : "#334155";
        ctx.stroke();

        // Labels
        if (isMajor && Math.abs(i) <= 8) {
          const tx = cx + (radius - 35 * dpr) * Math.cos(tickAngle);
          const ty = cy + (radius - 35 * dpr) * Math.sin(tickAngle);
          ctx.fillStyle = i === 0 ? "#10b981" : "#94a3b8";
          ctx.font = `${Math.floor(11 * dpr)}px monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const label = i === 0 ? "0ms" : `${tickMs > 0 ? "+" : ""}${tickMs}`;
          ctx.fillText(label, tx, ty);
        }
      }

      // Flash circle at center when hitting 0ms
      const flashAlpha = Math.max(0, 1 - (cycleTime / 120));
      if (flashAlpha > 0) {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.3, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha * 0.9})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, radius + 20 * dpr, 0, 2 * Math.PI);
        ctx.lineWidth = 8 * dpr;
        ctx.strokeStyle = `rgba(16, 185, 129, ${flashAlpha})`;
        ctx.stroke();
      }

      // Rotating Needle
      const needleX = cx + (radius - 8 * dpr) * Math.cos(currentAngle);
      const needleY = cy + (radius - 8 * dpr) * Math.sin(currentAngle);

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(needleX, needleY);
      ctx.lineWidth = 4 * dpr;
      ctx.strokeStyle = "#38bdf8";
      ctx.stroke();

      // Center Hub
      ctx.beginPath();
      ctx.arc(cx, cy, 14 * dpr, 0, 2 * Math.PI);
      ctx.fillStyle = "#38bdf8";
      ctx.fill();

      // Center Millisecond Readout
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${Math.floor(22 * dpr)}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const currentMsFromSync = ((cycleTime + periodMs / 2) % periodMs) - (periodMs / 2);
      ctx.fillText(`${Math.round(currentMsFromSync)} ms`, cx, cy + 60 * dpr);

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      ro.disconnect();
      running = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlaying, bpm, manualOffsetMs, playSyncBeep]);

  const toggleSound = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full min-h-[550px] flex flex-col items-center justify-center bg-[#090d16] select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Synchronized top guidance bar */}
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

          <button
            onClick={toggleSound}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium border transition-colors",
              isMuted
                ? "border-red-500/50 text-red-300 bg-red-950/30"
                : "border-emerald-500/50 text-emerald-300 bg-emerald-950/30"
            )}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isMuted ? t("unmute") : t("soundOn")}</span>
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

          {/* Manual Delay Calibration Slider */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono text-[11px] whitespace-nowrap">{t("offset")}:</span>
            <input
              type="range"
              min="-200"
              max="200"
              step="5"
              value={manualOffsetMs}
              onChange={(e) => setManualOffsetMs(parseInt(e.target.value, 10))}
              className="w-24 sm:w-32 accent-emerald-500 cursor-pointer"
            />
            <span className="font-mono text-emerald-400 font-bold min-w-[55px] text-right">
              {manualOffsetMs > 0 ? `+${manualOffsetMs}` : manualOffsetMs}ms
            </span>
            {manualOffsetMs !== 0 && (
              <button
                onClick={() => setManualOffsetMs(0)}
                className="p-1 text-slate-400 hover:text-white"
                title={t("resetOffset")}
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

          {/* Speed / BPM Toggle */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400 text-[11px] mr-1">{t("speed")}:</span>
            {[30, 60, 120].map((rate) => (
              <button
                key={rate}
                onClick={() => setBpm(rate)}
                className={cn(
                  "px-2 py-1 rounded text-[11px] font-mono",
                  bpm === rate
                    ? "bg-slate-700 text-white font-bold"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                {rate} {t("bpm")}
              </button>
            ))}
          </div>
        </div>
      </TestInlineControls>
    </div>
  );
}
