"use client";

import { useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { Grid, ShieldAlert, Info, Maximize } from "lucide-react";

interface UniformityPatternProps {
  testId?: string;
}

interface UniformityField {
  id: string;
  label: string;
  color: string;
  textColor: string;
}

const UNIFORMITY_FIELDS: UniformityField[] = [
  { id: "black", label: "Pure Black (0%)", color: "#000000", textColor: "#FFFFFF" },
  { id: "near-black", label: "Near-Black (5%)", color: "#0D0D0D", textColor: "#FFFFFF" },
  { id: "dark-gray", label: "Dark Gray (20%)", color: "#333333", textColor: "#FFFFFF" },
  { id: "mid-gray", label: "Mid Gray (50%)", color: "#808080", textColor: "#000000" },
  { id: "light-gray", label: "Light Gray (80%)", color: "#CCCCCC", textColor: "#000000" },
  { id: "white", label: "Pure White (100%)", color: "#FFFFFF", textColor: "#000000" },
  { id: "red", label: "Pure Red", color: "#FF0000", textColor: "#FFFFFF" },
  { id: "green", label: "Pure Green", color: "#00FF00", textColor: "#000000" },
  { id: "blue", label: "Pure Blue", color: "#0000FF", textColor: "#FFFFFF" }
];

export function UniformityPattern({ testId = "uniformity-test" }: UniformityPatternProps) {
  const { toggleFullscreen } = useTestContext();
  const [activeField, setActiveField] = useState<UniformityField>(UNIFORMITY_FIELDS[3]); // Mid-gray 50% default
  const [showGrid, setShowGrid] = useState(false);
  const [gridSize, setGridSize] = useState<3 | 5>(3);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Visual Uniformity Canvas */}
      <div
        className="relative w-full aspect-video min-h-[460px] max-h-[75vh] rounded-2xl overflow-hidden border border-slate-900 shadow-2xl flex items-center justify-center p-6 select-none transition-colors duration-200"
        style={{ backgroundColor: activeField.color }}
      >
        {/* Optional 3x3 or 5x5 Alignment Grid */}
        {showGrid && (
          <div
            className={`absolute inset-0 grid pointer-events-none ${
              gridSize === 3 ? "grid-cols-3 grid-rows-3" : "grid-cols-5 grid-rows-5"
            }`}
          >
            {Array.from({ length: gridSize * gridSize }).map((_, i) => {
              const row = Math.floor(i / gridSize) + 1;
              const col = (i % gridSize) + 1;
              const isCenter = gridSize === 3 ? (row === 2 && col === 2) : (row === 3 && col === 3);

              return (
                <div
                  key={i}
                  className="border border-black/15 dark:border-white/20 p-2 flex flex-col justify-between"
                >
                  <span
                    className="text-[9px] font-mono opacity-40 font-bold"
                    style={{ color: activeField.textColor }}
                  >
                    R{row}C{col} {isCenter ? "(CENTER)" : ""}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Subtle Center Label */}
        <div
          className="text-center space-y-1 opacity-25 hover:opacity-100 transition-opacity duration-300 pointer-events-auto bg-black/40 dark:bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl"
          style={{ color: activeField.textColor }}
        >
          <span className="text-xs font-mono uppercase font-bold tracking-widest block">
            {activeField.label}
          </span>
          <span className="text-[10px] font-mono opacity-80 block">
            Inspect Center vs Corners vs Edges
          </span>
        </div>
      </div>

      {/* Control Strip */}
      <div className="mt-6 w-full max-w-4xl bg-card border border-border/70 rounded-2xl p-5 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Field Selector */}
          <div className="flex flex-wrap items-center gap-1.5 bg-muted/60 p-1.5 rounded-xl border border-border/60">
            {UNIFORMITY_FIELDS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveField(f)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeField.id === f.id
                    ? "bg-foreground text-background shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full border border-black/20 shadow-2xs shrink-0"
                  style={{ backgroundColor: f.color }}
                />
                <span>{f.label.split(" (")[0]}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGrid(prev => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-muted hover:bg-muted/80 text-foreground text-xs font-medium rounded-xl transition-colors"
            >
              <Grid className="w-3.5 h-3.5" />
              {showGrid ? "Hide Grid" : `Show ${gridSize}x${gridSize} Grid`}
            </button>
            {showGrid && (
              <button
                onClick={() => setGridSize(prev => (prev === 3 ? 5 : 3))}
                className="px-2.5 py-2 bg-muted hover:bg-muted/80 text-foreground text-xs font-mono font-medium rounded-xl transition-colors"
                title="Switch Grid Resolution"
              >
                {gridSize === 3 ? "5x5" : "3x3"}
              </button>
            )}
            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-muted hover:bg-muted/80 text-foreground text-xs font-medium rounded-xl transition-colors"
            >
              <Maximize className="w-3.5 h-3.5" />
              Fullscreen
            </button>
          </div>
        </div>

        {/* Technical Honesty Disclaimer Banner */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Hardware Boundary Notice</span>
          </div>
          <p>
            Screen Tester <strong>does not calculate a synthetic &quot;uniformity percentage&quot; or use webcam exposure measurements</strong>. Webcams and phone cameras suffer from severe lens vignetting, sensor gain artifacts, and automatic ISO compensation that misrepresent true screen luminance. Reliable Delta E or luminance uniformity profiling requires laboratory spot-photometer or colorimeter grid measurements.
          </p>
        </div>

        {/* Inspection Guidance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-muted-foreground">
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">1. Mid-Gray (50%) Inspection:</strong> The 50% neutral gray field is best for detecting dirty screen effect (DSE), diffuser clouding, and center-to-edge vignetting.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">2. Dark Gray (5% & 20%) on OLED:</strong> On OLED and QD-OLED displays, inspect the 5% near-black field in a dark room to evaluate low-luminance vertical banding.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">3. White Field (100%):</strong> Check the full white field for color temperature consistency (e.g., pink or greenish tint variations across left vs right sides).
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">4. RGB Primary Fields:</strong> Examine Red, Green, and Blue fields to ensure backlight diffusion filters are evenly distributing all color channels across the panel.
            </div>
          </div>
        </div>
      </div>

      <TestControlBar testId={testId} title="Screen Uniformity Test" />
    </div>
  );
}
