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
      
      <TestControlBar testId={testId} title={autoCycleInterval ? "Stuck Pixel Fixer" : "Dead Pixel Test"}>
        <div className="flex items-center gap-2">
          <button 
            onClick={prevColor}
            className="p-1.5 hover:bg-muted rounded-full transition-colors border border-transparent hover:border-border text-foreground"
            aria-label="Previous color"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {autoCycleInterval && (
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 hover:bg-muted rounded-full transition-colors mx-1 border border-transparent hover:border-border text-foreground"
            >
              {!isPaused ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          )}

          <div className="flex gap-1.5 items-center px-3">
            {colors.map((c, i) => (
              <div 
                key={`${c}-${i}`}
                className={`w-3 h-3 rounded-full transition-all border border-border/50 ${
                  i === currentIndex ? "scale-125 ring-2 ring-foreground/20" : "opacity-30"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <button 
            onClick={nextColor}
            className="p-1.5 hover:bg-muted rounded-full transition-colors border border-transparent hover:border-border text-foreground"
            aria-label="Next color"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </TestControlBar>
    </>
  );
}
