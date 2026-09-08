"use client";

import { useRouter } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { startNewInspectionSession } from "@/lib/inspectionStorage";

export const BASIC_SCREEN_CHECK_PATHS = [
  "/tests/dead-pixel-test",     // 1. Solid Color Test (Dead pixels, bright spots, 15 color/gray fields)
  "/tests/uniformity-test",     // 2. Uniformity Test (Panel cleanliness, clouding, vignetting & DSE)
  "/tests/color-banding-test",  // 3. Gradient Test (Banding, H/V gradients, RGB channels, bit depth)
  "/tests/contrast-test",       // 4. Contrast Test (25-step contrast, dark & bright steps)
  "/tests/brightness-test",     // 5. Brightness Test (Near-black shadow ramp & peak white)
  "/tests/gamma-test",          // 6. Gamma Test (Gamma 2.2 tracking steps)
  "/tests/sharpness-test",      // 7. Pattern Test (Fine grid, lines, text clarity & pixel alignment)
  "/tests/ghosting-test",       // 8. Motion & Ghosting (Moving blocks, response time & ghosting trails)
  "/tests/custom-pattern"       // 9. Precision Patterns (2D Grid, Checkerboard, Horizontal & Vertical Lines)
];

interface StartTestingCTAProps {
  label: string;
}

export function StartTestingCTA({ label }: StartTestingCTAProps) {
  const router = useRouter();

  const handleStartBasicCheck = () => {
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
