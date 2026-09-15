"use client";

import { useState, useEffect, useRef } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  ShieldCheck, 
  AlertTriangle, 
  Eye, 
  Maximize2, 
  Minimize2, 
  Download,
  Check,
  Grid,
  Sparkles
} from "lucide-react";
import { Link } from "@/i18n/routing";

interface StageResult {
  passed: boolean;
  notes?: string;
}

export function NewMonitorWizardPattern({ testId }: { testId: string }) {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 to 4, 5 is final summary
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [subColorIdx, setSubColorIdx] = useState<number>(0);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [refreshFrame, setRefreshFrame] = useState<number>(0);

  // Stage results
  const [results, setResults] = useState<Record<number, StageResult>>({
    0: { passed: true },
    1: { passed: true },
    2: { passed: true },
    3: { passed: true },
    4: { passed: true },
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);

  const STAGES = [
    {
      title: "Stage 1: Dead & Stuck Pixel Sweep",
      subtitle: "Inspect each primary color background for static black or glowing colored pinpricks.",
      instructions: "Cycle through Red, Green, Blue, White, and Black backgrounds. Look closely at the entire panel surface."
    },
    {
      title: "Stage 2: Backlight Bleed & IPS Glow",
      subtitle: "Evaluate dark-room edge leakage versus off-angle IPS glow.",
      instructions: "Inspect the corners and edges on pure black. Backlight bleed stays bright when shifting viewing angles; IPS glow shifts."
    },
    {
      title: "Stage 3: 50% Gray Uniformity & DSE",
      subtitle: "Check for Dirty Screen Effect, vignetting, or color temperature banding.",
      instructions: "Look for cloudy patches, darker borders (vignetting), or vertical tint bands across the neutral gray field."
    },
    {
      title: "Stage 4: Text Clarity & Subpixel Fringing",
      subtitle: "Verify subpixel font rendering and ClearType edge sharpness.",
      instructions: "Examine the sample text lines below. Ensure there is no chromatic green/magenta fringing along letter stems."
    },
    {
      title: "Stage 5: Frame Pacing & Refresh Motion",
      subtitle: "Confirm smooth motion delivery and check for micro-stutter.",
      instructions: "Observe the moving white tracking bar. It should glide seamlessly across the screen without jitter or judder."
    }
  ];

  const SWEEP_COLORS = ["#ef4444", "#22c55e", "#3b82f6", "#ffffff", "#000000"];
  const SWEEP_NAMES = ["Pure Red", "Pure Green", "Pure Blue", "Pure White", "Pure Black"];

  // Animation for Stage 5
  useEffect(() => {
    if (currentStep === 4) {
      const loop = () => {
        setRefreshFrame((prev) => (prev + 4) % 1000);
        animRef.current = requestAnimationFrame(loop);
      };
      animRef.current = requestAnimationFrame(loop);
      return () => {
        if (animRef.current) cancelAnimationFrame(animRef.current);
      };
    }
  }, [currentStep]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handleSetPass = (step: number, passed: boolean) => {
    setResults((prev) => ({
      ...prev,
      [step]: { ...prev[step], passed }
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSubColorIdx(0);
    setResults({
      0: { passed: true },
      1: { passed: true },
      2: { passed: true },
      3: { passed: true },
      4: { passed: true },
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (currentStep === 0 && subColorIdx < SWEEP_COLORS.length - 1) {
          setSubColorIdx((prev) => prev + 1);
        } else {
          handleNext();
        }
      } else if (e.key === "ArrowLeft") {
        if (currentStep === 0 && subColorIdx > 0) {
          setSubColorIdx((prev) => prev - 1);
        } else {
          handlePrev();
        }
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, subColorIdx]);

  // Overall Score Calculation
  const passedCount = Object.values(results).filter((r) => r.passed).length;
  const grade = passedCount === 5 ? "A+ (Flawless)" : passedCount === 4 ? "A (Acceptable)" : passedCount === 3 ? "B (Minor Defects)" : "C (Return Recommended)";
  const gradeColor = passedCount >= 4 ? "text-emerald-400" : passedCount === 3 ? "text-amber-400" : "text-rose-400";

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[650px] sm:h-[720px] rounded-2xl overflow-hidden flex flex-col select-none border border-neutral-800 shadow-2xl bg-neutral-950 text-white"
    >
      {/* Top Stepper Bar */}
      <div className="z-20 bg-neutral-900/90 backdrop-blur-xl border-b border-neutral-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
          {STAGES.map((stg, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
                currentStep === i
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : results[i]?.passed
                  ? "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                  : "bg-rose-950/60 text-rose-300 border border-rose-800/60"
              }`}
            >
              <span>{i + 1}</span>
              <span className="hidden sm:inline">{stg.title.split(":")[0]}</span>
              {results[i]?.passed ? (
                <Check className="w-3 h-3 text-emerald-400 ml-0.5" />
              ) : (
                <XCircle className="w-3 h-3 text-rose-400 ml-0.5" />
              )}
            </button>
          ))}
          <button
            onClick={() => setCurrentStep(5)}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              currentStep === 5 ? "bg-emerald-600 text-white" : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
            }`}
          >
            Summary
          </button>
        </div>

        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Stage Viewport */}
      <div className="relative flex-1 overflow-hidden flex flex-col items-center justify-center">
        
        {/* STAGE 0: DEAD PIXEL SWEEP */}
        {currentStep === 0 && (
          <div 
            className="w-full h-full flex flex-col items-center justify-between p-6 transition-colors duration-300"
            style={{ backgroundColor: SWEEP_COLORS[subColorIdx] }}
          >
            <div className="bg-black/75 backdrop-blur-md px-4 py-2 rounded-xl border border-neutral-700 text-center max-w-lg">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Color {subColorIdx + 1} of {SWEEP_COLORS.length}:
              </span>
              <h3 className="font-bold text-base text-white">{SWEEP_NAMES[subColorIdx]}</h3>
            </div>

            <div className="flex gap-2 bg-black/75 backdrop-blur-md p-2 rounded-xl border border-neutral-700">
              {SWEEP_COLORS.map((col, idx) => (
                <button
                  key={idx}
                  onClick={() => setSubColorIdx(idx)}
                  className={`w-8 h-8 rounded-lg border-2 transition-all ${
                    subColorIdx === idx ? "border-white scale-110 shadow-lg" : "border-neutral-600 opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: col }}
                  title={SWEEP_NAMES[idx]}
                />
              ))}
            </div>
          </div>
        )}

        {/* STAGE 1: BACKLIGHT BLEED & GLOW */}
        {currentStep === 1 && (
          <div className="w-full h-full bg-black flex flex-col items-center justify-center p-6 relative">
            {/* Corner Indicators */}
            <div className="absolute top-4 left-4 text-[11px] font-mono text-neutral-600 border-t border-l border-neutral-700 w-16 h-16 p-1">
              Top-Left Corner
            </div>
            <div className="absolute top-4 right-4 text-[11px] font-mono text-neutral-600 border-t border-r border-neutral-700 w-16 h-16 p-1 text-right">
              Top-Right Corner
            </div>
            <div className="absolute bottom-4 left-4 text-[11px] font-mono text-neutral-600 border-b border-l border-neutral-700 w-16 h-16 p-1 flex items-end">
              Bottom-Left
            </div>
            <div className="absolute bottom-4 right-4 text-[11px] font-mono text-neutral-600 border-b border-r border-neutral-700 w-16 h-16 p-1 flex items-end justify-end">
              Bottom-Right
            </div>

            <div className="bg-neutral-900/90 backdrop-blur-md p-6 rounded-2xl border border-neutral-800 text-center max-w-md shadow-2xl">
              <Eye className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="text-lg font-bold mb-1">Pure Black Screen</h3>
              <p className="text-xs text-neutral-400 mb-3">
                Dim your room lights. If edges glow yellow/white and stay fixed as you move your head, that is <strong>Backlight Bleed</strong>. If the glow shifts when you lean, it is normal <strong>IPS Glow</strong>.
              </p>
            </div>
          </div>
        )}

        {/* STAGE 2: 50% GRAY UNIFORMITY */}
        {currentStep === 2 && (
          <div className="w-full h-full bg-[#808080] flex flex-col items-center justify-center p-6 relative">
            {showGrid && (
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none border border-black/30">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="border border-black/20 flex items-center justify-center text-black/40 font-mono text-xs font-bold">
                    Zone {i + 1}
                  </div>
                ))}
              </div>
            )}
            <div className="bg-neutral-900/90 backdrop-blur-md p-5 rounded-2xl border border-neutral-800 text-center max-w-md shadow-2xl z-10 text-white">
              <h3 className="text-base font-bold mb-1">50% Neutral Gray Field</h3>
              <p className="text-xs text-neutral-300 mb-3">
                Watch for Dirty Screen Effect (DSE), cloudy vertical streaks, or corner darkening (vignetting).
              </p>
              <button
                onClick={() => setShowGrid((prev) => !prev)}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono font-medium border border-neutral-700"
              >
                {showGrid ? "Hide 9-Zone Grid" : "Show 9-Zone Grid"}
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3: TEXT CLARITY & SUBPIXELS */}
        {currentStep === 3 && (
          <div className="w-full h-full bg-white text-neutral-950 p-8 flex flex-col justify-center overflow-y-auto">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="border-b border-neutral-300 pb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">8pt Subpixel Test:</span>
                <p className="text-[11px] leading-relaxed font-sans">
                  The quick brown fox jumps over the lazy dog. 1234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </p>
              </div>
              <div className="border-b border-neutral-300 pb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">11pt ClearType Test:</span>
                <p className="text-[13px] leading-relaxed font-sans font-medium">
                  Pack my box with five dozen liquor jugs. Notice whether letters have green/red chromatic fringes on QD-OLED or BGR panels.
                </p>
              </div>
              <div className="bg-neutral-950 text-white p-4 rounded-xl">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Inverted High-Contrast (14pt):</span>
                <p className="text-[14px] leading-relaxed font-sans">
                  Sphinx of black quartz, judge my vow. High contrast dark-mode letters expose OLED subpixel fringing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 4: REFRESH MOTION & PACING */}
        {currentStep === 4 && (
          <div className="w-full h-full bg-neutral-950 flex flex-col items-center justify-between p-6">
            <div className="text-center">
              <h3 className="font-bold text-base text-white">Motion Frame Pacing</h3>
              <p className="text-xs text-neutral-400">The tracking block should glide smoothly without micro-stutter.</p>
            </div>

            <div className="w-full max-w-2xl h-24 bg-neutral-900 border border-neutral-800 rounded-xl relative overflow-hidden flex items-center">
              <div 
                className="w-12 h-16 bg-white rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.8)] absolute"
                style={{
                  left: `${(refreshFrame / 10) % 92}%`
                }}
              />
            </div>

            <div className="font-mono text-xs text-neutral-400">
              Hardware Frame Animation Active • 60+ Hz Target
            </div>
          </div>
        )}

        {/* STAGE 5: FINAL SUMMARY REPORT */}
        {currentStep === 5 && (
          <div className="w-full h-full bg-neutral-950 p-6 sm:p-10 flex flex-col items-center justify-center overflow-y-auto">
            <div className="max-w-xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-1">Inspection Certificate</h2>
              <p className="text-xs text-neutral-400 mb-4">5-Minute New Monitor Acceptance Evaluation</p>

              <div className="bg-neutral-950 rounded-xl p-4 border border-neutral-800 mb-6">
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-mono mb-1">Overall Panel Grade</div>
                <div className={`text-2xl font-black font-mono ${gradeColor}`}>{grade}</div>
                <div className="text-xs text-neutral-400 mt-1">{passedCount} of 5 Acceptance Checkpoints Passed</div>
              </div>

              {/* Checklist breakdown */}
              <div className="space-y-2 text-left text-xs font-mono mb-6">
                {STAGES.map((stg, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
                    <span className="text-neutral-300">{stg.title.split(":")[0]}: {stg.title.split(":")[1]}</span>
                    {results[idx]?.passed ? (
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Pass
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-400 font-bold">
                        <XCircle className="w-3.5 h-3.5" /> Defect Noted
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tools/display-certificate"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all text-center"
                >
                  Generate Official Warranty Certificate
                </Link>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium border border-neutral-700 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Wizard</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      {currentStep < 5 && (
        <div className="z-20 bg-neutral-900/90 backdrop-blur-xl border-t border-neutral-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 font-mono">Status for this step:</span>
            <button
              onClick={() => handleSetPass(currentStep, true)}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg font-mono font-medium transition-all ${
                results[currentStep]?.passed
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                  : "bg-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>Pass</span>
            </button>
            <button
              onClick={() => handleSetPass(currentStep, false)}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg font-mono font-medium transition-all ${
                !results[currentStep]?.passed
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                  : "bg-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Issue Found</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 font-mono"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono font-semibold shadow-md shadow-blue-600/30"
            >
              <span>{currentStep === 4 ? "Finish & Grade" : "Next Stage"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
