"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Clock, 
  Zap,
  Info
} from "lucide-react";

type WaveformType = "deep" | "regal" | "a2" | "periodic";

export function EinkRefreshPattern({ testId }: { testId: string }) {
  const [waveform, setWaveform] = useState<WaveformType>("deep");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [flashColor, setFlashColor] = useState<string>("#ffffff");
  const [cycleCount, setCycleCount] = useState<number>(0);
  const [flashSpeedMs, setFlashSpeedMs] = useState<number>(200); // ms per flash
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const flashTimerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // E-ink flash cycle engine
  useEffect(() => {
    if (!isActive) {
      if (flashTimerRef.current) clearInterval(flashTimerRef.current);
      setFlashColor("#ffffff");
      return;
    }

    let step = 0;
    // Different waveform sequences
    const deepSeq = ["#000000", "#ffffff", "#000000", "#ffffff", "#808080", "#404040", "#c0c0c0", "#ffffff"];
    const regalSeq = ["#000000", "#ffffff", "#000000", "#ffffff"];
    const a2Seq = ["#000000", "#ffffff"];

    const activeSeq = waveform === "deep" ? deepSeq : waveform === "regal" ? regalSeq : a2Seq;

    flashTimerRef.current = setInterval(() => {
      setFlashColor(activeSeq[step % activeSeq.length]);
      step++;
      if (step % activeSeq.length === 0) {
        setCycleCount((prev) => prev + 1);
        if (waveform !== "periodic") {
          // Deep/Regal finishes after a few full cycles
          if (step >= activeSeq.length * 3) {
            setIsActive(false);
            setFlashColor("#ffffff");
          }
        }
      }
    }, flashSpeedMs);

    return () => {
      if (flashTimerRef.current) clearInterval(flashTimerRef.current);
    };
  }, [isActive, waveform, flashSpeedMs]);

  const handleStartPurge = (type: WaveformType) => {
    setWaveform(type);
    setIsActive(true);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[650px] sm:h-[720px] rounded-2xl overflow-hidden flex flex-col select-none border border-neutral-800 shadow-2xl bg-neutral-950 text-white"
    >
      {/* Top Header */}
      <div className="z-20 bg-neutral-900/90 backdrop-blur-xl border-b border-neutral-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-400" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-200">
            E-Ink Electronic Paper Anti-Ghosting Purger
          </span>
        </div>

        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Flashing Surface */}
      <div 
        className="relative flex-1 flex flex-col items-center justify-center p-6 transition-colors duration-75"
        style={{ backgroundColor: flashColor }}
      >
        {!isActive && (
          <div className="bg-neutral-900/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-neutral-800 text-center max-w-lg shadow-2xl text-white">
            <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-2">Microcapsule Refresh Waveform</h2>
            <p className="text-xs text-neutral-300 leading-relaxed mb-6">
              E-Ink and electronic paper monitors (Dasung, Onyx Boox, Bigme) accumulate ghosting when titanium dioxide and carbon black microcapsules fail to reset. This tool drives rapid full-field polarity transitions to clear residual image ghosts.
            </p>

            {/* Photosensitive Warning */}
            <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-left text-amber-300 text-[11px] mb-6">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Flashing Notice:</strong> This tool produces high-contrast flashing cycles. Look away from the display while the purge is executing if sensitive to light flashes.
              </span>
            </div>

            {/* Start Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleStartPurge("deep")}
                className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold shadow-lg shadow-blue-600/30 transition-all flex flex-col items-center gap-1"
              >
                <span>Deep Purge</span>
                <span className="text-[10px] text-blue-200 font-normal">8-Phase Multi-Wave</span>
              </button>

              <button
                onClick={() => handleStartPurge("regal")}
                className="px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-mono font-semibold transition-all flex flex-col items-center gap-1"
              >
                <span>Regal Quick</span>
                <span className="text-[10px] text-neutral-400 font-normal">4-Phase Anti-Ghost</span>
              </button>

              <button
                onClick={() => handleStartPurge("a2")}
                className="px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-mono font-semibold transition-all flex flex-col items-center gap-1"
              >
                <span>A2 Rapid</span>
                <span className="text-[10px] text-neutral-400 font-normal">Fast Inversion</span>
              </button>
            </div>
          </div>
        )}

        {isActive && (
          <div className="bg-black/80 backdrop-blur-md px-5 py-3 rounded-xl text-white text-center border border-neutral-700 shadow-2xl">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1 font-bold">
              Purging E-Ink Ghosting...
            </div>
            <div className="font-mono text-sm font-bold">Waveform: {waveform.toUpperCase()} • Cycle {cycleCount + 1}</div>
            <button
              onClick={() => setIsActive(false)}
              className="mt-3 px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-mono font-bold"
            >
              Stop Purge
            </button>
          </div>
        )}
      </div>

      {/* Bottom Configuration Bar */}
      <div className="z-20 bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono text-neutral-400">Flash Interval:</span>
          {[120, 200, 350].map((spd) => (
            <button
              key={spd}
              onClick={() => setFlashSpeedMs(spd)}
              className={`px-2.5 py-1 rounded font-mono ${flashSpeedMs === spd ? "bg-blue-600 text-white font-bold" : "bg-neutral-800 text-neutral-400 hover:text-white"}`}
            >
              {spd}ms
            </button>
          ))}
        </div>

        <div className="font-mono text-neutral-400 text-[11px]">
          Total Completed Clean Cycles: <span className="text-emerald-400 font-bold">{cycleCount}</span>
        </div>
      </div>
    </div>
  );
}
