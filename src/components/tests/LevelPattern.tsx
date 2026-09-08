"use client";

import { useEffect, useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";

interface LevelPatternProps {
  type: "black" | "white";
  testId?: string;
}

const BLACK_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
const WHITE_STEPS = [254, 253, 252, 251, 250, 249, 248, 247, 246, 245, 244, 243, 242, 241, 240, 239, 238, 237, 236, 235, 234, 233, 232, 231, 230];

export function LevelPattern({ type, testId }: LevelPatternProps) {
  const { registerNavigation } = useTestContext();
  const [showOutlines, setShowOutlines] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  
  const steps = type === "black" ? BLACK_STEPS : WHITE_STEPS;
  const bg = type === "black" ? "#000000" : "#FFFFFF";
  const textColor = type === "black" ? "text-white/60" : "text-black/60";
  const defaultBorder = type === "black" ? "border-white/10" : "border-black/10";

  useEffect(() => {
    registerNavigation({
      next: () => setShowOutlines((p) => !p),
      prev: () => setShowLabels((p) => !p),
      reset: () => {
        setShowOutlines(true);
        setShowLabels(true);
      },
    });
  }, [registerNavigation]);

  return (
    <>
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-5 select-none overflow-hidden"
        style={{ backgroundColor: bg }}
      >
        {/* Top Target Calibration Hint */}
        <div className={`mb-2 px-3 py-1 rounded-full text-[11px] sm:text-xs text-center max-w-xl truncate ${
          type === "black" 
            ? "bg-neutral-900/80 border border-neutral-800 text-neutral-400" 
            : "bg-neutral-100 border border-neutral-200 text-neutral-600"
        }`}>
          {type === "black"
            ? "Black Level Target: Adjust monitor brightness until squares 1–3 are barely discernible from the black surround."
            : "White Level Target: Adjust monitor contrast until squares 252–254 are discernible from pure white without clipping."}
        </div>

        <div className="grid grid-cols-5 grid-rows-5 gap-1.5 sm:gap-2.5 w-full max-w-3xl h-full max-h-[82%] min-h-0">
          {steps.map((value, index) => {
            const color = `rgb(${value}, ${value}, ${value})`;
            const label = type === "black" ? `${index + 1}` : `${value}`;
            
            return (
              <div 
                key={index}
                className={`min-h-0 min-w-0 flex flex-col items-center justify-center relative rounded-md transition-all ${
                  showOutlines ? `border ${defaultBorder}` : "border border-transparent"
                } shadow-xs`}
                style={{ backgroundColor: color }}
              >
                {showLabels && (
                  <span className={`text-[10px] sm:text-xs font-semibold tracking-tight ${textColor} select-none drop-shadow-xs`}>
                    {label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <TestControlBar 
        testId={testId} 
        title={type === "black" ? "Black Level (Shadow Detail)" : "White Level (Highlight Detail)"}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOutlines((p) => !p)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
              showOutlines 
                ? "bg-white text-gray-950 font-bold shadow-xs border-transparent" 
                : "border-border/50 text-gray-700 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-muted dark:hover:bg-white/10"
            }`}
          >
            {showOutlines ? "Outlines: On" : "Outlines: Off"}
          </button>
          <button
            onClick={() => setShowLabels((p) => !p)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
              showLabels 
                ? "bg-white text-gray-950 font-bold shadow-xs border-transparent" 
                : "border-border/50 text-gray-700 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-muted dark:hover:bg-white/10"
            }`}
          >
            {showLabels ? "Labels: On" : "Labels: Off"}
          </button>
        </div>
      </TestControlBar>
    </>
  );
}