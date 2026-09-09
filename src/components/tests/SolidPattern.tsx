"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";

export interface SolidColorItem {
  hex: string;
  name: string;
  desc?: string;
}

export const STANDARD_SOLID_COLORS: SolidColorItem[] = [
  { hex: "#000000", name: "BLACK", desc: "Pure Black (0%) - Reveals stuck or glowing subpixels" },
  { hex: "#FFFFFF", name: "WHITE", desc: "Pure White (100%) - Reveals dead, dark subpixels" },
  { hex: "#FF0000", name: "RED", desc: "Pure Red - Inspect for dead red subpixels" },
  { hex: "#00FF00", name: "GREEN", desc: "Pure Green - Inspect for dead green subpixels" },
  { hex: "#0000FF", name: "BLUE", desc: "Pure Blue - Inspect for dead blue subpixels" },
  { hex: "#00FFFF", name: "CYAN", desc: "Cyan - Inspect for green/blue subpixel issues" },
  { hex: "#FF00FF", name: "MAGENTA", desc: "Magenta - Inspect for red/blue subpixel issues" },
  { hex: "#FFFF00", name: "YELLOW", desc: "Yellow - Inspect for red/green subpixel issues" },
];

interface SolidPatternProps {
  colors?: string[];
  autoCycleInterval?: number;
  testId?: string;
}

export function SolidPattern({ colors, autoCycleInterval, testId }: SolidPatternProps) {
  const { 
    isRunning, 
    isPaused, 
    setIsPaused, 
    registerNavigation,
    isAutoTest,
    isAutoTestPaused,
    setActiveColorName,
    goNextInWorkflow,
    observation,
    setObservation,
    isPixelToolActive
  } = useTestContext();

  // Normalize color list to ensure 8 standard colors are primary
  const colorList: SolidColorItem[] = colors && colors.length > 0
    ? colors.map((c, i) => {
        const match = STANDARD_SOLID_COLORS.find(sc => sc.hex.toLowerCase() === c.toLowerCase());
        return match || { hex: c, name: `Color ${i + 1}`, desc: c };
      })
    : STANDARD_SOLID_COLORS;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Sync active color name to context
  useEffect(() => {
    const current = colorList[currentIndex];
    if (current && setActiveColorName) {
      setActiveColorName(current.name);
    }
  }, [currentIndex, colorList, setActiveColorName]);

  // Initialize pause state based on whether autoCycle is defined
  useEffect(() => {
    if (isRunning && autoCycleInterval) {
      setIsPaused(false);
    }
  }, [isRunning, autoCycleInterval, setIsPaused]);

  const nextColor = useCallback(() => setCurrentIndex((i) => (i + 1) % colorList.length), [colorList.length]);
  const prevColor = useCallback(() => setCurrentIndex((i) => (i - 1 + colorList.length) % colorList.length), [colorList.length]);

  useEffect(() => {
    registerNavigation({
      next: () => {
        if (!autoCycleInterval || isPaused) nextColor();
      },
      prev: () => {
        if (!autoCycleInterval || isPaused) prevColor();
      },
      reset: () => setCurrentIndex(0),
    });
  }, [registerNavigation, nextColor, prevColor, autoCycleInterval, isPaused]);

  // Standard Stuck Pixel Fixer auto-cycle
  useEffect(() => {
    if (!isRunning || isPaused || !autoCycleInterval) return;
    
    let animationId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      if (time - lastTime >= autoCycleInterval) {
        lastTime = time;
        setCurrentIndex((i) => (i + 1) % colorList.length);
      }
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [isRunning, isPaused, autoCycleInterval, colorList.length]);

  // Guided Auto Test cycling across the 8 inspection colors (2.5 seconds per color)
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  useEffect(() => {
    if (!isAutoTest || isAutoTestPaused || autoCycleInterval) return;

    const timer = setInterval(() => {
      if (currentIndexRef.current >= colorList.length - 1) {
        // Finished all solid inspection colors -> default to PASS if no defect reported, then go next
        if (!observation) {
          setObservation("PASS");
        }
        goNextInWorkflow();
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 2500);

    return () => clearInterval(timer);
  }, [isAutoTest, isAutoTestPaused, autoCycleInterval, observation, setObservation, goNextInWorkflow, colorList.length]);

  const currentColor = colorList[currentIndex];

  const handleCanvasClick = () => {
    if (isPixelToolActive) return;
    if (autoCycleInterval) {
      setIsPaused(!isPaused);
    } else {
      nextColor();
    }
  };

  return (
    <>
      <div 
        className="absolute inset-0 transition-colors duration-0 select-none cursor-pointer"
        style={{ backgroundColor: currentColor.hex }}
        onClick={handleCanvasClick}
        title="Click to cycle to the next solid color"
      />

      {/* Floating Guidance Banner when User Reports Pixel Issue */}
      {observation === "ISSUE" && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black/90 text-white px-5 py-3 rounded-2xl border border-red-500/80 shadow-2xl backdrop-blur-md max-w-md text-center pointer-events-auto">
          <div className="flex items-center justify-center gap-1.5 text-red-400 font-mono text-xs font-bold uppercase">
            <span>⚠ Possible Pixel Issue Reported</span>
          </div>
          <div className="text-[12px] text-slate-200 mt-1 font-sans">
            Recorded during <strong>{currentColor.name}</strong> test pattern.
            <br />
            <span className="text-amber-300 font-medium">Optional:</span> Tap the screen to pin location, or click <strong>Continue</strong> to proceed.
          </div>
        </div>
      )}
      
      <TestControlBar 
        testId={testId} 
        title={testId === "bright-pixel-test" ? "Bright Pixel Test" : autoCycleInterval ? "Stuck Pixel Fixer" : "Dead & Stuck Pixel Inspection"}
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button 
            type="button"
            onClick={prevColor}
            aria-label="Previous color"
            title="Previous color (Left Arrow)"
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-amber-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {autoCycleInterval && (
            <button 
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors mx-1 text-amber-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
              aria-label={!isPaused ? "Pause auto-cycle" : "Play auto-cycle"}
            >
              {!isPaused ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          )}

          {/* Color Indicator Badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-black/70 text-white border border-white/25 text-xs font-mono shrink-0 shadow-sm">
            <span 
              className="w-3.5 h-3.5 rounded-full border border-white/60 inline-block shadow-xs" 
              style={{ backgroundColor: currentColor.hex }}
            />
            <span className="font-extrabold tracking-wider text-amber-300">{currentColor.name}</span>
            <span className="text-cyan-200 text-xs font-semibold">({currentIndex + 1}/{colorList.length})</span>
          </div>

          {/* Compact 8 color dots - clean shrink-0 flex without overflow scrollbar */}
          <div className="flex gap-1.5 items-center px-1 shrink-0">
            {colorList.map((c, i) => (
              <button
                type="button"
                key={`${c.hex}-${i}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Switch to test color ${c.name}`}
                title={`Switch to ${c.name} (${c.hex})`}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all border border-white/40 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  i === currentIndex ? "scale-125 ring-2 ring-amber-400 opacity-100 shadow-md" : "opacity-50 hover:opacity-100 hover:scale-110"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>

          <button 
            type="button"
            onClick={nextColor}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-amber-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
            aria-label="Next color"
            title="Next color (Right Arrow)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </TestControlBar>
    </>
  );
}
