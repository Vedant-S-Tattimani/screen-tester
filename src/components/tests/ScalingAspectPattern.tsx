"use client";

import { useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { Maximize, ShieldAlert, Info } from "lucide-react";

interface ScalingAspectPatternProps {
  testId?: string;
}

type AspectFrameMode = "all" | "16-9" | "16-10" | "4-3" | "21-9";

export function ScalingAspectPattern({ testId = "scaling-aspect-test" }: ScalingAspectPatternProps) {
  const { toggleFullscreen } = useTestContext();
  const [activeFrame, setActiveFrame] = useState<AspectFrameMode>("all");

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Aspect Geometry Viewport */}
      <div className="relative w-full aspect-video min-h-[460px] max-h-[75vh] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center p-6 select-none">
        
        {/* Concentric Precision Circles (Identifies Non-Uniform Horizontal/Vertical Stretching) */}
        <div className="relative flex items-center justify-center pointer-events-none">
          {/* Circle 1 - Outer */}
          <div className="w-[320px] h-[320px] rounded-full border-2 border-sky-400/60 flex items-center justify-center relative">
            <span className="absolute top-2 text-[9px] font-mono text-sky-400 bg-slate-950/80 px-1.5 rounded-xs">
              320px True Circle
            </span>

            {/* Circle 2 - Mid */}
            <div className="w-[220px] h-[220px] rounded-full border border-emerald-400/70 flex items-center justify-center relative">
              <span className="absolute top-2 text-[9px] font-mono text-emerald-400 bg-slate-950/80 px-1.5 rounded-xs">
                220px True Circle
              </span>

              {/* Circle 3 - Inner */}
              <div className="w-[120px] h-[120px] rounded-full border-2 border-amber-400/80 flex items-center justify-center relative">
                <span className="absolute top-2 text-[8px] font-mono text-amber-400 bg-slate-950/80 px-1 rounded-xs">
                  120px
                </span>

                {/* Center Reticle */}
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>
          </div>

          {/* Cross Axes with Pixel Inch Rulers */}
          <div className="absolute w-[440px] h-px bg-slate-600/60 flex justify-between px-2 text-[9px] font-mono text-slate-400">
            <span>-220px</span>
            <span className="font-bold text-sky-400">Horizontal Axis</span>
            <span>+220px</span>
          </div>
          <div className="absolute h-[380px] w-px bg-slate-600/60 flex flex-col justify-between py-2 text-[9px] font-mono text-slate-400 items-center">
            <span>-190px</span>
            <span className="font-bold text-sky-400 -rotate-90">Vertical Axis</span>
            <span>+190px</span>
          </div>
        </div>

        {/* 100px Square Grid Overlay (Identifies Squashing) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            backgroundPosition: "center center"
          }}
        />

        {/* Aspect Ratio Bounding Frames */}
        {(activeFrame === "all" || activeFrame === "4-3") && (
          <div
            className="absolute border border-dashed border-rose-500/70 pointer-events-none flex items-start justify-start p-1.5"
            style={{ width: "min(90%, 540px)", aspectRatio: "4/3" }}
          >
            <span className="text-[9px] font-mono font-bold text-rose-400 bg-slate-900/90 px-1 rounded-xs">
              4:3 Legacy Standard
            </span>
          </div>
        )}

        {(activeFrame === "all" || activeFrame === "16-10") && (
          <div
            className="absolute border border-dashed border-amber-400/70 pointer-events-none flex items-start justify-end p-1.5"
            style={{ width: "min(92%, 640px)", aspectRatio: "16/10" }}
          >
            <span className="text-[9px] font-mono font-bold text-amber-400 bg-slate-900/90 px-1 rounded-xs">
              16:10 Laptop & Productivity
            </span>
          </div>
        )}

        {(activeFrame === "all" || activeFrame === "16-9") && (
          <div
            className="absolute border-2 border-emerald-400/80 pointer-events-none flex items-end justify-start p-1.5"
            style={{ width: "min(95%, 720px)", aspectRatio: "16/9" }}
          >
            <span className="text-[9px] font-mono font-bold text-emerald-400 bg-slate-900/90 px-1 rounded-xs">
              16:9 Widescreen Standard
            </span>
          </div>
        )}

        {(activeFrame === "all" || activeFrame === "21-9") && (
          <div
            className="absolute border border-dashed border-sky-400/80 pointer-events-none flex items-end justify-end p-1.5"
            style={{ width: "min(98%, 820px)", aspectRatio: "21/9" }}
          >
            <span className="text-[9px] font-mono font-bold text-sky-400 bg-slate-900/90 px-1 rounded-xs">
              21:9 Ultrawide Panoramic
            </span>
          </div>
        )}
      </div>

      {/* Control Strip */}
      <div className="mt-6 w-full max-w-4xl bg-card border border-border/70 rounded-2xl p-5 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Frame Filter */}
          <div className="flex flex-wrap items-center gap-1.5 bg-muted/60 p-1.5 rounded-xl border border-border/60">
            <span className="text-[11px] font-mono px-2 text-muted-foreground uppercase">Guides:</span>
            {[
              { id: "all", label: "All Frames" },
              { id: "16-9", label: "16:9 Widescreen" },
              { id: "16-10", label: "16:10 Productivity" },
              { id: "4-3", label: "4:3 Standard" },
              { id: "21-9", label: "21:9 Ultrawide" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFrame(f.id as AspectFrameMode)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeFrame === f.id
                    ? "bg-foreground text-background shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-muted hover:bg-muted/80 text-foreground text-xs font-medium rounded-xl transition-colors"
          >
            <Maximize className="w-3.5 h-3.5" />
            Fullscreen
          </button>
        </div>

        {/* Technical Honesty Disclaimer Banner */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Hardware Boundary Notice</span>
          </div>
          <p>
            The browser viewport renders CSS geometric primitives with mathematically equal horizontal and vertical pixel units. However, <strong>if the physical panel has an unusual non-square pixel aspect ratio, or if GPU scaling is set to &apos;Stretch&apos; instead of &apos;Maintain Aspect Ratio&apos;, circles will appear distorted into ovals</strong>. Inspect the circles physically or with an external ruler to confirm true geometry.
          </p>
        </div>

        {/* Diagnostic Guidance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-muted-foreground">
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">1. Circle Geometry Check:</strong> If the central circles look elongated into horizontal or vertical ellipses, your graphics driver or display OSD is stretching a mismatched resolution.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">2. Ultrawide Monitors (21:9 / 32:9):</strong> When running 16:9 content on an ultrawide monitor, ensure your monitor OSD is set to &apos;Aspect&apos; or &apos;1:1&apos; so pillarbox black bars appear on the sides rather than stretching.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">3. GPU Aspect Ratio Scaling:</strong> In NVIDIA Control Panel or AMD Software, set &apos;Perform scaling on&apos; to GPU or Display with <strong>Aspect ratio</strong> selected.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">4. Physical Ruler Test:</strong> Hold a physical ruler up to the screen. The width of the 320px outer circle should match its height within 1mm.
            </div>
          </div>
        </div>
      </div>

      <TestControlBar testId={testId} title="Scaling & Aspect Ratio Inspection" />
    </div>
  );
}
