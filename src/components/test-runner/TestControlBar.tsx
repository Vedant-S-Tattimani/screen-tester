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
    workflowIndex,
    hasPrevInWorkflow,
    hasNextInWorkflow,
    goPrevInWorkflow,
    goNextInWorkflow
  } = useTestContext();
  
  const activeTestId = testId || contextTestId;
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [mouseActive, setMouseActive] = useState(true);
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
        "transition-all duration-300 select-none",
        isFullscreen 
          ? "fixed bottom-8 left-1/2 -translate-x-1/2 px-4 w-fit max-w-[95vw] z-50" 
          : "w-full",
        isFullscreen && !mouseActive ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100 translate-y-0 pointer-events-auto"
      )}
    >
      <div className={cn(
        "flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 w-full",
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
        </div>

        {/* Global Controls & Workflow Navigation */}
        <div className={cn("flex items-center gap-2 shrink-0 w-full md:w-auto justify-between md:justify-end", children ? "mt-2 md:mt-0" : "")}>
          
          {/* Observation Panel */}
          {activeTestId && workflowIndex !== -1 && (
            <div className="flex items-center gap-1 border-r border-border/50 pr-2 mr-1">
              <button 
                onClick={() => setObservation(observation === "PASS" ? null : "PASS")}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden",
                  observation === "PASS" ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/40" : "hover:bg-muted text-muted-foreground"
                )}
                title="Mark as Passed"
                aria-label="Mark test as passed"
                aria-pressed={observation === "PASS"}
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setObservation(observation === "CHECK" ? null : "CHECK")}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden",
                  observation === "CHECK" ? "bg-amber-500/20 text-amber-500 border border-amber-500/40" : "hover:bg-muted text-muted-foreground"
                )}
                title="Mark as Needs Review"
                aria-label="Mark test as needs review"
                aria-pressed={observation === "CHECK"}
              >
                <HelpCircle className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setObservation(observation === "ISSUE" ? null : "ISSUE")}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden",
                  observation === "ISSUE" ? "bg-red-500/20 text-red-500 border border-red-500/40" : "hover:bg-muted text-muted-foreground"
                )}
                title="Mark as Issue Found"
                aria-label="Mark test as issue found"
                aria-pressed={observation === "ISSUE"}
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Workflow Prev/Next */}
          {workflowIndex !== -1 && (
            <div className="flex items-center gap-1.5">
              <button 
                onClick={goPrevInWorkflow} 
                disabled={!hasPrevInWorkflow} 
                aria-label="Previous test in sequence"
                className="text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
              >
                Prev
              </button>
              <button 
                onClick={goNextInWorkflow} 
                aria-label={hasNextInWorkflow ? "Next test in sequence" : "Finish inspection sequence"}
                className="text-xs font-medium px-3.5 py-1.5 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
              >
                {hasNextInWorkflow ? "Next" : "Finish"}
              </button>
            </div>
          )}

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-muted transition-colors border border-border/40 ml-auto md:ml-0 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden"
            title={isFullscreen ? t("exit") : t("fullscreen")}
            aria-label={isFullscreen ? "Exit Fullscreen (F)" : "Enter Fullscreen (F)"}
          >
            {isFullscreen ? (
              <>
                <Minimize className="w-3.5 h-3.5" />
                <span>Exit Fullscreen</span>
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
          Press ESC or F to exit fullscreen � Space to pause
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