"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Sliders, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sun, 
  Moon, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Palette, 
  Type, 
  Activity,
  Zap
} from "lucide-react";
import { useTranslations } from "next-intl";

interface CalibrationStep {
  id: number;
  title: string;
  osdSetting: string;
  objective: string;
  instructions: string[];
  tips: string;
}

const STEPS: CalibrationStep[] = [
  {
    id: 1,
    title: "Step 1: Brightness (Black Level & Shadow Detail)",
    osdSetting: "OSD Menu → Picture → Brightness / Black Level",
    objective: "Ensure shadow details in games and dark movies are visible without washing out true blacks into dark grey.",
    instructions: [
      "Open your monitor physical OSD menu using the buttons or joystick on the back/bottom bezel.",
      "Look at the 16 black calibration patches below (from RGB 0 to RGB 24).",
      "Adjust OSD Brightness until patch #16 is faintly visible against the black background.",
      "Patches #0 through #4 should blend seamlessly into the pure black surroundings."
    ],
    tips: "In a dim room, typical desktop brightness should be between 20% and 40% (approx 120 nits). 100% brightness causes eye fatigue and washes out contrast."
  },
  {
    id: 2,
    title: "Step 2: Contrast (White Level & Highlight Clipping)",
    osdSetting: "OSD Menu → Picture → Contrast",
    objective: "Prevent bright clouds, snow, and highlights from blowing out into a solid featureless white sheet.",
    instructions: [
      "Look at the light-grey calibration patches below (from RGB 235 to RGB 254 against pure white RGB 255).",
      "If your OSD Contrast is set too high, the upper patches (250–254) will disappear into the white background (clipping).",
      "Lower OSD Contrast until you can distinctly identify patch #253 and #254.",
      "Default factory contrast is often 70% or 75%. The optimal setting is usually between 50% and 70%."
    ],
    tips: "Never set Contrast to 100%. Excessive contrast distorts color accuracy and shifts white balance toward blue or pink."
  },
  {
    id: 3,
    title: "Step 3: Gamma Curve (2.2 Target for Desktop & Gaming)",
    osdSetting: "OSD Menu → Picture / Color → Gamma (Mode 1 / Mode 2 / 2.2)",
    objective: "Ensure midtones are neither overly dark (crushed) nor overly washed out.",
    instructions: [
      "Step back approximately 3 to 5 feet from your screen or squint your eyes slightly.",
      "The central circle inside the patterned square should seamlessly blend into the surrounding black-and-white alternating line background.",
      "If the inner circle looks darker than the background, your gamma is too high (> 2.4).",
      "If the inner circle looks brighter, your gamma is too low (< 2.0). Cycle through your monitor's OSD Gamma options to match 2.2."
    ],
    tips: "Windows and web content are authored for sRGB Gamma 2.2. Some monitors label gamma as Mode 1, Mode 2, or Mode 3—test which one matches closest."
  },
  {
    id: 4,
    title: "Step 4: Color Temperature & White Balance (6500K D65)",
    osdSetting: "OSD Menu → Color → Color Temperature / RGB Gain",
    objective: "Achieve clean neutral white and grey tones without unpleasant yellow, green, or blue tinting.",
    instructions: [
      "Set your monitor OSD Color Temperature to 'Warm' or 'User / Custom' (factory 'Cool' or 'Standard' is usually heavily biased towards cold blue 8000K+).",
      "Look at the neutral 50% grey and 100% white patches below.",
      "If white looks too yellowish or reddish, lower the Red Gain slider in your monitor OSD.",
      "If white looks greenish, lower Green Gain by 2–4 points.",
      "Aim for a neutral white that matches clean white printer paper under indirect daylight."
    ],
    tips: "The international sRGB / DCI-P3 reference white is 6500 Kelvin (D65). It may look slightly warm at first if your eyes were used to an oversaturated cool blue screen."
  },
  {
    id: 5,
    title: "Step 5: Sharpness & Edge Clarity",
    osdSetting: "OSD Menu → Picture → Sharpness",
    objective: "Render crisp text and fine line details without artificial edge ringing or glowing halos.",
    instructions: [
      "Inspect the fine text sample and diagonal crosshatch patterns below.",
      "Increase OSD Sharpness until text letters are clear and defined.",
      "CRITICAL: If you see white glowing borders or dark 'halos' around black letters, your sharpness is set too high!",
      "Most monitors are optically sharpest at their factory neutral setting (e.g. 50% or 0 on Dell/LG)."
    ],
    tips: "On digital DisplayPort and HDMI connections, the monitor receives native digital pixels. Artificial sharpening only degrades rendering precision."
  },
  {
    id: 6,
    title: "Step 6: Overdrive & Response Time Tuning",
    osdSetting: "OSD Menu → Gaming → Response Time / Overdrive / Trace Free",
    objective: "Eliminate motion blur without introducing ugly inverted ghosting coronas.",
    instructions: [
      "Observe the animated moving square below as it sweeps across the screen.",
      "If your OSD setting is 'Off' or 'Standard', you may see a faint trailing smudge behind the square.",
      "Switch to 'Fast' or 'Level 2/3'—the trailing ghost blur should reduce significantly.",
      "AVOID 'Extreme' or 'Fastest'—on 95% of monitors, this causes severe pixel overshoot (a bright white or inverted corona trailing the moving object)."
    ],
    tips: "The best overdrive setting is almost always the middle setting (e.g. 'Fast' on LG, 'Super Fast' on Dell, or '60-80' on ASUS Trace Free)."
  }
];

export function OsdCalibrationGuidePattern({ testId }: { testId?: string }) {
  const t = useTranslations("Tests.osdCalibrationGuide");
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const boxXRef = useRef<number>(0);
  const dirRef = useRef<number>(1);

  const step = STEPS[currentStepIdx];

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Moving block animation for Step 6 (Overdrive)
  useEffect(() => {
    if (step.id !== 6) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;
    let lastTime = performance.now();

    const render = (time: number) => {
      if (!running) return;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      
      const boxW = 100;
      const speed = 900; // px/s

      boxXRef.current += speed * delta * dirRef.current;
      if (boxXRef.current + boxW > w) {
        boxXRef.current = w - boxW;
        dirRef.current = -1;
      } else if (boxXRef.current < 0) {
        boxXRef.current = 0;
        dirRef.current = 1;
      }

      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(boxXRef.current, (h - 100) / 2, boxW, 100);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [step.id]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden transition-all ${
        isFullscreen ? "fixed inset-0 z-50 h-screen w-screen rounded-none border-none" : ""
      }`}
    >
      {/* Top Controls & Step Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50/80 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-mono font-bold text-gray-900 uppercase">
            OSD Monitor Tuning Wizard ({currentStepIdx + 1} of {STEPS.length})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {STEPS.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentStepIdx(idx)}
                className={`w-6 h-6 rounded-full text-xs font-mono font-bold transition-all ${
                  currentStepIdx === idx
                    ? "bg-gray-950 text-white shadow-2xs scale-105"
                    : idx < currentStepIdx
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
                title={s.title}
              >
                {s.id}
              </button>
            ))}
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors ml-2"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Step Header & Objective */}
        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-1.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-gray-950">{step.title}</h3>
            <span className="text-[11px] font-mono font-semibold text-blue-700 px-2.5 py-0.5 rounded-full bg-blue-100/80">
              {step.osdSetting}
            </span>
          </div>
          <p className="text-xs text-gray-700">{step.objective}</p>
        </div>

        {/* Dynamic Visual Target Canvas / Pattern Area */}
        <div className="rounded-xl border border-gray-300 overflow-hidden shadow-inner bg-black min-h-[260px] flex items-center justify-center p-6 select-none">
          {/* STEP 1: Brightness & Black Clipping Target */}
          {step.id === 1 && (
            <div className="w-full max-w-2xl space-y-4 text-center">
              <span className="text-xs font-mono text-gray-400 block">
                Adjust OSD Brightness until Patch #16 is faintly visible on black
              </span>
              <div className="grid grid-cols-8 gap-2">
                {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40].map((val) => (
                  <div
                    key={val}
                    className="h-16 rounded-lg border border-white/10 flex flex-col items-center justify-end p-1 transition-all"
                    style={{ backgroundColor: `rgb(${val}, ${val}, ${val})` }}
                  >
                    <span className="text-[10px] font-mono text-gray-400 font-bold">#{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Contrast & White Saturation Target */}
          {step.id === 2 && (
            <div className="w-full max-w-2xl space-y-4 text-center">
              <span className="text-xs font-mono text-gray-400 block">
                Adjust OSD Contrast until Patch #253 is distinguishable from white
              </span>
              <div className="grid grid-cols-8 gap-2">
                {[230, 235, 240, 243, 246, 248, 250, 251, 252, 253, 254, 255].map((val) => (
                  <div
                    key={val}
                    className="h-16 rounded-lg border border-black/20 flex flex-col items-center justify-end p-1"
                    style={{ backgroundColor: `rgb(${val}, ${val}, ${val})` }}
                  >
                    <span className="text-[10px] font-mono text-gray-600 font-bold">#{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Gamma 2.2 Optical Blend */}
          {step.id === 3 && (
            <div className="text-center space-y-3">
              <span className="text-xs font-mono text-gray-400 block">
                Step back 4 feet or squint: The center circle should blend into the pattern at Gamma 2.2
              </span>
              <div 
                className="w-48 h-48 mx-auto rounded-2xl border-2 border-white/20 relative flex items-center justify-center shadow-lg"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, #000 0px, #000 1px, #fff 1px, #fff 2px)",
                  backgroundSize: "100% 2px"
                }}
              >
                <div 
                  className="w-24 h-24 rounded-full border border-black/20 shadow-md flex items-center justify-center text-xs font-mono font-bold text-gray-700"
                  style={{ backgroundColor: "rgb(186, 186, 186)" }}
                >
                  γ = 2.2
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Color Temperature (6500K) */}
          {step.id === 4 && (
            <div className="w-full max-w-lg space-y-4 text-center">
              <span className="text-xs font-mono text-gray-400 block">
                Inspect 50% Neutral Grey and 100% White for color tints
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 rounded-xl bg-[#808080] flex items-center justify-center text-xs font-mono text-white font-bold border border-white/20">
                  50% Neutral Grey (D65)
                </div>
                <div className="h-32 rounded-xl bg-white flex items-center justify-center text-xs font-mono text-gray-900 font-bold border border-white/20">
                  100% Reference White
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Sharpness */}
          {step.id === 5 && (
            <div className="w-full max-w-lg bg-white p-6 rounded-xl text-gray-900 space-y-3 text-center">
              <span className="text-xs font-mono text-gray-500 block">
                Check for white edge halos around characters or blurry fuzzy stems
              </span>
              <p className="text-lg font-sans font-normal tracking-normal">
                The quick brown fox jumps over the lazy dog. 1234567890.
              </p>
              <p className="text-sm font-serif">
                Sphinx of black quartz, judge my vow. Accurate 1:1 pixel rendering.
              </p>
              <div 
                className="h-12 w-full border border-gray-300 rounded"
                style={{
                  backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                  backgroundSize: "4px 4px"
                }}
              />
            </div>
          )}

          {/* STEP 6: Overdrive Motion Canvas */}
          {step.id === 6 && (
            <div className="w-full text-center space-y-2">
              <span className="text-xs font-mono text-gray-400 block">
                Track the sweeping block: Avoid aggressive settings that create inverse white/dark halos
              </span>
              <canvas ref={canvasRef} className="w-full h-40 rounded-xl block" />
            </div>
          )}
        </div>

        {/* Step Instructions & Pro Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="md:col-span-2 p-4 rounded-xl border border-gray-200 bg-white space-y-2.5">
            <h4 className="font-bold text-gray-950 font-mono uppercase">Instructions:</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
              {step.instructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70 space-y-2 text-amber-900">
            <h4 className="font-bold font-mono uppercase flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              Pro Calibrator Tip
            </h4>
            <p className="leading-relaxed text-[11px]">{step.tips}</p>
          </div>
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <button
            onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}
            disabled={currentStepIdx === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
              currentStepIdx === 0
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-800 hover:bg-gray-50 cursor-pointer"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Step</span>
          </button>

          <span className="text-xs font-mono text-gray-500">
            Step {currentStepIdx + 1} of {STEPS.length}
          </span>

          <button
            onClick={() => setCurrentStepIdx(Math.min(STEPS.length - 1, currentStepIdx + 1))}
            disabled={currentStepIdx === STEPS.length - 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-2xs transition-colors ${
              currentStepIdx === STEPS.length - 1
                ? "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                : "bg-gray-950 hover:bg-gray-800 cursor-pointer"
            }`}
          >
            <span>{currentStepIdx === STEPS.length - 1 ? "Calibration Complete ✓" : "Next Step"}</span>
            {currentStepIdx < STEPS.length - 1 && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
