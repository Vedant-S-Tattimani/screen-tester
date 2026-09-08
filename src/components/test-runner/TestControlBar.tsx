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
          ? "dark fixed bottom-8 left-1/2 -translate-x-1/2 px-4 w-fit max-w-[95vw] z-50" 
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
          <span className={cn(
            "font-semibold text-[11px] uppercase tracking-wider shrink-0 font-mono",
            isFullscreen ? "text-slate-300" : "text-muted-foreground"
          )}>
            {t("observationLabel")}
          </span>
          <input 
            type="text"
            value={observationNotes || ""}
            onChange={(e) => setObservationNotes(e.target.value)}
            placeholder={t("observationPlaceholder")}
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
            {t("closeNote")}
          </button>
        </div>
      )}

      {/* Main Bar Controls */}
      <div className={cn(
        "flex flex-wrap items-center justify-between gap-3 w-full",
        isFullscreen 
          ? "dark bg-black/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-2xl border border-white/20 text-white" 
          : "bg-white border border-gray-200/90 rounded-xl px-4 py-2.5 sm:py-3 shadow-xs text-gray-900"
      )}>
        
        {/* Custom Test Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {children && (
            <>
              <div className={cn(
                "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider shrink-0 font-mono",
                isFullscreen ? "text-slate-300" : "text-muted-foreground"
              )}>
                <Settings2 className="w-3.5 h-3.5" />
                <span>{t("controlsLabel")}</span>
              </div>
              <div className={cn("h-4 w-px hidden md:block", isFullscreen ? "bg-white/20" : "bg-border/60")} />
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
                title={t("markDefectTitle")}
              >
                <span className="text-[11px]">📍</span>
                <span>{isPixelToolActive ? t("markingActive") : t("markDefect")}</span>
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
                    : isFullscreen ? "hover:bg-white/15 text-slate-200 hover:text-white" : "hover:bg-slate-100 text-slate-600"
                )}
                title={t("looksNormalTitle")}
                aria-pressed={observation === "PASS"}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t("looksNormal")}</span>
              </button>

              <button
                type="button"
                onClick={() => setObservation(observation === "ISSUE" ? null : "ISSUE")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden",
                  observation === "ISSUE" 
                    ? "bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/40" 
                    : isFullscreen ? "hover:bg-white/15 text-slate-200 hover:text-white" : "hover:bg-slate-100 text-slate-600"
                )}
                title={t("needsAttentionTitle")}
                aria-pressed={observation === "ISSUE"}
              >
                <XCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t("needsAttention")}</span>
              </button>

              <button 
                type="button"
                onClick={() => setObservation((observation === "CHECK" || observation === "UNSURE") ? null : "UNSURE")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden",
                  (observation === "CHECK" || observation === "UNSURE") 
                    ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40" 
                    : isFullscreen ? "hover:bg-white/15 text-slate-200 hover:text-white" : "hover:bg-slate-100 text-slate-600"
                )}
                title={t("unsureTitle")}
                aria-pressed={observation === "CHECK" || observation === "UNSURE"}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t("unsure")}</span>
              </button>

              {/* Note toggle */}
              <button
                type="button"
                onClick={() => setShowNotesInput(!showNotesInput)}
                className={cn(
                  "text-xs px-2 py-1.5 rounded-lg transition-colors font-medium ml-0.5",
                  showNotesInput || (observationNotes && observationNotes.trim().length > 0)
                    ? "bg-blue-100 text-blue-700" 
                    : isFullscreen ? "text-slate-200 hover:text-white" : "text-slate-500 hover:text-slate-900"
                )}
                title={t("noteTitle")}
              >
                📝 {observationNotes ? t("noteAdded") : t("addNote")}
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
                aria-label={t("prevAria")}
                className={cn(
                  "text-xs font-medium px-2.5 py-1.5 rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-colors",
                  isFullscreen ? "text-slate-200 hover:text-white hover:bg-white/10" : "hover:bg-muted"
                )}
              >
                {t("prev")}
              </button>
              <button 
                type="button"
                onClick={skipTestInWorkflow} 
                aria-label={t("skipAria")}
                className={cn(
                  "text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors",
                  isFullscreen ? "text-slate-300 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                title={t("skipTitle")}
              >
                {t("skip")}
              </button>
              <button 
                type="button"
                onClick={goNextInWorkflow} 
                aria-label={hasNextInWorkflow ? t("continueAria") : t("completeAria")}
                className={cn(
                  "text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors shadow-xs",
                  isFullscreen 
                    ? "bg-white text-gray-950 hover:bg-white/90" 
                    : "bg-foreground text-background hover:bg-foreground/90"
                )}
              >
                {hasNextInWorkflow ? t("continue") : t("complete")}
              </button>
            </div>
          )}

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className={cn(
              "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors border ml-auto md:ml-0 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden",
              isFullscreen ? "border-white/20 text-slate-200 hover:text-white hover:bg-white/10" : "border-border/40 hover:bg-muted text-foreground"
            )}
            title={isFullscreen ? t("exit") : t("fullscreen")}
            aria-label={isFullscreen ? t("exitAria") : t("fullscreenAria")}
          >
            {isFullscreen ? (
              <>
                <Minimize className="w-3.5 h-3.5" />
                <span>{t("exit")}</span>
                <kbd className="hidden sm:inline text-[10px] font-mono opacity-50 ml-0.5">[F]</kbd>
              </>
            ) : (
              <>
                <Maximize className="w-3.5 h-3.5" />
                <span>{t("fullscreen")}</span>
                <kbd className="hidden sm:inline text-[10px] font-mono opacity-50 ml-0.5">[F]</kbd>
              </>
            )}
          </button>

        </div>
      </div>
      
      {/* Subtle ESC hint in fullscreen */}
      {isFullscreen && (
        <div className="text-white/40 text-[10px] font-mono tracking-widest uppercase mt-2 text-center select-none">
          {t("fullscreenHelp")}
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