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
  startNewInspectionSession 
} from "@/lib/inspectionStorage";
import { getTroubleshootingByTestId } from "@/data/troubleshooting";
import { getArticleByTestId } from "@/data/knowledgeBase";
import { Wrench, ArrowRight, BookOpen } from "lucide-react";
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
  const [isFullscreen, setIsFullscreen] = useState(() => {
    if (typeof document !== "undefined") {
      return document.fullscreenElement !== null || safeSessionGet<boolean>(STORAGE_KEY_FULLSCREEN, false);
    }
    return false;
  });
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
  
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  
  // Load workflow, active session & observation from storage on mount and route change
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
    const marker = addPixelDefectMarker(testId, x, y, viewportWidth, viewportHeight, type);
    setPixelDefects(prev => [...prev, marker]);
    setActiveMarker(marker);
    setObservationState("ISSUE");
  }, [testId]);

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
    setWorkflowSequence([]);
    setWorkflowIndex(-1);
    setIsFullscreen(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    router.push("/");
  }, [router]);

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
      // Done with workflow -> exit fullscreen and go to summary
      safeSessionRemove(STORAGE_KEY_FULLSCREEN);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      router.push("/monitor-inspection/summary");
    }
  }, [hasNextInWorkflow, workflowIndex, workflowSequence, router, isFullscreen]);

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
      restartWorkflow
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
              
              {workflowIndex !== -1 && (
                <div className="bg-muted/40 rounded-xl p-3 border border-border/60 text-right min-w-[210px]">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold font-mono">
                      {t.has("queue.sequenceLabel") ? t("queue.sequenceLabel") : "Queue Sequence"}
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
                      className="bg-blue-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.round(((workflowIndex + 1) / Math.max(1, workflowSequence.length)) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
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
