"use client";

import { useEffect, useRef, useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { TestInlineControls } from "../test-runner/TestInlineControls";
import { Gauge, Info, ShieldAlert, Play, Pause } from "lucide-react";
import { useTranslations } from "next-intl";

interface VrrPatternProps {
  testId?: string;
}

type WorkloadLevel = "low" | "medium" | "high" | "sweep";

export function VrrPattern({ testId = "vrr-test" }: VrrPatternProps) {
    const t = useTranslations("Tests.VrrPattern");
  useTestContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isRunning, setIsRunning] = useState(true);
  const [workload, setWorkload] = useState<WorkloadLevel>("medium");
  const [fps, setFps] = useState(0);
  const [avgFps, setAvgFps] = useState(0);
  const [frameTimeJitter, setFrameTimeJitter] = useState(0);
  const [onePercentLow, setOnePercentLow] = useState(0);

  const animFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const frameTimesRef = useRef<number[]>([]);
  const posXRef = useRef<number>(0);
  const directionRef = useRef<number>(1);
  const speedRef = useRef<number>(400); // pixels per second
  const [currentSpeed, setCurrentSpeed] = useState<number>(400);
  const sweepPhaseRef = useRef<number>(0);

  // Measure and animate
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localRunning = isRunning;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const updateLoop = (now: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const deltaMs = now - lastTimeRef.current;
      lastTimeRef.current = now;

      // Maintain rolling history of last 120 frame durations
      if (deltaMs > 0 && deltaMs < 200) {
        frameTimesRef.current.push(deltaMs);
        if (frameTimesRef.current.length > 120) {
          frameTimesRef.current.shift();
        }
      }

      // Simulate variable CPU load based on workload level
      if (workload === "high") {
        let dummy = 0;
        for (let i = 0; i < 4500000; i++) {
          dummy += Math.sqrt(i);
        }
        if (dummy === -1) console.log(dummy);
      } else if (workload === "medium") {
        let dummy = 0;
        for (let i = 0; i < 1500000; i++) {
          dummy += Math.sqrt(i);
        }
        if (dummy === -1) console.log(dummy);
      } else if (workload === "sweep") {
        sweepPhaseRef.current += deltaMs * 0.0015;
        const sweepFactor = Math.sin(sweepPhaseRef.current) * 0.5 + 0.5; // 0 to 1
        const loopCount = Math.floor(sweepFactor * 5000000);
        let dummy = 0;
        for (let i = 0; i < loopCount; i++) {
          dummy += Math.sqrt(i);
        }
        if (dummy === -1) console.log(dummy);
      }

      // Physics update: moving vertical bar & pendulum
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width;
      const height = canvas.height;
      const logicalWidth = width / dpr;

      posXRef.current += (directionRef.current * speedRef.current * (deltaMs / 1000));
      if (posXRef.current > logicalWidth - 80) {
        posXRef.current = logicalWidth - 80;
        directionRef.current = -1;
      } else if (posXRef.current < 20) {
        posXRef.current = 20;
        directionRef.current = 1;
      }

      // Render pattern on canvas
      ctx.save();
      ctx.scale(dpr, dpr);
      const renderW = width / dpr;
      const renderH = height / dpr;

      // Dark background
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, renderW, renderH);

      // Subtle background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < renderW; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, renderH);
        ctx.stroke();
      }
      for (let y = 0; y < renderH; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(renderW, y);
        ctx.stroke();
      }

      // Center reference line
      ctx.strokeStyle = "rgba(59, 130, 246, 0.25)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(renderW / 2, 0);
      ctx.lineTo(renderW / 2, renderH);
      ctx.stroke();

      // High-contrast primary moving vertical bar
      const barX = posXRef.current;
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(barX, 40, 30, renderH - 80);

      // Contrast companion bars
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(barX - 15, 60, 10, renderH - 120);
      ctx.fillStyle = "#f43f5e";
      ctx.fillRect(barX + 35, 60, 10, renderH - 120);

      // Swinging pendulum in upper half
      const pendulumLength = Math.min(renderH * 0.35, 180);
      const pendulumAngle = Math.sin(now * 0.003) * 0.75;
      const originX = renderW / 2;
      const originY = 80;
      const bobX = originX + Math.sin(pendulumAngle) * pendulumLength;
      const bobY = originY + Math.cos(pendulumAngle) * pendulumLength;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(bobX, bobY, 14, 0, Math.PI * 2);
      ctx.fill();

      // Frame time graph along the bottom
      const graphH = 60;
      const graphY = renderH - graphH - 20;
      const graphW = Math.min(renderW - 40, 480);
      const graphX = (renderW - graphW) / 2;

      ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;
      ctx.fillRect(graphX, graphY, graphW, graphH);
      ctx.strokeRect(graphX, graphY, graphW, graphH);

      const fts = frameTimesRef.current;
      if (fts.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 1.5;
        const step = graphW / Math.max(fts.length - 1, 1);
        fts.forEach((t, i) => {
          // 0ms -> bottom, 33.3ms (30fps) -> top
          const normY = Math.max(0, Math.min(1, t / 33.3));
          const ptX = graphX + i * step;
          const ptY = graphY + graphH - (normY * (graphH - 6)) - 3;
          if (i === 0) ctx.moveTo(ptX, ptY);
          else ctx.lineTo(ptX, ptY);
        });
        ctx.stroke();
      }

      ctx.restore();

      if (localRunning) {
        animFrameIdRef.current = requestAnimationFrame(updateLoop);
      }
    };

    if (localRunning) {
      animFrameIdRef.current = requestAnimationFrame(updateLoop);
    }

    // Telemetry sampling interval
    const telemetryTimer = setInterval(() => {
      const fts = frameTimesRef.current;
      if (fts.length > 5) {
        const sorted = [...fts].sort((a, b) => a - b);
        const sum = fts.reduce((acc, v) => acc + v, 0);
        const mean = sum / fts.length;
        const curFps = Math.round(1000 / (fts[fts.length - 1] || 16.6));
        const rollingAvg = Math.round(1000 / mean);

        // 1% low is the 99th percentile frame duration
        const p99Index = Math.min(Math.floor(sorted.length * 0.99), sorted.length - 1);
        const p99Duration = sorted[p99Index];
        const lowFps = Math.round(1000 / (p99Duration || mean));

        // Jitter: standard deviation of frame times
        const variance = fts.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / fts.length;
        const jitter = Math.round(Math.sqrt(variance) * 10) / 10;

        setFps(curFps);
        setAvgFps(rollingAvg);
        setOnePercentLow(lowFps);
        setFrameTimeJitter(jitter);
      }
    }, 400);

    return () => {
      localRunning = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      clearInterval(telemetryTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [isRunning, workload]);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Visual Canvas */}
      <div className="relative w-full aspect-video min-h-[420px] max-h-[75vh] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full block touch-none" />

        {/* Live In-Canvas Telemetry HUD */}
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-3 bg-slate-900/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-700/60 text-xs font-mono shadow-lg text-slate-200">
          <div className="flex items-center gap-1.5" title={t("browserRequestanimationframeFrameDeliveryTitle")}>
            <Gauge className="w-4 h-4 text-emerald-400" />
            <span>{t("rafFps")}</span>
            <strong className="text-emerald-400 text-sm">{fps || "--"}</strong>
          </div>
          <div className="h-3.5 w-px bg-slate-700" />
          <div>
            <span>{t("avg")}</span> <strong className="text-white">{avgFps || "--"}</strong>
          </div>
          <div className="h-3.5 w-px bg-slate-700" />
          <div>
            <span>{t("1Low")}</span> <strong className="text-amber-400">{onePercentLow || "--"}</strong>
          </div>
          <div className="h-3.5 w-px bg-slate-700" />
          <div>
            <span>{t("jitter")}</span> <strong className="text-sky-400">{frameTimeJitter}{t("ms")}</strong>
          </div>
        </div>

        {/* Workload Badge */}
        <div className="absolute top-4 right-4 bg-slate-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/60 text-xs font-mono text-slate-300">
          {t("workload")}<span className="uppercase font-bold text-sky-400">{workload}</span>
        </div>
      </div>

      <TestInlineControls>
      {/* Control Strip */}
      <div className="mt-6 w-full max-w-4xl bg-card border border-border/70 rounded-2xl p-5 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(prev => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background font-medium text-xs rounded-xl hover:opacity-90 transition-opacity"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isRunning ? "Pause Motion" : "Resume Motion"}
            </button>
            <button
              onClick={() => {
                const nextSpeed = currentSpeed === 400 ? 750 : currentSpeed === 750 ? 250 : 400;
                speedRef.current = nextSpeed;
                setCurrentSpeed(nextSpeed);
              }}
              className="px-3.5 py-2 bg-muted text-foreground hover:bg-muted/80 text-xs font-medium rounded-xl transition-colors"
            >
              {t("cycleSpeed")}{currentSpeed}{t("pxS")}</button>
          </div>

          {/* Workload Selection */}
          <div className="flex items-center gap-1.5 bg-muted/60 dark:bg-white/10 p-1.5 rounded-xl border border-border/60">
            <span className="text-[11px] font-mono px-2 text-amber-500 dark:text-amber-300 font-bold uppercase tracking-wider">{t("workload")}</span>
            {(["low", "medium", "high", "sweep"] as WorkloadLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setWorkload(lvl)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all capitalize cursor-pointer ${
                  workload === lvl
                    ? "bg-amber-500 dark:bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300 font-extrabold"
                    : "text-slate-700 dark:text-slate-200 hover:text-foreground hover:bg-muted font-semibold"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Technical Honesty Disclaimer Banner */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{t("hardwareBoundaryNotice")}</span>
          </div>
          <p>
            {t("browserAnimationTimingProvides")}<strong>{t("cannotProveThatA")}</strong>{t("trueHardwareVariableRefresh")}</p>
        </div>

        {/* Setup Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-muted-foreground">
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("1EnableVrrIn")}</strong> {t("ensureAdaptiveSyncG")}</div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("2OsDriverSetup")}</strong> {t("inNvidiaControlPanel")}</div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("3UseFullscreen")}</strong> {t("press")}<kbd className="px-1 bg-background border border-border rounded">{t("f")}</kbd> {t("toInspectMovingBars")}</div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("4CompareWorkloadLevels")}</strong> {t("switchBetweenLowAnd")}</div>
          </div>
        </div>
      </div>
      </TestInlineControls>

      <TestControlBar testId={testId} title={t("vrrAdaptiveSyncVisualTitle")} />
    </div>
  );
}
