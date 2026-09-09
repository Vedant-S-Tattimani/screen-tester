"use client";

import { createContext, useContext } from "react";
import { useRouter } from "@/i18n/routing";
import { normalizeWorkflowPath } from "@/lib/workflow";
import { 
  startNewInspectionSession, 
  PixelDefectMarker, 
  PixelDefectType 
} from "@/lib/inspectionStorage";

export { normalizeWorkflowPath } from "@/lib/workflow";
export type Observation = "PASS" | "CHECK" | "ISSUE" | "UNSURE" | "LOOKS_NORMAL" | "NEEDS_ATTENTION" | null;

export interface TestContextType {
  // Navigation & State
  isRunning: boolean;
  isFullscreen: boolean;
  isPaused: boolean;
  setIsPaused: (paused: boolean | ((prev: boolean) => boolean)) => void;
  navigateNext: () => void;
  navigatePrev: () => void;
  resetTest: () => void;
  registerNavigation: (handlers: { next?: () => void; prev?: () => void; reset?: () => void }) => void;
  toggleFullscreen: () => void;

  // Observation System
  testId?: string;
  observation: Observation;
  setObservation: (obs: Observation) => void;
  observationNotes: string;
  setObservationNotes: (notes: string) => void;
  
  // Pixel Defect Marking System (USER-MARKED / OBSERVED)
  pixelDefects: PixelDefectMarker[];
  isPixelToolActive: boolean;
  setIsPixelToolActive: (active: boolean | ((p: boolean) => boolean)) => void;
  activeMarker: PixelDefectMarker | null;
  setActiveMarker: (marker: PixelDefectMarker | null) => void;
  addMarker: (x: number, y: number, viewportWidth: number, viewportHeight: number, type?: PixelDefectType) => void;
  removeMarker: (id: string) => void;
  updateMarker: (id: string, updates: Partial<PixelDefectMarker>) => void;

  // Workflow / Queue Sequence
  workflowSequence: string[];
  workflowIndex: number;
  startWorkflow: (sequence: string[], title?: string, workflowId?: string) => void;
  exitWorkflow: () => void;
  hasNextInWorkflow: boolean;
  hasPrevInWorkflow: boolean;
  goNextInWorkflow: () => void;
  goPrevInWorkflow: () => void;
  skipTestInWorkflow: () => void;
  restartWorkflow: () => void;

  // Guided Auto Test System
  isAutoTest: boolean;
  isAutoTestPaused: boolean;
  autoTestSecondsLeft: number;
  toggleAutoTestPause: () => void;
  startGuidedAutoTest: (customQueue?: string[]) => void;
  stopGuidedAutoTest: () => void;
  activeColorName: string;
  setActiveColorName: (name: string) => void;
}

export const TestContext = createContext<TestContextType>({
  isRunning: false,
  isFullscreen: false,
  isPaused: false,
  setIsPaused: () => {},
  navigateNext: () => {},
  navigatePrev: () => {},
  resetTest: () => {},
  registerNavigation: () => {},
  toggleFullscreen: () => {},
  testId: undefined,
  observation: null,
  setObservation: () => {},
  observationNotes: "",
  setObservationNotes: () => {},
  pixelDefects: [],
  isPixelToolActive: false,
  setIsPixelToolActive: () => {},
  activeMarker: null,
  setActiveMarker: () => {},
  addMarker: () => {},
  removeMarker: () => {},
  updateMarker: () => {},
  workflowSequence: [],
  workflowIndex: -1,
  startWorkflow: () => {},
  exitWorkflow: () => {},
  hasNextInWorkflow: false,
  hasPrevInWorkflow: false,
  goNextInWorkflow: () => {},
  goPrevInWorkflow: () => {},
  skipTestInWorkflow: () => {},
  restartWorkflow: () => {},
  isAutoTest: false,
  isAutoTestPaused: false,
  autoTestSecondsLeft: 0,
  toggleAutoTestPause: () => {},
  startGuidedAutoTest: () => {},
  stopGuidedAutoTest: () => {},
  activeColorName: "",
  setActiveColorName: () => {},
});

export function useTestContext() {
  return useContext(TestContext);
}

export function useWorkflowLauncher() {
  const router = useRouter();

  const startWorkflow = (sequence: string[], title?: string, workflowId?: string) => {
    const normalized = (sequence || []).map((item) => (
      typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(item) : item
    ));
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("monitor-tester-workflow", JSON.stringify(normalized));
        startNewInspectionSession(title || "Display Checkup", normalized, workflowId);
      }
    } catch {}
    if (normalized.length > 0) {
      router.push(normalized[0]);
    }
  };

  return { startWorkflow };
}