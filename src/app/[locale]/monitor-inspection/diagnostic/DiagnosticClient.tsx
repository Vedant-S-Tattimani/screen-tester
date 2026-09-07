"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  AlertCircle, 
  CheckCircle2
} from "lucide-react";
import { monitorTests } from "@/data/tests";
import { startNewInspectionSession } from "@/lib/inspectionStorage";

interface SymptomConfig {
  id: string;
  key: string;
  recommendedTestIds: string[];
}

const SYMPTOM_CONFIGS: SymptomConfig[] = [
  {
    id: "dead-pixel",
    key: "deadPixel",
    recommendedTestIds: ["dead-pixel-test", "stuck-pixel-test", "solid-color-test"],
  },
  {
    id: "strange-colors",
    key: "strangeColors",
    recommendedTestIds: ["color-test", "color-gamut-test", "color-banding-test", "gamma-test"],
  },
  {
    id: "too-dark",
    key: "tooDark",
    recommendedTestIds: ["black-level-test", "brightness-test", "gamma-test"],
  },
  {
    id: "too-bright",
    key: "tooBright",
    recommendedTestIds: ["white-level-test", "contrast-test", "brightness-test"],
  },
  {
    id: "bright-corners",
    key: "brightCorners",
    recommendedTestIds: ["backlight-bleed-test", "uniformity-test", "viewing-angle-test"],
  },
  {
    id: "uneven-brightness",
    key: "unevenBrightness",
    recommendedTestIds: ["uniformity-test", "burn-in-test"],
  },
  {
    id: "blurry-text",
    key: "blurryText",
    recommendedTestIds: ["resolution-checker", "sharpness-test"],
  },
  {
    id: "motion-trails",
    key: "motionTrails",
    recommendedTestIds: ["ghosting-test", "motion-blur-test", "refresh-rate-test"],
  },
  {
    id: "flickering",
    key: "flickering",
    recommendedTestIds: ["screen-flicker-test", "refresh-rate-test"],
  },
  {
    id: "screen-tearing",
    key: "screenTearing",
    recommendedTestIds: ["screen-tearing-test", "refresh-rate-test"],
  },
  {
    id: "image-retention",
    key: "imageRetention",
    recommendedTestIds: ["burn-in-test", "uniformity-test"],
  },
  {
    id: "something-else",
    key: "somethingElse",
    recommendedTestIds: ["resolution-checker", "dead-pixel-test", "color-test", "brightness-test", "contrast-test", "ghosting-test", "refresh-rate-test"],
  }
];

export function DiagnosticClient() {
  const router = useRouter();
  const t = useTranslations("Diagnostic");
  const tHub = useTranslations("Inspection.hub");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      
      // Auto-update selected tests based on union of recommended test IDs
      const recommended = new Set<string>();
      next.forEach(symId => {
        const item = SYMPTOM_CONFIGS.find(s => s.id === symId);
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
            <span>{t("breadcrumbHub")}</span>
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{tHub("diagnosticEyebrow")}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-gray-400 mb-2">
            {t("eyebrow")}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950">
            {t("title")}
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Step 1: What do you see? */}
        <div className="mb-12">
          <h2 className="text-xs font-mono uppercase font-bold tracking-wider text-gray-400 mb-4">
            {t("step1Title")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {SYMPTOM_CONFIGS.map(symptom => {
              const isSelected = selectedSymptoms.includes(symptom.id);
              const label = t(`symptoms.${symptom.key}.label`);
              const description = t(`symptoms.${symptom.key}.desc`);

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
                        {label}
                      </span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? "bg-gray-950 border-gray-950 text-white" : "border-gray-300 bg-white"
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug">
                      {description}
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
                  {t("step2Title", { count: selectedTests.length })}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {t("step2Subtitle")}
                </p>
              </div>

              <button
                onClick={handleStartQueue}
                disabled={selectedTests.length === 0}
                className="inline-flex items-center justify-center gap-2 bg-gray-950 hover:bg-black text-white font-medium text-xs sm:text-sm px-6 py-3 rounded-lg transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer"
              >
                <span>{t("startQueue", { count: selectedTests.length })}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {selectedTests.map(testId => {
                const testMeta = monitorTests.find(t => t.id === testId);
                const relatedSymptoms = SYMPTOM_CONFIGS.filter(s =>
                  selectedSymptoms.includes(s.id) && s.recommendedTestIds.includes(testId)
                );
                const testDisplayName = testId.replace(/-/g, " ").replace("test", "Test");

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
                        aria-label={t("toggleTest", { test: testDisplayName })}
                      >
                        <CheckCircle2 className="w-5 h-5 text-gray-950 stroke-[2.2]" />
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs sm:text-sm text-gray-950 capitalize">
                            {testDisplayName}
                          </span>
                          <span className="text-[10px] font-mono uppercase bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {testMeta?.category || "test"}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                          {relatedSymptoms.map(s => t(`symptoms.${s.key}.rationale`)).join(" ")}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/tests/${testId}`}
                      className="text-xs font-medium text-gray-500 hover:text-gray-950 whitespace-nowrap transition-colors flex items-center gap-1 pt-0.5"
                    >
                      <span>{t("preview")}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-gray-50/70 border border-gray-200/80 rounded-xl text-xs text-gray-600 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-gray-700 shrink-0 mt-0.5" />
              <p>
                <strong>{t("noteTitle")}</strong> {t("noteBody")}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
