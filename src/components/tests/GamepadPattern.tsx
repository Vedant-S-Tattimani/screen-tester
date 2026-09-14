"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Gamepad2, CheckCircle2, AlertCircle, Vibrate, RefreshCw } from "lucide-react";
import { TestControlBar } from "../test-runner/TestControlBar";
import { cn } from "@/lib/utils";

interface GamepadPatternProps {
  testId?: string;
}

export function GamepadPattern({ testId = "gamepad-test" }: GamepadPatternProps) {
  const t = useTranslations("Tests.GamepadPattern");
  const [connectedGamepad, setConnectedGamepad] = useState<Gamepad | null>(null);
  const [buttonStates, setButtonStates] = useState<number[]>([]);
  const [axesStates, setAxesStates] = useState<number[]>([0, 0, 0, 0]);
  const [pollingRateHz, setPollingRateHz] = useState<number>(0);
  const [canVibrate, setCanVibrate] = useState<boolean>(false);

  const animFrameIdRef = useRef<number | null>(null);
  const pollCountRef = useRef<number>(0);
  const lastPollTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    const handleConnect = (e: GamepadEvent) => {
      setConnectedGamepad(e.gamepad);
      if (e.gamepad.vibrationActuator) {
        setCanVibrate(true);
      }
    };

    const handleDisconnect = () => {
      setConnectedGamepad(null);
    };

    window.addEventListener("gamepadconnected", handleConnect);
    window.addEventListener("gamepaddisconnected", handleDisconnect);

    const pollGamepad = () => {
      const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
      const gp = gamepads[0] || gamepads[1] || gamepads[2] || gamepads[3];

      if (gp) {
        setConnectedGamepad(gp);
        setButtonStates(gp.buttons.map((b) => b.value));
        setAxesStates([...gp.axes]);

        // Calculate polling rate
        pollCountRef.current++;
        const now = performance.now();
        if (now - lastPollTimeRef.current >= 1000) {
          setPollingRateHz(pollCountRef.current);
          pollCountRef.current = 0;
          lastPollTimeRef.current = now;
        }

        if (gp.vibrationActuator) {
          setCanVibrate(true);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(pollGamepad);
    };

    animFrameIdRef.current = requestAnimationFrame(pollGamepad);

    return () => {
      window.removeEventListener("gamepadconnected", handleConnect);
      window.removeEventListener("gamepaddisconnected", handleDisconnect);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  const triggerVibration = async () => {
    if (!connectedGamepad?.vibrationActuator) return;
    try {
      await connectedGamepad.vibrationActuator.playEffect("dual-rumble", {
        startDelay: 0,
        duration: 400,
        weakMagnitude: 0.8,
        strongMagnitude: 1.0
      });
    } catch {
      // Browser permissions fallback
    }
  };

  const leftStickX = axesStates[0] || 0;
  const leftStickY = axesStates[1] || 0;
  const rightStickX = axesStates[2] || 0;
  const rightStickY = axesStates[3] || 0;

  const ltValue = buttonStates[6] || 0;
  const rtValue = buttonStates[7] || 0;

  return (
    <div className="relative w-full h-full min-h-[600px] flex flex-col items-center justify-center bg-slate-950 text-white p-4 select-none">
      {/* Top Guidance Bar */}
      <TestControlBar testId={testId} title={t("title")} />

      {!connectedGamepad ? (
        <div className="max-w-md w-full text-center p-8 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl space-y-4">
          <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center mx-auto text-sky-400">
            <Gamepad2 className="w-8 h-8 animate-pulse" />
          </div>
          <h2 className="text-xl font-bold">{t("noGamepadDetected")}</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            {t("connectPrompt")}
          </p>
          <div className="text-xs font-mono bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-slate-400">
            {t("browserSupportNote")}
          </div>
        </div>
      ) : (
        <div className="max-w-3xl w-full flex flex-col gap-6 pt-16">
          {/* Header Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-800">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t("gamepadConnected")}</span>
              </div>
              <h3 className="text-base font-bold text-slate-100 truncate max-w-md">
                {connectedGamepad.id}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300">
                <span className="text-slate-500 mr-1.5">{t("pollingRate")}:</span>
                <span className="text-sky-400 font-bold">{pollingRateHz} Hz</span>
              </div>
              {canVibrate && (
                <button
                  onClick={triggerVibration}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs font-medium transition-colors"
                >
                  <Vibrate className="w-3.5 h-3.5" />
                  <span>{t("testRumble")}</span>
                </button>
              )}
            </div>
          </div>

          {/* Analog Sticks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Stick */}
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80 flex flex-col items-center">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">{t("leftStick")}</span>
              <div className="relative w-36 h-36 rounded-full border-2 border-slate-700 bg-slate-950 flex items-center justify-center">
                {/* Crosshairs */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-slate-800" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-slate-800" />
                {/* Stick Nub */}
                <div
                  className="w-10 h-10 rounded-full bg-sky-500 shadow-lg shadow-sky-500/30 transition-transform duration-75"
                  style={{
                    transform: `translate(${leftStickX * 45}px, ${leftStickY * 45}px)`
                  }}
                />
              </div>
              <div className="mt-3 font-mono text-xs text-slate-400">
                X: <span className="text-white font-bold">{leftStickX.toFixed(3)}</span> · Y: <span className="text-white font-bold">{leftStickY.toFixed(3)}</span>
              </div>
            </div>

            {/* Right Stick */}
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80 flex flex-col items-center">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">{t("rightStick")}</span>
              <div className="relative w-36 h-36 rounded-full border-2 border-slate-700 bg-slate-950 flex items-center justify-center">
                {/* Crosshairs */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-slate-800" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-slate-800" />
                {/* Stick Nub */}
                <div
                  className="w-10 h-10 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/30 transition-transform duration-75"
                  style={{
                    transform: `translate(${rightStickX * 45}px, ${rightStickY * 45}px)`
                  }}
                />
              </div>
              <div className="mt-3 font-mono text-xs text-slate-400">
                X: <span className="text-white font-bold">{rightStickX.toFixed(3)}</span> · Y: <span className="text-white font-bold">{rightStickY.toFixed(3)}</span>
              </div>
            </div>
          </div>

          {/* Analog Triggers Pressure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="font-mono text-slate-400">LT / L2 ({t("trigger")})</span>
                <span className="font-mono font-bold text-sky-400">{(ltValue * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-sky-500 transition-all duration-75"
                  style={{ width: `${Math.max(0, Math.min(100, ltValue * 100))}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="font-mono text-slate-400">RT / R2 ({t("trigger")})</span>
                <span className="font-mono font-bold text-sky-400">{(rtValue * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-sky-500 transition-all duration-75"
                  style={{ width: `${Math.max(0, Math.min(100, rtValue * 100))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Buttons Matrix */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">{t("buttonsMatrix")}</div>
            <div className="flex flex-wrap gap-2">
              {buttonStates.slice(0, 16).map((val, idx) => {
                const labels = ["A/✕", "B/○", "X/□", "Y/△", "LB", "RB", "LT", "RT", "Back", "Start", "L3", "R3", "Up", "Down", "Left", "Right"];
                const label = labels[idx] || `B${idx}`;
                const isPressed = val > 0.1;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all",
                      isPressed
                        ? "bg-emerald-500 text-slate-950 scale-105 shadow-md shadow-emerald-500/30"
                        : "bg-slate-800 text-slate-400 border border-slate-700/50"
                    )}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
