"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTestContext } from "./TestContext";
import { CheckCircle2, XCircle, HelpCircle, Maximize, Minimize, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface TestControlBarProps {
  children?: ReactNode;
  testId?: string;
  title: string;
}

export function TestControlBar({ children, testId, title }: TestControlBarProps) {
  const { 
    isFullscreen, 
    toggleFullscreen, 
    testId: contextTestId,
    observation, 
    setObservation,
    observationNotes,
    setObservationNotes,
    isPixelToolActive,
    setIsPixelToolActive,
    pixelDefects,
    workflowIndex,
    hasPrevInWorkflow,
    hasNextInWorkflow,
    goPrevInWorkflow,
    goNextInWorkflow,
    skipTestInWorkflow
  } = useTestContext();
  
  const activeTestId = testId || contextTestId;
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [mouseActive, setMouseActive] = useState(true);
  const [showNotesInput, setShowNotesInput] = useState(false);
  const t = useTranslations("TestWrapper");

  // Mount into the dedicated controls container below the test viewport
  useEffect(() => {
    const target = document.getElementById("test-controls-container");
    if (target) {
      queueMicrotask(() => {
        setPortalTarget(target);
      });
    }
  }, []);

  // Handle mouse idle for hiding control bar in fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    let timeout: NodeJS.Timeout;
    const handleMouseMove = () => {
      setMouseActive(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setMouseActive(false), 2400);
    };
    window.addEventListener("mousemove", handleMouseMove);
    timeout = setTimeout(() => setMouseActive(false), 2400);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, [isFullscreen]);

  const barContent = (
    <div 
      role="region"
      aria-label={`${title} Controls`}
      className={cn(
        "transition-all duration-300 select-none flex flex-col gap-2",
        isFullscreen 
          ? "fixed bottom-8 left-1/2 -translate-x-1/2 px-4 w-fit max-w-[95vw] z-50" 
          : "w-full",
        isFullscreen && !mouseActive ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100 translate-y-0 pointer-events-auto"
      )}
    >
      {/* Observation Notes Bar (expandable or shown when note exists) */}
      {(showNotesInput || (observationNotes && observationNotes.trim().length > 0)) && (
        <div className={cn(
          "w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all",
          isFullscreen 
            ? "bg-black/90 backdrop-blur-md border border-white/20 text-white shadow-xl" 
            : "bg-slate-50 border border-slate-200 text-slate-800"
        )}>
          <span className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground shrink-0 font-mono">
            Observation:
          </span>
          <input 
            type="text"
            value={observationNotes || ""}
            onChange={(e) => setObservationNotes(e.target.value)}
            placeholder="Describe what you see (e.g., slight bright dot near upper left corner)..."
            className={cn(
              "flex-1 bg-transparent border-none outline-hidden text-xs",
              isFullscreen ? "text-white placeholder-white/40" : "text-slate-900 placeholder-slate-400"
            )}
          />
          <button 
            type="button"
            onClick={() => setShowNotesInput(false)}
            className="text-[10px] uppercase font-mono tracking-wider opacity-60 hover:opacity-100 px-1"
          >
            Close
          </button>
        </div>
      )}

      {/* Main Bar Controls */}
      <div className={cn(
        "flex flex-wrap items-center justify-between gap-3 w-full",
        isFullscreen 
          ? "bg-black/85 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-2xl border border-white/15 text-white" 
          : "bg-white border border-gray-200/90 rounded-xl px-4 py-2.5 sm:py-3 shadow-xs text-gray-900"
      )}>
        
        {/* Custom Test Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {children && (
            <>
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-semibold uppercase tracking-wider shrink-0 font-mono">
                <Settings2 className="w-3.5 h-3.5" />
                <span>Controls</span>
              </div>
              <div className="h-4 w-px bg-border/60 hidden md:block" />
              <div className="flex flex-wrap items-center gap-2">
                {children}
              </div>
            </>
          )}

          {/* Pixel Defect Marker Button */}
          {activeTestId && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsPixelToolActive(!isPixelToolActive)}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all",
                  isPixelToolActive 
                    ? "bg-red-600 text-white border-red-500 shadow-xs" 
                    : isFullscreen 
                      ? "bg-white/10 hover:bg-white/20 text-white border-white/20" 
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                )}
                title="Click anywhere on screen to record suspicious pixel coordinates"
              >
                <span className="text-[11px]">📍</span>
                <span>{isPixelToolActive ? "Marking Active" : "Mark Defect"}</span>
                {pixelDefects && pixelDefects.length > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 bg-black/40 rounded-full text-[10px] font-mono">
                    {pixelDefects.length}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Global Controls & Workflow Navigation */}
        <div className={cn("flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 w-full md:w-auto justify-between md:justify-end", children ? "mt-2 md:mt-0" : "")}>
          
          {/* Observation Panel: Looks Normal / Needs Attention / Unsure */}
          {activeTestId && (
            <div className="flex items-center gap-1 border-r border-border/50 pr-2 mr-1">
              <button 
                type="button"
                onClick={() => setObservation(observation === "PASS" ? null : "PASS")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden",
                  observation === "PASS" 
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40" 
                    : isFullscreen ? "hover:bg-white/10 text-white/70" : "hover:bg-slate-100 text-slate-600"
                )}
                title="Looks normal (Pass)"
                aria-pressed={observation === "PASS"}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Looks normal</span>
              </button>

              <button
                type="button"
                onClick={() => setObservation(observation === "ISSUE" ? null : "ISSUE")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden",
                  observation === "ISSUE" 
                    ? "bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/40" 
                    : isFullscreen ? "hover:bg-white/10 text-white/70" : "hover:bg-slate-100 text-slate-600"
                )}
                title="Needs attention (Issue observed)"
                aria-pressed={observation === "ISSUE"}
              >
                <XCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Needs attention</span>
              </button>

              <button 
                type="button"
                onClick={() => setObservation((observation === "CHECK" || observation === "UNSURE") ? null : "UNSURE")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden",
                  (observation === "CHECK" || observation === "UNSURE") 
                    ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40" 
                    : isFullscreen ? "hover:bg-white/10 text-white/70" : "hover:bg-slate-100 text-slate-600"
                )}
                title="Unsure"
                aria-pressed={observation === "CHECK" || observation === "UNSURE"}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Unsure</span>
              </button>

              {/* Note toggle */}
              <button
                type="button"
                onClick={() => setShowNotesInput(!showNotesInput)}
                className={cn(
                  "text-xs px-2 py-1.5 rounded-lg transition-colors font-medium ml-0.5",
                  showNotesInput || (observationNotes && observationNotes.trim().length > 0)
                    ? "bg-blue-100 text-blue-700" 
                    : isFullscreen ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-slate-900"
                )}
                title="Add written observation note"
              >
                📝 {observationNotes ? "Note Added" : "+ Note"}
              </button>
            </div>
          )}

          {/* Workflow Prev / Skip / Continue */}
          {workflowIndex !== -1 && (
            <div className="flex items-center gap-1.5">
              <button 
                type="button"
                onClick={goPrevInWorkflow} 
                disabled={!hasPrevInWorkflow} 
                aria-label="Previous test in sequence"
                className="text-xs font-medium px-2.5 py-1.5 rounded-lg hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                Prev
              </button>
              <button 
                type="button"
                onClick={skipTestInWorkflow} 
                aria-label="Skip test"
                className="text-xs font-medium px-2.5 py-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                title="Skip to next test without recording an issue"
              >
                Skip
              </button>
              <button 
                type="button"
                onClick={goNextInWorkflow} 
                aria-label={hasNextInWorkflow ? "Continue to next test" : "Finish inspection sequence"}
                className="text-xs font-medium px-3.5 py-1.5 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-xs"
              >
                {hasNextInWorkflow ? "Continue →" : "Complete & Report"}
              </button>
            </div>
          )}

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-muted transition-colors border border-border/40 ml-auto md:ml-0 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
            title={isFullscreen ? t("exit") : t("fullscreen")}
            aria-label={isFullscreen ? "Exit Fullscreen (F)" : "Enter Fullscreen (F)"}
          >
            {isFullscreen ? (
              <>
                <Minimize className="w-3.5 h-3.5" />
                <span>Exit</span>
                <kbd className="hidden sm:inline text-[10px] font-mono opacity-50 ml-0.5">[F]</kbd>
              </>
            ) : (
              <>
                <Maximize className="w-3.5 h-3.5" />
                <span>Fullscreen</span>
                <kbd className="hidden sm:inline text-[10px] font-mono opacity-50 ml-0.5">[F]</kbd>
              </>
            )}
          </button>

        </div>
      </div>
      
      {/* Subtle ESC hint in fullscreen */}
      {isFullscreen && (
        <div className="text-white/40 text-[10px] font-mono tracking-widest uppercase mt-2 text-center select-none">
          Press ESC or F to exit fullscreen • Space to pause
        </div>
      )}
    </div>
  );

  // In fullscreen mode, portal to container or render fixed overlay
  if (isFullscreen) {
    if (portalTarget) {
      return createPortal(barContent, portalTarget);
    }
    return barContent;
  }

  // In inline mode, strictly portal to the controls container below the test viewport
  if (portalTarget) {
    return createPortal(barContent, portalTarget);
  }

  // Prevent rendering inside the test viewport to avoid hanging in the middle
  return null;
}