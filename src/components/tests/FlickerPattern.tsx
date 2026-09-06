"use client";

import { useEffect, useRef, useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { Play, Pause } from "lucide-react";

interface FlickerPatternProps {
  testId?: string;
}

const SPEEDS = [
  { label: "1F (Fast)", value: 1 },
  { label: "2F", value: 2 },
  { label: "4F", value: 4 },
  { label: "8F (Slow)", value: 8 },
];

export function FlickerPattern({ testId }: FlickerPatternProps) {
  const { isRunning, isPaused, setIsPaused, registerNavigation } = useTestContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [speed, setSpeed] = useState(2);

  const speedRef = useRef(speed);
  const pausedRef = useRef(isPaused);

  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { pausedRef.current = isPaused; }, [isPaused]);

  useEffect(() => {
    registerNavigation({
      next: () => {
        const nextIdx = (SPEEDS.findIndex(s => s.value === speedRef.current) + 1) % SPEEDS.length;
        setSpeed(SPEEDS[nextIdx].value);
      },
      prev: () => {
        const prevIdx = (SPEEDS.findIndex(s => s.value === speedRef.current) - 1 + SPEEDS.length) % SPEEDS.length;
        setSpeed(SPEEDS[prevIdx].value);
      },
      reset: () => setSpeed(2),
    });
  }, [registerNavigation]);

  useEffect(() => {
    if (!isRunning || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationId: number;
    let frameCount = 0;
    let isWhite = false;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width));
      canvas.height = Math.max(1, Math.floor(rect.height));
    };

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      
      if (pausedRef.current) return;

      frameCount++;
      if (frameCount >= speedRef.current) {
        frameCount = 0;
        isWhite = !isWhite;
        
        ctx.fillStyle = isWhite ? "#FFFFFF" : "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener("resize", resize);
    resize();
    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [isRunning]);

  return (
    <>
      <div className="absolute inset-0 bg-black overflow-hidden">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>

      <TestControlBar testId={testId} title="PWM Screen Flicker">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 hover:bg-muted rounded-full transition-colors border border-border/50 text-foreground"
            title={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-border/50">
            {SPEEDS.map(s => (
              <button
                key={s.value}
                onClick={() => setSpeed(s.value)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  speed === s.value ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-amber-500 font-medium hidden sm:inline">
            Visual Strobe Aid
          </span>
        </div>
      </TestControlBar>
    </>
  );
}
