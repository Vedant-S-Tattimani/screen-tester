"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { 
  Compass, 
  RotateCcw, 
  ShieldAlert, 
  Play, 
  Square, 
  Smartphone,
  AlertTriangle,
  RotateCw
} from "lucide-react";

interface GyroscopePatternProps {
  testId?: string;
}

type GyroState = 
  | "IDLE" 
  | "PERMISSION_REQUIRED" 
  | "ACTIVE" 
  | "NO_DATA" 
  | "DENIED" 
  | "UNSUPPORTED";

interface OrientationData {
  alpha: number | null; // 0 to 360 (compass heading / yaw)
  beta: number | null;  // -180 to 180 (front-to-back tilt / pitch)
  gamma: number | null; // -90 to 90 (left-to-right tilt / roll)
  absolute: boolean;
  eventCount: number;
  lastUpdate: number;
}

export function GyroscopePattern({ testId = "gyroscope-test" }: GyroscopePatternProps) {
  useTestContext();

  const [gyroState, setGyroState] = useState<GyroState>(() => {
    if (typeof window === "undefined") return "IDLE";
    if (!("DeviceOrientationEvent" in window)) return "UNSUPPORTED";
    const doe = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    if (typeof doe.requestPermission === "function") return "PERMISSION_REQUIRED";
    return "IDLE";
  });
  const [orientationData, setOrientationData] = useState<OrientationData>({
    alpha: null,
    beta: null,
    gamma: null,
    absolute: false,
    eventCount: 0,
    lastUpdate: 0
  });

  const dataReceivedRef = useRef<boolean>(false);
  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    // If all values are null, it's not a real sensor event (e.g. desktop dummy event)
    if (event.alpha == null && event.beta == null && event.gamma == null) {
      return;
    }

    dataReceivedRef.current = true;
    const now = performance.now();

    const a = event.alpha != null ? Number(event.alpha.toFixed(1)) : null;
    const b = event.beta != null ? Number(event.beta.toFixed(1)) : null;
    const g = event.gamma != null ? Number(event.gamma.toFixed(1)) : null;

    setOrientationData(prev => ({
      alpha: a,
      beta: b,
      gamma: g,
      absolute: Boolean(event.absolute),
      eventCount: prev.eventCount + 1,
      lastUpdate: now
    }));

    setGyroState("ACTIVE");
  }, []);

  const startListening = async () => {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
      setGyroState("UNSUPPORTED");
      return;
    }

    dataReceivedRef.current = false;

    // iOS 13+ permission request
    const doe = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    if (typeof doe.requestPermission === "function") {
      try {
        const permission = await doe.requestPermission();
        if (permission !== "granted") {
          setGyroState("DENIED");
          return;
        }
      } catch {
        setGyroState("DENIED");
        return;
      }
    }

    window.addEventListener("deviceorientation", handleOrientation);
    setGyroState("ACTIVE");

    // Timeout: if no orientation events fire within 2.5 seconds, device has no gyro
    if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    checkTimeoutRef.current = setTimeout(() => {
      if (!dataReceivedRef.current) {
        setGyroState("NO_DATA");
      }
    }, 2500);
  };

  const stopListening = () => {
    if (typeof window !== "undefined") {
      window.removeEventListener("deviceorientation", handleOrientation);
    }
    if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    setGyroState("IDLE");
  };

  const handleReset = () => {
    setOrientationData({
      alpha: null,
      beta: null,
      gamma: null,
      absolute: false,
      eventCount: 0,
      lastUpdate: 0
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
      if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    };
  }, [handleOrientation]);

  // Derived angles for visual artificial horizon
  const roll = orientationData.gamma ?? 0;  // -90 to +90 deg
  const pitch = orientationData.beta ?? 0;  // -180 to +180 deg
  const yaw = orientationData.alpha ?? 0;   // 0 to 360 deg

  // Clamp pitch to display range (-45 to +45)
  const clampedPitch = Math.max(-45, Math.min(45, pitch));

  return (
    <div className="flex flex-col h-full w-full select-none bg-slate-950 text-slate-100">
      {/* Top HUD / Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-slate-400 uppercase text-[10px] tracking-wider">Status:</span>
            {gyroState === "ACTIVE" && (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active ({orientationData.eventCount} updates)
              </span>
            )}
            {gyroState === "IDLE" && (
              <span className="text-slate-400 font-medium">Ready (Stopped)</span>
            )}
            {gyroState === "PERMISSION_REQUIRED" && (
              <span className="text-amber-400 font-medium">Permission Required</span>
            )}
            {gyroState === "NO_DATA" && (
              <span className="text-amber-400 font-medium">No Gyroscope Hardware Detected</span>
            )}
            {gyroState === "DENIED" && (
              <span className="text-rose-400 font-medium">Permission Denied</span>
            )}
            {gyroState === "UNSUPPORTED" && (
              <span className="text-rose-400 font-medium">API Unsupported</span>
            )}
          </div>

          <div className="h-4 w-px bg-slate-800" />

          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-slate-400 uppercase text-[10px] tracking-wider">Heading:</span>
            <span className="text-sm font-bold text-blue-400">
              {orientationData.alpha != null ? `${orientationData.alpha}°` : "—"}
            </span>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          <div className="hidden sm:flex items-center gap-1.5 font-mono text-slate-400">
            <span className="uppercase text-[10px] tracking-wider">Reference:</span>
            <span className="text-slate-200">{orientationData.absolute ? "Earth Absolute" : "Relative"}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {gyroState !== "ACTIVE" ? (
            <button
              type="button"
              onClick={startListening}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Start Sensor</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopListening}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors"
            >
              <Square className="w-3.5 h-3.5 text-rose-400" />
              <span>Stop Sensor</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Reset Orientation"
            aria-label="Reset Orientation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6 overflow-y-auto">
        {/* Left: Artificial Horizon / Attitude Gauge */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-900/60 rounded-2xl border border-slate-800 relative min-h-[300px]">
          <div className="text-xs font-mono font-medium text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
            <RotateCw className="w-4 h-4 text-blue-400" />
            <span>Attitude & Orientation Indicator</span>
          </div>

          {/* Horizon Window */}
          <div className="relative w-56 h-56 rounded-full border-2 border-slate-700 overflow-hidden shadow-2xl bg-slate-950 flex items-center justify-center">
            {/* Rotating Horizon Disk */}
            <div 
              className="absolute w-80 h-80 transition-transform duration-75 origin-center"
              style={{
                transform: `rotate(${-roll}deg) translateY(${clampedPitch * 1.5}px)`
              }}
            >
              {/* Sky (Upper Half) */}
              <div className="h-40 bg-linear-to-b from-sky-600 to-sky-500 border-b-2 border-amber-300" />
              {/* Ground (Lower Half) */}
              <div className="h-40 bg-linear-to-b from-amber-900 to-amber-950" />
            </div>

            {/* Pitch Ladder Marks (Fixed Overlay) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-2">
              <div className="w-16 h-0.5 bg-white/40" />
              <div className="w-24 h-0.5 bg-white/60" />
              {/* Aircraft Crosshair / Center Pointer */}
              <div className="flex items-center gap-1 my-1">
                <div className="w-8 h-1 bg-amber-400 rounded-full shadow-xs" />
                <div className="w-2 h-2 rounded-full border-2 border-amber-400 bg-transparent" />
                <div className="w-8 h-1 bg-amber-400 rounded-full shadow-xs" />
              </div>
              <div className="w-24 h-0.5 bg-white/60" />
              <div className="w-16 h-0.5 bg-white/40" />
            </div>

            {/* Compass Heading Pointer (top dial) */}
            <div 
              className="absolute inset-0 pointer-events-none transition-transform duration-75"
              style={{ transform: `rotate(${-yaw}deg)` }}
            >
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-3 bg-rose-500 clip-path-triangle" />
              <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-rose-400">N</span>
            </div>
          </div>

          <div className="mt-4 text-[11px] font-mono text-slate-400 text-center">
            Rotate or tilt device to test roll, pitch, and yaw tracking
          </div>
        </div>

        {/* Right: Detailed Telemetry Cards */}
        <div className="flex flex-col gap-3 justify-center">
          {/* Angular Orientation Card */}
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Angular Orientation</span>
              <span className="text-[10px] font-mono text-slate-500">degrees (°)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 font-mono text-center">
              {/* Alpha (Yaw) */}
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">Alpha (Yaw)</span>
                <span className="text-sm font-bold text-blue-400">
                  {orientationData.alpha != null ? `${orientationData.alpha}°` : "—"}
                </span>
                <span className="text-[9px] text-slate-600 block mt-0.5">0° to 360°</span>
              </div>
              {/* Beta (Pitch) */}
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">Beta (Pitch)</span>
                <span className="text-sm font-bold text-emerald-400">
                  {orientationData.beta != null ? `${orientationData.beta}°` : "—"}
                </span>
                <span className="text-[9px] text-slate-600 block mt-0.5">-180° to 180°</span>
              </div>
              {/* Gamma (Roll) */}
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">Gamma (Roll)</span>
                <span className="text-sm font-bold text-purple-400">
                  {orientationData.gamma != null ? `${orientationData.gamma}°` : "—"}
                </span>
                <span className="text-[9px] text-slate-600 block mt-0.5">-90° to 90°</span>
              </div>
            </div>
          </div>

          {/* Educational Note: Euler Angles */}
          <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/60 text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-slate-300">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              <span>Euler Rotation Axis Guide</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-400">
              <li><strong>Alpha (Z-axis):</strong> Rotation around the screen perpendicular axis (compass direction).</li>
              <li><strong>Beta (X-axis):</strong> Tilting forward and backward (screen pitch).</li>
              <li><strong>Gamma (Y-axis):</strong> Tilting left and right (screen roll).</li>
            </ul>
          </div>

          {/* Device Guidance Notice if NO_DATA or PERMISSION_REQUIRED */}
          {gyroState === "NO_DATA" && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>No Gyroscope Sensor Hardware Detected</span>
              </div>
              <p className="text-[11px] text-amber-200/80">
                Desktop computers and stationary monitors lack angular orientation sensors. Open this test on a mobile phone or tablet to inspect real-time rotational movement.
              </p>
            </div>
          )}

          {gyroState === "PERMISSION_REQUIRED" && (
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-xs text-blue-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Smartphone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Orientation Permission Required</span>
              </div>
              <p className="text-[11px] text-blue-200/80">
                Tap &quot;Start Sensor&quot; above and confirm the browser security prompt to allow gyroscope access.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Technical Honesty Disclaimer Banner */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200">Hardware Boundary Notice:</strong> Browser-reported orientation reflects angular coordinates calculated by your operating system and browser engine. It does not calibrate physical MEMS gyroscope sensor accuracy or measure physical drift rate.
        </div>
      </div>

      <TestControlBar testId={testId} title="Gyroscope Test" />
    </div>
  );
}
