"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { 
  Hand, 
  RotateCcw, 
  ShieldAlert, 
  Fingerprint, 
  Timer
} from "lucide-react";

interface MultiTouchPatternProps {
  testId?: string;
}

type MultiTouchMode = "free" | "grid" | "hold" | "edges";

interface ActiveContact {
  id: number;
  x: number;
  y: number;
  type: string;
  pressure: number;
}

const CONTACT_COLORS = [
  { bg: "bg-blue-500", border: "border-blue-500", shadow: "shadow-blue-500/50" },
  { bg: "bg-emerald-500", border: "border-emerald-500", shadow: "shadow-emerald-500/50" },
  { bg: "bg-purple-500", border: "border-purple-500", shadow: "shadow-purple-500/50" },
  { bg: "bg-amber-500", border: "border-amber-500", shadow: "shadow-amber-500/50" },
  { bg: "bg-rose-500", border: "border-rose-500", shadow: "shadow-rose-500/50" },
  { bg: "bg-cyan-500", border: "border-cyan-500", shadow: "shadow-cyan-500/50" },
  { bg: "bg-pink-500", border: "border-pink-500", shadow: "shadow-pink-500/50" },
  { bg: "bg-indigo-500", border: "border-indigo-500", shadow: "shadow-indigo-500/50" },
  { bg: "bg-orange-500", border: "border-orange-500", shadow: "shadow-orange-500/50" },
  { bg: "bg-teal-500", border: "border-teal-500", shadow: "shadow-teal-500/50" }
];

export function MultiTouchPattern({ testId = "multi-touch-test" }: MultiTouchPatternProps) {
  useTestContext();
  const surfaceRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<MultiTouchMode>("free");
  const [contacts, setContacts] = useState<Map<number, ActiveContact>>(new Map());
  const [peakContacts, setPeakContacts] = useState<number>(0);
  const [lastPointerType, setLastPointerType] = useState<string>("none");

  // Grid mode touched cells (24 cells: 4 rows x 6 cols)
  const [gridTouched, setGridTouched] = useState<boolean[]>(Array(24).fill(false));

  // Hold challenge state
  const [holdTargetCount, setHoldTargetCount] = useState<number>(3);
  const [holdTimer, setHoldTimer] = useState<number>(0);
  const [holdAchieved, setHoldAchieved] = useState<boolean>(false);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Edge / Corner targets touched (8 targets: 4 corners + 4 edges)
  const [edgeTouched, setEdgeTouched] = useState<boolean[]>(Array(8).fill(false));

  // Browser reported maxTouchPoints
  const [browserMaxTouchPoints] = useState<number>(() => {
    if (typeof navigator !== "undefined" && "maxTouchPoints" in navigator) {
      return navigator.maxTouchPoints;
    }
    return 0;
  });

  // Handle pointer tracking
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = surfaceRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    const type = e.pointerType || "touch";

    setLastPointerType(type);

    setContacts(prev => {
      const next = new Map(prev);
      next.set(e.pointerId, {
        id: e.pointerId,
        x,
        y,
        type,
        pressure: e.pressure || 0.5
      });
      const currentCount = next.size;
      setPeakContacts(p => Math.max(p, currentCount));
      return next;
    });

    // Update Grid if in grid mode
    if (mode === "grid" && rect.width > 0 && rect.height > 0) {
      const col = Math.min(5, Math.max(0, Math.floor((x / rect.width) * 6)));
      const row = Math.min(3, Math.max(0, Math.floor((y / rect.height) * 4)));
      const index = row * 6 + col;
      setGridTouched(prev => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
    }

    // Update Edges if in edge mode
    if (mode === "edges" && rect.width > 0 && rect.height > 0) {
      const threshold = 50; // px margin
      const isTop = y < threshold;
      const isBottom = y > rect.height - threshold;
      const isLeft = x < threshold;
      const isRight = x > rect.width - threshold;

      setEdgeTouched(prev => {
        const next = [...prev];
        if (isTop && isLeft) next[0] = true; // TL
        if (isTop && isRight) next[1] = true; // TR
        if (isBottom && isLeft) next[2] = true; // BL
        if (isBottom && isRight) next[3] = true; // BR
        if (isTop && !isLeft && !isRight) next[4] = true; // Top edge
        if (isBottom && !isLeft && !isRight) next[5] = true; // Bottom edge
        if (isLeft && !isTop && !isBottom) next[6] = true; // Left edge
        if (isRight && !isTop && !isBottom) next[7] = true; // Right edge
        return next;
      });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!contacts.has(e.pointerId)) return;

    const rect = surfaceRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    setContacts(prev => {
      if (!prev.has(e.pointerId)) return prev;
      const next = new Map(prev);
      const existing = next.get(e.pointerId)!;
      next.set(e.pointerId, {
        ...existing,
        x,
        y,
        pressure: e.pressure || existing.pressure
      });
      return next;
    });

    if (mode === "grid" && rect.width > 0 && rect.height > 0) {
      const col = Math.min(5, Math.max(0, Math.floor((x / rect.width) * 6)));
      const row = Math.min(3, Math.max(0, Math.floor((y / rect.height) * 4)));
      const index = row * 6 + col;
      setGridTouched(prev => {
        if (prev[index]) return prev;
        const next = [...prev];
        next[index] = true;
        return next;
      });
    }
  };

  const removeContact = (pointerId: number) => {
    setContacts(prev => {
      if (!prev.has(pointerId)) return prev;
      const next = new Map(prev);
      next.delete(pointerId);
      return next;
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    removeContact(e.pointerId);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    removeContact(e.pointerId);
  };

  // Hold challenge timer loop
  useEffect(() => {
    if (mode !== "hold" || holdAchieved) {
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
        holdIntervalRef.current = null;
      }
      return;
    }

    if (contacts.size >= holdTargetCount) {
      const interval = setInterval(() => {
        setHoldTimer(t => {
          if (t >= 1500) {
            setHoldAchieved(true);
            clearInterval(interval);
            return 1500;
          }
          return t + 100;
        });
      }, 100);
      holdIntervalRef.current = interval;

      return () => {
        clearInterval(interval);
        holdIntervalRef.current = null;
      };
    } else {
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
        holdIntervalRef.current = null;
      }
      const timeoutId = setTimeout(() => {
        setHoldTimer(0);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [contacts.size, holdTargetCount, mode, holdAchieved]);

  const handleReset = useCallback(() => {
    setContacts(new Map());
    setPeakContacts(0);
    setGridTouched(Array(24).fill(false));
    setEdgeTouched(Array(8).fill(false));
    setHoldTimer(0);
    setHoldAchieved(false);
  }, []);

  return (
    <div className="flex flex-col h-full w-full select-none bg-slate-950 text-slate-100">
      {/* Top Telemetry & HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono">
            <Hand className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-slate-400 uppercase text-[10px] tracking-wider">Active:</span>
            <span className="text-sm font-bold text-blue-400">{contacts.size}</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-slate-400 uppercase text-[10px] tracking-wider">Peak Observed:</span>
            <span className="text-sm font-bold text-emerald-400">{peakContacts}</span>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          <div className="hidden sm:flex items-center gap-1.5 font-mono text-slate-400">
            <span className="uppercase text-[10px] tracking-wider">Pointer:</span>
            <span className="capitalize text-slate-200">{lastPointerType}</span>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden md:block" />

          <div className="hidden md:flex items-center gap-1.5 font-mono text-slate-400">
            <span className="uppercase text-[10px] tracking-wider">Reported Max:</span>
            <span className="text-slate-200 font-semibold">{browserMaxTouchPoints}</span>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setMode("free")}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === "free" ? "bg-blue-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            Free Touch
          </button>
          <button
            type="button"
            onClick={() => setMode("grid")}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === "grid" ? "bg-blue-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            Grid
          </button>
          <button
            type="button"
            onClick={() => setMode("hold")}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === "hold" ? "bg-blue-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            Hold
          </button>
          <button
            type="button"
            onClick={() => setMode("edges")}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === "edges" ? "bg-blue-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            Edges
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="ml-1 p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
            title="Reset All Counters"
            aria-label="Reset All Counters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Touch Canvas / Surface */}
      <div 
        ref={surfaceRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerCancel}
        style={{ touchAction: "none" }}
        className="relative flex-1 w-full min-h-[360px] sm:min-h-[460px] bg-radial from-slate-900 to-black overflow-hidden cursor-crosshair select-none"
      >
        {/* Mode Overlay: Free Touch */}
        {mode === "free" && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 text-center text-slate-500">
            {contacts.size === 0 && (
              <div className="max-w-md space-y-2">
                <Fingerprint className="w-12 h-12 mx-auto text-slate-600 stroke-[1.2] animate-pulse" />
                <p className="text-sm font-medium text-slate-400">
                  Touch the surface with multiple fingers simultaneously.
                </p>
                <p className="text-xs text-slate-600">
                  Each active contact will display its live coordinates, unique pointer ID, and distinct marker ring.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Mode Overlay: Grid */}
        {mode === "grid" && (
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-1 p-2 pointer-events-none">
            {gridTouched.map((touched, idx) => (
              <div
                key={idx}
                className={`rounded-lg border transition-all duration-200 flex items-center justify-center text-[10px] font-mono ${
                  touched 
                    ? "bg-blue-600/30 border-blue-500/60 text-blue-300 font-bold" 
                    : "bg-slate-900/40 border-slate-800/60 text-slate-600"
                }`}
              >
                {touched ? "OK" : `${Math.floor(idx / 6) + 1},${(idx % 6) + 1}`}
              </div>
            ))}
          </div>
        )}

        {/* Mode Overlay: Hold Challenge */}
        {mode === "hold" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4">
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl max-w-sm w-full text-center space-y-4 shadow-xl">
              <div className="flex items-center justify-center gap-2">
                <Timer className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-slate-200">Simultaneous Hold Challenge</h3>
              </div>
              <p className="text-xs text-slate-400">
                Place and hold <strong className="text-white">{holdTargetCount} contacts</strong> simultaneously for 1.5 seconds.
              </p>

              {/* Target count selector */}
              <div className="flex items-center justify-center gap-2 pointer-events-auto">
                {[2, 3, 4, 5, 10].map(cnt => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => { setHoldTargetCount(cnt); setHoldAchieved(false); setHoldTimer(0); }}
                    className={`px-2.5 py-1 text-xs rounded-md font-mono font-medium transition-colors ${
                      holdTargetCount === cnt ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {cnt} pts
                  </button>
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-100 ${
                    holdAchieved ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                  style={{ width: `${Math.min(100, Math.round((holdTimer / 1500) * 100))}%` }}
                />
              </div>

              <div className="text-xs font-mono">
                {holdAchieved ? (
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">
                    Challenge Passed! ({holdTargetCount} contacts held)
                  </span>
                ) : (
                  <span className="text-slate-400">
                    Contacts active: <strong className={contacts.size >= holdTargetCount ? "text-emerald-400" : "text-amber-400"}>{contacts.size}</strong> / {holdTargetCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mode Overlay: Edge & Corner Targets */}
        {mode === "edges" && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Top-Left */}
            <div className={`absolute top-2 left-2 w-16 h-16 rounded-xl border-2 flex items-center justify-center text-[10px] font-bold font-mono transition-colors ${
              edgeTouched[0] ? "bg-emerald-500/30 border-emerald-400 text-emerald-300" : "bg-slate-900/60 border-slate-700 text-slate-400"
            }`}>TL</div>

            {/* Top-Right */}
            <div className={`absolute top-2 right-2 w-16 h-16 rounded-xl border-2 flex items-center justify-center text-[10px] font-bold font-mono transition-colors ${
              edgeTouched[1] ? "bg-emerald-500/30 border-emerald-400 text-emerald-300" : "bg-slate-900/60 border-slate-700 text-slate-400"
            }`}>TR</div>

            {/* Bottom-Left */}
            <div className={`absolute bottom-2 left-2 w-16 h-16 rounded-xl border-2 flex items-center justify-center text-[10px] font-bold font-mono transition-colors ${
              edgeTouched[2] ? "bg-emerald-500/30 border-emerald-400 text-emerald-300" : "bg-slate-900/60 border-slate-700 text-slate-400"
            }`}>BL</div>

            {/* Bottom-Right */}
            <div className={`absolute bottom-2 right-2 w-16 h-16 rounded-xl border-2 flex items-center justify-center text-[10px] font-bold font-mono transition-colors ${
              edgeTouched[3] ? "bg-emerald-500/30 border-emerald-400 text-emerald-300" : "bg-slate-900/60 border-slate-700 text-slate-400"
            }`}>BR</div>

            {/* Top Edge */}
            <div className={`absolute top-2 left-24 right-24 h-10 rounded-lg border-2 flex items-center justify-center text-[10px] font-bold font-mono transition-colors ${
              edgeTouched[4] ? "bg-emerald-500/30 border-emerald-400 text-emerald-300" : "bg-slate-900/60 border-slate-700 text-slate-400"
            }`}>Top Bezel Target</div>

            {/* Bottom Edge */}
            <div className={`absolute bottom-2 left-24 right-24 h-10 rounded-lg border-2 flex items-center justify-center text-[10px] font-bold font-mono transition-colors ${
              edgeTouched[5] ? "bg-emerald-500/30 border-emerald-400 text-emerald-300" : "bg-slate-900/60 border-slate-700 text-slate-400"
            }`}>Bottom Bezel Target</div>

            {/* Left Edge */}
            <div className={`absolute left-2 top-24 bottom-24 w-10 rounded-lg border-2 flex items-center justify-center text-[10px] font-bold font-mono [writing-mode:vertical-lr] transition-colors ${
              edgeTouched[6] ? "bg-emerald-500/30 border-emerald-400 text-emerald-300" : "bg-slate-900/60 border-slate-700 text-slate-400"
            }`}>Left Bezel Target</div>

            {/* Right Edge */}
            <div className={`absolute right-2 top-24 bottom-24 w-10 rounded-lg border-2 flex items-center justify-center text-[10px] font-bold font-mono [writing-mode:vertical-lr] transition-colors ${
              edgeTouched[7] ? "bg-emerald-500/30 border-emerald-400 text-emerald-300" : "bg-slate-900/60 border-slate-700 text-slate-400"
            }`}>Right Bezel Target</div>
          </div>
        )}

        {/* Render Active Contacts */}
        {Array.from(contacts.values()).map((contact, idx) => {
          const color = CONTACT_COLORS[idx % CONTACT_COLORS.length];
          return (
            <div
              key={contact.id}
              className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
              style={{ left: contact.x, top: contact.y }}
            >
              {/* Outer Ripple */}
              <div className={`w-20 h-20 rounded-full border-2 ${color.border} animate-ping opacity-40`} />
              {/* Main Indicator Ring */}
              <div className={`absolute inset-2 rounded-full border-2 ${color.border} bg-slate-950/60 backdrop-blur-xs flex items-center justify-center shadow-lg ${color.shadow}`}>
                <div className={`w-3.5 h-3.5 rounded-full ${color.bg}`} />
              </div>
              {/* Coordinates Pill */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-[10px] font-mono border border-slate-800 px-2 py-0.5 rounded-md text-slate-300 shadow-md">
                P{contact.id} ({contact.x}, {contact.y})
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Honesty Disclaimer Banner */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200">Hardware Boundary Notice:</strong> This test observes pointer events exposed by your browser and operating system. It does not measure physical touchscreen hardware latency, pressure accuracy, or panel digitizer grid density. Browser touch gestures or palm rejection drivers can filter simultaneous touch contacts.
        </div>
      </div>

      <TestControlBar testId={testId} title="Standalone Multi-Touch Test" />
    </div>
  );
}
