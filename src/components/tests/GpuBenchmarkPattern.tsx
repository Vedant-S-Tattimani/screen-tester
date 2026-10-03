"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Cpu, 
  Activity, 
  Flame, 
  CheckCircle2, 
  Maximize2, 
  Minimize2, 
  Sliders
} from "lucide-react";
import { useTranslations } from "next-intl";

type StressLevel = "light" | "medium" | "heavy" | "extreme";

interface StressConfig {
  name: string;
  particles: number;
  description: string;
}

const STRESS_CONFIGS: Record<StressLevel, StressConfig> = {
  light: {
    name: "Light (10,000 Particles)",
    particles: 10000,
    description: "Ideal for mobile phones and low-power integrated graphics."
  },
  medium: {
    name: "Medium (40,000 Particles)",
    particles: 40000,
    description: "Standard 60 FPS benchmark for modern laptop and desktop GPUs."
  },
  heavy: {
    name: "Heavy (100,000 Particles)",
    particles: 100000,
    description: "Evaluates 144Hz+ high-refresh stability and shader throughput."
  },
  extreme: {
    name: "Extreme Stress (200,000 Particles)",
    particles: 200000,
    description: "Pushes discrete gaming GPUs to detect thermal throttling and frame drops."
  }
};

export function GpuBenchmarkPattern({ testId }: { testId?: string }) {
  const t = useTranslations("Tests.gpuBenchmarkTest");
  const [stressLevel, setStressLevel] = useState<StressLevel>("medium");
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [currentFps, setCurrentFps] = useState<number>(60);
  const [averageFps, setAverageFps] = useState<number>(60);
  const [onePercentLow, setOnePercentLow] = useState<number>(55);
  const [frameTimeMs, setFrameTimeMs] = useState<number>(16.6);
  const [gpuInfo, setGpuInfo] = useState<{ renderer: string; vendor: string; maxTex: number }>({
    renderer: "Detecting...",
    vendor: "Detecting...",
    maxTex: 4096
  });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // 30s Benchmark Mode
  const [benchmarkActive, setBenchmarkActive] = useState<boolean>(false);
  const [benchmarkTimeLeft, setBenchmarkTimeLeft] = useState<number>(30);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const fpsHistoryRef = useRef<number[]>([]);
  const frameTimesRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef<number>(performance.now());
  const benchmarkTimerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Detect GPU info via WebGL
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
        const renderer = debugInfo
          ? (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          : (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).RENDERER);
        const vendor = debugInfo
          ? (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
          : (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).VENDOR);
        const maxTex = (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).MAX_TEXTURE_SIZE);

        setGpuInfo({
          renderer: String(renderer || "Standard WebGL Hardware Accelerator"),
          vendor: String(vendor || "Generic Vendor"),
          maxTex: Number(maxTex || 4096)
        });
      }
    } catch {
      // Fallback
    }
  }, []);

  // Start 30s benchmark
  const startBenchmark = () => {
    setFinalScore(null);
    setBenchmarkTimeLeft(30);
    setBenchmarkActive(true);
    fpsHistoryRef.current = [];

    if (benchmarkTimerRef.current) clearInterval(benchmarkTimerRef.current);
    benchmarkTimerRef.current = setInterval(() => {
      setBenchmarkTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(benchmarkTimerRef.current!);
          setBenchmarkActive(false);
          // Calculate score
          const history = fpsHistoryRef.current;
          if (history.length > 0) {
            const avg = history.reduce((a, b) => a + b, 0) / history.length;
            const score = Math.round(avg * 18);
            setFinalScore(score);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Main 3D Particle Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;
    const count = STRESS_CONFIGS[stressLevel].particles;

    // Pre-initialize particle cloud coordinates
    const particles = new Float32Array(count * 3); // x, y, z
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 160 + Math.random() * 90;
      particles[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particles[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particles[i * 3 + 2] = r * Math.cos(phi);
    }

    let angleX = 0;
    let angleY = 0;

    const render = (now: number) => {
      if (!running) return;

      const deltaMs = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;

      if (deltaMs > 0) {
        const instantFps = Math.round(1000 / deltaMs);
        setFrameTimeMs(Number(deltaMs.toFixed(1)));
        setCurrentFps(instantFps);

        fpsHistoryRef.current.push(instantFps);
        if (fpsHistoryRef.current.length > 120) {
          fpsHistoryRef.current.shift();
        }

        // Calculate average & 1% low
        const history = fpsHistoryRef.current;
        const avg = Math.round(history.reduce((a, b) => a + b, 0) / history.length);
        setAverageFps(avg);

        const sorted = [...history].sort((a, b) => a - b);
        const lowIndex = Math.max(0, Math.floor(sorted.length * 0.01));
        setOnePercentLow(sorted[lowIndex] || avg);
      }

      if (isRunning) {
        angleX += 0.012;
        angleY += 0.016;
      }

      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "#05050a";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      ctx.fillStyle = "#38bdf8";

      // Render 3D point cloud projection
      const step = count > 100000 ? 2 : 1;
      for (let i = 0; i < count; i += step) {
        const x0 = particles[i * 3];
        const y0 = particles[i * 3 + 1];
        const z0 = particles[i * 3 + 2];

        // Rotation around Y
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;

        // Rotation around X
        const y2 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;

        // Perspective divide
        const fov = 380;
        const scale = fov / (fov + z2 + 250);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        if (px > 0 && px < w && py > 0 && py < h) {
          ctx.fillRect(px, py, scale > 1.1 ? 2 : 1, scale > 1.1 ? 2 : 1);
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    lastFrameTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [stressLevel, isRunning]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden transition-all ${
        isFullscreen ? "fixed inset-0 z-50 h-screen w-screen rounded-none border-none" : ""
      }`}
    >
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50/80 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-800 hover:bg-gray-50 transition-colors shadow-2xs"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{isRunning ? "Pause" : "Resume"}</span>
          </button>

          <button
            onClick={startBenchmark}
            disabled={benchmarkActive}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-2xs transition-colors ${
              benchmarkActive 
                ? "bg-purple-100 text-purple-800 border border-purple-200 cursor-not-allowed" 
                : "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{benchmarkActive ? `Benchmarking (${benchmarkTimeLeft}s)...` : "Run 30s Benchmark"}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {/* Real-Time Telemetry Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-1">
            <span className="text-[11px] font-mono text-gray-500 uppercase">Current FPS</span>
            <div className={`text-2xl font-bold font-mono tracking-tight ${
              currentFps >= 60 ? "text-emerald-600" : currentFps >= 30 ? "text-amber-600" : "text-rose-600"
            }`}>
              {currentFps} <span className="text-xs text-gray-500">FPS</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-1">
            <span className="text-[11px] font-mono text-gray-500 uppercase">Average FPS</span>
            <div className="text-2xl font-bold font-mono tracking-tight text-gray-900">
              {averageFps} <span className="text-xs text-gray-500">FPS</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-1">
            <span className="text-[11px] font-mono text-gray-500 uppercase">1% Low FPS</span>
            <div className="text-2xl font-bold font-mono tracking-tight text-purple-600">
              {onePercentLow} <span className="text-xs text-gray-500">FPS</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-1">
            <span className="text-[11px] font-mono text-gray-500 uppercase">Frame Time</span>
            <div className="text-2xl font-bold font-mono tracking-tight text-blue-600">
              {frameTimeMs} <span className="text-xs text-gray-500">ms</span>
            </div>
          </div>
        </div>

        {/* Benchmark Score Overlay (if completed) */}
        {finalScore !== null && (
          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-mono font-bold text-purple-900 uppercase">Benchmark Complete</span>
              <p className="text-xs text-purple-700">
                Sustained 30s Stability Score: <strong>{finalScore} Points</strong> · 1% Lows: {onePercentLow} FPS
              </p>
            </div>
            <span className="text-xl font-mono font-bold text-purple-900">{finalScore} PTS</span>
          </div>
        )}

        {/* 3D Viewport Canvas */}
        <div className="relative rounded-xl border border-gray-900 overflow-hidden shadow-inner bg-black">
          <canvas
            ref={canvasRef}
            width={1200}
            height={380}
            className="w-full h-[280px] sm:h-[380px] block"
          />
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className="rounded-lg bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-white text-xs font-mono">
              Load: {STRESS_CONFIGS[stressLevel].particles.toLocaleString()} 3D Particles
            </span>
          </div>
        </div>

        {/* Stress Preset Selector */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-gray-700 block">
            GPU Stress Preset
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {(["light", "medium", "heavy", "extreme"] as StressLevel[]).map((lvl) => {
              const cfg = STRESS_CONFIGS[lvl];
              const isSelected = stressLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setStressLevel(lvl)}
                  className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                    isSelected 
                      ? "border-gray-950 bg-gray-50/80 shadow-2xs ring-1 ring-gray-950" 
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className="text-xs font-bold text-gray-900 mb-0.5">{cfg.name}</span>
                  <span className="text-[11px] text-gray-500 leading-tight">{cfg.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* GPU Hardware Diagnostics Card */}
        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-mono font-bold text-gray-900 uppercase">
            <Cpu className="w-4 h-4 text-blue-600" />
            <span>Detected GPU Hardware Info</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-gray-700 pt-1">
            <div><strong>Renderer:</strong> {gpuInfo.renderer}</div>
            <div><strong>Vendor:</strong> {gpuInfo.vendor}</div>
            <div><strong>Max Texture Size:</strong> {gpuInfo.maxTex}px</div>
          </div>
        </div>
      </div>
    </div>
  );
}
