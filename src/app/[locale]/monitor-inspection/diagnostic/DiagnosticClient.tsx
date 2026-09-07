"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  AlertCircle, 
  CheckCircle2
} from "lucide-react";
import { monitorTests } from "@/data/tests";
import { startNewInspectionSession } from "@/lib/inspectionStorage";

interface SymptomOption {
  id: string;
  label: string;
  description: string;
  recommendedTestIds: string[];
  rationale: string;
}

const SYMPTOMS: SymptomOption[] = [
  {
    id: "dead-pixel",
    label: "Dead or stuck pixel",
    description: "Tiny dark dot that won't light up, or a bright colored subpixel permanently stuck on.",
    recommendedTestIds: ["dead-pixel-test", "stuck-pixel-test", "solid-color-test"],
    rationale: "Cycles pure primary solid color fields to visually isolate inactive black pixels from stuck red/green/blue subpixels."
  },
  {
    id: "strange-colors",
    label: "Strange or washed out colors",
    description: "Tints look unnatural, dull, oversaturated, or skin tones appear tinted.",
    recommendedTestIds: ["color-test", "color-gamut-test", "color-banding-test", "gamma-test"],
    rationale: "Evaluates standard sRGB primaries, smooth 8-bit/10-bit color ramps, and gamma tracking curves."
  },
  {
    id: "too-dark",
    label: "Too dark / crushed shadows",
    description: "Dark game scenes or night photos lose all detail and crush completely to black.",
    recommendedTestIds: ["black-level-test", "brightness-test", "gamma-test"],
    rationale: "Tests step-by-step luminance thresholds near 0% black so you can calibrate black level and shadow visibility."
  },
  {
    id: "too-bright",
    label: "Too bright / blown-out highlights",
    description: "Clouds, skies, or bright UI elements wash out and lose fine texture into pure white.",
    recommendedTestIds: ["white-level-test", "contrast-test", "brightness-test"],
    rationale: "Checks step-by-step luminance clipping from 95% to 100% white to prevent dynamic range highlight blow-out."
  },
  {
    id: "bright-corners",
    label: "Bright corners / edge glow",
    description: "Corners or bezels glow brightly when displaying dark or letterboxed content.",
    recommendedTestIds: ["backlight-bleed-test", "uniformity-test", "viewing-angle-test"],
    rationale: "Uses dark-room black fields to distinguish physical bezel pressure bleed from normal viewing-angle IPS glow."
  },
  {
    id: "uneven-brightness",
    label: "Uneven brightness / dark patches",
    description: "Certain areas of the screen appear darker, dirty, cloudy, or vignetted.",
    recommendedTestIds: ["uniformity-test", "burn-in-test"],
    rationale: "Evaluates 5%, 15%, and 50% neutral gray fields across the entire panel to locate dirty screen effect (DSE)."
  },
  {
    id: "blurry-text",
    label: "Blurry or fringed text",
    description: "Fonts appear fuzzy, not razor-sharp, or have faint color halos along letters.",
    recommendedTestIds: ["resolution-checker", "sharpness-test"],
    rationale: "Verifies if the OS scaling and resolution match native panel pixel layout, and inspects anti-aliasing sharpness."
  },
  {
    id: "motion-trails",
    label: "Motion trails / ghosting",
    description: "Objects leave a visible blur, smudge, or trailing shadow when moving across the screen.",
    recommendedTestIds: ["ghosting-test", "motion-blur-test", "refresh-rate-test"],
    rationale: "Runs variable velocity contrast blocks to visually inspect liquid crystal transition lag and overdrive tuning."
  },
  {
    id: "flickering",
    label: "Screen flickering / eye strain",
    description: "Subtle rapid pulsing, luminance shimmering, or strain during extended viewing.",
    recommendedTestIds: ["screen-flicker-test", "refresh-rate-test"],
    rationale: "Tests high-speed alternating frame patterns to evaluate PWM backlight sensitivity and frame timing stability."
  },
  {
    id: "screen-tearing",
    label: "Screen tearing / split lines",
    description: "Horizontal split breaks appear across the screen during fast camera pans or video.",
    recommendedTestIds: ["screen-tearing-test", "refresh-rate-test"],
    rationale: "Tests high-velocity oscillating lines to evaluate browser V-Sync lock and frame synchronization behavior."
  },
  {
    id: "image-retention",
    label: "Image retention / faint ghosting",
    description: "A faint after-image of static windows, taskbars, or logos lingers on the screen.",
    recommendedTestIds: ["burn-in-test", "uniformity-test"],
    rationale: "Displays multiple uniform gray and primary fields with inspection grids to reveal temporary retention or burn-in."
  },
  {
    id: "something-else",
    label: "General / Not sure",
    description: "I want a comprehensive baseline checkup across all critical display aspects.",
    recommendedTestIds: ["resolution-checker", "dead-pixel-test", "color-test", "brightness-test", "contrast-test", "ghosting-test", "refresh-rate-test"],
    rationale: "Runs the complete fundamental display diagnostic sequence."
  }
];

export function DiagnosticClient() {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      
      // Auto-update selected tests based on union of recommended test IDs
      const recommended = new Set<string>();
      next.forEach(symId => {
        const item = SYMPTOMS.find(s => s.id === symId);
        if (item) {
          item.recommendedTestIds.forEach(tid => recommended.add(tid));
        }
      });
      setSelectedTests(Array.from(recommended));
      return next;
    });
  };

  const toggleTest = (testId: string) => {
    setSelectedTests(prev => 
      prev.includes(testId) ? prev.filter(id => id !== testId) : [...prev, testId]
    );
  };

  const handleStartQueue = () => {
    if (selectedTests.length === 0) return;

    const queuePaths = selectedTests.map(id => `/tests/${id}`);
    startNewInspectionSession("Diagnostic Checkup", queuePaths, "diagnostic");
    router.push(queuePaths[0]);
  };

  return (
    <div className="bg-white min-h-screen py-10 sm:py-14 text-gray-900">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 mb-6">
          <Link href="/monitor-inspection" className="hover:text-gray-900 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>INSPECTION HUB</span>
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">DIAGNOSTIC WIZARD</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-gray-400 mb-2">
            SYMPTOM-BASED GUIDANCE
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950">
            Something looks wrong with your display?
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Select the visual artifacts or issues you are experiencing. We will recommend the exact tests to inspect and verify the behavior.
          </p>
        </div>

        {/* Step 1: What do you see? */}
        <div className="mb-12">
          <h2 className="text-xs font-mono uppercase font-bold tracking-wider text-gray-400 mb-4">
            STEP 1 — WHAT DO YOU OBSERVE? (SELECT ALL THAT APPLY)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {SYMPTOMS.map(symptom => {
              const isSelected = selectedSymptoms.includes(symptom.id);
              return (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  type="button"
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                    isSelected 
                      ? "border-gray-950 bg-gray-50 shadow-xs ring-1 ring-gray-950" 
                      : "border-gray-200/90 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-xs sm:text-[13px] text-gray-950">
                        {symptom.label}
                      </span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? "bg-gray-950 border-gray-950 text-white" : "border-gray-300 bg-white"
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug">
                      {symptom.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Recommendations */}
        {selectedSymptoms.length > 0 && (
          <div className="pt-8 border-t border-gray-100 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xs font-mono uppercase font-bold tracking-wider text-gray-400">
                  STEP 2 — RECOMMENDED DIAGNOSTIC TESTS ({selectedTests.length})
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  We selected these tests based on your observation. Uncheck any tests you do not wish to run.
                </p>
              </div>

              <button
                onClick={handleStartQueue}
                disabled={selectedTests.length === 0}
                className="inline-flex items-center justify-center gap-2 bg-gray-950 hover:bg-black text-white font-medium text-xs sm:text-sm px-6 py-3 rounded-lg transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer"
              >
                <span>Start Diagnostic Queue ({selectedTests.length} tests)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {selectedTests.map(testId => {
                const testMeta = monitorTests.find(t => t.id === testId);
                const relatedSymptoms = SYMPTOMS.filter(s => 
                  selectedSymptoms.includes(s.id) && s.recommendedTestIds.includes(testId)
                );

                return (
                  <div 
                    key={testId}
                    className="p-4 rounded-xl border border-gray-200/90 bg-white hover:border-gray-300 transition-colors flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => toggleTest(testId)}
                        className="mt-0.5 text-gray-900 cursor-pointer"
                        aria-label={`Toggle ${testId}`}
                      >
                        <CheckCircle2 className="w-5 h-5 text-gray-950 stroke-[2.2]" />
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs sm:text-sm text-gray-950 capitalize">
                            {testId.replace(/-/g, " ").replace("test", "Test")}
                          </span>
                          <span className="text-[10px] font-mono uppercase bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {testMeta?.category || "test"}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                          {relatedSymptoms.map(s => s.rationale).join(" ")}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/tests/${testId}`}
                      className="text-xs font-medium text-gray-500 hover:text-gray-950 whitespace-nowrap transition-colors flex items-center gap-1 pt-0.5"
                    >
                      <span>Preview</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-gray-50/70 border border-gray-200/80 rounded-xl text-xs text-gray-600 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-gray-700 shrink-0 mt-0.5" />
              <p>
                <strong>Diagnostic Note:</strong> These browser tests present standard visual reference patterns to inspect pixel performance, luminance, color, and motion. They do not automatically diagnose internal component faults. If an anomaly persists across multiple browsers and devices, consult your monitor manufacturer’s warranty policy.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
