"use client";

import { useState, useEffect, useRef, ReactNode, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { TestContext, Observation } from "./TestContext";
import { normalizeWorkflowPath } from "@/lib/workflow";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedTests } from "@/components/layout/RelatedTests";
import { safeSessionGet, safeSessionSet, safeSessionRemove, safeStorageGet } from "@/lib/browserCapabilities";
import { 
  getActiveInspectionSession, 
  getTestObservation, 
  recordTestObservation, 
  addPixelDefectMarker, 
  removePixelDefectMarker, 
  updatePixelDefectMarker, 
  PixelDefectMarker, 
  PixelDefectType, 
  ObservationResult, 
  startNewInspectionSession,
  archiveCurrentInspection,
  AUTO_TEST_QUEUE,
  isAutoTestSessionActive,
  setAutoTestSessionActive,
  isAutoTestPaused,
  setAutoTestPaused
} from "@/lib/inspectionStorage";
import { getTroubleshootingByTestId } from "@/data/troubleshooting";
import { getArticleByTestId } from "@/data/knowledgeBase";
import { Wrench, ArrowRight, BookOpen, Maximize } from "lucide-react";
import { PixelDefectOverlay } from "./PixelDefectOverlay";
import { QueueDrawer } from "./QueueDrawer";
import { cn } from "@/lib/utils";

interface TestWrapperProps {
  title: string;
  description: ReactNode;
  instructions?: ReactNode;
  children: ReactNode;
  testId?: string;
  extraControls?: ReactNode;
}

const STORAGE_KEY_OBSERVATIONS = "monitor-tester-observations";
const STORAGE_KEY_WORKFLOW = "monitor-tester-workflow";
const STORAGE_KEY_FULLSCREEN = "screen-tester-fullscreen";

export function TestWrapper({ title, description, instructions, children, testId, extraControls }: TestWrapperProps) {
  const t = useTranslations("TestWrapper");
  const tBreadcrumbs = useTranslations("Breadcrumbs");
  const router = useRouter();
  const pathname = usePathname();
  
  const isRunning = true; // Always running inline
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Observation State
  const [observation, setObservationState] = useState<Observation>(null);
  const [observationNotes, setObservationNotesState] = useState<string>("");
  
  // Pixel Defect Tool State
  const [isPixelToolActive, setIsPixelToolActive] = useState<boolean>(false);
  const [pixelDefects, setPixelDefects] = useState<PixelDefectMarker[]>([]);
  const [activeMarker, setActiveMarker] = useState<PixelDefectMarker | null>(null);

  // Workflow & Queue State
  const [workflowSequence, setWorkflowSequence] = useState<string[]>([]);
  const [workflowIndex, setWorkflowIndex] = useState(-1);
  const [completedTestIds, setCompletedTestIds] = useState<string[]>([]);
  const [isQueueDrawerOpen, setIsQueueDrawerOpen] = useState(false);

  // Guided Auto Test State
  const [isAutoTest, setIsAutoTest] = useState(false);
  const [isAutoTestPausedState, setIsAutoTestPausedState] = useState(false);
  const [autoTestSecondsLeft, setAutoTestSecondsLeft] = useState(7);
  const [activeColorName, setActiveColorName] = useState("");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  
  // Load workflow, active session, observation & auto-test state on mount and route change
  useEffect(() => {
    queueMicrotask(() => {
      const activeSession = getActiveInspectionSession();
      if (activeSession && Array.isArray(activeSession.queue) && activeSession.queue.length > 0) {
        const storedSequence = activeSession.queue
          .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
          .map((item) => (typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(item) : item));
        setWorkflowSequence(storedSequence);
        setCompletedTestIds(activeSession.completedTestIds || []);
        
        const normPath = typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(pathname) : pathname;
        const idx = storedSequence.indexOf(normPath);
        setWorkflowIndex(idx !== -1 ? idx : storedSequence.indexOf(pathname));
      } else {
        const rawStored = safeSessionGet<string[] | null>(STORAGE_KEY_WORKFLOW, null);
        if (rawStored && Array.isArray(rawStored) && rawStored.length > 0) {
          const storedSequence = rawStored
            .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
            .map((item) => (typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(item) : item));
          setWorkflowSequence(storedSequence);
          const normPath = typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(pathname) : pathname;
          const idx = storedSequence.indexOf(normPath);
          setWorkflowIndex(idx !== -1 ? idx : storedSequence.indexOf(pathname));
        }
      }
      
      // Auto test flags from session storage
      const autoActive = isAutoTestSessionActive();
      const autoPaused = isAutoTestPaused();
      setIsAutoTest(autoActive);
      setIsAutoTestPausedState(autoPaused);
      setAutoTestSecondsLeft(7);

      if (testId) {
        const currentObs = getTestObservation(testId);
        if (currentObs) {
          setObservationState(currentObs.result);
          setObservationNotesState(currentObs.notes || "");
          setPixelDefects(currentObs.pixelDefects || []);
        } else {
          const parsedObs = safeStorageGet<Record<string, Observation>>(STORAGE_KEY_OBSERVATIONS, {});
          if (parsedObs[testId]) {
            setObservationState(parsedObs[testId]);
          }
        }
      }
    });
  }, [pathname, testId]);

  const setObservation = useCallback((obs: Observation) => {
    setObservationState(obs);
    if (!testId) return;
    const normalizedRes = obs === "CHECK" ? "UNSURE" : (obs as ObservationResult);
    recordTestObservation(testId, normalizedRes, observationNotes);
    if (normalizedRes && !completedTestIds.includes(testId)) {
      setCompletedTestIds(prev => [...prev, testId]);
    }
  }, [testId, observationNotes, completedTestIds]);

  const setObservationNotes = useCallback((notes: string) => {
    setObservationNotesState(notes);
    if (!testId) return;
    const normalizedRes = observation === "CHECK" ? "UNSURE" : (observation as ObservationResult);
    recordTestObservation(testId, normalizedRes, notes);
  }, [testId, observation]);

  // Pixel Defect Marker helpers
  const addMarker = useCallback((x: number, y: number, viewportWidth: number, viewportHeight: number, type: PixelDefectType = "dead") => {
    if (!testId) return;
    const colorTag = activeColorName || undefined;
    const marker = addPixelDefectMarker(testId, x, y, viewportWidth, viewportHeight, type, colorTag);
    setPixelDefects(prev => [...prev, marker]);
    setActiveMarker(marker);
    setObservationState("ISSUE");
  }, [testId, activeColorName]);

  const removeMarker = useCallback((id: string) => {
    if (!testId) return;
    removePixelDefectMarker(testId, id);
    setPixelDefects(prev => prev.filter(m => m.id !== id));
    if (activeMarker?.id === id) setActiveMarker(null);
  }, [testId, activeMarker]);

  const updateMarker = useCallback((id: string, updates: Partial<PixelDefectMarker>) => {
    if (!testId) return;
    updatePixelDefectMarker(testId, id, updates);
    setPixelDefects(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  }, [testId]);

  // Workflow actions
  const startWorkflow = useCallback((sequence: string[], title?: string, workflowId?: string) => {
    const normalized = (sequence || [])
      .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
      .map((item) => (typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(item) : item));
    safeSessionSet(STORAGE_KEY_WORKFLOW, normalized);
    startNewInspectionSession(title || "Display Checkup", normalized, workflowId);
    if (normalized.length > 0) {
      router.push(normalized[0]);
    }
  }, [router]);

  const exitWorkflow = useCallback(() => {
    try { 
      sessionStorage.removeItem(STORAGE_KEY_WORKFLOW); 
    } catch {}
    safeSessionRemove(STORAGE_KEY_FULLSCREEN);
    setAutoTestSessionActive(false);
    setIsAutoTest(false);
    setWorkflowSequence([]);
    setWorkflowIndex(-1);
    setIsFullscreen(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    router.push("/");
  }, [router]);

  // Guided Auto Test controls
  const startGuidedAutoTest = useCallback((customQueue?: string[]) => {
    const queue = customQueue && customQueue.length > 0 ? customQueue : AUTO_TEST_QUEUE;
    const normalized = queue.map((item) => (
      typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(item) : item
    ));
    safeSessionSet(STORAGE_KEY_WORKFLOW, normalized);
    setAutoTestSessionActive(true);
    setAutoTestPaused(false);
    setIsAutoTest(true);
    setIsAutoTestPausedState(false);
    setAutoTestSecondsLeft(7);
    startNewInspectionSession("Guided Auto Screen Test", normalized, "auto-test");
    router.push(normalized[0]);
  }, [router]);

  const stopGuidedAutoTest = useCallback(() => {
    setAutoTestSessionActive(false);
    setAutoTestPaused(false);
    setIsAutoTest(false);
    setIsAutoTestPausedState(false);
  }, []);

  const toggleAutoTestPause = useCallback(() => {
    setIsAutoTestPausedState(prev => {
      const next = !prev;
      setAutoTestPaused(next);
      return next;
    });
  }, []);

  const hasNextInWorkflow = workflowIndex !== -1 && workflowIndex < workflowSequence.length - 1;
  const hasPrevInWorkflow = workflowIndex > 0;

  const goNextInWorkflow = useCallback(() => {
    if (hasNextInWorkflow) {
      const isCurrentlyFs = isFullscreen || (typeof document !== "undefined" && document.fullscreenElement !== null);
      if (isCurrentlyFs) {
        safeSessionSet(STORAGE_KEY_FULLSCREEN, true);
        if (!document.fullscreenElement && document.documentElement?.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      }
      const nextPath = workflowSequence[workflowIndex + 1];
      const target = typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(nextPath) : nextPath;
      router.push(target);
    } else if (workflowIndex === workflowSequence.length - 1) {
      // Done with workflow -> archive inspection, exit fullscreen and go to summary
      safeSessionRemove(STORAGE_KEY_FULLSCREEN);
      if (isAutoTest) {
        setAutoTestSessionActive(false);
      }
      archiveCurrentInspection();
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      router.push("/monitor-inspection/summary");
    }
  }, [hasNextInWorkflow, workflowIndex, workflowSequence, router, isFullscreen, isAutoTest]);

  const goPrevInWorkflow = useCallback(() => {
    if (hasPrevInWorkflow) {
      const isCurrentlyFs = isFullscreen || (typeof document !== "undefined" && document.fullscreenElement !== null);
      if (isCurrentlyFs) {
        safeSessionSet(STORAGE_KEY_FULLSCREEN, true);
        if (!document.fullscreenElement && document.documentElement?.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      }
      const prevPath = workflowSequence[workflowIndex - 1];
      const target = typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(prevPath) : prevPath;
      router.push(target);
    }
  }, [hasPrevInWorkflow, workflowIndex, workflowSequence, router, isFullscreen]);

  // Guided Auto Test timer for tests other than dead-pixel-test and custom-pattern
  const autoTestSecondsLeftRef = useRef(autoTestSecondsLeft);
  autoTestSecondsLeftRef.current = autoTestSecondsLeft;

  useEffect(() => {
    if (!isAutoTest || isAutoTestPausedState) return;
    if (testId === "dead-pixel-test" || testId === "custom-pattern") return;

    const timer = setInterval(() => {
      if (autoTestSecondsLeftRef.current <= 1) {
        setAutoTestSecondsLeft(7);
        if (!observation) {
          setObservation("PASS");
        }
        goNextInWorkflow();
      } else {
        setAutoTestSecondsLeft((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isAutoTest, isAutoTestPausedState, testId, observation, setObservation, goNextInWorkflow]);

  const skipTestInWorkflow = useCallback(() => {
    if (hasNextInWorkflow) {
      const isCurrentlyFs = isFullscreen || (typeof document !== "undefined" && document.fullscreenElement !== null);
      if (isCurrentlyFs) {
        safeSessionSet(STORAGE_KEY_FULLSCREEN, true);
        if (!document.fullscreenElement && document.documentElement?.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      }
      const nextPath = workflowSequence[workflowIndex + 1];
      const target = typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(nextPath) : nextPath;
      router.push(target);
    } else {
      safeSessionRemove(STORAGE_KEY_FULLSCREEN);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      router.push("/monitor-inspection/summary");
    }
  }, [hasNextInWorkflow, workflowIndex, workflowSequence, router, isFullscreen]);

  const restartWorkflow = useCallback(() => {
    if (workflowSequence.length > 0) {
      const target = typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(workflowSequence[0]) : workflowSequence[0];
      router.push(target);
    }
  }, [workflowSequence, router]);

  // Navigation handlers registered by children
  const navHandlers = useRef<{ next?: () => void; prev?: () => void; reset?: () => void }>({});

  const registerNavigation = useCallback((handlers: { next?: () => void; prev?: () => void; reset?: () => void }) => {
    navHandlers.current = { ...navHandlers.current, ...handlers };
  }, []);

  const navigateNext = useCallback(() => {
    if (navHandlers.current.next) {
      navHandlers.current.next();
    } else if (workflowIndex !== -1) {
      goNextInWorkflow();
    }
  }, [goNextInWorkflow, workflowIndex]);

  const navigatePrev = useCallback(() => {
    if (navHandlers.current.prev) {
      navHandlers.current.prev();
    } else if (workflowIndex !== -1) {
      goPrevInWorkflow();
    }
  }, [goPrevInWorkflow, workflowIndex]);
  
  const resetTest = useCallback(() => navHandlers.current.reset?.(), []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      const root = document.documentElement;
      const req = root.requestFullscreen ? root.requestFullscreen() : containerRef.current?.requestFullscreen();
      req?.then(() => {
        setIsFullscreen(true);
        safeSessionSet(STORAGE_KEY_FULLSCREEN, true);
      }).catch(() => {
        containerRef.current?.requestFullscreen?.().then(() => {
          setIsFullscreen(true);
          safeSessionSet(STORAGE_KEY_FULLSCREEN, true);
        }).catch(() => {});
      });
    } else if (document.fullscreenElement) {
      safeSessionRemove(STORAGE_KEY_FULLSCREEN);
      setIsFullscreen(false);
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, []);

  useEffect(() => {
    // Check fullscreen state on mount / route change
    const isDocFs = typeof document !== "undefined" && document.fullscreenElement !== null;
    const shouldBeFs = safeSessionGet<boolean>(STORAGE_KEY_FULLSCREEN, false);

    if (isDocFs) {
      queueMicrotask(() => {
        setIsFullscreen(true);
        safeSessionSet(STORAGE_KEY_FULLSCREEN, true);
      });
    } else if (shouldBeFs && workflowIndex !== -1) {
      queueMicrotask(() => {
        setIsFullscreen(true);
        if (document.documentElement?.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      });
    }

    const handleFullscreenChange = () => {
      const active = document.fullscreenElement !== null;
      setIsFullscreen(active);
      if (active) {
        safeSessionSet(STORAGE_KEY_FULLSCREEN, true);
      } else {
        safeSessionRemove(STORAGE_KEY_FULLSCREEN);
      }
    };
    
    const handleVisibilityChange = () => {
      if (document.hidden && isRunning) {
        setIsPaused(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isRunning, workflowIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.key === 'Escape' && isFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      else if (e.key === 'f' || e.key === 'F') toggleFullscreen();
      else if (e.key === 'ArrowRight') navigateNext();
      else if (e.key === 'ArrowLeft') navigatePrev();
      else if (e.key === 'r' || e.key === 'R') resetTest();
      else if (e.key === ' ') {
        e.preventDefault(); // Prevent scrolling
        setIsPaused(p => !p);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, navigateNext, navigatePrev, resetTest, toggleFullscreen]);

  return (
    <TestContext.Provider value={{ 
      isRunning, 
      isFullscreen, 
      isPaused, 
      setIsPaused, 
      navigateNext, 
      navigatePrev, 
      resetTest, 
      registerNavigation,
      toggleFullscreen,
      testId,
      observation,
      setObservation,
      observationNotes,
      setObservationNotes,
      pixelDefects,
      isPixelToolActive,
      setIsPixelToolActive,
      activeMarker,
      setActiveMarker,
      addMarker,
      removeMarker,
      updateMarker,
      workflowSequence,
      workflowIndex,
      startWorkflow,
      exitWorkflow,
      hasNextInWorkflow,
      hasPrevInWorkflow,
      goNextInWorkflow,
      goPrevInWorkflow,
      skipTestInWorkflow,
      restartWorkflow,
      isAutoTest,
      isAutoTestPaused: isAutoTestPausedState,
      autoTestSecondsLeft,
      toggleAutoTestPause,
      startGuidedAutoTest,
      stopGuidedAutoTest,
      activeColorName,
      setActiveColorName
    }}>
      <div className={cn(
        "flex flex-col w-full transition-all duration-300",
        isFullscreen ? "h-screen w-screen overflow-hidden bg-black fixed inset-0 z-50" : "max-w-7xl mx-auto py-12 px-4 sm:px-6 flex-1 items-start"
      )}>
        
        {/* Header - Only visible when inline */}
        {!isFullscreen && (
          <div className="w-full mb-8">
            {testId && (
              <Breadcrumbs items={[
                { label: tBreadcrumbs("tests"), href: "/tests" },
                { label: title, href: `/tests/${testId}` }
              ]} />
            )}
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{title}</h1>
                <div className="text-lg text-muted-foreground mt-2 max-w-3xl">
                  {description}
                </div>
              </div>
              
              <div className="flex flex-wrap sm:flex-nowrap items-center sm:items-stretch gap-2.5 shrink-0 self-start md:self-end">
                {/* Dedicated Fullscreen Trigger beside Queue Sequence */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs border border-slate-700/80 transition-all text-xs font-semibold hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  title="Toggle Fullscreen Mode [F]"
                  aria-label="Toggle Fullscreen Mode"
                >
                  <Maximize className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-mono text-xs font-bold whitespace-nowrap">
                    Fullscreen <span className="text-amber-400 hidden sm:inline">[F]</span>
                  </span>
                </button>

                {workflowIndex !== -1 && (
                  <div className="bg-muted/40 rounded-xl p-3 border border-border/60 text-right min-w-[210px]">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold font-mono">
                        {isAutoTest ? "Guided Auto Test" : (t.has("queue.sequenceLabel") ? t("queue.sequenceLabel") : "Queue Sequence")}
                      </span>
                      <button 
                        onClick={() => setIsQueueDrawerOpen(true)}
                        className="text-[11px] text-blue-600 hover:text-blue-700 font-medium underline"
                      >
                        {t.has("queue.manageQueue") ? t("queue.manageQueue") : "Manage Queue"}
                      </button>
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {t.has("queue.stepProgress") 
                        ? t("queue.stepProgress", { x: workflowIndex + 1, y: workflowSequence.length }) 
                        : `Test ${workflowIndex + 1} of ${workflowSequence.length}`}
                    </div>
                    <div className="w-full bg-border/60 h-1.5 rounded-full overflow-hidden mt-2">
                      <div 
                        className={cn("h-full rounded-full transition-all duration-300", isAutoTest ? "bg-amber-400" : "bg-blue-600")}
                        style={{ width: `${Math.round(((workflowIndex + 1) / Math.max(1, workflowSequence.length)) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Test Container (element that requests fullscreen) */}
        <div 
          ref={containerRef}
          className={cn(
            "w-full flex flex-col transition-all",
            isFullscreen 
              ? "fixed inset-0 h-screen w-screen bg-black z-50 overflow-hidden" 
              : "relative"
          )}
        >
          {/* Test Viewport */}
          <div 
            id="test-viewport"
            ref={viewportRef}
            className={cn(
              "relative w-full bg-black overflow-hidden select-none transition-all",
              isFullscreen 
                ? "flex-1 h-full w-full rounded-none border-none" 
                : "aspect-video rounded-xl border border-gray-200/90 shadow-sm min-h-[420px] sm:min-h-[500px]"
            )}
          >
            {/* Guided Auto Test Top Banner */}
            {isAutoTest && (
              <div 
                data-control-bar="true"
                className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[calc(100vw-1.5rem)] max-w-2xl bg-black/85 backdrop-blur-md text-white px-4 py-3 rounded-2xl border border-white/20 shadow-2xl z-40 animate-fade-in flex flex-col gap-2 pointer-events-auto"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                    <span className="text-xs font-mono font-bold tracking-wider text-amber-300 uppercase">
                      Guided Auto Test
                    </span>
                    <span className="text-xs font-mono text-gray-300">
                      • Test {workflowIndex !== -1 ? workflowIndex + 1 : 1} of {workflowSequence.length || 9}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={toggleAutoTestPause}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer",
                        isAutoTestPausedState
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs"
                          : "bg-white/15 hover:bg-white/25 text-white border border-white/20"
                      )}
                      title={isAutoTestPausedState ? "Resume auto test" : "Pause auto test"}
                    >
                      {isAutoTestPausedState ? "▶ Resume" : `⏸ Pause (${autoTestSecondsLeft}s)`}
                    </button>
                    {hasPrevInWorkflow && (
                      <button
                        type="button"
                        onClick={goPrevInWorkflow}
                        className="px-2 py-1 rounded-lg text-xs font-mono text-gray-300 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                        title="Previous test"
                      >
                        ❮ Prev
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={goNextInWorkflow}
                      className="px-2 py-1 rounded-lg text-xs font-mono text-gray-300 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                      title="Skip to next test"
                    >
                      Skip ❯
                    </button>
                    <button
                      type="button"
                      onClick={stopGuidedAutoTest}
                      className="text-gray-400 hover:text-red-400 text-xs px-1.5 py-1 transition-colors cursor-pointer ml-1"
                      title="Exit Guided Auto Test"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="text-xs text-gray-200 leading-snug border-t border-white/10 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span>
                    {testId === "dead-pixel-test"
                      ? "Look carefully across the entire screen for any pixel that remains a different color."
                      : "Your screen is now being checked with this visual pattern. Inspect the screen and select your observation below."}
                  </span>
                  {testId === "dead-pixel-test" && activeColorName && (
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-white/15 text-amber-300 shrink-0 self-start sm:self-auto">
                      COLOR: {activeColorName}
                    </span>
                  )}
                </div>
              </div>
            )}

            {children}
            {testId && (
              <PixelDefectOverlay
                testId={testId}
                isActive={isPixelToolActive}
                onToggleActive={() => setIsPixelToolActive(prev => !prev)}
                viewportRef={viewportRef}
                isFullscreen={isFullscreen}
              />
            )}
          </div>

          {/* Controls Target Container for portal */}
          <div id="test-controls-container" className={isFullscreen ? "contents" : "w-full mt-4 sm:mt-5"} />

          {/* Optional Extended Tool / Generator Controls (only when inline) */}
          {!isFullscreen && extraControls && (
            <div className="w-full mt-6">
              {extraControls}
            </div>
          )}
        </div>

        {/* Educational Content - Only visible when inline */}
        {!isFullscreen && instructions && (
          <div className="w-full mt-16 max-w-4xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
              {t("howToTest")}
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground text-lg leading-relaxed space-y-4">
              {instructions}
            </div>
          </div>
        )}
        
        {/* Knowledge Base Link for Relevant Test */}
        {!isFullscreen && testId && (
          (() => {
            const kbArticle = getArticleByTestId(testId);
            if (!kbArticle) return null;
            return (
              <div className="mt-12 w-full max-w-4xl p-4 bg-blue-50/50 border border-blue-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
                <div className="flex items-center gap-2.5 text-blue-950">
                  <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    Learn more in the Knowledge Base &bull; <strong>{kbArticle.title}</strong>
                  </span>
                </div>
                <Link
                  href={`/knowledge-base/${kbArticle.slug}`}
                  className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-900 hover:underline shrink-0"
                >
                  <span>Read Technical Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })()
        )}

        {/* Troubleshooting Link for Relevant Test */}
        {!isFullscreen && testId && (
          (() => {
            const topic = getTroubleshootingByTestId(testId);
            if (!topic) return null;
            return (
              <div className="mt-3 w-full max-w-4xl p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Wrench className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>
                    Having trouble with this test? &bull; <strong>{topic.title}</strong>
                  </span>
                </div>
                <Link
                  href={`/knowledge-base/troubleshooting#${topic.id}`}
                  className="inline-flex items-center gap-1.5 font-semibold text-purple-700 hover:text-purple-900 hover:underline shrink-0"
                >
                  <span>Troubleshooting Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })()
        )}
        
        {!isFullscreen && testId && (
          <div className="mt-16 w-full">
            <RelatedTests testId={testId} />
          </div>
        )}

        {/* Queue Drawer */}
        <QueueDrawer
          isOpen={isQueueDrawerOpen}
          onClose={() => setIsQueueDrawerOpen(false)}
          workflowSequence={workflowSequence}
          workflowIndex={workflowIndex}
          completedTestIds={completedTestIds}
        />
      </div>
    </TestContext.Provider>
  );
}
