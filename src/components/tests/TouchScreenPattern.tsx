"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { useTranslations } from "next-intl";
import { 
  Hand, 
  MousePointer, 
  PenTool, 
  RotateCcw, 
  Timer, 
  CheckCircle2, 
  Activity,
  Trash2
} from "lucide-react";

interface TouchScreenPatternProps {
  testId?: string;
}

type TouchMode = "grid" | "draw" | "multi" | "edge" | "hold" | "release";

interface ActivePointer {
  id: number;
  type: string;
  x: number;
  y: number;
}

const COLORS = [
  "bg-blue-500 text-white shadow-blue-500/50",
  "bg-emerald-500 text-white shadow-emerald-500/50",
  "bg-purple-500 text-white shadow-purple-500/50",
  "bg-amber-500 text-black shadow-amber-500/50",
  "bg-red-500 text-white shadow-red-500/50",
  "bg-cyan-500 text-black shadow-cyan-500/50",
  "bg-pink-500 text-white shadow-pink-500/50",
  "bg-orange-500 text-white shadow-orange-500/50",
  "bg-teal-500 text-white shadow-teal-500/50",
  "bg-indigo-500 text-white shadow-indigo-500/50",
];

export function TouchScreenPattern({ testId = "touch-screen-test" }: TouchScreenPatternProps) {
  const t = useTranslations("TouchScreenTest");
  const { 
    registerNavigation, 
    isFullscreen,
    observation,
    setObservation
  } = useTestContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Active Test Mode
  const [mode, setMode] = useState<TouchMode>("grid");

  // Device Capabilities & Last Detected Pointer
  const [maxTouchPoints] = useState<number>(() => typeof navigator !== "undefined" ? (navigator.maxTouchPoints || 0) : 0);
  const [detectedInputType, setDetectedInputType] = useState<"touch" | "pen" | "mouse" | null>(null);
  const [touchEverDetected, setTouchEverDetected] = useState<boolean>(false);

  // Live Pointers Map (keyed by pointerId)
  const [activePointers, setActivePointers] = useState<Map<number, ActivePointer>>(new Map());
  const [peakSimultaneous, setPeakSimultaneous] = useState<number>(0);

  // Mode 1: Grid State (24 tiles: 4 rows x 6 cols)
  const [gridTouched, setGridTouched] = useState<boolean[]>(Array(24).fill(false));

  // Mode 2: Drawing State
  const [drawPointCount, setDrawPointCount] = useState<number>(0);
  const isDrawingRef = useRef<boolean>(false);

  // Mode 4: Edge Targets State (9 targets)
  const [edgeTouched, setEdgeTouched] = useState<boolean[]>(Array(9).fill(false));

  // Mode 5: Touch Hold State
  const [holdStartTime, setHoldStartTime] = useState<number | null>(null);
  const [holdElapsed, setHoldElapsed] = useState<number>(0);
  const [holdSuccess, setHoldSuccess] = useState<boolean>(false);
  const [holdFailedDuration, setHoldFailedDuration] = useState<number | null>(null);

  // Mode 6: Release State
  const [releaseStatus, setReleaseStatus] = useState<string>("stateIdle");

  // Keyboard navigation & Reset handlers
  const handleReset = useCallback(() => {
    if (mode === "grid") setGridTouched(Array(24).fill(false));
    if (mode === "draw") {
      const cvs = canvasRef.current;
      if (cvs) {
        const ctx = cvs.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, cvs.width, cvs.height);
      }
      setDrawPointCount(0);
    }
    if (mode === "multi") setPeakSimultaneous(0);
    if (mode === "edge") setEdgeTouched(Array(9).fill(false));
    if (mode === "hold") {
      setHoldStartTime(null);
      setHoldElapsed(0);
      setHoldSuccess(false);
      setHoldFailedDuration(null);
    }
    if (mode === "release") setReleaseStatus("stateIdle");
  }, [mode]);

  useEffect(() => {
    registerNavigation({
      next: () => setMode((m) => {
        if (m === "grid") return "draw";
        if (m === "draw") return "multi";
        if (m === "multi") return "edge";
        if (m === "edge") return "hold";
        if (m === "hold") return "release";
        return "grid";
      }),
      prev: () => setMode((m) => {
        if (m === "release") return "hold";
        if (m === "hold") return "edge";
        if (m === "edge") return "multi";
        if (m === "multi") return "draw";
        if (m === "draw") return "grid";
        return "release";
      }),
      reset: handleReset,
    });
  }, [registerNavigation, handleReset]);

  // Sync canvas dimensions on resize
  useEffect(() => {
    if (mode !== "draw" || !canvasRef.current) return;
    const cvs = canvasRef.current;
    const rect = cvs.parentElement?.getBoundingClientRect();
    if (rect) {
      cvs.width = rect.width;
      cvs.height = rect.height;
    }
  }, [mode, isFullscreen]);

  // Hold Timer animation
  useEffect(() => {
    if (holdStartTime !== null && !holdSuccess) {
      const interval = setInterval(() => {
        const elapsed = (Date.now() - holdStartTime) / 1000;
        setHoldElapsed(Number(elapsed.toFixed(2)));
        if (elapsed >= 2.0) {
          setHoldSuccess(true);
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [holdStartTime, holdSuccess]);

  // POINTER DOWN HANDLER
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    try {
      el.setPointerCapture(e.pointerId);
    } catch {}

    const pType = e.pointerType as "touch" | "pen" | "mouse";
    setDetectedInputType(pType);
    if (pType === "touch") setTouchEverDetected(true);

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setActivePointers((prev) => {
      const next = new Map(prev);
      next.set(e.pointerId, { id: e.pointerId, type: pType, x, y });
      setPeakSimultaneous((curr) => Math.max(curr, next.size));
      return next;
    });

    // Mode Specific Logic
    if (mode === "draw") {
      isDrawingRef.current = true;
      const cvs = canvasRef.current;
      if (cvs) {
        const ctx = cvs.getContext("2d");
        if (ctx) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineWidth = pType === "pen" ? 3 : 6;
          ctx.lineCap = "round";
          ctx.strokeStyle = pType === "touch" ? "#3b82f6" : pType === "pen" ? "#10b981" : "#f59e0b";
        }
      }
      setDrawPointCount((c) => c + 1);
    }

    if (mode === "hold") {
      setHoldStartTime(Date.now());
      setHoldElapsed(0);
      setHoldSuccess(false);
      setHoldFailedDuration(null);
    }

    if (mode === "release") {
      setReleaseStatus("stateDown");
    }
  };

  // POINTER MOVE HANDLER
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setActivePointers((prev) => {
      if (!prev.has(e.pointerId)) return prev;
      const next = new Map(prev);
      const existing = prev.get(e.pointerId)!;
      next.set(e.pointerId, { ...existing, x, y });
      return next;
    });

    if (mode === "draw" && isDrawingRef.current) {
      const cvs = canvasRef.current;
      if (cvs) {
        const ctx = cvs.getContext("2d");
        if (ctx) {
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }
      setDrawPointCount((c) => c + 1);
    }

    if (mode === "release") {
      setReleaseStatus("stateActive");
    }
  };

  // POINTER UP HANDLER
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {}

    setActivePointers((prev) => {
      const next = new Map(prev);
      next.delete(e.pointerId);
      return next;
    });

    if (mode === "draw") {
      isDrawingRef.current = false;
    }

    if (mode === "hold") {
      if (holdStartTime !== null && !holdSuccess) {
        const elapsed = (Date.now() - holdStartTime) / 1000;
        setHoldFailedDuration(Number(elapsed.toFixed(2)));
      }
      setHoldStartTime(null);
    }

    if (mode === "release") {
      setReleaseStatus("stateUp");
    }
  };

  // POINTER CANCEL HANDLER
  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {}

    setActivePointers((prev) => {
      const next = new Map(prev);
      next.delete(e.pointerId);
      return next;
    });

    if (mode === "draw") isDrawingRef.current = false;
    if (mode === "hold") {
      setHoldStartTime(null);
      setHoldSuccess(false);
    }
    if (mode === "release") {
      setReleaseStatus("stateCancel");
    }
  };

  // Mode 1: Tile Click
  const handleTileTouch = (index: number) => {
    setGridTouched((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  // Mode 4: Edge Target Click
  const handleEdgeTargetTouch = (index: number) => {
    setEdgeTouched((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const gridTouchedCount = gridTouched.filter(Boolean).length;
  const edgeTouchedCount = edgeTouched.filter(Boolean).length;

  return (
    <>
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        style={{ touchAction: "none" }}
        className="absolute inset-0 bg-[#09090b] flex flex-col items-center justify-center p-2 sm:p-4 select-none overflow-hidden cursor-crosshair text-white"
        tabIndex={0}
      >
        {/* ========================================================= */}
        {/* TOP STATUS BAR: INPUT TYPE & CAPABILITIES                 */}
        {/* ========================================================= */}
        <div className="absolute top-2 left-3 right-3 z-30 flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 text-xs shadow-xl pointer-events-auto max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-2">
            {/* Active Pointer Type Badge */}
            {detectedInputType === "touch" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <Hand className="w-3.5 h-3.5" />
                <span>{t("types.touch")}</span>
              </span>
            )}
            {detectedInputType === "pen" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <PenTool className="w-3.5 h-3.5" />
                <span>{t("types.pen")}</span>
              </span>
            )}
            {detectedInputType === "mouse" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <MousePointer className="w-3.5 h-3.5" />
                <span>{t("types.mouse")}</span>
              </span>
            )}
            {!detectedInputType && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] text-white/50 bg-white/10 font-mono">
                {t("capabilities.title")}
              </span>
            )}

            {/* Browser reported maxTouchPoints */}
            <span className="text-white/70 font-mono text-[11px] hidden sm:inline">
              {t("capabilities.maxTouchPoints", { count: maxTouchPoints })}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live touch counter */}
            <div className="flex items-center gap-1 text-[11px] font-mono">
              <span className="text-white/60">Active:</span>
              <span className="px-1.5 py-0.2 rounded bg-white/15 font-bold text-white">
                {activePointers.size}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono">
              <span className="text-white/60">Peak:</span>
              <span className="px-1.5 py-0.2 rounded bg-white/15 font-bold text-white">
                {peakSimultaneous}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop mouse guidance banner if only mouse detected */}
        {detectedInputType === "mouse" && !touchEverDetected && (
          <div className="absolute top-14 left-4 right-4 z-20 max-w-xl mx-auto px-3.5 py-1.5 rounded-lg bg-amber-950/80 border border-amber-800/80 text-amber-200 text-[11px] text-center shadow-lg pointer-events-none">
            {t("capabilities.mouseDetectedNotice")}
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 1: TOUCH GRID (24 TILES)                             */}
        {/* ========================================================= */}
        {mode === "grid" && (
          <div className="w-full max-w-5xl h-[76%] flex flex-col items-center justify-between p-2 mt-10">
            <div className="w-full flex items-center justify-between px-2 text-xs font-mono text-white/70 mb-1.5">
              <span>{t("grid.instructions")}</span>
              <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                {t("grid.progress", { touched: gridTouchedCount, total: 24 })}
              </span>
            </div>

            <div className="w-full flex-1 grid grid-cols-6 grid-rows-4 gap-2">
              {gridTouched.map((touched, i) => (
                <button
                  key={i}
                  type="button"
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    handleTileTouch(i);
                  }}
                  className={`rounded-xl border transition-all duration-150 flex flex-col items-center justify-center font-mono text-xs font-bold ${
                    touched 
                      ? "bg-emerald-600/90 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-[0.98]" 
                      : "bg-white/5 hover:bg-white/10 border-white/15 text-white/40"
                  }`}
                >
                  <span>{i + 1}</span>
                  {touched && <CheckCircle2 className="w-4 h-4 mt-1 text-emerald-200" />}
                </button>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between w-full px-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg transition-colors border border-white/10"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t("grid.reset")}</span>
              </button>
              {gridTouchedCount === 24 && (
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t("grid.completed")}</span>
                </span>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 2: TOUCH PATH / DRAWING CANVAS                       */}
        {/* ========================================================= */}
        {mode === "draw" && (
          <div className="w-full h-[76%] relative flex flex-col items-center mt-10">
            <div className="w-full flex items-center justify-between px-4 text-xs font-mono text-white/70 mb-1.5">
              <span>{t("draw.instructions")}</span>
              <div className="flex items-center gap-3">
                <span className="text-white/60">
                  {t("draw.stats", { points: drawPointCount })}
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>{t("draw.clear")}</span>
                </button>
              </div>
            </div>

            <div className="w-full flex-1 relative rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl">
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
                  backgroundSize: "32px 32px"
                }}
              />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 3: MULTI-TOUCH TRACKING                              */}
        {/* ========================================================= */}
        {mode === "multi" && (
          <div className="w-full max-w-4xl h-[76%] flex flex-col items-center justify-center p-6 mt-10 text-center">
            <div className="max-w-md p-6 rounded-3xl bg-neutral-900/90 border border-white/20 shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto">
                <Hand className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {t("modes.multi")}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {t("multi.instructions")}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                  <span className="text-[10px] uppercase font-mono text-white/50 block">Current Active</span>
                  <span className="text-2xl font-bold font-mono text-blue-400">{activePointers.size}</span>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                  <span className="text-[10px] uppercase font-mono text-white/50 block">Peak Detected</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">{peakSimultaneous}</span>
                </div>
              </div>

              {maxTouchPoints === 0 && (
                <div className="text-[11px] text-amber-300/90 bg-amber-950/40 p-2 rounded-lg border border-amber-800/40">
                  {t("multi.notSupported")}
                </div>
              )}

              <button
                type="button"
                onClick={handleReset}
                className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
              >
                {t("multi.reset")}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 4: EDGE & CORNER PERIMETER TEST                      */}
        {/* ========================================================= */}
        {mode === "edge" && (
          <div className="w-full h-[76%] relative flex items-center justify-center p-4 mt-10">
            <span className="text-xs font-mono text-white/60 bg-black/70 px-4 py-2 rounded-xl border border-white/15 z-10 text-center max-w-sm">
              {t("edge.instructions")}<br/>
              <strong className="text-white mt-1 block">
                {t("edge.progress", { touched: edgeTouchedCount, total: 9 })}
              </strong>
            </span>

            {/* 9 Perimeter buttons positioned around frame */}
            {[
              { idx: 0, pos: "top-2 left-2", label: "TL" },
              { idx: 1, pos: "top-2 left-1/2 -translate-x-1/2", label: "TC" },
              { idx: 2, pos: "top-2 right-2", label: "TR" },
              { idx: 3, pos: "top-1/2 left-2 -translate-y-1/2", label: "ML" },
              { idx: 4, pos: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", label: "CTR" },
              { idx: 5, pos: "top-1/2 right-2 -translate-y-1/2", label: "MR" },
              { idx: 6, pos: "bottom-2 left-2", label: "BL" },
              { idx: 7, pos: "bottom-2 left-1/2 -translate-x-1/2", label: "BC" },
              { idx: 8, pos: "bottom-2 right-2", label: "BR" },
            ].map((target) => (
              <button
                key={target.idx}
                type="button"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  handleEdgeTargetTouch(target.idx);
                }}
                className={`absolute ${target.pos} w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-bold text-xs transition-all ${
                  edgeTouched[target.idx]
                    ? "bg-emerald-600 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                    : "bg-white/10 border-white/30 text-white/70 hover:bg-white/20"
                }`}
              >
                <span>{target.label}</span>
                {edgeTouched[target.idx] && <CheckCircle2 className="w-4 h-4 mt-0.5" />}
              </button>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 5: TOUCH HOLD DURATION TEST                          */}
        {/* ========================================================= */}
        {mode === "hold" && (
          <div className="w-full max-w-md h-[76%] flex flex-col items-center justify-center p-6 mt-10 text-center gap-6">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {t("modes.hold")}
              </h3>
              <p className="text-xs text-white/70">
                {t("hold.instructions")}
              </p>
            </div>

            <div
              className={`w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center transition-all cursor-pointer ${
                holdSuccess 
                  ? "bg-emerald-600 border-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.5)]" 
                  : holdStartTime !== null 
                    ? "bg-blue-600 border-blue-300 scale-105 shadow-[0_0_30px_rgba(59,130,246,0.5)]" 
                    : "bg-white/10 border-white/25 hover:bg-white/15"
              }`}
            >
              <Timer className="w-8 h-8 mb-1" />
              <span className="text-xs font-mono font-bold">
                {holdSuccess 
                  ? "Completed!" 
                  : holdStartTime !== null 
                    ? `${holdElapsed}s / 2.0s` 
                    : t("hold.holdButton")}
              </span>
            </div>

            {holdSuccess && (
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-800 px-4 py-2 rounded-xl">
                {t("hold.success", { duration: holdElapsed })}
              </span>
            )}

            {holdFailedDuration !== null && !holdSuccess && (
              <span className="text-xs font-semibold text-amber-400 bg-amber-950/70 border border-amber-800 px-4 py-2 rounded-xl">
                {t("hold.releasedEarly", { duration: holdFailedDuration })}
              </span>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 6: TOUCH RELEASE & EVENT DETECTION                   */}
        {/* ========================================================= */}
        {mode === "release" && (
          <div className="w-full max-w-md h-[76%] flex flex-col items-center justify-center p-6 mt-10 text-center gap-6">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {t("modes.release")}
              </h3>
              <p className="text-xs text-white/70">
                {t("release.instructions")}
              </p>
            </div>

            <div className="w-40 h-40 rounded-3xl bg-neutral-900 border-2 border-white/20 flex flex-col items-center justify-center gap-2 shadow-2xl">
              <Activity className="w-8 h-8 text-blue-400" />
              <span className="text-xs font-mono font-bold text-white">
                {t("release.target")}
              </span>
            </div>

            {/* Live event state badge */}
            <div className="px-4 py-2 rounded-xl border border-white/20 bg-white/5 text-xs font-mono">
              <span className="text-white/60 mr-2">Event State:</span>
              <strong className="text-emerald-400">
                {t(`release.${releaseStatus}`)}
              </strong>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
            >
              {t("release.reset")}
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* LIVE TOUCH VISUALIZER POINTERS OVERLAY                    */}
        {/* ========================================================= */}
        {Array.from(activePointers.values()).map((p, idx) => (
          <div
            key={p.id}
            className={`absolute w-14 h-14 -translate-x-1/2 -translate-y-1/2 rounded-full ${
              COLORS[idx % COLORS.length]
            } flex flex-col items-center justify-center pointer-events-none shadow-2xl transition-transform duration-75 z-40 border-2 border-white`}
            style={{ left: p.x, top: p.y }}
          >
            <span className="text-[10px] font-mono font-bold">ID: {p.id}</span>
            <span className="text-[8px] font-mono opacity-80">{p.type}</span>
          </div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* TEST CONTROL BAR WITH MODE SWITCHER & OBSERVATIONS        */}
      {/* ========================================================= */}
      <TestControlBar testId={testId} title={t("title")}>
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs">
            {(["grid", "draw", "multi", "edge", "hold", "release"] as TouchMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
                  mode === m 
                    ? "bg-white text-gray-950 font-semibold shadow-xs" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {t(`modes.${m}`)}
              </button>
            ))}
          </div>

          {/* User Observation Selector */}
          <div className="flex items-center gap-1 border-l border-gray-200 pl-2 text-xs">
            <span className="text-[10px] font-mono text-gray-500 hidden xl:inline">
              Touch:
            </span>
            <button
              type="button"
              onClick={() => setObservation(observation === "PASS" ? null : "PASS")}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                observation === "PASS"
                  ? "bg-emerald-600 text-white font-semibold shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              title={t("obsNormal")}
            >
              ✓ {t("obsNormal")}
            </button>
            <button
              type="button"
              onClick={() => setObservation(observation === "ISSUE" ? null : "ISSUE")}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                observation === "ISSUE"
                  ? "bg-red-600 text-white font-semibold shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              title={t("obsIssues")}
            >
              ⚠ {t("obsIssues")}
            </button>
            <button
              type="button"
              onClick={() => setObservation(observation === "UNSURE" ? null : "UNSURE")}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                observation === "UNSURE"
                  ? "bg-purple-600 text-white font-semibold shadow-xs"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              title={t("obsUnsure")}
            >
              ? {t("obsUnsure")}
            </button>
          </div>
        </div>
      </TestControlBar>
    </>
  );
}
