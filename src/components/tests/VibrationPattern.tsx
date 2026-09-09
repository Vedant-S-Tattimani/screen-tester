"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { 
  Vibrate, 
  ShieldAlert, 
  Play, 
  Square, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Clock,
  Sparkles
} from "lucide-react";

interface VibrationPatternProps {
  testId?: string;
}

type VibrationStatus = 
  | "IDLE" 
  | "VIBRATING" 
  | "ACCEPTED" 
  | "REJECTED" 
  | "UNSUPPORTED";

type UserHapticObservation = "FEEL_YES" | "FEEL_NO" | "UNSURE" | null;

export function VibrationPattern({ testId = "vibration-test" }: VibrationPatternProps) {
  const { setObservation } = useTestContext();

  const isVibrationSupported = typeof navigator !== "undefined" && typeof navigator.vibrate === "function";

  const [status, setStatus] = useState<VibrationStatus>(() => {
    if (typeof navigator === "undefined") return "IDLE";
    return typeof navigator.vibrate === "function" ? "IDLE" : "UNSUPPORTED";
  });
  const [activePatternName, setActivePatternName] = useState<string>("");
  const [userFelt, setUserFelt] = useState<UserHapticObservation>(null);
  const [customInput, setCustomInput] = useState<string>("200, 100, 200, 100, 300");
  const [customError, setCustomError] = useState<string | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Stop vibration and cleanup timers
  const stopVibration = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      try {
        navigator.vibrate(0);
      } catch {
        // ignore
      }
    }
    setStatus("IDLE");
    setActivePatternName("");
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopVibration();
    };
  }, [stopVibration]);

  // Execute safe vibration
  const triggerVibration = (pattern: number | number[], name: string) => {
    if (!isVibrationSupported) {
      setStatus("UNSUPPORTED");
      return;
    }

    stopVibration();

    let patternArray: number[] = Array.isArray(pattern) ? pattern : [pattern];

    // Safety checks
    // 1. Max 6 pulses
    if (patternArray.length > 6) {
      patternArray = patternArray.slice(0, 6);
    }
    // 2. Max single pulse 1000ms
    patternArray = patternArray.map(p => Math.min(1000, Math.max(10, p)));
    // 3. Max total duration 3000ms
    const totalDuration = patternArray.reduce((acc, curr) => acc + curr, 0);
    if (totalDuration > 3000) {
      setCustomError("Total duration exceeds 3,000ms safety limit.");
      return;
    }
    setCustomError(null);

    try {
      const accepted = navigator.vibrate(patternArray);
      if (accepted) {
        setStatus("VIBRATING");
        setActivePatternName(name);

        timeoutRef.current = setTimeout(() => {
          setStatus("ACCEPTED");
          setActivePatternName("");
        }, totalDuration);
      } else {
        setStatus("REJECTED");
      }
    } catch {
      setStatus("REJECTED");
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = customInput
      .split(",")
      .map(p => parseInt(p.trim(), 10))
      .filter(p => !isNaN(p) && p > 0);

    if (parts.length === 0) {
      setCustomError("Enter comma-separated millisecond durations (e.g. 200, 100, 200).");
      return;
    }

    triggerVibration(parts, `Custom (${parts.join(", ")} ms)`);
  };

  const handleUserObservation = (choice: UserHapticObservation) => {
    setUserFelt(choice);
    if (choice === "FEEL_YES") {
      setObservation("PASS");
    } else if (choice === "FEEL_NO") {
      setObservation("ISSUE");
    } else if (choice === "UNSURE") {
      setObservation("UNSURE");
    }
  };

  return (
    <div className="flex flex-col h-full w-full select-none bg-slate-950 text-slate-100">
      {/* Top HUD / Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono">
            <Vibrate className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-slate-400 uppercase text-[10px] tracking-wider">Status:</span>
            {status === "VIBRATING" && (
              <span className="inline-flex items-center gap-1 text-amber-400 font-semibold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                Vibrating ({activePatternName})
              </span>
            )}
            {status === "ACCEPTED" && (
              <span className="text-emerald-400 font-semibold">Command Accepted by Browser</span>
            )}
            {status === "IDLE" && (
              <span className="text-slate-400 font-medium">Ready</span>
            )}
            {status === "REJECTED" && (
              <span className="text-rose-400 font-medium">Command Rejected / Unavailable</span>
            )}
            {status === "UNSUPPORTED" && (
              <span className="text-rose-400 font-medium">Vibration API Unsupported</span>
            )}
          </div>

          <div className="h-4 w-px bg-slate-800" />

          <div className="flex items-center gap-1.5 font-mono text-slate-400">
            <span className="uppercase text-[10px] tracking-wider">API:</span>
            <span className="text-slate-200">
              {isVibrationSupported ? "navigator.vibrate" : "Not Available"}
            </span>
          </div>
        </div>

        {/* Global Stop Button */}
        {status === "VIBRATING" && (
          <button
            type="button"
            onClick={stopVibration}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Square className="w-3.5 h-3.5" />
            <span>Stop Vibration</span>
          </button>
        )}
      </div>

      {/* Main Controls & Pattern Selection */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 max-w-4xl mx-auto w-full">
        {/* API Support Alert if Unsupported */}
        {!isVibrationSupported && (
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-300 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Vibration API Unavailable on this Browser</span>
            </div>
            <p className="text-[11px] text-amber-200/80 leading-relaxed">
              Apple iOS Safari, iPadOS, and most desktop browsers (Windows / macOS / Linux) do not expose the Web Vibration API for privacy and hardware constraints. To test physical tactile haptics, run this page on an Android phone using Chrome or Firefox.
            </p>
          </div>
        )}

        {/* Preset Vibration Cards */}
        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Standard Vibration Presets</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Short Pulse */}
            <button
              type="button"
              disabled={!isVibrationSupported}
              onClick={() => triggerVibration(100, "Short Pulse (100ms)")}
              className="p-4 bg-slate-900/80 hover:bg-slate-800/90 disabled:opacity-50 disabled:pointer-events-none border border-slate-800 rounded-xl text-left transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 group-hover:text-blue-400">Short Pulse</span>
                  <span className="text-[10px] font-mono text-slate-500">100 ms</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Quick tactile click sensation for button taps.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-400">
                <Play className="w-3 h-3" />
                <span>Test Pulse</span>
              </div>
            </button>

            {/* Medium Pulse */}
            <button
              type="button"
              disabled={!isVibrationSupported}
              onClick={() => triggerVibration(300, "Medium Pulse (300ms)")}
              className="p-4 bg-slate-900/80 hover:bg-slate-800/90 disabled:opacity-50 disabled:pointer-events-none border border-slate-800 rounded-xl text-left transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-400">Medium Pulse</span>
                  <span className="text-[10px] font-mono text-slate-500">300 ms</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Standard alert buzz for notification feedback.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <Play className="w-3 h-3" />
                <span>Test Pulse</span>
              </div>
            </button>

            {/* Long Pulse */}
            <button
              type="button"
              disabled={!isVibrationSupported}
              onClick={() => triggerVibration(600, "Long Pulse (600ms)")}
              className="p-4 bg-slate-900/80 hover:bg-slate-800/90 disabled:opacity-50 disabled:pointer-events-none border border-slate-800 rounded-xl text-left transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 group-hover:text-amber-400">Long Pulse</span>
                  <span className="text-[10px] font-mono text-slate-500">600 ms</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Extended pulse to test motor startup torque.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                <Play className="w-3 h-3" />
                <span>Test Pulse</span>
              </div>
            </button>
          </div>
        </div>

        {/* Custom Pattern Builder */}
        <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>Custom Vibration Sequence</span>
            </h2>
            <span className="text-[10px] text-slate-500 font-mono">Max 3,000ms total</span>
          </div>

          <form onSubmit={handleCustomSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex-1">
              <input
                type="text"
                disabled={!isVibrationSupported}
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="e.g. 150, 100, 150, 100, 300"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-hidden focus:border-purple-500"
              />
            </div>
            <button
              type="submit"
              disabled={!isVibrationSupported}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:pointer-events-none text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
            >
              Run Sequence
            </button>
          </form>

          {customError && (
            <p className="text-[11px] text-rose-400 font-medium">{customError}</p>
          )}

          <p className="text-[11px] text-slate-500">
            Specify alternating vibration and pause durations in milliseconds (e.g. <code>vibrate, pause, vibrate, pause</code>). Safety limits cap single pulses at 1,000ms and total duration at 3,000ms.
          </p>
        </div>

        {/* User Tactile Observation Section */}
        <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">
              User Physical Observation (Mandatory Hardware Check)
            </span>
            {userFelt && (
              <span className="text-[10px] font-mono text-blue-400 uppercase">Recorded</span>
            )}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The browser engine can confirm that a vibration command was dispatched to the operating system, but <strong>cannot independently verify that physical motor hardware moved</strong>. Did you feel physical vibration in your hand?
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleUserObservation("FEEL_YES")}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                userFelt === "FEEL_YES"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>I felt the vibration</span>
            </button>

            <button
              type="button"
              onClick={() => handleUserObservation("FEEL_NO")}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                userFelt === "FEEL_NO"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200"
              }`}
            >
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>I did not feel the vibration</span>
            </button>

            <button
              type="button"
              onClick={() => handleUserObservation("UNSURE")}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                userFelt === "UNSURE"
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Unsure</span>
            </button>
          </div>
        </div>
      </div>

      {/* Technical Honesty Disclaimer Banner */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200">Hardware Boundary Notice:</strong> The browser cannot detect physical vibration motor coils or mechanical movement. A &quot;command accepted&quot; response only confirms the OS accepted the signal; your physical tactile sensation is the only valid result.
        </div>
      </div>

      <TestControlBar testId={testId} title="Vibration Test" />
    </div>
  );
}
