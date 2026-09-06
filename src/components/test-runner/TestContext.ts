"use client";

import { createContext, useContext } from "react";
import { useRouter } from "@/i18n/routing";
import { normalizeWorkflowPath } from "@/lib/workflow";

export { normalizeWorkflowPath } from "@/lib/workflow";
export type Observation = "PASS" | "CHECK" | "ISSUE" | null;

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
  
  // Workflow / Sequences
  workflowSequence: string[];
  workflowIndex: number;
  startWorkflow: (sequence: string[]) => void;
  exitWorkflow: () => void;
  hasNextInWorkflow: boolean;
  hasPrevInWorkflow: boolean;
  goNextInWorkflow: () => void;
  goPrevInWorkflow: () => void;
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
  workflowSequence: [],
  workflowIndex: -1,
  startWorkflow: () => {},
  exitWorkflow: () => {},
  hasNextInWorkflow: false,
  hasPrevInWorkflow: false,
  goNextInWorkflow: () => {},
  goPrevInWorkflow: () => {},
});

export function useTestContext() {
  return useContext(TestContext);
}

export function useWorkflowLauncher() {
  const router = useRouter();

  const startWorkflow = (sequence: string[]) => {
    const normalized = (sequence || []).map((item) => (
      typeof normalizeWorkflowPath === "function" ? normalizeWorkflowPath(item) : item
    ));
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("monitor-tester-workflow", JSON.stringify(normalized));
      }
    } catch {}
    if (normalized.length > 0) {
      router.push(normalized[0]);
    }
  };

  return { startWorkflow };
}