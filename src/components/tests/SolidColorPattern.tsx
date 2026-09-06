"use client";

import { useEffect, useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STANDARD_COLORS = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Red", value: "#FF0000" },
  { name: "Green", value: "#00FF00" },
  { name: "Blue", value: "#0000FF" },
  { name: "Cyan", value: "#00FFFF" },
  { name: "Magenta", value: "#FF00FF" },
  { name: "Yellow", value: "#FFFF00" },
  { name: "50% Gray", value: "#808080" },
];

interface SolidColorPatternProps {
  testId?: string;
}

export function SolidColorPattern({ testId }: SolidColorPatternProps) {
  const { registerNavigation } = useTestContext();
  const [index, setIndex] = useState(0);
  const [customHex, setCustomHex] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  useEffect(() => {
    registerNavigation({
      next: () => {
        setUseCustom(false);
        setIndex((i) => (i + 1) % STANDARD_COLORS.length);
      },
      prev: () => {
        setUseCustom(false);
        setIndex((i) => (i - 1 + STANDARD_COLORS.length) % STANDARD_COLORS.length);
      },
      reset: () => {
        setUseCustom(false);
        setIndex(0);
      },
    });
  }, [registerNavigation]);

  const currentColor = useCustom && customHex.match(/^#([0-9A-F]{3}){1,2}$/i) 
    ? customHex 
    : STANDARD_COLORS[index].value;

  const nextColor = () => {
    setUseCustom(false);
    setIndex((i) => (i + 1) % STANDARD_COLORS.length);
  };
  const prevColor = () => {
    setUseCustom(false);
    setIndex((i) => (i - 1 + STANDARD_COLORS.length) % STANDARD_COLORS.length);
  };

  return (
    <>
      <div 
        className="absolute inset-0 cursor-none transition-colors duration-300"
        style={{ backgroundColor: currentColor }}
        onClick={nextColor}
      />
      <TestControlBar testId={testId} title="Solid Color Purity">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 border border-border/50">
            <button 
              onClick={prevColor}
              className="p-1 hover:bg-muted rounded transition-colors text-foreground"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-medium px-2 min-w-[70px] text-center text-foreground">
              {STANDARD_COLORS[index].name}
            </span>
            <button 
              onClick={nextColor}
              className="p-1 hover:bg-muted rounded transition-colors text-foreground"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-border/50 hidden md:block"></div>
          
          <div className="flex items-center gap-2">
            <label className="text-foreground text-xs font-medium">Custom HEX:</label>
            <input 
              type="text" 
              placeholder="#FF6B00"
              value={customHex}
              onChange={(e) => {
                const val = e.target.value;
                setCustomHex(val);
                if (val.match(/^#([0-9A-F]{3}){1,2}$/i)) {
                  setUseCustom(true);
                }
              }}
              onFocus={() => {
                if (customHex.match(/^#([0-9A-F]{3}){1,2}$/i)) {
                  setUseCustom(true);
                }
              }}
              className="bg-transparent border border-border rounded px-2 py-1 text-foreground font-mono text-xs outline-none focus:border-foreground w-24 transition-colors"
            />
          </div>
        </div>
      </TestControlBar>
    </>
  );
}
