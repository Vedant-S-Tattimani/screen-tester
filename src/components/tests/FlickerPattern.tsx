"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { Play, Pause, Info, Zap, AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

export type FlickerMode = "uniform" | "inversion" | "strobe_wave";

interface FlickerPatternProps {
  testId?: string;
}

const SPEEDS = [
  { label: "1F (Fast)", value: 1 },
  { label: "2F", value: 2 },
  { label: "4F", value: 4 },
  { label: "8F (Slow)", value: 8 },
];

export function FlickerPattern({ testId = "screen-flicker-test" }: FlickerPatternProps) {
    const t = useTranslations("Tests.FlickerPattern");
  const { isRunning, isPaused, setIsPaused, registerNavigation } = useTestContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeMode, setActiveMode] = useState<FlickerMode>("uniform");
  const [speed, setSpeed] = useState(2);
  const [showEduInfo, setShowEduInfo] = useState(false);
  const [isStrobeConfirmed, setIsStrobeConfirmed] = useState(false);

  const speedRef = useRef(speed);
  const pausedRef = useRef(isPaused);
  const modeRef = useRef(activeMode);
  const strobeConfirmedRef = useRef(isStrobeConfirmed);

  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { pausedRef.current = isPaused; }, [isPaused]);
  useEffect(() => { modeRef.current = activeMode; }, [activeMode]);
  useEffect(() => { strobeConfirmedRef.current = isStrobeConfirmed; }, [isStrobeConfirmed]);

  // Keyboard navigation
  const cycleSpeed = useCallback(() => {
    setSpeed((curr) => {
      const idx = SPEEDS.findIndex((s) => s.value === curr);
      return SPEEDS[(idx + 1) % SPEEDS.length].value;
    });
  }, []);

  const cycleMode = useCallback(() => {
    setActiveMode((curr) => {
      if (curr === "uniform") return "inversion";
      if (curr === "inversion") return "strobe_wave";
      return "uniform";
    });
    setIsStrobeConfirmed(false);
  }, []);

  useEffect(() => {
    registerNavigation({
      next: cycleSpeed,
      prev: cycleMode,
      reset: () => {
        setSpeed(2);
        setActiveMode("uniform");
        setIsStrobeConfirmed(false);
      },
    });
  }, [registerNavigation, cycleSpeed, cycleMode]);

  // Canvas loop
  useEffect(() => {
    if (!isRunning || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationId: number;
    let frameCount = 0;
    let toggleState = false;

    const resize = () => {
      const parent = canvas.parentElement || canvas;
      const rect = parent.getBoundingClientRect();
      const targetW = Math.max(1, Math.floor(rect.width));
      const targetH = Math.max(1, Math.floor(rect.height));
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas.parentElement || canvas);

    const draw = () => {
      animationId = requestAnimationFrame(draw);

      if (pausedRef.current) return;

      const currentMode = modeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      if (currentMode === "uniform") {
        if (!strobeConfirmedRef.current) {
          // Safe idle state: render neutral non-flashing dark background
          ctx.fillStyle = "#121216";
          ctx.fillRect(0, 0, w, h);
        } else {
          frameCount++;
          if (frameCount >= speedRef.current) {
            frameCount = 0;
            toggleState = !toggleState;
            ctx.fillStyle = toggleState ? "#FFFFFF" : "#000000";
            ctx.fillRect(0, 0, w, h);
          }
        }
      } else if (currentMode === "inversion") {
        // Dot / Column Inversion Test Pattern (Vcom flicker detection)
        frameCount++;
        if (frameCount >= speedRef.current) {
          frameCount = 0;
          toggleState = !toggleState;

          const dotSize = 2;
          ctx.fillStyle = toggleState ? "#000000" : "#808080";
          ctx.fillRect(0, 0, w, h);

          ctx.fillStyle = toggleState ? "#FFFFFF" : "#000000";
          for (let y = 0; y < h; y += dotSize * 2) {
            for (let x = (y % (dotSize * 4) === 0 ? 0 : dotSize); x < w; x += dotSize * 2) {
              ctx.fillRect(x, y, dotSize, dotSize);
            }
          }
        }
      } else if (currentMode === "strobe_wave") {
        // Uniform solid field optimized for optical finger / pen wave observation
        ctx.fillStyle = "#666666";
        ctx.fillRect(0, 0, w, h);
      }
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [isRunning]);

  return (
    <>
      <div className="absolute inset-0 bg-black overflow-hidden select-none">
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* Photosensitivity Safety Warning Confirmation Card for uniform strobe mode */}
        {activeMode === "uniform" && !isStrobeConfirmed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center z-20 pointer-events-auto bg-black/75 backdrop-blur-xs">
            <div className="max-w-md w-full bg-neutral-950/95 border border-amber-500/40 p-6 rounded-2xl shadow-2xl space-y-4 text-white">
              <div className="flex items-center justify-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t("photosensitivityAmpFlashingNotice")}</span>
              </div>
              <h3 className="text-base font-bold text-white">{t("rapidScreenFlashingTest")}</h3>
              <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed">
                {t("thisTestUsesRapid")}</p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsStrobeConfirmed(true)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs sm:text-sm transition-all shadow-lg cursor-pointer"
                >
                  {t("startStrobePattern")}</button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveMode("strobe_wave");
                    setIsStrobeConfirmed(false);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 font-medium text-xs transition-colors cursor-pointer"
                >
                  {t("useSafeHandTest")}</button>
              </div>
            </div>
          </div>
        )}

        {/* Active Strobe Indicator Pill */}
        {activeMode === "uniform" && isStrobeConfirmed && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/30 flex items-center gap-2.5 text-xs font-mono text-white/90 pointer-events-auto shadow-xl">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>{t("strobeActive")}</span>
            <span className="text-white/30">|</span>
            <button
              type="button"
              onClick={() => setIsStrobeConfirmed(false)}
              className="text-amber-400 hover:text-amber-300 underline text-[11px] cursor-pointer"
            >
              {t("stopStrobe")}</button>
          </div>
        )}

        {/* Optical Finger/Pen Wave Instruction Overlay for strobe_wave mode */}
        {activeMode === "strobe_wave" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
            <div className="max-w-md bg-neutral-950/85 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-white shadow-2xl space-y-3 pointer-events-auto">
              <div className="flex items-center justify-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider font-mono">
                <Zap className="w-4 h-4" />
                <span>{t("opticalStroboscopicPenHand")}</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                {t("waveAPenOr")}</p>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-left">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="font-semibold text-emerald-400 block mb-1">{t("smoothBlur")}</span>
                  {t("ifMotionLooksContinuous")}<strong>{t("dcDimmingFlickerFree")}</strong>.
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="font-semibold text-amber-400 block mb-1">{t("stroboscopicSteps")}</span>
                  {t("ifYouSeeDistinct")}<strong>{t("pwmBacklightCycling")}</strong>.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Educational Info Modal */}
        {showEduInfo && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 max-w-xl w-[92%] bg-neutral-950/95 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white shadow-2xl z-40 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 font-semibold text-amber-400">
                <Info className="w-4 h-4" />
                <span>{t("visualFlickerVsHardware")}</span>
              </div>
              <button 
                onClick={() => setShowEduInfo(false)}
                className="text-white/60 hover:text-white px-2 py-0.5 rounded text-xs font-mono"
              >
                {t("close")}</button>
            </div>
            <div className="mt-3 space-y-2.5 text-white/80 leading-relaxed">
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
                <strong>{t("importantTechnicalDisclosure")}</strong> {t("aWebBrowserCannot")}</div>
              <p>
                <strong>{t("whatThisTestEvaluates")}</strong>
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>{t("perceptualFlickerSensitivity")}</strong> {t("exploresHumanVisualComfort")}</li>
                <li><strong>{t("dotAmpColumnInversion")}</strong> {t("visuallyChecksForLiquid")}</li>
                <li><strong>{t("stroboscopicHandPenObservation")}</strong> {t("usesPersistenceOfVision")}</li>
                <li><strong>{t("optionalCameraInspectionNote")}</strong> {t("usingASmartphoneCamera")}</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <TestControlBar testId={testId} title={t("flickerPwmVisualCheckTitle")}>
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Selector */}
          <div className="flex items-center bg-muted/60 p-0.5 rounded-lg border border-border/60 text-xs">
            <button
              onClick={() => {
                setActiveMode("uniform");
                setIsStrobeConfirmed(false);
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                activeMode === "uniform" 
                  ? "bg-white text-gray-950 font-bold shadow-xs" 
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
            >
              {t("uniformAlternation")}</button>
            <button
              onClick={() => {
                setActiveMode("inversion");
                setIsStrobeConfirmed(false);
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                activeMode === "inversion" 
                  ? "bg-white text-gray-950 font-bold shadow-xs" 
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
            >
              {t("dotInversionVcom")}</button>
            <button
              onClick={() => {
                setActiveMode("strobe_wave");
                setIsStrobeConfirmed(false);
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                activeMode === "strobe_wave" 
                  ? "bg-white text-gray-950 font-bold shadow-xs" 
                  : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
              }`}
            >
              {t("handPenTest")}</button>
          </div>

          {/* Speed & Pause for Animated Modes */}
          {activeMode !== "strobe_wave" && (
            <>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-1 hover:bg-muted dark:hover:bg-white/10 rounded-full transition-colors border border-border/50 text-gray-900 dark:text-white"
                title={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>

              <div className="flex items-center gap-1 bg-muted/40 rounded-lg p-0.5 border border-border/40 text-xs">
                {SPEEDS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSpeed(s.value)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                      speed === s.value 
                        ? "bg-white text-gray-950 font-bold shadow-xs" 
                        : "text-gray-600 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Educational Info Button */}
          <button
            onClick={() => setShowEduInfo(!showEduInfo)}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-colors ${
              showEduInfo ? "bg-amber-500/20 text-amber-500 border-amber-500/40" : "hover:bg-muted dark:hover:bg-white/10 text-gray-700 dark:text-slate-200 dark:hover:text-white border-border/50"
            }`}
            title={t("readAboutVisualFlickerTitle")}
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t("limitations")}</span>
          </button>
        </div>
      </TestControlBar>
    </>
  );
}
