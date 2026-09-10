"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTestContext } from "../test-runner/TestContext";
import { TestControlBar } from "../test-runner/TestControlBar";
import { getDevicePixelRatio } from "@/lib/browserCapabilities";
import { Info, Type, Grid, CircleDot, Sun, Moon } from "lucide-react";

export type SharpnessTab = "grids" | "typography" | "moire";

interface SharpnessPatternProps {
  testId?: string;
}

export function SharpnessPattern({ testId = "sharpness-test" }: SharpnessPatternProps) {
  const { registerNavigation } = useTestContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeTab, setActiveTab] = useState<SharpnessTab>("grids");
  const [inverted, setInverted] = useState(false);
  const [moireDensity, setMoireDensity] = useState(3); // 1 to 5
  const [showEduInfo, setShowEduInfo] = useState(false);

  // Keyboard navigation
  const cycleTab = useCallback(() => {
    setActiveTab((curr) => {
      if (curr === "grids") return "typography";
      if (curr === "typography") return "moire";
      return "grids";
    });
  }, []);

  const toggleInverted = useCallback(() => {
    setInverted((v) => !v);
  }, []);

  useEffect(() => {
    registerNavigation({
      next: cycleTab,
      prev: toggleInverted,
      reset: () => {
        setActiveTab("grids");
        setInverted(false);
        setMoireDensity(3);
      },
    });
  }, [registerNavigation, cycleTab, toggleInverted]);

  // Canvas drawing for Grids & Moiré
  useEffect(() => {
    if (activeTab === "typography") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = getDevicePixelRatio();
    const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));

    const w = canvas.width;
    const h = canvas.height;

    const bg = inverted ? "#000000" : "#FFFFFF";
    const fg = inverted ? "#FFFFFF" : "#000000";
    const midGray = "#808080";

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    if (activeTab === "grids") {
      // --- 1PX PRECISION GRIDS & CHECKERBOARD ---
      const centerX = Math.floor(w / 2);
      const centerY = Math.floor(h / 2);

      // Top Header text in canvas
      ctx.fillStyle = fg;
      ctx.font = `${Math.round(12 * dpr)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("1:1 PIXEL-MAPPED 1PX CALIBRATION MATRIX", centerX, Math.round(26 * dpr));
      ctx.fillStyle = midGray;
      ctx.font = `${Math.round(9.5 * dpr)}px monospace`;
      ctx.fillText("Click screen to toggle black / white background", centerX, Math.round(42 * dpr));

      // 1. Center 1px Checkerboard
      const cbSize = Math.min(Math.round(260 * dpr), Math.floor(w * 0.28));
      const cbX = centerX - cbSize / 2;
      const cbY = centerY - cbSize / 2;

      ctx.fillStyle = bg;
      ctx.fillRect(cbX, cbY, cbSize, cbSize);
      ctx.fillStyle = fg;
      for (let y = 0; y < cbSize; y++) {
        for (let x = (y % 2); x < cbSize; x += 2) {
          ctx.fillRect(cbX + x, cbY + y, 1, 1);
        }
      }
      // Outline around checkerboard
      ctx.strokeStyle = midGray;
      ctx.lineWidth = 1;
      ctx.strokeRect(cbX - 0.5, cbY - 0.5, cbSize + 1, cbSize + 1);

      // Label below checkerboard
      ctx.fillStyle = fg;
      ctx.font = `${Math.round(10 * dpr)}px monospace`;
      ctx.fillText("1px Checkerboard (Should look uniform 50% gray from a distance)", centerX, cbY + cbSize + Math.round(18 * dpr));

      // 2. Left Box: 1px Vertical Lines
      const lineBoxW = Math.min(Math.round(140 * dpr), Math.floor(w * 0.16));
      const lineBoxH = Math.round(180 * dpr);
      const leftBoxX = Math.max(Math.round(20 * dpr), cbX - lineBoxW - Math.round(40 * dpr));
      const leftBoxY = centerY - lineBoxH / 2;

      for (let x = 0; x < lineBoxW; x += 2) {
        ctx.fillRect(leftBoxX + x, leftBoxY, 1, lineBoxH);
      }
      ctx.strokeRect(leftBoxX - 0.5, leftBoxY - 0.5, lineBoxW + 1, lineBoxH + 1);
      ctx.fillText("1px Vertical Lines", leftBoxX + lineBoxW / 2, leftBoxY + lineBoxH + Math.round(16 * dpr));

      // 3. Right Box: 1px Horizontal Lines
      const rightBoxX = Math.min(w - lineBoxW - Math.round(20 * dpr), cbX + cbSize + Math.round(40 * dpr));
      const rightBoxY = centerY - lineBoxH / 2;

      for (let y = 0; y < lineBoxH; y += 2) {
        ctx.fillRect(rightBoxX, rightBoxY + y, lineBoxW, 1);
      }
      ctx.strokeRect(rightBoxX - 0.5, rightBoxY - 0.5, lineBoxW + 1, lineBoxH + 1);
      ctx.fillText("1px Horizontal Lines", rightBoxX + lineBoxW / 2, rightBoxY + lineBoxH + Math.round(16 * dpr));

    } else if (activeTab === "moire") {
      // --- CONCENTRIC MOIRÉ & RADIAL ALIASING TEST ---
      const centerX = Math.floor(w / 2);
      const centerY = Math.floor(h / 2);
      const maxRadius = Math.min(centerX, centerY) - Math.round(40 * dpr);

      // Concentric circles with stepping
      const ringGap = Math.max(1, 6 - moireDensity);
      ctx.strokeStyle = fg;
      ctx.lineWidth = 1;

      for (let r = 2; r < maxRadius; r += ringGap) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Radial ray starburst overlay (Siemens star)
      const rays = 72 * moireDensity;
      for (let i = 0; i < rays; i += 2) {
        const angle = (i / rays) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * maxRadius, centerY + Math.sin(angle) * maxRadius);
        ctx.stroke();
      }

      ctx.fillStyle = fg;
      ctx.font = `${Math.round(11 * dpr)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText(`Moiré Interference Frequency (Step: ${ringGap}px • Rays: ${rays})`, centerX, Math.round(26 * dpr));
      ctx.fillStyle = midGray;
      ctx.font = `${Math.round(9.5 * dpr)}px monospace`;
      ctx.fillText("Click screen to toggle black / white background", centerX, Math.round(42 * dpr));
    }
  }, [activeTab, inverted, moireDensity]);

  const handleViewportClick = (e: React.MouseEvent) => {
    // If text was highlighted/selected, do not trigger background toggle
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    toggleInverted();
  };

  return (
    <>
      <div 
        className="absolute inset-0 overflow-hidden select-none cursor-pointer"
        onClick={handleViewportClick}
        title="Click to toggle black/white background"
      >
        {activeTab !== "typography" ? (
          <canvas ref={canvasRef} className="block w-full h-full" />
        ) : (
          /* --- TYPOGRAPHY & TEXT RENDERING LAB --- */
          <div className={`w-full h-full overflow-y-auto p-4 sm:p-8 transition-colors duration-200 ${
            inverted ? "bg-black text-white" : "bg-white text-black"
          }`}>
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Header */}
              <div className="border-b border-border/40 pb-4">
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-mono font-semibold">
                  Productivity & Code Rendering Lab
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
                  Text Clarity, Subpixel Antialiasing & Fringing
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Inspect font rasterization, subpixel fringing (ClearType / FreeType), and contrast legibility across multiple sizes and weights.
                  <span className="block mt-1.5 font-mono text-[11.5px] text-amber-500 dark:text-amber-400 font-semibold">
                    💡 Click anywhere to toggle black/white background
                  </span>
                </p>
              </div>

              {/* Typography Ladder */}
              <div className="space-y-3 bg-muted/20 p-4 rounded-xl border border-border/40">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                  Font Scale Ladder (Sans-Serif)
                </div>
                <div className="space-y-2">
                  <div className="text-[8px] leading-tight">
                    <span className="font-mono opacity-50 mr-2">[8px]</span>
                    The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. 0123456789
                  </div>
                  <div className="text-[10px] leading-tight">
                    <span className="font-mono opacity-50 mr-2">[10px]</span>
                    The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. 0123456789
                  </div>
                  <div className="text-[11px] leading-tight">
                    <span className="font-mono opacity-50 mr-2">[11px]</span>
                    The quick brown fox jumps over the lazy dog. Clean text should have no color halos along vertical stems.
                  </div>
                  <div className="text-[12px] leading-snug">
                    <span className="font-mono opacity-50 mr-2">[12px]</span>
                    Standard UI Text: Look for fringing (red/blue edges) caused by non-standard BGR or WRGB subpixel layouts.
                  </div>
                  <div className="text-[14px] leading-snug">
                    <span className="font-mono opacity-50 mr-2">[14px]</span>
                    Body Copy: 14px text rendered cleanly on a calibrated 4K or 1440p monitor should appear sharp as print.
                  </div>
                  <div className="text-[18px] font-semibold leading-normal">
                    <span className="font-mono opacity-50 mr-2 text-xs font-normal">[18px]</span>
                    Heading Text: Bold and Semibold letterforms should maintain crisp inner negative space without bleeding.
                  </div>
                </div>
              </div>

              {/* Line Width Target Stems */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-muted/20 rounded-xl border border-border/40">
                  <div className="text-[11px] font-mono font-semibold text-muted-foreground mb-1.5">1px Hairline Stems</div>
                  <div className="space-y-1">
                    <div className="h-[1px] bg-current w-full" />
                    <div className="h-[1px] bg-current w-3/4" />
                    <div className="h-[1px] bg-current w-1/2" />
                  </div>
                </div>
                <div className="p-3 bg-muted/20 rounded-xl border border-border/40">
                  <div className="text-[11px] font-mono font-semibold text-muted-foreground mb-1.5">2px Stroke Stems</div>
                  <div className="space-y-1">
                    <div className="h-[2px] bg-current w-full" />
                    <div className="h-[2px] bg-current w-3/4" />
                    <div className="h-[2px] bg-current w-1/2" />
                  </div>
                </div>
                <div className="p-3 bg-muted/20 rounded-xl border border-border/40">
                  <div className="text-[11px] font-mono font-semibold text-muted-foreground mb-1.5">3px Stroke Stems</div>
                  <div className="space-y-1">
                    <div className="h-[3px] bg-current w-full" />
                    <div className="h-[3px] bg-current w-3/4" />
                    <div className="h-[3px] bg-current w-1/2" />
                  </div>
                </div>
              </div>

              {/* Developer Code Sample (Programming Display Check) */}
              <div className="bg-muted/30 p-4 rounded-xl border border-border/40 space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                  Monospace Code Sample (Developer Screen Evaluation)
                </div>
                <pre className="font-mono text-[12px] sm:text-[13px] leading-relaxed p-3 rounded-lg bg-black/5 dark:bg-white/5 overflow-x-auto border border-border/30">
{`function verifyDisplaySubpixelLayout(dpr: number, layout: "RGB" | "BGR" | "WOLED") {
  const isCrisp = dpr >= 2.0 ? "Retina High DPI" : "Standard 1x Scaling";
  const subpixelColorShift = layout === "BGR" ? "Check Windows ClearType Tuner" : "Native RGB Alignment";
  return { isCrisp, subpixelColorShift, nativeResolution: true };
}`}
                </pre>
              </div>

            </div>
          </div>
        )}

        {/* Educational Information Popover */}
        {showEduInfo && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute top-6 left-1/2 -translate-x-1/2 max-w-xl w-[92%] bg-neutral-950/95 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white shadow-2xl z-40 text-xs cursor-default"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 font-semibold text-amber-400">
                <Info className="w-4 h-4" />
                <span>Sharpness, Text Clarity & Moiré Guide</span>
              </div>
              <button 
                onClick={() => setShowEduInfo(false)}
                className="text-white/60 hover:text-white px-2 py-0.5 rounded text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>
            <div className="mt-3 space-y-2.5 text-white/80 leading-relaxed">
              <p>
                <strong>What to look for:</strong>
              </p>
              <ul className="list-disc pl-4 space-y-1.5">
                <li>
                  <strong>1px Sharpness:</strong> At 100% native scaling, 1px alternating lines should show razor-sharp black and white pixels without soft gray interpolation. If lines look blurry or smeared, verify that your display resolution matches your monitor&apos;s native hardware resolution.
                </li>
                <li>
                  <strong>Subpixel Text Fringing:</strong> Standard Windows/macOS subpixel rendering assumes an <em>RGB</em> stripe layout. Monitors with <em>BGR</em> layouts (or WOLED/QD-OLED triangular layouts) can exhibit pink or cyan color halos along vertical text edges.
                </li>
                <li>
                  <strong>Moiré Interference:</strong> Concentric circular interference bands occur when high spatial frequency patterns beat against display pixel apertures or non-integer OS scaling (e.g. 125% or 150%). At 100% or 200% integer scaling, moiré rings are minimized.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <TestControlBar testId={testId} title="Sharpness & Text Clarity">
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Tabs */}
          <div className="flex items-center bg-black/60 dark:bg-black/80 p-1 rounded-xl border border-white/20 text-xs">
            <button
              onClick={() => setActiveTab("grids")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === "grids" 
                  ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300" 
                  : "text-cyan-100 hover:text-white hover:bg-white/20 bg-white/10 font-semibold border border-white/15"
              }`}
            >
              <Grid className={`w-3.5 h-3.5 ${activeTab === "grids" ? "text-slate-950" : "text-amber-300"}`} />
              <span>1px Grids</span>
            </button>
            <button
              onClick={() => setActiveTab("typography")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === "typography" 
                  ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300" 
                  : "text-cyan-100 hover:text-white hover:bg-white/20 bg-white/10 font-semibold border border-white/15"
              }`}
            >
              <Type className={`w-3.5 h-3.5 ${activeTab === "typography" ? "text-slate-950" : "text-amber-300"}`} />
              <span>Text Lab</span>
            </button>
            <button
              onClick={() => setActiveTab("moire")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === "moire" 
                  ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300" 
                  : "text-cyan-100 hover:text-white hover:bg-white/20 bg-white/10 font-semibold border border-white/15"
              }`}
            >
              <CircleDot className={`w-3.5 h-3.5 ${activeTab === "moire" ? "text-slate-950" : "text-amber-300"}`} />
              <span>Moiré Pattern</span>
            </button>
          </div>

          {/* Invert Light / Dark Toggle */}
          <button
            onClick={toggleInverted}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/25 bg-white/10 text-amber-200 hover:text-white font-bold transition-colors cursor-pointer"
            title="Toggle Black-on-White / White-on-Black"
          >
            {inverted ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-amber-300" />}
            <span>{inverted ? "Light BG" : "Dark BG"}</span>
          </button>

          {/* Moiré Density Slider */}
          {activeTab === "moire" && (
            <div className="flex items-center gap-1.5 text-xs bg-black/60 px-2.5 py-1 rounded-lg border border-white/20">
              <span className="text-[10px] text-amber-300 font-bold uppercase font-mono tracking-wider">Density:</span>
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setMoireDensity(lvl)}
                  className={`w-5 h-5 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                    moireDensity === lvl 
                      ? "bg-white text-gray-950 font-extrabold shadow-xs" 
                      : "text-cyan-100 hover:text-white hover:bg-white/20 bg-white/10 border border-white/15"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          )}

          {/* Educational Guide Button */}
          <button
            onClick={() => setShowEduInfo(!showEduInfo)}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer font-semibold ${
              showEduInfo ? "bg-amber-500 text-slate-950 border-amber-300 font-bold" : "hover:bg-white/20 bg-white/10 text-amber-200 hover:text-white border-white/20"
            }`}
            title="Read about sharpness, subpixel rendering, and moiré"
          >
            <Info className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Guide</span>
          </button>
        </div>
      </TestControlBar>
    </>
  );
}
