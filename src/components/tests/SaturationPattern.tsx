"use client";

import { useEffect, useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";

interface SaturationPatternProps {
  testId?: string;
}

type Mode = "all" | "hue" | "rgb";

export function SaturationPattern({ testId }: SaturationPatternProps) {
  const { registerNavigation } = useTestContext();
  const [mode, setMode] = useState<Mode>("all");

  useEffect(() => {
    registerNavigation({
      next: () => setMode(m => m === "all" ? "hue" : m === "hue" ? "rgb" : "all"),
      prev: () => setMode(m => m === "all" ? "rgb" : m === "rgb" ? "hue" : "all"),
      reset: () => setMode("all"),
    });
  }, [registerNavigation]);

  return (
    <>
      <div className="absolute inset-0 flex flex-col bg-black overflow-hidden">
        {/* Hue Spectrum */}
        {(mode === "all" || mode === "hue") && (
          <div 
            className="flex-1 w-full"
            style={{ 
              background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
            }}
          />
        )}
        
        {/* Saturation Steps (Red, Green, Blue) */}
        {(mode === "all" || mode === "rgb") && (
          <>
            <div className="flex-1 w-full flex">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={`r-${i}`} 
                  className="flex-1 h-full"
                  style={{ backgroundColor: `hsl(0, ${100 - i * 5}%, 50%)` }}
                />
              ))}
            </div>

            <div className="flex-1 w-full flex">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={`g-${i}`} 
                  className="flex-1 h-full"
                  style={{ backgroundColor: `hsl(120, ${100 - i * 5}%, 50%)` }}
                />
              ))}
            </div>

            <div className="flex-1 w-full flex">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={`b-${i}`} 
                  className="flex-1 h-full"
                  style={{ backgroundColor: `hsl(240, ${100 - i * 5}%, 50%)` }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <TestControlBar testId={testId} title="Color Saturation & Transitions">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest hidden md:inline">Mode</span>
          <div className="flex gap-1 bg-muted/50 p-1 rounded-lg border border-border/50">
            {(["all", "hue", "rgb"] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-2.5 py-1 rounded text-xs font-medium uppercase transition-colors ${
                  mode === m ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "all" ? "Combined" : m === "hue" ? "Rainbow" : "RGB Steps"}
              </button>
            ))}
          </div>
        </div>
      </TestControlBar>
    </>
  );
}
