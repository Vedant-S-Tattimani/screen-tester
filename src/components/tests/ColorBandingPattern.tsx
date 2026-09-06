"use client";

import { useState, useEffect } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GRADIENTS = [
  { label: "Grayscale (8-bit Smooth)", css: "linear-gradient(to right, #000000, #FFFFFF)" },
  { label: "Grayscale (Vertical)", css: "linear-gradient(to bottom, #000000, #FFFFFF)" },
  { label: "Red Banding", css: "linear-gradient(to right, #220000, #FF0000)" },
  { label: "Green Banding", css: "linear-gradient(to right, #002200, #00FF00)" },
  { label: "Blue Banding", css: "linear-gradient(to right, #000022, #0000FF)" },
  { label: "Mixed Color Banding", css: "linear-gradient(to right, #FF0000, #00FF00, #0000FF)" },
];

interface ColorBandingPatternProps {
  testId?: string;
}

export function ColorBandingPattern({ testId }: ColorBandingPatternProps) {
  const { registerNavigation } = useTestContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    registerNavigation({
      next: () => setCurrentIndex((i) => (i + 1) % GRADIENTS.length),
      prev: () => setCurrentIndex((i) => (i - 1 + GRADIENTS.length) % GRADIENTS.length),
      reset: () => setCurrentIndex(0),
    });
  }, [registerNavigation]);

  const nextPattern = () => setCurrentIndex((i) => (i + 1) % GRADIENTS.length);
  const prevPattern = () => setCurrentIndex((i) => (i - 1 + GRADIENTS.length) % GRADIENTS.length);

  return (
    <>
      <div 
        className="absolute inset-0 transition-colors duration-0 cursor-none"
        style={{ background: GRADIENTS[currentIndex].css }}
        onClick={nextPattern}
      />
      <TestControlBar testId={testId} title="Color Banding">
        <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1 border border-border/50">
          <button 
            onClick={prevPattern}
            className="p-1 hover:bg-muted rounded transition-colors text-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium px-2 min-w-[180px] text-center text-foreground">
            {GRADIENTS[currentIndex].label}
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
