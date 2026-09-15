"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  Clock, 
  Maximize2, 
  Minimize2, 
  Sun
} from "lucide-react";

interface WindowPreset {
  percent: number;
  label: string;
  targetNitsEst: string;
}

const PRESETS: WindowPreset[] = [
  { percent: 1, label: "1% Window", targetNitsEst: "~1000–1400 nits" },
  { percent: 2, label: "2% Window", targetNitsEst: "~1000–1300 nits" },
  { percent: 5, label: "5% Window", targetNitsEst: "~900–1100 nits" },
  { percent: 10, label: "10% Window", targetNitsEst: "~800–1000 nits" },
  { percent: 25, label: "25% Window", targetNitsEst: "~450–600 nits" },
  { percent: 50, label: "50% Window", targetNitsEst: "~300–400 nits" },
  { percent: 100, label: "100% Full Screen", targetNitsEst: "~200–280 nits" },
];

export function OledAblPattern({ testId }: { testId: string }) {
  const [currentPresetIdx, setCurrentPresetIdx] = useState<number>(3); // 10% default
  const [customPercent, setCustomPercent] = useState<number>(10);
  const [isAutoCycle, setIsAutoCycle] = useState<boolean>(false);
  const [cycleIntervalSec] = useState<number>(4);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showHud, setShowHud] = useState<boolean>(true);
  const [sustainedTimer, setSustainedTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [whiteLuminance, setWhiteLuminance] = useState<number>(100); // 0-100%
  const [bgDarkness] = useState<"black" | "darkGray">("black");

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activePercent = customPercent;

  // Auto-cycle effect
  useEffect(() => {
    if (!isAutoCycle) return;
    const interval = setInterval(() => {
      setCurrentPresetIdx((prev) => {
        const next = (prev + 1) % PRESETS.length;
        setCustomPercent(PRESETS[next].percent);
        return next;
      });
    }, cycleIntervalSec * 1000);
    return () => clearInterval(interval);
  }, [isAutoCycle, cycleIntervalSec]);

  // Sustained burst timer
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setSustainedTimer((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const handleSelectPreset = (idx: number) => {
    setCurrentPresetIdx(idx);
    setCustomPercent(PRESETS[idx].percent);
    setSustainedTimer(0);
  };

  const handleSliderChange = (val: number) => {
    setCustomPercent(val);
    const matchIdx = PRESETS.findIndex((p) => p.percent === val);
    setCurrentPresetIdx(matchIdx !== -1 ? matchIdx : -1);
    setSustainedTimer(0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentPresetIdx((prev) => {
          const next = (prev + 1) % PRESETS.length;
          setCustomPercent(PRESETS[next].percent);
          return next;
        });
      } else if (e.key === "ArrowLeft") {
        setCurrentPresetIdx((prev) => {
          const next = (prev - 1 + PRESETS.length) % PRESETS.length;
          setCustomPercent(PRESETS[next].percent);
          return next;
        });
      } else if (e.key === " ") {
        e.preventDefault();
        setIsAutoCycle((prev) => !prev);
      } else if (e.key === "h" || e.key === "H") {
        setShowHud((prev) => !prev);
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Compute square dimensions based on area percentage: side = sqrt(area)
  const windowDimensionPct = Math.sqrt(activePercent / 100) * 100;
  const currentPreset = PRESETS.find((p) => p.percent === activePercent);

  const whiteRgb = Math.round((whiteLuminance / 100) * 255);
  const whiteColor = `rgb(${whiteRgb}, ${whiteRgb}, ${whiteRgb})`;
  const bgColor = bgDarkness === "black" ? "#000000" : "#0f0f13";

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[650px] sm:h-[720px] rounded-2xl overflow-hidden flex flex-col select-none border border-neutral-800 shadow-2xl transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      {/* Central ABL Window Area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden p-6">
        <div 
          className="transition-all duration-300 ease-out rounded-sm shadow-[0_0_80px_rgba(255,255,255,0.08)] flex items-center justify-center relative"
          style={{
            width: `${windowDimensionPct}%`,
            height: `${windowDimensionPct}%`,
            backgroundColor: whiteColor,
            maxWidth: "100%",
            maxHeight: "100%",
            aspectRatio: "1 / 1"
          }}
        >
          {showHud && activePercent >= 5 && (
            <div className={`text-center font-mono text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded bg-black/40 backdrop-blur-sm ${whiteRgb > 140 ? "text-neutral-900" : "text-white"}`}>
              {activePercent}% APL
            </div>
          )}
        </div>

        {/* Minimal Corner Info when HUD is hidden */}
        {!showHud && (
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white font-mono text-xs px-3 py-1.5 rounded-lg border border-neutral-700/60 z-20">
            {activePercent}% APL • Press &apos;H&apos; to show controls
          </div>
        )}
      </div>

      {/* Control HUD Overlay */}
      {showHud && (
        <div className="relative z-20 bg-neutral-950/90 backdrop-blur-xl border-t border-neutral-800/80 px-4 sm:px-6 py-4 flex flex-col gap-3 text-white">
          
          {/* Top Row: Presets & Auto-Cycle */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider mr-1">
                Window Size:
              </span>
              {PRESETS.map((preset, idx) => (
                <button
                  key={preset.percent}
                  onClick={() => handleSelectPreset(idx)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    activePercent === preset.percent
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/50"
                      : "bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 border border-neutral-700/50"
                  }`}
                >
                  {preset.percent}%
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoCycle((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isAutoCycle
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                    : "bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 border border-neutral-700/50"
                }`}
              >
                {isAutoCycle ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>Auto-Cycle</span>
              </button>

              <button
                onClick={() => {
                  setIsTimerRunning((prev) => !prev);
                  if (!isTimerRunning && sustainedTimer === 0) setSustainedTimer(0);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  isTimerRunning
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                    : "bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 border border-neutral-700/50"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{sustainedTimer}s</span>
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 border border-neutral-700/50"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Bottom Row: Sliders & Diagnostics */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center pt-2 border-t border-neutral-800/60 text-xs">
            {/* Fine Tuning Slider */}
            <div className="md:col-span-5 flex items-center gap-3">
              <span className="font-mono text-neutral-400 whitespace-nowrap">Fine APL:</span>
              <input
                type="range"
                min={1}
                max={100}
                value={customPercent}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full accent-blue-500 h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
              />
              <span className="font-mono font-bold text-white w-10 text-right">{customPercent}%</span>
            </div>

            {/* Target White Signal Level */}
            <div className="md:col-span-4 flex items-center gap-2">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-neutral-400">Signal:</span>
              <button
                onClick={() => setWhiteLuminance(100)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono ${whiteLuminance === 100 ? "bg-neutral-700 text-white font-bold" : "text-neutral-400 hover:text-white"}`}
              >
                100% (255)
              </button>
              <button
                onClick={() => setWhiteLuminance(80)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono ${whiteLuminance === 80 ? "bg-neutral-700 text-white font-bold" : "text-neutral-400 hover:text-white"}`}
              >
                80% (204)
              </button>
              <button
                onClick={() => setWhiteLuminance(50)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono ${whiteLuminance === 50 ? "bg-neutral-700 text-white font-bold" : "text-neutral-400 hover:text-white"}`}
              >
                50% (128)
              </button>
            </div>

            {/* Technical Context Badge */}
            <div className="md:col-span-3 flex items-center justify-end gap-2 text-neutral-400 font-mono text-[11px]">
              <span className="text-neutral-500">Expected:</span>
              <span className="text-emerald-400 font-semibold">{currentPreset?.targetNitsEst || "Custom Area"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
