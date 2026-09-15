"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Play, 
  Pause, 
  Sliders, 
  Activity, 
  Zap, 
  Maximize2, 
  Minimize2, 
  HelpCircle,
  TrendingDown
} from "lucide-react";
import { useTranslations } from "next-intl";

type OverdriveMode = "off" | "normal" | "aggressive" | "extreme";

interface PresetTransition {
  id: string;
  name: string;
  startGrey: number; // 0-255
  endGrey: number;   // 0-255
  description: string;
}

const PRESET_TRANSITIONS: PresetTransition[] = [
  {
    id: "black_to_dark_grey",
    name: "0% Black → 20% Grey (VA Smear Test)",
    startGrey: 0,
    endGrey: 51,
    description: "The most difficult transition for VA and slow IPS panels. Look for thick purple or black smearing behind the moving block."
  },
  {
    id: "black_to_white",
    name: "0% Black → 100% White (Full Rise)",
    startGrey: 0,
    endGrey: 255,
    description: "Full dynamic range rise time. Fast panels complete this transition in under 5ms."
  },
  {
    id: "mid_grey_rise",
    name: "25% Grey → 75% Grey (Typical GtG)",
    startGrey: 64,
    endGrey: 191,
    description: "Standard midtone gaming transition. Demonstrates overdrive voltage boost efficacy."
  },
  {
    id: "near_white_transition",
    name: "75% Grey → 100% White (High Luminance)",
    startGrey: 191,
    endGrey: 255,
    description: "Tests light-to-light fall and rise times without panel voltage saturation."
  }
];

export function GtgResponseTimePattern({ testId }: { testId?: string }) {
  const t = useTranslations("Tests.gtgResponseTimeTest");
  const [activePreset, setActivePreset] = useState<string>("black_to_dark_grey");
  const [startGrey, setStartGrey] = useState<number>(0);
  const [endGrey, setEndGrey] = useState<number>(51);
  const [speed, setSpeed] = useState<number>(1200); // px/sec
  const [overdriveMode, setOverdriveMode] = useState<OverdriveMode>("normal");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [blockWidth, setBlockWidth] = useState<number>(140);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const posXRef = useRef<number>(0);
  const dirRef = useRef<number>(1);
  const lastTimeRef = useRef<number>(performance.now());

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

  const handleSelectPreset = (p: PresetTransition) => {
    setActivePreset(p.id);
    setStartGrey(p.startGrey);
    setEndGrey(p.endGrey);
  };

  // Main Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const render = (time: number) => {
      if (!running) return;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const w = canvas.width;
      const h = canvas.height;

      if (isPlaying) {
        posXRef.current += speed * delta * dirRef.current;
        if (posXRef.current + blockWidth > w) {
          posXRef.current = w - blockWidth;
          dirRef.current = -1;
        } else if (posXRef.current < 0) {
          posXRef.current = 0;
          dirRef.current = 1;
        }
      }

      // Background color (Start Grey)
      ctx.fillStyle = `rgb(${startGrey}, ${startGrey}, ${startGrey})`;
      ctx.fillRect(0, 0, w, h);

      // Moving Block (End Grey)
      const currentX = posXRef.current;
      const blockH = h * 0.55;
      const blockY = (h - blockH) / 2;

      // Simulated Overdrive Corona / Ghosting Trail
      if (overdriveMode === "extreme") {
        // Severe voltage overshoot (white inverse corona if moving to dark, dark inverse if moving to bright)
        const coronaW = 24;
        const coronaVal = endGrey > startGrey ? 0 : 255;
        const trailX = dirRef.current === 1 ? currentX - coronaW : currentX + blockWidth;
        ctx.fillStyle = `rgba(${coronaVal}, ${coronaVal}, ${coronaVal}, 0.75)`;
        ctx.fillRect(trailX, blockY, coronaW, blockH);
      } else if (overdriveMode === "aggressive") {
        const coronaW = 12;
        const coronaVal = endGrey > startGrey ? 20 : 230;
        const trailX = dirRef.current === 1 ? currentX - coronaW : currentX + blockWidth;
        ctx.fillStyle = `rgba(${coronaVal}, ${coronaVal}, ${coronaVal}, 0.4)`;
        ctx.fillRect(trailX, blockY, coronaW, blockH);
      } else if (overdriveMode === "off") {
        // Slow trail (smear of intermediate grey)
        const smearW = 32;
        const midVal = Math.round((startGrey + endGrey) / 2);
        const trailX = dirRef.current === 1 ? currentX - smearW : currentX + blockWidth;
        ctx.fillStyle = `rgba(${midVal}, ${midVal}, ${midVal}, 0.6)`;
        ctx.fillRect(trailX, blockY, smearW, blockH);
      }

      // Main Block
      ctx.fillStyle = `rgb(${endGrey}, ${endGrey}, ${endGrey})`;
      ctx.fillRect(currentX, blockY, blockWidth, blockH);

      // Contrast border on block for visual clarity
      ctx.strokeStyle = Math.abs(endGrey - startGrey) < 30 ? "rgba(255,255,255,0.4)" : "transparent";
      ctx.lineWidth = 1;
      ctx.strokeRect(currentX, blockY, blockWidth, blockH);

      // High-precision timing marks (ruler ticks on top and bottom)
      ctx.fillStyle = startGrey > 128 ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)";
      for (let x = 0; x < w; x += 40) {
        ctx.fillRect(x, 0, 1, 10);
        ctx.fillRect(x, h - 10, 1, 10);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, speed, startGrey, endGrey, overdriveMode, blockWidth]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden transition-all ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none border-none" : ""
      }`}
    >
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50/80 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-800 hover:bg-gray-50 transition-colors shadow-2xs"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{isPlaying ? "Pause" : "Resume Motion"}</span>
          </button>

          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-0.5 shadow-2xs text-xs">
            <span className="px-2 text-gray-500 font-mono text-[11px]">Overdrive:</span>
            {(["off", "normal", "aggressive", "extreme"] as OverdriveMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setOverdriveMode(mode)}
                className={`px-2.5 py-1 rounded-md capitalize font-medium transition-colors ${
                  overdriveMode === mode ? "bg-gray-950 text-white shadow-2xs" : "text-gray-600 hover:text-gray-950"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
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

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 space-y-5">
        {/* Preset Transitions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESET_TRANSITIONS.map((p) => {
            const isSelected = activePreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                  isSelected 
                    ? "border-gray-950 bg-gray-50/80 shadow-2xs ring-1 ring-gray-950" 
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className="text-xs font-bold text-gray-900 mb-1">{p.name}</span>
                <span className="text-[11px] text-gray-500 leading-tight">{p.description}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Canvas */}
        <div className="relative rounded-xl border border-gray-300 overflow-hidden shadow-inner bg-black">
          <canvas
            ref={canvasRef}
            width={1200}
            height={360}
            className="w-full h-[280px] sm:h-[360px] block"
          />
          <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none">
            <span className="rounded-lg bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-white text-xs font-mono">
              Transition: RGB({startGrey}) → RGB({endGrey}) · Speed: {speed} px/s · Mode: {overdriveMode.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Sliders: Start Grey, End Grey, Velocity */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-gray-700">
              <span>Background Grey:</span>
              <span className="font-bold">RGB({startGrey})</span>
            </div>
            <input
              type="range"
              min={0}
              max={255}
              value={startGrey}
              onChange={(e) => {
                setStartGrey(Number(e.target.value));
                setActivePreset("");
              }}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-gray-700">
              <span>Moving Block Grey:</span>
              <span className="font-bold">RGB({endGrey})</span>
            </div>
            <input
              type="range"
              min={0}
              max={255}
              value={endGrey}
              onChange={(e) => {
                setEndGrey(Number(e.target.value));
                setActivePreset("");
              }}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-gray-700">
              <span>Speed:</span>
              <span className="font-bold">{speed} px/s</span>
            </div>
            <input
              type="range"
              min={400}
              max={2800}
              step={100}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
        </div>

        {/* Overdrive Tuning Guidance */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-bold uppercase font-mono text-gray-950">
              {t.has("overdriveTitle") ? t("overdriveTitle") : "How to Read Overdrive Artifacts"}
            </h4>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t.has("overdriveDesc") 
              ? t("overdriveDesc") 
              : "Track the leading and trailing edges of the moving rectangle with your eyes. If your monitor's physical OSD overdrive is set too low, you will see a trailing ghost blur matching the moving color. If overdrive is set too high, excessive voltage pushes the liquid crystals past the target state, creating a bright white or dark inverted corona halo. The ideal setting is typically Normal or Fast where motion is sharp without coronas."}
          </p>
        </div>
      </div>
    </div>
  );
}
