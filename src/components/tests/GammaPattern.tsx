"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { getDevicePixelRatio } from "@/lib/browserCapabilities";
import { Sliders, Eye, RotateCcw, ShieldAlert, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface GammaPatternProps {
  testId?: string;
}

const PRESET_GAMMAS = [
  { label: "1.8 (Legacy Mac)", value: 1.8 },
  { label: "2.0 (Light Room)", value: 2.0 },
  { label: "2.2 (sRGB Standard)", value: 2.2 },
  { label: "2.4 (Cinema / Dark)", value: 2.4 },
];

export function GammaPattern({ testId = "gamma-test" }: GammaPatternProps) {
    const t = useTranslations("Tests.GammaPattern");
  const { isRunning, registerNavigation } = useTestContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedGamma, setSelectedGamma] = useState<number>(2.2);

  const resetGamma = useCallback(() => {
    setSelectedGamma(2.2);
  }, []);

  useEffect(() => {
    registerNavigation({
      reset: resetGamma,
    });
  }, [registerNavigation, resetGamma]);

  // Render high-precision, viewport-spanning optical calibration canvas
  useEffect(() => {
    if (!isRunning || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = getDevicePixelRatio();

    const resizeAndDraw = () => {
      const parent = canvas.parentElement || canvas;
      const rect = parent.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));

      canvas.width = width;
      canvas.height = height;

      // Dark neutral background
      ctx.fillStyle = "#0c0c0c";
      ctx.fillRect(0, 0, width, height);

      // Large viewport-dominating dimensions (85% width, 72% height)
      const mainWidth = Math.floor(width * 0.88);
      const mainHeight = Math.floor(height * 0.72);
      const startX = Math.floor((width - mainWidth) / 2);
      const startY = Math.floor((height - mainHeight) / 2) - Math.floor(10 * dpr);

      // Top Half: High-frequency 1-physical-pixel alternating lines (50% linear optical luminance)
      const halfHeight = Math.floor(mainHeight * 0.55);
      const solidHeight = mainHeight - halfHeight;

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(startX, startY, mainWidth, halfHeight);

      ctx.fillStyle = "#000000";
      // Snap strictly to integer physical pixels to avoid sub-pixel anti-aliasing Moire artifacts
      const lineStep = Math.max(2, Math.round(2 * dpr));
      const lineThick = Math.max(1, Math.round(1 * dpr));

      for (let y = startY; y < startY + halfHeight; y += lineStep) {
        ctx.fillRect(startX, y, mainWidth, lineThick);
      }

      // Bottom Half: Solid patch rendered at calculated gamma target luminance
      // Optical formula: target = (0.5 ^ (1 / gamma)) * 255
      const grayValue = Math.round(Math.pow(0.5, 1 / selectedGamma) * 255);
      ctx.fillStyle = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
      ctx.fillRect(startX, startY + halfHeight, mainWidth, solidHeight);

      // Center calibration target: Interleaved inspection square in the middle
      const centerBoxSize = Math.min(Math.floor(mainWidth * 0.28), Math.floor(mainHeight * 0.45));
      const centerBoxX = Math.floor(startX + (mainWidth - centerBoxSize) / 2);
      const centerBoxY = Math.floor(startY + halfHeight - centerBoxSize / 2);

      // Invert center: solid inside the striped area, striped inside the solid area
      ctx.fillStyle = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
      ctx.fillRect(centerBoxX, centerBoxY, centerBoxSize, Math.floor(centerBoxSize / 2));

      // Striped bottom of center box
      const bottomCenterY = centerBoxY + Math.floor(centerBoxSize / 2);
      const bottomCenterH = centerBoxSize - Math.floor(centerBoxSize / 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(centerBoxX, bottomCenterY, centerBoxSize, bottomCenterH);
      ctx.fillStyle = "#000000";
      for (let y = bottomCenterY; y < bottomCenterY + bottomCenterH; y += lineStep) {
        ctx.fillRect(centerBoxX, y, centerBoxSize, lineThick);
      }

      // Border around center target
      ctx.strokeStyle = "#444444";
      ctx.lineWidth = Math.max(1, Math.round(1 * dpr));
      ctx.strokeRect(centerBoxX, centerBoxY, centerBoxSize, centerBoxSize);

      // Outer border around entire pattern
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = Math.max(1, Math.round(1 * dpr));
      ctx.strokeRect(startX, startY, mainWidth, mainHeight);

      // Dividing reference line
      ctx.fillStyle = "#222222";
      ctx.fillRect(startX, startY + halfHeight - 1, mainWidth, Math.max(2, Math.round(2 * dpr)));

      // Reference Gamma Comparison Pills across the bottom
      const refGammas = [1.8, 2.0, 2.2, 2.4, 2.6];
      const pillWidth = Math.floor(mainWidth / refGammas.length) - Math.floor(8 * dpr);
      const pillHeight = Math.floor(32 * dpr);
      const pillY = startY + mainHeight + Math.floor(14 * dpr);

      refGammas.forEach((g, i) => {
        const px = startX + i * Math.floor(mainWidth / refGammas.length) + Math.floor(4 * dpr);
        const gVal = Math.round(Math.pow(0.5, 1 / g) * 255);
        const isSelected = Math.abs(g - selectedGamma) < 0.04;

        // Solid color block
        ctx.fillStyle = `rgb(${gVal}, ${gVal}, ${gVal})`;
        ctx.fillRect(px, pillY, pillWidth, pillHeight);

        // Highlight ring if selected
        if (isSelected) {
          ctx.strokeStyle = "#3b82f6";
          ctx.lineWidth = Math.max(2, Math.round(2.5 * dpr));
          ctx.strokeRect(px - 1, pillY - 1, pillWidth + 2, pillHeight + 2);
        } else {
          ctx.strokeStyle = "#333333";
          ctx.lineWidth = Math.max(1, Math.round(1 * dpr));
          ctx.strokeRect(px, pillY, pillWidth, pillHeight);
        }

        // Label
        ctx.fillStyle = gVal > 150 ? "#000000" : "#FFFFFF";
        ctx.font = `bold ${Math.max(10, Math.floor(11 * dpr))}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`γ ${g.toFixed(1)} (${gVal})`, px + pillWidth / 2, pillY + pillHeight / 2);
      });
    };

    window.addEventListener("resize", resizeAndDraw);
    resizeAndDraw();

    return () => {
      window.removeEventListener("resize", resizeAndDraw);
    };
  }, [isRunning, selectedGamma]);

  return (
    <>
      <div className="absolute inset-0 bg-black select-none overflow-hidden flex flex-col items-center justify-center">
        {/* Full-bleed Canvas */}
        <canvas ref={canvasRef} className="block w-full h-full cursor-crosshair" />

        {/* Clear On-Screen Guidance Floating Banner (Click-through) */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-center pointer-events-none">
          <div className="bg-black/85 dark:bg-black/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 text-white shadow-xl max-w-2xl text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-400">
              <Eye className="w-3.5 h-3.5" />
              <span>{t("gammaVisualTarget")}{selectedGamma.toFixed(2)}</span>
            </div>
            <p className="text-[11px] sm:text-xs text-white/90 leading-normal">
              {t("stepBackOrSquint")}</p>
          </div>
        </div>
      </div>

      {/* Control Bar Dock */}
      <TestControlBar testId={testId} title={t("gammaVisualCheckTitle")}>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Preset Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-black/80 p-1 rounded-xl border border-slate-200 dark:border-white/20">
            {PRESET_GAMMAS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setSelectedGamma(p.value)}
                className={cn(
                  "px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-hidden cursor-pointer",
                  Math.abs(selectedGamma - p.value) < 0.04
                    ? "bg-amber-400 text-slate-950 font-extrabold shadow-md ring-2 ring-amber-300"
                    : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 dark:bg-white/15 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/20 font-semibold"
                )}
              >
                {p.label.split(" (")[0]} ({p.value})
              </button>
            ))}
          </div>

          {/* Continuous Gamma Slider */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-black/70 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/25">
            <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-300" />
            <input
              type="range"
              min="1.6"
              max="2.6"
              step="0.05"
              value={selectedGamma}
              onChange={(e) => setSelectedGamma(parseFloat(e.target.value))}
              aria-label={t("gammaCalibrationTargetSliderTitle")}
              aria-valuemin={1.6}
              aria-valuemax={2.6}
              aria-valuenow={selectedGamma}
              className="w-24 sm:w-36 accent-amber-500 dark:accent-amber-400 cursor-pointer"
            />
            <span className="font-mono text-xs font-bold tabular-nums w-12 text-right text-amber-600 dark:text-amber-300">
              {selectedGamma.toFixed(2)}
            </span>
          </div>

          {/* Reset Button */}
          <button
            type="button"
            onClick={resetGamma}
            className="p-2 rounded-lg border border-slate-200 dark:border-white/25 hover:bg-slate-200 dark:hover:bg-white/25 bg-slate-100 dark:bg-white/15 text-slate-800 dark:text-amber-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            title={t("resetToGamma2Title")}
            aria-label={t("resetTo22Title")}
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600 dark:text-amber-300" />
          </button>
        </div>
      </TestControlBar>
    </>
  );
}

/**
 * Educational Guidance & Calibration Directives
 * Rendered below the test viewport via extraControls in TestWrapper
 */
export function GammaGuidance() {
    const t = useTranslations("Tests.GammaPattern");
  return (
    <div className="w-full max-w-4xl mx-auto bg-card border border-border/70 rounded-2xl p-5 shadow-xs space-y-4">
      {/* Honesty Banner */}
      <div className="p-4 bg-blue-50 border border-blue-200 dark:bg-blue-950/40 dark:border-blue-800 rounded-xl text-xs text-blue-950 dark:text-blue-100 leading-relaxed space-y-1">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldAlert className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>{t("visualGammaEvaluationAid")}</span>
        </div>
        <p className="text-blue-900 dark:text-blue-200">
          {t("gammaCurvesDescribeThe")}</p>
      </div>

      {/* 3 Clear Inspection Directives */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <Eye className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t("1WhatYouAre")}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {t("visuallyInspectsWhetherShadow")}<strong>{t("gamma22")}</strong> {t("curveEnsuringMidtonesAre")}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
            <span>{t("2WhatToDo")}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {t("stepBack2Meters")}<strong>{t("gamma22")}</strong>{t("the1PixelStriped")}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <Info className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{t("3WhatIndicatesA")}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            <strong>{t("solidPatchDarkerThan")}</strong> {t("monitorGammaIsToo")}<strong>{t("solidPatchLighterThan")}</strong> {t("monitorGammaIsToo_1")}</p>
        </div>
      </div>
    </div>
  );
}