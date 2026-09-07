"use client";

import { useState, useEffect, useRef, ReactNode, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { TestContext, Observation } from "./TestContext";
import { normalizeWorkflowPath } from "@/lib/workflow";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedTests } from "@/components/layout/RelatedTests";
import { safeSessionGet, safeSessionSet, safeStorageGet, safeStorageSet } from "@/lib/browserCapabilities";
import { cn } from "@/lib/utils";

interface TestWrapperProps {
  title: string;
  description: ReactNode;
  instructions?: ReactNode;
  children: ReactNode;
  testId?: string;
}

const STORAGE_KEY_OBSERVATIONS = "monitor-tester-observations";
const STORAGE_KEY_WORKFLOW = "monitor-tester-workflow";

export function TestWrapper({ title, description, instructions, children, testId }: TestWrapperProps) {
  const t = useTranslations("TestWrapper");
  const router = useRouter();
  const pathname = usePathname();
  
  const isRunning = true; // Always running inline
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Observation State
  const [observation, setObservationState] = useState<Observation>(null);
  
  // Workflow State
  const [workflowSequence, setWorkflowSequence] = useState<string[]>([]);
  const [workflowIndex, setWorkflowIndex] = useState(-1);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Load workflow & observation from storage on mount
  useEffect(() => {
    queueMicrotask(() => {
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
      
      if (testId) {
        const parsedObs = safeStorageGet<Record<string, Observation>>(STORAGE_KEY_OBSERVATIONS, {});
        if (parsedObs[testId]) {
          setObservationState(parsedObs[testId]);
        }
      }
    });
  }, [pathname, testId]);

  const setObservation = useCallback((obs: Observation) => {
    setObservationState(obs);
    if (!testId) return;
    const parsedObs = safeStorageGet<Record<string, Observation>>(STORAGE_KEY_OBSERVATIONS, {});
    parsedObs[testId] = obs;
    safeStorageSet(STORAGE_KEY_OBSERVATIONS, parsedObs);
  }, [testId]);

  // Workflow actions
  const startWorkflow = useCallback((sequence: string[]) => {
    const normalized = (sequence || [])
      .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
      .map((item) => (typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(item) : item));
    safeSessionSet(STORAGE_KEY_WORKFLOW, normalized);
    if (normalized.length > 0) {
      router.push(normalized[0]);
    }
  }, [router]);

  const exitWorkflow = useCallback(() => {
    try { sessionStorage.removeItem(STORAGE_KEY_WORKFLOW); } catch {}
    setWorkflowSequence([]);
    setWorkflowIndex(-1);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    router.push("/");
  }, [router]);

  const hasNextInWorkflow = workflowIndex !== -1 && workflowIndex < workflowSequence.length - 1;
  const hasPrevInWorkflow = workflowIndex > 0;

  const goNextInWorkflow = useCallback(() => {
    if (hasNextInWorkflow) {
      const nextPath = workflowSequence[workflowIndex + 1];
      const target = typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(nextPath) : nextPath;
      router.push(target);
    } else if (workflowIndex === workflowSequence.length - 1) {
      // Done with workflow
      try { sessionStorage.removeItem(STORAGE_KEY_WORKFLOW); } catch {}
      setWorkflowSequence([]);
      setWorkflowIndex(-1);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      router.push("/monitor-inspection/summary");
    }
  }, [hasNextInWorkflow, workflowIndex, workflowSequence, router]);

  const goPrevInWorkflow = useCallback(() => {
    if (hasPrevInWorkflow) {
      const prevPath = workflowSequence[workflowIndex - 1];
      const target = typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(prevPath) : prevPath;
      router.push(target);
    }
  }, [hasPrevInWorkflow, workflowIndex, workflowSequence, router]);

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
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
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
  }, [isRunning]);

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
      workflowSequence,
      workflowIndex,
      startWorkflow,
      exitWorkflow,
      hasNextInWorkflow,
      hasPrevInWorkflow,
      goNextInWorkflow,
      goPrevInWorkflow
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
                { label: "Tests", href: "/tests" },
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
                <div className="bg-muted/50 rounded-lg p-3 border border-border/50 text-right min-w-[200px]">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Testing Sequence</div>
                  <div className="text-sm font-medium">Test {workflowIndex + 1} of {workflowSequence.length}</div>
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
            className={cn(
              "relative w-full bg-black overflow-hidden select-none transition-all",
              isFullscreen 
                ? "flex-1 h-full w-full rounded-none border-none" 
                : "aspect-video rounded-xl border border-gray-200/90 shadow-sm min-h-[420px] sm:min-h-[500px]"
            )}
          >
            {children}
          </div>

          {/* Controls Target Container for portal */}
          <div id="test-controls-container" className={isFullscreen ? "contents" : "w-full mt-4 sm:mt-5"} />
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
        
        {!isFullscreen && testId && (
          <div className="mt-16 w-full">
            <RelatedTests testId={testId} />
          </div>
        )}
      </div>
    </TestContext.Provider>
  );
}
