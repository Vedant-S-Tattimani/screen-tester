"use client";

import { useState, useEffect, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { Grid, ShieldAlert, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface UniformityPatternProps {
  testId?: string;
}

interface UniformityField {
  id: string;
  label: string;
  color: string;
  textColor: string;
}

export const UNIFORMITY_FIELDS: UniformityField[] = [
  { id: "black", label: "Pure Black (0%)", color: "#000000", textColor: "#FFFFFF" },
  { id: "near-black", label: "Near-Black (5%)", color: "#0D0D0D", textColor: "#FFFFFF" },
  { id: "dark-gray", label: "Dark Gray (20%)", color: "#333333", textColor: "#FFFFFF" },
  { id: "mid-gray", label: "Mid Gray (50%)", color: "#808080", textColor: "#000000" },
  { id: "light-gray", label: "Light Gray (80%)", color: "#CCCCCC", textColor: "#000000" },
  { id: "white", label: "Pure White (100%)", color: "#FFFFFF", textColor: "#000000" }
];

export function UniformityPattern({ testId = "uniformity-test" }: UniformityPatternProps) {
    const t = useTranslations("Tests.UniformityPattern");
  const { registerNavigation } = useTestContext();
  const [activeIndex, setActiveIndex] = useState(3); // Mid-gray 50% default
  const [showGrid, setShowGrid] = useState(false);
  const [gridSize, setGridSize] = useState<3 | 5>(3);

  const activeField = UNIFORMITY_FIELDS[activeIndex];

  const nextField = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % UNIFORMITY_FIELDS.length);
  }, []);

  const prevField = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + UNIFORMITY_FIELDS.length) % UNIFORMITY_FIELDS.length);
  }, []);

  // Keyboard navigation integration
  useEffect(() => {
    registerNavigation({
      next: nextField,
      prev: prevField,
      reset: () => setActiveIndex(3),
    });
  }, [registerNavigation, nextField, prevField]);

  return (
    <>
      {/* Full-bleed Visual Uniformity Canvas */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none cursor-pointer transition-colors duration-150"
        style={{ backgroundColor: activeField.color }}
        onClick={nextField}
        role="button"
        tabIndex={0}
        aria-label={`Uniformity field: ${activeField.label}. Click to switch to next field.`}
      >
        {/* Optional 3x3 or 5x5 Alignment Grid */}
        {showGrid && (
          <div
            className={cn(
              "absolute inset-0 grid pointer-events-none",
              gridSize === 3 ? "grid-cols-3 grid-rows-3" : "grid-cols-5 grid-rows-5"
            )}
          >
            {Array.from({ length: gridSize * gridSize }).map((_, i) => {
              const row = Math.floor(i / gridSize) + 1;
              const col = (i % gridSize) + 1;
              const isCenter = gridSize === 3 ? (row === 2 && col === 2) : (row === 3 && col === 3);

              return (
                <div
                  key={i}
                  className="border border-black/15 dark:border-white/20 p-2 flex flex-col justify-between pointer-events-none"
                >
                  <span
                    className="text-[9px] font-mono opacity-40 font-bold select-none"
                    style={{ color: activeField.textColor }}
                  >
                    {t("r")}{row}{t("c")}{col} {isCenter ? "(CENTER)" : ""}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Subtle Center Label (click-through to allow easy color switching) */}
        <div
          className="pointer-events-none select-none text-center space-y-1 opacity-30 hover:opacity-90 transition-opacity duration-300 bg-black/40 dark:bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg"
          style={{ color: activeField.textColor }}
        >
          <span className="text-xs font-mono uppercase font-bold tracking-widest block">
            {activeField.label}
          </span>
          <span className="text-[10px] font-mono opacity-80 block">
            {t("clickAnywhereToChange")}</span>
        </div>
      </div>

      {/* Control Bar Controls (Integrated neatly into TestControlBar without overlapping) */}
      <TestControlBar testId={testId} title={t("screenUniformityTestTitle")}>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Color Switcher Strip */}
          <div className="flex items-center gap-1 bg-muted/60 dark:bg-white/10 p-1 rounded-lg border border-border/50">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevField();
              }}
              className="p-1.5 hover:bg-white/20 rounded transition-colors text-amber-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
              title={t("previousFieldLeftArrowTitle")}
              aria-label={t("previousFieldTitle")}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2 px-1">
              {UNIFORMITY_FIELDS.map((f, idx) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(idx);
                  }}
                  className={cn(
                    "w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all border shrink-0 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400",
                    idx === activeIndex
                      ? "scale-125 ring-2 ring-amber-400 shadow-md z-10"
                      : "opacity-60 hover:opacity-100 hover:scale-110"
                  )}
                  style={{
                    backgroundColor: f.color,
                    borderColor: f.id === "black" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)",
                  }}
                  title={f.label}
                  aria-label={f.label}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextField();
              }}
              className="p-1.5 hover:bg-white/20 rounded transition-colors text-amber-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
              title={t("nextFieldRightArrowTitle")}
              aria-label={t("nextFieldTitle")}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Current Active Label */}
          <span className="text-xs font-mono font-bold text-amber-300 px-2 hidden lg:inline">
            {activeField.label}
          </span>

          <div className="h-4 w-px bg-white/20 hidden sm:block" />

          {/* Alignment Grid Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowGrid((prev) => !prev);
              }}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer",
                showGrid
                  ? "bg-blue-600 text-white border-blue-400 shadow-md ring-2 ring-blue-300"
                  : "bg-slate-100 text-slate-800 hover:text-slate-950 hover:bg-slate-200 border-slate-200 dark:bg-white/10 dark:hover:bg-white/20 dark:text-slate-100 dark:border-white/20 font-semibold"
              )}
              title={showGrid ? "Hide Alignment Grid" : `Show ${gridSize}x${gridSize} Alignment Grid`}
            >
              <Grid className={cn("w-3.5 h-3.5", showGrid ? "text-white" : "text-amber-600 dark:text-amber-300")} />
              <span className="hidden sm:inline">{showGrid ? "Hide Grid" : `Grid (${gridSize}x${gridSize})`}</span>
            </button>
            {showGrid && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setGridSize((prev) => (prev === 3 ? 5 : 3));
                }}
                className="px-2.5 py-1.5 bg-slate-100 dark:bg-black/60 hover:bg-slate-200 dark:hover:bg-black/80 text-amber-600 dark:text-amber-300 text-xs font-mono font-bold rounded-lg border border-slate-200 dark:border-white/25 transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
                title={t("switchGridResolution3x3Title")}
              >
                {gridSize === 3 ? "5x5" : "3x3"}
              </button>
            )}
          </div>
        </div>
      </TestControlBar>
    </>
  );
}

/**
 * Extended Technical Guidance & Disclaimer
 * Rendered below the test viewport via extraControls in TestWrapper
 */
export function UniformityGuidance() {
    const t = useTranslations("Tests.UniformityPattern");
  return (
    <div className="w-full max-w-4xl mx-auto bg-card border border-border/70 rounded-2xl p-5 shadow-xs space-y-4">
      {/* Technical Disclaimer Banner */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{t("hardwareBoundaryNotice")}</span>
        </div>
        <p>
          {t("screenTester")}<strong>{t("doesNotCalculateA")}</strong>{t("webcamsAndPhoneCameras")}</p>
      </div>

      {/* Inspection Guidance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
        <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">{t("1MidGray50")}</strong> {t("the50NeutralGray")}</div>
        </div>
        <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">{t("2DarkGray5")}</strong> {t("onOledAndQd")}</div>
        </div>
        <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">{t("3WhiteField100")}</strong> {t("checkTheFullWhite")}</div>
        </div>
        <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">{t("4LightGray80")}</strong> {t("observeThePerimeterAnd")}</div>
        </div>
      </div>
    </div>
  );
}
