"use client";

import { useState, useEffect, useRef } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { clsx } from "clsx";

interface BloomingPatternProps {
  testId?: string;
}

const SIZES = [
  { label: "Tiny", class: "w-4 h-4" },
  { label: "Small", class: "w-12 h-12" },
  { label: "Medium", class: "w-32 h-32" },
  { label: "Large", class: "w-64 h-64" },
  { label: "Text", class: "text" },
];

export function BloomingPattern({ testId }: BloomingPatternProps) {
  const { registerNavigation, isFullscreen } = useTestContext();
  const [sizeIndex, setSizeIndex] = useState(1);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerNavigation({
      next: () => setSizeIndex((s) => (s + 1) % SIZES.length),
      prev: () => setSizeIndex((s) => (s - 1 + SIZES.length) % SIZES.length),
      reset: () => setSizeIndex(1),
    });
  }, [registerNavigation]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isFullscreen) {
        setPosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      } else if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const relX = ((e.clientX - rect.left) / rect.width) * 100;
        const relY = ((e.clientY - rect.top) / rect.height) * 100;
        setPosition({
          x: Math.max(0, Math.min(100, relX)),
          y: Math.max(0, Math.min(100, relY)),
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isFullscreen]);

  const currentSize = SIZES[sizeIndex];

  return (
    <>
      <div 
        ref={containerRef}
        className="absolute inset-0 bg-black overflow-hidden cursor-none"
      >
        <div 
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
          style={{ left: `${position.x}%`, top: `${position.y}%` }}
        >
          {currentSize.class === "text" ? (
            <div className="text-white font-serif italic text-3xl sm:text-4xl whitespace-nowrap drop-shadow-md">
              Blooming Test
            </div>
          ) : (
            <div className={clsx("bg-white rounded-full shadow-[0_0_1px_rgba(255,255,255,1)]", currentSize.class)} />
          )}
        </div>
      </div>

      <TestControlBar testId={testId} title="Local Dimming & Blooming">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono hidden md:inline">Object Size:</span>
          <div className="flex gap-1.5 bg-black/60 dark:bg-black/80 p-1 rounded-xl border border-white/20">
            {SIZES.map((s, idx) => (
              <button
                key={s.label}
                onClick={() => setSizeIndex(idx)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  sizeIndex === idx 
                    ? "bg-amber-400 text-slate-950 font-extrabold shadow-md ring-2 ring-amber-300" 
                    : "text-cyan-100 hover:text-white hover:bg-white/25 bg-white/10 border border-white/15"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </TestControlBar>
    </>
  );
}
