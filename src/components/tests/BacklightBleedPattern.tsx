"use client";

import { useState } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { Maximize, ShieldAlert, Info, Move } from "lucide-react";
import { useTranslations } from "next-intl";

interface BacklightBleedPatternProps {
  testId?: string;
}

type BlackFieldLevel = "0%" | "2%" | "5%";

export function BacklightBleedPattern({ testId = "backlight-bleed-test" }: BacklightBleedPatternProps) {
    const t = useTranslations("Tests.BacklightBleedPattern");
  const [level, setLevel] = useState<BlackFieldLevel>("0%");
  const [showCornerMarkers, setShowCornerMarkers] = useState(true);
  const [showAngleGuide, setShowAngleGuide] = useState(false);

  const getBackgroundColor = () => {
    switch (level) {
      case "0%": return "#000000";
      case "2%": return "rgb(5, 5, 5)";
      case "5%": return "rgb(13, 13, 13)";
      default: return "#000000";
    }
  };

  return (
    <>
      {/* Full-Screen Visual Inspection Canvas */}
      <div
        className="absolute inset-0 select-none overflow-hidden flex items-center justify-center p-4 transition-colors duration-200"
        style={{ backgroundColor: getBackgroundColor() }}
      >
        {/* Optional Corner Calibration Markers */}
        {showCornerMarkers && (
          <>
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-slate-700/60 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-slate-700/60 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-20 left-4 w-12 h-12 border-b-2 border-l-2 border-slate-700/60 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-20 right-4 w-12 h-12 border-b-2 border-r-2 border-slate-700/60 rounded-br-lg pointer-events-none" />
          </>
        )}

        {/* Top Dark Field Inspection Guide Banner */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-4xl mx-auto px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white shadow-xl text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="font-bold text-amber-300">{t("darkFieldInspection")}{level})</span>
            <span className="text-white/60 hidden md:inline">{t("testInADark")}</span>
          </div>
          <button
            type="button"
            onClick={() => setShowAngleGuide(!showAngleGuide)}
            className="px-2.5 py-1 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white font-sans text-xs font-semibold cursor-pointer transition-colors shadow-xs shrink-0"
          >
            {showAngleGuide ? "Hide Guide" : "Bleed vs IPS Glow Guide"}
          </button>
        </div>

        {/* Center Viewing Angle & Discrimination Guide Modal */}
        {showAngleGuide ? (
          <div className="relative z-30 p-5 sm:p-6 max-w-lg w-[92%] bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700/80 text-center space-y-4 shadow-2xl text-slate-200">
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
              <Move className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-mono uppercase font-bold text-white tracking-wider">
                {t("howToDistinguishBacklight")}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t("stepBack1Meter")}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-[11px] pt-2 border-t border-slate-800">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <strong className="text-amber-400 block mb-1">{t("ipsGlowNormalPhysics")}</strong>
                <span className="text-slate-300">{t("diffuseCornerSheenThat")}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <strong className="text-rose-400 block mb-1">{t("backlightBleedHardwareDefect")}</strong>
                <span className="text-slate-300">{t("torchLikeBrightLight")}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAngleGuide(false)}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              {t("closeGuideContinueTesting")}</button>
          </div>
        ) : (
          <div className="text-center space-y-2 opacity-30 hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
              {t("pureDarkFieldInspection")}{level})
            </span>
            <span className="text-[11px] font-mono text-slate-500 block">
              {t("inspectEdgesInDark")}</span>
          </div>
        )}
      </div>

      {/* Control Bar Dock */}
      <TestControlBar testId={testId} title={t("backlightBleedVsIpsTitle")}>
        <div className="flex flex-wrap items-center gap-2">
          {/* Level Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-black/60 p-1 rounded-xl border border-slate-200 dark:border-white/20">
            <span className="text-[11px] font-mono px-2 text-amber-600 dark:text-amber-300 font-bold uppercase tracking-wider">{t("field")}</span>
            {(["0%", "2%", "5%"] as BlackFieldLevel[]).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setLevel(lvl)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  level === lvl
                    ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300 font-extrabold"
                    : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/15 font-semibold"
                }`}
              >
                {lvl === "0%" ? "0% Pure Black" : `${lvl} Dark Gray`}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowCornerMarkers((prev) => !prev)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-colors cursor-pointer"
          >
            {showCornerMarkers ? "Hide Corner Markers" : "Show Corner Markers"}
          </button>
        </div>
      </TestControlBar>
    </>
  );
}

/**
 * Educational Guidance & Hardware Boundaries
 * Rendered below viewport via extraControls in TestWrapper
 */
export function BacklightBleedGuidance() {
    const t = useTranslations("Tests.BacklightBleedPattern");
  return (
    <div className="w-full max-w-4xl mx-auto bg-card border border-border/70 rounded-2xl p-5 shadow-xs space-y-4">
      {/* Technical Honesty Disclaimer Banner */}
      <div className="p-4 bg-amber-50 border border-amber-200 dark:bg-amber-950/40 dark:border-amber-800 rounded-xl text-xs text-amber-950 dark:text-amber-100 leading-relaxed space-y-1">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>{t("hardwareBoundaryNoticeCamera")}</span>
        </div>
        <p className="text-amber-900 dark:text-amber-200">
          {t("smartphoneCamerasAndLong")}<strong>{t("neverJudgeBacklightUniformity")}</strong>{t("furthermoreNearlyAllIn")}</p>
      </div>

      {/* Diagnostic Guidance Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-muted-foreground">
        <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">{t("1DarkRoomRequirement")}</strong> {t("performThisInspectionIn")}</div>
        </div>
        <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">{t("2DistinguishFixedVs")}</strong> {t("fixedTorchLikeLight")}</div>
        </div>
        <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">{t("3StepBack1")}</strong> {t("sitAtStandardOperating")}</div>
        </div>
        <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-xl border border-border/40">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">{t("4OledComparison")}</strong> {t("trueSelfEmissiveOled")}</div>
        </div>
      </div>
    </div>
  );
}
