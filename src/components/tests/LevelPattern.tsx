"use client";

import { useEffect, useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { TestInlineControls } from "../test-runner/TestInlineControls";
import { useTranslations } from "next-intl";

interface LevelPatternProps {
  type: "black" | "white";
  testId?: string;
}

const BLACK_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
const WHITE_STEPS = [254, 253, 252, 251, 250, 249, 248, 247, 246, 245, 244, 243, 242, 241, 240, 239, 238, 237, 236, 235, 234, 233, 232, 231, 230];

export function LevelPattern({ type, testId }: LevelPatternProps) {
    const t = useTranslations("Tests.LevelPattern");
  const { registerNavigation } = useTestContext();
  const [showOutlines, setShowOutlines] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [observation, setObservation] = useState<string>("");
  
  const steps = type === "black" ? BLACK_STEPS : WHITE_STEPS;
  const bg = type === "black" ? "#000000" : "#FFFFFF";
  const textColor = type === "black" ? "text-white/60" : "text-black/60";
  const defaultBorder = type === "black" ? "border-white/10" : "border-black/10";

  useEffect(() => {
    registerNavigation({
      next: () => setShowOutlines((p) => !p),
      prev: () => setShowLabels((p) => !p),
      reset: () => {
        setShowOutlines(true);
        setShowLabels(true);
      },
    });
  }, [registerNavigation]);

  return (
    <>
      <div 
        className="absolute inset-0 flex flex-col items-center justify-between p-2 sm:p-4 pb-14 sm:pb-16 select-none overflow-hidden"
        style={{ backgroundColor: bg }}
      >
        {/* Top Target Calibration Hint */}
        <div className={`mb-1.5 px-3.5 py-1 rounded-full text-[11px] sm:text-xs text-center max-w-xl truncate shrink-0 ${
          type === "black" 
            ? "bg-neutral-900/90 border border-neutral-800 text-neutral-300" 
            : "bg-neutral-100 border border-neutral-300 text-neutral-800"
        }`}>
          {type === "black"
            ? "Black Level Target: Adjust monitor brightness until squares 1–3 are barely discernible from the black surround."
            : "White-Level / Near-White Clipping Visual Inspection: The background is Pure White (RGB 255)."}
        </div>

        <div className="grid grid-cols-5 grid-rows-5 gap-1.5 sm:gap-2.5 w-full h-full flex-1 min-h-0">
          {steps.map((value, index) => {
            const color = `rgb(${value}, ${value}, ${value})`;
            const label = type === "black" ? `${index + 1}` : `${value}`;
            
            return (
              <div 
                key={index}
                className={`min-h-0 min-w-0 flex flex-col items-center justify-center relative rounded-md transition-all ${
                  showOutlines ? `border ${defaultBorder}` : "border border-transparent"
                } shadow-xs`}
                style={{ backgroundColor: color }}
              >
                {showLabels && (
                  <span className={`text-[10px] sm:text-xs font-semibold tracking-tight ${textColor} select-none drop-shadow-xs`}>
                    {label}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {type === "white" && (
          <TestInlineControls>
            <div className="w-full max-w-4xl mx-auto bg-card border border-border/70 rounded-2xl p-5 shadow-sm space-y-4 mb-6">
              <span className="text-sm font-bold uppercase tracking-wider block text-center">{t("visualObservation")}</span>
              <div className="flex flex-col sm:flex-row gap-2 w-full justify-center">
                <button 
                  onClick={(e) => { e.stopPropagation(); setObservation("all"); }} 
                  className={`text-xs px-4 py-2 rounded-xl border transition-colors cursor-pointer ${observation === "all" ? "bg-blue-600 text-white border-blue-600 font-semibold shadow-md" : "bg-muted text-foreground border-border/50 hover:bg-muted/80 font-semibold"}`}
                >
                  {t("iCanDistinguish252")}</button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setObservation("some"); }} 
                  className={`text-xs px-4 py-2 rounded-xl border transition-colors cursor-pointer ${observation === "some" ? "bg-amber-500 text-white border-amber-500 font-semibold shadow-md" : "bg-muted text-foreground border-border/50 hover:bg-muted/80 font-semibold"}`}
                >
                  {t("someShadesMerge")}</button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setObservation("clipped"); }} 
                  className={`text-xs px-4 py-2 rounded-xl border transition-colors cursor-pointer ${observation === "clipped" ? "bg-red-500 text-white border-red-500 font-semibold shadow-md" : "bg-muted text-foreground border-border/50 hover:bg-muted/80 font-semibold"}`}
                >
                  {t("everythingAbove250Looks")}</button>
              </div>
            </div>
          </TestInlineControls>
        )}
      </div>

      <TestControlBar 
        testId={testId} 
        title={type === "black" ? "Black Level (Shadow Detail)" : "White Level (Highlight Detail)"}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOutlines((p) => !p)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
              showOutlines 
                ? "bg-white text-gray-950 font-bold shadow-xs border-transparent" 
                : "border-border/50 text-gray-700 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-muted dark:hover:bg-white/10"
            }`}
          >
            {showOutlines ? "Outlines: On" : "Outlines: Off"}
          </button>
          <button
            onClick={() => setShowLabels((p) => !p)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
              showLabels 
                ? "bg-white text-gray-950 font-bold shadow-xs border-transparent" 
                : "border-border/50 text-gray-700 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-muted dark:hover:bg-white/10"
            }`}
          >
            {showLabels ? "Labels: On" : "Labels: Off"}
          </button>
        </div>
      </TestControlBar>
    </>
  );
}