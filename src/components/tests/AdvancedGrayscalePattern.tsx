"use client";

import { useState, useEffect } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MODES = [
  { id: "smooth", label: "Smooth Gradient" },
  { id: "steps", label: "11-Step Grayscale" },
  { id: "shadow", label: "Shadow Detail (Near Black)" },
  { id: "highlight", label: "Highlight Detail (Near White)" }
];

interface AdvancedGrayscalePatternProps {
  testId?: string;
}

export function AdvancedGrayscalePattern({ testId }: AdvancedGrayscalePatternProps) {
  const { registerNavigation } = useTestContext();
  const [modeIndex, setModeIndex] = useState(0);

  useEffect(() => {
    registerNavigation({
      next: () => setModeIndex((i) => (i + 1) % MODES.length),
      prev: () => setModeIndex((i) => (i - 1 + MODES.length) % MODES.length),
      reset: () => setModeIndex(0),
    });
  }, [registerNavigation]);

  const mode = MODES[modeIndex];
  
  const nextMode = () => setModeIndex((i) => (i + 1) % MODES.length);
  const prevMode = () => setModeIndex((i) => (i - 1 + MODES.length) % MODES.length);

  return (
    <>
      <div className="absolute inset-0 cursor-none flex items-center justify-center overflow-hidden bg-black" onClick={nextMode}>
        {mode.id === "smooth" && (
          <div className="w-full h-full" style={{ background: "linear-gradient(to right, #000, #FFF)" }} />
        )}

        {mode.id === "steps" && (
          <div className="w-full h-full flex">
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(val => (
              <div key={val} className="flex-1 h-full" style={{ backgroundColor: `hsl(0, 0%, ${val}%)` }} />
            ))}
          </div>
        )}

        {mode.id === "shadow" && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="grid grid-cols-5 gap-px bg-[#333] border border-[#333] p-px w-full max-w-5xl h-32 md:h-64">
              {[1, 2, 3, 4, 5].map(val => (
                <div key={val} className="flex flex-col items-center justify-center font-mono text-white/50 text-xl md:text-2xl" style={{ backgroundColor: `rgb(${val*2}, ${val*2}, ${val*2})` }}>
                  {val}%
                </div>
              ))}
            </div>
          </div>
        )}

        {mode.id === "highlight" && (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="grid grid-cols-5 gap-px bg-[#CCC] border border-[#CCC] p-px w-full max-w-5xl h-32 md:h-64">
              {[250, 251, 252, 253, 254].map(val => (
                <div key={val} className="flex flex-col items-center justify-center font-mono text-black/50 text-xl md:text-2xl" style={{ backgroundColor: `rgb(${val}, ${val}, ${val})` }}>
                  {Math.round((val/255)*100)}%
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <TestControlBar testId={testId} title="Grayscale & Contrast">
        <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1 border border-border/50">
          <button 
            onClick={prevMode}
            className="p-1 hover:bg-muted rounded transition-colors text-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium px-2 min-w-[180px] text-center text-foreground">
            {mode.label}
          </span>
          <button 
            onClick={nextMode}
            className="p-1 hover:bg-muted rounded transition-colors text-foreground"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </TestControlBar>
    </>
  );
}
