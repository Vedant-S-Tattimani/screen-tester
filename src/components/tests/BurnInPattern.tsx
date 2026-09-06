"use client";

import { useState, useEffect } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PATTERNS = [
  { type: "color", value: "#FF0000", label: "Red" },
  { type: "color", value: "#00FF00", label: "Green" },
  { type: "color", value: "#0000FF", label: "Blue" },
  { type: "color", value: "#FFFFFF", label: "White" },
  { type: "color", value: "#808080", label: "50% Gray" },
  { type: "checkerboard", value: "", label: "Checkerboard" },
];

interface BurnInPatternProps {
  testId?: string;
}

export function BurnInPattern({ testId }: BurnInPatternProps) {
  const { registerNavigation } = useTestContext();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    registerNavigation({
      next: () => setIndex((i) => (i + 1) % PATTERNS.length),
      prev: () => setIndex((i) => (i - 1 + PATTERNS.length) % PATTERNS.length),
      reset: () => setIndex(0),
    });
  }, [registerNavigation]);

  const currentPattern = PATTERNS[index];
  
  const nextPattern = () => setIndex((i) => (i + 1) % PATTERNS.length);
  const prevPattern = () => setIndex((i) => (i - 1 + PATTERNS.length) % PATTERNS.length);

  return (
    <>
      <div className="absolute inset-0 bg-black cursor-none" onClick={nextPattern}>
        {currentPattern.type === "color" && (
          <div 
            className="w-full h-full transition-colors duration-0" 
            style={{ backgroundColor: currentPattern.value }} 
          />
        )}
        
        {currentPattern.type === "checkerboard" && (
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: "conic-gradient(#fff 90deg, #000 90deg 180deg, #fff 180deg 270deg, #000 270deg)",
              backgroundSize: "60px 60px"
            }}
          />
        )}
      </div>
      
      <TestControlBar testId={testId} title="Burn-In & Image Retention">
        <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1 border border-border/50">
          <button 
            onClick={prevPattern}
            className="p-1 hover:bg-muted rounded transition-colors text-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium px-2 min-w-[120px] text-center text-foreground">
            {currentPattern.label}
          </span>
          <button 
            onClick={nextPattern}
            className="p-1 hover:bg-muted rounded transition-colors text-foreground"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </TestControlBar>
    </>
  );
}
