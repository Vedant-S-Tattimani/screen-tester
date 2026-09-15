"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Play, 
  Pause, 
  Eye, 
  Camera, 
  ShieldCheck, 
  AlertCircle, 
  Maximize2, 
  Minimize2, 
  Sliders,
  RotateCw
} from "lucide-react";
import { useTranslations } from "next-intl";

type PatternType = "bars" | "radial" | "checker" | "cameraGuide";

export function PwmFlickerPattern({ testId }: { testId?: string }) {
  const t = useTranslations("Tests.pwmFlickerTest");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [patternType, setPatternType] = useState<PatternType>("bars");
  const [speed, setSpeed] = useState<number>(1200); // pixels/sec
  const [barWidth, setBarWidth] = useState<number>(12); // px
  const [contrastLevel, setContrastLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const offsetRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());

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

  // Animation Loop for Stroboscopic Pattern
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || patternType === "cameraGuide") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const render = (time: number) => {
      if (!running) return;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (isPlaying) {
        offsetRef.current = (offsetRef.current + speed * delta) % (barWidth * 2);
      }

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const highVal = Math.round(255 * (contrastLevel / 100));
      const lowVal = Math.round(255 * ((100 - contrastLevel) / 200));

      if (patternType === "bars") {
        // High-contrast alternating vertical bars
        const step = barWidth * 2;
        const startX = -step + (offsetRef.current % step);
        for (let x = startX; x < w + step; x += step) {
          ctx.fillStyle = `rgb(${highVal},${highVal},${highVal})`;
          ctx.fillRect(x, 0, barWidth, h);
          ctx.fillStyle = `rgb(${lowVal},${lowVal},${lowVal})`;
          ctx.fillRect(x + barWidth, 0, barWidth, h);
        }
      } else if (patternType === "radial") {
        // Stroboscopic rotating star/spokes
        const centerX = w / 2;
        const centerY = h / 2;
        const radius = Math.min(centerX, centerY) * 0.9;
        const spokes = 36;
        const angleStep = (Math.PI * 2) / spokes;
        const rotationAngle = (offsetRef.current / 100) % (Math.PI * 2);

        ctx.fillStyle = `rgb(${lowVal},${lowVal},${lowVal})`;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = `rgb(${highVal},${highVal},${highVal})`;
        for (let i = 0; i < spokes; i += 2) {
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(
            centerX,
            centerY,
            radius,
            rotationAngle + i * angleStep,
            rotationAngle + (i + 1) * angleStep
          );
          ctx.closePath();
          ctx.fill();
        }
      } else if (patternType === "checker") {
        // High-frequency moving checkerboard
        const size = barWidth;
        const cols = Math.ceil(w / size) + 2;
        const rows = Math.ceil(h / size) + 2;
        const shiftX = offsetRef.current % (size * 2);

        for (let r = 0; r < rows; r++) {
          for (let c = -2; c < cols; c++) {
            const isLight = (r + c) % 2 === 0;
            ctx.fillStyle = isLight ? `rgb(${highVal},${highVal},${highVal})` : `rgb(${lowVal},${lowVal},${lowVal})`;
            ctx.fillRect(c * size + shiftX, r * size, size, size);
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, patternType, speed, barWidth, contrastLevel]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden transition-all ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none border-none" : ""
      }`}
    >
      {/* Top Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50/80 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg border border-gray-200 bg-white p-0.5 shadow-2xs">
            <button
              onClick={() => setPatternType("bars")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                patternType === "bars" ? "bg-gray-950 text-white shadow-2xs" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              High-Speed Bars
            </button>
            <button
              onClick={() => setPatternType("radial")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                patternType === "radial" ? "bg-gray-950 text-white shadow-2xs" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              Strobe Wheel
            </button>
            <button
              onClick={() => setPatternType("checker")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                patternType === "checker" ? "bg-gray-950 text-white shadow-2xs" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              Grid Walk
            </button>
            <button
              onClick={() => setPatternType("cameraGuide")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                patternType === "cameraGuide" ? "bg-gray-950 text-white shadow-2xs" : "text-gray-600 hover:text-gray-950"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Camera Shutter Test</span>
            </button>
          </div>

          {patternType !== "cameraGuide" && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-800 hover:bg-gray-50 transition-colors shadow-2xs"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
              <span>{isPlaying ? "Pause Motion" : "Resume"}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Pattern Area */}
      <div className="p-4 sm:p-6 space-y-5">
        {patternType !== "cameraGuide" ? (
          <div className="space-y-4">
            {/* Visual Instruction Banner */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-blue-200 bg-blue-50/70 text-xs text-blue-900 leading-relaxed">
              <Eye className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>How to observe PWM flicker:</strong> Wave your hand or pen quickly in front of the screen while staring at the moving pattern, or dart your eyes smoothly left-and-right across the screen. 
                On a <strong>true flicker-free (DC dimming)</strong> display, the motion blurs smoothly into a soft solid tone. 
                On a <strong>PWM-dimmed</strong> display, you will observe stroboscopic discrete &quot;phantom beads&quot; or multiple ghosted repetitions trailing your movement.
              </div>
            </div>

            {/* Pattern Canvas */}
            <div className="relative rounded-xl border border-gray-300 overflow-hidden shadow-inner bg-black">
              <canvas 
                ref={canvasRef} 
                width={1200} 
                height={360} 
                className="w-full h-[300px] sm:h-[400px] block"
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none">
                <span className="rounded-lg bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-white text-xs font-mono">
                  Speed: {speed} px/s · Width: {barWidth}px · Contrast: {contrastLevel}%
                </span>
              </div>
            </div>

            {/* Speed & Thickness Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-gray-700">
                  <span>Scroll Velocity:</span>
                  <span className="font-bold">{speed} px/s</span>
                </div>
                <input 
                  type="range" 
                  min={300} 
                  max={3000} 
                  step={50} 
                  value={speed} 
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-gray-700">
                  <span>Bar Width:</span>
                  <span className="font-bold">{barWidth} px</span>
                </div>
                <input 
                  type="range" 
                  min={4} 
                  max={32} 
                  step={2} 
                  value={barWidth} 
                  onChange={(e) => setBarWidth(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-gray-700">
                  <span>Pattern Contrast:</span>
                  <span className="font-bold">{contrastLevel}%</span>
                </div>
                <input 
                  type="range" 
                  min={20} 
                  max={100} 
                  step={5} 
                  value={contrastLevel} 
                  onChange={(e) => setContrastLevel(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Camera Shutter Test Guide */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-xl border border-gray-200 bg-white space-y-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-blue-600" />
                  <h4 className="text-sm font-bold text-gray-950">
                    {t.has("shutterMethodTitle") ? t("shutterMethodTitle") : "Smartphone Camera Shutter Method"}
                  </h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {t.has("shutterMethodDesc")
                    ? t("shutterMethodDesc")
                    : "PWM dimming turns the backlight completely ON and OFF hundreds of times per second. Because human persistence of vision averages this out, your eyes see a dimmer image, but your visual cortex suffers micro-strain. Your phone camera shutter can capture the truth in milliseconds:"}
                </p>
                <ol className="list-decimal pl-5 text-xs text-gray-700 space-y-2">
                  <li>Open your smartphone camera app in <strong>Pro / Manual mode</strong> (or record in <strong>240fps Slow Motion</strong>).</li>
                  <li>Set your monitor OSD Brightness down to <strong>20% or 30%</strong> (where PWM is most active).</li>
                  <li>Point your camera at a solid white or light-grey window on this monitor.</li>
                  <li>Increase your camera shutter speed to <strong>1/1000s, 1/2000s, or 1/4000s</strong>.</li>
                  <li><strong>Observe the screen on your phone:</strong> If you see scrolling thick black horizontal or rolling scanlines, your display uses low-frequency PWM dimming!</li>
                </ol>
              </div>

              <div className="p-5 rounded-xl border border-gray-200 bg-white space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-sm font-bold text-gray-950">
                    {t.has("freqGuideTitle") ? t("freqGuideTitle") : "PWM Frequency Ergonomic Guide"}
                  </h4>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-lg border border-red-200 bg-red-50 text-red-900">
                    <span className="font-bold">120 Hz – 240 Hz PWM (High Risk):</span> Noticeable stroboscopic flicker, severe eye strain, headaches, and dizziness for sensitive individuals.
                  </div>
                  <div className="p-2.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900">
                    <span className="font-bold">480 Hz – 960 Hz PWM (Moderate):</span> Invisible to naked eye, but can cause dry eyes and fatigue after prolonged 4+ hour work sessions.
                  </div>
                  <div className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-900">
                    <span className="font-bold">20,000+ Hz or Pure DC Dimming (Flicker-Free):</span> Certified eye comfort (TÜV Rheinland Flicker Free). Backlight voltage is reduced continuously without strobing.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
