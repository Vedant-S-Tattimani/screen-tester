"use client";

import { useEffect, useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";

interface SaturationPatternProps {
  testId?: string;
}

type Mode = "all" | "hue" | "rgb";

export function SaturationPattern({ testId }: SaturationPatternProps) {
  const { registerNavigation } = useTestContext();
  const [mode, setMode] = useState<Mode>("all");

  const cycleMode = () => {
    setMode((m) => (m === "all" ? "hue" : m === "hue" ? "rgb" : "all"));
  };

  useEffect(() => {
    registerNavigation({
      next: cycleMode,
      prev: () => setMode(m => m === "all" ? "rgb" : m === "rgb" ? "hue" : "all"),
      reset: () => setMode("all"),
    });
  }, [registerNavigation]);

  return (
    <>
      <div 
        className="absolute inset-0 flex flex-col bg-black overflow-hidden cursor-pointer select-none"
        onClick={cycleMode}
        title="Click anywhere to cycle mode: Combined → Rainbow (Hue) → RGB Steps"
      >
        {/* Floating Mode Cue */}
        <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white text-xs font-mono shadow-md z-10">
          <span className="text-amber-400 font-bold uppercase tracking-wider">
            {mode === "all" ? "Combined" : mode === "hue" ? "Rainbow (Hue)" : "RGB Steps"}
          </span>
          <span className="text-white/40">•</span>
          <span className="text-white/70 text-[11px]">Click screen to cycle</span>
        </div>

        {/* Hue Spectrum */}
        {(mode === "all" || mode === "hue") && (
          <div 
            className="flex-1 w-full"
            style={{ 
              background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
            }}
          />
        )}
        
        {/* Saturation Steps (Red, Green, Blue) */}
        {(mode === "all" || mode === "rgb") && (
          <>
            <div className="flex-1 w-full flex">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={`r-${i}`} 
                  className="flex-1 h-full"
                  style={{ backgroundColor: `hsl(0, ${100 - i * 5}%, 50%)` }}
                />
              ))}
            </div>

            <div className="flex-1 w-full flex">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={`g-${i}`} 
                  className="flex-1 h-full"
                  style={{ backgroundColor: `hsl(120, ${100 - i * 5}%, 50%)` }}
                />
              ))}
            </div>

            <div className="flex-1 w-full flex">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={`b-${i}`} 
                  className="flex-1 h-full"
                  style={{ backgroundColor: `hsl(240, ${100 - i * 5}%, 50%)` }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <TestControlBar testId={testId} title="Color Saturation & Transitions">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-300 uppercase tracking-wider font-mono hidden md:inline">Mode:</span>
          <div className="flex gap-1.5 bg-slate-100 dark:bg-black/80 p-1 rounded-xl border border-slate-200 dark:border-white/20">
            {(["all", "hue", "rgb"] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                  mode === m 
                    ? "bg-amber-400 text-slate-950 font-extrabold shadow-md ring-2 ring-amber-300" 
                    : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/15 font-semibold"
                }`}
              >
                {m === "all" ? "Combined" : m === "hue" ? "Rainbow" : "RGB Steps"}
              </button>
            ))}
          </div>
        </div>
      </TestControlBar>
    </>
  );
}
