"use client";

import { useEffect, useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";

// Industry standard Macbeth ColorChecker approximation values (sRGB)
const COLOR_CHECKER = [
  { name: "Dark Skin", hex: "#735244" },
  { name: "Light Skin", hex: "#c29682" },
  { name: "Blue Sky", hex: "#627a9d" },
  { name: "Foliage", hex: "#576c43" },
  { name: "Blue Flower", hex: "#8580b1" },
  { name: "Bluish Green", hex: "#67bdaa" },
  { name: "Orange", hex: "#d67e2c" },
  { name: "Purplish Blue", hex: "#505ba6" },
  { name: "Moderate Red", hex: "#c15a63" },
  { name: "Purple", hex: "#5e3c6c" },
  { name: "Yellow Green", hex: "#9dbc40" },
  { name: "Orange Yellow", hex: "#e0a32e" },
  { name: "Blue", hex: "#383d96" },
  { name: "Green", hex: "#469449" },
  { name: "Red", hex: "#af363c" },
  { name: "Yellow", hex: "#e7c71f" },
  { name: "Magenta", hex: "#bb5695" },
  { name: "Cyan", hex: "#0885a1" },
  { name: "White", hex: "#f3f3f2" },
  { name: "Neutral 8", hex: "#c8c8c8" },
  { name: "Neutral 6.5", hex: "#a0a0a0" },
  { name: "Neutral 5", hex: "#7a7a7a" },
  { name: "Neutral 3.5", hex: "#555555" },
  { name: "Black", hex: "#343434" },
];

interface ColorAccuracyPatternProps {
  testId?: string;
}

export function ColorAccuracyPattern({ testId }: ColorAccuracyPatternProps) {
  const { registerNavigation } = useTestContext();
  const [showLabels, setShowLabels] = useState(false);

  useEffect(() => {
    registerNavigation({
      next: () => setShowLabels(v => !v),
      prev: () => setShowLabels(v => !v),
      reset: () => setShowLabels(false),
    });
  }, [registerNavigation]);

  return (
    <>
      <div className="absolute inset-0 bg-[#222222] flex items-center justify-center p-2 sm:p-4 pb-14 sm:pb-16 text-white overflow-hidden">
        <div className="w-full h-full bg-[#141414] border-2 sm:border-4 border-[#141414] rounded-lg shadow-2xl grid grid-cols-6 grid-rows-4 gap-1.5 sm:gap-2.5 p-1.5 sm:p-2.5">
          {COLOR_CHECKER.map((color, i) => (
            <div 
              key={i} 
              className="w-full h-full rounded-md shadow-sm relative group cursor-pointer transition-transform duration-200 min-h-0"
              style={{ backgroundColor: color.hex }}
            >
              <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black/75 transition-opacity rounded ${
                showLabels ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}>
                <span className="text-[10px] sm:text-xs font-medium text-center px-1 leading-tight text-white">{color.name}</span>
                <span className="text-[9px] font-mono text-white/70">{color.hex}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TestControlBar testId={testId} title="Visual Color Check (Macbeth 24)">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLabels(v => !v)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
              showLabels 
                ? "bg-amber-400 text-slate-950 font-extrabold shadow-md ring-2 ring-amber-300 border-amber-300" 
                : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border-slate-200 dark:bg-white/15 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/20 font-semibold"
            }`}
          >
            {showLabels ? "Hide Hex / Names" : "Show Hex / Names"}
          </button>
          <span className="text-xs text-amber-600 dark:text-amber-300 font-mono font-bold hidden sm:inline">
            24 Standard Reference Patches
          </span>
        </div>
      </TestControlBar>
    </>
  );
}
