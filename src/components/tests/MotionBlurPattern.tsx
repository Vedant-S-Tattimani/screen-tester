"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { getDevicePixelRatio } from "@/lib/browserCapabilities";
import { Info, Eye, ArrowLeftRight } from "lucide-react";
import { useTranslations } from "next-intl";

export type MotionBlurMode = "gratings" | "text" | "multispeed";

interface MotionBlurPatternProps {
  testId?: string;
}

const SPEED_PRESETS = [120, 240, 480, 960, 1440, 1920];

export function MotionBlurPattern({ testId = "motion-blur-test" }: MotionBlurPatternProps) {
    const t = useTranslations("Tests.MotionBlurPattern");
  const { isRunning, isPaused, registerNavigation } = useTestContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeMode, setActiveMode] = useState<MotionBlurMode>("gratings");
  const [speed, setSpeed] = useState<number>(960);
  const [showPursuitGuide, setShowPursuitGuide] = useState<boolean>(true);
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = right, -1 = left
  const [theme, setTheme] = useState<"dark" | "gray" | "light">("dark");
  const [showEduInfo, setShowEduInfo] = useState<boolean>(false);

  const speedRef = useRef(speed);
  const modeRef = useRef(activeMode);
  const showGuideRef = useRef(showPursuitGuide);
  const directionRef = useRef(direction);
  const themeRef = useRef(theme);

  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { modeRef.current = activeMode; }, [activeMode]);
  useEffect(() => { showGuideRef.current = showPursuitGuide; }, [showPursuitGuide]);
  useEffect(() => { directionRef.current = direction; }, [direction]);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  const cycleSpeed = useCallback(() => {
    setSpeed((curr) => {
      const idx = SPEED_PRESETS.indexOf(curr);
      return SPEED_PRESETS[(idx + 1) % SPEED_PRESETS.length];
    });
  }, []);

  const cycleMode = useCallback(() => {
    setActiveMode((curr) => {
      if (curr === "gratings") return "text";
      if (curr === "text") return "multispeed";
      return "gratings";
    });
  }, []);

  useEffect(() => {
    registerNavigation({
      next: cycleSpeed,
      prev: cycleMode,
      reset: () => {
        setSpeed(960);
        setActiveMode("gratings");
        setShowPursuitGuide(true);
        setDirection(1);
        setTheme("dark");
      },
    });
  }, [registerNavigation, cycleSpeed, cycleMode]);

  useEffect(() => {
    if (!isRunning || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let cachedW = 0;
    let cachedH = 0;

    const resize = () => {
      const dpr = getDevicePixelRatio();
      const parent = canvas.parentElement || canvas;
      const rect = parent.getBoundingClientRect();
      cachedW = rect.width || (canvas.width / dpr);
      cachedH = rect.height || (canvas.height / dpr);
      canvas.width = Math.max(1, Math.floor(cachedW * dpr));
      canvas.height = Math.max(1, Math.floor(cachedH * dpr));
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform before scaling
      ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas.parentElement || canvas);

    let animationId: number;
    let lastTime = performance.now();
    let posX = 0;

    const draw = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const currentMode = modeRef.current;
      const currentSpeed = speedRef.current;
      const currentGuide = showGuideRef.current;
      const currentDir = directionRef.current;
      const currentTheme = themeRef.current;

      const w = cachedW || (canvas.width / getDevicePixelRatio());
      const h = cachedH || (canvas.height / getDevicePixelRatio());

      if (!isPaused) {
        posX += currentDir * currentSpeed * dt;
        // Wrap around smoothly
        const maxWrap = Math.max(w * 2, 2000);
        if (posX > maxWrap) posX -= maxWrap;
        if (posX < -maxWrap) posX += maxWrap;
      }

      // Background color
      const bgColor = currentTheme === "dark" ? "#0a0a0a" : currentTheme === "gray" ? "#505050" : "#f4f4f5";
      const fgColor = currentTheme === "light" ? "#18181b" : "#ffffff";
      const subColor = currentTheme === "light" ? "#71717a" : "#a1a1aa";
      const borderColor = currentTheme === "light" ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.15)";

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);

      // --- MODE 1: LINE PAIRS / MOTION RESOLUTION (GRATINGS) ---
      if (currentMode === "gratings") {
        const laneCount = 4;
        const headerH = 48;
        const laneH = (h - headerH) / laneCount;
        const gratingPitches = [8, 4, 2, 1]; // pixel stripe widths

        // Header
        ctx.fillStyle = subColor;
        ctx.font = "bold 13px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        ctx.textAlign = "left";
        ctx.fillText("MOTION RESOLUTION TEST (LINE PAIRS) — Track with your eyes to see if fine lines blur into solid gray", 20, 30);

        for (let i = 0; i < laneCount; i++) {
          const top = headerH + i * laneH;
          const pitch = gratingPitches[i];
          const period = pitch * 2;

          // Lane boundary separator
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, top);
          ctx.lineTo(w, top);
          ctx.stroke();

          // Lane Label & Reference (Static badge on left)
          const badgeW = Math.min(180, w * 0.22);
          ctx.fillStyle = currentTheme === "light" ? "#e4e4e7" : "#1f1f23";
          ctx.fillRect(0, top, badgeW, laneH);
          ctx.strokeStyle = borderColor;
          ctx.beginPath();
          ctx.moveTo(badgeW, top);
          ctx.lineTo(badgeW, top + laneH);
          ctx.stroke();

          ctx.fillStyle = fgColor;
          ctx.font = "bold 13px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
          ctx.textAlign = "left";
          ctx.fillText(`${pitch}px Line Pair`, 14, top + laneH * 0.4);

          ctx.fillStyle = subColor;
          ctx.font = "11px system-ui, -apple-system, sans-serif";
          ctx.fillText(pitch === 1 ? "Limit / 1:1 Nyquist" : `${period}px Spatial Period`, 14, top + laneH * 0.65);

          // Moving Grating Region
          const gratingXStart = badgeW;
          const gratingW = w - badgeW;
          const shift = ((posX % period) + period) % period;

          ctx.save();
          ctx.beginPath();
          ctx.rect(gratingXStart, top, gratingW, laneH);
          ctx.clip();

          // Render vertical square-wave grating
          const startX = gratingXStart - period + shift;
          ctx.fillStyle = fgColor;
          for (let x = startX; x < w + period; x += period) {
            ctx.fillRect(Math.round(x), Math.round(top), pitch, laneH);
          }

          // Inverted center comparison block (to easily lock eyes)
          const targetBoxSize = Math.min(laneH * 0.6, 50);
          const boxX = gratingXStart + ((posX * 1.0) % (gratingW + targetBoxSize * 2)) - targetBoxSize;
          const boxY = top + (laneH - targetBoxSize) / 2;

          // Target bounding border & pursuit marker
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 2;
          ctx.strokeRect(Math.round(boxX), Math.round(boxY), targetBoxSize, targetBoxSize);

          ctx.restore();
        }

        // Global Pursuit Eye Tracking Marker (Vertical Line)
        if (currentGuide) {
          const guideX = ((posX % w) + w) % w;
          ctx.strokeStyle = "#ef4444";
          ctx.lineWidth = 2;
          ctx.setLineDash([6, 6]);
          ctx.beginPath();
          ctx.moveTo(guideX, headerH);
          ctx.lineTo(guideX, h);
          ctx.stroke();
          ctx.setLineDash([]);

          // Guide arrow tag at top
          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          ctx.moveTo(guideX - 6, headerH);
          ctx.lineTo(guideX + 6, headerH);
          ctx.lineTo(guideX, headerH + 8);
          ctx.fill();
        }

      // --- MODE 2: DYNAMIC TEXT READABILITY ---
      } else if (currentMode === "text") {
        const headerH = 48;
        const availableH = h - headerH;
        const rowCount = 4;
        const rowH = availableH / rowCount;

        ctx.fillStyle = subColor;
        ctx.font = "bold 13px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        ctx.textAlign = "left";
        ctx.fillText("DYNAMIC TEXT READABILITY TEST — Read text at high speed to gauge persistence motion blur", 20, 30);

        const textSamples = [
          { size: 28, text: "SCREEN TESTER • PERSISTENCE MOTION BLUR • 1234567890" },
          { size: 20, text: "The quick brown fox jumps over the lazy dog • Eye Tracking Clarity" },
          { size: 14, text: "Fast-scrolling text legibility benchmark • Sample-and-Hold MPRT Evaluation" },
          { size: 11, text: "HIGH-DENSITY SUBPIXEL TEXT READABILITY: 120Hz / 144Hz / 240Hz / 360Hz REFRESH RATE INSPECTION" }
        ];

        for (let i = 0; i < rowCount; i++) {
          const top = headerH + i * rowH;
          const sample = textSamples[i];

          // Separator line
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, top);
          ctx.lineTo(w, top);
          ctx.stroke();

          // Alternating subtle background tint
          if (i % 2 === 1) {
            ctx.fillStyle = currentTheme === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.02)";
            ctx.fillRect(0, top, w, rowH);
          }

          // Moving text
          ctx.save();
          ctx.beginPath();
          ctx.rect(0, top, w, rowH);
          ctx.clip();

          ctx.fillStyle = fgColor;
          ctx.font = `bold ${sample.size}px ui-sans-serif, system-ui, -apple-system, sans-serif`;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";

          const textWidth = ctx.measureText(sample.text).width;
          const spacing = textWidth + 80;
          const offset = ((posX % spacing) + spacing) % spacing;

          for (let tx = -spacing + offset; tx < w + spacing; tx += spacing) {
            ctx.fillText(sample.text, tx, top + rowH / 2);
          }

          ctx.restore();

          // Font size tag on left
          ctx.fillStyle = currentTheme === "light" ? "rgba(244, 244, 245, 0.9)" : "rgba(10, 10, 10, 0.85)";
          ctx.fillRect(8, top + 8, 54, 22);
          ctx.strokeStyle = borderColor;
          ctx.strokeRect(8, top + 8, 54, 22);
          ctx.fillStyle = subColor;
          ctx.font = "bold 11px ui-monospace, monospace";
          ctx.textBaseline = "middle";
          ctx.fillText(`${sample.size}px`, 16, top + 19);
        }

        // Pursuit Guide
        if (currentGuide) {
          const guideX = ((posX % w) + w) % w;
          ctx.strokeStyle = "#ef4444";
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(guideX, headerH);
          ctx.lineTo(guideX, h);
          ctx.stroke();
          ctx.setLineDash([]);
        }

      // --- MODE 3: MULTI-SPEED COMPARISON ---
      } else if (currentMode === "multispeed") {
        const headerH = 48;
        const availableH = h - headerH;
        const speeds = [240, 480, 960, 1440];
        const laneCount = speeds.length;
        const laneH = availableH / laneCount;

        ctx.fillStyle = subColor;
        ctx.font = "bold 13px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        ctx.textAlign = "left";
        ctx.fillText("MULTI-SPEED PERSISTENCE BENCHMARK — Compare motion blur at 4 simultaneous velocities", 20, 30);

        for (let i = 0; i < laneCount; i++) {
          const top = headerH + i * laneH;
          const laneSpeed = speeds[i];

          // Lane boundary
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, top);
          ctx.lineTo(w, top);
          ctx.stroke();

          // Left speed badge
          const badgeW = 120;
          ctx.fillStyle = currentTheme === "light" ? "#e4e4e7" : "#18181b";
          ctx.fillRect(0, top, badgeW, laneH);
          ctx.strokeStyle = borderColor;
          ctx.beginPath();
          ctx.moveTo(badgeW, top);
          ctx.lineTo(badgeW, top + laneH);
          ctx.stroke();

          ctx.fillStyle = laneSpeed >= 960 ? "#f59e0b" : fgColor;
          ctx.font = "bold 13px ui-monospace, monospace";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(`${laneSpeed} px/s`, 16, top + laneH * 0.4);

          ctx.fillStyle = subColor;
          ctx.font = "10px system-ui, sans-serif";
          ctx.fillText(laneSpeed === 240 ? "Walking / UI" : laneSpeed === 480 ? "Medium Motion" : laneSpeed === 960 ? "Fast Gaming" : "High Velocity", 16, top + laneH * 0.68);

          // Calculate independent position for this speed
          const laneOffset = ((time * 0.001 * laneSpeed * currentDir) % (w - badgeW + 200));
          const movingAreaW = w - badgeW;
          const blockW = 80;
          const blockH = Math.min(laneH * 0.65, 56);
          const blockX = badgeW + ((laneOffset % (movingAreaW + blockW)) + (movingAreaW + blockW)) % (movingAreaW + blockW) - blockW;
          const blockY = top + (laneH - blockH) / 2;

          ctx.save();
          ctx.beginPath();
          ctx.rect(badgeW, top, movingAreaW, laneH);
          ctx.clip();

          // Moving test object (Box with 2px line grating inside)
          ctx.fillStyle = currentTheme === "light" ? "#27272a" : "#22c55e";
          ctx.fillRect(Math.round(blockX), Math.round(blockY), blockW, blockH);

          // Grating pattern inside the moving box
          ctx.fillStyle = "#ffffff";
          for (let gx = blockX + 6; gx < blockX + blockW - 6; gx += 4) {
            ctx.fillRect(Math.round(gx), Math.round(blockY + 6), 2, blockH - 12);
          }

          // Centered speed text label moving with block
          ctx.fillStyle = "#000000";
          ctx.font = "bold 10px ui-monospace, monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`${laneSpeed}`, blockX + blockW / 2, blockY + blockH / 2);

          ctx.restore();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [isRunning, isPaused]);

  return (
    <>
      <div 
        className="absolute inset-0 cursor-pointer overflow-hidden select-none"
        onClick={cycleSpeed}
        title={t("clickAnywhereToCycleTitle")}
      >
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* Floating Speed & Mode Cue */}
        <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white text-xs font-mono shadow-md z-10">
          <span className="text-cyan-400 font-bold">{speed} {t("pxS")}</span>
          <span className="text-white/40">•</span>
          <span className="text-white/70 text-[11px] capitalize">{activeMode} {t("mode")}</span>
          <span className="text-white/40">•</span>
          <span className="text-white/50 text-[11px]">{t("clickToCycleSpeed")}</span>
        </div>

        {/* Educational Disclaimer Dialog */}
        {showEduInfo && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute top-6 left-1/2 -translate-x-1/2 max-w-xl w-[92%] bg-neutral-950/95 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white shadow-2xl z-40 text-xs cursor-default"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 font-semibold text-cyan-400">
                <Info className="w-4 h-4" />
                <span>{t("motionBlurPersistenceMprt")}</span>
              </div>
              <button 
                onClick={() => setShowEduInfo(false)}
                className="text-white/60 hover:text-white px-2 py-0.5 rounded text-xs font-mono cursor-pointer"
              >
                {t("close")}</button>
            </div>
            <div className="mt-3 space-y-2.5 text-white/80 leading-relaxed">
              <p>
                <strong>{t("persistenceBlurVsGhosting")}</strong> {t("ghostingIsCausedBy")}<em>{t("motionBlurPersistenceBlur")}</em> {t("isCausedBy")}<strong>{t("sampleAndHoldDisplay")}</strong> {t("combinedWithSmoothPursuit")}</p>
              <ul className="list-disc pl-5 space-y-1 text-white/70">
                <li>
                  <strong>{t("why0msDisplaysStill")}</strong> {t("evenOnOledDisplays")}</li>
                <li>
                  <strong>{t("linePairsMotionResolution")}</strong> {t("the1pxAnd2px")}</li>
                <li>
                  <strong>{t("howToReducePersistence")}</strong> {t("increaseYourDisplayApos")}</li>
              </ul>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70">
                <strong>{t("trackingTip")}</strong> {t("keepYourEyesLocked")}</div>
            </div>
          </div>
        )}
      </div>

      <TestControlBar testId={testId} title={t("motionBlurPersistenceMprtTitle")}>
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-black/80 p-1 rounded-xl border border-slate-200 dark:border-white/20 text-xs">
            <button
              onClick={() => setActiveMode("gratings")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeMode === "gratings" 
                  ? "bg-cyan-500 text-slate-950 font-extrabold shadow-md ring-2 ring-cyan-400" 
                  : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/15 font-semibold"
              }`}
            >
              {t("linePairsGrating")}</button>
            <button
              onClick={() => setActiveMode("text")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeMode === "text" 
                  ? "bg-cyan-500 text-slate-950 font-extrabold shadow-md ring-2 ring-cyan-400" 
                  : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/15 font-semibold"
              }`}
            >
              {t("textClarity")}</button>
            <button
              onClick={() => setActiveMode("multispeed")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeMode === "multispeed" 
                  ? "bg-cyan-500 text-slate-950 font-extrabold shadow-md ring-2 ring-cyan-400" 
                  : "bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/25 dark:border-white/15 font-semibold"
              }`}
            >
              {t("multiSpeed")}</button>
          </div>

          {/* Speed Presets (disabled in multispeed mode) */}
          {activeMode !== "multispeed" && (
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-black/60 rounded-xl px-2.5 py-1 border border-slate-200 dark:border-white/20 text-xs">
              <span className="text-[10px] text-cyan-600 dark:text-cyan-300 font-bold uppercase font-mono px-1">{t("speed")}</span>
              {SPEED_PRESETS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                    speed === s 
                      ? "bg-slate-900 dark:bg-white text-white dark:text-gray-950 font-extrabold shadow-xs" 
                      : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/20 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Pursuit Guide Toggle */}
          <button
            onClick={() => setShowPursuitGuide(!showPursuitGuide)}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer ${
              showPursuitGuide 
                ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/40" 
                : "bg-white dark:bg-white/10 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/15 hover:bg-slate-100"
            }`}
            title={t("toggleEyePursuitTrackingTitle")}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t("pursuitGuide")}</span>
          </button>

          {/* Direction Toggle */}
          <button
            onClick={() => setDirection((d) => (d === 1 ? -1 : 1))}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer bg-white dark:bg-white/10 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/15 hover:bg-slate-100"
            title={t("reverseMotionDirectionTitle")}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{direction === 1 ? "L → R" : "R → L"}</span>
          </button>

          {/* Theme Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-black/60 rounded-xl px-2 py-1 border border-slate-200 dark:border-white/20 text-xs">
            {(["dark", "gray", "light"] as const).map((th) => (
              <button
                key={th}
                onClick={() => setTheme(th)}
                className={`px-2 py-0.5 rounded text-xs capitalize font-bold transition-all cursor-pointer ${
                  theme === th 
                    ? "bg-slate-900 dark:bg-white text-white dark:text-gray-950 font-extrabold shadow-xs" 
                    : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15"
                }`}
              >
                {th}
              </button>
            ))}
          </div>

          {/* Guide / Info Button */}
          <button
            onClick={() => setShowEduInfo(!showEduInfo)}
            className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl border transition-colors cursor-pointer ${
              showEduInfo 
                ? "bg-cyan-500/20 text-cyan-500 border-cyan-500/40" 
                : "bg-white dark:bg-white/10 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/15 hover:bg-slate-100"
            }`}
            title={t("readAboutMotionBlurTitle")}
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t("guide")}</span>
          </button>
        </div>
      </TestControlBar>
    </>
  );
}
