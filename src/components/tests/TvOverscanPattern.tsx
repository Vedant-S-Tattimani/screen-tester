"use client";

import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { TestInlineControls } from "../test-runner/TestInlineControls";
import { Tv, ShieldAlert, Info, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface TvOverscanPatternProps {
  testId?: string;
}

export function TvOverscanPattern({ testId = "tv-overscan-test" }: TvOverscanPatternProps) {
    const t = useTranslations("Tests.TvOverscanPattern");
  const { toggleFullscreen, isFullscreen } = useTestContext();

  return (
    <div className={cn("relative w-full flex flex-col items-center", isFullscreen && "h-full")}>
      {/* Pattern Viewport */}
      <div className={cn(
        "relative w-full bg-slate-950 overflow-hidden flex items-center justify-center select-none",
        isFullscreen 
          ? "h-full rounded-none border-none"
          : "aspect-video min-h-[460px] max-h-[75vh] rounded-2xl border border-slate-800 shadow-2xl"
      )}>
        
        {/* Outer 1px Cyan Edge Border (0% boundary - absolute extreme edge) */}
        <div className="absolute inset-0 border border-cyan-400 pointer-events-none" />

        {/* 2px Green Edge Border (1px inset) */}
        <div className="absolute inset-0.5 border-2 border-emerald-400 pointer-events-none" />

        {/* 5px Amber Safe Border (4px inset) */}
        <div className="absolute inset-1.5 border-2 border-amber-400/80 pointer-events-none" />

        {/* 10px Red Action Safe Border (10px inset) */}
        <div className="absolute inset-3 border border-dashed border-rose-500/80 pointer-events-none" />

        {/* Corner Position Labels */}
        <div className="absolute top-1 left-2 text-[10px] font-mono font-bold text-cyan-300">
          {t("topLeft00")}</div>
        <div className="absolute top-1 right-2 text-[10px] font-mono font-bold text-cyan-300 text-right">
          {t("topRight")}</div>
        <div className="absolute bottom-1 left-2 text-[10px] font-mono font-bold text-cyan-300">
          {t("bottomLeft")}</div>
        <div className="absolute bottom-1 right-2 text-[10px] font-mono font-bold text-cyan-300 text-right">
          {t("bottomRight")}</div>

        {/* Edge Midpoint Labels */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-emerald-300 bg-black/60 px-2 rounded-xs">
          {t("topEdgeBull1px")}</div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-emerald-300 bg-black/60 px-2 rounded-xs">
          {t("bottomEdgeBull1px")}</div>
        <div className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-mono font-bold text-emerald-300 bg-black/60 px-2 rounded-xs">
          {t("leftEdge")}</div>
        <div className="absolute right-1 top-1/2 -translate-y-1/2 rotate-90 text-[9px] font-mono font-bold text-emerald-300 bg-black/60 px-2 rounded-xs">
          {t("rightEdge")}</div>

        {/* 1:1 Pixel Checkerboard Corner Patches (Moiré / Scaling Artifact Detector) */}
        <div
          className="absolute top-6 left-6 w-16 h-16 border border-white/20 rounded-xs"
          style={{
            backgroundImage: `repeating-conic-gradient(#ffffff 0% 25%, #000000 0% 50%)`,
            backgroundSize: "4px 4px"
          }}
        >
          <div className="absolute -bottom-4 left-0 text-[8px] font-mono text-slate-400 whitespace-nowrap">{t("fineDetailPatch")}</div>
        </div>

        <div
          className="absolute top-6 right-6 w-16 h-16 border border-white/20 rounded-xs"
          style={{
            backgroundImage: `repeating-conic-gradient(#ffffff 0% 25%, #000000 0% 50%)`,
            backgroundSize: "4px 4px"
          }}
        >
          <div className="absolute -bottom-4 right-0 text-[8px] font-mono text-slate-400 whitespace-nowrap">{t("fineDetailPatch")}</div>
        </div>

        <div
          className="absolute bottom-6 left-6 w-16 h-16 border border-white/20 rounded-xs"
          style={{
            backgroundImage: `repeating-conic-gradient(#ffffff 0% 25%, #000000 0% 50%)`,
            backgroundSize: "4px 4px"
          }}
        >
          <div className="absolute -top-4 left-0 text-[8px] font-mono text-slate-400 whitespace-nowrap">{t("fineDetailPatch")}</div>
        </div>

        <div
          className="absolute bottom-6 right-6 w-16 h-16 border border-white/20 rounded-xs"
          style={{
            backgroundImage: `repeating-conic-gradient(#ffffff 0% 25%, #000000 0% 50%)`,
            backgroundSize: "4px 4px"
          }}
        >
          <div className="absolute -top-4 right-0 text-[8px] font-mono text-slate-400 whitespace-nowrap">{t("fineDetailPatch")}</div>
        </div>

        {/* Centered Precision Target Crosshairs & Calibration Reticle */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-sky-500/40 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-sky-400/60 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full border border-white/80"
                style={{
                  backgroundImage: `repeating-conic-gradient(#ffffff 0% 25%, #000000 0% 50%)`,
                  backgroundSize: "2px 2px"
                }}
              />
            </div>
          </div>

          {/* Crosshair Horizontal & Vertical Axes */}
          <div className="absolute w-64 h-px bg-sky-500/50" />
          <div className="absolute h-64 w-px bg-sky-500/50" />

          <div className="mt-3 text-center bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/80 shadow-lg">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
              {t("tvOverscanPixelMapping")}</span>
            <span className="text-[10px] font-mono text-slate-400 block mt-0.5 max-w-[300px]">
              {t("ifTheOuterCyan")}</span>
          </div>
        </div>
      </div>

      {/* Control Strip */}
      <TestInlineControls>
      <div className="mt-6 w-full max-w-4xl bg-card border border-border/70 rounded-2xl p-5 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-xl text-xs font-mono text-foreground">
              <Tv className="w-3.5 h-3.5 text-blue-500" />
              <span>{t("target100FullscreenVisibility")}</span>
            </div>
          </div>

          <button
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-foreground text-background text-xs font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            <Maximize className="w-3.5 h-3.5" />
            {t("enterFullscreenModePress")}</button>
        </div>

        {/* Technical Honesty Disclaimer Banner */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{t("hardwareBoundaryNotice")}</span>
          </div>
          <p>
            {t("webBrowsers")}<strong>{t("cannotQueryYourTelevision")}</strong>{t("youMustObserveThe")}</p>
        </div>

        {/* Step-by-Step TV Setup Instructions */}
        <div className="grid grid-cols-1 gap-3 pt-2 text-xs text-muted-foreground">
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("step1UseFullscreen")}</strong>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("step2CheckWhether")}</strong>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("step3IfThey")}</strong>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("step4InspectThe")}</strong>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("step5IfThe")}</strong>
            </div>
          </div>
        </div>
      </div>
      </TestInlineControls>

      <TestControlBar testId={testId} title={t("tvOverscanPixelMappingTitle")} />
    </div>
  );
}
