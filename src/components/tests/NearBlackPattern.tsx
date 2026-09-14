"use client";

import { useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { TestInlineControls } from "../test-runner/TestInlineControls";
import { Eye, EyeOff, Info, ShieldAlert, Maximize } from "lucide-react";
import { useTranslations } from "next-intl";

interface NearBlackPatternProps {
  testId?: string;
}

interface StepItem {
  percent: string;
  rgbValue: number; // 0-255 (round((percent / 100) * 255))
  hex: string;
}

const NEAR_BLACK_STEPS: StepItem[] = [
  { percent: "0%", rgbValue: 0, hex: "#000000" },
  { percent: "0.25%", rgbValue: 1, hex: "#010101" },
  { percent: "0.5%", rgbValue: 1.5, hex: "#020202" },
  { percent: "1%", rgbValue: 3, hex: "#030303" },
  { percent: "2%", rgbValue: 5, hex: "#050505" },
  { percent: "3%", rgbValue: 8, hex: "#080808" },
  { percent: "4%", rgbValue: 10, hex: "#0A0A0A" },
  { percent: "5%", rgbValue: 13, hex: "#0D0D0D" },
  { percent: "6%", rgbValue: 15, hex: "#0F0F0F" },
  { percent: "8%", rgbValue: 20, hex: "#141414" },
  { percent: "10%", rgbValue: 26, hex: "#1A1A1A" },
  { percent: "12%", rgbValue: 31, hex: "#1F1F1F" }
];

export function NearBlackPattern({ testId = "near-black-test" }: NearBlackPatternProps) {
    const t = useTranslations("Tests.NearBlackPattern");
  const { toggleFullscreen } = useTestContext();
  const [showLabels, setShowLabels] = useState(true);
  const [selectedStep, setSelectedStep] = useState<StepItem | null>(null);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Visual Near-Black Field */}
      <div className="relative w-full aspect-video min-h-[460px] max-h-[75vh] bg-black rounded-2xl overflow-hidden border border-slate-900 shadow-2xl flex flex-col items-center justify-center p-6 select-none">
        
        {/* Fullscreen Background Mode if a single step is inspected */}
        {selectedStep !== null ? (
          <div
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 relative"
            style={{ backgroundColor: `rgb(${selectedStep.rgbValue}, ${selectedStep.rgbValue}, ${selectedStep.rgbValue})` }}
            onClick={() => setSelectedStep(null)}
          >
            {/* Center Reference Swatch */}
            <div className="w-32 h-32 rounded-2xl border border-slate-700/50 bg-black flex flex-col items-center justify-center text-center p-2 shadow-2xl">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{t("0Reference")}</span>
              <span className="text-xs font-mono text-slate-400 font-bold mt-1">{t("trueBlack")}</span>
            </div>

            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-white">
              {t("inspecting")}<strong>{selectedStep.percent} {t("field")}</strong> {t("clickAnywhereToReturn")}</div>
          </div>
        ) : (
          /* Grid of Near-Black Steps */
          <div className="w-full max-w-4xl flex flex-col items-center space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                {t("lowLuminanceStepDiscrimination")}</span>
              <p className="text-xs text-slate-500 max-w-lg">
                {t("darkenRoomLightingObserve")}</p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 w-full">
              {NEAR_BLACK_STEPS.map((step) => {
                const lum = Math.round(step.rgbValue);
                return (
                  <button
                    key={step.percent}
                    onClick={() => setSelectedStep(step)}
                    className="group flex flex-col items-center p-2.5 rounded-xl border border-slate-800/80 bg-slate-950/80 hover:border-slate-600 transition-all text-center focus:outline-hidden focus:ring-1 focus:ring-slate-400"
                  >
                    <div
                      className="w-full aspect-square rounded-lg border border-slate-800/60 flex items-center justify-center relative shadow-inner"
                      style={{ backgroundColor: `rgb(${lum}, ${lum}, ${lum})` }}
                    >
                      {/* Subtle inner discrimination ring */}
                      <div className="w-5 h-5 rounded-full border border-black/40 flex items-center justify-center">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: `rgb(${Math.max(0, lum - 1)}, ${Math.max(0, lum - 1)}, ${Math.max(0, lum - 1)})` }}
                        />
                      </div>
                    </div>

                    <div className="mt-2 h-7 flex flex-col items-center justify-center">
                      {showLabels ? (
                        <>
                          <span className="text-[11px] font-mono font-semibold text-slate-300">
                            {step.percent}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500">
                            {t("rgb")}{lum}
                          </span>
                        </>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-600 italic">
                          {t("clickToTest")}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <TestInlineControls>
      {/* Control Strip */}
      <div className="mt-6 w-full max-w-4xl bg-card border border-border/70 rounded-2xl p-5 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLabels(prev => !prev)}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-muted hover:bg-muted/80 text-foreground text-xs font-medium rounded-xl transition-colors"
            >
              {showLabels ? <EyeOff className="w-3.5 h-3.5 text-slate-400" /> : <Eye className="w-3.5 h-3.5 text-emerald-500" />}
              {showLabels ? "Hide Step Labels (Blind Test)" : "Show Step Labels"}
            </button>
            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-muted hover:bg-muted/80 text-foreground text-xs font-medium rounded-xl transition-colors"
            >
              <Maximize className="w-3.5 h-3.5" />
              {t("toggleFullscreen")}</button>
          </div>

          <span className="text-xs text-muted-foreground font-mono">
            {selectedStep ? `Inspecting ${selectedStep.percent} Gray` : "Click any tile for full-screen field inspection"}
          </span>
        </div>

        {/* Technical Honesty Disclaimer Banner */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{t("hardwareBoundaryNotice")}</span>
          </div>
          <p>
            {t("webBrowsersCanOutput")}<strong>{t("cannotMeasureThePhysical")}</strong>{t("inabilityToDiscernSteps")}</p>
        </div>

        {/* Inspection Guidance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-muted-foreground">
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("1AmbientLighting")}</strong> {t("turnOffRoomLights")}</div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("2GammaSettings")}</strong> {t("ifStepsBelow3")}</div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("3OledNearBlack")}</strong> {t("selfEmissiveOledSubpixels")}</div>
          </div>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground">{t("4ViewingAngle")}</strong> {t("onVaAndTn")}</div>
          </div>
        </div>
      </div>
      </TestInlineControls>

      <TestControlBar testId={testId} title={t("nearBlackShadowDetailTitle")} />
    </div>
  );
}
