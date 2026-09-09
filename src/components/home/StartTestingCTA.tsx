"use client";

import { useRouter } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { 
  startNewInspectionSession, 
  AUTO_TEST_QUEUE, 
  setAutoTestSessionActive, 
  setAutoTestPaused 
} from "@/lib/inspectionStorage";

export const BASIC_SCREEN_CHECK_PATHS = AUTO_TEST_QUEUE;

interface StartTestingCTAProps {
  label: string;
}

export function StartTestingCTA({ label }: StartTestingCTAProps) {
  const router = useRouter();

  const handleStartBasicCheck = () => {
    setAutoTestSessionActive(false);
    setAutoTestPaused(false);
    // Initialize active inspection session queue with the Basic Screen Check
    startNewInspectionSession(
      "Basic Screen Check",
      BASIC_SCREEN_CHECK_PATHS,
      "basic-check"
    );

    // Route to first test in queue (Solid Color / Dead Pixel Test)
    router.push("/tests/dead-pixel-test");
  };

  return (
    <button
      onClick={handleStartBasicCheck}
      type="button"
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-900 text-white font-medium text-xs sm:text-[13.5px] px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-gray-900 cursor-pointer"
      title="Start basic display test sequence covering solid colors, gradients, contrast, patterns, and motion"
    >
      <span>{label}</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </button>
  );
}
