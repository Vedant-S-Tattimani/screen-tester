"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { Timer, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";

interface ReactionTimePatternProps {
  testId?: string;
}

type GameState = "IDLE" | "WAITING" | "CLICK_NOW" | "RESULT" | "TOO_SOON" | "FINISHED";

export function ReactionTimePattern({ testId = "reaction-time-test" }: ReactionTimePatternProps) {
  const { setObservation } = useTestContext();
  const t = useTranslations("Tests.reaction-time-test.Pattern");

  const [gameState, setGameState] = useState<GameState>("IDLE");
  const [history, setHistory] = useState<number[]>([]);
  const [currentResult, setCurrentResult] = useState<number | null>(null);

  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startNextRound = useCallback(() => {
    setGameState("WAITING");
    setCurrentResult(null);

    // Random delay between 2000ms and 5000ms
    const delay = Math.floor(Math.random() * 3000) + 2000;
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setGameState("CLICK_NOW");
      startTimeRef.current = performance.now();
    }, delay);
  }, []);

  const handleClick = () => {
    if (gameState === "IDLE") {
      setHistory([]);
      startNextRound();
    } else if (gameState === "WAITING") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState("TOO_SOON");
    } else if (gameState === "CLICK_NOW") {
      const reactionTime = Math.round(performance.now() - startTimeRef.current);
      const newHistory = [...history, reactionTime];
      
      setCurrentResult(reactionTime);
      setHistory(newHistory);
      
      if (newHistory.length >= 5) {
        setGameState("FINISHED");
        setObservation("PASS"); // Automatically mark as pass when they finish the 5 tries
      } else {
        setGameState("RESULT");
      }
    } else if (gameState === "RESULT" || gameState === "TOO_SOON") {
      startNextRound();
    } else if (gameState === "FINISHED") {
      setHistory([]);
      startNextRound();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getBackgroundColor = () => {
    switch (gameState) {
      case "WAITING": return "bg-rose-600";
      case "CLICK_NOW": return "bg-emerald-500";
      case "TOO_SOON": return "bg-blue-600";
      case "RESULT": return "bg-blue-600";
      case "FINISHED": return "bg-slate-900";
      default: return "bg-slate-900";
    }
  };

  const average = history.length > 0 
    ? Math.round(history.reduce((a, b) => a + b, 0) / history.length)
    : 0;

  return (
    <div className="flex flex-col h-full w-full select-none bg-slate-950 text-slate-100">
      {/* Top HUD / Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 border-b border-slate-800 text-xs z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono">
            <Timer className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-slate-400 uppercase text-[10px] tracking-wider">{t("status")}:</span>
            <span className="text-slate-200 font-semibold">{history.length} / 5</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          <div className="flex items-center gap-1.5 font-mono text-slate-400">
            <span className="uppercase text-[10px] tracking-wider">{t("average")}:</span>
            <span className="text-blue-400 font-bold">{average > 0 ? `${average} ms` : "---"}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              setGameState("IDLE");
              setHistory([]);
              setCurrentResult(null);
            }}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title={t("resetTitle")}
            aria-label={t("resetTitle")}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Area */}
      <div 
        className={`flex-1 flex flex-col items-center justify-center cursor-pointer transition-colors duration-75 ${getBackgroundColor()}`}
        onPointerDown={handleClick}
      >
        <div className="text-center p-6 pointer-events-none">
          {gameState === "IDLE" && (
            <>
              <Timer className="w-20 h-20 mx-auto mb-6 text-blue-400 opacity-80" />
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">{t("idleTitle")}</h2>
              <p className="text-lg text-slate-300 max-w-md mx-auto">
                {t("idleDesc")}
              </p>
            </>
          )}

          {gameState === "WAITING" && (
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
              {t("waitTitle")}
            </h2>
          )}

          {gameState === "CLICK_NOW" && (
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-lg">
              {t("clickTitle")}
            </h2>
          )}

          {gameState === "TOO_SOON" && (
            <>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">{t("tooSoonTitle")}</h2>
              <p className="text-lg text-slate-200">
                {t("tooSoonDesc")}
              </p>
            </>
          )}

          {gameState === "RESULT" && (
            <>
              <div className="text-6xl sm:text-8xl font-black tracking-tight text-white mb-4">
                {currentResult} <span className="text-3xl sm:text-4xl text-white/70">{t("ms")}</span>
              </div>
              <p className="text-lg text-slate-200 font-medium">
                {t("clickToContinue")}
              </p>
            </>
          )}

          {gameState === "FINISHED" && (
            <>
              <h2 className="text-3xl font-black tracking-tight text-white mb-2">{t("finishedTitle")}</h2>
              <div className="text-5xl sm:text-7xl font-black tracking-tight text-blue-400 mb-8 mt-6">
                {average} <span className="text-2xl text-blue-400/70">{t("ms")}</span>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {history.map((time, idx) => (
                  <div key={idx} className="bg-slate-800/80 px-4 py-2 rounded-xl text-sm font-mono text-slate-300">
                    {idx + 1}: <span className="text-white font-bold">{time} {t("ms")}</span>
                  </div>
                ))}
              </div>
              <p className="text-lg text-slate-300">
                {t("clickToTryAgain")}
              </p>
            </>
          )}
        </div>
      </div>

      <TestControlBar testId={testId} title={t("barTitle")} />
    </div>
  );
}
