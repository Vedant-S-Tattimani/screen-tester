"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { getDevicePixelRatio } from "@/lib/browserCapabilities";

interface MotionPatternProps {
  testId?: string;
}

export function MotionPattern({ testId }: MotionPatternProps) {
  const { isRunning, isPaused, registerNavigation } = useTestContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Use refs for values that change inside the animation loop to prevent React re-renders
  const speedRef = useRef(480);
  const contrastRef = useRef("high"); // high, medium, low
  
  const [speed, setSpeed] = useState(480); // pixels per second
  const [contrast, setContrast] = useState("high"); // high, medium, low

  const cycleSpeed = useCallback(() => {
    const nextSpeed = speed === 240 ? 480 : speed === 480 ? 960 : 240;
    setSpeed(nextSpeed);
    speedRef.current = nextSpeed;
  }, [speed]);

  const cycleContrast = useCallback(() => {
    const nextContrast = contrast === "high" ? "medium" : contrast === "medium" ? "low" : "high";
    setContrast(nextContrast);
    contrastRef.current = nextContrast;
  }, [contrast]);

  useEffect(() => {
    registerNavigation({
      next: cycleSpeed,
      prev: cycleContrast,
    });
  }, [registerNavigation, cycleSpeed, cycleContrast]);

  useEffect(() => {
    if (!isRunning || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // Performance optimization
    if (!ctx) return;

    const resize = () => {
      const dpr = getDevicePixelRatio();
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", resize);
    setTimeout(resize, 0);

    let animationId: number;
    let lastTime = performance.now();
    let x = 0;

    const boxSize = 80;
    
    const draw = (time: number) => {
      // Calculate delta time in seconds, cap it at 0.1s to prevent huge jumps if tab was inactive
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const currentContrast = contrastRef.current;
      const currentSpeed = speedRef.current;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width || canvas.width;
      const h = rect.height || canvas.height;

      if (!isPaused) {
        x += currentSpeed * dt;
        if (x > w + boxSize) {
          x = -boxSize;
        }
      }

      // Clear background based on contrast
      ctx.fillStyle = currentContrast === "high" ? "#000000" : currentContrast === "medium" ? "#404040" : "#808080";
      ctx.fillRect(0, 0, w, h);

      // Draw objects
      const fgColor = currentContrast === "high" ? "#FFFFFF" : currentContrast === "medium" ? "#A0A0A0" : "#C0C0C0";
      
      const gap = h / 4;
      
      for (let i = 1; i <= 3; i++) {
        const y = i * gap - boxSize / 2;
        
        // Main Block
        ctx.fillStyle = fgColor;
        ctx.fillRect(Math.round(x), Math.round(y), boxSize, boxSize);
        
        // Small detail (to check motion blur precision)
        ctx.fillStyle = currentContrast === "high" ? "#000000" : currentContrast === "medium" ? "#404040" : "#808080";
        ctx.fillRect(Math.round(x + boxSize / 4), Math.round(y + boxSize / 4), boxSize / 2, boxSize / 2);
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [isRunning, isPaused]); 

  const handleSpeedChange = (s: number) => {
    setSpeed(s);
    speedRef.current = s;
  };

  const handleContrastChange = (c: string) => {
    setContrast(c);
    contrastRef.current = c;
  };

  return (
    <>
      <div className="absolute inset-0 cursor-none">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>

      <TestControlBar testId={testId} title="Motion Blur">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest hidden md:inline">Speed</span>
            <div className="flex gap-1 bg-muted/50 p-1 rounded-lg border border-border/50">
              {[240, 480, 960].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSpeedChange(s)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    speed === s ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}px/s
                </button>
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-border/50 hidden md:block"></div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest hidden md:inline">Contrast</span>
            <div className="flex gap-1 bg-muted/50 p-1 rounded-lg border border-border/50">
              {["high", "medium", "low"].map((c) => (
                <button
                  key={c}
                  onClick={() => handleContrastChange(c)}
                  className={`px-2 py-1 rounded text-xs font-medium capitalize transition-colors ${
                    contrast === c ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </TestControlBar>
    </>
  );
}
