"use client";

import { useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { TestInlineControls } from "../test-runner/TestInlineControls";
import { Maximize, ShieldAlert, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ScalingAspectPatternProps {
  testId?: string;
}

type AspectFrameMode = "all" | "16-9" | "16-10" | "4-3" | "21-9";

export function ScalingAspectPattern({ testId = "scaling-aspect-test" }: ScalingAspectPatternProps) {
    const t = useTranslations("Tests.ScalingAspectPattern");
  const { toggleFullscreen, isFullscreen } = useTestContext();
  const [activeFrame, setActiveFrame] = useState<AspectFrameMode>("all");

  return (
    <div className={cn("relative w-full flex flex-col items-center", isFullscreen && "h-full")}>
      {/* Aspect Geometry Viewport */}
      <div className={cn(
        "relative w-full bg-slate-950 overflow-hidden flex items-center justify-center p-6 select-none",
        isFullscreen 
          ? "h-full rounded-none border-none"
          : "aspect-video min-h-[460px] max-h-[75vh] rounded-2xl border border-slate-800 shadow-2xl"
      )}>
        
        {/* Concentric Precision Circles (Identifies Non-Uniform Horizontal/Vertical Stretching) */}
        <div className="relative flex items-center justify-center pointer-events-none">
          {/* Circle 1 - Outer */}
          <div className="w-[320px] h-[320px] rounded-full border-2 border-sky-400/60 flex items-center justify-center relative">
            <span className="absolute top-2 text-[9px] font-mono text-sky-400 bg-slate-950/80 px-1.5 rounded-xs">
              {t("320pxTrueCircle")}</span>

            {/* Circle 2 - Mid */}
            <div className="w-[220px] h-[220px] rounded-full border border-emerald-400/70 flex items-center justify-center relative">
              <span className="absolute top-2 text-[9px] font-mono text-emerald-400 bg-slate-950/80 px-1.5 rounded-xs">
                {t("220pxTrueCircle")}</span>

              {/* Circle 3 - Inner */}
              <div className="w-[120px] h-[120px] rounded-full border-2 border-amber-400/80 flex items-center justify-center relative">
                <span className="absolute top-2 text-[8px] font-mono text-amber-400 bg-slate-950/80 px-1 rounded-xs">
                  {t("120px")}</span>

                {/* Center Reticle */}
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>
          </div>

          {/* Cross Axes with Pixel Inch Rulers */}
          <div className="absolute w-[440px] h-px bg-slate-600/60 flex justify-between px-2 text-[9px] font-mono text-slate-400">
            <span>{t("220px")}</span>
            <span className="font-bold text-sky-400">{t("horizontalAxis")}</span>
            <span>{t("220px_1")}</span>
          </div>
          <div className="absolute h-[380px] w-px bg-slate-600/60 flex flex-col justify-between py-2 text-[9px] font-mono text-slate-400 items-center">
            <span>{t("190px")}</span>
            <span className="font-bold text-sky-400 -rotate-90">{t("verticalAxis")}</span>
            <span>{t("190px_1")}</span>
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
              {t("43LegacyStandard")}</span>
          </div>
        )}

        {(activeFrame === "all" || activeFrame === "16-10") && (
          <div
            className="absolute border border-dashed border-amber-400/70 pointer-events-none flex items-start justify-end p-1.5"
            style={{ width: "min(92%, 640px)", aspectRatio: "16/10" }}
          >
            <span className="text-[9px] font-mono font-bold text-amber-400 bg-slate-900/90 px-1 rounded-xs">
              {t("1610LaptopProductivity")}</span>
          </div>
        )}

        {(activeFrame === "all" || activeFrame === "16-9") && (
          <div
            className="absolute border-2 border-emerald-400/80 pointer-events-none flex items-end justify-start p-1.5"
            style={{ width: "min(95%, 720px)", aspectRatio: "16/9" }}
          >
            <span className="text-[9px] font-mono font-bold text-emerald-400 bg-slate-900/90 px-1 rounded-xs">
              {t("169WidescreenStandard")}</span>
          </div>
        )}

        {(activeFrame === "all" || activeFrame === "21-9") && (
          <div
            className="absolute border border-dashed border-sky-400/80 pointer-events-none flex items-end justify-end p-1.5"
            style={{ width: "min(98%, 820px)", aspectRatio: "21/9" }}
          >
            <span className="text-[9px] font-mono font-bold text-sky-400 bg-slate-900/90 px-1 rounded-xs">
              {t("219UltrawidePanoramic")}</span>
          </div>
        )}
      </div>

      <TestInlineControls>
      {/* Control Strip */}
      <div className="mt-6 w-full max-w-4xl bg-card border border-border/70 rounded-2xl p-5 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Frame Filter */}
          <div className="flex flex-wrap items-center gap-1.5 bg-muted/60 dark:bg-white/10 p-1.5 rounded-xl border border-border/60">
            <span className="text-[11px] font-mono px-2 text-amber-500 dark:text-amber-300 font-bold uppercase tracking-wider">{t("guides")}</span>
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
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeFrame === f.id
                    ? "bg-amber-500 dark:bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300 font-extrabold"
                    : "text-slate-700 dark:text-slate-200 hover:text-foreground hover:bg-muted font-semibold"
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
            {t("fullscreen")}</button>
        </div>

        {/* Technical Honesty Disclaimer Banner */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{t("hardwareBoundaryNotice")}</span>
          </div>
          <p>
            {t("theBrowserViewportRenders")}<strong>{t("ifThePhysicalPanel")}</strong>{t("inspectTheCirclesPhysically")}</p>
        </div>

        {/* Diagnostic Guidance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-muted-foreground">
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("1CircleGeometryCheck")}</strong> {t("ifTheCentralCircles")}</div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("2UltrawideMonitors21")}</strong> {t("whenRunning169")}</div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("3GpuAspectRatio")}</strong> {t("inNvidiaControlPanel")}<strong>{t("aspectRatio")}</strong> {t("selected")}</div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("4PhysicalRulerTest")}</strong> {t("holdAPhysicalRuler")}</div>
          </div>
        </div>
      </div>
      </TestInlineControls>

      <TestControlBar testId={testId} title={t("scalingAspectRatioInspectionTitle")} />
    </div>
  );
}
