"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Grid, ArrowRight, ArrowLeft, Maximize, Minimize } from "lucide-react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { TestInlineControls } from "../test-runner/TestInlineControls";
import { cn } from "@/lib/utils";

interface PixelInversionPatternProps {
  testId?: string;
}

type InversionMode = "dot1x1" | "check2x2" | "vstripes" | "hstripes" | "subpixel" | "textPhase";

interface ModeOption {
  id: InversionMode;
  nameKey: string;
  descKey: string;
}

const MODES: ModeOption[] = [
  { id: "dot1x1", nameKey: "dot1x1", descKey: "dot1x1Desc" },
  { id: "check2x2", nameKey: "check2x2", descKey: "check2x2Desc" },
  { id: "vstripes", nameKey: "vstripes", descKey: "vstripesDesc" },
  { id: "hstripes", nameKey: "hstripes", descKey: "hstripesDesc" },
  { id: "subpixel", nameKey: "subpixel", descKey: "subpixelDesc" },
  { id: "textPhase", nameKey: "textPhase", descKey: "textPhaseDesc" }
];

export function PixelInversionPattern({ testId = "pixel-inversion-test" }: PixelInversionPatternProps) {
  const t = useTranslations("Tests.PixelInversionPattern");
  const { isFullscreen, registerNavigation, toggleFullscreen } = useTestContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentModeIndex, setCurrentModeIndex] = useState(0);
  const [contrast, setContrast] = useState<"high" | "subtle">("high");
  const [showHud, setShowHud] = useState(true);
  const hudTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeMode = MODES[currentModeIndex];

  const triggerHud = useCallback(() => {
    setShowHud(true);
    if (hudTimeoutRef.current) clearTimeout(hudTimeoutRef.current);
    hudTimeoutRef.current = setTimeout(() => {
      setShowHud(false);
    }, 3200);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentModeIndex((prev) => (prev + 1) % MODES.length);
    triggerHud();
  }, [triggerHud]);

  const handlePrev = useCallback(() => {
    setCurrentModeIndex((prev) => (prev - 1 + MODES.length) % MODES.length);
    triggerHud();
  }, [triggerHud]);

  // Register navigation with parent TestWrapper
  useEffect(() => {
    if (registerNavigation) {
      registerNavigation({
        next: handleNext,
        prev: handlePrev,
        reset: () => {
          setCurrentModeIndex(0);
          triggerHud();
        }
      });
    }
  }, [handleNext, handlePrev, registerNavigation, triggerHud]);

  // Direct keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "c" || e.key === "C") {
        setContrast((prev) => (prev === "high" ? "subtle" : "high"));
        triggerHud();
      } else if (e.key >= "1" && e.key <= "6") {
        setCurrentModeIndex(parseInt(e.key, 10) - 1);
        triggerHud();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNext, handlePrev, triggerHud]);

  // Render high-frequency 1:1 pixel inversion pattern
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = Math.round(rect.width * dpr) || Math.round(window.innerWidth * dpr);
    const h = Math.round(rect.height * dpr) || Math.round(window.innerHeight * dpr);

    if (w <= 0 || h <= 0) return;

    canvas.width = w;
    canvas.height = h;
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;

    const val1 = contrast === "high" ? 255 : 180;
    const val2 = contrast === "high" ? 0 : 75;

    const mode = activeMode.id;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        let r = 128;
        let g = 128;
        let b = 128;

        if (mode === "dot1x1") {
          const isWhite = (x + y) % 2 === 0;
          const val = isWhite ? val1 : val2;
          r = g = b = val;
        } else if (mode === "check2x2") {
          const bx = Math.floor(x / 2);
          const by = Math.floor(y / 2);
          const isWhite = (bx + by) % 2 === 0;
          const val = isWhite ? val1 : val2;
          r = g = b = val;
        } else if (mode === "vstripes") {
          const isWhite = x % 2 === 0;
          const val = isWhite ? val1 : val2;
          r = g = b = val;
        } else if (mode === "hstripes") {
          const isWhite = y % 2 === 0;
          const val = isWhite ? val1 : val2;
          r = g = b = val;
        } else if (mode === "subpixel") {
          const subX = (x * 3) % 6;
          r = (subX === 0 || subX === 3) ? val1 : val2;
          g = (subX === 1 || subX === 4) ? val1 : val2;
          b = (subX === 2 || subX === 5) ? val1 : val2;
        } else if (mode === "textPhase") {
          const pattern = (x % 3 === 0 && y % 2 === 0) || (x % 3 === 1 && y % 2 === 1);
          const val = pattern ? val1 : val2;
          r = g = b = val;
        }

        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, [activeMode, contrast]);

  // Responsive observation & fullscreen transition redraw
  useEffect(() => {
    render();

    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      render();
    });
    ro.observe(container);

    window.addEventListener("resize", render);

    // Timing buffer for OS fullscreen transitions
    const timer1 = setTimeout(render, 60);
    const timer2 = setTimeout(render, 180);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", render);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [render, isFullscreen]);

  // Screen click handler (cycles patterns)
  const handleContainerClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).closest("[data-control-bar='true']") ||
      (e.target as HTMLElement).closest("[data-inline-controls='true']")
    ) {
      return;
    }
    handleNext();
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleContainerClick}
      className={cn(
        "relative w-full flex flex-col items-center justify-center bg-black select-none overflow-hidden cursor-pointer",
        isFullscreen ? "h-screen w-screen fixed inset-0 z-50" : "h-full w-full min-h-[460px] sm:min-h-[520px]"
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />

      {/* Synchronized top guidance bar */}
      <TestControlBar testId={testId} title={t("title")} />

      {/* Floating Mode HUD Indicator */}
      <div 
        className={cn(
          "absolute top-16 left-4 sm:left-6 z-20 bg-slate-900/90 text-white backdrop-blur-md px-4 py-3 rounded-xl border border-slate-700/60 shadow-2xl max-w-sm pointer-events-none transition-all duration-300",
          isFullscreen && !showHud ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
        )}
      >
        <div className="flex items-center justify-between gap-3 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
          <div className="flex items-center gap-1.5">
            <Grid className="w-3.5 h-3.5" />
            <span>{t("patternIndex", { current: currentModeIndex + 1, total: MODES.length })}</span>
          </div>
          {isFullscreen && (
            <span className="text-[10px] text-slate-400 normal-case">
              Click to cycle
            </span>
          )}
        </div>
        <div className="text-sm font-bold text-white">{t(`modes.${activeMode.nameKey}`)}</div>
        <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">{t(`modes.${activeMode.descKey}`)}</div>
      </div>

      {/* Inline Controls (visible in windowed mode, auto-hides cleanly in fullscreen) */}
      <TestInlineControls>
        <div 
          data-inline-controls="true"
          className="flex flex-wrap items-center gap-2 bg-slate-900/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-slate-700/80 shadow-2xl text-xs text-white"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="p-1.5 hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            title={t("previousPattern")}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <span className="font-mono text-slate-300 px-1 font-semibold">
            {currentModeIndex + 1}/{MODES.length}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="p-1.5 hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            title={t("nextPattern")}
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

          <div className="hidden sm:flex items-center gap-1">
            {MODES.map((m, idx) => (
              <button
                key={m.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentModeIndex(idx);
                  triggerHud();
                }}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer",
                  idx === currentModeIndex
                    ? "bg-emerald-500 text-slate-950 font-semibold shadow-xs"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                )}
              >
                {t(`modes.${m.nameKey}`)}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setContrast((prev) => (prev === "high" ? "subtle" : "high"));
              triggerHud();
            }}
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer",
              contrast === "high"
                ? "border-amber-500/60 text-amber-300 bg-amber-950/40"
                : "border-slate-600 text-slate-400 hover:bg-slate-800"
            )}
          >
            {contrast === "high" ? t("contrastHigh") : t("contrastSubtle")}
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen?.();
            }}
            className="p-1.5 hover:bg-slate-800 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen [F]" : "Enter Fullscreen [F]"}
          >
            {isFullscreen ? <Minimize className="w-4 h-4 text-amber-400" /> : <Maximize className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </TestInlineControls>
    </div>
  );
}
