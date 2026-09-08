"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";

interface SolidPatternProps {
  colors: string[];
  autoCycleInterval?: number;
  testId?: string;
}

export function SolidPattern({ colors, autoCycleInterval, testId }: SolidPatternProps) {
  const { isRunning, isPaused, setIsPaused, registerNavigation } = useTestContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize pause state based on whether autoCycle is defined
  useEffect(() => {
    if (isRunning && autoCycleInterval) {
      setIsPaused(false);
    }
  }, [isRunning, autoCycleInterval, setIsPaused]);

  const nextColor = useCallback(() => setCurrentIndex((i) => (i + 1) % colors.length), [colors.length]);
  const prevColor = useCallback(() => setCurrentIndex((i) => (i - 1 + colors.length) % colors.length), [colors.length]);

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

  useEffect(() => {
    if (!isRunning || isPaused || !autoCycleInterval) return;
    
    let animationId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      if (time - lastTime >= autoCycleInterval) {
        lastTime = time;
        setCurrentIndex((i) => (i + 1) % colors.length);
      }
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [isRunning, isPaused, autoCycleInterval, colors.length]);

  const currentColorHex = colors[currentIndex];

  return (
    <>
      <div 
        className="absolute inset-0 transition-colors duration-0"
        style={{ backgroundColor: currentColorHex }}
        onClick={autoCycleInterval ? () => setIsPaused(!isPaused) : nextColor}
      />
      
      <TestControlBar 
        testId={testId} 
        title={testId === "bright-pixel-test" ? "Bright Pixel Test" : autoCycleInterval ? "Stuck Pixel Fixer" : "Dead Pixel Test"}
      >
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={prevColor}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors text-gray-700 dark:text-gray-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Previous color"
            title="Previous color (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {autoCycleInterval && (
            <button 
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors mx-1 text-gray-700 dark:text-gray-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={!isPaused ? "Pause auto-cycle" : "Play auto-cycle"}
            >
              {!isPaused ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          )}

          <div className="flex gap-1.5 sm:gap-2 items-center px-1 sm:px-2 overflow-x-auto max-w-[220px] sm:max-w-md no-scrollbar">
            {colors.map((c, i) => (
              <button
                type="button"
                key={`${c}-${i}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Switch to test color ${c}`}
                title={`Switch to color ${c}`}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all border border-gray-300 dark:border-white/30 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  i === currentIndex ? "scale-125 ring-2 ring-gray-900/40 dark:ring-white/60 opacity-100 shadow-xs" : "opacity-40 hover:opacity-80"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <button 
            type="button"
            onClick={nextColor}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors text-gray-700 dark:text-gray-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
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
