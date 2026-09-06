"use client";

import { useEffect, useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { Sparkles, Eye, Layers, Palette, Info } from "lucide-react";

interface ColorGamutPatternProps {
  testId?: string;
}

type GamutViewMode = "target" | "swatches" | "ramp";

export function ColorGamutPattern({ testId }: ColorGamutPatternProps) {
  const { registerNavigation } = useTestContext();
  const [p3Supported, setP3Supported] = useState<boolean>(false);
  const [rec2020Supported, setRec2020Supported] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<GamutViewMode>("target");
  const [targetChannel, setTargetChannel] = useState<"red" | "green" | "blue">("red");

  useEffect(() => {
    registerNavigation({});
    if (typeof window !== "undefined") {
      setTimeout(() => {
        setP3Supported(window.matchMedia('(color-gamut: p3)').matches);
        setRec2020Supported(window.matchMedia('(color-gamut: rec2020)').matches);
      }, 0);
    }
  }, [registerNavigation]);

  return (
    <>
      <div className="absolute inset-0 bg-[#09090b] flex flex-col items-center justify-center p-4 sm:p-8 text-white select-none overflow-y-auto">
        <div className="max-w-4xl w-full flex flex-col items-center gap-6 my-auto">
          
          {/* Header & Gamut Detection Status */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full bg-white/5 border border-white/10 rounded-2xl p-4 sm:px-6 backdrop-blur-md">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/50 font-semibold font-mono">
                Hardware & Pipeline Diagnostic
              </div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2 mt-0.5">
                Wide Color Gamut (DCI-P3 / BT.2020)
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60 font-medium">Display Gamut:</span>
              {p3Supported ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Sparkles className="w-3 h-3" /> DCI-P3 Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70 border border-white/10">
                  sRGB Baseline
                </span>
              )}
              {rec2020Supported && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Rec.2020
                </span>
              )}
            </div>
          </div>

          {/* Mode Switcher */}
          <div role="tablist" aria-label="Color Gamut View Modes" className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            <button
              role="tab"
              aria-selected={activeTab === "target"}
              onClick={() => setActiveTab("target")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                activeTab === "target" ? "bg-white text-black shadow-xs font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Optical Detection Target</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "swatches"}
              onClick={() => setActiveTab("swatches")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                activeTab === "swatches" ? "bg-white text-black shadow-xs font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>sRGB vs P3 Swatches</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "ramp"}
              onClick={() => setActiveTab("ramp")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                activeTab === "ramp" ? "bg-white text-black shadow-xs font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Spectral Ramp</span>
            </button>
          </div>

          {/* TAB 1: Optical Detection Target */}
          {activeTab === "target" && (
            <div className="w-full flex flex-col items-center gap-4">
              {/* Channel Selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-white/50">Primary Channel:</span>
                {(["red", "green", "blue"] as const).map(ch => (
                  <button
                    key={ch}
                    onClick={() => setTargetChannel(ch)}
                    className={`capitalize px-3 py-1 rounded-md text-xs font-medium border transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
                      targetChannel === ch 
                        ? "bg-white/20 border-white/40 text-white font-semibold" 
                        : "border-white/10 text-white/50 hover:text-white"
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>

              {/* Visual Detection Canvas / Box */}
              <div className="relative w-full max-w-lg aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center">
                {/* sRGB Base Background */}
                <div 
                  className="absolute inset-0 transition-colors"
                  style={{ 
                    backgroundColor: targetChannel === "red" 
                      ? "rgb(255, 0, 0)" 
                      : targetChannel === "green" 
                      ? "rgb(0, 255, 0)" 
                      : "rgb(0, 0, 255)" 
                  }}
                />

                {/* Embedded Wide P3 Target Symbol */}
                <div 
                  className="relative z-10 p-8 rounded-full flex flex-col items-center justify-center transition-transform hover:scale-105 select-none"
                  style={{
                    backgroundColor: targetChannel === "red"
                      ? "color(display-p3 1 0 0)"
                      : targetChannel === "green"
                      ? "color(display-p3 0 1 0)"
                      : "color(display-p3 0 0 1)"
                  }}
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-dashed border-white/40 flex flex-col items-center justify-center text-center p-3">
                    <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-white drop-shadow-md">
                      DCI-P3
                    </span>
                    <span className="text-[10px] font-mono text-white/90 drop-shadow-sm mt-0.5">
                      TARGET
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-center bg-black/60 backdrop-blur-xs py-1.5 px-3 rounded-lg text-[11px] text-white/90 font-mono">
                  {p3Supported ? "P3 Active: Target symbol is visibly distinguishable" : "sRGB: Symbol is invisible or clipped to background"}
                </div>
              </div>

              {/* Explanatory Guide */}
              <div className="flex items-start gap-2.5 max-w-xl text-xs text-white/60 bg-white/5 border border-white/10 p-3.5 rounded-xl">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <p>
                  <strong>How this test works:</strong> The outer background is maximum sRGB (100%). The circular emblem inside is rendered in wide-gamut Display P3. On standard sRGB displays, both colors clamp identically, making the emblem invisible. On a true wide-gamut display (Apple Retina, OLED, DCI-P3 95%+), the inner emblem clearly reveals itself.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Comparison Swatches */}
          {activeTab === "swatches" && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* sRGB Column */}
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold tracking-widest text-white/70 uppercase font-mono">Standard sRGB</span>
                  <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded">Rec.709</span>
                </div>
                <div className="space-y-3 w-full">
                  <div className="h-20 w-full rounded-xl flex items-end p-2.5 shadow-inner" style={{ backgroundColor: 'rgb(255, 0, 0)' }}>
                    <span className="text-[10px] font-mono text-white/90 bg-black/50 px-2 py-0.5 rounded">sRGB Red</span>
                  </div>
                  <div className="h-20 w-full rounded-xl flex items-end p-2.5 shadow-inner" style={{ backgroundColor: 'rgb(0, 255, 0)' }}>
                    <span className="text-[10px] font-mono text-black/90 bg-white/60 px-2 py-0.5 rounded">sRGB Green</span>
                  </div>
                  <div className="h-20 w-full rounded-xl flex items-end p-2.5 shadow-inner" style={{ backgroundColor: 'rgb(0, 0, 255)' }}>
                    <span className="text-[10px] font-mono text-white/90 bg-black/50 px-2 py-0.5 rounded">sRGB Blue</span>
                  </div>
                </div>
              </div>

              {/* Display P3 Column */}
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold tracking-widest text-white/70 uppercase font-mono">Wide Display P3</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">+25% Volume</span>
                </div>
                <div className="space-y-3 w-full">
                  <div className="h-20 w-full rounded-xl flex items-end p-2.5 shadow-inner" style={{ backgroundColor: 'color(display-p3 1 0 0)' }}>
                    <span className="text-[10px] font-mono text-white/90 bg-black/50 px-2 py-0.5 rounded">P3 Wide Red</span>
                  </div>
                  <div className="h-20 w-full rounded-xl flex items-end p-2.5 shadow-inner" style={{ backgroundColor: 'color(display-p3 0 1 0)' }}>
                    <span className="text-[10px] font-mono text-black/90 bg-white/60 px-2 py-0.5 rounded">P3 Wide Green</span>
                  </div>
                  <div className="h-20 w-full rounded-xl flex items-end p-2.5 shadow-inner" style={{ backgroundColor: 'color(display-p3 0 0 1)' }}>
                    <span className="text-[10px] font-mono text-white/90 bg-black/50 px-2 py-0.5 rounded">P3 Wide Blue</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Spectral Ramp */}
          {activeTab === "ramp" && (
            <div className="w-full bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="text-xs uppercase tracking-wider text-white/60 font-mono font-semibold">
                Continuous Gamut Saturation Ramp
              </div>
              <div className="space-y-3">
                <div className="h-12 w-full rounded-lg" style={{ background: "linear-gradient(to right, rgb(0,0,0), rgb(255,0,0))" }} />
                <div className="flex justify-between text-[11px] font-mono text-white/50">
                  <span>sRGB 0% Red</span>
                  <span>sRGB 100% Red</span>
                </div>
                <div className="h-12 w-full rounded-lg" style={{ background: "linear-gradient(to right, rgb(0,0,0), color(display-p3 1 0 0))" }} />
                <div className="flex justify-between text-[11px] font-mono text-white/50">
                  <span>P3 0% Red</span>
                  <span>P3 100% Saturated Red</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <TestControlBar testId={testId} title="Color Gamut (DCI-P3)">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Status:</span>
          <span className={`font-mono px-2.5 py-1 rounded text-[11px] font-semibold ${
            p3Supported ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-muted text-muted-foreground"
          }`}>
            {p3Supported ? "Wide Gamut Detected" : "Standard Gamut (sRGB)"}
          </span>
        </div>
      </TestControlBar>
    </>
  );
}