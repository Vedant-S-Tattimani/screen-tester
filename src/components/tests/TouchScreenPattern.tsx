"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { RotateCcw } from "lucide-react";

interface TouchPoint {
  identifier: number;
  x: number;
  y: number;
}

interface TouchScreenPatternProps {
  testId?: string;
}

const COLORS = [
  "bg-red-500 shadow-red-500/50",
  "bg-emerald-500 shadow-emerald-500/50",
  "bg-blue-500 shadow-blue-500/50",
  "bg-amber-500 shadow-amber-500/50", 
  "bg-purple-500 shadow-purple-500/50",
  "bg-cyan-500 shadow-cyan-500/50",
  "bg-orange-500 shadow-orange-500/50",
  "bg-pink-500 shadow-pink-500/50", 
  "bg-teal-500 shadow-teal-500/50",
  "bg-indigo-500 shadow-indigo-500/50"
];

export function TouchScreenPattern({ testId }: TouchScreenPatternProps) {
  const { registerNavigation, isFullscreen } = useTestContext();
  const [touches, setTouches] = useState<TouchPoint[]>([]);
  const [maxTouches, setMaxTouches] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetCount = useCallback(() => {
    setTouches([]);
    setMaxTouches(0);
  }, []);

  useEffect(() => {
    registerNavigation({
      reset: resetCount,
    });
  }, [registerNavigation, resetCount]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const extractTouches = (e: TouchEvent): TouchPoint[] => {
      const rect = isFullscreen ? { left: 0, top: 0 } : el.getBoundingClientRect();
      return Array.from(e.touches).map(t => ({
        identifier: t.identifier,
        x: t.clientX - rect.left,
        y: t.clientY - rect.top,
      }));
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const current = extractTouches(e);
      setTouches(current);
      setMaxTouches(prev => Math.max(prev, current.length));
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      setTouches(extractTouches(e));
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      setTouches(extractTouches(e));
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: false });
    el.addEventListener("touchcancel", handleTouchEnd, { passive: false });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [isFullscreen]);

  return (
    <>
      <div 
        ref={containerRef}
        className="absolute inset-0 bg-black overflow-hidden select-none touch-none cursor-crosshair"
      >
        {/* Visual grid reference */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        
        {touches.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-white/40 text-sm sm:text-base font-mono uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-xs">
              Touch or multi-touch inside this area
            </div>
          </div>
        ) : (
          touches.map((t, i) => (
            <div 
              key={t.identifier}
              className={`absolute w-14 h-14 -translate-x-1/2 -translate-y-1/2 rounded-full ${COLORS[i % COLORS.length]} flex items-center justify-center text-white font-bold text-sm shadow-lg pointer-events-none transition-transform duration-75`}
              style={{ left: t.x, top: t.y }}
            >
              {i + 1}
            </div>
          ))
        )}
      </div>

      <TestControlBar testId={testId} title="Multi-Touch Screen Check">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 font-mono text-xs">
            <div>
              <span className="text-muted-foreground mr-1">Active:</span>
              <span className="text-foreground font-semibold px-2 py-0.5 bg-muted rounded">{touches.length}</span>
            </div>
            <div>
              <span className="text-muted-foreground mr-1">Peak:</span>
              <span className="text-foreground font-semibold px-2 py-0.5 bg-muted rounded">{maxTouches}</span>
            </div>
          </div>

          <button
            onClick={resetCount}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-muted/50 text-muted-foreground hover:text-foreground border border-border/50 transition-colors"
            title="Reset peak count"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Counter</span>
          </button>
        </div>
      </TestControlBar>
    </>
  );
}
