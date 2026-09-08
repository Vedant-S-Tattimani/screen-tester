"use client";

import { useEffect, useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";

interface ViewingAnglePatternProps {
  testId?: string;
}

type Mode = "wheel" | "bars" | "grid";

export function ViewingAnglePattern({ testId }: ViewingAnglePatternProps) {
  const { registerNavigation } = useTestContext();
  const [mode, setMode] = useState<Mode>("wheel");

  useEffect(() => {
    registerNavigation({
      next: () => setMode(m => m === "wheel" ? "bars" : m === "bars" ? "grid" : "wheel"),
      prev: () => setMode(m => m === "wheel" ? "grid" : m === "grid" ? "bars" : "wheel"),
      reset: () => setMode("wheel"),
    });
  }, [registerNavigation]);

  return (
    <>
      <div className="absolute inset-0 bg-[#262626] flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {mode === "wheel" && (
          <div className="max-w-md w-full aspect-square bg-[#777777] rounded-full relative shadow-2xl overflow-hidden border-4 border-[#333333]">
            {/* Center Target Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-56 h-56 rounded-full border-[16px] border-black flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-white shadow-[0_0_40px_white]" />
              </div>
            </div>

            {/* Color Wedges */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-1/2 bg-red-600 origin-bottom" style={{ transform: 'translateX(-50%) rotate(0deg)' }} />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-1/2 bg-emerald-600 origin-bottom" style={{ transform: 'translateX(-50%) rotate(120deg)' }} />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-1/2 bg-blue-600 origin-bottom" style={{ transform: 'translateX(-50%) rotate(240deg)' }} />
            
            {/* Center Cap */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-52 h-52 rounded-full bg-[#777777] z-10 flex items-center justify-center border-4 border-[#333333]">
                <div className="w-14 h-14 rounded-full bg-white animate-pulse shadow-md" />
              </div>
            </div>
          </div>
        )}

        {mode === "bars" && (
          <div className="w-full max-w-2xl h-64 flex flex-col rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <div className="flex-1 bg-red-600 flex items-center justify-center text-xs font-mono font-bold text-white uppercase tracking-widest">Red Shift Target</div>
            <div className="flex-1 bg-emerald-600 flex items-center justify-center text-xs font-mono font-bold text-black uppercase tracking-widest">Green Shift Target</div>
            <div className="flex-1 bg-blue-600 flex items-center justify-center text-xs font-mono font-bold text-white uppercase tracking-widest">Blue Shift Target</div>
            <div className="flex-1 bg-neutral-500 flex items-center justify-center text-xs font-mono font-bold text-black uppercase tracking-widest">Neutral Gamma Reference</div>
          </div>
        )}

        {mode === "grid" && (
          <div className="w-full max-w-xl aspect-square grid grid-cols-4 grid-rows-4 gap-2 p-2 bg-[#1a1a1a] rounded-xl border border-white/10">
            {Array.from({ length: 16 }).map((_, i) => (
              <div 
                key={i} 
                className="rounded flex items-center justify-center font-mono text-xs font-semibold"
                style={{ 
                  backgroundColor: i % 2 === 0 ? "#ffffff" : "#111111",
                  color: i % 2 === 0 ? "#000000" : "#ffffff"
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        )}
      </div>

      <TestControlBar testId={testId} title="Viewing Angle & Off-Axis Gamma">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground dark:text-slate-300 uppercase tracking-widest hidden md:inline">Pattern</span>
          <div className="flex gap-1 bg-muted/60 p-1 rounded-lg border border-border/50">
            {(["wheel", "bars", "grid"] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-2.5 py-1 rounded text-xs font-medium uppercase transition-colors ${
                  mode === m 
                    ? "bg-white text-gray-950 font-bold shadow-xs" 
                    : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
                }`}
              >
                {m === "wheel" ? "Color Wheel" : m === "bars" ? "Color Bars" : "Checkerboard"}
              </button>
            ))}
          </div>
        </div>
      </TestControlBar>
    </>
  );
}
