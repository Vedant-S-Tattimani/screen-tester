"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { 
  MousePointer, 
  Activity, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Zap,
  Sliders,
  Ruler
} from "lucide-react";
import { useTranslations } from "next-intl";

export function MousePollingPattern({ testId }: { testId?: string }) {
  const t = useTranslations("Tests.mousePollingTest");

  const [currentHz, setCurrentHz] = useState<number>(0);
  const [averageHz, setAverageHz] = useState<number>(0);
  const [peakHz, setPeakHz] = useState<number>(0);
  const [sampleCount, setSampleCount] = useState<number>(0);
  const [historyDeltas, setHistoryDeltas] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"polling" | "buttons" | "dpi">("polling");

  // Mouse buttons tracking
  const [clickedButtons, setClickedButtons] = useState<{
    left: number;
    middle: number;
    right: number;
    back: number;
    forward: number;
  }>({ left: 0, middle: 0, right: 0, back: 0, forward: 0 });
  const [lastClickDelta, setLastClickDelta] = useState<number | null>(null);
  const lastClickTimeRef = useRef<number>(0);

  // DPI Drag test
  const [dpiDistancePx, setDpiDistancePx] = useState<number>(0);
  const [isDpiDragging, setIsDpiDragging] = useState<boolean>(false);
  const dpiStartXRef = useRef<number>(0);

  const testAreaRef = useRef<HTMLDivElement>(null);
  const timestampsRef = useRef<number[]>([]);
  const totalSamplesRef = useRef<number>(0);
  const sumHzRef = useRef<number>(0);
  const maxHzRef = useRef<number>(0);

  // Reset polling stats
  const resetStats = useCallback(() => {
    timestampsRef.current = [];
    totalSamplesRef.current = 0;
    sumHzRef.current = 0;
    maxHzRef.current = 0;
    setCurrentHz(0);
    setAverageHz(0);
    setPeakHz(0);
    setSampleCount(0);
    setHistoryDeltas([]);
  }, []);

  // Mousemove handler inside testing box
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const now = performance.now();
    const times = timestampsRef.current;
    times.push(now);

    // Keep last 60 timestamps
    if (times.length > 60) {
      times.shift();
    }

    if (times.length >= 8) {
      const first = times[0];
      const last = times[times.length - 1];
      const duration = (last - first) / 1000; // seconds

      if (duration > 0.02) {
        const measuredHz = Math.round((times.length - 1) / duration);
        setCurrentHz(measuredHz);

        if (measuredHz > maxHzRef.current) {
          maxHzRef.current = measuredHz;
          setPeakHz(measuredHz);
        }

        totalSamplesRef.current += 1;
        sumHzRef.current += measuredHz;
        setAverageHz(Math.round(sumHzRef.current / totalSamplesRef.current));
        setSampleCount(totalSamplesRef.current);

        // Record delta for jitter visualization
        if (times.length >= 2) {
          const delta = times[times.length - 1] - times[times.length - 2];
          setHistoryDeltas((prev) => [...prev.slice(-35), delta]);
        }
      }
    }
  }, []);

  // Button clicks handler
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const now = performance.now();
    if (lastClickTimeRef.current > 0) {
      const delta = Math.round(now - lastClickTimeRef.current);
      setLastClickDelta(delta);
    }
    lastClickTimeRef.current = now;

    setClickedButtons((prev) => {
      switch (e.button) {
        case 0: return { ...prev, left: prev.left + 1 };
        case 1: return { ...prev, middle: prev.middle + 1 };
        case 2: return { ...prev, right: prev.right + 1 };
        case 3: return { ...prev, back: prev.back + 1 };
        case 4: return { ...prev, forward: prev.forward + 1 };
        default: return prev;
      }
    });
  };

  // DPI Drag handlers
  const handleDpiMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDpiDragging(true);
    dpiStartXRef.current = e.clientX;
    setDpiDistancePx(0);
  };

  const handleDpiMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDpiDragging) return;
    const distance = Math.abs(e.clientX - dpiStartXRef.current);
    setDpiDistancePx(distance);
  };

  const handleDpiMouseUp = () => {
    setIsDpiDragging(false);
  };

  // Expected Polling Bracket Identification
  let bracket = "125 Hz (Office Mouse)";
  let bracketBadge = "bg-gray-100 text-gray-700 border-gray-200";
  if (peakHz >= 6000) {
    bracket = "8000 Hz (Hyper-Polling Esports)";
    bracketBadge = "bg-purple-50 text-purple-700 border-purple-200";
  } else if (peakHz >= 3000) {
    bracket = "4000 Hz (High-Performance)";
    bracketBadge = "bg-indigo-50 text-indigo-700 border-indigo-200";
  } else if (peakHz >= 1600) {
    bracket = "2000 Hz (Enthusiast)";
    bracketBadge = "bg-blue-50 text-blue-700 border-blue-200";
  } else if (peakHz >= 800) {
    bracket = "1000 Hz (Standard Gaming)";
    bracketBadge = "bg-emerald-50 text-emerald-700 border-emerald-200";
  } else if (peakHz >= 400) {
    bracket = "500 Hz (Competitive Entry)";
    bracketBadge = "bg-amber-50 text-amber-700 border-amber-200";
  }

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden">
      {/* Top Controls Tab Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50/80 px-4 py-3 sm:px-6">
        <div className="flex rounded-lg border border-gray-200 bg-white p-0.5 shadow-2xs">
          <button
            onClick={() => setActiveTab("polling")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === "polling" ? "bg-gray-950 text-white shadow-2xs" : "text-gray-600 hover:text-gray-950"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Polling Rate (Hz)</span>
          </button>
          <button
            onClick={() => setActiveTab("buttons")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === "buttons" ? "bg-gray-950 text-white shadow-2xs" : "text-gray-600 hover:text-gray-950"
            }`}
          >
            <MousePointer className="w-3.5 h-3.5" />
            <span>Button &amp; Double-Click</span>
          </button>
          <button
            onClick={() => setActiveTab("dpi")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === "dpi" ? "bg-gray-950 text-white shadow-2xs" : "text-gray-600 hover:text-gray-950"
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>DPI Drag Measure</span>
          </button>
        </div>

        {activeTab === "polling" && (
          <button
            onClick={resetStats}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Stats</span>
          </button>
        )}
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {activeTab === "polling" && (
          <div className="space-y-5">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-1">
                <span className="text-[11px] font-mono text-gray-500 uppercase">Real-Time Polling</span>
                <div className="text-2xl font-bold font-mono tracking-tight text-blue-600">
                  {currentHz} <span className="text-xs text-gray-500">Hz</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-1">
                <span className="text-[11px] font-mono text-gray-500 uppercase">Average Rate</span>
                <div className="text-2xl font-bold font-mono tracking-tight text-gray-900">
                  {averageHz} <span className="text-xs text-gray-500">Hz</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-1">
                <span className="text-[11px] font-mono text-gray-500 uppercase">Peak Recorded</span>
                <div className="text-2xl font-bold font-mono tracking-tight text-purple-600">
                  {peakHz} <span className="text-xs text-gray-500">Hz</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-1">
                <span className="text-[11px] font-mono text-gray-500 uppercase">Hardware Tier</span>
                <div className="text-xs font-bold text-gray-900 leading-tight pt-1">
                  <span className={`px-2 py-0.5 rounded-full border text-[11px] ${bracketBadge}`}>
                    {bracket}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Tracking Pad */}
            <div
              ref={testAreaRef}
              onMouseMove={handleMouseMove}
              className="relative h-64 sm:h-80 rounded-2xl border-2 border-dashed border-blue-400 bg-blue-50/20 flex flex-col items-center justify-center p-6 text-center select-none cursor-crosshair overflow-hidden"
            >
              <div className="space-y-2 pointer-events-none">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <MousePointer className="w-6 h-6 animate-pulse" />
                </div>
                <h4 className="text-base font-bold text-gray-950">
                  {t.has("areaPrompt") ? t("areaPrompt") : "Move Mouse Rapidly Inside This Area"}
                </h4>
                <p className="text-xs text-gray-600 max-w-md">
                  Make fast, continuous circles or side-to-side movements. USB polling only fires when the optical sensor registers physical movement deltas.
                </p>
              </div>

              {/* Jitter delta histogram */}
              {historyDeltas.length > 0 && (
                <div className="absolute bottom-3 left-4 right-4 flex items-end gap-1 h-12 pointer-events-none">
                  {historyDeltas.map((d, i) => {
                    const barHeight = Math.min(48, Math.max(4, Math.round(d * 12)));
                    return (
                      <div
                        key={i}
                        className="flex-1 bg-blue-500/70 rounded-xs transition-all"
                        style={{ height: `${barHeight}px` }}
                        title={`${d.toFixed(2)}ms`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "buttons" && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-700">
              Click anywhere inside the box with Left, Right, Middle, or Side buttons to verify actuation and test for double-click switch bouncing.
            </div>

            <div
              onMouseDown={handleMouseDown}
              onContextMenu={(e) => e.preventDefault()}
              className="h-60 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center cursor-pointer select-none"
            >
              <span className="text-sm font-bold text-gray-900 mb-1">Click Anywhere Inside This Frame</span>
              {lastClickDelta !== null && (
                <div className="text-xs font-mono text-gray-600">
                  Last click interval: <span className={`font-bold ${lastClickDelta < 60 ? "text-rose-600" : "text-emerald-600"}`}>{lastClickDelta}ms</span>
                  {lastClickDelta < 60 && " (⚠️ Rapid click / possible mechanical chatter)"}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              <div className="p-3 rounded-xl border border-gray-200 bg-white">
                <span className="text-[11px] font-mono text-gray-500 block">Left Click</span>
                <span className="text-xl font-bold font-mono text-gray-900">{clickedButtons.left}</span>
              </div>
              <div className="p-3 rounded-xl border border-gray-200 bg-white">
                <span className="text-[11px] font-mono text-gray-500 block">Middle Wheel</span>
                <span className="text-xl font-bold font-mono text-gray-900">{clickedButtons.middle}</span>
              </div>
              <div className="p-3 rounded-xl border border-gray-200 bg-white">
                <span className="text-[11px] font-mono text-gray-500 block">Right Click</span>
                <span className="text-xl font-bold font-mono text-gray-900">{clickedButtons.right}</span>
              </div>
              <div className="p-3 rounded-xl border border-gray-200 bg-white">
                <span className="text-[11px] font-mono text-gray-500 block">Side Button 4</span>
                <span className="text-xl font-bold font-mono text-gray-900">{clickedButtons.back}</span>
              </div>
              <div className="p-3 rounded-xl border border-gray-200 bg-white">
                <span className="text-[11px] font-mono text-gray-500 block">Side Button 5</span>
                <span className="text-xl font-bold font-mono text-gray-900">{clickedButtons.forward}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "dpi" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-700 leading-relaxed">
              <strong>Sensor DPI Calculator:</strong> Click and hold on the left line, then move your mouse horizontally exactly 1 physical inch (or use an on-desk ruler) before releasing.
            </div>

            <div
              onMouseDown={handleDpiMouseDown}
              onMouseMove={handleDpiMouseMove}
              onMouseUp={handleDpiMouseUp}
              className="h-48 rounded-2xl border border-gray-300 bg-white relative flex flex-col justify-center px-8 cursor-ew-resize select-none overflow-hidden"
            >
              <div className="relative h-12 border-b border-gray-300">
                <div 
                  className="absolute top-0 bottom-0 bg-blue-500/20 border-r-2 border-blue-600 transition-none"
                  style={{ width: `${dpiDistancePx}px` }}
                />
              </div>

              <div className="pt-4 flex justify-between items-center text-xs font-mono">
                <span className="text-gray-500">Distance Travelled:</span>
                <span className="text-base font-bold text-blue-600">{dpiDistancePx} pixels (~{dpiDistancePx} DPI if dragged 1 inch)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
