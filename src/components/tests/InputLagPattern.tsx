"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Zap, RotateCcw, Play, BarChart3, Timer, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputLagPatternProps {
  testId?: string;
}

type Phase = "waiting" | "ready" | "stimulus" | "result" | "too-early";

interface Trial {
  reactionMs: number;
  timestamp: number;
}

export function InputLagPattern({ testId = "input-lag-test" }: InputLagPatternProps) {
  const t = useTranslations("Tests.InputLagPattern");
  const [phase, setPhase] = useState<Phase>("waiting");
  const [trials, setTrials] = useState<Trial[]>([]);
  const [currentReaction, setCurrentReaction] = useState(0);
  const [trialCount, setTrialCount] = useState(0);
  const stimulusTimeRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const totalTrials = 10;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startTrial = useCallback(() => {
    setPhase("ready");
    // Random delay between 1.5s and 5s
    const delay = 1500 + Math.random() * 3500;
    timeoutRef.current = setTimeout(() => {
      stimulusTimeRef.current = performance.now();
      setPhase("stimulus");
    }, delay);
  }, []);

  const handleClick = useCallback(() => {
    if (phase === "waiting") {
      startTrial();
      return;
    }

    if (phase === "ready") {
      // Clicked too early
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase("too-early");
      setTimeout(() => startTrial(), 1500);
      return;
    }

    if (phase === "stimulus") {
      const reactionMs = performance.now() - stimulusTimeRef.current;
      setCurrentReaction(Math.round(reactionMs));
      const newTrial: Trial = { reactionMs: Math.round(reactionMs), timestamp: Date.now() };
      setTrials(prev => [...prev, newTrial]);
      setTrialCount(c => c + 1);
      setPhase("result");

      // Auto-advance to next trial
      setTimeout(() => {
        if (trialCount + 1 < totalTrials) {
          startTrial();
        } else {
          setPhase("waiting");
        }
      }, 1500);
      return;
    }
  }, [phase, startTrial, trialCount]);

  const resetTest = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPhase("waiting");
    setTrials([]);
    setTrialCount(0);
    setCurrentReaction(0);
  }, []);

  const stats = {
    avg: trials.length > 0 ? Math.round(trials.reduce((s, t) => s + t.reactionMs, 0) / trials.length) : 0,
    best: trials.length > 0 ? Math.min(...trials.map(t => t.reactionMs)) : 0,
    worst: trials.length > 0 ? Math.max(...trials.map(t => t.reactionMs)) : 0,
    stdDev: trials.length > 1 ? Math.round(Math.sqrt(trials.reduce((s, t) => s + Math.pow(t.reactionMs - (trials.reduce((s2, t2) => s2 + t2.reactionMs, 0) / trials.length), 2), 0) / trials.length)) : 0,
  };

  const getRatingColor = (ms: number) => {
    if (ms <= 150) return "text-green-500";
    if (ms <= 250) return "text-blue-500";
    if (ms <= 350) return "text-yellow-500";
    return "text-red-500";
  };

  const getRatingLabel = (ms: number) => {
    if (ms <= 150) return t("excellent");
    if (ms <= 250) return t("good");
    if (ms <= 350) return t("average");
    return t("slow");
  };

  const getPhaseColor = () => {
    switch (phase) {
      case "waiting": return "bg-gray-100";
      case "ready": return "bg-red-500";
      case "stimulus": return "bg-green-500";
      case "result": return "bg-blue-50";
      case "too-early": return "bg-yellow-400";
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Click Zone */}
      <div
        onClick={handleClick}
        className={cn(
          "rounded-2xl border-2 p-8 sm:p-12 flex flex-col items-center justify-center min-h-[280px] cursor-pointer transition-all duration-150 select-none",
          getPhaseColor(),
          phase === "ready" && "border-red-600",
          phase === "stimulus" && "border-green-600",
          phase === "too-early" && "border-yellow-600",
          phase === "waiting" && "border-gray-200 hover:border-gray-300",
          phase === "result" && "border-blue-200"
        )}
      >
        {phase === "waiting" && (
          <div className="flex flex-col items-center gap-3">
            <Target className="w-12 h-12 text-gray-300" />
            <h3 className="text-lg font-bold text-gray-700">{t("clickToStart")}</h3>
            <p className="text-sm text-gray-500">{t("clickToStartHint")}</p>
          </div>
        )}

        {phase === "ready" && (
          <div className="flex flex-col items-center gap-3">
            <Timer className="w-12 h-12 text-white/80" />
            <h3 className="text-xl font-bold text-white">{t("waitForGreen")}</h3>
          </div>
        )}

        {phase === "stimulus" && (
          <div className="flex flex-col items-center gap-3">
            <Zap className="w-16 h-16 text-white animate-pulse" />
            <h3 className="text-2xl font-extrabold text-white">{t("clickNow")}</h3>
          </div>
        )}

        {phase === "too-early" && (
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-xl font-bold text-gray-800">{t("tooEarly")}</h3>
            <p className="text-sm text-gray-700">{t("tooEarlyHint")}</p>
          </div>
        )}

        {phase === "result" && (
          <div className="flex flex-col items-center gap-2">
            <span className={cn("text-5xl sm:text-6xl font-extrabold", getRatingColor(currentReaction))}>
              {currentReaction} ms
            </span>
            <span className={cn("text-sm font-semibold", getRatingColor(currentReaction))}>
              {getRatingLabel(currentReaction)}
            </span>
            <span className="text-xs text-gray-400 mt-1">
              {t("trial")} {trialCount}/{totalTrials}
            </span>
          </div>
        )}
      </div>

      {/* Stats */}
      {trials.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{t("avgTime")}</div>
            <div className={cn("text-2xl font-bold", getRatingColor(stats.avg))}>{stats.avg} ms</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{t("bestTime")}</div>
            <div className="text-2xl font-bold text-green-500">{stats.best} ms</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{t("worstTime")}</div>
            <div className="text-2xl font-bold text-red-500">{stats.worst} ms</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{t("stdDev")}</div>
            <div className="text-2xl font-bold text-gray-600">±{stats.stdDev} ms</div>
          </div>
        </div>
      )}

      {/* Histogram */}
      {trials.length > 1 && (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
            <BarChart3 className="w-3.5 h-3.5" /> {t("histogram")}
          </h3>
          <div className="h-24 flex items-end gap-1">
            {trials.map((trial, i) => {
              const maxMs = Math.max(...trials.map(t => t.reactionMs));
              const height = (trial.reactionMs / maxMs) * 100;
              return (
                <div
                  key={i}
                  className={cn("flex-1 rounded-t transition-all", getRatingColor(trial.reactionMs).replace("text-", "bg-"))}
                  style={{ height: `${height}%` }}
                  title={`${trial.reactionMs}ms`}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-gray-400">1</span>
            <span className="text-[10px] text-gray-400">{trials.length}</span>
          </div>
        </div>
      )}

      {/* Reset */}
      {trials.length > 0 && phase === "waiting" && (
        <div className="flex justify-center">
          <button
            onClick={resetTest}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-950 text-white text-sm font-semibold hover:bg-gray-800 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            {t("reset")}
          </button>
        </div>
      )}

      <p className="text-[11px] text-gray-400 text-center">{t("browserNote")}</p>
    </div>
  );
}
