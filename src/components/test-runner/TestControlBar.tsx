"use client";

import { ReactNode, useEffect, useState, useRef, useCallback } from "react";
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
    skipTestInWorkflow,
    isAutoTest,
    isAutoTestPaused,
    toggleAutoTestPause,
    startGuidedAutoTest,
    stopGuidedAutoTest,
    activeColorName
  } = useTestContext();
  
  const activeTestId = testId || contextTestId;
  const isPixelTest = activeTestId === "dead-pixel-test";
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  
  // Controls visibility & auto-hide state
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [showNotesInput, setShowNotesInput] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  
  const isHoveredRef = useRef(false);
  const isInputFocusedRef = useRef(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations("TestWrapper");
  const tBar = useTranslations("TestControlBar");

  // Keep refs in sync for event listeners
  useEffect(() => {
    isInputFocusedRef.current = isInputFocused;
  }, [isInputFocused]);

  // Mount into the dedicated controls container below the test viewport (inline mode)
  useEffect(() => {
    const target = document.getElementById("test-controls-container");
    if (target) {
      queueMicrotask(() => {
        setPortalTarget(target);
      });
    }
  }, []);

  // Schedule auto-hide after inactivity (approx 2.5s)
  const scheduleHide = useCallback((delay = 2500) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    if (isInputFocusedRef.current) return; // Do not hide while typing notes or custom inputs
    hideTimeoutRef.current = setTimeout(() => {
      if (!isHoveredRef.current && !isInputFocusedRef.current) {
        setIsControlsVisible(false);
      }
    }, delay);
  }, []);

  const revealControls = useCallback((autoHideDelay = 2500) => {
    setIsControlsVisible(true);
    scheduleHide(autoHideDelay);
  }, [scheduleHide]);

  // Auto-hide initialization and mouse tracking in fullscreen
  useEffect(() => {
    if (!isFullscreen) {
      queueMicrotask(() => {
        setIsControlsVisible(true);
      });
      return;
    }

    // On entering fullscreen, show controls briefly (3s) then auto-hide
    queueMicrotask(() => {
      setIsControlsVisible(true);
    });
    scheduleHide(3000);

    const handleMouseMove = (e: MouseEvent) => {
      // Bottom edge trigger zone: cursor within bottom 110px of viewport
      const nearBottom = e.clientY >= window.innerHeight - 110;

      if (nearBottom) {
        setIsControlsVisible(true);
        // If hovering over the control bar area itself, hold open
        if (isHoveredRef.current) {
          if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        } else {
          scheduleHide(2500);
        }
      } else {
        // Cursor moved up away from bottom control zone
        if (!isHoveredRef.current && !isInputFocusedRef.current) {
          scheduleHide(1800);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [isFullscreen, scheduleHide]);

  // Keyboard shortcut: H / h to manually toggle controls visibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "h" || e.key === "H") {
        e.preventDefault();
        setIsControlsVisible((prev) => {
          const nextState = !prev;
          if (nextState) {
            scheduleHide(3500);
          } else {
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
          }
          return nextState;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scheduleHide]);

  const handleSelectObservation = (val: "PASS" | "ISSUE" | "UNSURE") => {
    if (isPixelTest && val === "ISSUE") {
      setObservation("ISSUE");
      const currentNotes = observationNotes || "";
      const colorText = `Observed during: ${activeColorName || "solid color"} pattern`;
      if (!currentNotes.includes(colorText)) {
        setObservationNotes(currentNotes ? `${currentNotes} | ${colorText}` : colorText);
      }
      setIsPixelToolActive(true);
      return;
    }

    setObservation(observation === val ? null : val);

    if (isAutoTest) {
      setTimeout(() => {
        goNextInWorkflow();
      }, 400);
    }
  };

  const barContent = (
    <>
      {/* Touch & Tap Trigger Zone (Mobile / Tablet bottom edge detector) */}
      {isFullscreen && !isControlsVisible && (
        <div
          role="button"
          aria-label={tBar("tapToReveal")}
          tabIndex={-1}
          onTouchStart={(e) => {
            e.stopPropagation();
            revealControls(3500);
          }}
          onClick={(e) => {
            e.stopPropagation();
            revealControls(3500);
          }}
          className="fixed bottom-0 left-0 right-0 h-14 z-40 cursor-pointer bg-transparent"
        />
      )}

      {/* Screen Backdrop: When controls are visible in fullscreen, tapping outside hides them */}
      {isFullscreen && isControlsVisible && (
        <div
          aria-hidden="true"
          onClick={() => {
            if (!isInputFocusedRef.current) {
              setIsControlsVisible(false);
            }
          }}
          onTouchStart={() => {
            if (!isInputFocusedRef.current) {
              setIsControlsVisible(false);
            }
          }}
          className="fixed inset-0 z-40 bg-transparent pointer-events-auto"
        />
      )}

      {/* Main Control Panel Dock */}
      <div 
        role="region"
        aria-label={`${title} Controls`}
        onMouseEnter={() => {
          isHoveredRef.current = true;
          if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          scheduleHide(2500);
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className={cn(
          "transition-all duration-300 ease-out select-none flex flex-col gap-2",
          isFullscreen 
            ? "dark fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 px-2 sm:px-4 w-[calc(100vw-1rem)] md:w-auto max-w-[96vw] z-50" 
            : "w-full",
          isFullscreen && !isControlsVisible 
            ? "opacity-0 pointer-events-none translate-y-8 scale-98" 
            : "opacity-100 translate-y-0 scale-100 pointer-events-auto"
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
              onFocus={() => {
                isInputFocusedRef.current = true;
                setIsInputFocused(true);
                if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
              }}
              onBlur={() => {
                isInputFocusedRef.current = false;
                setIsInputFocused(false);
                scheduleHide(2500);
              }}
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
          "flex flex-wrap items-center justify-between gap-2 sm:gap-3 w-full max-h-[80vh] overflow-y-auto sm:overflow-visible no-scrollbar",
          isFullscreen 
            ? "dark bg-black/90 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-2xl border border-white/20 text-white" 
            : "bg-white border border-gray-200/90 rounded-xl px-4 py-2.5 sm:py-3 shadow-xs text-gray-900"
        )}>
          
          {/* Custom Test Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
            {children && (
              <>
                <div className={cn(
                  "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider shrink-0 font-mono",
                  isFullscreen ? "text-amber-300" : "text-amber-600 dark:text-amber-400"
                )}>
                  <Settings2 className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">{t("controlsLabel")}</span>
                </div>
                <div className={cn("h-4 w-px hidden md:block", isFullscreen ? "bg-white/20" : "bg-border/60")} />
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 max-w-full">
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
                    "flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all shrink-0 cursor-pointer",
                    isPixelToolActive 
                      ? "bg-red-600 text-white border-red-400 shadow-md ring-2 ring-red-400" 
                      : isFullscreen 
                        ? "bg-white/15 hover:bg-white/25 text-amber-200 border-white/25" 
                        : "bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-300 font-semibold"
                  )}
                  title={isPixelTest ? "Click/tap approximate position of suspicious pixel" : t("markDefectTitle")}
                >
                  <span className="text-[11px]">📍</span>
                  <span className="hidden xs:inline">
                    {isPixelToolActive ? t("markingActive") : (isPixelTest ? "Mark Pixel" : t("markDefect"))}
                  </span>
                  {pixelDefects && pixelDefects.length > 0 && (
                    <span className="ml-0.5 px-1.5 py-0.2 bg-black/40 text-amber-300 rounded-full text-[10px] font-mono font-bold">
                      {pixelDefects.length}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Global Controls & Workflow Navigation */}
          <div className={cn("flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto justify-end", children ? "mt-1.5 md:mt-0" : "")}>
            
            {/* Observation Panel: Looks Normal / Needs Attention / Unsure */}
            {activeTestId && (
              <div className="flex flex-wrap items-center gap-1 border-r border-border/50 pr-1.5 sm:pr-2 mr-0.5 sm:mr-1">
                <button 
                  type="button"
                  onClick={() => handleSelectObservation("PASS")}
                  className={cn(
                    "flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden cursor-pointer",
                    observation === "PASS" 
                      ? "bg-emerald-500 text-slate-950 border-2 border-emerald-300 font-extrabold shadow-md ring-2 ring-emerald-400/80" 
                      : isFullscreen 
                        ? "text-emerald-300 hover:text-white hover:bg-emerald-500/25 bg-emerald-950/50 border border-emerald-500/40" 
                        : "text-emerald-700 hover:text-emerald-950 hover:bg-emerald-100/80 bg-emerald-50 border border-emerald-300 font-semibold"
                  )}
                  title={t("looksNormalTitle")}
                  aria-pressed={observation === "PASS"}
                >
                  <CheckCircle2 className={cn("w-3.5 h-3.5", observation === "PASS" ? "text-slate-950" : "text-emerald-400")} />
                  <span className="hidden md:inline">{t("looksNormal")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectObservation("ISSUE")}
                  className={cn(
                    "flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:outline-hidden cursor-pointer",
                    observation === "ISSUE" 
                      ? "bg-rose-500 text-white border-2 border-rose-300 font-extrabold shadow-md ring-2 ring-rose-400/80" 
                      : isFullscreen 
                        ? "text-rose-300 hover:text-white hover:bg-rose-500/25 bg-rose-950/50 border border-rose-500/40" 
                        : "text-rose-700 hover:text-rose-950 hover:bg-rose-100/80 bg-rose-50 border border-rose-300 font-semibold"
                  )}
                  title={isPixelTest ? "Report possible dead or stuck pixel observed" : t("needsAttentionTitle")}
                  aria-pressed={observation === "ISSUE"}
                >
                  <XCircle className={cn("w-3.5 h-3.5", observation === "ISSUE" ? "text-white" : "text-rose-400")} />
                  <span className="hidden md:inline">{isPixelTest ? "Possible Pixel Issue" : t("needsAttention")}</span>
                </button>

                <button 
                  type="button"
                  onClick={() => handleSelectObservation("UNSURE")}
                  className={cn(
                    "flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-hidden cursor-pointer",
                    (observation === "CHECK" || observation === "UNSURE") 
                      ? "bg-amber-400 text-slate-950 border-2 border-amber-300 font-extrabold shadow-md ring-2 ring-amber-400/80" 
                      : isFullscreen 
                        ? "text-amber-300 hover:text-white hover:bg-amber-500/25 bg-amber-950/50 border border-amber-500/40" 
                        : "text-amber-800 hover:text-amber-950 hover:bg-amber-100/80 bg-amber-50 border border-amber-300 font-semibold"
                  )}
                  title={t("unsureTitle")}
                  aria-pressed={observation === "CHECK" || observation === "UNSURE"}
                >
                  <HelpCircle className={cn("w-3.5 h-3.5", (observation === "CHECK" || observation === "UNSURE") ? "text-slate-950" : "text-amber-400")} />
                  <span className="hidden md:inline">{t("unsure")}</span>
                </button>

                {/* Note toggle */}
                <button
                  type="button"
                  onClick={() => setShowNotesInput(!showNotesInput)}
                  className={cn(
                    "text-xs px-2 sm:px-2.5 py-1.5 rounded-lg transition-all font-bold ml-0.5 cursor-pointer",
                    showNotesInput || (observationNotes && observationNotes.trim().length > 0)
                      ? "bg-sky-500 text-white shadow-md border-2 border-sky-300 ring-2 ring-sky-400/80" 
                      : isFullscreen 
                        ? "text-sky-300 hover:text-white hover:bg-sky-500/25 bg-sky-950/50 border border-sky-500/40" 
                        : "text-sky-700 hover:text-sky-950 hover:bg-sky-100/80 bg-sky-50 border border-sky-300 font-semibold"
                  )}
                  title={t("noteTitle")}
                >
                  📝 <span className="hidden lg:inline">{observationNotes ? t("noteAdded") : t("addNote")}</span>
                </button>
              </div>
            )}

            {/* Workflow Prev / Skip / Continue */}
            {workflowIndex !== -1 && (
              <div className="flex items-center gap-1 sm:gap-1.5">
                <button 
                  type="button"
                  onClick={goPrevInWorkflow} 
                  disabled={!hasPrevInWorkflow} 
                  aria-label={t("prevAria")}
                  className={cn(
                    "text-xs font-bold px-2 sm:px-2.5 py-1.5 rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer",
                    isFullscreen 
                      ? "text-cyan-200 hover:text-white hover:bg-white/20 bg-white/10 border border-white/20" 
                      : "text-slate-800 hover:text-black hover:bg-slate-200 bg-slate-100 border border-slate-200"
                  )}
                >
                  {t("prev")}
                </button>
                <button 
                  type="button"
                  onClick={skipTestInWorkflow} 
                  aria-label={t("skipAria")}
                  className={cn(
                    "text-xs font-bold px-2 sm:px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer",
                    isFullscreen 
                      ? "text-cyan-200 hover:text-white hover:bg-white/20 bg-white/10 border border-white/20" 
                      : "text-slate-800 hover:text-black hover:bg-slate-200 bg-slate-100 border border-slate-200"
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
                    "text-xs font-bold px-3 sm:px-4 py-1.5 rounded-lg transition-all shadow-md cursor-pointer",
                    isFullscreen 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white ring-1 ring-blue-300" 
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white"
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
                "flex items-center gap-1 sm:gap-1.5 text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors border focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden shrink-0 cursor-pointer",
                isFullscreen ? "border-white/30 text-white hover:bg-white/20" : "border-slate-300 text-slate-900 hover:bg-slate-100"
              )}
              title={isFullscreen ? t("exit") : t("fullscreen")}
              aria-label={isFullscreen ? t("exitAria") : t("fullscreenAria")}
            >
              {isFullscreen ? (
                <>
                  <Minimize className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">{t("exit")}</span>
                  <kbd className="hidden sm:inline text-[10px] font-mono text-amber-300 font-bold ml-1">[F]</kbd>
                </>
              ) : (
                <>
                  <Maximize className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">{t("fullscreen")}</span>
                  <kbd className="hidden sm:inline text-[10px] font-mono text-amber-500 font-bold ml-1">[F]</kbd>
                </>
              )}
            </button>

          </div>
        </div>
        
        {/* Shortcut and control hints in fullscreen */}
        {isFullscreen && isControlsVisible && (
          <div className="text-slate-200 text-[11px] font-mono font-medium tracking-wide mt-1 text-center select-none flex items-center justify-center flex-wrap gap-2.5 px-3 py-1 bg-black/70 rounded-full border border-white/15 w-fit mx-auto shadow-lg">
            <span>[H] {tBar("hideControls")}</span>
            <span className="text-white/40">•</span>
            <span>{tBar("revealHint")}</span>
            <span className="text-white/40">•</span>
            <span>[F] {t("fullscreen")}</span>
            <span className="text-white/40">•</span>
            <span>[Esc] {t("exit")}</span>
          </div>
        )}
      </div>
    </>
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