"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { 
  RotateCcw, 
  ShieldAlert, 
  Play, 
  Square, 
  Compass, 
  Smartphone, 
  AlertTriangle 
} from "lucide-react";

interface AccelerometerPatternProps {
  testId?: string;
}

type SensorState = 
  | "IDLE" 
  | "PERMISSION_REQUIRED" 
  | "ACTIVE" 
  | "NO_DATA" 
  | "DENIED" 
  | "UNSUPPORTED";

interface MotionData {
  accX: number | null;
  accY: number | null;
  accZ: number | null;
  gravX: number | null;
  gravY: number | null;
  gravZ: number | null;
  interval: number | null;
  eventCount: number;
  lastUpdate: number;
}

export function AccelerometerPattern({ testId = "accelerometer-test" }: AccelerometerPatternProps) {
  useTestContext();

  const [sensorState, setSensorState] = useState<SensorState>(() => {
    if (typeof window === "undefined") return "IDLE";
    if (!("DeviceMotionEvent" in window)) return "UNSUPPORTED";
    const dme = window.DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> };
    if (typeof dme.requestPermission === "function") return "PERMISSION_REQUIRED";
    return "IDLE";
  });
  const [motionData, setMotionData] = useState<MotionData>({
    accX: null,
    accY: null,
    accZ: null,
    gravX: null,
    gravY: null,
    gravZ: null,
    interval: null,
    eventCount: 0,
    lastUpdate: 0
  });

  const [peakG, setPeakG] = useState<number>(0);
  const dataReceivedRef = useRef<boolean>(false);
  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);



  const handleMotion = useCallback((event: DeviceMotionEvent) => {
    dataReceivedRef.current = true;
    const now = performance.now();

    const acc = event.acceleration;
    const grav = event.accelerationIncludingGravity;

    const ax = acc?.x != null ? Number(acc.x.toFixed(2)) : null;
    const ay = acc?.y != null ? Number(acc.y.toFixed(2)) : null;
    const az = acc?.z != null ? Number(acc.z.toFixed(2)) : null;

    const gx = grav?.x != null ? Number(grav.x.toFixed(2)) : null;
    const gy = grav?.y != null ? Number(grav.y.toFixed(2)) : null;
    const gz = grav?.z != null ? Number(grav.z.toFixed(2)) : null;

    // Calculate total G-vector magnitude
    if (gx != null && gy != null && gz != null) {
      const mag = Math.sqrt(gx * gx + gy * gy + gz * gz) / 9.80665;
      setPeakG(prev => Math.max(prev, Number(mag.toFixed(2))));
    }

    setMotionData(prev => ({
      accX: ax,
      accY: ay,
      accZ: az,
      gravX: gx,
      gravY: gy,
      gravZ: gz,
      interval: event.interval ? Number(event.interval.toFixed(1)) : null,
      eventCount: prev.eventCount + 1,
      lastUpdate: now
    }));

    setSensorState("ACTIVE");
  }, []);

  const startListening = async () => {
    if (typeof window === "undefined" || !("DeviceMotionEvent" in window)) {
      setSensorState("UNSUPPORTED");
      return;
    }

    dataReceivedRef.current = false;

    // iOS 13+ permission request
    const dme = window.DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> };
    if (typeof dme.requestPermission === "function") {
      try {
        const permission = await dme.requestPermission();
        if (permission !== "granted") {
          setSensorState("DENIED");
          return;
        }
      } catch {
        setSensorState("DENIED");
        return;
      }
    }

    window.addEventListener("devicemotion", handleMotion);
    setSensorState("ACTIVE");

    // Timeout: if no events fire in 2.5 seconds, device lacks accelerometer
    if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    checkTimeoutRef.current = setTimeout(() => {
      if (!dataReceivedRef.current) {
        setSensorState("NO_DATA");
      }
    }, 2500);
  };

  const stopListening = () => {
    if (typeof window !== "undefined") {
      window.removeEventListener("devicemotion", handleMotion);
    }
    if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    setSensorState("IDLE");
  };

  const handleReset = () => {
    setPeakG(0);
    setMotionData({
      accX: null,
      accY: null,
      accZ: null,
      gravX: null,
      gravY: null,
      gravZ: null,
      interval: null,
      eventCount: 0,
      lastUpdate: 0
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("devicemotion", handleMotion);
      }
      if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    };
  }, [handleMotion]);

  // Reticle positioning from gravity vector
  const rawGx = motionData.gravX ?? 0;
  const rawGy = motionData.gravY ?? 0;
  // Normalized clamp: 9.8m/s² maps to ~45% radius
  const puckX = Math.max(-45, Math.min(45, (rawGx / 9.80665) * 45));
  const puckY = Math.max(-45, Math.min(45, (-rawGy / 9.80665) * 45));

  return (
    <div className="flex flex-col h-full w-full select-none bg-slate-950 text-slate-100">
      {/* Top HUD / Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-slate-400 uppercase text-[10px] tracking-wider">Status:</span>
            {sensorState === "ACTIVE" && (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active ({motionData.eventCount} events)
              </span>
            )}
            {sensorState === "IDLE" && (
              <span className="text-slate-400 font-medium">Ready (Stopped)</span>
            )}
            {sensorState === "PERMISSION_REQUIRED" && (
              <span className="text-amber-400 font-medium">Permission Required</span>
            )}
            {sensorState === "NO_DATA" && (
              <span className="text-amber-400 font-medium">No Sensor Hardware Detected</span>
            )}
            {sensorState === "DENIED" && (
              <span className="text-rose-400 font-medium">Permission Denied</span>
            )}
            {sensorState === "UNSUPPORTED" && (
              <span className="text-rose-400 font-medium">API Unsupported</span>
            )}
          </div>

          <div className="h-4 w-px bg-slate-800" />

          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-slate-400 uppercase text-[10px] tracking-wider">Peak G-Force:</span>
            <span className="text-sm font-bold text-blue-400">{peakG}g</span>
          </div>

          {motionData.interval != null && (
            <>
              <div className="h-4 w-px bg-slate-800 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-1.5 font-mono text-slate-400">
                <span className="uppercase text-[10px] tracking-wider">Interval:</span>
                <span className="text-slate-200">{motionData.interval}ms</span>
              </div>
            </>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {sensorState !== "ACTIVE" ? (
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
            title="Reset Telemetry"
            aria-label="Reset Telemetry"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6 overflow-y-auto">
        {/* Left: 2D G-Force & Orientation Reticle */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-900/60 rounded-2xl border border-slate-800 relative min-h-[300px]">
          <div className="text-xs font-mono font-medium text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-blue-400" />
            <span>2D Tilt & G-Force Reticle</span>
          </div>

          {/* Reticle Circle */}
          <div className="relative w-56 h-56 rounded-full border border-slate-700 bg-slate-950/80 flex items-center justify-center shadow-inner">
            {/* Axis Lines */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-slate-800" />
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-slate-800" />

            {/* Concentric rings: 0.5g and 1.0g */}
            <div className="absolute w-28 h-28 rounded-full border border-dashed border-slate-800" />
            <div className="absolute w-44 h-44 rounded-full border border-slate-700/60" />

            {/* Axis Labels */}
            <span className="absolute top-1 text-[9px] font-mono text-slate-500 uppercase">+Y</span>
            <span className="absolute bottom-1 text-[9px] font-mono text-slate-500 uppercase">-Y</span>
            <span className="absolute left-1 text-[9px] font-mono text-slate-500 uppercase">-X</span>
            <span className="absolute right-1 text-[9px] font-mono text-slate-500 uppercase">+X</span>

            {/* Dynamic Puck / Bubble */}
            <div 
              className="absolute w-7 h-7 rounded-full bg-blue-500 border-2 border-white shadow-lg shadow-blue-500/50 transition-all duration-75 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${50 + puckX}%`,
                top: `${50 + puckY}%`
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>

          <div className="mt-4 text-[11px] font-mono text-slate-400 text-center">
            Tilt device or accelerate to observe reticle displacement
          </div>
        </div>

        {/* Right: Detailed Telemetry Cards */}
        <div className="flex flex-col gap-3 justify-center">
          {/* Linear Acceleration (m/s²) */}
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Linear Acceleration (excluding gravity)</span>
              <span className="text-[10px] font-mono text-slate-500">m/s²</span>
            </div>
            <div className="grid grid-cols-3 gap-2 font-mono text-center">
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">X</span>
                <span className="text-sm font-bold text-slate-200">
                  {motionData.accX != null ? `${motionData.accX}` : "—"}
                </span>
              </div>
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">Y</span>
                <span className="text-sm font-bold text-slate-200">
                  {motionData.accY != null ? `${motionData.accY}` : "—"}
                </span>
              </div>
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">Z</span>
                <span className="text-sm font-bold text-slate-200">
                  {motionData.accZ != null ? `${motionData.accZ}` : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Acceleration Including Gravity (m/s²) */}
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Total Acceleration (including gravity)</span>
              <span className="text-[10px] font-mono text-slate-500">m/s²</span>
            </div>
            <div className="grid grid-cols-3 gap-2 font-mono text-center">
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">X</span>
                <span className="text-sm font-bold text-blue-400">
                  {motionData.gravX != null ? `${motionData.gravX}` : "—"}
                </span>
              </div>
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">Y</span>
                <span className="text-sm font-bold text-blue-400">
                  {motionData.gravY != null ? `${motionData.gravY}` : "—"}
                </span>
              </div>
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">Z</span>
                <span className="text-sm font-bold text-blue-400">
                  {motionData.gravZ != null ? `${motionData.gravZ}` : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Device Guidance Notice if NO_DATA or IDLE */}
          {sensorState === "NO_DATA" && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>No Motion Sensor Hardware Detected</span>
              </div>
              <p className="text-[11px] text-amber-200/80">
                Standard desktop computers and monitors do not contain physical accelerometer chips. To test live motion events, open this page on a smartphone, tablet, or laptop equipped with built-in inertial sensors.
              </p>
            </div>
          )}

          {sensorState === "PERMISSION_REQUIRED" && (
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-xs text-blue-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Smartphone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>User Permission Required (iOS)</span>
              </div>
              <p className="text-[11px] text-blue-200/80">
                Apple Safari requires an explicit user tap to access device motion sensors. Click &quot;Start Sensor&quot; above and tap &quot;Allow&quot; on the browser prompt.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Technical Honesty Disclaimer Banner */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200">Hardware Boundary Notice:</strong> This test displays motion telemetry reported by your browser via DeviceMotionEvent. It does not independently calibrate sensor bias or verify laboratory-grade physical measurement accuracy. Values reflect operating system sensor-fusion calculations.
        </div>
      </div>

      <TestControlBar testId={testId} title="Accelerometer Test" />
    </div>
  );
}
