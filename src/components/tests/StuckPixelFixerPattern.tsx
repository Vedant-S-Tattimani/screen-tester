"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { useTranslations } from "next-intl";
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Crosshair, 
  ShieldAlert,
  Clock,
  CheckCircle2,
  HelpCircle,
  XCircle
} from "lucide-react";
import { recordTestObservation } from "@/lib/inspectionStorage";

interface StuckPixelFixerPatternProps {
  testId?: string;
}

type StimulationMode = "rgbCycle" | "colorNoise" | "rapidAlternation";
type BoxSize = "small" | "medium" | "large" | "fullscreen";

const SIZE_MAP: Record<BoxSize, number> = {
  small: 40,
  medium: 100,
  large: 200,
  fullscreen: -1 // Handled dynamically
};

const RGB_PALETTE = [
  "#FF0000", "#00FF00", "#0000FF", 
  "#FFFFFF", "#000000", 
  "#FFFF00", "#00FFFF", "#FF00FF"
];

const ALTERNATING_PAIRS = [
  ["#00FFFF", "#FF0000"], // Cyan & Red
  ["#FF00FF", "#00FF00"], // Magenta & Green
  ["#FFFF00", "#0000FF"], // Yellow & Blue
  ["#FFFFFF", "#000000"]  // White & Black
];

export function StuckPixelFixerPattern({ testId = "stuck-pixel-fixer" }: StuckPixelFixerPatternProps) {
  const t = useTranslations("StuckPixelFixerTest");
  const { registerNavigation } = useTestContext();

  // Container & Canvas Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Configuration State
  const [mode, setMode] = useState<StimulationMode>("rgbCycle");
  const [sizeKey, setSizeKey] = useState<BoxSize>("medium");
  const [timerPresetMinutes, setTimerPresetMinutes] = useState<number>(10); // 10, 30, 60
  
  // Position State (Coordinates of the top-left of the stimulation box)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 200, y: 200 });
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Running & Timing State
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [hasAcknowledgedWarning, setHasAcknowledgedWarning] = useState(false);

  // Feedback State
  const [userObservation, setUserObservation] = useState<"PASS" | "ISSUE" | "UNSURE" | null>(null);
  const [feedbackNotes, setFeedbackNotes] = useState("");
  const [observationSavedToast, setObservationSavedToast] = useState(false);

  // Animation Engine Refs (avoids 60fps React re-renders)
  const animFrameIdRef = useRef<number | null>(null);
  const frameCountRef = useRef<number>(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Center the box initially when mounted
  useEffect(() => {
    queueMicrotask(() => {
      if (typeof window !== "undefined") {
        const initialW = window.innerWidth;
        const initialH = window.innerHeight;
        setPosition({
          x: Math.max(20, Math.round(initialW / 2 - 50)),
          y: Math.max(20, Math.round(initialH / 2 - 50))
        });
      }
    });
  }, []);

  // Clean animation loops and timers on unmount / route change
  const stopStimulationLoop = useCallback(() => {
    if (animFrameIdRef.current !== null) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    if (timerIntervalRef.current !== null) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopStimulationLoop();
    };
  }, [stopStimulationLoop]);

  // Stop Stimulation
  const handleStop = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    stopStimulationLoop();

    // Render clear neutral state on canvas with crosshair
    const cvs = canvasRef.current;
    if (cvs) {
      const ctx = cvs.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        // Draw centering crosshair for precision alignment
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cvs.width / 2, 0);
        ctx.lineTo(cvs.width / 2, cvs.height);
        ctx.moveTo(0, cvs.height / 2);
        ctx.lineTo(cvs.width, cvs.height / 2);
        ctx.stroke();
      }
    }
  }, [stopStimulationLoop]);

  // Keyboard navigation & fine pixel adjustment
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT" || (e.target as HTMLElement)?.tagName === "TEXTAREA") {
        return;
      }

      const step = e.shiftKey ? 10 : 1;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setPosition((p) => ({ ...p, y: Math.max(0, p.y - step) }));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setPosition((p) => ({ ...p, y: p.y + step }));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPosition((p) => ({ ...p, x: Math.max(0, p.x - step) }));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setPosition((p) => ({ ...p, x: p.x + step }));
      } else if (e.key === "Escape" && isRunning) {
        handleStop();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, handleStop]);

  // ANIMATION ENGINE: Render loop executing directly on Canvas
  const renderLoopRef = useRef<() => void>(() => {});

  useEffect(() => {
    renderLoopRef.current = () => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      const ctx = cvs.getContext("2d", { alpha: false });
      if (!ctx) return;

      frameCountRef.current++;
      const f = frameCountRef.current;
      const w = cvs.width;
      const h = cvs.height;

      if (mode === "rgbCycle") {
        const colorIndex = Math.floor(f / 2) % RGB_PALETTE.length;
        ctx.fillStyle = RGB_PALETTE[colorIndex];
        ctx.fillRect(0, 0, w, h);
      } else if (mode === "colorNoise") {
        const imgData = ctx.createImageData(w, h);
        const data = imgData.data;
        const len = data.length;
        for (let i = 0; i < len; i += 4) {
          data[i] = (Math.random() * 256) | 0;     // Red
          data[i + 1] = (Math.random() * 256) | 0; // Green
          data[i + 2] = (Math.random() * 256) | 0; // Blue
          data[i + 3] = 255;                       // Alpha
        }
        ctx.putImageData(imgData, 0, 0);
      } else if (mode === "rapidAlternation") {
        const pairIndex = Math.floor(f / 30) % ALTERNATING_PAIRS.length;
        const pair = ALTERNATING_PAIRS[pairIndex];
        const color = f % 4 < 2 ? pair[0] : pair[1];
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, w, h);
      }

      animFrameIdRef.current = requestAnimationFrame(() => {
        renderLoopRef.current();
      });
    };
  }, [mode]);

  // Start Stimulation
  const handleStart = () => {
    if (!hasAcknowledgedWarning) {
      setShowWarningModal(true);
      return;
    }

    setIsRunning(true);
    setIsPaused(false);

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + 1;
        if (timerPresetMinutes > 0 && next >= timerPresetMinutes * 60) {
          handleStop();
          return timerPresetMinutes * 60;
        }
        return next;
      });
    }, 1000);

    stopStimulationLoop();
    animFrameIdRef.current = requestAnimationFrame(() => {
      renderLoopRef.current();
    });
  };

  // Pause Stimulation
  const handlePause = () => {
    setIsPaused(true);
    stopStimulationLoop();
  };

  // Resume Stimulation
  const handleResume = () => {
    setIsPaused(false);
    timerIntervalRef.current = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + 1;
        if (timerPresetMinutes > 0 && next >= timerPresetMinutes * 60) {
          handleStop();
          return timerPresetMinutes * 60;
        }
        return next;
      });
    }, 1000);
    animFrameIdRef.current = requestAnimationFrame(() => {
      renderLoopRef.current();
    });
  };

  // Reset Everything
  const handleReset = useCallback(() => {
    handleStop();
    setElapsedSeconds(0);
    setUserObservation(null);
    setFeedbackNotes("");
  }, [handleStop]);

  useEffect(() => {
    registerNavigation({
      reset: handleReset,
    });
  }, [registerNavigation, handleReset]);

  // Pointer drag handling for target repositioning
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (sizeKey === "fullscreen") return;
    const target = e.currentTarget;
    try {
      target.setPointerCapture(e.pointerId);
    } catch {}

    isDraggingRef.current = true;
    dragOffsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const newX = Math.max(0, e.clientX - dragOffsetRef.current.x);
    const newY = Math.max(0, e.clientY - dragOffsetRef.current.y);
    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleSaveObservation = (obs: "PASS" | "ISSUE" | "UNSURE") => {
    setUserObservation(obs);
    recordTestObservation(
      testId,
      obs,
      `Stuck pixel fixer run (${Math.round(elapsedSeconds / 60)}m, mode: ${mode}). ${feedbackNotes}`
    );
    setObservationSavedToast(true);
    setTimeout(() => setObservationSavedToast(false), 3500);
  };

  const boxDim = sizeKey === "fullscreen" 
    ? { w: typeof window !== "undefined" ? window.innerWidth : 800, h: typeof window !== "undefined" ? window.innerHeight : 600 } 
    : { w: SIZE_MAP[sizeKey], h: SIZE_MAP[sizeKey] };

  const totalPresetSec = timerPresetMinutes * 60;
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <>
      <div 
        ref={containerRef}
        className="absolute inset-0 bg-[#09090b] select-none overflow-hidden"
      >
        {/* TOP NOTICE & STATUS BADGE */}
        <div className="absolute top-3 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 text-white shadow-xl pointer-events-auto max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
              {t("badge")}
            </span>
            <span className="text-white/80 line-clamp-1 hidden sm:inline">
              {t("disclaimer")}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            {isRunning && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{t("controls.activeStimulation")}</span>
              </span>
            )}
            <div className="flex items-center gap-1 text-white/70">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{formatTime(elapsedSeconds)}</span>
              {timerPresetMinutes > 0 && (
                <span className="text-white/40">/ {formatTime(totalPresetSec)}</span>
              )}
            </div>
          </div>
        </div>

        {/* TARGET POSITIONING & STIMULATION BOX */}
        <div 
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={sizeKey === "fullscreen" ? {
            position: "absolute",
            inset: 0,
            zIndex: 10,
            touchAction: "none"
          } : {
            position: "absolute",
            left: position.x,
            top: position.y,
            width: boxDim.w,
            height: boxDim.h,
            zIndex: 10,
            touchAction: "none"
          }}
          className={`cursor-grab active:cursor-grabbing transition-shadow ${
            sizeKey !== "fullscreen" ? "border-2 border-white/80 rounded-lg shadow-2xl overflow-hidden" : ""
          }`}
          title={t("controls.dragPrompt")}
        >
          <canvas
            ref={canvasRef}
            width={boxDim.w}
            height={boxDim.h}
            className="w-full h-full block bg-slate-900"
          />

          {!isRunning && sizeKey !== "fullscreen" && (
            <div className="absolute -top-7 left-0 px-2 py-0.5 rounded bg-black/90 border border-white/30 text-[10px] font-mono text-white whitespace-nowrap pointer-events-none shadow-md">
              X: {position.x} Y: {position.y}
            </div>
          )}
        </div>

        {/* RETICLE OVERLAY HELPER */}
        {!isRunning && sizeKey !== "fullscreen" && (
          <div className="absolute bottom-20 left-4 right-4 pointer-events-none flex justify-center z-10">
            <div className="px-4 py-2 rounded-xl bg-black/70 backdrop-blur-sm border border-white/10 text-white/70 text-xs font-mono flex items-center gap-3 shadow-lg">
              <Crosshair className="w-4 h-4 text-blue-400" />
              <span>{t("controls.dragPrompt")}</span>
              <span className="text-white/30">•</span>
              <span>{t("controls.arrowPrompt")}</span>
            </div>
          </div>
        )}

        {/* POST-STIMULATION EVALUATION DIALOG */}
        {!isRunning && elapsedSeconds > 5 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 max-w-md w-full px-4 pointer-events-auto">
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/95 border border-white/20 text-white shadow-2xl backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-white/50 font-semibold">
                  Visual Observation
                </span>
                <span className="text-xs text-blue-400 font-mono">
                  {Math.round(elapsedSeconds / 60)}m run completed
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {t("feedback.prompt")}
              </h3>
              
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleSaveObservation("PASS")}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex flex-col items-center gap-1 ${
                    userObservation === "PASS"
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>{t("feedback.recovered")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveObservation("ISSUE")}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex flex-col items-center gap-1 ${
                    userObservation === "ISSUE"
                      ? "bg-red-600 text-white shadow-md"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  }`}
                >
                  <XCircle className="w-4 h-4 text-red-300" />
                  <span>{t("feedback.stillStuck")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveObservation("UNSURE")}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex flex-col items-center gap-1 ${
                    userObservation === "UNSURE"
                      ? "bg-amber-600 text-white shadow-md"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-amber-300" />
                  <span>{t("feedback.unsure")}</span>
                </button>
              </div>

              {observationSavedToast && (
                <div className="text-[11px] text-emerald-400 font-mono text-center pt-1 animate-fade-in">
                  ✓ {t("feedback.observationSaved")}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SAFETY WARNING MODAL */}
        {showWarningModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-neutral-900 border border-amber-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl text-white space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <ShieldAlert className="w-7 h-7 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold">
                  {t("warningTitle")}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {t("warningText")}
              </p>
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs text-neutral-400 space-y-1">
                <strong>Important Notice:</strong>
                <p>{t("disclaimer")}</p>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWarningModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHasAcknowledgedWarning(true);
                    setShowWarningModal(false);
                    setTimeout(() => {
                      setIsRunning(true);
                      setIsPaused(false);
                      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
                      timerIntervalRef.current = setInterval(() => {
                        setElapsedSeconds((prev) => prev + 1);
                      }, 1000);
                      stopStimulationLoop();
                      animFrameIdRef.current = requestAnimationFrame(() => {
                        renderLoopRef.current();
                      });
                    }, 50);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-black transition-colors shadow-lg"
                >
                  I Understand, Start
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TEST CONTROL BAR */}
      <TestControlBar testId={testId} title={t("title")}>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          <div className="flex items-center gap-1 bg-white dark:bg-neutral-800 p-0.5 rounded-lg border border-gray-200 dark:border-neutral-700 shadow-2xs">
            {!isRunning ? (
              <button
                type="button"
                onClick={handleStart}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t("controls.start")}</span>
              </button>
            ) : isPaused ? (
              <button
                type="button"
                onClick={handleResume}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t("controls.resume")}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePause}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-colors"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>{t("controls.pause")}</span>
              </button>
            )}

            {isRunning && (
              <button
                type="button"
                onClick={handleStop}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>{t("controls.stop")}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-600 dark:text-neutral-300 transition-colors"
              title={t("controls.reset")}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center bg-gray-100 dark:bg-neutral-800 p-0.5 rounded-lg border border-gray-200 dark:border-neutral-700 text-xs">
            {(["rgbCycle", "colorNoise", "rapidAlternation"] as StimulationMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  mode === m 
                    ? "bg-white dark:bg-neutral-900 text-gray-950 dark:text-white font-bold shadow-xs" 
                    : "text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {t(`modes.${m}`)}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-gray-100 dark:bg-neutral-800 p-0.5 rounded-lg border border-gray-200 dark:border-neutral-700 text-xs">
            {(["small", "medium", "large", "fullscreen"] as BoxSize[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSizeKey(s)}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                  sizeKey === s 
                    ? "bg-white dark:bg-neutral-900 text-gray-950 dark:text-white font-bold shadow-xs" 
                    : "text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {t(`sizes.${s}`)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 border-l border-gray-200 dark:border-neutral-700 pl-2 text-xs">
            <span className="text-[11px] font-mono text-gray-500 dark:text-neutral-400 hidden xl:inline">
              {t("timer.label")}:
            </span>
            {[10, 30, 60].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => setTimerPresetMinutes(mins)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  timerPresetMinutes === mins
                    ? "bg-blue-600 text-white font-semibold shadow-xs"
                    : "bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-700 dark:text-neutral-300"
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>
      </TestControlBar>
    </>
  );
}
